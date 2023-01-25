import ScatterPoint from './dataPoint';

export default class PlotData {
    data: ScatterPoint[];
    title: string;
    x_label: string;
    y_label: string;
    constructor(data: ScatterPoint[],  x_label: string, y_label: string, title: string){
        this.x_label = x_label;
        this.y_label = y_label;
        this.data = data;
        this.title = title;
    }
}

