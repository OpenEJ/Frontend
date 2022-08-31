export default class TopMafOutput {
    MafVoltage: number;
    Correction: number;
    Frequency: number;
    constructor(mafvolt: number, corr: number, freq: number){
        this.MafVoltage = mafvolt;
        this.Correction = corr;
        this.Frequency = freq;
    }
}