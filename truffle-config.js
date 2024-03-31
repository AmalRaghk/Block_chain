require('@babel/register');
require('@babel/polyfill');


module.exports = {
  networks: {
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    localIPFS: {
      provider: () => new Web3.providers.HttpProvider("http://localhost:5001"),
      network_id: "*",
      gas: 5000000,
      gasPrice: 20000000000
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
