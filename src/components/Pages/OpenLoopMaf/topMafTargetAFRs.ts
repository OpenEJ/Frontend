export default class TopMafTargetAFRs {
    load: number;
    rpm: number;
    target_afr: number;
    
    constructor(load: number, rpm: number, afr: number){
        this.load = load;
        this.rpm = rpm;
        this.target_afr = afr;
    }
}
