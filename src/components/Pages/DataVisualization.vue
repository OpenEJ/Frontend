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
    <div v-if="receivedData.value" :key="key">
        <!-- Using index as unique id (key) -->
        <DataVisualizationPlot v-for="(plot, index) of plots" v-bind:key="index"  :plot_data="plot"/>
    </div>
</template>

<script lang="ts">
import CSV_Input from '../../components/CSV_Input.vue'
import DataVisualizationLog from './DataVisualization/dataVisLog';
import ScatterPoint from './DataVisualization/dataPoint'
import PlotData from './DataVisualization/plotData';
import DataVisualizationPlot from './DataVisualization/DataVisualizationPlot.vue'
import { defineComponent , reactive, watch } from 'vue';
import { ref } from 'vue';

export default defineComponent ({
    components: {
        CSV_Input,
        DataVisualizationPlot
    },
    setup() {
        //declare variables and write functions here
        const title: string = "Data Visualization";
        const receivedData = reactive({value: false}); // reactive is a new vue3 feature that creates a reactive reference to an object
        let parsedLogs: DataVisualizationLog[] = [];
        let plots = reactive<PlotData[]> ([]);
        
        // filters
        const rpmFilter = ref(
            {
                min: 1000,
                max: 10000
            }
        );
        const loadFilter = ref(
            {
                min: 0.0,
                max: 100.0
            }
        );
        const boostFilter = ref(
            {
                min: 0.0,
                max: 50.0
            }
        );
        let filteredLogs: DataVisualizationLog[] = [];

        const buildObjects = (data: {categories: string[], lines: string[]}) => {
            receivedData.value = false;
            plots.length = 0;
            data.lines.forEach(line => {
                if (line && line != ""){
                    let lineData = line.split(',');
                    let log = new DataVisualizationLog(data.categories, lineData);
                    parsedLogs.push(log);
                }
            })

            receivedData.value = true;
            if (data.categories.some(a => a == "Engine Speed (rpm)")){
                filteredLogs = parsedLogs.filter( a=>
                                                    a.engine_speed >= rpmFilter.value.min && 
                                                    a.engine_speed <= rpmFilter.value.max
                                                );
                if(data.categories.some(fb => fb == "Feedback Knock Correction* (degrees)" || fb == "Feedback Knock Correction (degrees)")){
                    let data = filteredLogs.filter(f => f.feedback_knock_corr != 0).map(a => new ScatterPoint(a.engine_speed, a.feedback_knock_corr, 5));
                    plots.push(new PlotData(data, 'Engine Speed (rpm)', "Feedback Knock Correction (degrees)", "Feedback Knock Correction vs. Engine RPM", "RPM", "FBKC"));
                }
                if(data.categories.some(fb => (fb == "Feedback Knock Correction* (degrees)" || fb == "Feedback Knock Correction (degrees)")) && data.categories.some(fl => fl == "Fine Learning Knock Correction (degrees)" || fl == "Fine Learning Knock Correction* (degrees)") && data.categories.some(el => el == "Engine Load (Calculated) (g/rev)" || el == "Engine Load* (g/rev)" || el == "Engine Load (g/rev)")){
                    filteredLogs = parsedLogs.filter( a=>
                                                        a.engine_load >= loadFilter.value.min &&
                                                        a.engine_load <= loadFilter.value.max
                                                    );  
                    let data = filteredLogs.filter(a => a.feedback_knock_corr  != 0 || a.fine_knock_corr != 0).map(b => new ScatterPoint(b.engine_speed, b.engine_load, (Math.abs(b.feedback_knock_corr + b.fine_knock_corr))*3));
                    plots.push(new PlotData(data, 'Engine Speed (rpm)', 'Engine Load (g/rev)', "Engine Load vs. Engine RPM where Knock Events Occur", "RPM", "LOAD", "TKNOCK", (x: number) => x/-3));
                }
                if(data.categories.some(mp => mp == "Manifold Relative Pressure (psi)")){
                    filteredLogs = parsedLogs.filter( a=>
                                                        a.boost >= boostFilter.value.min &&
                                                        a.boost <= boostFilter.value.max
                                                    );  
                    let data = filteredLogs.map(a => new ScatterPoint(a.engine_speed, a.boost, 5));
                    plots.push(new PlotData(data, 'Engine Speed (rpm)', 'Manifold Relative Pressure (psi)', "Manifold Relative Pressure vs. Engine RPM", "RPM", "PSI"));
                }
                if(data.categories.some(wg => wg == "Primary Wastegate Duty Cycle (%)")){
                    let data = filteredLogs.map(a => new ScatterPoint(a.engine_speed, a.wastegate_duty, 5));
                    plots.push(new PlotData(data, 'Engine Speed (rpm)', "Primary Wastegate Duty Cycle (%)", "Wastegate Duty Cycle vs. Engine RPM", "RPM", "WGDC"));
                }
                if(data.categories.some(aem => aem == "AEM UEGO Wideband [9600 baud] (AFR Gasoline)")){
                    let data = filteredLogs.map(a => new ScatterPoint(a.engine_speed, a.wideband_afr, 5));
                    plots.push(new PlotData(data, 'Engine Speed (rpm)', "AEM UEGO Wideband [9600 baud] (AFR Gasoline)", "Wideband AFR vs. Engine RPM", "RPM", "AFR"));
                }
            }
            console.log(plots);
        }

        const key = ref(0);
        watch(plots, () => 
            {
                // reload the DataVisualizationPlot component, when plots changes
                key.value += 1; // when vue detects that the key changes, it will reload that component
            },
            {deep: true} // enables deep watching, which watches the properties of PlotData for changes
        )

        // return any methods or variables that need to be accessed outside the function
        return {
            // methods
            buildObjects,

            // variables
            receivedData,
            title,
            plots,
            rpmFilter,
            loadFilter,
            boostFilter,
            key,
        }
    }

})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>