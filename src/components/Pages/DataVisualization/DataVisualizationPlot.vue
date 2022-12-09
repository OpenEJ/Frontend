<!--

Remember to:
1. Change NewComponentName to the name of the component
2. Import this component via the file relative file path into parent component
3. Declare the component under 'components' in parent component

-->

<template>
    <Scatter :data="data" :options="options" />
</template>

<script lang="ts">
//Just regular TS here...

import { Vue, Options } from 'vue-class-component';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js'
import { Scatter } from 'vue-chartjs'
import PlotData from './plotData'
import { Prop } from 'vue-property-decorator';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)

@Options({
  components: {
    Scatter,
  },
})



export default class DataVisualizationPlot extends Vue {
    @Prop({default: [], required: true}) plot_data!: PlotData;

    data() {
        return {
            label: 'Scatter Dataset 1',
            fill: true,
            //borderColor: '#ff6384',
            //backgroundColor: '#ff6384',
            data: {
                datasets: [
                    { 
                        label: 'Data Point',
                        //color: '#ff6384',
                        data: this.plot_data.data
                    }
                ],
            },
            options: {
                response: false,
                layout: {
                    padding: {
                        left: 250,
                        right: 250,
                        top: 100,
                        bottom: 100
                    }
                },
                scales : {
                    x: 
                        {
                            title: {
                                text: this.plot_data.x_label,
                                display: true
                            }
                        },
                    y: 
                        {
                            title: {
                                text: this.plot_data.y_label,
                                display: true
                            }
                        }

                },
                elements: {
                    point: 
                        {
                            backgroundColor: '#ff6384'
                        }
                }

            }
        }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>