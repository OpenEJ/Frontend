
export default class TieLog {
    throttle_position: number;
    throttle_angle_change: number;
    af_correction_short: number;
    af_correction_learning: number;
    constructor(categories: string[], data: string[]){
        this.af_correction_short = parseFloat(data[categories.indexOf("A/F Correction #1 (%)")]);
        this.af_correction_learning = parseFloat(data[categories.indexOf("A/F Learning #1 (%)")]);
        
        //NEED TO UPDATE TO CORRECT FIELD NAME
        this.throttle_angle_change = parseFloat(data[categories.indexOf("A/F Learning #1 (%)")]);
        this.throttle_position = parseFloat(data[categories.indexOf("A/F Learning #1 (%)")]);

    }
}