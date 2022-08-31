export default class TopMafLog {
    mass_airflow_voltage : number;
    throttle_position: number;
    load: number;
    rpm: number;
    wideband_o2: number;
    
    constructor(categories: string[], data: string[]){
        this.mass_airflow_voltage = parseFloat(data[categories.indexOf("Mass Airflow Sensor Voltage (V)")]);
        this.throttle_position = parseFloat(data[categories.indexOf("Throttle Opening Angle (%)")]);
        this.load = parseFloat(data[categories.indexOf("Engine Load* (g/rev)")]);
        this.rpm = parseInt(data[categories.indexOf("Engine Speed (rpm)")]);
        this.wideband_o2 = parseFloat(data[categories.indexOf("AEM UEGO Wideband [9600 baud] (AFR Gasoline)")]);
    }
}
