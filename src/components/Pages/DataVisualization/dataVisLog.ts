
export default class DataVisualizationLog {
    engine_speed: number;
    boost: number;
    wastegate_duty: number;
    td_burst: number;
    td_cont: number;
    feedback_knock_corr: number;
    fine_knock_corr: number;
    wideband_afr: number;
    engine_load: number;
    constructor(categories: string[], data: string[]){
        this.engine_speed = parseInt(data[categories.indexOf("Engine Speed (rpm)")]);
        this.boost = parseFloat(data[categories.indexOf("Manifold Relative Pressure (psi)")]);
        this.wastegate_duty = parseFloat(data[categories.indexOf("Primary Wastegate Duty Cycle (%)")]);
        this.td_burst = parseFloat(data[categories.indexOf("will find later")]);
        this.td_cont = parseFloat(data[categories.indexOf("will find later as well")]);
        if(categories.includes("Feedback Knock Correction* (degrees)")){
            this.feedback_knock_corr = parseFloat(data[categories.indexOf("Feedback Knock Correction* (degrees)")]);
        }else if(categories.includes("Feedback Knock Correction (degrees)")){
            this.feedback_knock_corr = parseFloat(data[categories.indexOf("Feedback Knock Correction (degrees)")]);
        }else{
            this.feedback_knock_corr = 0;
        }
        this.wideband_afr = parseFloat(data[categories.indexOf("AEM UEGO Wideband [9600 baud] (AFR Gasoline)")]);
        if(categories.includes("Fine Learning Knock Correction (degrees)")){
            this.fine_knock_corr = parseFloat(data[categories.indexOf("Fine Learning Knock Correction (degrees)")]);
        }else if(categories.includes("Fine Learning Knock Correction* (degrees)")){
            this.fine_knock_corr = parseFloat(data[categories.indexOf("Fine Learning Knock Correction* (degrees)")]);
        }else{
            this.fine_knock_corr = 0;
        }
        if(categories.includes("Engine Load (Calculated) (g/rev)")){
            this.engine_load = parseFloat(data[categories.indexOf("Engine Load (Calculated) (g/rev)")]);
        }else if(categories.includes("Engine Load (g/rev)")){
            this.engine_load = parseFloat(data[categories.indexOf("Engine Load (g/rev)")]);
        }else if(categories.includes("Engine Load* (g/rev)")){
            this.engine_load = parseFloat(data[categories.indexOf("Engine Load* (g/rev)")]);
        }else{
            this.engine_load = 0;
        }
        
        

    }
}