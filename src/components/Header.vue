<template>
    <div class="header">
        <div class="header-left">
            <router-link
                class="brand"
                :to="'/'"
            >
                <Icon
                    class="logo"
                    :title="'symmetric'"
                />
                <div class="title">SYMMETRIC </div><br>
            </router-link>
        </div>
        <div class="header-right">
            <a
                class="link"
                href="https://docs.symmetric.exchange"
                target="_blank"
                style="padding-right:10px;"
            >
                Documentation
            </a>
            <div style="padding-right:10px;">|</div>
            <a
                class="link"
                :href="networkUrl"
                target="_blank"
            >
                Add Liquidity
            </a>
            <Account class="account" />
        </div>
    </div>
</template>

<script>
import { defineComponent, computed } from 'vue';

import Icon from '@/components/Icon.vue';

import Account from '@/components/Account.vue';

import config from '@/config';

export default defineComponent({
    components: {
        Account,
        Icon,
    },
    setup() {
        const networkUrl = computed(() => {
            return `https://${config.network}-pools.symmetric.exchange/`;;
        });

        return {
            networkUrl,
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
.header-left {
    display: flex;
    align-items: flex-end;
}
.header-right {
    display: flex;
    align-items: center;
}

.network {
    color: #48A9A6;
    font-size: 12px; 
    font-weight: 200;
}
.link {
    margin-right: 8px;
}

a {
    text-decoration: none;
    color: var(--text-primary);
}

.brand {
    margin-left: 20px;
    display: flex;
    align-items: center;
}



.title {
    margin-left: 2px;
    letter-spacing: 1px; 
    font-size: 24px; 
    font-weight: 500;
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
