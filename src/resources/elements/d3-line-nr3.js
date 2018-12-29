import {bindable, inject} from 'aurelia-framework';

import * as d3 from 'd3';

import {data} from '../helpers/data2';

@inject(Element)

export class D3LineNr3 {

  constructor(Element) {
    this.element = Element;
  }

  attached() {

    let svg = d3.select('#d3-line-nr3-container svg');

    let width = parseInt( svg.style('width') );
    let height = parseInt( svg.style('height') );

    let paddingL = 60;
    let paddingT = 50;

    let newWidth = width - (paddingL * 2);
    let newHeight = height - (paddingT * 2);
  
    let visViewport = svg.append('g')
      .attr( 'transform', `translate(${paddingL},${paddingT})` );

    // set the ranges
    let x = d3.scaleTime().range([0, newWidth]);
    let y = d3.scaleLinear().range([newHeight, 0]);

    // Scale the range of the data
    x.domain([new Date(1995, 0, 1), new Date(2017, 0, 1)]);
    y.domain([
      Math.min( d3.min( data, (d) =>  { return d.total_I; }), d3.min( data, (d) =>  { return d.total_A; }) ),
      Math.max( d3.max( data, (d) =>  { return d.total_I; }), d3.max( data, (d) =>  { return d.total_A; }) )
    ]);


    // define the 1st line
    let valueline1 = d3.line()
      .x(function(d) { return x(d.year); })
      .y(function(d) { return y(d.total_I); });
    
    let valueline2 = d3.line()
      .x(function(d) { return x(d.year); })
      .y(function(d) { return y(d.total_A); });

    // Add the valueline path.
    visViewport.append('path')
      .data([data])
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', 'blue')
      .attr('d', valueline1);

    visViewport.append('path')
      .data([data])
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('d', valueline2);

    // Create the X Axis
    let xAxis = d3.axisBottom()
      .scale(x)
      //.ticks(dataSets.length)
      .tickFormat(d3.timeFormat('%Y'));

    // Create the Y Axis
    let yAxis = d3.axisLeft()
      //.attr( 'transform', `translate(${50},0)` )
      .scale(y);


    // Add the X Axis
    visViewport.append('g')
      .attr( 'transform', `translate(0,${newHeight})` )
      .call( xAxis );

    // Add the Y Axis
    visViewport.append('g')
      .call(yAxis);
  }
}

