
export default class LowMafLog {
    "Time (msec)" : number;
    "A/F Correction #1 (%)": number;
    "A/F Learning #1 (%)" : number;
    "Intake Air Temperature (C)" : number;
    "Mass Airflow Sensor Voltage (V)" : number;
    "CL/OL Fueling* (status)" : number;
    constructor(categories: string[], data: string[]){
        this["Time (msec)"] = parseInt(data[categories.indexOf("Time (msec)")]);
        this["A/F Correction #1 (%)"] = parseFloat(data[categories.indexOf("A/F Correction #1 (%)")]);
        this["A/F Learning #1 (%)"] = parseFloat(data[categories.indexOf("A/F Learning #1 (%)")]);
        this["Intake Air Temperature (C)"] = parseInt(data[categories.indexOf("Intake Air Temperature (C)")]);
        this["Mass Airflow Sensor Voltage (V)"] = parseFloat(data[categories.indexOf("Mass Airflow Sensor Voltage (V)")]);
        this["CL/OL Fueling* (status)"] = parseInt(data[categories.indexOf("CL/OL Fueling* (status)")]);
    }
}