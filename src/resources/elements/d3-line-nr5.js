import {bindable, inject} from 'aurelia-framework';

import * as d3 from 'd3';

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

export class D3LineNr5 {

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
      let g0_total = g0.reduce( (accumulator, current) => {
        return accumulator + parseInt( current['Insgesamt'].replace('.','') ); //parse int ignores everything after the .
      }, 0);

      line0.push( { year: new Date(dataSet.year, 0, 1), total: g0_total } );


      //Group 1
      let g1 = dataSet.data.filter( (current) => { return getGroup(current['Altersklassen']) === 1; } );
      let g1_total = g1.reduce( (accumulator, current) => {
        return accumulator + parseInt( current['Insgesamt'].replace('.','') ); //parse int ignores everything after the .
      }, 0);

      line1.push( { year: new Date(dataSet.year, 0, 1), total: g1_total } );


      //Group 2
      let g2 = dataSet.data.filter( (current) => { return getGroup(current['Altersklassen']) === 2; } );
      let g2_total = g2.reduce( (accumulator, current) => {
        return accumulator + parseInt( current['Insgesamt'].replace('.','') ); //parse int ignores everything after the .
      }, 0);

      line2.push( { year: new Date(dataSet.year, 0, 1), total: g2_total } );


      //Group 3
      let g3 = dataSet.data.filter( (current) => { return getGroup(current['Altersklassen']) === 3; } );
      let g3_total = g3.reduce( (accumulator, current) => {
        return accumulator + parseInt( current['Insgesamt'].replace('.','') ); //parse int ignores everything after the .
      }, 0);

      line3.push( { year: new Date(dataSet.year, 0, 1), total: g3_total } );


      //Group 4
      let g4 = dataSet.data.filter( (current) => { return getGroup(current['Altersklassen']) === 4; } );
      let g4_total = g4.reduce( (accumulator, current) => {
        return accumulator + parseInt( current['Insgesamt'].replace('.','') ); //parse int ignores everything after the .
      }, 0);

      line4.push( { year: new Date(dataSet.year, 0, 1), total: g4_total } );


      //Group 5
      let g5 = dataSet.data.filter( (current) => { return getGroup(current['Altersklassen']) === 5; } );
      let g5_total = g5.reduce( (accumulator, current) => {
        return accumulator + parseInt( current['Insgesamt'].replace('.','') ); //parse int ignores everything after the .
      }, 0);

      line5.push( { year: new Date(dataSet.year, 0, 1), total: g5_total } );


      //Group 6
      let g6 = dataSet.data.filter( (current) => { return getGroup(current['Altersklassen']) === 6; } );
      let g6_total = g6.reduce( (accumulator, current) => {
        return accumulator + parseInt( current['Insgesamt'].replace('.','') ); //parse int ignores everything after the .
      }, 0);

      line6.push( { year: new Date(dataSet.year, 0, 1), total: g6_total } );


      //Group 7
      let g7 = dataSet.data.filter( (current) => { return getGroup(current['Altersklassen']) === 7; } );
      let g7_total = g7.reduce( (accumulator, current) => {
        return accumulator + parseInt( current['Insgesamt'].replace('.','') ); //parse int ignores everything after the .
      }, 0);

      line7.push( { year: new Date(dataSet.year, 0, 1), total: g7_total } );


      //Group 8
      let g8 = dataSet.data.filter( (current) => { return getGroup(current['Altersklassen']) === 8; } );
      let g8_total = g8.reduce( (accumulator, current) => {
        return accumulator + parseInt( current['Insgesamt'].replace('.','') ); //parse int ignores everything after the .
      }, 0);

      line8.push( { year: new Date(dataSet.year, 0, 1), total: g8_total } );
    

      //Group 9
      let g9 = dataSet.data.filter( (current) => { return getGroup(current['Altersklassen']) === 9; } );
      let g9_total = g8.reduce( (accumulator, current) => {
        return accumulator + parseInt( current['Insgesamt'].replace('.','') ); //parse int ignores everything after the .
      }, 0);

