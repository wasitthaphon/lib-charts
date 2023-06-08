import { Component, Input } from '@angular/core';
import * as d3 from 'd3';
import * as i0 from "@angular/core";
export class GraphComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGguY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvZ3JhcGgvc3JjL2xpYi9ncmFwaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDOztBQVl6QixNQUFNLE9BQU8sY0FBYztJQVQzQjtRQVlxQixhQUFRLEdBQVcsT0FBTyxDQUFDO1FBQzFCLGNBQVMsR0FBVyxXQUFXLENBQUM7UUFDakMsYUFBUSxHQUFXLEtBQUssQ0FBQztRQUM1QixVQUFLLEdBQVcsQ0FBQyxDQUFDLENBQUM7UUFHM0IsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUNaLFVBQUssR0FBRyxHQUFHLENBQUM7UUFDWixXQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ3JCLHdEQUF3RDtRQUNoRCxXQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztLQTJFdEU7SUF4RVMsU0FBUztRQUNmLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUM1QyxNQUFNLENBQUMsS0FBSyxDQUFDO2FBQ2IsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQ3pCLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUMzQixNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ1gsSUFBSSxDQUNILFdBQVcsRUFDWCxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEdB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QUN0QixDQUFDO2FBQ0YsQ0FBQyxDQUFBO1NBQ0g7SUFDSCxDQUFDOzhHQXRGVSxjQUFjO2tHQUFkLGNBQWMsa01BUGY7OztHQUdUOzsyRkFJVSxjQUFjO2tCQVQxQixTQUFTOytCQUNFLFdBQVcsWUFDWDs7O0dBR1QsY0FFVyxJQUFJOzhCQUdJLElBQUk7c0JBQXZCLEtBQUs7dUJBQUMsV0FBVztnQkFFQyxRQUFRO3NCQUExQixLQUFLO3VCQUFDLFVBQVU7Z0JBQ0csU0FBUztzQkFBNUIsS0FBSzt1QkFBQyxXQUFXO2dCQUNDLFFBQVE7c0JBQTFCLEtBQUs7dUJBQUMsVUFBVTtnQkFDRCxLQUFLO3NCQUFwQixLQUFLO3VCQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGQzIGZyb20gJ2QzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLWdyYXBoJyxcbiAgdGVtcGxhdGU6IGBcbiAgIDxoMj5QaWUgQ2hhcnQ8L2gyPlxuICAgPGZpZ3VyZSBpZD1cInt7dGhpcy5maWd1cmVJZH19XCI+PC9maWd1cmU+XG4gIGAsXG4gIHN0eWxlczogW10sXG4gIHN0YW5kYWxvbmU6IHRydWVcbn0pXG5leHBvcnQgY2xhc3MgR3JhcGhDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoJ2RhdGFUYWJsZScpIGRhdGE6IE9ic2VydmFibGU8YW55W10+IHwgdW5kZWZpbmVkO1xuXG4gIEBJbnB1dCgna2V5VmFsdWUnKSBrZXlWYWx1ZTogc3RyaW5nID0gJ1N0YXJzJztcbiAgQElucHV0KCdoZWFkZXJLZXknKSBoZWFkZXJLZXk6IHN0cmluZyA9ICdGcmFtZXdvcmsnO1xuICBASW5wdXQoJ2ZpZ3VyZUlkJykgZmlndXJlSWQ6IHN0cmluZyA9ICdwaWUnO1xuICBASW5wdXQoJ2xpbWl0JykgbGltaXQ6IG51bWJlciA9IC0xO1xuXG4gIHByaXZhdGUgc3ZnOiBhbnk7XG4gIHByaXZhdGUgbWFyZ2luID0gNTA7XG4gIHByaXZhdGUgd2lkdGggPSA3NTA7XG4gIHByaXZhdGUgaGVpZ2h0ID0gNjAwO1xuICAvLyBUaGUgcmFkaXVzIG9mIHRoZSBwaWUgY2hhcnQgaXMgaGFsZiB0aGUgc21hbGxlc3Qgc2lkZVxuICBwcml2YXRlIHJhZGl1cyA9IE1hdGgubWluKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KSAvIDIgLSB0aGlzLm1hcmdpbjtcbiAgcHJpdmF0ZSBjb2xvcnM6IGFueTtcblxuICBwcml2YXRlIGNyZWF0ZVN2ZygpOiB2b2lkIHtcbiAgICB0aGlzLnN2ZyA9IGQzLnNlbGVjdChcImZpZ3VyZSNcIiArIHRoaXMuZmlndXJlSWQpXG4gICAgICAuYXBwZW5kKFwic3ZnXCIpXG4gICAgICAuYXR0cihcIndpZHRoXCIsIHRoaXMud2lkdGgpXG4gICAgICAuYXR0cihcImhlaWdodFwiLCB0aGlzLmhlaWdodClcbiAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIixcbiAgICAgICAgXCJ0cmFuc2xhdGUoXCIgKyB0aGlzLndpZHRoIC8gMiArIFwiLFwiICsgdGhpcy5oZWlnaHQgLyAyICsgXCIpXCJcbiAgICAgICk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUNvbG9ycyhkYXRhOiBhbnlbXSk6IHZvaWQge1xuICAgIHRoaXMuY29sb3JzID0gZDMuc2NhbGVPcmRpbmFsKClcbiAgICAgIC5kb21haW4oZGF0YS5tYXAoZCA9PiBkW3RoaXMua2V5VmFsdWVdKSlcbiAgICAgIC5yYW5nZShbXCIjYzdkM2VjXCIsIFwiI2E1YjhkYlwiLCBcIiM4NzljYzRcIiwgXCIjNjc3Nzk1XCIsIFwiIzVhNjc4MlwiXSk7XG4gIH1cblxuICBwcml2YXRlIGRyYXdDaGFydChkYXRhOiBhbnlbXSk6IHZvaWQge1xuICAgIC8vIENvbXB1dGUgdGhlIHBvc2l0aW9uIG9mIGVhY2ggZ3JvdXAgb24gdGhlIHBpZTpcbiAgICBjb25zdCBwaWUgPSBkMy5waWU8YW55PigpLnZhbHVlKChkOiBhbnkpID0+IE51bWJlcihkW3RoaXMua2V5VmFsdWVdKSk7XG5cbiAgICAvLyBCdWlsZCB0aGUgcGllIGNoYXJ0XG4gICAgdGhpcy5zdmdcbiAgICAgIC5zZWxlY3RBbGwoJ3BpZWNlcycpXG4gICAgICAuZGF0YShwaWUoZGF0YSkpXG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAuYXR0cignZCcsIGQzLmFyYygpXG4gICAgICAgIC5pbm5lclJhZGl1cygwKVxuICAgICAgICAub3V0ZXJSYWRpdXModGhpcy5yYWRpdXMpXG4gICAgICApXG4gICAgICAuYXR0cignZmlsbCcsIChkOiBhbnksIGk6IGFueSkgPT4gKHRoaXMuY29sb3JzKGkpKSlcbiAgICAgIC5hdHRyKFwic3Ryb2tlXCIsIFwiIzEyMTkyNlwiKVxuICAgICAgLnN0eWxlKFwic3Ryb2tlLXdpZHRoXCIsIFwiMXB4XCIpO1xuXG4gICAgLy8gQWRkIGxhYmVsc1xuICAgIGNvbnN0IGxhYmVsTG9jYXRpb24gPSBkMy5hcmMoKVxuICAgICAgLmlubmVyUmFkaXVzKDEwMClcbiAgICAgIC5vdXRlclJhZGl1cyh0aGlzLnJhZGl1cyk7XG5cbiAgICB0aGlzLnN2Z1xuICAgICAgLnNlbGVjdEFsbCgncGllY2VzJylcbiAgICAgIC5kYXRhKHBpZShkYXRhKSlcbiAgICAgIC5lbnRlcigpXG4gICAgICAuYXBwZW5kKCd0ZXh0JylcbiAgICAgIC50ZXh0KChkOiBhbnkpID0+IGQuZGF0YVt0aGlzLmhlYWRlcktleV0pXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCAoZDogYW55KSA9PiBcInRyYW5zbGF0ZShcIiArIGxhYmVsTG9jYXRpb24uY2VudHJvaWQoZCkgKyBcIilcIilcbiAgICAgIC5zdHlsZShcInRleHQtYW5jaG9yXCIsIFwibWlkZGxlXCIpXG4gICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgMTUpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG5cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcblxuICAgIGlmICh0aGlzLmRhdGEgIT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmRhdGE/LnN1YnNjcmliZSh7XG4gICAgICAgIG5leHQ6IChyZXMpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5saW1pdCA+IDApIHtcbiAgICAgICAgICAgIHJlcyA9IHJlcy5zbGljZSgwLCB0aGlzLmxpbWl0KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5jcmVhdGVTdmcoKTtcbiAgICAgICAgICB0aGlzLmNyZWF0ZUNvbG9ycyhyZXMpO1xuICAgICAgICAgIHRoaXMuZHJhd0NoYXJ0KHJlcyk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbn1cbiJdfQ==