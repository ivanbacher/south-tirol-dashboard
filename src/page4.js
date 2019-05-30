import * as d3 from 'd3';

import { lines, getGroupName } from './resources/helpers/data3';
import { createGradient } from './resources/helpers/glowGradient1';
console.log(lines)
/* 
  COLORS:

  https://coolors.co/88958d-606d5d-bc9cb0-d3cdd7-ddf2eb
  ---
  #88958D - mummy's tomb
  #606D5D - granite gray
  #BC9CB0 - pastel purple
  #D3CDD7 - light grey
  #DDF2EB - azureish white
  ---

  https://coolors.co/baf2bb-baf2d8-bad7f2-f2bac9-f2e2ba
  ---
  #baf2bb - Tea Green
  #baf2d8 - Magic Mint
  #bad7f2 - Pale Aqua
  #f2bac9
  
  - Cameo Pink
  #f2e2ba - Dutch White
  ---
*/

export class Page4 {

  attached() {

    let svg1 = d3.select('#vis-01');
    let defs1 = svg1.append('defs');

    createGradient( defs1, 'vis-01-glow' );

    let svg2 = d3.select('#vis-02');
    let defs2 = svg2.append('defs');

    let svg3 = d3.select('#vis-03');
    let defs3 = svg3.append('defs');


    let width1 = parseInt( svg1.style('width'), 10 );
    let width2 = parseInt( svg2.style('width'), 10 );
    let width3 = parseInt( svg3.style('width'), 10 );

    svg1.style('height', (width1 / 3) * 2 + 'px');
    svg2.style('height', width2 / 2 + 'px');
    svg3.style('height', width3 / 2 + 'px');

    let height1 = parseInt( svg1.style('height'), 10 );
    let height2 = parseInt( svg2.style('height'), 10 );
    let height3 = parseInt( svg3.style('height'), 10 );

    console.log(`svg1 ${width1} x ${height1}`);
    console.log(`svg2 ${width2} x ${height2}`);
    console.log(`svg3 ${width3} x ${height3}`);

    //create main vis
    let info1 = {
      radius: 150,
      startR: 150,
      padding: 10,
      radiusStep: 50,
      svg: svg1,
      defs: defs1,
      width: width1,
      height: height1,
      id: 'vis-01',
      pointR: 1.5,
      mainColor: '#606D5D'
    };

    createCustomVis(info1);
  }
}

