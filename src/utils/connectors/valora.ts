// @ts-ignore
const get = () => import( '@walletconnect/web3-provider');
import LockConnector from '../connector';

export default class Connector extends LockConnector {
  async connect() {
    let provider;
    try {
      const WalletConnectProvider = (await get()).default;
      provider = new WalletConnectProvider(this.options);
      await provider.enable();
    } catch (e) {
      console.error(e);
      return;
    }
    return provider;
  }

  logout() {
    if (localStorage) {
      localStorage.removeItem('walletconnect');
    }
    return;
  }
}
