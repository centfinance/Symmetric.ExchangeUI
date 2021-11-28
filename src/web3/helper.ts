import { MaxUint256 } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { ErrorCode } from '@ethersproject/logger';
import { Web3Provider } from '@ethersproject/providers';
import BigNumber from 'bignumber.js';

import { logRevertedTx } from '@/utils/helpers';
import config from '@/config';

import ERC20Abi from '../abi/ERC20.json';
import WethAbi from '../abi/Weth.json';
import WxdaiAbi from '../abi/Wxdai.json';

export default class Helper {
    static async unlock(
        provider: Web3Provider,
        asset: string,
        spender: string,
    ): Promise<any> {
        const assetContract = new Contract(asset, ERC20Abi, provider.getSigner());
        try {
            return await assetContract.approve(spender, MaxUint256);
        } catch(e) {
            if (e.code === ErrorCode.UNPREDICTABLE_GAS_LIMIT) {
                const sender = await provider.getSigner().getAddress();
                logRevertedTx(sender, assetContract, 'approve', [spender, MaxUint256], {});
            }
            return e;
        }
    }

    static async wrap(
        provider: Web3Provider,
        amount: BigNumber,
    ): Promise<any> {
        let overrides = {
            value: `0x${amount.toString(16)}`,
        };
        switch (config.network) {
            case 'xdai':
                const wxdaiContract = new Contract(config.addresses.wxdai, WxdaiAbi, provider.getSigner());
                try {
                    return await wxdaiContract.deposit(overrides);
                } catch(e) {
                    if (e.code === ErrorCode.UNPREDICTABLE_GAS_LIMIT) {
                        const sender = await provider.getSigner().getAddress();
                        logRevertedTx(sender, wxdaiContract, 'deposit', [], overrides);
                    }
                    return e;
                }
            case 'sokol':
                const wspoaContract = new Contract(config.addresses.wspoa, WxdaiAbi, provider.getSigner());
                try {
                    return await wspoaContract.deposit(overrides);
                } catch(e) {
                    if (e.code === ErrorCode.UNPREDICTABLE_GAS_LIMIT) {
                        const sender = await provider.getSigner().getAddress();
                        logRevertedTx(sender, wspoaContract, 'deposit', [], overrides);
                    }
                    return e;
                }
            case 'celo':
            case 'alfajores':
                break;
            case 'avalanche':
            case 'fuji':
                break;
            case 'fantom':
            case 'fantom-testnet':
                break;
            case 'optimism':
            case 'optimism-kovan':
                break;
            case 'polygon':
            case 'polygon-mumbai':
                break;
            case 'ethereum':
            default:
                const wethContract = new Contract(config.addresses.weth, WethAbi, provider.getSigner());
                overrides = {
                    value: `0x${amount.toString(16)}`,
                };
                try {
                    return await wethContract.deposit(overrides);
                } catch(e) {
                    if (e.code === ErrorCode.UNPREDICTABLE_GAS_LIMIT) {
                        const sender = await provider.getSigner().getAddress();
                        logRevertedTx(sender, wethContract, 'deposit', [], overrides);
                    }
                    return e;
                }
        }
    }

    static async unwrap(
        provider: Web3Provider,
        amount: BigNumber,
    ): Promise<any> {
        switch (config.network) {
            case 'xdai':
                const wxdaiContract = new Contract(config.addresses.wxdai, WxdaiAbi, provider.getSigner());
                try {
                    return await wxdaiContract.withdraw(amount.toString(), {});
                } catch(e) {
                    if (e.code === ErrorCode.UNPREDICTABLE_GAS_LIMIT) {
                        const sender = await provider.getSigner().getAddress();
                        logRevertedTx(sender, wxdaiContract, 'withdraw', [amount.toString()], {});
                    }
                    return e;
                }
            case 'sokol':
                const wspoaContract = new Contract(config.addresses.wspoa, WxdaiAbi, provider.getSigner());
                try {
                    return await wspoaContract.withdraw(amount.toString(), {});
                } catch(e) {
                    if (e.code === ErrorCode.UNPREDICTABLE_GAS_LIMIT) {
                        const sender = await provider.getSigner().getAddress();
                        logRevertedTx(sender, wspoaContract, 'withdraw', [amount.toString()], {});
                    }
                    return e;
                }
            case 'celo':
            case 'alfajores':
                break;
            case 'avalanche':
            case 'fuji':
                break;
            case 'fantom':
            case 'fantom-testnet':
                break;
            case 'optimism':
            case 'optimism-kovan':
                break;
            case 'polygon':
            case 'polygon-mumbai':
                break;
            case 'ethereum':
            default:
                const wethContract = new Contract(config.addresses.weth, WethAbi, provider.getSigner());
                try {
                    return await wethContract.withdraw(amount.toString(), {});
                } catch(e) {
                    if (e.code === ErrorCode.UNPREDICTABLE_GAS_LIMIT) {
                        const sender = await provider.getSigner().getAddress();
                        logRevertedTx(sender, wethContract, 'withdraw', [amount.toString()], {});
                    }
                    return e;
                }
        }
    }
}
