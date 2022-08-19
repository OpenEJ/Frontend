export default class TieCorrection {
    throttle_angle_change: number;
    correction: number;
    frequency: number;
    constructor(tac: number, corr: number, freq: number){
        this.throttle_angle_change = tac;
        this.correction = corr;
        this.frequency = freq;
    }
}