      line9.push( { year: new Date(dataSet.year, 0, 1), total: g9_total } );

    }

    
    let container = d3.select('#d3-line-nr5-container');

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
        d3.min( line, (d) =>  { return d.total; })
      );

      let yMax = Math.max(
        d3.max( line, (d) =>  { return d.total; })
      );

      // Scale the range of the data
      x.domain([ new Date(1995, 0, 1), new Date(2017, 0, 1) ]);
      y.domain([ yMin, yMax ]);

      // define the line
      let valueline = d3.line()
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d.total); });

      let viewport = svg.append('g')
        .attr( 'transform', `translate(${paddingL},${paddingT})` );

      viewport.append('path')
        .data([line])
        .attr('class', 'line')
        .attr('fill', 'none')
        .attr('stroke', 'blue')
        .attr('d', valueline);

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
 
 /*
     
    let paddingL = 60;
    let paddingT = 50;

    let newWidth = width - (paddingL * 2);
    let newHeight = height - (paddingT * 2);
    

    let visViewport = svg.append('g')
      .attr( 'transform', `translate(${paddingL},${paddingT})` );

    // set the ranges
    let x = d3.scaleTime().range([0, newWidth]);
    let y = d3.scaleLinear().range([newHeight, 0]);

    let yMin = Math.min(
      d3.min( lineData, (d) =>  { return d.total_1; }),
      d3.min( lineData, (d) =>  { return d.total_2; }),
      d3.min( lineData, (d) =>  { return d.total_3; }),
      d3.min( lineData, (d) =>  { return d.total_4; }),
      d3.min( lineData, (d) =>  { return d.total_5; }),
      d3.min( lineData, (d) =>  { return d.total_6; })
    );

    let yMax = Math.max(
      d3.max( lineData, (d) =>  { return d.total_1; }),
      d3.max( lineData, (d) =>  { return d.total_2; }),
      d3.max( lineData, (d) =>  { return d.total_3; }),
      d3.max( lineData, (d) =>  { return d.total_4; }),
      d3.max( lineData, (d) =>  { return d.total_5; }),
      d3.max( lineData, (d) =>  { return d.total_6; })
    );

    // Scale the range of the data
    x.domain([new Date(1995, 0, 1), new Date(2017, 0, 1)]);
    y.domain([ yMin, yMax ]);


    // define the 1st line
    let valueline1 = d3.line()
      .x(function(d) { return x(d.year); })
      .y(function(d) { return y(d.total_1); });
    
    let valueline2 = d3.line()
      .x(function(d) { return x(d.year); })
      .y(function(d) { return y(d.total_2); });
    
    let valueline3 = d3.line()
      .x(function(d) { return x(d.year); })
      .y(function(d) { return y(d.total_3); });
  
    let valueline4 = d3.line()
      .x(function(d) { return x(d.year); })
      .y(function(d) { return y(d.total_4); });
  
    let valueline5 = d3.line()
      .x(function(d) { return x(d.year); })
      .y(function(d) { return y(d.total_5); });
  
    let valueline6 = d3.line()
      .x(function(d) { return x(d.year); })
      .y(function(d) { return y(d.total_6); });

    // Add the valueline path.
    visViewport.append('path')
      .data([lineData])
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', 'blue')
      .attr('d', valueline1);

    visViewport.append('path')
      .data([lineData])
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('d', valueline2);
      
    visViewport.append('path')
      .data([lineData])
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', 'green')
      .attr('d', valueline3);

    visViewport.append('path')
      .data([lineData])
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', 'yellow')
      .attr('d', valueline4);

    visViewport.append('path')
      .data([lineData])
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', 'purple')
      .attr('d', valueline5);

    visViewport.append('path')
      .data([lineData])
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('d', valueline6);


    // Create the X Axis
    let xAxis = d3.axisBottom()
      .scale(x)
      .ticks(dataSets.length)
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
    */
  }
}

