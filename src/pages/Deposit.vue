<template>
    <div>
        Deposit
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Contract } from 'ethcall';
import config from '@/config';
import depositABI from '@/abi/Deposit.json';

export default defineComponent({
    setup() {
        const depositContract = new Contract(config.addresses.deposit, depositABI);
    },
});
</script>

<style scoped>

</style>