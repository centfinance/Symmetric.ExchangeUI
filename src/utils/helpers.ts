import BigNumber from 'bignumber.js';
import { getAddress } from '@ethersproject/address';
import { Contract } from '@ethersproject/contracts';
import { Wallet } from '@ethersproject/wallet';
import assets from '@centfinance/cent.dex_assets/assets/index.json';

import config from '@/config';
import provider from '@/utils/provider';

export const ETH_KEY = config.eth_key ;

export function formatAddress(address: string, length = 8): string {
    const ellipsizedAddress = `${address.substr(0, 2 + length / 2)}…${address.substr(42 - length / 2)}`;
    return ellipsizedAddress;
}

export function formatTxHash(txHash: string, length = 16): string {
    const ellipsizedHash = `${txHash.substr(0, 2 + length / 2)}…${txHash.substr(66 - length / 2)}`;
    return ellipsizedHash;
}

export function formatDate(timestamp: number): string {
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', options);
}

export function isAddress(value: string): boolean {
    try {
        getAddress(value);
    } catch(e) {
        return false;
    }
    return true;
}

export function scale(input: BigNumber, decimalPlaces: number): BigNumber {
    const scalePow = new BigNumber(decimalPlaces.toString());
    const scaleMul = new BigNumber(10).pow(scalePow);
    return input.times(scaleMul);
}

export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
}

export function getEtherscanLink(txHash: string): string {
    const chainId = config.chainId;
    const urlMap = {
        1: 'https://etherscan.io/tx',
        10: 'https://optimism.symmetric.exchange/tx',
        42: 'https://kovan.etherscan.io/tx',
        69: 'https://kovan-optimistic.etherscan.io/tx',
        77: 'https://blockscout.com/poa/sokol/tx',
        100: 'https://blockscout.com/xdai/mainnet/tx',
        137: 'https://polygonscan.com/tx',
        250: 'https://fantom.symmetric.exchange/tx',
        4002: 'https://testnet.ftmscan.com/tx',
        42220: 'https://explorer.celo.org/tx',
        43113: 'https://testnet.snowtrace.io/tx',
        43114: 'https://snowtrace.io/tx',
        44787: 'https://alfajores-blockscout.celo-testnet.org/tx',
        80001: 'https://mumbai.polygonscan.com/tx',
    };
    const url = urlMap[chainId];
    const link = `${url}/${txHash}`;
    return link;
}

export function getAccountLink(address: string): string {
    const chainId = config.chainId;
    const urlMap = {
        1: 'https://etherscan.io/address',
        10: 'https://optimism.symmetric.exchange/address',
        42: 'https://kovan.etherscan.io/address',
        69: 'https://kovan-optimistic.etherscan.io/address',
        77: 'https://blockscout.com/poa/sokol/address',
        100: 'https://blockscout.com/xdai/mainnet/address',
        137: 'https://polygonscan.com/address',
        250: 'https://fantom.symmetric.exchange/address',
        4002: 'https://testnet.ftmscan.com/address',
        42220: 'https://explorer.celo.org/address',
        43113: 'https://testnet.snowtrace.io/address',
        43114: 'https://snowtrace.io/address',
        44787: 'https://alfajores-blockscout.celo-testnet.org/address',
        80001: 'https://mumbai.polygonscan.com/address',
    };
    const url = urlMap[chainId];
    const link = `${url}/${address}`;
    return link;
}

export function getPoolLink(pool: string): string {
    const chainId = config.chainId;
    const prefixMap = {
        1: '',
        10: 'optimism',
        42: 'kovan.',
        69: 'optimism-kovan.',
        77: 'sokol.',
        100: 'xdai.',
        137: 'polygon.',
        250: 'fantom,',
        4002: 'fantom-testnet.',
        42220: 'celo',
        43113: 'fuji.',
        43114: 'avalanche',
        44787: 'alfajores.',
        80001: 'polygon-mumbai.',
    };
    const prefix = prefixMap[chainId];
    const link = `https://${prefix}-pools.symmetric.exchange/#/pool/${pool}`;
    return link;
}

export function getAssetLogo(address: string): string {
    if (assets.includes(address.toLowerCase())) {
        return `https://raw.githubusercontent.com/centfinance/cent.dex_assets/master/assets/${address.toLowerCase()}.png`;
    }
    return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
}

export function logRevertedTx(
    sender: string,
    contract: Contract,
    action: string,
    params: any,
    overrides: any,
): void {
    overrides.gasPrice = sender;
    const dummyPrivateKey = '0x651bd555534625dc2fd85e13369dc61547b2e3f2cfc8b98cee868b449c17a4d6';
    const dummyWallet = new Wallet(dummyPrivateKey).connect(provider);
    const loggingContract = contract.connect(dummyWallet);
    loggingContract[action](...params, overrides);
}