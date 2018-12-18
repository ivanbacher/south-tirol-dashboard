import {inject} from 'aurelia-framework';

import * as d3 from 'd3';


/* Need to compress these a bit for faster load times */
//import municipalities from '/data/shape_files/original/Municipalities.json!json';
import districts from '/data/shape_files/original/Districts.json!json';
//import region from '/data/original/Regions_Europe.json!json';

@inject(Element)

export class D3MapNr2 {

  constructor(Element) {
    this.element = Element;
  }

  attached() {

    let svg = d3.select('#d3-map-nr2-container svg');

    let width = parseInt( svg.style('width') );
    let height = parseInt( svg.style('height') );

    let g = svg.append('g');

    let projection = d3.geoIdentity()
    	.reflectY(true)
    	.fitSize([width, height], districts);

    let geoPath = d3.geoPath()
    	.projection(projection);

    g.selectAll('path')
		  .data(districts.features)
		  .enter().append('path')
			  .attr('fill', 'none')
			  .attr('stroke', 'black')
			  .attr('d', geoPath);
  }

  valueChanged(newValue, oldValue) {

  }
}

