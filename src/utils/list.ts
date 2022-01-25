import tokenlist from '../data/listed.tokenlist.json';

import config, { AssetMetadata } from '@/config';

const ETH_LOGO = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png';
const XDAI_LOGO = 'https://raw.githubusercontent.com/centfinance/assets/master/blockchains/xdai/assets/0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d/logo.png';
const CELO_LOGO = 'https://raw.githubusercontent.com/centfinance/assets/master/blockchains/celo/assets/0x471EcE3750Da237f93B8E339c536989b8978a438/logo.png';

export interface TokenList {
    name: string;
    logoURI?: string;
    tokens: Token[];
}

interface Token {
    address: string;
    chainId: number;
    name: string;
    symbol: string;
    decimals: number;
    logoURI?: string;
}

export const DEFAULT_LIST = 'balancer';

export const listMetadata: Record<string, string> = {
    [DEFAULT_LIST]: '',
    '1inch': 'http://tokens.1inch.eth.link',
    'coingecko': 'https://tokens.coingecko.com/uniswap/all.json',
    'compound': 'https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json',
    'zapper': 'https://zapper.fi/api/token-list',
    'zerion': 'http://tokenlist.zerion.eth.link',
};

export async function getTokenlist(id: string): Promise<TokenList> {
    if (id === DEFAULT_LIST) {
        return tokenlist;
    }
    const listUrl = listMetadata[id];
    const response = await fetch(listUrl);
    const json = await response.json();
    return json;
}

export function getAssetsFromTokenlist(chainId: number, list: TokenList): Record<string, AssetMetadata> {
    const assets: Record<string, AssetMetadata> = {};
    
    switch (config.network) {
        case 'xdai':
            if (list.tokens.findIndex(token => token.address === config.addresses.wxdai) !== -1) {
                assets.xdai = {
                    address: 'xdai',
                    name: 'Xdai',
                    symbol: 'XDAI',
                    decimals: 18,
                    logoURI: XDAI_LOGO,
                };
            }
            for (const token of list.tokens) {
                if (token.chainId !== chainId) {
                    continue;
                }
                assets[token.address] = {
                    address: token.address,
                    name: token.name,
                    symbol: token.symbol,
                    decimals: token.decimals,
                    logoURI: token.logoURI,
                };
            }
            break;
        case 'sokol':
            if (list.tokens.findIndex(token => token.address === config.addresses.wspoa) !== -1) {
                assets.spoa = {
                    address: 'spoa',
                    name: 'Spoa',
                    symbol: 'SPOA',
                    decimals: 18,
                    logoURI: XDAI_LOGO,
                };
            }
            for (const token of list.tokens) {
                if (token.chainId !== chainId) {
                    continue;
                }
                assets[token.address] = {
                    address: token.address,
                    name: token.name,
                    symbol: token.symbol,
                    decimals: token.decimals,
                    logoURI: token.logoURI,
                };
            }
            break;
        case 'celo':
        case 'alfajores':
        case 'avalanche':
        case 'fuji':
        case 'fantom':
        case 'fantom-testnet':
        case 'optimism':
        case 'optimism-kovan':
        case 'polygon':
        case 'polygon-mumbai':
            for (const token of list.tokens) {
                if (token.chainId !== chainId) {
                    continue;
                }
                assets[token.address] = {
                    address: token.address,
                    name: token.name,
                    symbol: token.symbol,
                    decimals: token.decimals,
                    logoURI: token.logoURI,
                };
            }
            break;
        case 'ethereum':
        default:
            if (list.tokens.findIndex(token => token.address === config.addresses.weth) !== -1) {
                assets.ether = {
                    address: 'ether',
                    name: 'Ether',
                    symbol: 'ETH',
                    decimals: 18,
                    logoURI: ETH_LOGO,
                };
            }
            for (const token of list.tokens) {
                if (token.chainId !== chainId) {
                    continue;
                }
                assets[token.address] = {
                    address: token.address,
                    name: token.name,
                    symbol: token.symbol,
                    decimals: token.decimals,
                    logoURI: token.logoURI,
                };
            }
            break;
    }
    return assets;
}
