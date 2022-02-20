<template>
    <section
        class="dropDownMenuWrapper"
        :class="{
            'dropDownMenuWrapper--dark': isDarkMode,
            'dropDownMenuWrapper--noTitle': !network,
        }"
    >
        <button
            class="dropDownMenuButton"
            ref="menu"
            @click="openClose"
            :class="{ 'dropDownMenuButton--dark': isDarkMode }"
        >
            {{ network }}
        </button>

        <div class="iconWrapper">
            <Icon class="chevron-icon" :title="'chevron'" />
            <!-- <div
                class="bar1"
                :class="{ 'bar1--open': isOpen, 'bar1--dark': isDarkMode }"
            />
            <div
                class="bar2"
                :class="{ 'bar2--open': isOpen, 'bar2--dark': isDarkMode }"
            />
            <div
                class="bar3"
                :class="{ 'bar3--open': isOpen, 'bar3--dark': isDarkMode }"
            /> -->
        </div>

        <section
            class="dropdownMenu"
            v-if="isOpen"
            :class="{ 'dropdownMenu--dark': isDarkMode }"
        >
            <!-- <div class="menuArrow" :class="{ 'menuArrow--dark': isDarkMode }" /> -->
            <slot />
        </section>
    </section>
</template>

<script>
import { ref, defineComponent } from 'vue';
import Icon from '@/components/Icon.vue';
import config from '@/config';

export default defineComponent({
    components: {
        Icon,
    },
    setup() {
        const isDarkMode = ref(true);
        const menu = ref(null);
        const isOpen = ref(false);

        const storedTheme = localStorage.getItem('theme');

        if (storedTheme === 'light') {
            isDarkMode.value = false;
        } else {
            isDarkMode.value = true;
        }

        let network = 'Celo';

        if (config.network === 'xdai') {
            network = 'Gnosis';
        } else {
            network = 'Celo';
        }

        const openClose = () => {
            console.log('asdfasdf');
            const closeListerner = e => {
                // Check if user clicks outside of the menu
                // true — close the menu and remove EventListener
                if (catchOutsideClick(e, menu.value)) {
                    console.log('catchoutslideclick');
                    window.removeEventListener('click', closeListerner),
                        (isOpen.value = false);
                }
            };
            // Add event listener to watch clicks outside the menu
            window.addEventListener('click', closeListerner);
            // Close if open and vice versa
            isOpen.value = !isOpen.value;
        };

        const catchOutsideClick = (event, dropdown) => {
            // When user clicks menu — do nothing
            if (dropdown == event.target) return false;
            // When user clicks outside of the menu — close the menu
            if (isOpen.value && dropdown != event.target) return true;
        };

        return {
            network,
            menu,
            isOpen,
            isDarkMode,
            openClose,
            catchOutsideClick,
        };
    },
});
</script>

