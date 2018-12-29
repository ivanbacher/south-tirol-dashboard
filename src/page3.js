import * as d3 from 'd3';

import { lines, getGroupName } from './resources/helpers/data3';
import { createGradient } from './resources/helpers/glowGradient1';


export class Page3 {

  attached() {

    let svg = d3.select('svg');
    let defs = svg.append('defs');

    createGradient( defs, 'glow1' );

    let width = parseInt( svg.style('width') );
    let height = parseInt( svg.style('height') );

    let container = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);
    
    container.append('rect')
      .attr('x', -25)
      .attr('y', -25)
      .attr('width', 50)
      .attr('height', 50)
      .attr('fill', 'blue')
      .attr('stroke', 'red')
      .style('filter', 'url(#glow1)');
  }
}
