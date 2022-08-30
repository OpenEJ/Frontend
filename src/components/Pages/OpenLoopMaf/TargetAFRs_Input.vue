<template>
    <div>
        <textarea id="load"></textarea>
        <textarea id="rpm"></textarea>
        <textarea id="target_afrs"></textarea>
        <button v-on:click="readData()">Read Target Afr Data</button>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class TargetAFRs_Input extends Vue{
    readData() {

    }
}
</script>

<style scoped>
</style>