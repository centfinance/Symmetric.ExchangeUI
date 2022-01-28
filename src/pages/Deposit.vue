<template>
    <div>
        <div>
            <select v-model="tokenIndex" class="asset" @change="onChange">
                <option value="0">SYMM1</option>
                <option value="1">SYMM2</option>
            </select>

            <input v-model="amount" type="number" class="amount" />
            <div class="section">
                Your Balance: {{ currentBalance }}
                <br />
                Deposit Balance: {{ depositBalance }}
            </div>
            <div class="section">
                <Button
                    :text="'Deposit'"
                    :primary="false"
                    :loading="isProcess"
                    @click="deposit"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { Contract } from '@ethersproject/contracts';
import { parseEther, formatEther } from '@ethersproject/units';
import config, { depositWhiteList } from '@/config';
import DepositABI from '@/abi/Deposit.json';
import ERC20ABI from '@/abi/ERC20.json';
import Button from '@/components/Button.vue';
import { RootState } from '@/store';

export default defineComponent({
    components: {
        Button,
    },
    setup() {
        const router = useRouter();
        let provider: any;
        const tokenIndex = ref(0);
        const amount = ref(0);
        const currentBalance = ref('0');
        const depositBalance = ref('0');
        const isProcess = ref(false);
        const tokens = [
            '0x7c64aD5F9804458B8c9F93f7300c15D55956Ac2a',
            '0x8427bD503dd3169cCC9aFF7326c15258Bc305478',
        ];
        onMounted(async () => {
            provider = await store.getters['account/provider'];
            onChange();
        });
        const store = useStore<RootState>();
        const address = computed(() => {
            onChange();
            return store.state.account.address;
        });

        if (!depositWhiteList.includes(address.value)) {
            router.push('/swap');
        }

        async function onChange(): Promise<void> {
            if (!provider) {
                provider = await store.getters['account/provider'];
            }
            const tokenContract = new Contract(
                tokens[tokenIndex.value],
                ERC20ABI,
                provider.getSigner(),
            );
            if (address.value) {
                currentBalance.value = formatEther(
                    await tokenContract.balanceOf(address.value),
                );
            }
            depositBalance.value = formatEther(
                await tokenContract.balanceOf(config.addresses.deposit),
            );
        }

        async function deposit(): Promise<void> {
            if (isProcess.value) return;

            try {
                isProcess.value = true;
                const depositContract = new Contract(
                    config.addresses.deposit,
                    DepositABI,
                    provider.getSigner(),
                );
                const tokenContract = new Contract(
                    tokens[tokenIndex.value],
                    ERC20ABI,
                    provider.getSigner(),
                );
                const tx = await tokenContract.approve(
                    config.addresses.deposit,
                    parseEther(amount.value.toString()),
                );

                await tx.wait();
                await depositContract.deposit(
                    tokens[tokenIndex.value],
                    parseEther(amount.value.toString()),
                );
            } catch (error) {
                console.log({ error });
            }
            isProcess.value = false;
            return;
        }

        return {
            tokenIndex,
            amount,
            currentBalance,
            depositBalance,
            isProcess,
            deposit,
            onChange,
        };
    },
});
</script>

<style scoped>
.asset {
    background: #1b252c;
    padding: 10px 15px;
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 16px;
    cursor: pointer;
    border-right: 1px solid #2b3741;
    border-bottom-right-radius: 0%;
    border-top-right-radius: 0%;
}
.amount {
    background: #1b252c;
    padding: 10px 15px;
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 16px;
    cursor: pointer;
    border-left: 1px solid #2b3741;
    border-top-left-radius: 0%;
    border-bottom-left-radius: 0%;
}
.section {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}
</style>
