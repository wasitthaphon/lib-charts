import { OnChanges, SimpleChanges } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexGrid, ApexLegend, ApexMarkers, ApexStroke, ApexTitleSubtitle, ApexXAxis, ApexYAxis } from 'ng-apexcharts';
import { BehaviorSubject, Observable } from 'rxjs';
import * as i0 from "@angular/core";
type LineChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    stroke: ApexStroke;
    dataLabels: ApexDataLabels;
    markers: ApexMarkers;
    colors: string[];
    yaxis: ApexYAxis;
    grid: ApexGrid;
    legend: ApexLegend;
    title: ApexTitleSubtitle;
};
export declare class LineComponent implements OnChanges {
    data: Observable<any[]> | null;
    categoryKey: string;
    seriesKey: string[];
    chartTitle: string;
    xTitle: string;
    yTitle: string;
    loading: boolean;
    $chartOptions: BehaviorSubject<Partial<LineChartOptions>>;
    chartOptions: Partial<LineChartOptions>;
    series: {
        [k: string]: number[];
    };
    categories: string[];
    constructor();
    ngOnChanges(changes: SimpleChanges): void;
    makeChart(): void;
    checkRequiredField(input: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LineComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LineComponent, "lib-line", never, { "data": { "alias": "data"; "required": false; }; "categoryKey": { "alias": "categoryKey"; "required": false; }; "seriesKey": { "alias": "seriesKey"; "required": false; }; "chartTitle": { "alias": "chartTitle"; "required": false; }; "xTitle": { "alias": "xTitle"; "required": false; }; "yTitle": { "alias": "yTitle"; "required": false; }; }, {}, never, never, false, never>;
}
export {};
