import * as DataLoader from "dataloader";
import * as namehash from "eth-ens-namehash";
import * as Web3 from "web3";

export enum EthereumNetwork {
  MAINNET,
  ROPSTEN,
  KOVAN,
  RINKEBY
}

export const web3: { [EthereumNetwork: string]: any } = {};
for (const network in EthereumNetwork) {
  if (!isNaN(Number(network))) {
    continue;
  }

  let providerURL = process.env[`WEB3_${network}`];
  if (!providerURL) {
    providerURL = `https://${network}.infura.io/${process.env.INFURA_API_KEY}`;
  }
  const provider = new Web3.providers.HttpProvider(providerURL);

  web3[network] = new Web3(provider);
}

export interface Web3Address {
  display?: string;
  address: string;
  network: EthereumNetwork;
}

export interface Web3Block {
  parentHash: string;
  miner: string;
  network: EthereumNetwork;
  transactions: string[];
  uncles: string[];
}

export interface Web3Log {
  address: string;
  network: EthereumNetwork;
  topics: string[];
}

export interface Web3Transaction {
  network: EthereumNetwork;
  hash: string;
  blockHash: string;
  from: string;
  to: string;
}

export interface Web3TransactionReceipt {
  network: EthereumNetwork;
  gasUsed: number;
  contractAddress?: string;
  cumulativeGasUsed: number;
  status: boolean;
  logs: Web3Log[];
}
