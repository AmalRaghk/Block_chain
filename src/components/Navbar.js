import React, { Component } from "react";
import Identicon from "identicon.js";
import box from "../box.svg";
import logo from "./img/share-svgrepo-com.svg";
class Navbar extends Component {
  render() {
    return (
      <nav className="bg-grey-900 border-gray-200 dark:bg-gray-900 text-white p-0 m-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto  ">

        <a href="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={logo} className="h-8" alt="Flowbite Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap ">CloudShare</span>
      </a>

        <a
          className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-500 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          href="/files"
          rel="noopener noreferrer"
          
        >
          My Files
        </a>
        <ul className="navbar-nav px-3">
          <li>
            <small id="account" className="block py-1 px-1 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              Balance : {this.props.balance} ETH | Transaction Count :{" "}
              {this.props.transactionCount} |
              <a
                target="_blank"
                alt=""
                className="block py-1 px-1 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                rel="noopener noreferrer"
                href={"https://etherscan.io/address/" + this.props.account}
              >
                {this.props.account
                  ? this.props.account.substring(0, 6)
                  : "0x8"}
                ...
                {this.props.account
                  ? this.props.account.substring(38, 42)
                  : "0x8"}
              </a>
            </small>
            {this.props.account ? (
              <img
                alt=""
                className="ml-2"
                width="30"
                height="30"
                src={`data:image/png;base64,${new Identicon(
                  this.props.account,
                  30
                ).toString()}`}
              />
            ) : (
              <span></span>
            )}
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;

