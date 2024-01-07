import * as dotenv from 'dotenv';
dotenv.config();
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      accounts: { count: 20 },
    },
    mumbai: {
      url: process.env.MUMBAI_RPC,
      accounts: [process.env.SYSTEM_PRIVATE_KEY!],
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: `${process.env.POLYGON_API_KEY}`,
    },
  },

  solidity: {
    compilers: [
      {
        version: '0.8.19',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
            details: { yul: true },
          },
          viaIR: true
        },
      },
    ],
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
};

export default config;
