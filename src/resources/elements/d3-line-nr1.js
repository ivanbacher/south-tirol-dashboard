import {bindable, inject} from 'aurelia-framework';

import * as d3 from 'd3';

import wbng_2017 from '/data/wohnbelvolkerung_nach_geschlecht_melderegister/2017.csv!text';
import wbng_2016 from '/data/wohnbelvolkerung_nach_geschlecht_melderegister/2016.csv!text';
import wbng_2015 from '/data/wohnbelvolkerung_nach_geschlecht_melderegister/2015.csv!text';
import wbng_2014 from '/data/wohnbelvolkerung_nach_geschlecht_melderegister/2014.csv!text';
import wbng_2013 from '/data/wohnbelvolkerung_nach_geschlecht_melderegister/2013.csv!text';
import wbng_2012 from '/data/wohnbelvolkerung_nach_geschlecht_melderegister/2012.csv!text';
import wbng_2011 from '/data/wohnbelvolkerung_nach_geschlecht_melderegister/2011.csv!text';
import wbng_2010 from '/data/wohnbelvolkerung_nach_geschlecht_melderegister/2010.csv!text';
import wbng_2009 from '/data/wohnbelvolkerung_nach_geschlecht_melderegister/2009.csv!text';
import wbng_2008 from '/data/wohnbelvolkerung_nach_geschlecht_melderegister/2008.csv!text';
import wbng_2007 from '/data/wohnbelvolkerung_nach_geschlecht_melderegister/2007.csv!text';
import wbng_2006 from '/data/wohnbelvolkerung_nach_geschlecht_melderegister/2006.csv!text';
import wbng_2005 from '/data/wohnbelvolkerung_nach_geschlecht_melderegister/2005.csv!text';
import wbng_2004 from '/data/wohnbelvolkerung_nach_geschlecht_melderegister/2004.csv!text';
import wbng_2003 from '/data/wohnbelvolkerung_nach_geschlecht_melderegister/2003.csv!text';
import wbng_2002 from '/data/wohnbelvolkerung_nach_geschlecht_melderegister/2002.csv!text';
import wbng_2001 from '/data/wohnbelvolkerung_nach_geschlecht_melderegister/2001.csv!text';
import wbng_2000 from '/data/wohnbelvolkerung_nach_geschlecht_melderegister/2000.csv!text';
import wbng_1999 from '/data/wohnbelvolkerung_nach_geschlecht_melderegister/1999.csv!text';
import wbng_1998 from '/data/wohnbelvolkerung_nach_geschlecht_melderegister/1998.csv!text';
import wbng_1997 from '/data/wohnbelvolkerung_nach_geschlecht_melderegister/1997.csv!text';
import wbng_1996 from '/data/wohnbelvolkerung_nach_geschlecht_melderegister/1996.csv!text';
import wbng_1995 from '/data/wohnbelvolkerung_nach_geschlecht_melderegister/1995.csv!text';



@inject(Element)


export class D3LineNr1 {
  @bindable value;

  constructor(Element) {
    this.element = Element;
  }

  attached() {
    console.log('d3-line attached');
    console.log(this.element);

    let svg = d3.select('#d3-line-one-container svg');
    
    let width = parseInt( svg.style('width') );
    let height = parseInt( svg.style('height') );

    console.log('width:', width, 'height: ', height);

    //data manipulation
    let dataSets = [
      { year: '2017', data: d3.csvParse( wbng_2017 ) },
      { year: '2016', data: d3.csvParse( wbng_2016 ) },
      { year: '2015', data: d3.csvParse( wbng_2015 ) },
      { year: '2014', data: d3.csvParse( wbng_2014 ) },
      { year: '2013', data: d3.csvParse( wbng_2013 ) },
      { year: '2012', data: d3.csvParse( wbng_2012 ) },
      { year: '2011', data: d3.csvParse( wbng_2011 ) },
      { year: '2010', data: d3.csvParse( wbng_2010 ) },
      { year: '2009', data: d3.csvParse( wbng_2009 ) },
      { year: '2008', data: d3.csvParse( wbng_2008 ) },
      { year: '2007', data: d3.csvParse( wbng_2007 ) },
      { year: '2006', data: d3.csvParse( wbng_2006 ) },
      { year: '2005', data: d3.csvParse( wbng_2005 ) },
      { year: '2004', data: d3.csvParse( wbng_2004 ) },
      { year: '2003', data: d3.csvParse( wbng_2003 ) },
      { year: '2002', data: d3.csvParse( wbng_2002 ) },
      { year: '2001', data: d3.csvParse( wbng_2001 ) },
      { year: '2000', data: d3.csvParse( wbng_2000 ) },
      { year: '1999', data: d3.csvParse( wbng_1999 ) },
      { year: '1998', data: d3.csvParse( wbng_1998 ) },
      { year: '1997', data: d3.csvParse( wbng_1997 ) },
      { year: '1996', data: d3.csvParse( wbng_1996 ) },
      { year: '1995', data: d3.csvParse( wbng_1995 ) }
    ];

    let lineData = [];

    for (let dataSet of dataSets ) {
      lineData.push( { 
        year: new Date(dataSet.year, 0, 1),
        description: 'Total population',
        total: dataSet.data.reduce( (accumulator, current) => {
          return accumulator + parseInt( current.Insgesamt.replace('.','') ); //parse int ignores everything after the .
        }, 0)
      });
    }

    //https://bl.ocks.org/d3noob/4db972df5d7efc7d611255d1cc6f3c4f

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
      d3.min( lineData, (d) =>  { return d.total; }) - 2000,
      d3.max( lineData, (d) =>  { return d.total; }) + 2000
    ]);


    // define the 1st line
    let valueline = d3.line()
      .x(function(d) { return x(d.year); })
      .y(function(d) { return y(d.total); });

   

    // Add the valueline path.
    visViewport.append('path')
      .data([lineData])
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('d', valueline);

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

