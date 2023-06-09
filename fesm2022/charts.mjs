import * as i0 from '@angular/core';
import { Injectable, Component, Input, NgModule } from '@angular/core';
import * as i1 from 'ng-apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BehaviorSubject } from 'rxjs';

class ChartsService {
    constructor() { }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: ChartsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: ChartsService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: ChartsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class ChartsComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: ChartsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: ChartsComponent, selector: "lib-charts", ngImport: i0, template: `
    <p>
      charts works!
    </p>
  `, isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: ChartsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-charts', template: `
    <p>
      charts works!
    </p>
  ` }]
        }] });

class LineComponent {
    constructor() {
        this.categoryKey = '';
        this.seriesKey = [];
        this.chartTitle = '';
        this.xTitle = '';
        this.yTitle = '';
        this.loading = false;
        this.chartOptions = {
            series: [],
            chart: {
                height: 400,
                type: "line",
                dropShadow: {
                    enabled: true,
                    color: "#000",
                    top: 18,
                    left: 7,
                    blur: 10,
                    opacity: 0.2
                },
                zoom: {
                    type: 'x',
                    enabled: true,
                    autoScaleYaxis: true
                },
                toolbar: {
                    autoSelected: 'zoom'
                }
            },
            dataLabels: {
                enabled: false
            },
            title: {
                text: this.chartTitle,
                align: "left"
            },
            grid: {
                borderColor: "#e7e7e7",
                row: {
                    colors: ["#f3f3f3", "transparent"],
                    opacity: 0.5
                },
            },
            markers: {
                size: 0
            },
            xaxis: {
                categories: [],
                title: {
                    text: this.xTitle
                }
            },
            yaxis: {
                title: {
                    text: this.yTitle
                },
            },
            legend: {
                position: "top",
                horizontalAlign: "right",
                floating: true,
                offsetY: -25,
                offsetX: -5
            }
        };
        this.series = {};
        this.categories = [];
        // for test
        // this.data = new Observable((obs) => {
        //   obs.next([
        //     {
        //       "processCode": "1120",
        //       "process": "Super Finish Process Output",
        //       "partType": "IR",
        //       "groupPart": "",
        //       "shift": "",
        //       "machine": "",
        //       "date": "20230601",
        //       "quantity": 3300091,
        //       "target": 3360000,
        //       "accum": 3300091,
        //       "targetAccum": 3360000
        //     },
        //     {
        //       "processCode": "1120",
        //       "process": "Super Finish Process Output",
        //       "partType": "IR",
        //       "groupPart": "",
        //       "shift": "",
        //       "machine": "",
        //       "date": "20230602",
        //       "quantity": 1532102,
        //       "target": 1680000,
        //       "accum": 4832193,
        //       "targetAccum": 5040000
        //     },
        //     {
        //       "processCode": "1120",
        //       "process": "Super Finish Process Output",
        //       "partType": "IR",
        //       "groupPart": "",
        //       "shift": "",
        //       "machine": "",
        //       "date": "20230604",
        //       "quantity": 1420154,
        //       "target": 1680000,
        //       "accum": 6252347,
        //       "targetAccum": 6720000
        //     },
        //     {
        //       "processCode": "1120",
        //       "process": "Super Finish Process Output",
        //       "partType": "IR",
        //       "groupPart": "",
        //       "shift": "",
        //       "machine": "",
        //       "date": "20230605",
        //       "quantity": 1541521,
        //       "target": 1680000,
        //       "accum": 7793868,
        //       "targetAccum": 8400000
        //     },
        //     {
        //       "processCode": "1120",
        //       "process": "Super Finish Process Output",
        //       "partType": "IR",
        //       "groupPart": "",
        //       "shift": "",
        //       "machine": "",
        //       "date": "20230606",
        //       "quantity": 1592995,
        //       "target": 1680000,
        //       "accum": 9386863,
        //       "targetAccum": 10080000
        //     }
        //   ]),
        //     obs.complete(),
        //     obs.unsubscribe();
        // });
        this.data = null;
        this.$chartOptions = new BehaviorSubject(this.chartOptions);
    }
    ngOnChanges(changes) {
        if (changes['data']) {
            this.makeChart();
        }
    }
    makeChart() {
        this.checkRequiredField(this.data);
        this.checkRequiredField(this.categoryKey);
        this.checkRequiredField(this.seriesKey);
        // manage values
        this.series = {};
        this.seriesKey.forEach((key) => {
            this.series[key] = [];
        });
        this.data?.subscribe((res) => {
            this.seriesKey.forEach((key) => {
                res.forEach((dataEl) => {
                    this.series[key].push(dataEl[key]);
                });
            });
            this.categories = [];
            res.forEach((dataEl) => {
                this.categories.push(dataEl[this.categoryKey]);
            });
            this.chartOptions.series = [];
            Object.entries(this.series).forEach(([key, value], index) => {
                this.chartOptions.series?.push({
                    name: key,
                    data: value
                });
            });
            this.chartOptions.title = {
                ...this.chartOptions.title,
                text: this.chartTitle
            };
            this.chartOptions.xaxis = {
                title: { ...this.chartOptions.xaxis?.title, text: this.xTitle },
                categories: this.categories
            };
            this.chartOptions.yaxis = {
                ...this.chartOptions.yaxis,
                title: {
                    text: this.yTitle
                }
            };
            this.$chartOptions.next(this.chartOptions);
        });
    }
    checkRequiredField(input) {
        if (input == null) {
            throw new Error('Attribute required.');
        }
        if (input == '') {
            throw new Error('Value required.');
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: LineComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: LineComponent, selector: "lib-line", inputs: { data: "data", categoryKey: "categoryKey", seriesKey: "seriesKey", chartTitle: "chartTitle", xTitle: "xTitle", yTitle: "yTitle" }, usesOnChanges: true, ngImport: i0, template: "<apx-chart \r\n    [series]=\"$chartOptions.getValue().series!\"\r\n    [chart]=\"$chartOptions.getValue().chart!\"\r\n    [xaxis]=\"$chartOptions.getValue().xaxis!\"\r\n    [stroke]=\"$chartOptions.getValue().stroke!\"\r\n    [colors]=\"$chartOptions.getValue().colors!\"\r\n    [dataLabels]=\"$chartOptions.getValue().dataLabels!\"\r\n    [legend]=\"$chartOptions.getValue().legend!\"\r\n    [markers]=\"$chartOptions.getValue().markers!\"\r\n    [grid]=\"$chartOptions.getValue().grid!\"\r\n    [yaxis]=\"$chartOptions.getValue().yaxis!\"\r\n    [title]=\"$chartOptions.getValue().title!\"\r\n>\r\n</apx-chart>", styles: [""], dependencies: [{ kind: "component", type: i1.ChartComponent, selector: "apx-chart", inputs: ["chart", "annotations", "colors", "dataLabels", "series", "stroke", "labels", "legend", "markers", "noData", "fill", "tooltip", "plotOptions", "responsive", "xaxis", "yaxis", "forecastDataPoints", "grid", "states", "title", "subtitle", "theme", "autoUpdateSeries"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: LineComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-line', template: "<apx-chart \r\n    [series]=\"$chartOptions.getValue().series!\"\r\n    [chart]=\"$chartOptions.getValue().chart!\"\r\n    [xaxis]=\"$chartOptions.getValue().xaxis!\"\r\n    [stroke]=\"$chartOptions.getValue().stroke!\"\r\n    [colors]=\"$chartOptions.getValue().colors!\"\r\n    [dataLabels]=\"$chartOptions.getValue().dataLabels!\"\r\n    [legend]=\"$chartOptions.getValue().legend!\"\r\n    [markers]=\"$chartOptions.getValue().markers!\"\r\n    [grid]=\"$chartOptions.getValue().grid!\"\r\n    [yaxis]=\"$chartOptions.getValue().yaxis!\"\r\n    [title]=\"$chartOptions.getValue().title!\"\r\n>\r\n</apx-chart>" }]
        }], ctorParameters: function () { return []; }, propDecorators: { data: [{
                type: Input,
                args: ['data']
            }], categoryKey: [{
                type: Input,
                args: ['categoryKey']
            }], seriesKey: [{
                type: Input,
                args: ['seriesKey']
            }], chartTitle: [{
                type: Input,
                args: ['chartTitle']
            }], xTitle: [{
                type: Input,
                args: ['xTitle']
            }], yTitle: [{
                type: Input,
                args: ['yTitle']
            }] } });

class ChartsModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: ChartsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.4", ngImport: i0, type: ChartsModule, declarations: [ChartsComponent,
            LineComponent], imports: [NgApexchartsModule], exports: [ChartsComponent,
            LineComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: ChartsModule, imports: [NgApexchartsModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: ChartsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        ChartsComponent,
                        LineComponent
                    ],
                    imports: [
                        NgApexchartsModule
                    ],
                    exports: [
                        ChartsComponent,
                        LineComponent
                    ]
                }]
        }] });

/*
 * Public API Surface of charts
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ChartsComponent, ChartsModule, ChartsService, LineComponent };
//# sourceMappingURL=charts.mjs.map
