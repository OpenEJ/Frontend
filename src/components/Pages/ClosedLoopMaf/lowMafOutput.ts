export default class LowMafOutput {
    MafVoltage: number;
    Correction: number;
    Frequency: number;
    constructor(mafvolt: number, corr: number, freq: number){
        this.MafVoltage = mafvolt;
        this.Correction = corr;
        this.Frequency = freq;
    }
}