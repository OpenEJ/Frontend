
export default class TieLog {
    engine_speed: number;
    cl_ol_status: number;
    throttle_open_angle: number;
    boost_error: number;
    tip_in_throttle: number;
    wideband_afr: number;
    constructor(categories: string[], data: string[]){
        this.engine_speed = parseInt(data[categories.indexOf("Engine Speed (rpm)")]);
        this.cl_ol_status = parseInt(data[categories.indexOf("CL/OL Fueling* (status)")]);
        this.throttle_open_angle = parseFloat(data[categories.indexOf("Throttle Opening Angle (%)")]);
        this.boost_error = parseFloat(data[categories.indexOf("Boost Error* (psi)")]);
        this.tip_in_throttle = parseFloat(data[categories.indexOf("Tip-in Throttle* (%)")]);
        this.wideband_afr = parseFloat(data[categories.indexOf("AEM UEGO Wideband [9600 baud] (AFR Gasoline)")]);
    }
}