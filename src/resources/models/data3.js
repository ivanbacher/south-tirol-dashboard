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

  for ( let i = 0; i < lines.length; i++ ) {
    let filtered = dataSet.data.filter( (current) => { return getGroup(current['Altersklassen']) === i; } );
    
    let total = filtered.reduce( (accumulator, current) => {
      return accumulator + parseInt( current['Insgesamt'].replace('.','') );
    }, 0);

    let total_M = filtered.reduce( (accumulator, current) => {
      let val = parseInt( current['Männer'].replace('.','') );
      return accumulator + (isNaN(val) === true ? 0 : val); //parse int ignores everything after the .
    }, 0);

    let total_F = filtered.reduce( (accumulator, current) => {
      let val = parseInt( current['Frauen'].replace('.','') );
      return accumulator + (isNaN(val) === true ? 0 : val); //parse int ignores everything after the .
    }, 0);

    lines[i].push({ 
      year: new Date(dataSet.year, 0, 1), 
      total: total,
      total_M: total_M,
      total_F: total_F
    });
  }
}

function getSankeyData() {

  let data = dataSets[0].data;
  let year = dataSets[0].year;

  let sankData = {
    info: {
      year: new Date(year, 0, 1)
    },
    nodes: [
      { id: 0, name: 'total', text: '' },
      { id: 1, name: 'male', text: '' },
      { id: 2, name: 'female', text: '' },
      { id: 3, name: '0-10', text: '' },
      { id: 4, name: '11-20', text: '' },
      { id: 5, name: '21-30', text: '' },
      { id: 6, name: '31-40', text: '' },
      { id: 7, name: '41-50', text: '' },
      { id: 8, name: '51-60', text: '' },
      { id: 9, name: '61-70', text: '' },
      { id: 10, name: '71-80', text: '' },
      { id: 11, name: '81-90', text: '' },
      { id: 12, name: '91-...', text: '' }
    ],
    links: []
  }

  let total_M = data.reduce( (accumulator, current) => {
    let val = parseInt( current['Männer'].replace('.','') );
    return accumulator + ( isNaN(val) === true ? 0 : val ); //parse int ignores everything after the .
  }, 0);

  let total_F = data.reduce( (accumulator, current) => {
    let val = parseInt( current['Frauen'].replace('.','') );
    return accumulator + ( isNaN(val) === true ? 0 : val ); //parse int ignores everything after the .
  }, 0);

  sankData.links.push( { source: 0, target: 1, value: total_M } );
  sankData.links.push( { source: 0, target: 2, value: total_F } );

  let indexOffset = 3;

  for ( let i = 0; i < lines.length; i++ ) {
    let filtered = data.filter( (current) => { return getGroup(current['Altersklassen']) === i; } );
  
    let total_M = filtered.reduce( (accumulator, current) => {
      let val = parseInt( current['Männer'].replace('.','') );
      return accumulator + ( isNaN(val) === true ? 0 : val ); //parse int ignores everything after the .
    }, 0);

    sankData.links.push( { source: 1, target: i + indexOffset, value: total_M } );

    let total_F = filtered.reduce( (accumulator, current) => {
      let val = parseInt( current['Frauen'].replace('.','') );
      return accumulator + ( isNaN(val) === true ? 0 : val ); //parse int ignores everything after the .
    }, 0);

    sankData.links.push( { source: 2, target: i + indexOffset, value: total_F } );

  }
  
  return sankData;
}

export { lines, getGroupName, getSankeyData };