<style scoped>
.chevron-icon {
    width: 12px;
    height: 12px;
}
.dropDownMenuWrapper {
    position: relative;
    border-radius: 5px;
    width: 100px;
    height: 48px;
    background: white;
    border: 1px solid #eee;
    box-shadow: 10px 10px 0 0 rgba(0, 0, 0, 0.03);
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    margin-right: 10px;
}
.dropDownMenuWrapper * {
    box-sizing: border-box;
    text-align: left;
}
.dropDownMenuWrapper .dropDownMenuButton {
    border: none;
    font-size: inherit;
    background: transparent;
    outline: none;
    border-radius: 4px;
    display: flex;
    align-items: center;
    padding: 8px;
    margin: 0;
    line-height: 1;
    width: 100%;
    height: 100%;
    z-index: 2;
    cursor: pointer;
}
.dropDownMenuWrapper .dropDownMenuButton--dark {
    color: var(--text-primary);
}
.dropDownMenuWrapper .iconWrapper {
    width: 25px;
    height: 25px;
    position: absolute;
    right: 0px;
    top: 18px;
    z-index: 1;
}
.dropDownMenuWrapper .iconWrapper .bar1 {
    width: 100%;
    max-width: 28px;
    height: 3px;
    background: blue;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 9999px;
    transform: translate(-50%, calc(-50% - 8px));
    transition: all 0.2s ease;
}
.dropDownMenuWrapper .iconWrapper .bar1--dark {
    background: #eee;
}
.dropDownMenuWrapper .iconWrapper .bar1--open {
    transform: translate(-50%, -50%) rotate(45deg);
    margin-top: 0;
    background: red;
}
.dropDownMenuWrapper .iconWrapper .bar2 {
    width: 100%;
    max-width: 28px;
    height: 3px;
    background: blue;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 9999px;
    opacity: 1;
    transform: translate(-50%, -50%);
    transition: all 0.2s ease;
}
.dropDownMenuWrapper .iconWrapper .bar2--dark {
    background: #eee;
}
.dropDownMenuWrapper .iconWrapper .bar2--open {
    opacity: 0;
}
.dropDownMenuWrapper .iconWrapper .bar3 {
    width: 100%;
    max-width: 28px;
    height: 3px;
    background: blue;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 9999px;
    transform: translate(-50%, calc(-50% + 8px));
    transition: all 0.2s ease;
}
.dropDownMenuWrapper .iconWrapper .bar3--dark {
    background: #eee;
}
.dropDownMenuWrapper .iconWrapper .bar3--open {
    top: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    background: red;
}
.dropDownMenuWrapper .iconWrapper--noTitle {
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: auto;
    height: auto;
    transform: none;
}
.dropDownMenuWrapper .dropdownMenu {
    position: absolute;
    top: 100%;
    width: 100%;
    min-width: 160px;
    min-height: 10px;
    border-radius: 5px;
    border: 1px solid #eee;
    box-shadow: 10px 10px 0 0 rgba(0, 0, 0, 0.03);
    background: white;
    padding: 0px;
    animation: menu 0.3s ease forwards;
}
.dropDownMenuWrapper .dropdownMenu .menuArrow {
    width: 20px;
    height: 20px;
    position: absolute;
    top: -10px;
    left: 20px;
    border-left: 1px solid #eee;
    border-top: 1px solid #eee;
    background: white;
    transform: rotate(45deg);
    border-radius: 4px 0 0 0;
}
/* .dropDownMenuWrapper .dropdownMenu .menuArrow--dark {
    background: #333;
    border: none;
} */
.dropDownMenuWrapper .dropdownMenu .option {
    width: 100%;
    border-bottom: 1px solid #eee;
    padding: 20px 0;
    cursor: pointer;
    position: relative;
    z-index: 2;
}
.dropDownMenuWrapper .dropdownMenu .option:last-child {
    border-bottom: 0;
}
.dropDownMenuWrapper .dropdownMenu .option * {
    color: inherit;
    text-decoration: none;
    background: none;
    border: 0;
    padding: 0;
    outline: none;
    cursor: pointer;
}
.dropDownMenuWrapper .dropdownMenu .desc {
    opacity: 0.5;
    display: block;
    width: 100%;
    font-size: 14px;
    margin: 3px 0 0 0;
    cursor: default;
}
.dropDownMenuWrapper .dropdownMenu--dark {
    background: var(--background-secondary);
    border: none;
}
.dropDownMenuWrapper .dropdownMenu--dark .option {
    border-bottom: 1px solid #888;
}
.dropDownMenuWrapper .dropdownMenu--dark * {
    color: #eee;
}
@keyframes menu {
    from {
        transform: translate3d(0, 30px, 0);
    }
    to {
        transform: translate3d(0, 20px, 0);
    }
}
.dropDownMenuWrapper--noTitle {
    padding: 0;
    width: 60px;
    height: 60px;
}
.dropDownMenuWrapper--dark {
    background: var(--background-secondary);
    border: none;
}
</style>
