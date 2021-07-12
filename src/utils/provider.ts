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
    case 'kovan':
        provider = new JsonRpcProvider(config.rpcUrl, 42);
        break;
    case 'ethereum':
    default:
        break;
}

export default provider;