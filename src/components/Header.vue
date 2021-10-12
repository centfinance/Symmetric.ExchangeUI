<template>
    <div class="header">
        <div class="header-left">
            <router-link
                class="brand"
                :to="'/'"
            >
                <Icon
                    class="logo"
                    :title="'symmetric'"
                />
                <div class="title">SYMMETRIC </div><br>
            </router-link>
            <Theme-Switcher class="switcher"/>
        </div>
        <div class="header-right">
            <a
                class="link"
                href="https://docs.symmetric.exchange"
                target="_blank"
                style="padding-right:10px;"
            >
                Documentation
            </a>
            <div style="padding-right:10px;">|</div>
            <a
                class="link"
                :href="networkUrl"
                target="_blank"
            >
                Add Liquidity
            </a>
            <Button
                :text="'Switch Network'"
                :primary="false"
                @click="switchNetwork"
            />
            <Account class="account" />
        </div>
    </div>
</template>

<script>
import { defineComponent, computed } from 'vue';

import Icon from '@/components/Icon.vue';
import Button from '@/components/Button.vue';
import Account from '@/components/Account.vue';
import ThemeSwitcher from '@/components/ThemeSwitcher.vue';

import config from '@/config';

export default defineComponent({
    components: {
        Button,
        Account,
        Icon,
        ThemeSwitcher
    },
    setup() {
        const networkUrl = computed(() => {
            return `https://${config.network}-pools.symmetric.exchange/`;
        });

        function switchNetwork() {
            if (!window.ethereum) {
                console.error('No injected wallet found.');
                return;
            }
            switch (config.network) {
            case "xdai":
                window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            'chainId': '0x64',
                            'chainName': 'xDai',
                            'rpcUrls': ['https://rpc.xdaichain.com'],
                            'nativeCurrency': {
                                'name': 'xDai Chain xDai',
                                'symbol': 'xDai',
                                'decimals': 18,
                            },
                            'blockExplorerUrls': ['https://blockscout.com/poa/xdai'],
                        },
                    ],
                    id: 1,
                }, console.log);
                break;
            case "celo":
                window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            'chainId': '0xa4ec',
                            'chainName': 'Celo',
                            'rpcUrls': ['https://forno.celo.org'],
                            'nativeCurrency': {
                                'name': 'Celo',
                                'symbol': 'CELO',
                                'decimals': 18,
                            },
                            'blockExplorerUrls': ['https://explorer.celo.org'],
                        },
                    ],
                    id: 1,
                }, console.log);
                break;
            case "alfajores":
                window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            'chainId': '0xaef3',
                            'chainName': 'Celo (Alfajores Testnet)',
                            'rpcUrls': ['https://alfajores-forno.celo-testnet.org'],
                            'nativeCurrency': {
                                'name': 'Celo',
                                'symbol': 'CELO',
                                'decimals': 18,
                            },
                            'blockExplorerUrls': ['https://alfajores-blockscout.celo-testnet.org'],
                        },
                    ],
                    id: 1,
                }, console.log);
                break;
            case "sokol":
                window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            'chainId': '0x4d',
                            'chainName': 'Sokol Testnet',
                            'rpcUrls': ['https://sokol.poa.network'],
                            'nativeCurrency': {
                                'name': 'SPOA',
                                'symbol': 'SPOA',
                                'decimals': 18,
                            },
                            'blockExplorerUrls': ['https://blockscout.com/poa/sokol'],
                        },
                    ],
                    id: 1,
                }, console.log);
                break;
            }
        }

        return {
            networkUrl,
            switchNetwork,
        };
    },
});
</script>

<style scoped>
.header {
    height: 96px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--background-header);
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.15);
}
.header-left {
    display: flex;
    align-items: center;
}

.header-right {
    display: flex;
    align-items: center;
}

.network {
    color: #48A9A6;
    font-size: 12px; 
    font-weight: 200;
}
.link {
    margin-right: 8px;
}

a {
    text-decoration: none;
    color: var(--text-primary);
}

.brand {
    margin-left: 20px;
    display: flex;
    align-items: center;
    margin-right: 20px;
}



.title {
    margin-left: 2px;
    letter-spacing: 1px; 
    font-size: 24px; 
    font-weight: 500;
}

.account {
    margin-left: 8px;
    margin-right: 16px;
}

@media only screen and (max-width: 768px) {
    .brand {
        margin-left: 16px;
    }

    .title {
        display: none;
    }

    .link {
        display: none;
    }
}

@media(max-width: 1100px) {
    .switcher {
        display: none;
    }
}
</style>