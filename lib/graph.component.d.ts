import { AfterViewInit, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class GraphComponent implements OnInit, AfterViewInit {
    data: Observable<any[]> | undefined;
    keyValue: string;
    headerKey: string;
    figureId: string;
    limit: number;
    private svg;
    private margin;
    private width;
    private height;
    private radius;
    private colors;
    private createSvg;
    private createColors;
    private drawChart;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GraphComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GraphComponent, "lib-graph", never, { "data": { "alias": "dataTable"; "required": false; }; "keyValue": { "alias": "keyValue"; "required": false; }; "headerKey": { "alias": "headerKey"; "required": false; }; "figureId": { "alias": "figureId"; "required": false; }; "limit": { "alias": "limit"; "required": false; }; }, {}, never, never, true, never>;
}
