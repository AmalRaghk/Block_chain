import Storage from "../abis/Storage.json";
import React, { Component } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "./Navbar";
import Main from "./Main";
import Web3 from "web3";
import "./App.css";
import Files from "./Files";

//Declare IPFS
const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
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
    //Declare Web3
    const web3 = window.web3;

    //Load account
    const _account = await web3.eth.getAccounts();
    this.setState({ account: _account[0] });
    console.log(_account);
    const _wei = await web3.eth.getBalance(_account[0]);
    const _balance = await web3.utils.fromWei(_wei, "ether");
    console.log(_balance);
    this.setState({ balance: _balance });
    const transactionCount = await web3.eth.getTransactionCount(_account[0]);
    this.setState({ transactionCount });
    console.log(transactionCount);
    //Network ID

    const networkId = await web3.eth.net.getId();
    const networkData = Storage.networks[networkId];
    if (networkData) {
      // Assign contract
      const storage = new web3.eth.Contract(Storage.abi, networkData.address);
      this.setState({ storage });
      // Get files amount
      const filesCount = await storage.methods.filecount().call();
      this.setState({ filesCount });
      // Load files&sort by the newest
      for (var i = filesCount; i >= 1; i--) {
        const file = await storage.methods.files(i).call();
        this.setState({
          files: [...this.state.files, file],
        });
      }
    } else {
      window.alert("Storage contract not deployed to detected network.");
    }
  }

  // Get file from user
  captureFile = (event) => {
    event.preventDefault();

    const file = event.target.files[0];
    const reader = new window.FileReader();

    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({
        buffer: Buffer(reader.result),
        type: file.type,
        name: file.name,
      });
      console.log("buffer", this.state.buffer);
    };
  };

  //Upload File
  uploadFile = (description) => {
    console.log("Submitting file to IPFS...");

    // Add file to the IPFS
    ipfs.add(this.state.buffer, (error, result) => {
      console.log("IPFS result", result.size);
      if (error) {
        console.error(error);
        return;
      }

      this.setState({ loading: true });
      // Assign value for the file without extension
      if (this.state.type === "") {
        this.setState({ type: "none" });
      }
      this.state.storage.methods
        .uploadFile(
          result[0].hash,
          result[0].size,
          this.state.type,
          this.state.name,
          description
        )
        .send({ from: this.state.account })
        .on("transactionHash", (hash) => {
          this.setState({
            loading: false,
            type: null,
            name: null,
          });
          window.location.reload();
        })
        .on("error", (e) => {
          console.error("App::gg", e);
          window.alert("Error" + e);
          this.setState({ loading: false });
        });
    });
  };

  //Set states
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      storage: null,
      files: [],
      loading: false,
      type: null,
      name: null,
    };

    //Bind functions
    this.uploadFile = this.uploadFile.bind(this);
    this.captureFile = this.captureFile.bind(this);
  }

  render() {
    const path = window.location.pathname;

    if (path == "/files") {
      return <Files files={this.state.files} />;
    }

    return (
      <div>
        <Navbar
          account={this.state.account}
          balance={this.state.balance}
          transactionCount={this.state.transactionCount}
        />
        {this.state.loading ? (
          <div id="loader" className="text-center mt-5">
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <Main
            files={this.state.files}
            captureFile={this.captureFile}
            uploadFile={this.uploadFile}
          />
        )}
      </div>
    );
  }
}

export default App;

