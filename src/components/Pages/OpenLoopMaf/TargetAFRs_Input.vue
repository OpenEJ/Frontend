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
        <button v-on:click="parseData()">Parse Target Afr Data</button>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class TargetAFRs_Input extends Vue{
    load_str: string = "";
    rpm_str: string = "";
    targetafrs_str: string = "";

    load: number[] = [];
    rpm: number[] = [];
    targetafrs: number[][] = [];

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
        //we will parse the data from each of the textarea boxes, and store them in lists
        this.load = this.load_str.split("\t").map(entry => { return Number(entry); });
        this.rpm = this.rpm_str.split("\n").map(entry => { return Number(entry); });
        this.targetafrs = this.targetafrs_str.split("\n").map(row => {
            return row.split("\t").map( val => {
                return Number(val);
            });
        });
        console.log(`Loads: ${this.load}`);
        console.log(`Rpms: ${this.rpm}`);
        console.log(`TargetAfrs ${this.targetafrs[1][2]}`);

        this.$emit("targetafr_processed", {load: this.load, rpm: this.rpm, targetafrs: this.targetafrs});
    }
}
</script>

<style scoped>
</style>