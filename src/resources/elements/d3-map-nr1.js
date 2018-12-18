import {bindable, inject} from 'aurelia-framework';

import * as d3 from 'd3';


/* Need to compress these a bit for faster load times */
import municipalities from '/data/shape_files/original/Municipalities.json!json';
//import districts from '/data/original/Districts.json!json';
//import region from '/data/original/Regions_Europe.json!json';

@inject(Element)

export class D3MapNr1 {
  @bindable value;

  constructor(Element) {
    this.element = Element;
  }

  attached() {

    let svg = d3.select('#d3-map-nr1-container svg');

    //let width = +svg.attr('width');
    //let height = +svg.attr('height');
    let width = parseInt( svg.style('width') );
    let height = parseInt( svg.style('height') );

    let g = svg.append('g');

    let projection = d3.geoIdentity()
    	.reflectY(true)
    	.fitSize([width, height], municipalities);

    let geoPath = d3.geoPath()
    	.projection(projection);

    g.selectAll('path')
		  .data(municipalities.features)
		  .enter().append('path')
			  .attr('fill', 'none')
			  .attr('stroke', 'black')
			  .attr('d', geoPath);
  }

  valueChanged(newValue, oldValue) {

  }
}

