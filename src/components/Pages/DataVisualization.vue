<!--

Remember to:
1. Change NewComponentName to the name of the component
2. Import this component via the file relative file path into parent component
3. Declare the component under 'components' in parent component

-->

<template>
    <CSV_Input @csvProcessed="buildObjects($event)" />

</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import CSV_Input from '../../components/CSV_Input.vue'
import DataVisualizationLog from './DataVisualization/dataVisLog';

@Options({
  components: {
    CSV_Input
  },
})

export default class DataVisualization extends Vue {
    //declare variables and write functions here
    receivedData: boolean = false;
    parsedLogs: DataVisualizationLog[] = []

    buildObjects(data: {categories: string[], lines: string[]}){
        this.receivedData = false;
        data.lines.forEach(line => {
            if (line && line != ""){
                let lineData = line.split(',');
                let log = new DataVisualizationLog(data.categories, lineData);
                this.parsedLogs.push(log);
            }
        })
        console.log(this.parsedLogs);
        //this.apiRequest(logs);
    }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>