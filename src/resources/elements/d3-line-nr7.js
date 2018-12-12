import {bindable, inject} from 'aurelia-framework';

import * as d3 from 'd3';
import {sankey, sankeyLinkHorizontal} from 'd3-sankey';

import { getSankeyData } from '../models/data3';

@inject(Element)

export class D3LineNr7 {

  constructor(Element) {
    this.element = Element;
  }

  attached() {
    //https://beta.observablehq.com/@mbostock/d3-sankey-diagram

    let svg = d3.select('#d3-line-nr7-container svg');
    let g = svg.append('g');
    let links_g = g.append('g');
    let nodes_g = g.append('g');

    let width = parseInt( svg.style('width') );
    let height = parseInt( svg.style('height') );

    let data = getSankeyData();

    let sk = sankey()
      .nodeWidth(15)
      .nodePadding(10)
      .iterations(1)
      .extent([[1, 1], [width - 1, height - 6]]);


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
      .attr('fill', 'none')
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
  }
}

