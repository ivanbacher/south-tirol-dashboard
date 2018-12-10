import {bindable, inject} from 'aurelia-framework';

import * as d3 from 'd3';

import csv_2017 from '/data/wohnbevolkerung_nach_staatsburgerschaft/2017.csv!text';
import csv_2016 from '/data/wohnbevolkerung_nach_staatsburgerschaft/2016.csv!text';
import csv_2015 from '/data/wohnbevolkerung_nach_staatsburgerschaft/2015.csv!text';
import csv_2014 from '/data/wohnbevolkerung_nach_staatsburgerschaft/2014.csv!text';
import csv_2013 from '/data/wohnbevolkerung_nach_staatsburgerschaft/2013.csv!text';
import csv_2012 from '/data/wohnbevolkerung_nach_staatsburgerschaft/2012.csv!text';
import csv_2011 from '/data/wohnbevolkerung_nach_staatsburgerschaft/2011.csv!text';
import csv_2010 from '/data/wohnbevolkerung_nach_staatsburgerschaft/2010.csv!text';
import csv_2009 from '/data/wohnbevolkerung_nach_staatsburgerschaft/2009.csv!text';
import csv_2008 from '/data/wohnbevolkerung_nach_staatsburgerschaft/2008.csv!text';
import csv_2007 from '/data/wohnbevolkerung_nach_staatsburgerschaft/2007.csv!text';
import csv_2006 from '/data/wohnbevolkerung_nach_staatsburgerschaft/2006.csv!text';
import csv_2005 from '/data/wohnbevolkerung_nach_staatsburgerschaft/2005.csv!text';
import csv_2004 from '/data/wohnbevolkerung_nach_staatsburgerschaft/2004.csv!text';
import csv_2003 from '/data/wohnbevolkerung_nach_staatsburgerschaft/2003.csv!text';
import csv_2002 from '/data/wohnbevolkerung_nach_staatsburgerschaft/2002.csv!text';
import csv_2001 from '/data/wohnbevolkerung_nach_staatsburgerschaft/2001.csv!text';
import csv_2000 from '/data/wohnbevolkerung_nach_staatsburgerschaft/2000.csv!text';
import csv_1999 from '/data/wohnbevolkerung_nach_staatsburgerschaft/1999.csv!text';
import csv_1998 from '/data/wohnbevolkerung_nach_staatsburgerschaft/1998.csv!text';
import csv_1997 from '/data/wohnbevolkerung_nach_staatsburgerschaft/1997.csv!text';
import csv_1996 from '/data/wohnbevolkerung_nach_staatsburgerschaft/1996.csv!text';
import csv_1995 from '/data/wohnbevolkerung_nach_staatsburgerschaft/1995.csv!text';

@inject(Element)

export class D3LineNr3 {

  constructor(Element) {
    this.element = Element;
  }

  attached() {
  
    let svg = d3.select('#d3-line-nr3-container svg');
    
    let width = parseInt( svg.style('width') );
    let height = parseInt( svg.style('height') );

    console.log('width:', width, 'height: ', height);

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

    let lineData = [];

    for (let dataSet of dataSets ) {
      lineData.push( { 
        year: new Date(dataSet.year, 0, 1),
        total_I: dataSet.data.reduce( (accumulator, current) => {
          return accumulator + parseInt( current.Inländer.replace('.','') ); //parse int ignores everything after the .
        }, 0),
        total_A: dataSet.data.reduce( (accumulator, current) => {
          return accumulator + parseInt( current.Ausländer.replace('.','') ); //parse int ignores everything after the .
        }, 0)
      });
    }
    
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
      Math.min( d3.min( lineData, (d) =>  { return d.total_I; }), d3.min( lineData, (d) =>  { return d.total_A; }) ),
      Math.max( d3.max( lineData, (d) =>  { return d.total_I; }), d3.max( lineData, (d) =>  { return d.total_A; }) )
    ]);


    // define the 1st line
    let valueline1 = d3.line()
      .x(function(d) { return x(d.year); })
      .y(function(d) { return y(d.total_I); });
    
    let valueline2 = d3.line()
      .x(function(d) { return x(d.year); })
      .y(function(d) { return y(d.total_A); });

   

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
  }
}

