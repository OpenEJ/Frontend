<!--

Remember to:
1. Change NewComponentName to the name of the component
2. Import this component via the file relative file path into parent component
3. Declare the component under 'components' in parent component

-->

<template>
    <h3>{{title}}</h3>
    <img v-if="!receivedData" alt="World Rally Blue Gc8 Wrx" height="333" width="500" src="../../assets/carpic_2.jpg">
    <br>
    <br>
    <CSV_Input @csvProcessed="parse_csv($event)" />
    <br>
    <br>
    <TargetAFRs_Input @targetafr_processed="parse_targetafrs($event)"/>
    <br>
    <br>
    <q-btn label="Analyze Data" 
                      color="primary"
                      size="lg"
                      @click="apiRequest()"
                      />
    <br>
    <br>
    <OL_MAF_Output v-if="receivedData" :scales="scales" />
</template>

<script lang="ts">
//Just regular TS here...

import { Vue, Options } from 'vue-class-component';
import OL_MAF_Output from './OpenLoopMaf/OL_MAF_Output.vue';
import CSV_Input from '../../components/CSV_Input.vue'
import TargetAFRs_Input from './OpenLoopMaf/TargetAFRs_Input.vue';

import TopMafLog from './OpenLoopMaf/topMafLog';
import TopMafOutput from './OpenLoopMaf/topMafOutput';
import TopMafTargetAFRs from './OpenLoopMaf/topMafTargetAFRs';

@Options({
    components: {
        CSV_Input,
        TargetAFRs_Input,
        OL_MAF_Output
    },
})

export default class OpenLoppMaf extends Vue {
    //declare variables and write functions here
    title: string = 'Open Loop Mass Air Flow Scaling';
    receivedData: boolean = false;
    scales: TopMafOutput[] = [];
    
    csv_logs: TopMafLog[] = [];
    target_afrs: TopMafTargetAFRs[] = [];

    url = process.env.VUE_APP_URL;

    parse_csv(data: {categories: string[], lines: string[]}){
        let logs: TopMafLog[] = [];
        data.lines.forEach(line => {
            if (line && line != ""){
                let lineData = line.split(',');
                let log = new TopMafLog(data.categories, lineData);
                logs.push(log);
            }
        })
            
        this.csv_logs = logs;
        console.log("Csv Parsed");
    }

    parse_targetafrs(data: {load: number[], rpm: number[], targetafrs: number[][]} ){
        for (var j: number = 0; j<data.rpm.length; j++){
            for (var i: number = 0; i<data.load.length ; i++){
                let entry = new TopMafTargetAFRs(data.load[i], data.rpm[j], data.targetafrs[j][i]);
                this.target_afrs.push(entry);
            }
        }
        //console.log(this.target_afrs);
        console.log("Target Afrs parsed");
    }

    //should accept an array of topMafLog[] and topMafTargetAFRs[]
    apiRequest() {
        const apiUrl = this.url + "/api/analyze/1/";
        const data = { target_afr: this.target_afrs, log_data: this.csv_logs };
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };
        fetch(apiUrl, requestOptions).then(response => response.json())
        .then(inf => {
        this.scales = inf;
        this.receivedData = true;
        });
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    text-align:left;
    padding: 30px;
}
</style>
