<template>
    <div
        @click="switchTheme"
        :class="{ checked: isEnabled }"
        class="theme-switcher"
    >
        <img v-if="!isEnabled" src="@/assets/night.svg" alt="night" />
        <img v-else src="@/assets/day.svg" alt="day" />
    </div>
</template>

<script>
import { ref, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    setup() {
        const isEnabled = ref(true);
        const store = useStore();

        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setTheme(storedTheme);
            store.dispatch('theme/setThemeDark');
            if (storedTheme === 'light'){
                isEnabled.value = false;
                store.dispatch('theme/setThemeLight');
            }
        }

        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        function switchTheme() {
            const currentTheme =
                document.documentElement.getAttribute('data-theme');

            if (!currentTheme || currentTheme === 'light') {
                localStorage.setItem('theme', 'dark');
                setTheme(null);
                isEnabled.value = true;
                store.dispatch('theme/setThemeDark');
            } else {
                localStorage.setItem('theme', 'light');
                setTheme('light');
                isEnabled.value = false;
                store.dispatch('theme/setThemeLight');
            }

        }

        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        function setTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
        }

        return { switchTheme, isEnabled };
    },
});
</script>

<style scoped>
.theme-switcher {
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
</style>
