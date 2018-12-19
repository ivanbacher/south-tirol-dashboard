import * as d3 from 'd3';

import { lines, getGroupName } from './resources/models/data3';

/*
  Research -- Resources
  https://github.com/d3/d3-shape#arcs
  https://bl.ocks.org/santi698/f3685ca8a1a7f5be1967f39f367437c0
*/


export class Page2 {

  attached() {

    let svg = d3.select('svg');
    let defs = svg.append('defs');

    let width = parseInt( svg.style('width') );
    let height = parseInt( svg.style('height') );

    let gradcolors1 = defs.append('radialGradient')
      .attr('id', 'gradcolors1')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('cx', '0')
      .attr('cy', '0');

    gradcolors1.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', 'white');

    gradcolors1.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', 'blue');
    
    let gradcolors2 = defs.append('radialGradient')
      .attr('id', 'gradcolors2')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('cx', '0')
      .attr('cy', '0');

    gradcolors2.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', 'white');

    gradcolors2.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', 'red');

    /*
    //let radius = Math.min(width, height) / 2;
    let radius = 200;

    let yearsCount = lines[0].length;
    let pieFillers = lines[0].map( ()=> { return 1; });

    let arc = d3.arc()
      .outerRadius(radius)
      .innerRadius(radius - 10)
      //.startAngle(0)
      //.endAngle(Math.PI * 2);

    let pie = d3.pie()
      .sort(null)
      .value(function(d) { return d; });

    let arcs = pie(pieFillers);


    let g = svg.append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    let gg = g.selectAll('path')
      .data(arcs)
      .enter()
      .append("g")
      .attr("class", "arc")
    
    gg.append('path')
        .attr('d', arc)
        .attr('fill', 'none')
        .attr('stroke', 'black');
    */

    function degToRad( deg ) {
      return deg * (Math.PI / 180);
    }

    function createGradient(index, startA, endA, r) {

      let grad = def.append('linearGradient')
        .attr('id', `Gradient-${index}`)
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', () => { return r * Math.cos((endA - startA) / 2 + startA - Math.PI / 2); })
        .attr('y1', () => { return r * Math.sin((endA - startA) / 2 + startA - Math.PI / 2); })
        .attr('x2', () => { return (r - 50) * Math.cos((endA - startA) / 2 + startA - Math.PI / 2); })
        .attr('y2', () => { return (r - 50) * Math.sin((endA - startA) / 2 + startA - Math.PI / 2); });

      grad.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', 'blue');

      grad.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', 'white');
    }

    function createArc1( container, radius, arcWidth, startA, endA, gradientId ) {
      let arc = d3.arc()
        .outerRadius( radius )
        .innerRadius( radius - arcWidth)
        .startAngle( startA )
        .endAngle( endA );

      let g = container.append('g')
        //.attr('transform', `translate(${width / 2},${height / 2})`);

      g.append('path')
        .attr('d', arc)
        .attr('fill', `url(#${gradientId})`)
        .attr('stroke', 'lightgrey');
    }

    function createArc2( container, radius, arcWidth, startA, endA, gradientId ) {
      let arc = d3.arc()
        .outerRadius( radius )
        .innerRadius( radius - arcWidth)
        .startAngle( startA )
        .endAngle( endA );

      let g = container.append('g')
        //.attr('transform', `translate(${width / 2},${height / 2})`);

      g.append('path')
        .attr('d', arc)
        .attr('fill', `url(#${gradientId})`)
        .attr('stroke', 'black');
    }

    function createRadialLine1( container, data, radius, arcWidth, padding, startA, endA, yMin, yMax) {

      let x = d3.scaleTime()
        .domain([ new Date(1995, 0, 1), new Date(2017, 0, 1) ])
        .range([ startA, endA ]);

      let y = d3.scaleLinear()
        .domain([ yMin, yMax ])
        .range([radius - arcWidth + padding, radius - padding]);

      let line = d3.lineRadial()
        .angle(function(d) { return x(d.year); })
        .radius(function(d) { return y(d.total_M); });

      let g = container.append('g')

      g.append('path')
        .data([data])
        .attr('class', 'line')
        .attr('fill', 'none')
        .attr('stroke', 'blue')
        .attr('d', line);
      /*
      g.selectAll(".dot")
        .data(data)
        .enter().append("circle")
          .attr("class", "dot")
          .attr("cx", line.angle() )
          .attr("cy", line.radius() )
          .attr("r", 3.5);

      console.log( line.radius()(data[1]) )
      */
      //console.log( line.angle()(data[0]) )
    }
    function createRadialLine2( container, data, radius, arcWidth, padding, startA, endA, yMin, yMax) {

      let x = d3.scaleTime().range([ startA, endA ]); //(Math.PI/180)
      let y = d3.scaleLinear().range([radius - arcWidth + padding, radius - padding]);

      x.domain([ new Date(1995, 0, 1), new Date(2017, 0, 1) ]);
      y.domain([ yMin, yMax ]);

      let line = d3.lineRadial()
        .angle(function(d) { return x(d.year); })
        .radius(function(d) { return y(d.total_F); });

      let g = container.append('g')
        //.attr( 'transform', `translate(${width / 2},${height / 2})` );

      g.append('path')
        .data([data])
        .attr('class', 'line')
        .attr('fill', 'none')
        .attr('stroke', 'red')
        .attr('d', line);
    }

    function createRadialArea1( container, data, radius, arcWidth, padding, startA, endA, yMin, yMax, gid ) {

      let x = d3.scaleTime().range([ startA, endA ]); //(Math.PI/180)
      let y = d3.scaleLinear().range([radius - arcWidth, radius]);

      x.domain([ new Date(1995, 0, 1), new Date(2017, 0, 1) ]);
      y.domain([ yMin, yMax ]);

      let line = d3.areaRadial()
        .angle( (d) => { return x(d.year); })
        .innerRadius( (d) => { return radius - arcWidth; })
        .outerRadius( (d) => { return y(d.total_M); });

      let g = container.append('g');

      g.append('path')
        .data([data])
        .attr('class', 'line')
        .attr('fill', `url(#${gid})`)
        .attr('stroke', `url(#${gid})`)
        .attr('d', line);
    }

    function createRadialArea2( container, data, radius, arcWidth, padding, startA, endA, yMin, yMax, gid ) {

      let x = d3.scaleTime().range([ startA, endA ]); //(Math.PI/180)
      let y = d3.scaleLinear().range([radius - arcWidth, radius]);

      x.domain([ new Date(1995, 0, 1), new Date(2017, 0, 1) ]);
      y.domain([ yMin, yMax ]);

      let line = d3.areaRadial()
        .angle( (d) => { return x(d.year); })
        .innerRadius( (d) => { return radius - arcWidth; })
        .outerRadius( (d) => { return y(d.total_F); });

      let g = container.append('g');

      g.append('path')
        .data([data])
        .attr('class', 'line')
        .attr('fill', `url(#${gid})`)
        .attr('stroke', `url(#${gid})`)
        .attr('d', line);
    }

    lines.reverse(); //reverse to have the youger groups outside

    let radius = 100;
    let padding = 10;
    let radiusStep = 30;
    let index = 0;

    for ( let data of lines ) {

      let startA = degToRad(-90);
      let endA = degToRad(90);

      let yMin =  d3.min( data, (d) => { return d.total_M; });
      let yMax =  d3.max( data, (d) => { return d.total_M; });

      let cont1 = svg.append('g')
        .attr( 'transform', `translate(${width / 2},${height / 2})` );


      defs.append('radialGradient')
        .attr('id', 'mygradM' + index)
        .attr('href', '#gradcolors1')
        .attr('fr', radius - radiusStep)
        .attr('r', radius);

      //createGradient(index, startA, endA, radius);
      //createArc1( cont1, radius, radiusStep, startA, endA, `Gradient-${index}` );
      //createRadialLine1( cont1, data, radius, radiusStep, padding, startA, endA, yMin, yMax);
      createRadialArea1( cont1, data, radius, radiusStep, padding, startA, endA, yMin, yMax, `mygradM${index}`);

      // -- -- -- -- - -- --

      defs.append('radialGradient')
        .attr('id', 'mygradF' + index)
        .attr('href', '#gradcolors2')
        .attr('fr', radius - radiusStep)
        .attr('r', radius);

      startA = degToRad(-90);
      endA = degToRad(-270);

      yMin =  d3.min( data, (d) => { return d.total_F; });
      yMax =  d3.max( data, (d) => { return d.total_F; });

      let cont2 = svg.append('g')
        .attr( 'transform', `translate(${width / 2},${height / 2})` );

      //createArc2( cont2, radius, radiusStep, startA, endA, `Gradient-${index}` );
      //createRadialLine2( cont2, data, radius, radiusStep, padding, startA, endA, yMin, yMax);
      createRadialArea2( cont2, data, radius, radiusStep, padding, startA, endA, yMin, yMax, `mygradF${index}`);

      radius += radiusStep;
      index ++;
    }
  }
}
