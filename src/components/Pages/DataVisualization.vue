<!--

Remember to:
1. Change NewComponentName to the name of the component
2. Import this component via the file relative file path into parent component
3. Declare the component under 'components' in parent component

-->

<template>
    <h3>{{title}}</h3>
    <img v-if="!receivedData" alt="Subaru Legacy B4" height="333" width="500" src="../../assets/carpic_3.jpg">
    <br>
    <br>
        <q-card class="my-card" bordered>
            <q-card-section>
                <div class="text-h6 text-grey-8">
                    Filters
                </div>
            </q-card-section>
            <q-separator/>
            <q-card-actions align="center">
                <div class="q-pa-md">
                    <!-- RPM Filter-->
                    <q-badge color="primary" class="q-mb-lg">
                        <h6>Engine Speed</h6>
                    </q-badge>
                    <q-range
                        v-model="rpmFilter"
                        :min="0"
                        :max="10000"
                        :step="100"
                        label-always
                    />
                    <!-- Load Filter-->
                    <q-badge color="primary" class="q-mb-lg">
                        <h6>Engine Load</h6>
                    </q-badge>
                    <q-range
                        v-model="loadFilter"
                        :min="0.0"
                        :max="10.0"
                        :step="0.1"
                        label-always
                    />
                    <!-- Boost Filter-->
                    <q-badge color="primary" class="q-mb-lg">
                        <h6>Boost</h6>
                    </q-badge>
                    <q-range
                        v-model="boostFilter"
                        :min="-50.0"
                        :max="50.0"
                        :step="0.1"
                        label-always
                    />
                </div>
            </q-card-actions>
        </q-card>
    <br>
    <br>
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
    title: string = "Data Visualization";
    receivedData: boolean = false;
    parsedLogs: DataVisualizationLog[] = [];
    plots: PlotData[] = [];
    
    // filters
    rpmFilter = {
        min: 1000,
        max: 10000,
    };
    loadFilter = {
        min: 1.0,
        max: 100.0,
    };
    boostFilter = {
        min: 0.0,
        max: 50.0,
    };
    filters = {
        rpm: this.rpmFilter,
        load: this.loadFilter,
        boost: this.boostFilter,
    };
    rawData = {
        categories: [],
        lines: [],
    }
    filteredLogs: DataVisualizationLog[] = [];

    buildObjects(data: {categories: string[], lines: string[]}){
        this.receivedData = false;
        this.plots.length = 0;
        data.lines.forEach(line => {
            if (line && line != ""){
                let lineData = line.split(',');
                let log = new DataVisualizationLog(data.categories, lineData);
                this.parsedLogs.push(log);
            }
        })

        // filter data
        this.filteredLogs = this.parsedLogs.filter( a => 
                                                    a.engine_speed >= this.filters.rpm.min && 
                                                    a.engine_speed <= this.filters.rpm.max &&
                                                    a.engine_load >= this.filters.load.min &&
                                                    a.engine_load <= this.filters.load.max &&
                                                    a.boost >= this.filters.boost.min &&
                                                    a.boost <= this.filters.boost.max
                                                );

        this.receivedData = true;
        if (data.categories.some(a => a == "Engine Speed (rpm)")){
            if(data.categories.some(fb => fb == "Feedback Knock Correction* (degrees)" || fb == "Feedback Knock Correction (degrees)")){
                let data = this.filteredLogs.filter(f => f.feedback_knock_corr != 0).map(a => new ScatterPoint(a.engine_speed, a.feedback_knock_corr, 5));
                this.plots.push(new PlotData(data, 'Engine Speed (rpm)', "Feedback Knock Correction (degrees)", "Feedback Knock Correction vs. Engine RPM", "RPM", "FBKC"));
            }
            if(data.categories.some(fb => (fb == "Feedback Knock Correction* (degrees)" || fb == "Feedback Knock Correction (degrees)")) && data.categories.some(fl => fl == "Fine Learning Knock Correction (degrees)" || fl == "Fine Learning Knock Correction* (degrees)") && data.categories.some(el => el == "Engine Load (Calculated) (g/rev)" || el == "Engine Load* (g/rev)" || el == "Engine Load (g/rev)")){
                let data = this.filteredLogs.filter(a => a.feedback_knock_corr  != 0 || a.fine_knock_corr != 0).map(b => new ScatterPoint(b.engine_speed, b.engine_load, (Math.abs(b.feedback_knock_corr + b.fine_knock_corr))*3));
                this.plots.push(new PlotData(data, 'Engine Speed (rpm)', 'Engine Load (g/rev)', "Engine Load vs. Engine RPM where Knock Events Occur", "RPM", "LOAD", "TKNOCK", (x: number) => x/-3));
            }
            if(data.categories.some(mp => mp == "Manifold Relative Pressure (psi)")){
                let data = this.filteredLogs.map(a => new ScatterPoint(a.engine_speed, a.boost, 5));
                this.plots.push(new PlotData(data, 'Engine Speed (rpm)', 'Manifold Relative Pressure (psi)', "Manifold Relative Pressure vs. Engine RPM", "RPM", "PSI"));
            }
            if(data.categories.some(wg => wg == "Primary Wastegate Duty Cycle (%)")){
                let data = this.filteredLogs.map(a => new ScatterPoint(a.engine_speed, a.wastegate_duty, 5));
                this.plots.push(new PlotData(data, 'Engine Speed (rpm)', "Primary Wastegate Duty Cycle (%)", "Wastegate Duty Cycle vs. Engine RPM", "RPM", "WGDC"));
            }
            if(data.categories.some(aem => aem == "AEM UEGO Wideband [9600 baud] (AFR Gasoline)")){
                let data = this.filteredLogs.map(a => new ScatterPoint(a.engine_speed, a.wideband_afr, 5));
                this.plots.push(new PlotData(data, 'Engine Speed (rpm)', "AEM UEGO Wideband [9600 baud] (AFR Gasoline)", "Wideband AFR vs. Engine RPM", "RPM", "AFR"));
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