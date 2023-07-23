/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.9',
    defaultNetwork: 'mumbai',
    networks: {
      hardhat: {},
      mumbai: {
        url: 'https://rpc.ankr.com/polygon_mumbai/49c03fced4bc5907c6d5befc1555cdc216acf15ba585783f5fe5c83ee687c20c',
        accounts: [`0x${process.env.PRIVATE_KEY}`]
      }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
