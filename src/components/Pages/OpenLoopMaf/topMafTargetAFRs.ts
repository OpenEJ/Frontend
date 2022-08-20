export default class TopMafTargetAFRs {
    load: number;
    rpm: number;
    target_afr: number;
    
    constructor(categories: string[], data: string[]){
        this.load = parseFloat(data[categories.indexOf("load")]);
        this.rpm = parseInt(data[categories.indexOf("rpm")]);
        this.target_afr = parseInt(data[categories.indexOf("afr")]);
    }
}
