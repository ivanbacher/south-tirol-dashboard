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

let data = [];

for (let dataSet of dataSets ) {
  data.push( { 
    year: new Date(dataSet.year, 0, 1),
    total_I: dataSet.data.reduce( (accumulator, current) => {
      let val = parseInt( current['Inländer'].replace('.',''));
      return accumulator + ( isNaN(val) === true ? 0 : val );
    }, 0),
    total_A: dataSet.data.reduce( (accumulator, current) => {
      let val = parseInt( current['Ausländer'].replace('.',''));
      return accumulator + ( isNaN(val) === true ? 0 : val );
    }, 0),
    total_1: dataSet.data.reduce( (accumulator, current) => {
      let val = parseInt( current['davon EU-28-Staaten'].replace('.',''));
      return accumulator + ( isNaN(val) === true ? 0 : val );
    }, 0),
    total_2: dataSet.data.reduce( (accumulator, current) => {
      let val = parseInt( current['davon andere europäische Staaten'].replace('.',''));
      return accumulator + ( isNaN(val) === true ? 0 : val );
    }, 0),
    total_3: dataSet.data.reduce( (accumulator, current) => {
      let val = parseInt( current['davon Afrika'].replace('.',''));
      return accumulator + ( isNaN(val) === true ? 0 : val );
    }, 0),
    total_4: dataSet.data.reduce( (accumulator, current) => {
      let val = parseInt( current['davon Asien'].replace('.',''));
      return accumulator + ( isNaN(val) === true ? 0 : val );
    }, 0),
    total_5: dataSet.data.reduce( (accumulator, current) => {
      let val = parseInt( current['davon Amerika-Ozeanien'].replace('.',''));
      return accumulator + ( isNaN(val) === true ? 0 : val );
    }, 0),
    total_6: dataSet.data.reduce( (accumulator, current) => {
      let val = parseInt( current['davon Staatenlose'].replace('.',''));
      return accumulator + ( isNaN(val) === true ? 0 : val );
    }, 0)
  });
}

export { data };
