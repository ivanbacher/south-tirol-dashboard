
/* 
  Source: 
   - https://www.visualcinnamon.com/2016/06/glow-filter-d3-visualization

  Notes:
   - glow works on rectangles, circles, paths
   -  doesn’t seem to have an effect on lines, no matter how thick
*/ 

function createGradient( defs, id, sd ) {
  
  let stdDeviation = sd || 3.5;

  //Filter for the outside glow
  let filter = defs.append('filter')
    .attr('id', id);

  filter.append('feGaussianBlur')
    .attr('stdDeviation', stdDeviation)
    .attr('result', 'coloredBlur');

  let feMerge = filter.append('feMerge');
  
  feMerge.append('feMergeNode')
    .attr('in', 'coloredBlur');

  feMerge.append('feMergeNode')
    .attr('in', 'SourceGraphic');
}

export { createGradient };
