import LockConnector from '../connector';

export default class Connector extends LockConnector {
    async connect() {
        let provider;
        if (window['ethereum']) {
            provider = window['ethereum'];
            try {
                await window.ethereum.request({
                    method: 'eth_requestAccounts',
                });
            } catch (e) {
                console.error(e);
            }
        } else if (window['web3']) {
            provider = window['web3'].currentProvider;
        }
        return provider;
    }

    isLoggedIn(): boolean {
        return !!window['ethereum'];
    }
}
