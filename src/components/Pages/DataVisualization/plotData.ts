import ScatterPoint from './dataPoint';

export default class PlotData {
    data: ScatterPoint[];
    title: string;
    x_label: string;
    x_abbrev: string;
    y_label: string;
    y_abbrev: string;
    r_abbrev: string | null;
    r_logic: ((arg: any) => any);
    constructor(data: ScatterPoint[],  x_label: string, y_label: string, title: string, x_abbrev: string, y_abbrev: string, r_abbrev?: string, r_logic?: (arg: any) => any){
        this.x_label = x_label;
        this.y_label = y_label;
        this.data = data;
        this.title = title;
        this.x_abbrev = x_abbrev;
        this.y_abbrev = y_abbrev;
        if (r_abbrev){
            this.r_abbrev = r_abbrev;
        }else{
            this.r_abbrev = null;
        }
        if(r_logic){
            this.r_logic = r_logic;
        }else{
            this.r_logic = (x: any) => x;
        }
    }
}

