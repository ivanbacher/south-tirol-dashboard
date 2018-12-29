import {bindable, inject} from 'aurelia-framework';

import * as d3 from 'd3';

import {data} from '../helpers/data1';

@inject(Element)


export class D3LineNr1 {
  @bindable value;

  constructor(Element) {
    this.element = Element;
  }

  attached() {
    //https://bl.ocks.org/d3noob/4db972df5d7efc7d611255d1cc6f3c4f

    let svg = d3.select('#d3-line-one-container svg');

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
      d3.min( data, (d) =>  { return d.total; }) - 2000,
      d3.max( data, (d) =>  { return d.total; }) + 2000
    ]);


    // define the 1st line
    let valueline = d3.line()
      .x(function(d) { return x(d.year); })
      .y(function(d) { return y(d.total); });

    // Add the valueline path.
    visViewport.append('path')
      .data([data])
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('d', valueline);

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

