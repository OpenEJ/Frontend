<template>
    <div>
        <label> Enter Load Values
            <textarea id="load" @input="updateLoad($event.target.value)"></textarea>
        </label>
        <br>
        <label> Enter Rpm Values
            <textarea id="rpm" @input="updateRpm($event.target.value)"></textarea>
        </label>
        <br>
        <label> Enter Target Afrs Values
            <textarea id="targetafrs" @input="updateTargetAfrs($event.target.value)"></textarea>
        </label>
        <br>
        <button v-on:click="parseData()">Read Target Afr Data</button>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class TargetAFRs_Input extends Vue{
    load_str: string = "";
    rpm_str: string = "";
    targetafrs_str: string = "";

    updateLoad(value: string) {
        this.load_str = value;
    }
    updateRpm(value: string) {
        this.rpm_str = value;
    }
    updateTargetAfrs(value: string) {
        this.targetafrs_str = value;
    }
    
    parseData() {
        console.log(`Load: ${this.load_str}`)
        console.log(`Rpm: ${this.rpm_str}`)
        console.log(`Target Afrs: ${this.targetafrs_str}`)
    }
}
</script>

<style scoped>
</style>