<template>
    <div>
        <div>
            <div class="center">SYMM1</div>

            <div>
                <span class="asset"> Amount </span>

                <input v-model="amount" type="number" class="amount" />
            </div>

            <div>
                <span class="asset"> Recipient Address </span>

                <input v-model="recipientAddress" type="text" class="amount" />
            </div>

            <div class="section">
                <Button
                    :text="'Celo=>Ethereum'"
                    :primary="false"
                    :loading="isCProcess"
                    @click="bridgeCE"
                />
                <Button
                    :text="'Ethereum=>Celo'"
                    :primary="false"
                    :loading="isEProcess"
                    @click="bridgeEC"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { Contract } from '@ethersproject/contracts';
import { parseEther, formatEther } from '@ethersproject/units';
import { hexZeroPad } from '@ethersproject/bytes';
import BridgeABI from '@/abi/Bridge.json';
import ERC20ABI from '@/abi/ERC20.json';
import Button from '@/components/Button.vue';
import { RootState } from '@/store';
import { bridgeWhiteList } from '@/config';

export default defineComponent({
    components: {
        Button,
    },
    setup() {
        const router = useRouter();
        const store = useStore<RootState>();
        const address = computed(() => store.state.account.address);
        if (!bridgeWhiteList.includes(address.value)) {
            router.push('/swap');
        }

        const tokenAddressC = '0x7c64aD5F9804458B8c9F93f7300c15D55956Ac2a';
        const tokenAddressE = '0x57dB3FfCa78dBbE0eFa0EC745D55f62aa0Cbd345';
        const opticsBridgeCE = '0xf244eA81F715F343040569398A4E7978De656bf6';
        const opticsBridgeEC = '0x4fc16De11deAc71E8b2Db539d82d93BE4b486892';
        const recipientAddress = ref(address);
        const amount = ref(1);
        const isCProcess = ref(false);
        const isEProcess = ref(false);

        async function bridgeCE(): Promise<void> {
            if (isCProcess.value) return;

            try {
                isCProcess.value = true;
                const provider = await store.getters['account/provider'];
                const bridgeContract = new Contract(
                    opticsBridgeCE,
                    BridgeABI,
                    provider.getSigner(),
                );

                const tokenContract = new Contract(
                    tokenAddressC,
                    ERC20ABI,
                    provider.getSigner(),
                );
                const currentBalance = formatEther(
                    await tokenContract.balanceOf(address.value),
                );
                if (parseFloat(currentBalance) < amount.value) {
                    alert('Not enough funds');
                    return;
                }
                const tx = await tokenContract.approve(
                    opticsBridgeCE,
                    parseEther(amount.value.toString()),
                );
                await tx.wait();
                await bridgeContract.send(
                    tokenAddressC,
                    parseEther(amount.value.toString()),
                    6648936,
                    hexZeroPad(recipientAddress.value.toString(), 32),
                );
            } catch (error) {
                console.log({ error });
            }
            isCProcess.value = false;
            return;
        }

        async function bridgeEC(): Promise<void> {
            if (isEProcess.value) return;

            try {
                isEProcess.value = true;
                const provider = await store.getters['account/provider'];
                const bridgeContract = new Contract(
                    opticsBridgeEC,
                    BridgeABI,
                    provider.getSigner(),
                );

                const tokenContract = new Contract(
                    tokenAddressE,
                    ERC20ABI,
                    provider.getSigner(),
                );
                const currentBalance = formatEther(
                    await tokenContract.balanceOf(address.value),
                );

                if (parseFloat(currentBalance) < amount.value) {
                    alert('Not enough funds');
                    return;
                }
                const tx = await tokenContract.approve(
                    opticsBridgeEC,
                    parseEther(amount.value.toString()),
                );
                await tx.wait();
                await bridgeContract.send(
                    tokenAddressE,
                    parseEther(amount.value.toString()),
                    1667591279,
                    hexZeroPad(recipientAddress.value.toString(), 32),
                );
            } catch (error) {
                console.log({ error });
            }
            isEProcess.value = false;
            return;
        }

        return {
            amount,
            isCProcess,
            isEProcess,
            recipientAddress,
            bridgeCE,
            bridgeEC,
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
    width: 130px;
    display: inline-block;
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
    width: 380px;
    margin-top: 5px;
}

.section {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
}
.center {
    text-align: center;
}
</style>
