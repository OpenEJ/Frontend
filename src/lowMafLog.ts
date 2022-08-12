
export default class LowMafLog {
    time : number;
    af_correction_short : number;
    af_correction_learning: number;
    intake_air_temp : number;
    mass_airflow_voltage : number;
    cl_ol_status : number;
    constructor(categories: string[], data: string[]){
        this.time = parseInt(data[categories.indexOf("Time (msec)")]);
        this.af_correction_short = parseFloat(data[categories.indexOf("A/F Correction #1 (%)")]);
        this.af_correction_learning = parseFloat(data[categories.indexOf("A/F Learning #1 (%)")]);
        this.intake_air_temp = parseInt(data[categories.indexOf("Intake Air Temperature (C)")]);
        this.mass_airflow_voltage = parseFloat(data[categories.indexOf("Mass Airflow Sensor Voltage (V)")]);
        this.cl_ol_status = parseInt(data[categories.indexOf("CL/OL Fueling* (status)")]);
    }
}