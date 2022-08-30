<!--

Remember to:
1. Change NewComponentName to the name of the component
2. Import this component via the file relative file path into parent component
3. Declare the component under 'components' in parent component

-->

<template>
    <h1>{{title}}</h1>
    <img alt="World Rally Blue Gc8 Wrx" height="300" width="500" src="../../assets/carpic_2.jpg">
    <br>
    <br>
    <CSV_Input @csvProcessed="buildObjects($event)" />
    <br>
    <br>
</template>

<script lang="ts">
//Just regular TS here...

import { Vue, Options } from 'vue-class-component';
//import OL_MAF_Output from './OpenLoopMaf/OL_MAF_Output.vue';
import CSV_Input from '../../components/CSV_Input.vue'

import TopMafLog from './OpenLoopMaf/topMafLog';
//import TopMafTargetAFRs from './OpenLoopMaf/topMafTargetAFRs';
import TopMafOutput from './OpenLoopMaf/topMafOutput';

@Options({
    components: {
        CSV_Input
    },
})

export default class OpenLoppMaf extends Vue {
    //declare variables and write functions here
    title: string = 'Open Loop Mass Air Flow Scaling';
    receivedData: boolean = false;
    scales: TopMafOutput[] = [];

    buildObjects(data: {categories: string[], lines: string[]}){
        this.receivedData = false;
        let logs: TopMafLog[] = [];
        data.lines.forEach(line => {
            if (line && line != ""){
                let lineData = line.split(',');
                let log = new TopMafLog(data.categories, lineData);
                logs.push(log);
            }
        })
            
        //this.apiRequest(logs);
    }

    //should accept an array of topMafLog[] and topMafTargetAFRs[]
    apiRequest(logs: any) {
        const apiUrl = "http://localhost:8000/api/analyze/1";
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(logs)
        };
        // fetch(apiUrl, requestOptions).then(response => response.json())
        // .then(inf => {
        // this.scales = inf;
        // this.receivedData = true;
        // });

    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>