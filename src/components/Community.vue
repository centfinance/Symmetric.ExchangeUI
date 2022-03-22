<template>
    <div class="community" @click="handleModal" >
        <img v-if="theme" src="@/assets/threeDotsBlack.svg" alt="community">
        <img v-else src="@/assets/threeDotsWhite.svg" alt="community">
    </div>
    <CommunityModal v-if="modalState" v-click-outside="closeModal"/>
</template>

<script lang="ts">
    import { defineComponent, computed, ref } from 'vue';
    import { useStore } from 'vuex';

    import { RootState } from '@/store';
    import CommunityModal from '@/components/CommunityModal.vue';

    import { ClickOutside } from "vue-click-outside-of";

    export default defineComponent({

        components: {
            CommunityModal,
        },

        setup() {
            const modalState = ref(false);
            const store = useStore<RootState>();

            const theme = computed(() => {
                const { theme } = store.state.theme;
                return theme;
            });

            function handleModal() {
                modalState.value = !modalState.value;
            }

            function closeModal() {
                modalState.value = false;
            }

            return {
                theme,
                modalState,
                handleModal,
                closeModal
            };
        },
        
        directives: { ClickOutside },
    })
</script>

<style scoped>
    .community {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 36px;
        min-width: 36px;
        height: 36px;
        margin-right: 15px;
        border-radius: 9px;
        cursor: pointer;
        background-color: var(--background-secondary);
    }

    .community:hover {
        background: var(--background-hover);
    }
</style>