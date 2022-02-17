import React, { Component } from 'react';
import Identicon from 'identicon.js';
import box from '../box.svg'

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-white bg-white p-0 text-monospace">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={box} width="30" height="30" className="align-top" alt="" />
          FileChain
        </a>
        <ul className="navbar-nav px-3">
        <li>
            <small id="account" className='text-dark'>
            Balance : {this.props.balance} ETH | Transaction Count : {this.props.transactionCount} | 
              <a target="_blank"
                 alt=""
                 className="text-danger"
                 rel="noopener noreferrer"
                 href={"https://etherscan.io/address/" + this.props.account}>
                {this.props.account ? this.props.account.substring(0,6) : '0x8'}...{this.props.account ? this.props.account.substring(38,42) : '0x8'}
              </a>
            </small>
            { this.props.account
              ? <img
                  alt=""
                  className='ml-2'
                  width='30'
                  height='30'
                  src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                />
              : <span></span>
            }
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;