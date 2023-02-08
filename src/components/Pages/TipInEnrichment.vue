<!--

Remember to:
1. Change NewComponentName to the name of the component
2. Import this component via the file relative file path into parent component
3. Declare the component under 'components' in parent component

-->

<template>
    <h3>Tip in Enrichment</h3>
    <img v-if="!receivedData" alt="Black Blobeye STi" height="334" width="500" src="../../assets/carpic_1.jpg">
    <br>
    <br>
    <CSV_Input @csvProcessed="buildObjects($event)"/>
    <br>
    <br>
    <TIE_Output v-if="receivedData" :corrections="corrections" />

</template>

<script lang="ts">
//Just regular TS here...

import { Vue, Options } from 'vue-class-component';
import CSV_Input from '../../components/CSV_Input.vue'
import TIE_Output from './TipInEnrichment/TIE_Output.vue'
import TieLog from './TipInEnrichment/tieLog'
import TieCorrections from './TipInEnrichment/tieCorrections'


@Options({
  components: {
    CSV_Input,
    TIE_Output
  },
})

export default class TipInEnrichment extends Vue {
    receivedData = false;
    corrections: TieCorrections[] = [];
    url = process.env.VUE_APP_URL;

    buildObjects(data: {categories: string[], lines: string[]}){
        this.receivedData = false;
        let logs: TieLog[] = [];
        data.lines.forEach(line => {
            if (line && line != ""){
                let lineData = line.split(',');
                let log = new TieLog(data.categories, lineData);
                logs.push(log);
            }
        })
            
        this.apiRequest(logs)
    }

    apiRequest(logs: TieLog[]){
        const apiUrl = this.url + "/api/analyze/2/";
        console.log(apiUrl);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(logs)
        };
        fetch(apiUrl, requestOptions).then(response => response.json())
        .then(inf => {
        this.corrections = inf;
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
