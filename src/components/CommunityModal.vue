<template>
    <div class="communityModal" :class="{ communityModalBorder : theme }" >
        <a class="link" href="https://twitter.com/0xsymmetric" target="_blank" >
            <div>
                <div>Twitter</div>
                <div>
                    <img v-if="theme"  src="@/assets/twitterWhite.svg" alt="Twitter">
                    <img v-else class="twitterDark" src="@/assets/twitterDark.svg" alt="Twitter">
                    
                    <!-- <img v-else src="https://img.icons8.com/external-tal-revivo-regular-tal-revivo/19/000000/external-twitter-an-american-online-news-and-social-networking-service-logo-regular-tal-revivo.png" alt="Twitter"> -->
                </div>
            </div>
        </a>
        <a class="link" href="https://github.com/centfinance" target="_blank" >
            <div>
                <div>Github</div>
                <div >
                    <img v-if="theme" class="githubDark" src="@/assets/githubDark.svg" alt="Github">
                    <img v-else class="githubWhite" src="@/assets/githubWhite.svg" alt="Github">
                </div>
            </div>
        </a>
        <a class="link" href="https://discord.gg/rJd7azWx4V" target="_blank" >
            <div>
                <div>Discord</div>
                <div>
                    <img v-if="theme" class="discordDark" src="@/assets/discordDark.svg" alt="Discord">
                    <img v-else class="discordWhite" src="@/assets/discordWhite.svg" alt="Discord">
                </div>
            </div>
        </a>
        <a class="link" href="https://medium.com/@Symmetric.Finance" target="_blank" >
            <div>
                <div>Medium</div>
                <div>
                    <img v-if="theme" src="@/assets/mediumDark.svg" alt="Medium">
                    <img v-else src="@/assets/mediumWhite.svg" alt="Medium">
                </div>
            </div>
        </a>
    </div>
</template>

<script lang="ts">
    import { defineComponent, computed } from 'vue';
    import { useStore } from 'vuex';

    import { RootState } from '@/store';

    export default defineComponent({
        setup() {
            const store = useStore<RootState>();

            const theme = computed(() => {
                const { theme } = store.state.theme;
                return theme;
            });

            return {
                theme,
            };
        },
    })
</script>

<style scoped>
    .communityModal {
        position: absolute;
        width: 186px;
        height: 186px;
        top: 80px;
        right: 0px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 15px;
        border-radius: 9px;
        cursor: pointer;
        background-color: var(--background-form);
    }

    .communityModalBorder {
        border: 1px solid black;
    }

    .communityModal a {
        width: 140px;
        text-decoration: none;
        color: var(--text-primary);
        padding: 0.6rem;
        opacity: 0.7;
    }

    .communityModal a div{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        text-decoration: none;
        color: var(--text-primary);
    }

    .githubWhite .dircordWhite {
        margin-right: 0px;
    }

    .twitterDark {
        margin-right: 1px;
    }

    .githubDark .dircordDark {
        margin-right: 0px;
    }

    .communityModal a:hover {
        opacity: 1;
    }
</style>