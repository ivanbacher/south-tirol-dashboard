import {bindable, inject} from 'aurelia-framework';

import * as d3 from 'd3';

import { getHistoData } from '../models/data3';

@inject(Element)

export class D3LineNr8 {

  constructor(Element) {
    this.element = Element;
  }

  attached() {
    //https://beta.observablehq.com/@mbostock/d3-bar-chart

    let svg = d3.select('#d3-line-nr8-container svg');
    let viewport = svg.append('g');
    
    let width = parseInt( svg.style('width') );
    let height = parseInt( svg.style('height') );

    let margin = {
      left: 50,
      right: 30,
      top: 40,
      bottom: 40
    };

    let data = getHistoData();

    let x = d3.scaleBand()
      .domain( data.map( d => d.name ) )
      .range( [ margin.left, width - margin.right ] )
      .padding(0.1);

    let y = d3.scaleLinear()
      .domain( [ 0, d3.max( data, d => d.total) ] ).nice()
      .range( [ height - margin.bottom, margin.top ] );

    let xAxis = d3.axisBottom()
      .scale(x)
      .tickSizeOuter(0);
      //.ticks(dataSets.length / 4)
      //.tickFormat(d3.timeFormat('%Y'));

    let yAxis = d3.axisLeft()
      .scale(y);

    viewport.append('g')
      .attr('fill', 'steelblue')
      .selectAll('rect').data(data).enter().append('rect')
      .attr('x', d => x(d.name) )
      .attr('y', d => y(d.total) )
      .attr('height', d => y(0) - y(d.total))
      .attr('width', x.bandwidth());


    viewport.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call( xAxis );

    viewport.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call( yAxis );
  }
}