function createCustomVis(info) {
  let svg = info.svg;
  let defs = info.defs;
  let width = info.width;
  let height = info.height;
  let radius = info.radius || 40;
  let startR = info.startR || 40;
  let padding = info.padding || 2;
  let radiusStep = info.radiusStep || 20;
  let index = 0;
  let pointR = info.pointR || 1;
  let id = info.id;
  let mainColor = info.mainColor;

  //
  let ragc = defs.append('radialGradient')
    .attr('id', `${id}-radial-area-gradient-colors`)
    .attr('gradientUnits', 'userSpaceOnUse')
    .attr('cx', '0')
    .attr('cy', '0');

  ragc.append('stop')
    .attr('offset', '0%')
    .attr('stop-color', 'white');

  ragc.append('stop')
    .attr('offset', '100%')
    .attr('stop-color', mainColor);
  //

  let line1 = d3.lineRadial()
    .angle( (d) => { return x(d.year); })
    .radius( (d) => { return y(d.total); });

  let line = d3.areaRadial()
    .angle( (d) => { return x(d.year); })
    .innerRadius( (d) => { return (radius - radiusStep) + padding; })
    .outerRadius( (d) => { return y(d.total); });


  //need to change this if we add a year
  let x = d3.scaleTime()
    .domain( [ new Date(1995, 0, 1), new Date(2018, 0, 1) ] );

  let y = d3.scaleLinear();

  let container = svg.append('g');
  
  let helperlines = container.append('g').attr('class', 'helperlines');
  let paths2 = container.append('g').attr('class', 'paths2');
  let paths1 = container.append('g').attr('class', 'paths1');
  let arcs = container.append('g').attr('class', 'arcs');
  let points = container.append('g').attr('class', 'points');
  let lables1 = container.append('g').attr('class', 'lables');
  let lables2 = container.append('g').attr('class', 'lables');
  
  

  for ( let data of lines ) {

    let startA = degToRad(-90);
    let endA = degToRad(90);

    let yMin =  d3.min( data, (d) => { return d.total; });
    let yMax =  d3.max( data, (d) => { return d.total; });

    let gid = `${id}-gradient-${index}`;

    defs.append('radialGradient')
      .attr('id', gid)
      .attr('href', `#${id}-radial-area-gradient-colors`)
      .attr('fr', (radius - radiusStep) + padding)
      .attr('r', radius - padding);

    //calibrate scales
    x.range( [ startA, endA ] );
    y.domain( [ yMin, yMax ] );
    y.range( [ (radius - radiusStep) + padding, radius - padding] );

   


    //create arcs for debugging
    /*
    let arc = d3.arc()
      .outerRadius( radius )
      .innerRadius( radius - radiusStep)
      .startAngle( startA )
      .endAngle( endA );

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', 'none')
      .attr('stroke', 'lightgrey')
      .attr('opacity', '0.3');
    */

    let lineContainer = paths1.append('g')
      .attr('id', `group-${data[0].group}`);

    lineContainer.append('path')
      .data([data])
      .attr('class', 'radialline')
      .attr('fill', 'none')
      .attr('stroke', mainColor)
      .attr('opacity', '0.8')
      .attr('d', line1);
      


    let radialLineContainer = paths2.append('g')
      .attr('id', `group-${data[0].group}`);

    radialLineContainer.append('path')
      .data([data])
      .attr('class', 'radialArea')
      .attr('fill', `url(#${gid})`)
      .attr('stroke', 'none')
      .attr('d', line)
      .style('filter', `url(#${id}-glow)`);

    let pointContainer = points.append('g')
      .attr('id', `group-${data[0].group}`);

    pointContainer.selectAll('.points')
      .data(data)
      .enter().append('circle')
      .attr('cx', (d) => {
        return line.outerRadius()(d) * Math.cos( line.angle()(d) - degToRad(90) );
      })
      .attr('cy', (d) => {
        return line.outerRadius()(d) * Math.sin( line.angle()(d) - degToRad(90) );
      })
      .attr('stroke', 'none')
      .attr('fill', mainColor)
      .attr('r', pointR)
      .attr('opacity', '0.8');

    radius += radiusStep;
    index ++;
  }

  //need to have this here so radius is at max
  container.attr( 'transform', `translate(${width / 2},${(height / 2) + radius / 2 })` );

  /*
    Lables
  */
  let data = lines[0].map( (el) => { return { year: el.year }; } );

  let startA = degToRad(-90);
  let endA = degToRad(90);

  x.range( [ startA, endA ] );

  let lab1R = radius - (radiusStep / 2);

  lables1.selectAll('.lables1')
    .data(data)
    .enter().append('text')
    .attr('x', (d) => {
      return lab1R * Math.cos( line.angle()(d) - degToRad(90) );
    })
    .attr('y', (d) => {
      return lab1R * Math.sin( line.angle()(d) - degToRad(90) );
    })
    .style('text-anchor', 'middle')
    .style('font-size', '10px')
    .text( (d) => { return d.year.getFullYear(); } );

  /*
    Helper lines
  */  
  startA = degToRad(-90);
  endA = degToRad(90);
  x.range( [ startA, endA ] );
   
  helperlines.selectAll('.helperlines')
    .data(data)
    .enter().append('line')
    .attr('x1', (d) => { return lab1R * Math.cos( line.angle()(d) - degToRad(90) ); } )
    .attr('y1', (d) => { return lab1R * Math.sin( line.angle()(d) - degToRad(90) ); } )
    .attr('x2', (d) => { return ((startR - radiusStep) + padding) * Math.cos( line.angle()(d) - degToRad(90) ); } )
    .attr('y2', (d) => { return ((startR - radiusStep) + padding) * Math.sin( line.angle()(d) - degToRad(90) ); } )
    .attr('stroke', 'lightgrey')
    .attr('stroke-dasharray', '4')
    .attr('opacity', '0.5');

  /*
    Bottom lables
  */
  
  let posX = - startR;
  let posY = radiusStep / 2;
  let labs = [];

  for (let i = 0; i < lines.length; i++) {
    let  name = getGroupName(i);

    labs.push({
      text: name,
      x: posX + (radiusStep / 2),
      y: posY
    });

    posX -= radiusStep;
  }

  lables2.selectAll('.lables2')
    .data(labs)
    .enter().append('text')
    .attr('x', (d) => {
      return d.x;
    })
    .attr('y', (d) => {
      return d.y;
    })
    .style('font-size', '10px')
    .style('text-anchor', 'middle')
    .text( (d) => { return d.text; } );
  
  lables2.selectAll('.lables2')
    .data(labs)
    .enter().append('text')
    .attr('x', (d) => {
      return -d.x;
    })
    .attr('y', (d) => {
      return d.y;
    })
    .style('font-size', '10px')
    .style('text-anchor', 'middle')
    .text( (d) => { return d.text; } );


}

function degToRad( deg ) {
  return deg * (Math.PI / 180);
}
