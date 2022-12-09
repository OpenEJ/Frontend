<!--

Remember to:
1. Change NewComponentName to the name of the component
2. Import this component via the file relative file path into parent component
3. Declare the component under 'components' in parent component

-->

<template>
    <CSV_Input @csvProcessed="buildObjects($event)" />
    <div v-if="receivedData">
        <DataVisualizationPlot v-for="plot of plots" v-bind:key="plot"  :plot_data="plot"/>
    </div>
    


</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import CSV_Input from '../../components/CSV_Input.vue'
import DataVisualizationLog from './DataVisualization/dataVisLog';
import ScatterPoint from './DataVisualization/dataPoint'
import PlotData from './DataVisualization/plotData';
import DataVisualizationPlot from './DataVisualization/DataVisualizationPlot.vue'

@Options({
  components: {
    CSV_Input,
    DataVisualizationPlot,
  },
})

export default class DataVisualization extends Vue {
    //declare variables and write functions here
    receivedData: boolean = false;
    parsedLogs: DataVisualizationLog[] = []
    plots: PlotData[] = [];

    buildObjects(data: {categories: string[], lines: string[]}){
        this.receivedData = false;
        data.lines.forEach(line => {
            if (line && line != ""){
                let lineData = line.split(',');
                let log = new DataVisualizationLog(data.categories, lineData);
                this.parsedLogs.push(log);
            }
        })
        this.receivedData = true;
        if (data.categories.includes("Engine Speed (rpm)")){
            if(data.categories.includes("Feedback Knock Correction* (degrees)")){
                let data = this.parsedLogs.map(a => new ScatterPoint(a.engine_speed, a.feedback_knock_corr));
                this.plots.push(new PlotData(data, 'Engine Speed (rpm)', "Feedback Knock Correction* (degrees)"));
            }
            if(data.categories.includes("Manifold Relative Pressure (psi)")){
                let data = this.parsedLogs.map(a => new ScatterPoint(a.engine_speed, a.boost));
                this.plots.push(new PlotData(data, 'Engine Speed (rpm)', 'Manifold Relative Pressure (psi)'));
            }
            if(data.categories.includes("Primary Wastegate Duty Cycle (%)")){
                let data = this.parsedLogs.map(a => new ScatterPoint(a.engine_speed, a.wastegate_duty));
                this.plots.push(new PlotData(data, 'Engine Speed (rpm)', "Primary Wastegate Duty Cycle (%)"));
            }
            if(data.categories.includes("AEM UEGO Wideband [9600 baud] (AFR Gasoline)")){
                let data = this.parsedLogs.map(a => new ScatterPoint(a.engine_speed, a.wideband_afr));
                this.plots.push(new PlotData(data, 'Engine Speed (rpm)', "AEM UEGO Wideband [9600 baud] (AFR Gasoline)"));
            }
        }
        //if (this.)
        //this.apiRequest(logs);
    }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>