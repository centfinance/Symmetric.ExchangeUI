import Lock from '../lock';
import injected from './connectors/injected';
import celo from './connectors/celo';
import fortmatic from './connectors/fortmatic';
import walletconnect from './connectors/walletconnect';
import walletlink from './connectors/walletlink';
import valora from './connectors/valora';

import celoLogo from '@/assets/connector/celo-logo.svg';
import defaultLogo from '@/assets/connector/default.svg';
import fortmaticLogo from '@/assets/connector/fortmatic.svg';
import frameLogo from '@/assets/connector/frame.svg';
import imtokenLogo from '@/assets/connector/imtoken.svg';
import metamaskLogo from '@/assets/connector/metamask.svg';
import statusLogo from '@/assets/connector/status.svg';
import trustwalletLogo from '@/assets/connector/trustwallet.svg';
import walletconnectLogo from '@/assets/connector/walletconnect.svg';
import walletlinkLogo from '@/assets/connector/walletlink.svg';
import valoraLogo from '@/assets/connector/valora.png';

import config from '@/config';

const lock = new Lock();

const connectors = {
    injected,
    celo,
    fortmatic,
    walletconnect,
    walletlink,
    valora,
};

for (const connectorId in connectors) {
    const connector = {
        key: connectorId,
        connector: connectors[connectorId],
        options: config.connectors[connectorId],
    };
    lock.addConnector(connector);
}

export function hasInjectedProvider(): boolean {
    return !!window.ethereum;
}

export function getConnectorName(connectorId: string): string {
    switch (connectorId) {
        case 'injected':
            const provider = window.ethereum;
            if (provider.isMetaMask) {
                return 'MetaMask';
            } else if (provider.isImToken) {
                return 'imToken';
            } else if (provider.isStatus) {
                return 'Status';
            } else if (provider.isTrust) {
                return 'Trust Wallet';
            } else if (provider.isFrame) {
                return 'Frame';
            } else return 'Browser Wallet';
        case 'fortmatic':
            return 'Fortmatic';
        case 'walletconnect':
            return 'WalletConnect';
        case 'walletlink':
            return 'Coinbase Wallet';
        case 'celo':
            return 'Celo Extension Wallet';
        case 'valora':
            return 'Valora';
        default:
            return 'Unknown';
    }
}

export function getConnectorLogo(connectorId: string): string {
    if (connectorId === 'injected') {
        const provider = window.ethereum;
        if (provider.isMetaMask) {
            return metamaskLogo;
        }
        if (provider.isImToken) {
            return imtokenLogo;
        }
        if (provider.isStatus) {
            return statusLogo;
        }
        if (provider.isTrust) {
            return trustwalletLogo;
        }
        if (provider.isFrame) {
            return frameLogo;
        }
        return defaultLogo;
    }
    if (connectorId === 'fortmatic') {
        return fortmaticLogo;
    }
    if (connectorId === 'walletconnect') {
        return walletconnectLogo;
    }
    if (connectorId === 'walletlink') {
        return walletlinkLogo;
    }
    if (connectorId === 'celo') {
        return celoLogo;
    }
    if (connectorId === 'valora') {
        return valoraLogo;
    }
    return defaultLogo;
}

export default lock;
