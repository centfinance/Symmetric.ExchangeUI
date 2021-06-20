// import { QuiknodeProvider } from '@ethersproject/providers';
import { InfuraProvider, JsonRpcProvider } from '@ethersproject/providers';

import config from '@/config';

var provider = new JsonRpcProvider(config.rpcUrl, 100);
//const provider = new QuiknodeProvider(config.network, config.infuraKey);
/*
if (config.infuraKey != null)
{
    provider = new InfuraProvider(config.network, config.infuraKey);
}
*/
export default provider;