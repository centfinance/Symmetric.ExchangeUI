import ENS from "@ensdomains/ensjs";
import { providers } from "ethers";
import celo from '@/config/celo.json';

export async function getName(account:string) {
    const nomProvider = new providers.JsonRpcProvider(celo.rpcUrl);
    const ens = new ENS({ provider:nomProvider, ensAddress: celo.ENSRegistry });
    let { name } = await ens.getName(account);
    if(name) name = `${name}.nom`;
    return name;
}