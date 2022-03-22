import { RootState } from '@/store';
import { ActionContext } from 'vuex';

export interface ThemeState {
    theme: boolean
}

// init theme color
const light = true;
const dark = false;

const mutations = {
    setTheme: (_state: ThemeState, newState:boolean) => {
        _state.theme = newState;
    }
}

const actions = {
    setThemeLight: ({ commit }: ActionContext<ThemeState, RootState>) : void => {
        commit('setTheme', light);
    },

    setThemeDark: ({ commit }: ActionContext<ThemeState, RootState>) : void => {
        commit('setTheme', dark);
    }
}

function state(): ThemeState {
    return {
        theme: dark
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}