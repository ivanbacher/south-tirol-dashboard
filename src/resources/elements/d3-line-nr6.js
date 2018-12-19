import {bindable, inject} from 'aurelia-framework';

import * as d3 from 'd3';

import { lines, getGroupName } from '../models/data3';

@inject(Element)

export class D3LineNr6 {

  constructor(Element) {
    this.element = Element;
  }

  attached() {

    let container = d3.select('#d3-line-nr6-container');

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
        //.ticks(dataSets.length / 4)
        .tickFormat(d3.timeFormat('%Y'));

      // Add the X Axis
      viewport.append('g')
        .attr( 'transform', `translate(0,${newHeight})` )
        .call( xAxis );


      index++;
    }
  }
}

