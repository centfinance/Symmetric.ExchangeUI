import { createStore } from 'vuex';

import account, { AccountState } from './modules/account';
import assets, { AssetState } from './modules/assets';
import theme, { ThemeState } from './modules/theme';
import ui, { UIState } from './modules/ui';

export interface RootState {
	account: AccountState;
	assets: AssetState;
    theme: ThemeState;
	ui: UIState;
}

const store = createStore({
    modules: {
        account,
        assets,
        theme,
        ui,
    },
});

export default store;
