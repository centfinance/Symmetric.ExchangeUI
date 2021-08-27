import LockConnector from '../connector';

export default class Connector extends LockConnector {
  async connect() {
    let provider;
    if (window['celo']) {
      provider = window['celo'];
      try {
        await window['celo'].enable();
      } catch (e) {
        console.error(e);
      }
    } else if (window['web3']) {
      provider = window['web3'].currentProvider;
    }
    return provider;
  }

  isLoggedIn(): boolean {
    return !!window['celo'];
  }
}
