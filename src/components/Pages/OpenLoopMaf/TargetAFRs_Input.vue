<template>
        <div class="q-pa-md">
            <div class="row" style="height:100px">
                <q-input class="col-4" square outlined v-model="load_str" label="Enter Load Values" />
                
                <q-input class="col-4" square outlined v-model="rpm_str" label="Enter Rpm Values" />
                
                <q-input class="col-4" square outlined v-model="targetafrs_str" label="Enter Target AFRs" />
            </div>
        </div>
        <q-btn label="Parse Target Afr Data" 
                      color="primary"
                      size="lg"
                      @click="parseData()"
                      />
</template>
<script lang="ts">
import { Vue } from 'vue-class-component';
//import { ref } from 'vue';

export default class TargetAFRs_Input extends Vue{
    load_str: string = "";
    rpm_str: string = "";
    targetafrs_str: string = "";

    load: number[] = [];
    rpm: number[] = [];
    targetafrs: number[][] = [];

    /*
    setup () {
        return {
            text: ref('')
        }
    }
    */
    
    parseData() {
        //we will parse the data from each of the textarea boxes, and store them in lists
        console.log(this.load_str);
        console.log(this.rpm_str);
        this.load = this.load_str.split("\t").map(entry => { return Number(entry); });
        this.rpm = this.rpm_str.split(" ").map(entry => { return Number(entry); });
        this.targetafrs = this.targetafrs_str.split(" ").map(row => {
            return row.split("\t").map( val => {
                return Number(val);
            });
        });
        console.log(this.load);
        console.log(this.rpm);
        console.log(this.targetafrs);

        this.$emit("targetafr_processed", {load: this.load, rpm: this.rpm, targetafrs: this.targetafrs});
    }
}
</script>
<style scoped>
</style>