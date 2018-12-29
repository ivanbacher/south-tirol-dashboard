import {bindable, inject} from 'aurelia-framework';

import * as d3 from 'd3';

import { getHistoData } from '../helpers/data3';

@inject(Element)

export class D3LineNr9 {

  constructor(Element) {
    this.element = Element;
  }

  attached() {
    //https://beta.observablehq.com/@mbostock/d3-bar-chart

    let data = getHistoData();

    let svg1 = d3.select('#d3-line-nr9-svg1');
    let svg2 = d3.select('#d3-line-nr9-svg2');
    
    let viewport1 = svg1.append('g');
    let viewport2 = svg2.append('g');
    
    let width = parseInt( svg1.style('width') );
    let height = parseInt( svg1.style('height') );

    let margin = {
      left: 50,
      right: 10,
      top: 40,
      bottom: 40
    };

    

    let x = d3.scaleBand()
      .domain( data.map( d => d.name ) )
      .range( [ margin.left, width - margin.right ] )
      .padding(0.1);

    let maxY = Math.max(
      d3.max( data, d => d.total_M),
      d3.max( data, d => d.total_F)
    );

    let y = d3.scaleLinear()
      .domain( [ 0, maxY ]).nice()
      .range( [ height - margin.bottom, margin.top ] );

    let xAxis = d3.axisBottom()
      .scale(x)
      .tickSizeOuter(0);

    let yAxis = d3.axisLeft()
      .scale(y);

    viewport1.append('g')
      .attr('fill', 'steelblue')
      .selectAll('rect').data(data).enter().append('rect')
      .attr('x', d => x(d.name) )
      .attr('y', d => y(d.total_M) )
      .attr('height', d => y(0) - y(d.total_M))
      .attr('width', x.bandwidth());


    viewport1.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call( xAxis );

    viewport1.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call( yAxis );
    
    viewport2.append('g')
      .attr('fill', 'steelblue')
      .selectAll('rect').data(data).enter().append('rect')
      .attr('x', d => x(d.name) )
      .attr('y', d => y(d.total_F) )
      .attr('height', d => y(0) - y(d.total_F))
      .attr('width', x.bandwidth());


    viewport2.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call( xAxis );

    viewport2.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call( yAxis );
  }
}

