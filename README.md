### download ganche
  https://archive.trufflesuite.com/ganache/
  start a new network 
  name it ganache
  port 7545
## add meta mask 
  add network to metamask 
  using import network
  add a account to meta mask
###deploy contract to network using truffle
  `truffle compile 
  truffle migrate`
### download Ipfs
  `ipns://docs.ipfs.tech/install/ipfs-desktop/`
  
config ipfs  
  `"HTTPHeaders": {
  "Access-Control-Allow-Methods": [
  "PUT",
  "POST"
  ],
  "Access-Control-Allow-Origin": [
  "http://127.0.0.1:8081",
  "http://localhost:3000",
  "http://127.0.0.1:5001",
  "https://webui.ipfs.io"
  ]
  }`
## run ipfs ,ganache
    ipfs daemon
    or ipfs desktop
    ganche
## Run App
    npm start
