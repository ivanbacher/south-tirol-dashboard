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

    lines.reverse(); //reverse to have the youger groups outside






    let radius = 100;
    let padding = 5;
    let radiusStep = 40;
    let index = 0;

    let line = d3.areaRadial()
      .angle( (d) => { return x(d.year); })
      .innerRadius( (d) => { return radius - radiusStep; });

    let x = d3.scaleTime()
      .domain( [ new Date(1995, 0, 1), new Date(2017, 0, 1) ] );

    let y = d3.scaleLinear();

    let cont1 = svg.append('g')
      .attr( 'transform', `translate(${width / 2},${height / 2})` );

    let cont2 = svg.append('g')
      .attr( 'transform', `translate(${width / 2},${height / 2})` );

    //loop though the datasets to create the radial lines
    for ( let data of lines ) {

      let startA = degToRad(-90);
      let endA = degToRad(90);

      let gid = `mygradM${index}`;

      let yMin =  d3.min( data, (d) => { return d.total_M; });
      let yMax =  d3.max( data, (d) => { return d.total_M; });

      defs.append('radialGradient')
        .attr('id', gid)
        .attr('href', '#gradcolors1')
        .attr('fr', radius - radiusStep)
        .attr('r', radius);

      //calibrate scales
      x.range( [ startA, endA ] );
      y.domain( [ yMin, yMax ] );
      y.range( [ (radius - radiusStep) + padding, radius - padding] );


      line.outerRadius( (d) => { return y(d.total_M); });

      let g1 = cont1.append('g');

      g1.append('path')
        .data([data])
        .attr('class', 'radialArea')
        .attr('fill', `url(#${gid})`)
        .attr('stroke', 'none')
        .attr('d', line);
      
      g1.selectAll('.MM')
        .data(data)
        .enter().append('circle')
        .attr('cx', (d) => {
          return line.outerRadius()(d) * Math.cos( line.angle()(d) - degToRad(90) );
        })
        .attr('cy', (d) => {
          return line.outerRadius()(d) * Math.sin( line.angle()(d) - degToRad(90) );
        })
        .attr('stroke', 'none')
        .attr('fill', 'black')
        .attr('r', 1);

      // -- -- -- -- - -- --
      // -- -- -- -- - -- --
      // -- -- -- -- - -- --
      // -- -- -- -- - -- --

      gid = `mygradF${index}`;

      startA = degToRad(-90);
      endA = degToRad(-270);

      defs.append('radialGradient')
        .attr('id', gid)
        .attr('href', '#gradcolors2')
        .attr('fr', radius - radiusStep)
        .attr('r', radius);

      yMin =  d3.min( data, (d) => { return d.total_F; });
      yMax =  d3.max( data, (d) => { return d.total_F; });

      //reset scales
      x.range([ startA, endA ]);
      y.domain([ yMin, yMax ] );

      //reset line
      line.outerRadius( (d) => { return y(d.total_F); });

      let g2 = cont2.append('g');

      g2.append('path')
        .data([data])
        .attr('class', 'line')
        .attr('fill', `url(#${gid})`)
        .attr('stroke', 'none')
        .attr('d', line);

      g2.selectAll('.FF')
        .data(data)
        .enter().append('circle')
        .attr('cx', (d) => {
          return line.outerRadius()(d) * Math.cos( line.angle()(d) - degToRad(90) );
        })
        .attr('cy', (d) => {
          return line.outerRadius()(d) * Math.sin( line.angle()(d) - degToRad(90) );
        })
        .attr('stroke', 'none')
        .attr('fill', 'black')
        .attr('r', 1);

      radius += radiusStep;
      index ++;
    }

    //ok now lets add some date lables

    let data = lines[0].map( (el) => { return { year: el.year }; } );

    let lablesContainer1 = svg.append('g')
      .attr('transform', `translate(${width/2}, ${height/2})`);

    let startA = degToRad(-90);
    let endA = degToRad(90);
    
    x.range( [ startA, endA ] );

    lablesContainer1.selectAll('.MM')
      .data(data)
      .enter().append('text')
      .attr('dx', (d) => {
        return radius * Math.cos( line.angle()(d) - degToRad(90) );
      })
      .attr('dy', (d) => {
        return radius * Math.sin( line.angle()(d) - degToRad(90) );
      })
      .text( (d) => { return d.year.getFullYear() } );
    
    lablesContainer1.selectAll('.MMM')
      .data(data)
      .enter().append('path')
      .attr('d', (d) => {
        let x1 = radius * Math.cos( line.angle()(d) - degToRad(90) );
        let y1 = radius * Math.sin( line.angle()(d) - degToRad(90) );
        
        let x2 = 0;
        let y2 = 0;

        return `M ${x1} ${y1} L ${x2} ${y2}`;
      })
      .attr('stroke', 'black');
      /*
      .enter().append('circle')
      .attr('cx', (d) => {
        return radius * Math.cos( line.angle()(d) - degToRad(90) );
      })
      .attr('cy', (d) => {
        return radius * Math.sin( line.angle()(d) - degToRad(90) );
      })
      .attr('stroke', 'none')
      .attr('fill', 'green')
      .attr('r', 4);
      */
/*
    
    let pieSlices = d3.range( lines[0].length ).map( () => { return 1; });

    let arc = d3.arc()
      .outerRadius( radius )
      .innerRadius( radius - radiusStep );

    let pi = d3.pie()
      .startAngle( -90 * (Math.PI / 180) )
      .endAngle( 90 * (Math.PI / 180) );

    let arcs = pi(pieSlices);

    let slices = lablesContainer.selectAll('path')
      .data(arcs).enter()
      .append('g');

    slices.append('path')
      .attr('d', arc)
      .attr('fill', 'none')
      .attr('stroke', 'black');
    */
  }
}

function degToRad( deg ) {
  return deg * (Math.PI / 180);
}

function radToDeg( rad ) {
  return rad * (180 / Math.PI);
}


/*
 
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
*/