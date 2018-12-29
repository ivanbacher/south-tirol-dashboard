import * as d3 from 'd3';

import { lines, getGroupName } from './resources/helpers/data3';
import { createGradient } from './resources/helpers/glowGradient1';

/* 
  COLORS:

  https://coolors.co/88958d-606d5d-bc9cb0-d3cdd7-ddf2eb
  ---
  #88958D - mummy's tomb
  #606D5D - granite gray
  #BC9CB0 - pastel purple
  #D3CDD7 - light grey
  #DDF2EB - azureish white
  ---

  https://coolors.co/baf2bb-baf2d8-bad7f2-f2bac9-f2e2ba
  ---
  #baf2bb - Tea Green
  #baf2d8 - Magic Mint
  #bad7f2 - Pale Aqua
  #f2bac9
  
  - Cameo Pink
  #f2e2ba - Dutch White
  ---
*/

export class Page3 {

  attached() {

    let svg = d3.select('svg');
    let defs = svg.append('defs');

    createGradient( defs, 'glow1' );

    let width = parseInt( svg.style('width') );
    let height = parseInt( svg.style('height') );

    let container = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);
    
    container.append('rect')
      .attr('x', -25)
      .attr('y', -25)
      .attr('width', 50)
      .attr('height', 50)
      .attr('fill', '#606D5D')
      .attr('stroke', 'red')
      .style('filter', 'url(#glow1)');


    // - - - - - - - - - - - - - - - - -

    let gradcolors1 = defs.append('radialGradient')
      .attr('id', 'gradcolors1')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('cx', '0')
      .attr('cy', '0')
      .attr('fr', 340 - 40)
      .attr('r', 340);

    gradcolors1.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', 'white');

    gradcolors1.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#606D5D');
      
    container.append('path')
      .attr('d', path)
      .attr('fill', 'url(#gradcolors1)')
      .attr('stroke', 'none')
      .style('filter', 'url(#glow1)');
  }
}


let path = 'M305,-1.8675863686997135e-14L302.3001394375314,-43.55192862887925L294.2271272449904,-86.44967436158004L280.84541570789935,-128.2819304920116L261.411867646153,-167.98607890126166L237.1757343032548,-205.6172729254594L207.54146959908027,-239.5844346033129L172.55188208921055,-268.5169512725649L134.12457534861937,-293.6366172223622L91.53391891538551,-311.9819884678323L46.58217905092757,-324.231574885674L0,-330.61189663578745L-47.34723875178506,-329.55671245425714L-94.2800093198675,-320.8772792225078L-139.1856889710273,-304.71682589850604L-180.7820309600405,-281.32431365283753L-218.88265213485744,-252.6766171479198L-252.56163766939937,-218.78305046421733L-279.2078010381114,-179.42193718046448L-299.77543600619117,-136.92860731953562L-313.2316748005218,-92.03358147085483L-319.12361258497754,-45.84832080605953L-317.8337396392004,-1.9461703595509e-14L-300,-1.8369701987210297e-14L-296.9509829571529,-42.66279082269065L-287.83286838277024,-84.5709162688147L-272.8807396106024,-124.64390057106925L-252.38182400018505,-162.18327569246966L-226.7527985052251,-196.4259870028627L-196.42598700286268,-226.7527985052251L-162.18327569246964,-252.38182400018508L-124.64390057106924,-272.8807396106024L-84.57091626881468,-287.83286838277024L-42.66279082269064,-296.9509829571529L0,-300L42.66279082269057,-296.950982957153L84.45838446995593,-287.86590852812895L124.64390057106924,-272.8807396106024L162.18327569246964,-252.38182400018508L196.42598700286268,-226.7527985052251L226.67599043305722,-196.51461869589386L252.38182400018505,-162.18327569246966L272.8807396106024,-124.64390057106925L287.8328683827702,-84.57091626881483L296.9342816803339,-42.77887753300811L300,-1.8369701987210297e-14Z';
