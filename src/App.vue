<template>
    <div id="app">
        <Header />
        <router-view class="view" />

        <ModalSettings :open="isSettingsModalOpen" />
        <ModalAccount :open="isAccountModalOpen" />
        <ModalConnectorSelector :open="isConnectorModalOpen" />
        <NotificationList :items="notifications" />
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

        const isSettingsModalOpen = computed(
            () => store.state.ui.modal.settings.isOpen,
        );
        const isAccountModalOpen = computed(
            () => store.state.ui.modal.account.isOpen,
        );
        const isConnectorModalOpen = computed(
            () => store.state.ui.modal.connector.isOpen,
        );

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
@import './styles/style.css';

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
