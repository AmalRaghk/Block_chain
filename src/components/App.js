import React, { Component } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "./Navbar";
import Main from "./Main";
import Files from "./Files";
import "./App.css";
import { create } from "ipfs-http-client";
import Web3 from "web3";
import { Buffer } from "buffer";
import Storage from "../abis/Storage.json";
import { Route, Routes,BrowserRouter } from "react-router-dom";
import Footer from "./Footer"

const ipfs = create({
  host: "localhost",
  port: 5001,
  protocol: "http",
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAccount: "",
      storage: null,
      files: [],
      buffer: null,
      fileType: "",
      fileName: "",
      isLoading: false,
    };

    this.captureFile = this.captureFile.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.loadBlockchainData = this.loadBlockchainData.bind(this);
  }

  async loadWeb3() {
    console.log("loading web3...");
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    console.log("loading blockchain data...");
    const web3 = window.web3;

    const currentAccount = await web3.eth.getAccounts();
    this.setState({ currentAccount: currentAccount[0] });

    const balance = await web3.eth.getBalance(currentAccount[0]);
    const balanceInEther = web3.utils.fromWei(balance, "ether");
    this.setState({ balance: balanceInEther });

    const transactionCount = await web3.eth.getTransactionCount(
      currentAccount[0]
    );
    this.setState({ transactionCount });

    const networkId = await web3.eth.net.getId();

    const networkData = Storage.networks[networkId];

    if (networkData) {
      const storage = new web3.eth.Contract(
        Storage.abi,
        networkData.address
      );

      this.setState({ storage });

      const filescount = await storage.methods.filecount().call();
      this.setState({ filescount });

      for (let i = filescount; i >= 1; i--) {
        const file = await storage.methods.files(i).call();
        this.setState({
          files: [...this.state.files, file],
        });
      }
    } else {
      window.alert("Storage contract not deployed to detected network.");
    }
  }

  captureFile(event) {
    event.preventDefault();

    const file = event.target.files[0];

    const reader = new window.FileReader();

    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      this.setState({
        buffer: Buffer(reader.result),
        fileType: file.type,
        fileName: file.name,
      });
    };
  }

  async uploadFile(description) {
    this.setState({ isLoading: true });
    console.log("uploadFile function called");
  
    if (this.state.fileType === "") {
      this.setState({ fileType: "none" });
    }
  
    try {
      const result = await ipfs.add(this.state.buffer);
      console.log("File added to IPFS network");
      console.log("File path: ", result.path);
      console.log("File size: ", result.size);
  
      await this.state.storage.methods
        .uploadFile(
          result.path,
          result.size,
          this.state.fileType,
          this.state.fileName,
          description
        )
        .send({ from: this.state.currentAccount });
  
      this.loadBlockchainData();
  
      this.setState({
        isLoading: false,
        buffer: null,
        fileType: "",
        fileName: "",
      });
      console.log("file uploaded")
  
      window.location.reload();
    } catch (error) {
      console.error("Error uploading file: ", error);
      this.setState({ isLoading: false });
    }
  }
  

  render() {
   

    return (
      
      <BrowserRouter>
      <div>
        <Navbar
          currentAccount={this.state.currentAccount}
          balance={this.state.balance}
          transactionCount={this.state.transactionCount}
        />
        <Routes>
          <Route
            path="/home"
            element={
              <Main
                files={this.state.files}
                captureFile={this.captureFile}
                uploadFile={this.uploadFile}
              />
            }
          />
          <Route
            path="/"
            element={
              <Main
                files={this.state.files}
                captureFile={this.captureFile}
                uploadFile={this.uploadFile}
              />
            }
          />
          <Route path="/files" element={<Files files={this.state.files} />} />
        </Routes>
        {this.state.isLoading ? (
          <div id="loader" className="text-center mt-5">
            <CircularProgress color="secondary" />
          </div>
        ) : null}
        <Footer/>
      </div>
    </BrowserRouter>
    );
  }

  async componentDidMount() {
    console.log("mounting app component...");
    await this.loadWeb3();
    await this.loadBlockchainData();
  }
}

export default App;