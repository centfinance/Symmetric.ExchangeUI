<template>
    <div>
        <div>
            <div>
                <span class="asset">
                    SYMM1
                </span>
                
                <input
                    v-model="tokenAddress"
                    disabled
                    type="text"
                    class="amount"
                >
            </div>
            
            <div>
                <span class="asset">
                    Amount
                </span>
                
                <input
                    v-model="amount"
                    type="number"
                    class="amount"
                >
            </div>
            
            <div>
                <span class="asset">
                    Destination Network ID
                </span>
                
                <input
                    v-model="destNetworkId"
                    type="number"
                    class="amount"
                >
            </div>
           
            <div>
                <span class="asset">
                    Recipient Address
                </span>
                
                <input
                    v-model="recipientAddress"
                    type="text"
                    class="amount"
                >
            </div>
        
            <div class="section">
                <Button
                    :text="'Bridge'"
                    :primary="false"
                    :loading="isProcess"
                    @click="bridge"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { Contract } from '@ethersproject/contracts';
import { parseEther, formatEther } from '@ethersproject/units';
import { hexZeroPad } from '@ethersproject/bytes';
import BridgeABI from '@/abi/Bridge.json';
import ERC20ABI from '@/abi/ERC20.json';
import Button from '@/components/Button.vue';
import { RootState } from '@/store';


export default defineComponent({
    components: {
        Button,
    },
    setup() {
        const store = useStore<RootState>();

        const tokenAddress = '0x7c64aD5F9804458B8c9F93f7300c15D55956Ac2a';
        // const opticsBridge = '0xf244eA81F715F343040569398A4E7978De656bf6';
        const opticsBridge = '0x1548cf5cf7dBd93f4dA11f45fCce315573d21B60';
        const destNetworkId = ref(6648936);
        const recipientAddress = ref('0xe456f9A32E5f11035ffBEa0e97D1aAFDA6e60F03');
        const amount = ref(1);
        const isProcess = ref(false);

        async function bridge(): Promise<void> {
            if (isProcess.value) return;
            
            try {
                isProcess.value = true;
                const provider = await store.getters['account/provider'];
                const bridgeContract = new Contract(opticsBridge, BridgeABI, provider.getSigner());
                
                const tokenContract = new Contract(tokenAddress, ERC20ABI, provider.getSigner());
                const address = store.state.account.address;
                const currentBalance = formatEther(await tokenContract.balanceOf(address));
                if (parseFloat(currentBalance) < amount.value) {
                    alert('Not enough funds');
                    return;
                }
                const tx = await tokenContract.approve(opticsBridge, parseEther(amount.value.toString()));
              
                await tx.wait();
                await bridgeContract.send(tokenAddress, parseEther(amount.value.toString()), destNetworkId.value, hexZeroPad(recipientAddress.value.toString(), 32));
            } catch(error) {
                console.log({error});
            }
            isProcess.value = false;
            return;
        }

        return {
            amount,
            tokenAddress,
            destNetworkId,
            isProcess,
            recipientAddress,
            bridge,
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
    width: 170px;
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
    justify-content: center;
    margin-top: 10px;
}
</style>