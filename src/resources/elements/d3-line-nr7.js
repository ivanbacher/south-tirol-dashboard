import {bindable, inject} from 'aurelia-framework';

import * as d3 from 'd3';
import {sankey, sankeyLinkHorizontal} from 'd3-sankey';

import csv_2017 from '/data/wohnbevolkerung_nach_geschlecht_und_alter/2017.csv!text';
import csv_2016 from '/data/wohnbevolkerung_nach_geschlecht_und_alter/2016.csv!text';
import csv_2015 from '/data/wohnbevolkerung_nach_geschlecht_und_alter/2015.csv!text';
import csv_2014 from '/data/wohnbevolkerung_nach_geschlecht_und_alter/2014.csv!text';
import csv_2013 from '/data/wohnbevolkerung_nach_geschlecht_und_alter/2013.csv!text';
import csv_2012 from '/data/wohnbevolkerung_nach_geschlecht_und_alter/2012.csv!text';
import csv_2011 from '/data/wohnbevolkerung_nach_geschlecht_und_alter/2011.csv!text';
import csv_2010 from '/data/wohnbevolkerung_nach_geschlecht_und_alter/2010.csv!text';
import csv_2009 from '/data/wohnbevolkerung_nach_geschlecht_und_alter/2009.csv!text';
import csv_2008 from '/data/wohnbevolkerung_nach_geschlecht_und_alter/2008.csv!text';
import csv_2007 from '/data/wohnbevolkerung_nach_geschlecht_und_alter/2007.csv!text';
import csv_2006 from '/data/wohnbevolkerung_nach_geschlecht_und_alter/2006.csv!text';
import csv_2005 from '/data/wohnbevolkerung_nach_geschlecht_und_alter/2005.csv!text';
import csv_2004 from '/data/wohnbevolkerung_nach_geschlecht_und_alter/2004.csv!text';
import csv_2003 from '/data/wohnbevolkerung_nach_geschlecht_und_alter/2003.csv!text';
import csv_2002 from '/data/wohnbevolkerung_nach_geschlecht_und_alter/2002.csv!text';
import csv_2001 from '/data/wohnbevolkerung_nach_geschlecht_und_alter/2001.csv!text';
import csv_2000 from '/data/wohnbevolkerung_nach_geschlecht_und_alter/2000.csv!text';
import csv_1999 from '/data/wohnbevolkerung_nach_geschlecht_und_alter/1999.csv!text';
import csv_1998 from '/data/wohnbevolkerung_nach_geschlecht_und_alter/1998.csv!text';
import csv_1997 from '/data/wohnbevolkerung_nach_geschlecht_und_alter/1997.csv!text';
import csv_1996 from '/data/wohnbevolkerung_nach_geschlecht_und_alter/1996.csv!text';
import csv_1995 from '/data/wohnbevolkerung_nach_geschlecht_und_alter/1995.csv!text';

@inject(Element)

export class D3LineNr7 {

  constructor(Element) {
    this.element = Element;
  }

