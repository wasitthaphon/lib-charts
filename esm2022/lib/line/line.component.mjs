import { Component, Input, } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "ng-apexcharts";
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
export { LineComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jaGFydHMvc3JjL2xpYi9saW5lL2xpbmUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2hhcnRzL3NyYy9saWIvbGluZS9saW5lLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxHQUlOLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7OztBQWdCbkQsTUFLYSxhQUFhO0lBd0V4QjtRQXRFc0IsZ0JBQVcsR0FBVyxFQUFFLENBQUM7UUFDM0IsY0FBUyxHQUFhLEVBQUUsQ0FBQztRQUN4QixlQUFVLEdBQVcsRUFBRSxDQUFDO1FBQzVCLFdBQU0sR0FBVyxFQUFFLENBQUM7UUFDcEIsV0FBTSxHQUFXLEVBQUUsQ0FBQztRQUVyQyxZQUFPLEdBQVksS0FBSyxDQUFDO1FBRXpCLGlCQUFZLEdBQThCO1lBQ3hDLE1BQU0sRUFBRSxFQUFFO1lBQ1YsS0FBSyxFQUFFO2dCQUNMLE1BQU0sRUFBRSxHQUFHO2dCQUNYLElBQUksRUFBRSxNQUFNO2dCQUNaLFVBQVUsRUFBRTtvQkFDVixPQUFPLEVBQUUsSUFBSTtvQkFDYixLQUFLLEVBQUUsTUFBTTtvQkFDYixHQUFHLEVBQUUsRUFBRTtvQkFDUCxJQUFJLEVBQUUsQ0FBQztvQkFDUCxJQUFJLEVBQUUsRUFBRTtvQkFDUixPQUFPLEVBQUUsR0FBRztpQkFDYjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osSUFBSSxFQUFFLEdBQUc7b0JBQ1QsT0FBTyxFQUFFLElBQUk7b0JBQ2IsY0FBYyxFQUFFLElBQUk7aUJBQ3JCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxZQUFZLEVBQUUsTUFBTTtpQkFDckI7YUFDRjtZQUNELFVBQVUsRUFBRTtnQkFDVixPQUFP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U0FBUzsrQkFDRSxVQUFVOzBFQUtMLElBQUk7c0JBQWxCLEtBQUs7dUJBQUMsTUFBTTtnQkFDUyxXQUFXO3NCQUFoQyxLQUFLO3VCQUFDLGFBQWE7Z0JBQ0EsU0FBUztzQkFBNUIsS0FBSzt1QkFBQyxXQUFXO2dCQUNHLFVBQVU7c0JBQTlCLEtBQUs7dUJBQUMsWUFBWTtnQkFDRixNQUFNO3NCQUF0QixLQUFLO3VCQUFDLFFBQVE7Z0JBQ0UsTUFBTTtzQkFBdEIsS0FBSzt1QkFBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIE9uSW5pdCxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBcGV4QXhpc0NoYXJ0U2VyaWVzLCBBcGV4Q2hhcnQsIEFwZXhEYXRhTGFiZWxzLCBBcGV4R3JpZCwgQXBleExlZ2VuZCwgQXBleE1hcmtlcnMsIEFwZXhTdHJva2UsIEFwZXhUaXRsZVN1YnRpdGxlLCBBcGV4WEF4aXMsIEFwZXhZQXhpcyB9IGZyb20gJ25nLWFwZXhjaGFydHMnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbnR5cGUgTGluZUNoYXJ0T3B0aW9ucyA9IHtcclxuICBzZXJpZXM6IEFwZXhBeGlzQ2hhcnRTZXJpZXM7XHJcbiAgY2hhcnQ6IEFwZXhDaGFydDtcclxuICB4YXhpczogQXBleFhBeGlzO1xyXG4gIHN0cm9rZTogQXBleFN0cm9rZTtcclxuICBkYXRhTGFiZWxzOiBBcGV4RGF0YUxhYmVscztcclxuICBtYXJrZXJzOiBBcGV4TWFya2VycztcclxuICBjb2xvcnM6IHN0cmluZ1tdO1xyXG4gIHlheGlzOiBBcGV4WUF4aXM7XHJcbiAgZ3JpZDogQXBleEdyaWQ7XHJcbiAgbGVnZW5kOiBBcGV4TGVnZW5kO1xyXG4gIHRpdGxlOiBBcGV4VGl0bGVTdWJ0aXRsZTtcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdsaWItbGluZScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2xpbmUuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2xpbmUuY29tcG9uZW50LmNzcyddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGluZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCdkYXRhJykgZGF0YTogT2JzZXJ2YWJsZTxhbnlbXT4gfCBudWxsO1xyXG4gIEBJbnB1dCgnY2F0ZWdvcnlLZXknKSBjYXRlZ29yeUtleTogc3RyaW5nID0gJyc7XHJcbiAgQElucHV0KCdzZXJpZXNLZXknKSBzZXJpZXNLZXk6IHN0cmluZ1tdID0gW107XHJcbiAgQElucHV0KCdjaGFydFRpdGxlJykgY2hhcnRUaXRsZTogc3RyaW5nID0gJyc7XHJcbiAgQElucHV0KCd4VGl0bGUnKSB4VGl0bGU6IHN0cmluZyA9ICcnO1xyXG4gIEBJbnB1dCgneVRpdGxlJykgeVRpdGxlOiBzdHJpbmcgPSAnJztcclxuXHJcbiAgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICRjaGFydE9wdGlvbnM6IEJlaGF2aW9yU3ViamVjdDxQYXJ0aWFsPExpbmVDaGFydE9wdGlvbnM+PjtcclxuICBjaGFydE9wdGlvbnM6IFBhcnRpYWw8TGluZUNoYXJ0T3B0aW9ucz4gPSB7XHJcbiAgICBzZXJpZXM6IFtdLFxyXG4gICAgY2hhcnQ6IHtcclxuICAgICAgaGVpZ2h0OiA0MDAsXHJcbiAgICAgIHR5cGU6IFwibGluZVwiLFxyXG4gICAgICBkcm9wU2hhZG93OiB7XHJcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICBjb2xvcjogXCIjMDAwXCIsXHJcbiAgICAgICAgdG9wOiAxOCxcclxuICAgICAgICBsZWZ0OiA3LFxyXG4gICAgICAgIGJsdXI6IDEwLFxyXG4gICAgICAgIG9wYWNpdHk6IDAuMlxyXG4gICAgICB9LFxyXG4gICAgICB6b29tOiB7XHJcbiAgICAgICAgdHlwZTogJ3gnLFxyXG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgYXV0b1NjYWxlWWF4aXM6IHRydWVcclxuICAgICAgfSxcclxuICAgICAgdG9vbGJhcjoge1xyXG4gICAgICAgIGF1dG9TZWxlY3RlZDogJ3pvb20nXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBkYXRhTGFiZWxzOiB7XHJcbiAgICAgIGVuYWJsZWQ6IGZhbHNlXHJcbiAgICB9LFxyXG4gICAgdGl0bGU6IHtcclxuICAgICAgdGV4dDogdGhpcy5jaGFydFRpdGxlLFxyXG4gICAgICBhbGlnbjogXCJsZWZ0XCJcclxuICAgIH0sXHJcbiAgICBncmlkOiB7XHJcbiAgICAgIGJvcmRlckNvbG9yOiBcIiNlN2U3ZTdcIixcclxuICAgICAgcm93OiB7XHJcbiAgICAgICAgY29sb3JzOiBbXCIjZjNmM2YzXCIsIFwidHJhbnNwYXJlbnRcIl0sXHJcbiAgICAgICAgb3BhY2l0eTogMC41XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgbWFya2Vyczoge1xyXG4gICAgICBzaXplOiAwXHJcbiAgICB9LFxyXG4gICAgeGF4aXM6IHtcclxuICAgICAgY2F0ZWdvcmllczogW10sXHJcbiAgICAgIHRpdGxlOiB7XHJcbiAgICAgICAgdGV4dDogdGhpcy54VGl0bGVcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHlheGlzOiB7XHJcbiAgICAgIHRpdGxlOiB7XHJcbiAgICAgICAgdGV4dDogdGhpcy55VGl0bGVcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBsZWdlbmQ6IHtcclxuICAgICAgcG9zaXRpb246IFwidG9wXCIsXHJcbiAgICAgIGhvcml6b250YWxBbGlnbjogXCJyaWdodFwiLFxyXG4gICAgICBmbG9hdGluZzogdHJ1ZSxcclxuICAgICAgb2Zmc2V0WTogLTI1LFxyXG4gICAgICBvZmZzZXRYOiAtNVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHNlcmllczogeyBbazogc3RyaW5nXTogbnVtYmVyW10gfSA9IHt9XHJcbiAgY2F0ZWdvcmllczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAvLyBmb3IgdGVzdFxyXG4gICAgLy8gdGhpcy5kYXRhID0gbmV3IE9ic2VydmFibGUoKG9icykgPT4ge1xyXG4gICAgLy8gICBvYnMubmV4dChbXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgXCJwcm9jZXNzQ29kZVwiOiBcIjExMjBcIixcclxuICAgIC8vICAgICAgIFwicHJvY2Vzc1wiOiBcIlN1cGVyIEZpbmlzaCBQcm9jZXNzIE91dHB1dFwiLFxyXG4gICAgLy8gICAgICAgXCJwYXJ0VHlwZVwiOiBcIklSXCIsXHJcbiAgICAvLyAgICAgICBcImdyb3VwUGFydFwiOiBcIlwiLFxyXG4gICAgLy8gICAgICAgXCJzaGlmdFwiOiBcIlwiLFxyXG4gICAgLy8gICAgICAgXCJtYWNoaW5lXCI6IFwiXCIsXHJcbiAgICAvLyAgICAgICBcImRhdGVcIjogXCIyMDIzMDYwMVwiLFxyXG4gICAgLy8gICAgICAgXCJxdWFudGl0eVwiOiAzMzAwMDkxLFxyXG4gICAgLy8gICAgICAgXCJ0YXJnZXRcIjogMzM2MDAwMCxcclxuICAgIC8vICAgICAgIFwiYWNjdW1cIjogMzMwMDA5MSxcclxuICAgIC8vICAgICAgIFwidGFyZ2V0QWNjdW1cIjogMzM2MDAwMFxyXG4gICAgLy8gICAgIH0sXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgXCJwcm9jZXNzQ29kZVwiOiBcIjExMjBcIixcclxuICAgIC8vICAgICAgIFwicHJvY2Vzc1wiOiBcIlN1cGVyIEZpbmlzaCBQcm9jZXNzIE91dHB1dFwiLFxyXG4gICAgLy8gICAgICAgXCJwYXJ0VHlwZVwiOiBcIklSXCIsXHJcbiAgICAvLyAgICAgICBcImdyb3VwUGFydFwiOiBcIlwiLFxyXG4gICAgLy8gICAgICAgXCJzaGlmdFwiOiBcIlwiLFxyXG4gICAgLy8gICAgICAgXCJtYWNoaW5lXCI6IFwiXCIsXHJcbiAgICAvLyAgICAgICBcImRhdGVcIjogXCIyMDIzMDYwMlwiLFxyXG4gICAgLy8gICAgICAgXCJxdWFudGl0eVwiOiAxNTMyMTAyLFxyXG4gICAgLy8gICAgICAgXCJ0YXJnZXRcIjogMTY4MDAwMCxcclxuICAgIC8vICAgICAgIFwiYWNjdW1cIjogNDgzMjE5MyxcclxuICAgIC8vICAgICAgIFwidGFyZ2V0QWNjdW1cIjogNTA0MDAwMFxyXG4gICAgLy8gICAgIH0sXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgXCJwcm9jZXNzQ29kZVwiOiBcIjExMjBcIixcclxuICAgIC8vICAgICAgIFwicHJvY2Vzc1wiOiBcIlN1cGVyIEZpbmlzaCBQcm9jZXNzIE91dHB1dFwiLFxyXG4gICAgLy8gICAgICAgXCJwYXJ0VHlwZVwiOiBcIklSXCIsXHJcbiAgICAvLyAgICAgICBcImdyb3VwUGFydFwiOiBcIlwiLFxyXG4gICAgLy8gICAgICAgXCJzaGlmdFwiOiBcIlwiLFxyXG4gICAgLy8gICAgICAgXCJtYWNoaW5lXCI6IFwiXCIsXHJcbiAgICAvLyAgICAgICBcImRhdGVcIjogXCIyMDIzMDYwNFwiLFxyXG4gICAgLy8gICAgICAgXCJxdWFudGl0eVwiOiAxNDIwMTU0LFxyXG4gICAgLy8gICAgICAgXCJ0YXJnZXRcIjogMTY4MDAwMCxcclxuICAgIC8vICAgICAgIFwiYWNjdW1cIjogNjI1MjM0NyxcclxuICAgIC8vICAgICAgIFwidGFyZ2V0QWNjdW1cIjogNjcyMDAwMFxyXG4gICAgLy8gICAgIH0sXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgXCJwcm9jZXNzQ29kZVwiOiBcIjExMjBcIixcclxuICAgIC8vICAgICAgIFwicHJvY2Vzc1wiOiBcIlN1cGVyIEZpbmlzaCBQcm9jZXNzIE91dHB1dFwiLFxyXG4gICAgLy8gICAgICAgXCJwYXJ0VHlwZVwiOiBcIklSXCIsXHJcbiAgICAvLyAgICAgICBcImdyb3VwUGFydFwiOiBcIlwiLFxyXG4gICAgLy8gICAgICAgXCJzaGlmdFwiOiBcIlwiLFxyXG4gICAgLy8gICAgICAgXCJtYWNoaW5lXCI6IFwiXCIsXHJcbiAgICAvLyAgICAgICBcImRhdGVcIjogXCIyMDIzMDYwNVwiLFxyXG4gICAgLy8gICAgICAgXCJxdWFudGl0eVwiOiAxNTQxNTIxLFxyXG4gICAgLy8gICAgICAgXCJ0YXJnZXRcIjogMTY4MDAwMCxcclxuICAgIC8vICAgICAgIFwiYWNjdW1cIjogNzc5Mzg2OCxcclxuICAgIC8vICAgICAgIFwidGFyZ2V0QWNjdW1cIjogODQwMDAwMFxyXG4gICAgLy8gICAgIH0sXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgXCJwcm9jZXNzQ29kZVwiOiBcIjExMjBcIixcclxuICAgIC8vICAgICAgIFwicHJvY2Vzc1wiOiBcIlN1cGVyIEZpbmlzaCBQcm9jZXNzIE91dHB1dFwiLFxyXG4gICAgLy8gICAgICAgXCJwYXJ0VHlwZVwiOiBcIklSXCIsXHJcbiAgICAvLyAgICAgICBcImdyb3VwUGFydFwiOiBcIlwiLFxyXG4gICAgLy8gICAgICAgXCJzaGlmdFwiOiBcIlwiLFxyXG4gICAgLy8gICAgICAgXCJtYWNoaW5lXCI6IFwiXCIsXHJcbiAgICAvLyAgICAgICBcImRhdGVcIjogXCIyMDIzMDYwNlwiLFxyXG4gICAgLy8gICAgICAgXCJxdWFudGl0eVwiOiAxNTkyOTk1LFxyXG4gICAgLy8gICAgICAgXCJ0YXJnZXRcIjogMTY4MDAwMCxcclxuICAgIC8vICAgICAgIFwiYWNjdW1cIjogOTM4Njg2MyxcclxuICAgIC8vICAgICAgIFwidGFyZ2V0QWNjdW1cIjogMTAwODAwMDBcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgIF0pLFxyXG4gICAgLy8gICAgIG9icy5jb21wbGV0ZSgpLFxyXG4gICAgLy8gICAgIG9icy51bnN1YnNjcmliZSgpO1xyXG4gICAgLy8gfSk7XHJcbiAgICB0aGlzLmRhdGEgPSBudWxsO1xyXG4gICAgdGhpcy4kY2hhcnRPcHRpb25zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQYXJ0aWFsPExpbmVDaGFydE9wdGlvbnM+Pih0aGlzLmNoYXJ0T3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICBpZiAoY2hhbmdlc1snZGF0YSddKSB7XHJcbiAgICAgIHRoaXMubWFrZUNoYXJ0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtYWtlQ2hhcnQoKSB7XHJcbiAgICB0aGlzLmNoZWNrUmVxdWlyZWRGaWVsZCh0aGlzLmRhdGEpO1xyXG4gICAgdGhpcy5jaGVja1JlcXVpcmVkRmllbGQodGhpcy5jYXRlZ29yeUtleSk7XHJcbiAgICB0aGlzLmNoZWNrUmVxdWlyZWRGaWVsZCh0aGlzLnNlcmllc0tleSlcclxuXHJcbiAgICAvLyBtYW5hZ2UgdmFsdWVzXHJcbiAgICB0aGlzLnNlcmllcyA9IHt9O1xyXG4gICAgdGhpcy5zZXJpZXNLZXkuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgIHRoaXMuc2VyaWVzW2tleV0gPSBbXTtcclxuICAgIH0pXHJcblxyXG4gICAgdGhpcy5kYXRhPy5zdWJzY3JpYmUoKHJlcykgPT4ge1xyXG5cclxuICAgICAgdGhpcy5zZXJpZXNLZXkuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgcmVzLmZvckVhY2goKGRhdGFFbCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zZXJpZXNba2V5XS5wdXNoKGRhdGFFbFtrZXldKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICB0aGlzLmNhdGVnb3JpZXMgPSBbXTtcclxuICAgICAgcmVzLmZvckVhY2goKGRhdGFFbCkgPT4ge1xyXG4gICAgICAgIHRoaXMuY2F0ZWdvcmllcy5wdXNoKGRhdGFFbFt0aGlzLmNhdGVnb3J5S2V5XSlcclxuICAgICAgfSlcclxuXHJcbiAgICAgIHRoaXMuY2hhcnRPcHRpb25zLnNlcmllcyA9IFtdO1xyXG4gICAgICBPYmplY3QuZW50cmllcyh0aGlzLnNlcmllcykuZm9yRWFjaCgoW2tleSwgdmFsdWVdLCBpbmRleCkgPT4ge1xyXG4gICAgICAgIHRoaXMuY2hhcnRPcHRpb25zLnNlcmllcz8ucHVzaCh7XHJcbiAgICAgICAgICBuYW1lOiBrZXksXHJcbiAgICAgICAgICBkYXRhOiB2YWx1ZVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICB0aGlzLmNoYXJ0T3B0aW9ucy50aXRsZSA9IHtcclxuICAgICAgICAuLi50aGlzLmNoYXJ0T3B0aW9ucy50aXRsZSxcclxuICAgICAgICB0ZXh0OiB0aGlzLmNoYXJ0VGl0bGVcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5jaGFydE9wdGlvbnMueGF4aXMgPSB7XHJcbiAgICAgICAgdGl0bGU6IHsgLi4udGhpcy5jaGFydE9wdGlvbnMueGF4aXM/LnRpdGxlLCB0ZXh0OiB0aGlzLnhUaXRsZSB9LFxyXG4gICAgICAgIGNhdGVnb3JpZXM6IHRoaXMuY2F0ZWdvcmllc1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY2hhcnRPcHRpb25zLnlheGlzID0ge1xyXG4gICAgICAgIC4uLnRoaXMuY2hhcnRPcHRpb25zLnlheGlzLFxyXG4gICAgICAgIHRpdGxlOiB7XHJcbiAgICAgICAgICB0ZXh0OiB0aGlzLnlUaXRsZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0aGlzLiRjaGFydE9wdGlvbnMubmV4dCh0aGlzLmNoYXJ0T3B0aW9ucyk7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgY2hlY2tSZXF1aXJlZEZpZWxkKGlucHV0OiBhbnkpIHtcclxuICAgIGlmIChpbnB1dCA9PSBudWxsKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignQXR0cmlidXRlIHJlcXVpcmVkLicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpbnB1dCA9PSAnJykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZhbHVlIHJlcXVpcmVkLicpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIjxhcHgtY2hhcnQgXHJcbiAgICBbc2VyaWVzXT1cIiRjaGFydE9wdGlvbnMuZ2V0VmFsdWUoKS5zZXJpZXMhXCJcclxuICAgIFtjaGFydF09XCIkY2hhcnRPcHRpb25zLmdldFZhbHVlKCkuY2hhcnQhXCJcclxuICAgIFt4YXhpc109XCIkY2hhcnRPcHRpb25zLmdldFZhbHVlKCkueGF4aXMhXCJcclxuICAgIFtzdHJva2VdPVwiJGNoYXJ0T3B0aW9ucy5nZXRWYWx1ZSgpLnN0cm9rZSFcIlxyXG4gICAgW2NvbG9yc109XCIkY2hhcnRPcHRpb25zLmdldFZhbHVlKCkuY29sb3JzIVwiXHJcbiAgICBbZGF0YUxhYmVsc109XCIkY2hhcnRPcHRpb25zLmdldFZhbHVlKCkuZGF0YUxhYmVscyFcIlxyXG4gICAgW2xlZ2VuZF09XCIkY2hhcnRPcHRpb25zLmdldFZhbHVlKCkubGVnZW5kIVwiXHJcbiAgICBbbWFya2Vyc109XCIkY2hhcnRPcHRpb25zLmdldFZhbHVlKCkubWFya2VycyFcIlxyXG4gICAgW2dyaWRdPVwiJGNoYXJ0T3B0aW9ucy5nZXRWYWx1ZSgpLmdyaWQhXCJcclxuICAgIFt5YXhpc109XCIkY2hhcnRPcHRpb25zLmdldFZhbHVlKCkueWF4aXMhXCJcclxuICAgIFt0aXRsZV09XCIkY2hhcnRPcHRpb25zLmdldFZhbHVlKCkudGl0bGUhXCJcclxuPlxyXG48L2FweC1jaGFydD4iXX0=