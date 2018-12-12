import {bindable, inject} from 'aurelia-framework';

import * as d3 from 'd3';
import {sankey, sankeyLinkHorizontal} from 'd3-sankey';

import { lines, getGroupName } from '../models/data3';

@inject(Element)

export class D3LineNr7 {

  constructor(Element) {
    this.element = Element;
  }

  attached() {

    let svg = d3.select('#d3-line-nr7-container svg');
    let g = svg.append('g');
    let links_g = g.append('g');
    let nodes_g = g.append('g');

    let width = parseInt( svg.style('width') );
    let height = parseInt( svg.style('height') );

    let data = {
      nodes:[
        { name: "Total" },
        { name: "Men" },
        { name: "Female" },
        { name: "G1" },
        { name: "G2" },
        { name: "G1" },
        { name: "G3" },
        { name: "G2" },
        { name: "G3" }
      ],
      links: [
        { source: 0, target: 1, value: 150 },
        { source: 0, target: 2, value: 150 },
        { source: 1, target: 3, value: 50 },
        { source: 1, target: 4, value: 50 },
        { source: 1, target: 5, value: 50 },
        { source: 2, target: 6, value: 50 },
        { source: 2, target: 7, value: 50 },
        { source: 2, target: 8, value: 50 }
      ]
    };

    let sk = sankey()
      .nodeWidth(15)
      .nodePadding(10)
      .iterations(1)
      .extent([[1, 1], [width - 1, height - 6]]);

  
    //https://beta.observablehq.com/@mbostock/d3-sankey-diagram
    // generate sankey layout
    sk(data);


    nodes_g.selectAll('rect')
      .data(data.nodes)
      .enter().append('rect')
        .attr('x', d => d.x0)
        .attr('y', d => d.y0)
        .attr('height', d => d.y1 - d.y0)
        .attr('width', d => d.x1 - d.x0)
        .attr('fill', 'blue')
        .append('title')
          .text(d => `${d.name}`);


    let link = links_g.selectAll('g')
      .data(data.links)
      .enter().append('g')
        .style('mix-blend-mode', 'multiply');

    link.append('path')
      .attr('d', sankeyLinkHorizontal() )
      .attr('stroke', 'green')
      .attr('stroke-width', d => Math.max(1, d.width));

    link.append('title')
      .text(d => `${d.source.name} → ${d.target.name}`);

    svg.append('g')
      .style('font', '10px sans-serif')
      .selectAll('text')
      .data(data.nodes)
      .enter().append('text')
        .attr('x', d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
        .attr('y', d => (d.y1 + d.y0) / 2)
        .attr('dy', '0.35em')
        .attr('text-anchor', d => d.x0 < width / 2 ? 'start' : 'end')
        .text(d => d.name);

    
      

    /*
    let index = 0;
    for ( let line of lines ) {

      let col = container.append('div').attr('class', 'col-6');
      let svg = col.append('svg');
      
      col.append('p')
        .attr('class', 'text-center')
        .text( getGroupName(index) );
    
      let width = parseInt( svg.style('width') );
      let height = parseInt( svg.style('height') );

      let paddingL = 20;
      let paddingT = 50;

      let newWidth = width - (paddingL * 2);
      let newHeight = height - (paddingT * 2);

      let x = d3.scaleTime().range([0, newWidth]);
      let y = d3.scaleLinear().range([newHeight, 0]);

      let yMin = Math.min(
        d3.min( line, (d) =>  { return d.total_M; }),
        d3.min( line, (d) =>  { return d.total_F; })
      );

      let yMax = Math.max(
        d3.max( line, (d) =>  { return d.total_M; }),
        d3.max( line, (d) =>  { return d.total_F; })
      );

      // Scale the range of the data
      x.domain([ new Date(1995, 0, 1), new Date(2017, 0, 1) ]);
      y.domain([ yMin, yMax ]);

      // define the line
      let valueline1 = d3.line()
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d.total_M); });
      let valueline2 = d3.line()
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d.total_F); });

      let viewport = svg.append('g')
        .attr( 'transform', `translate(${paddingL},${paddingT})` );

      viewport.append('path')
        .data([line])
        .attr('class', 'line')
        .attr('fill', 'none')
        .attr('stroke', 'blue')
        .attr('d', valueline1);
      
      viewport.append('path')
        .data([line])
        .attr('class', 'line')
        .attr('fill', 'none')
        .attr('stroke', 'red')
        .attr('d', valueline2);

      // Create the X Axis
      let xAxis = d3.axisBottom()
        .scale(x)
        .ticks(dataSets.length / 4)
        .tickFormat(d3.timeFormat('%Y'));

      // Add the X Axis
      viewport.append('g')
        .attr( 'transform', `translate(0,${newHeight})` )
        .call( xAxis );


      index++;
    }
    */
  }
}