  attached() {

    //data manipulation
    let dataSets = [
      { year: '2017', data: d3.csvParse( csv_2017 ) },
      { year: '2016', data: d3.csvParse( csv_2016 ) },
      { year: '2015', data: d3.csvParse( csv_2015 ) },
      { year: '2014', data: d3.csvParse( csv_2014 ) },
      { year: '2013', data: d3.csvParse( csv_2013 ) },
      { year: '2012', data: d3.csvParse( csv_2012 ) },
      { year: '2011', data: d3.csvParse( csv_2011 ) },
      { year: '2010', data: d3.csvParse( csv_2010 ) },
      { year: '2009', data: d3.csvParse( csv_2009 ) },
      { year: '2008', data: d3.csvParse( csv_2008 ) },
      { year: '2007', data: d3.csvParse( csv_2007 ) },
      { year: '2006', data: d3.csvParse( csv_2006 ) },
      { year: '2005', data: d3.csvParse( csv_2005 ) },
      { year: '2004', data: d3.csvParse( csv_2004 ) },
      { year: '2003', data: d3.csvParse( csv_2003 ) },
      { year: '2002', data: d3.csvParse( csv_2002 ) },
      { year: '2001', data: d3.csvParse( csv_2001 ) },
      { year: '2000', data: d3.csvParse( csv_2000 ) },
      { year: '1999', data: d3.csvParse( csv_1999 ) },
      { year: '1998', data: d3.csvParse( csv_1998 ) },
      { year: '1997', data: d3.csvParse( csv_1997 ) },
      { year: '1996', data: d3.csvParse( csv_1996 ) },
      { year: '1995', data: d3.csvParse( csv_1995 ) }
    ];

    function getGroup( altersKlasse ) {
      let klasse = parseInt( altersKlasse );
      
      if (klasse <= 10) {
        return 0;
      }

      if (klasse >= 11 && klasse <= 20) {
        return 1;
      }

      if (klasse >= 21 && klasse <= 30) {
        return 2;
      }

      if (klasse >= 31 && klasse <= 40) {
        return 3;
      }

      if (klasse >= 41 && klasse <= 50) {
        return 4;
      }

      if (klasse >= 51 && klasse <= 60) {
        return 5;
      }

      if (klasse >= 61 && klasse <= 70) {
        return 6;
      }

      if (klasse >= 71 && klasse <= 80) {
        return 7;
      }

      if (klasse >= 81 && klasse <= 90) {
        return 8;
      }

      if (klasse >= 91) {
        return 9;
      }
    }
    function getGroupName( group ) {
      
      if (group === 0) {
        return '0 - 10';
      }

      if (group === 1) {
        return '11 - 20';
      }

      if (group === 2) {
        return '21 - 30';
      }

      if (group === 3) {
        return '31 - 40';
      }

      if (group === 4) {
        return '41 - 50';
      }

      if (group === 5) {
        return '51 - 60';
      }

      if (group === 6) {
        return '61 - 70';
      }
      
      if (group === 7) {
        return '71 - 80';
      }

      if (group === 8) {
        return '81 - 90';
      }

      if (group === 9) {
        return '91 - ...';
      }
    }


    let line0 = [];
    let line1 = [];
    let line2 = [];
    let line3 = [];
    let line4 = [];
    let line5 = [];
    let line6 = [];
    let line7 = [];
    let line8 = [];
    let line9 = [];

    let lines = [ line0, line1, line2, line3, line4, line5, line6, line7, line8, line9 ];

    for ( let dataSet of dataSets ) {

      //Group 0
      let g0 = dataSet.data.filter( (current) => { return getGroup(current['Altersklassen']) === 0; } );
      let g0_total_M = g0.reduce( (accumulator, current) => {
        let val = parseInt( current['Männer'].replace('.','') );
        return accumulator + (isNaN(val) === true ? 0 : val); //parse int ignores everything after the .
      }, 0);
      let g0_total_F = g0.reduce( (accumulator, current) => {
        let val = parseInt( current['Frauen'].replace('.','') );
        return accumulator + (isNaN(val) === true ? 0 : val);
      }, 0);

      line0.push( { year: new Date(dataSet.year, 0, 1), total_M: g0_total_M, total_F: g0_total_F } );


      //Group 1
      let g1 = dataSet.data.filter( (current) => { return getGroup(current['Altersklassen']) === 1; } );
      let g1_total_M = g1.reduce( (accumulator, current) => {
        let val = parseInt( current['Männer'].replace('.','') );
        return accumulator + (isNaN(val) === true ? 0 : val);
      }, 0);
      let g1_total_F = g1.reduce( (accumulator, current) => {
        let val = parseInt( current['Frauen'].replace('.','') );
        return accumulator + (isNaN(val) === true ? 0 : val);
      }, 0);

      line1.push( { year: new Date(dataSet.year, 0, 1), total_M: g1_total_M, total_F: g1_total_F } );


      //Group 2
      let g2 = dataSet.data.filter( (current) => { return getGroup(current['Altersklassen']) === 2; } );
      let g2_total_M = g2.reduce( (accumulator, current) => {
        let val = parseInt( current['Männer'].replace('.','') );
        return accumulator + (isNaN(val) === true ? 0 : val);
      }, 0);
      let g2_total_F = g2.reduce( (accumulator, current) => {
        let val = parseInt( current['Frauen'].replace('.','') );
        return accumulator + (isNaN(val) === true ? 0 : val);
      }, 0);

      line2.push( { year: new Date(dataSet.year, 0, 1), total_M: g2_total_M, total_F: g2_total_F } );


      //Group 3
      let g3 = dataSet.data.filter( (current) => { return getGroup(current['Altersklassen']) === 3; } );
      let g3_total_M = g3.reduce( (accumulator, current) => {
        let val = parseInt( current['Männer'].replace('.','') );
        return accumulator + (isNaN(val) === true ? 0 : val);
      }, 0);
      let g3_total_F = g3.reduce( (accumulator, current) => {
        let val = parseInt( current['Frauen'].replace('.','') );
        return accumulator + (isNaN(val) === true ? 0 : val);
      }, 0);

      line3.push( { year: new Date(dataSet.year, 0, 1), total_M: g3_total_M, total_F: g3_total_F } );


      //Group 4
      let g4 = dataSet.data.filter( (current) => { return getGroup(current['Altersklassen']) === 4; } );
      let g4_total_M = g4.reduce( (accumulator, current) => {
        let val = parseInt( current['Männer'].replace('.','') );
        return accumulator + (isNaN(val) === true ? 0 : val);
      }, 0);
      let g4_total_F = g4.reduce( (accumulator, current) => {
        let val = parseInt( current['Frauen'].replace('.','') );
        return accumulator + (isNaN(val) === true ? 0 : val);
      }, 0);

      line4.push( { year: new Date(dataSet.year, 0, 1), total_M: g4_total_M, total_F: g4_total_F } );



      //Group 5
      let g5 = dataSet.data.filter( (current) => { return getGroup(current['Altersklassen']) === 5; } );
      let g5_total_M = g5.reduce( (accumulator, current) => {
        let val = parseInt( current['Männer'].replace('.','') );
        return accumulator + (isNaN(val) === true ? 0 : val);
      }, 0);
      let g5_total_F = g5.reduce( (accumulator, current) => {
        let val = parseInt( current['Frauen'].replace('.','') );
        return accumulator + (isNaN(val) === true ? 0 : val);
      }, 0);

      line5.push( { year: new Date(dataSet.year, 0, 1), total_M: g5_total_M, total_F: g5_total_F } );


      //Group 6
      let g6 = dataSet.data.filter( (current) => { return getGroup(current['Altersklassen']) === 6; } );
      let g6_total_M = g6.reduce( (accumulator, current) => {
        let val = parseInt( current['Männer'].replace('.','') );
        return accumulator + (isNaN(val) === true ? 0 : val);
      }, 0);
      let g6_total_F = g6.reduce( (accumulator, current) => {
        let val = parseInt( current['Frauen'].replace('.','') );
        return accumulator + (isNaN(val) === true ? 0 : val);
      }, 0);

      line6.push( { year: new Date(dataSet.year, 0, 1), total_M: g6_total_M, total_F: g6_total_F } );


      //Group 7
      let g7 = dataSet.data.filter( (current) => { return getGroup(current['Altersklassen']) === 7; } );
      let g7_total_M = g7.reduce( (accumulator, current) => {
        let val = parseInt( current['Männer'].replace('.','') );
        return accumulator + (isNaN(val) === true ? 0 : val);
      }, 0);
      let g7_total_F = g7.reduce( (accumulator, current) => {
        let val = parseInt( current['Frauen'].replace('.','') );
        return accumulator + (isNaN(val) === true ? 0 : val);
      }, 0);

      line7.push( { year: new Date(dataSet.year, 0, 1), total_M: g7_total_M, total_F: g7_total_F } );

      //Group 8
      let g8 = dataSet.data.filter( (current) => { return getGroup(current['Altersklassen']) === 8; } );
      let g8_total_M = g8.reduce( (accumulator, current) => {
        let val = parseInt( current['Männer'].replace('.','') );
        return accumulator + (isNaN(val) === true ? 0 : val);
      }, 0);
      let g8_total_F = g8.reduce( (accumulator, current) => {
        let val = parseInt( current['Frauen'].replace('.','') );
        return accumulator + (isNaN(val) === true ? 0 : val);
      }, 0);

      line8.push( { year: new Date(dataSet.year, 0, 1), total_M: g8_total_M, total_F: g8_total_F } );
    

      //Group 9
      let g9 = dataSet.data.filter( (current) => { return getGroup(current['Altersklassen']) === 9; } );
      let g9_total_M = g9.reduce( (accumulator, current) => {
        let val = parseInt( current['Männer'].replace('.','') );
        return accumulator + (isNaN(val) === true ? 0 : val);
      }, 0);
      let g9_total_F = g9.reduce( (accumulator, current) => {
        let val = parseInt( current['Frauen'].replace('.','') );
        return accumulator + (isNaN(val) === true ? 0 : val);
      }, 0);

      line9.push( { year: new Date(dataSet.year, 0, 1), total_M: g9_total_M, total_F: g9_total_F } );

    }


    let svg = d3.select('#d3-line-nr7-container svg');
    let g = svg.append('g');
    let links_g = g.append('g');
    let nodes_g = g.append('g');

    let width = parseInt( svg.style('width') );
    let height = parseInt( svg.style('height') );

    let data = {
      nodes:[
        { name: "Total" },
        { name: "Men" },
        { name: "Female" },
        { name: "G1" },
        { name: "G2" },
        { name: "G1" },
        { name: "G3" },
        { name: "G2" },
        { name: "G3" }
      ],
      links: [
        { source: 0, target: 1, value: 150 },
        { source: 0, target: 2, value: 150 },
        { source: 1, target: 3, value: 50 },
        { source: 1, target: 4, value: 50 },
        { source: 1, target: 5, value: 50 },
        { source: 2, target: 6, value: 50 },
        { source: 2, target: 7, value: 50 },
        { source: 2, target: 8, value: 50 }
      ]
    };

    let sk = sankey()
      .nodeWidth(15)
      .nodePadding(10)
      .iterations(1)
      .extent([[1, 1], [width - 1, height - 6]]);

  
    //https://beta.observablehq.com/@mbostock/d3-sankey-diagram
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

    
      

    /*
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
        .ticks(dataSets.length / 4)
        .tickFormat(d3.timeFormat('%Y'));

      // Add the X Axis
      viewport.append('g')
        .attr( 'transform', `translate(0,${newHeight})` )
        .call( xAxis );


      index++;
    }
    */
  }
}

