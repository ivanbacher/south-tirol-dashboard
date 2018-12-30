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

export class Page4 {

  attached() {

    let svg = d3.select('svg');
    let defs = svg.append('defs');
  }
}