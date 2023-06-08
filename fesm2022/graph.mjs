import * as i0 from '@angular/core';
import { Injectable, Component, Input } from '@angular/core';
import * as d3 from 'd3';

class GraphService {
    constructor() { }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: GraphService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: GraphService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: GraphService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class GraphComponent {
    constructor() {
        this.keyValue = 'Stars';
        this.headerKey = 'Framework';
        this.figureId = 'pie';
        this.limit = -1;
        this.margin = 50;
        this.width = 750;
        this.height = 600;
        // The radius of the pie chart is half the smallest side
        this.radius = Math.min(this.width, this.height) / 2 - this.margin;
    }
    createSvg() {
        this.svg = d3.select("figure#" + this.figureId)
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .append("g")
            .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");
    }
    createColors(data) {
        this.colors = d3.scaleOrdinal()
            .domain(data.map(d => d[this.keyValue]))
            .range(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782"]);
    }
    drawChart(data) {
        // Compute the position of each group on the pie:
        const pie = d3.pie().value((d) => Number(d[this.keyValue]));
        // Build the pie chart
        this.svg
            .selectAll('pieces')
            .data(pie(data))
            .enter()
            .append('path')
            .attr('d', d3.arc()
            .innerRadius(0)
            .outerRadius(this.radius))
            .attr('fill', (d, i) => (this.colors(i)))
            .attr("stroke", "#121926")
            .style("stroke-width", "1px");
        // Add labels
        const labelLocation = d3.arc()
            .innerRadius(100)
            .outerRadius(this.radius);
        this.svg
            .selectAll('pieces')
            .data(pie(data))
            .enter()
            .append('text')
            .text((d) => d.data[this.headerKey])
            .attr("transform", (d) => "translate(" + labelLocation.centroid(d) + ")")
            .style("text-anchor", "middle")
            .style("font-size", 15);
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        if (this.data != undefined) {
            this.data?.subscribe({
                next: (res) => {
                    if (this.limit > 0) {
                        res = res.slice(0, this.limit);
                    }
                    this.createSvg();
                    this.createColors(res);
                    this.drawChart(res);
                }
            });
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: GraphComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: GraphComponent, isStandalone: true, selector: "lib-graph", inputs: { data: ["dataTable", "data"], keyValue: "keyValue", headerKey: "headerKey", figureId: "figureId", limit: "limit" }, ngImport: i0, template: `
   <h2>Pie Chart</h2>
   <figure id="{{this.figureId}}"></figure>
  `, isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: GraphComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-graph', template: `
   <h2>Pie Chart</h2>
   <figure id="{{this.figureId}}"></figure>
  `, standalone: true }]
        }], propDecorators: { data: [{
                type: Input,
                args: ['dataTable']
            }], keyValue: [{
                type: Input,
                args: ['keyValue']
            }], headerKey: [{
                type: Input,
                args: ['headerKey']
            }], figureId: [{
                type: Input,
                args: ['figureId']
            }], limit: [{
                type: Input,
                args: ['limit']
            }] } });

/*
 * Public API Surface of graph
 */

/**
 * Generated bundle index. Do not edit.
 */

export { GraphComponent, GraphService };
//# sourceMappingURL=graph.mjs.map
