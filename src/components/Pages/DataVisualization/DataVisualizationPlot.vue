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
import { defineComponent, PropType } from 'vue';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, Title)

export default defineComponent ({
    name: "DataVisualizationPlot", 
    components: {
        Bubble
    },
    props: {
        plot_data: {
            type: Object as PropType<PlotData>,
            required: true
        }
    },
    setup(props) {
        const getTooltip = (index: number) => {
            if(props.plot_data.r_abbrev != null){
                return props.plot_data.x_abbrev + ': ' + props.plot_data.data[index].x + ' ' + props.plot_data.y_abbrev + ': ' + props.plot_data.data[index].y + ' ' + props.plot_data.r_abbrev + ': ' + props.plot_data.r_logic(props.plot_data.data[index].r);
            }else{
                return props.plot_data.x_abbrev + ': ' + props.plot_data.data[index].x + ' ' + props.plot_data.y_abbrev + ': ' + props.plot_data.data[index].y;
            }
        };
        return {
            data: {
                datasets: [
                    { 
                        label: 'Data Point',
                        //color: '#ff6384',
                        data: props.plot_data.data
                    }
                ],
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: props.plot_data.title,
                        padding: {
                            top: 10,
                            bottom: 10
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (ctx: any) => {
                                //return 'RPM: ' + this.plot_data.data[ctx.dataIndex].x + '\nLOAD: ' + this.plot_data.data[ctx.dataIndex].y + '\nKNOCK: ' + (this.plot_data.data[ctx.dataIndex].r / -3);
                                return getTooltip(ctx.dataIndex);
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
                                text: props.plot_data.x_label,
                                display: true
                            }
                        },
                    y: 
                        {
                            title: {
                                text: props.plot_data.y_label,
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
})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>