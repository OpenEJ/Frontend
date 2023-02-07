<!--

Remember to:
1. Change NewComponentName to the name of the component
2. Import this component via the file relative file path into parent component
3. Declare the component under 'components' in parent component

-->

<template>
    <Bubble :data="data" :options="options" />
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
  Legend,
Title
} from 'chart.js'
import { Bubble } from 'vue-chartjs'
import PlotData from './plotData'
import { Prop } from 'vue-property-decorator';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, Title)

@Options({
  components: {
    Bubble,
  },
})



export default class DataVisualizationPlot extends Vue {
    @Prop({default: [], required: true}) plot_data!: PlotData;

    data() {
        return {
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
                plugins: {
                    title: {
                        display: true,
                        text: this.plot_data.title,
                        padding: {
                            top: 10,
                            bottom: 10
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (ctx: any) => {
                                //return 'RPM: ' + this.plot_data.data[ctx.dataIndex].x + '\nLOAD: ' + this.plot_data.data[ctx.dataIndex].y + '\nKNOCK: ' + (this.plot_data.data[ctx.dataIndex].r / -3);
                                return this.getTooltip(ctx.dataIndex);
                            }
                        }
                    },
                    legend: {
                        display: false
                    }
                },
                response: true,
                
                layout: {
                    padding: {
                        left: 100,
                        right: 100,
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

  getTooltip(index: number){
    if(this.plot_data.r_abbrev != null){
        return this.plot_data.x_abbrev + ': ' + this.plot_data.data[index].x + ' ' + this.plot_data.y_abbrev + ': ' + this.plot_data.data[index].y + ' ' + this.plot_data.r_abbrev + ': ' + this.plot_data.r_logic(this.plot_data.data[index].r);
    }else{
        return this.plot_data.x_abbrev + ': ' + this.plot_data.data[index].x + ' ' + this.plot_data.y_abbrev + ': ' + this.plot_data.data[index].y;
    }
  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>