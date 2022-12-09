
export default class DataVisualizationLog {
    engine_speed: number;
    boost?: number;
    wastegate_duty?: number;
    td_burst?: number;
    td_cont?: number;
    feedback_knock_corr?: number;
    wideband_afr?: number;
    constructor(categories: string[], data: string[]){
        this.engine_speed = parseInt(data[categories.indexOf("Engine Speed (rpm)")]);
        this.boost = parseFloat(data[categories.indexOf("Manifold Relative Pressure (psi)")]);
        this.wastegate_duty = parseFloat(data[categories.indexOf("Primary Wastegate Duty Cycle (%)")]);
        //this.td_burst = 
        //this.td_cont = 
        this.feedback_knock_corr = parseFloat(data[categories.indexOf("Feedback Knock Correction* (degrees)")]);
        this.wideband_afr = parseFloat(data[categories.indexOf("AEM UEGO Wideband [9600 baud] (AFR Gasoline)")]);
        
        

    }
}