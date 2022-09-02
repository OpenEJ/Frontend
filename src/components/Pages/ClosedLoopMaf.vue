<!--

Remember to:
1. Change NewComponentName to the name of the component
2. Import this component via the file relative file path into ../App.vue
3. Declare the components under 'components' in App.vue

-->

<template>
    <h1>{{title}}</h1>
    <img alt="Sedona Red Pearl Bugeye Impreza WRX" height="300" width="500" src="../../assets/carpic_0.jpg">
    <br>
    <br>
    <CSV_Input @csvProcessed="buildObjects($event)" />
    <br>
    <br>
    <CL_MAF_Output v-if="receivedData" :scales="scales" />
</template>

<script lang="ts">
//Just regular TS here...

import { Vue, Options } from 'vue-class-component';
import CL_MAF_Output from './ClosedLoopMaf/CL_MAF_Output.vue'
import CSV_Input from '../../components/CSV_Input.vue'

import LowMafLog from './ClosedLoopMaf/lowMafLog';
import LowMafOutput from './ClosedLoopMaf/lowMafOutput'

@Options({
  components: {
    CL_MAF_Output,
    CSV_Input
  },
})

export default class ClosedLoopMaf extends Vue {
    title: string = 'Closed Loop Mass Air Flow Scaling';
    receivedData: boolean = false;
    scales: LowMafOutput[] = [];
    url = process.env.VUE_APP_URL;


    buildObjects(data: {categories: string[], lines: string[]}){
        this.receivedData = false;
        let logs: LowMafLog[] = [];
        data.lines.forEach(line => {
            if (line && line != ""){
                let lineData = line.split(',');
                let log = new LowMafLog(data.categories, lineData);
                logs.push(log);
            }
        })
            
        this.apiRequest(logs);
    }


    apiRequest(logs: LowMafLog[]){
        const apiUrl = this.url + ":8000/api/analyze/0/";
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(logs)
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