<template>
    <div class="header">
        <router-link :to="'/'">
            <div class="brand">
                <span style="letter-spacing: 1px; font-size: 24px; font-weight: 600; color: FFFFFF;">
                    Symmetric&nbsp;
                </span>
                <span style="letter-spacing: 1px; font-size: 24px; font-weight: 600; color: #dc3bf9;">
                    (xDai)
                </span>

            </div>
        </router-link>
        <div class="header-right">
            <a
                class="link"
                href="https://pools-xdai.cent.finance"
                target="_blank"
            >
                Add Liquidity
            </a>
            <Account class="account" />
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

import logo from '@/assets/cent-logo-white.svg';

import Account from '@/components/Account.vue';

export default defineComponent({
    components: {
        Account,
    },
    setup() {
        return {
            logo,
        };
    },
});
</script>

<style scoped>
.header {
    height: 96px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--background-header);
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.15);
}

.header-right {
    display: flex;
    align-items: center;
}

.link {
    margin-right: 8px;
}

a {
    text-decoration: none;
    color: var(--text-primary);
}

.brand {
    margin-left: 40px;
    display: flex;
    align-items: center;
}

.logo {
    height: 40px;
}

.title {
    margin-left: 16px;
    font-size: 20px;
}

.account {
    margin-left: 8px;
    margin-right: 16px;
}

@media only screen and (max-width: 768px) {
    .brand {
        margin-left: 16px;
    }

    .title {
        display: none;
    }

    .link {
        display: none;
    }
}
</style>
