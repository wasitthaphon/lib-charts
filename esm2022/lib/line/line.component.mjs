import { Component, Input, } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "ng-apexcharts";
export class LineComponent {
    constructor() {
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
        this.$chartOptions = new BehaviorSubject(this.chartOptions);
    }
    ngOnInit() {
        this.checkRequiredField(this.data);
        this.checkRequiredField(this.categoryKey);
        this.checkRequiredField(this.seriesKey);
        // manage values
        this.seriesKey.forEach((key) => {
            this.series[key] = [];
        });
        this.data?.subscribe((res) => {
            this.seriesKey.forEach((key) => {
                res.forEach((dataEl) => {
                    this.series[key].push(dataEl[key]);
                });
            });
            res.forEach((dataEl) => {
                this.categories.push(dataEl[this.categoryKey]);
            });
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: LineComponent, selector: "lib-line", inputs: { data: "data", categoryKey: "categoryKey", seriesKey: "seriesKey", chartTitle: "chartTitle", xTitle: "xTitle", yTitle: "yTitle" }, ngImport: i0, template: "<apx-chart \r\n    [series]=\"$chartOptions.getValue().series!\"\r\n    [chart]=\"$chartOptions.getValue().chart!\"\r\n    [xaxis]=\"$chartOptions.getValue().xaxis!\"\r\n    [stroke]=\"$chartOptions.getValue().stroke!\"\r\n    [colors]=\"$chartOptions.getValue().colors!\"\r\n    [dataLabels]=\"$chartOptions.getValue().dataLabels!\"\r\n    [legend]=\"$chartOptions.getValue().legend!\"\r\n    [markers]=\"$chartOptions.getValue().markers!\"\r\n    [grid]=\"$chartOptions.getValue().grid!\"\r\n    [yaxis]=\"$chartOptions.getValue().yaxis!\"\r\n    [title]=\"$chartOptions.getValue().title!\"\r\n>\r\n</apx-chart>", styles: [""], dependencies: [{ kind: "component", type: i1.ChartComponent, selector: "apx-chart", inputs: ["chart", "annotations", "colors", "dataLabels", "series", "stroke", "labels", "legend", "markers", "noData", "fill", "tooltip", "plotOptions", "responsive", "xaxis", "yaxis", "forecastDataPoints", "grid", "states", "title", "subtitle", "theme", "autoUpdateSeries"] }] }); }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jaGFydHMvc3JjL2xpYi9saW5lL2xpbmUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2hhcnRzL3NyYy9saWIvbGluZS9saW5lLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxHQUVOLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7OztBQXFCbkQsTUFBTSxPQUFPLGFBQWE7SUFnRXhCO1FBQ0UsV0FBVztRQUNYLHdDQUF3QztRQUN4QyxlQUFlO1FBQ2YsUUFBUTtRQUNSLCtCQUErQjtRQUMvQixrREFBa0Q7UUFDbEQsMEJBQTBCO1FBQzFCLHlCQUF5QjtRQUN6QixxQkFBcUI7UUFDckIsdUJBQXVCO1FBQ3ZCLDRCQUE0QjtRQUM1Qiw2QkFBNkI7UUFDN0IsMkJBQTJCO1FBQzNCLDBCQUEwQjtRQUMxQiwrQkFBK0I7UUFDL0IsU0FBUztRQUNULFFBQVE7UUFDUiwrQkFBK0I7UUFDL0Isa0RBQWtEO1FBQ2xELDBCQUEwQjtRQUMxQix5QkFBeUI7UUFDekIscUJBQXFCO1FBQ3JCLHVCQUF1QjtRQUN2Qiw0QkFBNEI7UUFDNUIsNkJBQTZCO1FBQzdCLDJCQUEyQjtRQUMzQiwwQkFBMEI7UUFDMUIsK0JBQStCO1FBQy9CLFNBQVM7UUFDVCxRQUFRO1FBQ1IsK0JBQStCO1FBQy9CLGtEQUFrRDtRQUNsRCwwQkFBMEI7UUFDMUIseUJBQXlCO1FBQ3pCLHFCQUFxQjtRQUNyQix1QkFBdUI7UUFDdkIsNEJBQTRCO1FBQzVCLDZCQUE2QjtRQUM3QiwyQkFBMkI7UUFDM0IsMEJBQTBCO1FBQzFCLCtCQUErQjtRQUMvQixTQUFTO1FBQ1QsUUFBUTtRQUNSLCtCQUErQjtRQUMvQixrREFBa0Q7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RUFBRSxJQUFJLENBQUMsVUFBVTthQUM1QixDQUFBO1lBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUc7Z0JBQ3hCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLO2dCQUMxQixLQUFLLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNO2lCQUNsQjthQUNGLENBQUE7WUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUE7SUFFSixDQUFDO0lBRUQsa0JBQWtCLENBQUMsS0FBVTtRQUMzQixJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1NBQ3hDO1FBRUQsSUFBSSxLQUFLLElBQUksRUFBRSxFQUFFO1lBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1NBQ25DO0lBQ0gsQ0FBQzs4R0F0TVUsYUFBYTtrR0FBYixhQUFhLDRMQzNCMUIsdW1CQWFZOzsyRkRjQyxhQUFhO2tCQUx6QixTQUFTOytCQUNFLFVBQVU7MEVBS0wsSUFBSTtzQkFBbEIsS0FBSzt1QkFBQyxNQUFNO2dCQUNTLFdBQVc7c0JBQWhDLEtBQUs7dUJBQUMsYUFBYTtnQkFDQSxTQUFTO3NCQUE1QixLQUFLO3VCQUFDLFdBQVc7Z0JBQ0csVUFBVTtzQkFBOUIsS0FBSzt1QkFBQyxZQUFZO2dCQUNGLE1BQU07c0JBQXRCLEtBQUs7dUJBQUMsUUFBUTtnQkFDRSxNQUFNO3NCQUF0QixLQUFLO3VCQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPbkluaXQsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFwZXhBeGlzQ2hhcnRTZXJpZXMsIEFwZXhDaGFydCwgQXBleERhdGFMYWJlbHMsIEFwZXhHcmlkLCBBcGV4TGVnZW5kLCBBcGV4TWFya2VycywgQXBleFN0cm9rZSwgQXBleFRpdGxlU3VidGl0bGUsIEFwZXhYQXhpcywgQXBleFlBeGlzIH0gZnJvbSAnbmctYXBleGNoYXJ0cyc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxudHlwZSBMaW5lQ2hhcnRPcHRpb25zID0ge1xyXG4gIHNlcmllczogQXBleEF4aXNDaGFydFNlcmllcztcclxuICBjaGFydDogQXBleENoYXJ0O1xyXG4gIHhheGlzOiBBcGV4WEF4aXM7XHJcbiAgc3Ryb2tlOiBBcGV4U3Ryb2tlO1xyXG4gIGRhdGFMYWJlbHM6IEFwZXhEYXRhTGFiZWxzO1xyXG4gIG1hcmtlcnM6IEFwZXhNYXJrZXJzO1xyXG4gIGNvbG9yczogc3RyaW5nW107XHJcbiAgeWF4aXM6IEFwZXhZQXhpcztcclxuICBncmlkOiBBcGV4R3JpZDtcclxuICBsZWdlbmQ6IEFwZXhMZWdlbmQ7XHJcbiAgdGl0bGU6IEFwZXhUaXRsZVN1YnRpdGxlO1xyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2xpYi1saW5lJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbGluZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbGluZS5jb21wb25lbnQuY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMaW5lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoJ2RhdGEnKSBkYXRhOiBPYnNlcnZhYmxlPGFueVtdPiB8IHVuZGVmaW5lZDtcclxuICBASW5wdXQoJ2NhdGVnb3J5S2V5JykgY2F0ZWdvcnlLZXk6IHN0cmluZyA9ICcnO1xyXG4gIEBJbnB1dCgnc2VyaWVzS2V5Jykgc2VyaWVzS2V5OiBzdHJpbmdbXSA9IFtdO1xyXG4gIEBJbnB1dCgnY2hhcnRUaXRsZScpIGNoYXJ0VGl0bGU6IHN0cmluZyA9ICcnO1xyXG4gIEBJbnB1dCgneFRpdGxlJykgeFRpdGxlOiBzdHJpbmcgPSAnJztcclxuICBASW5wdXQoJ3lUaXRsZScpIHlUaXRsZTogc3RyaW5nID0gJyc7XHJcblxyXG4gIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAkY2hhcnRPcHRpb25zOiBCZWhhdmlvclN1YmplY3Q8UGFydGlhbDxMaW5lQ2hhcnRPcHRpb25zPj47XHJcbiAgY2hhcnRPcHRpb25zOiBQYXJ0aWFsPExpbmVDaGFydE9wdGlvbnM+ID0ge1xyXG4gICAgc2VyaWVzOiBbXSxcclxuICAgIGNoYXJ0OiB7XHJcbiAgICAgIGhlaWdodDogNDAwLFxyXG4gICAgICB0eXBlOiBcImxpbmVcIixcclxuICAgICAgZHJvcFNoYWRvdzoge1xyXG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgY29sb3I6IFwiIzAwMFwiLFxyXG4gICAgICAgIHRvcDogMTgsXHJcbiAgICAgICAgbGVmdDogNyxcclxuICAgICAgICBibHVyOiAxMCxcclxuICAgICAgICBvcGFjaXR5OiAwLjJcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBkYXRhTGFiZWxzOiB7XHJcbiAgICAgIGVuYWJsZWQ6IGZhbHNlXHJcbiAgICB9LFxyXG4gICAgdGl0bGU6IHtcclxuICAgICAgdGV4dDogdGhpcy5jaGFydFRpdGxlLFxyXG4gICAgICBhbGlnbjogXCJsZWZ0XCJcclxuICAgIH0sXHJcbiAgICBncmlkOiB7XHJcbiAgICAgIGJvcmRlckNvbG9yOiBcIiNlN2U3ZTdcIixcclxuICAgICAgcm93OiB7XHJcbiAgICAgICAgY29sb3JzOiBbXCIjZjNmM2YzXCIsIFwidHJhbnNwYXJlbnRcIl0sXHJcbiAgICAgICAgb3BhY2l0eTogMC41XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgbWFya2Vyczoge1xyXG4gICAgICBzaXplOiAwXHJcbiAgICB9LFxyXG4gICAgeGF4aXM6IHtcclxuICAgICAgY2F0ZWdvcmllczogW10sXHJcbiAgICAgIHRpdGxlOiB7XHJcbiAgICAgICAgdGV4dDogdGhpcy54VGl0bGVcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHlheGlzOiB7XHJcbiAgICAgIHRpdGxlOiB7XHJcbiAgICAgICAgdGV4dDogdGhpcy55VGl0bGVcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBsZWdlbmQ6IHtcclxuICAgICAgcG9zaXRpb246IFwidG9wXCIsXHJcbiAgICAgIGhvcml6b250YWxBbGlnbjogXCJyaWdodFwiLFxyXG4gICAgICBmbG9hdGluZzogdHJ1ZSxcclxuICAgICAgb2Zmc2V0WTogLTI1LFxyXG4gICAgICBvZmZzZXRYOiAtNVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHNlcmllczogeyBbazogc3RyaW5nXTogbnVtYmVyW10gfSA9IHt9XHJcbiAgY2F0ZWdvcmllczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAvLyBmb3IgdGVzdFxyXG4gICAgLy8gdGhpcy5kYXRhID0gbmV3IE9ic2VydmFibGUoKG9icykgPT4ge1xyXG4gICAgLy8gICBvYnMubmV4dChbXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgXCJwcm9jZXNzQ29kZVwiOiBcIjExMjBcIixcclxuICAgIC8vICAgICAgIFwicHJvY2Vzc1wiOiBcIlN1cGVyIEZpbmlzaCBQcm9jZXNzIE91dHB1dFwiLFxyXG4gICAgLy8gICAgICAgXCJwYXJ0VHlwZVwiOiBcIklSXCIsXHJcbiAgICAvLyAgICAgICBcImdyb3VwUGFydFwiOiBcIlwiLFxyXG4gICAgLy8gICAgICAgXCJzaGlmdFwiOiBcIlwiLFxyXG4gICAgLy8gICAgICAgXCJtYWNoaW5lXCI6IFwiXCIsXHJcbiAgICAvLyAgICAgICBcImRhdGVcIjogXCIyMDIzMDYwMVwiLFxyXG4gICAgLy8gICAgICAgXCJxdWFudGl0eVwiOiAzMzAwMDkxLFxyXG4gICAgLy8gICAgICAgXCJ0YXJnZXRcIjogMzM2MDAwMCxcclxuICAgIC8vICAgICAgIFwiYWNjdW1cIjogMzMwMDA5MSxcclxuICAgIC8vICAgICAgIFwidGFyZ2V0QWNjdW1cIjogMzM2MDAwMFxyXG4gICAgLy8gICAgIH0sXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgXCJwcm9jZXNzQ29kZVwiOiBcIjExMjBcIixcclxuICAgIC8vICAgICAgIFwicHJvY2Vzc1wiOiBcIlN1cGVyIEZpbmlzaCBQcm9jZXNzIE91dHB1dFwiLFxyXG4gICAgLy8gICAgICAgXCJwYXJ0VHlwZVwiOiBcIklSXCIsXHJcbiAgICAvLyAgICAgICBcImdyb3VwUGFydFwiOiBcIlwiLFxyXG4gICAgLy8gICAgICAgXCJzaGlmdFwiOiBcIlwiLFxyXG4gICAgLy8gICAgICAgXCJtYWNoaW5lXCI6IFwiXCIsXHJcbiAgICAvLyAgICAgICBcImRhdGVcIjogXCIyMDIzMDYwMlwiLFxyXG4gICAgLy8gICAgICAgXCJxdWFudGl0eVwiOiAxNTMyMTAyLFxyXG4gICAgLy8gICAgICAgXCJ0YXJnZXRcIjogMTY4MDAwMCxcclxuICAgIC8vICAgICAgIFwiYWNjdW1cIjogNDgzMjE5MyxcclxuICAgIC8vICAgICAgIFwidGFyZ2V0QWNjdW1cIjogNTA0MDAwMFxyXG4gICAgLy8gICAgIH0sXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgXCJwcm9jZXNzQ29kZVwiOiBcIjExMjBcIixcclxuICAgIC8vICAgICAgIFwicHJvY2Vzc1wiOiBcIlN1cGVyIEZpbmlzaCBQcm9jZXNzIE91dHB1dFwiLFxyXG4gICAgLy8gICAgICAgXCJwYXJ0VHlwZVwiOiBcIklSXCIsXHJcbiAgICAvLyAgICAgICBcImdyb3VwUGFydFwiOiBcIlwiLFxyXG4gICAgLy8gICAgICAgXCJzaGlmdFwiOiBcIlwiLFxyXG4gICAgLy8gICAgICAgXCJtYWNoaW5lXCI6IFwiXCIsXHJcbiAgICAvLyAgICAgICBcImRhdGVcIjogXCIyMDIzMDYwNFwiLFxyXG4gICAgLy8gICAgICAgXCJxdWFudGl0eVwiOiAxNDIwMTU0LFxyXG4gICAgLy8gICAgICAgXCJ0YXJnZXRcIjogMTY4MDAwMCxcclxuICAgIC8vICAgICAgIFwiYWNjdW1cIjogNjI1MjM0NyxcclxuICAgIC8vICAgICAgIFwidGFyZ2V0QWNjdW1cIjogNjcyMDAwMFxyXG4gICAgLy8gICAgIH0sXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgXCJwcm9jZXNzQ29kZVwiOiBcIjExMjBcIixcclxuICAgIC8vICAgICAgIFwicHJvY2Vzc1wiOiBcIlN1cGVyIEZpbmlzaCBQcm9jZXNzIE91dHB1dFwiLFxyXG4gICAgLy8gICAgICAgXCJwYXJ0VHlwZVwiOiBcIklSXCIsXHJcbiAgICAvLyAgICAgICBcImdyb3VwUGFydFwiOiBcIlwiLFxyXG4gICAgLy8gICAgICAgXCJzaGlmdFwiOiBcIlwiLFxyXG4gICAgLy8gICAgICAgXCJtYWNoaW5lXCI6IFwiXCIsXHJcbiAgICAvLyAgICAgICBcImRhdGVcIjogXCIyMDIzMDYwNVwiLFxyXG4gICAgLy8gICAgICAgXCJxdWFudGl0eVwiOiAxNTQxNTIxLFxyXG4gICAgLy8gICAgICAgXCJ0YXJnZXRcIjogMTY4MDAwMCxcclxuICAgIC8vICAgICAgIFwiYWNjdW1cIjogNzc5Mzg2OCxcclxuICAgIC8vICAgICAgIFwidGFyZ2V0QWNjdW1cIjogODQwMDAwMFxyXG4gICAgLy8gICAgIH0sXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgXCJwcm9jZXNzQ29kZVwiOiBcIjExMjBcIixcclxuICAgIC8vICAgICAgIFwicHJvY2Vzc1wiOiBcIlN1cGVyIEZpbmlzaCBQcm9jZXNzIE91dHB1dFwiLFxyXG4gICAgLy8gICAgICAgXCJwYXJ0VHlwZVwiOiBcIklSXCIsXHJcbiAgICAvLyAgICAgICBcImdyb3VwUGFydFwiOiBcIlwiLFxyXG4gICAgLy8gICAgICAgXCJzaGlmdFwiOiBcIlwiLFxyXG4gICAgLy8gICAgICAgXCJtYWNoaW5lXCI6IFwiXCIsXHJcbiAgICAvLyAgICAgICBcImRhdGVcIjogXCIyMDIzMDYwNlwiLFxyXG4gICAgLy8gICAgICAgXCJxdWFudGl0eVwiOiAxNTkyOTk1LFxyXG4gICAgLy8gICAgICAgXCJ0YXJnZXRcIjogMTY4MDAwMCxcclxuICAgIC8vICAgICAgIFwiYWNjdW1cIjogOTM4Njg2MyxcclxuICAgIC8vICAgICAgIFwidGFyZ2V0QWNjdW1cIjogMTAwODAwMDBcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgIF0pLFxyXG4gICAgLy8gICAgIG9icy5jb21wbGV0ZSgpLFxyXG4gICAgLy8gICAgIG9icy51bnN1YnNjcmliZSgpO1xyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgdGhpcy4kY2hhcnRPcHRpb25zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQYXJ0aWFsPExpbmVDaGFydE9wdGlvbnM+Pih0aGlzLmNoYXJ0T3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuY2hlY2tSZXF1aXJlZEZpZWxkKHRoaXMuZGF0YSk7XHJcbiAgICB0aGlzLmNoZWNrUmVxdWlyZWRGaWVsZCh0aGlzLmNhdGVnb3J5S2V5KTtcclxuICAgIHRoaXMuY2hlY2tSZXF1aXJlZEZpZWxkKHRoaXMuc2VyaWVzS2V5KVxyXG5cclxuICAgIC8vIG1hbmFnZSB2YWx1ZXNcclxuICAgIHRoaXMuc2VyaWVzS2V5LmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICB0aGlzLnNlcmllc1trZXldID0gW107XHJcbiAgICB9KVxyXG5cclxuICAgIHRoaXMuZGF0YT8uc3Vic2NyaWJlKChyZXMpID0+IHtcclxuXHJcbiAgICAgIHRoaXMuc2VyaWVzS2V5LmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgIHJlcy5mb3JFYWNoKChkYXRhRWwpID0+IHtcclxuICAgICAgICAgIHRoaXMuc2VyaWVzW2tleV0ucHVzaChkYXRhRWxba2V5XSlcclxuICAgICAgICB9KVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgcmVzLmZvckVhY2goKGRhdGFFbCkgPT4ge1xyXG4gICAgICAgIHRoaXMuY2F0ZWdvcmllcy5wdXNoKGRhdGFFbFt0aGlzLmNhdGVnb3J5S2V5XSlcclxuICAgICAgfSlcclxuXHJcbiAgICAgIE9iamVjdC5lbnRyaWVzKHRoaXMuc2VyaWVzKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgdGhpcy5jaGFydE9wdGlvbnMuc2VyaWVzPy5wdXNoKHtcclxuICAgICAgICAgIG5hbWU6IGtleSxcclxuICAgICAgICAgIGRhdGE6IHZhbHVlXHJcbiAgICAgICAgfSlcclxuICAgICAgfSlcclxuXHJcbiAgICAgIHRoaXMuY2hhcnRPcHRpb25zLnRpdGxlID0ge1xyXG4gICAgICAgIC4uLnRoaXMuY2hhcnRPcHRpb25zLnRpdGxlLFxyXG4gICAgICAgIHRleHQ6IHRoaXMuY2hhcnRUaXRsZVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmNoYXJ0T3B0aW9ucy54YXhpcyA9IHtcclxuICAgICAgICB0aXRsZTogeyAuLi50aGlzLmNoYXJ0T3B0aW9ucy54YXhpcz8udGl0bGUsIHRleHQ6IHRoaXMueFRpdGxlIH0sXHJcbiAgICAgICAgY2F0ZWdvcmllczogdGhpcy5jYXRlZ29yaWVzXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5jaGFydE9wdGlvbnMueWF4aXMgPSB7XHJcbiAgICAgICAgLi4udGhpcy5jaGFydE9wdGlvbnMueWF4aXMsXHJcbiAgICAgICAgdGl0bGU6IHtcclxuICAgICAgICAgIHRleHQ6IHRoaXMueVRpdGxlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuJGNoYXJ0T3B0aW9ucy5uZXh0KHRoaXMuY2hhcnRPcHRpb25zKTtcclxuICAgIH0pXHJcblxyXG4gIH1cclxuXHJcbiAgY2hlY2tSZXF1aXJlZEZpZWxkKGlucHV0OiBhbnkpIHtcclxuICAgIGlmIChpbnB1dCA9PSBudWxsKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignQXR0cmlidXRlIHJlcXVpcmVkLicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpbnB1dCA9PSAnJykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZhbHVlIHJlcXVpcmVkLicpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIjxhcHgtY2hhcnQgXHJcbiAgICBbc2VyaWVzXT1cIiRjaGFydE9wdGlvbnMuZ2V0VmFsdWUoKS5zZXJpZXMhXCJcclxuICAgIFtjaGFydF09XCIkY2hhcnRPcHRpb25zLmdldFZhbHVlKCkuY2hhcnQhXCJcclxuICAgIFt4YXhpc109XCIkY2hhcnRPcHRpb25zLmdldFZhbHVlKCkueGF4aXMhXCJcclxuICAgIFtzdHJva2VdPVwiJGNoYXJ0T3B0aW9ucy5nZXRWYWx1ZSgpLnN0cm9rZSFcIlxyXG4gICAgW2NvbG9yc109XCIkY2hhcnRPcHRpb25zLmdldFZhbHVlKCkuY29sb3JzIVwiXHJcbiAgICBbZGF0YUxhYmVsc109XCIkY2hhcnRPcHRpb25zLmdldFZhbHVlKCkuZGF0YUxhYmVscyFcIlxyXG4gICAgW2xlZ2VuZF09XCIkY2hhcnRPcHRpb25zLmdldFZhbHVlKCkubGVnZW5kIVwiXHJcbiAgICBbbWFya2Vyc109XCIkY2hhcnRPcHRpb25zLmdldFZhbHVlKCkubWFya2VycyFcIlxyXG4gICAgW2dyaWRdPVwiJGNoYXJ0T3B0aW9ucy5nZXRWYWx1ZSgpLmdyaWQhXCJcclxuICAgIFt5YXhpc109XCIkY2hhcnRPcHRpb25zLmdldFZhbHVlKCkueWF4aXMhXCJcclxuICAgIFt0aXRsZV09XCIkY2hhcnRPcHRpb25zLmdldFZhbHVlKCkudGl0bGUhXCJcclxuPlxyXG48L2FweC1jaGFydD4iXX0=