// import { QuiknodeProvider } from '@ethersproject/providers';
import { InfuraProvider, JsonRpcProvider } from '@ethersproject/providers';

import config from '@/config';
// provider = new InfuraProvider(process.env.APP_CHAIN_ID, config.infuraKey);
// var provider = new QuiknodeProvider(process.env.APP_CHAIN_ID, config.infuraKey);
let provider = new JsonRpcProvider(config.rpcUrl);

switch (config.network) {
    case 'xdai':
        provider = new JsonRpcProvider(config.rpcUrl, 100);
        break;
    case 'sokol':
        provider = new JsonRpcProvider(config.rpcUrl, 77);
        break;
    case 'celo':
        provider = new JsonRpcProvider(config.rpcUrl, 42220);
        break;
    case 'alfajores':
        provider = new JsonRpcProvider(config.rpcUrl, 44787);
        break;
    case 'avalanche':
        provider = new JsonRpcProvider(config.rpcUrl, 43114);
        break;
    case 'fuji':
        provider = new JsonRpcProvider(config.rpcUrl, 43113);
        break;
    case 'fantom':
        provider = new JsonRpcProvider(config.rpcUrl, 250);
        break;
    case 'fantom-testnet':
        provider = new JsonRpcProvider(config.rpcUrl, 4002);
        break;
    case 'optimism':
        provider = new JsonRpcProvider(config.rpcUrl, 10);
        break;
    case 'optimism-kovan':
        provider = new JsonRpcProvider(config.rpcUrl, 69);
        break;
    case 'polygon':
        provider = new JsonRpcProvider(config.rpcUrl, 137);
        break;
    case 'polygon-mumbai':
        provider = new JsonRpcProvider(config.rpcUrl, 80001);
        break;
    case 'kovan':
        provider = new JsonRpcProvider(config.rpcUrl, 42);
        break;
    case 'ethereum':
    default:
        break;
}

export default provider;