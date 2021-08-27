import Lock from '../lock';
import injected from './connectors/injected';
import celo from './connectors/celo';
import fortmatic from './connectors/fortmatic';
import walletconnect from './connectors/walletconnect';
import walletlink from './connectors/walletlink';

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

import config from '@/config';

const lock = new Lock();

const connectors = { injected, celo, fortmatic, walletconnect, walletlink };

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
    if (connectorId === 'injected') {
        const provider = window.ethereum;
        if (provider.isMetaMask) {
            return 'MetaMask';
        }
        if (provider.isImToken) {
            return 'imToken';
        }
        if (provider.isStatus) {
            return 'Status';
        }
        if (provider.isTrust) {
            return 'Trust Wallet';
        }
        if (provider.isFrame) {
            return 'Frame';
        }
        return 'Browser Wallet';
    }
    if (connectorId === 'fortmatic') {
        return 'Fortmatic';
    }
    if (connectorId === 'walletconnect') {
        return 'WalletConnect';
    }
    if (connectorId === 'walletlink') {
        return 'Coinbase Wallet';
    }
    if (connectorId === 'celo') {
        return 'Celo Extension Wallet';
    }
    return 'Unknown';
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
    return defaultLogo;
}

export default lock;
