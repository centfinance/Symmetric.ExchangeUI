<template>
    <div id="app">
        <Header />
        <router-view class="view" />

        <ModalSettings :open="isSettingsModalOpen" />
        <ModalAccount :open="isAccountModalOpen" />
        <ModalConnectorSelector :open="isConnectorModalOpen" />
        <NotificationList
            :items="notifications"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

import { RootState } from '@/store';

import Header from '@/components/Header.vue';
import ModalAccount from '@/components/ModalAccount.vue';
import ModalConnectorSelector from '@/components/ModalConnectorSelector.vue';
import ModalSettings from '@/components/ModalSettings.vue';
import NotificationList from '@/components/NotificationList.vue';

export default defineComponent({
    components: {
        Header,
        ModalAccount,
        ModalConnectorSelector,
        ModalSettings,
        NotificationList,
    },
    setup() {
        const store = useStore<RootState>();

        const isSettingsModalOpen = computed(() => store.state.ui.modal.settings.isOpen);
        const isAccountModalOpen = computed(() => store.state.ui.modal.account.isOpen);
        const isConnectorModalOpen = computed(() => store.state.ui.modal.connector.isOpen);

        const notifications = computed(() => store.state.ui.notifications);

        onMounted(() => {
            store.dispatch('assets/init');
            store.dispatch('account/init');
        });

        return {
            isSettingsModalOpen,
            isAccountModalOpen,
            isConnectorModalOpen,
            notifications,
        };
    },
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

:root {
    --background-primary: #253743;
    --background-secondary: #21222c;
    --background-header: #253743;
    --background-form: #3e4e59;
    --background-control: #2c2d3a;
    --background-hover: #FB6706;
    --border-form: #262626;
    --border-input: #253743;
    --accent: #4965ff;
    --accent-dark: #3c56e3;
    --text-primary: #fff;
    --text-secondary: #acbbc3;
    --text-control: #999;
    --text-inverted: #000;
    --success: #21b66f;
    --info: #7685d5;
    --warning: #ffc780;
    --error: #F25B2A;
    --font-size-tiny: 11px;
    --font-size-small: 14px;
    --font-size-medium: 16px;
    --font-size-large: 18px;
    --font-size-header: 24px;
    --border-radius-large: 25px;
    --border-radius-medium: 10px;
    --border-radius-small: 5px;
    --block-height: 50px;
}

html[data-theme='light'] {
    --background-primary: white;
    --background-secondary: #ffffff;
    --background-header: rgb(255 243 229);
    --background-form: #ffffff;
    --background-control: #2a2a2b;
    --background-hover: #FB6706;
    --border-form: #262626;
    --border-input: #d3d3d3;
    --accent: #4965ff;
    --accent-dark: #3c56e3;
    --text-primary: rgb(34, 34, 34);
    --text-secondary: #4d4d4d;
    --text-control: #999;
    --text-inverted: rgb(255, 255, 255);
    --success: #21b66f;
    --info: #7685d5;
    --warning: #ffc780;
    --error: #F25B2A;
}

body {
    font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    font-size: var(--font-size-medium);
    margin: 0;
    background: var(--background-primary);
    color: var(--text-primary);
}

input {
    appearance: textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input:invalid {
    box-shadow: none;
}

.view {
    min-height: calc(100vh - 96px);
    display: flex;
    align-items: center;
    justify-content: center;
}

@media only screen and (max-width: 768px) {
    .brand {
        margin-left: 16px;
    }

    .title {
        display: none;
    }

    .view {
        min-height: initial;
    }
}
</style>
