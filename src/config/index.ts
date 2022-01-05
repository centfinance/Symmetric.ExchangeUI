import homestead from './homestead.json';
import kovan from './kovan.json';
import sokol from './sokol.json';
import xdai from './xdai.json';
import alfajores from './alfajores.json';
import celo from './celo.json';
import fuji from './fuji.json';
import avalanche from './avalanche.json';
import fantomtestnet from './fantom-testnet.json';
import fantom from './fantom.json';
import optimismkovan from './optimism-kovan.json';
import optimism from './optimism.json';
import polygonmumbai from './polygon-mumbai.json';
import polygon from './polygon.json';
import whitelist from './whitelist.json';

interface Connector {
    id: string;
    name: string;
    options: any;
}

export const depositWhiteList = whitelist;
export const bridgeWhiteList = whitelist;

export const symmTokenAddresses = ['0x7c64aD5F9804458B8c9F93f7300c15D55956Ac2a', '0x8427bD503dd3169cCC9aFF7326c15258Bc305478'];
export interface AssetMetadata {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    logoURI: string | undefined;
}

interface Config {
    network: string;
    chainId: number;
    eth_key: string;
    precision: number;
    infuraKey: string;
    rpcUrl: string;
    subgraphUrl: string;
    subgraphBackupUrl: string;
    addresses: {
        bFactory: string;
        bActions: string;
        dsProxyRegistry: string;
        exchangeProxy: string;
        weth: string;
        wxdai: string;
        celo: string;
        avalanche: string;
        fantom: string;
        optimism: string;
        polygon: string;
        wspoa: string;
        multicall: string;
        deposit: string;
    };
    assets: Record<string, AssetMetadata>;
    untrusted: string[];
    connectors: Record<string, Connector>;
}

const configs = {
    1: {
        untrusted: [],
        ...homestead,
    },
    10:{
        untrusted: [],
        ...optimism,
    },
    42:{
        untrusted: [],
        ...kovan,
    },
    69:{
        untrusted: [],
        ...optimismkovan,
    },
    77:{
        untrusted: [],
        ...sokol,
    },
    100:{
        untrusted: [],
        ...xdai,
    },
    137:{
        untrusted: [],
        ...polygon,
    },
    250:{
        untrusted: [],
        ...fantom,
    },
    4002:{
        untrusted: [],
        ...fantomtestnet,
    },
    43113:{
        untrusted: [],
        ...fuji,
    },
    44787:{
        untrusted: [],
        ...alfajores,
    },
    42220:{
        untrusted: [],
        ...celo,
    },
    43114:{
        untrusted: [],
        ...avalanche,
    },
    80001:{
        untrusted: [],
        ...polygonmumbai,
    },
};
// eslint-disable-next-line no-undef
const network = process.env.APP_CHAIN_ID || 1;

const config: Config = configs[network];

export default config;
