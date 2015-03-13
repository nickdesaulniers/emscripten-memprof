//http://strongriley.github.io/d3/ex/treemap.html
var w = 960,
h = 500,
color = d3.scale.category20c();

var treemap = d3.layout.treemap()
.size([w, h])
.value(function(d) { return d.size; });

var div = d3.select("#chart").append("div")
.style("position", "relative")
.style("width", w + "px")
.style("height", h + "px");

function update (json) {
  var d = div.data([json]).selectAll("div")
  .data(treemap.nodes, function (d) { return d.name; });

  d.transition().duration(750).call(cell);

  d.enter().append("div")
  .attr("class", "cell")//.transition().duration(500)
  .style("background", function(d) { return d.children ? color(d.name) : null; })
  .call(cell)
  .text(function(d) { return d.children ? null : d.name; });

  d.exit().transition().duration(500).remove();
};

d3.json("flare.json", update);

setTimeout(function () {
  d3.json("flare2.json", update);
}, 3000);

function cell() {
  this
  .style("left", function(d) { return d.x + "px"; })
  .style("top", function(d) { return d.y + "px"; })
  .style("width", function(d) { return d.dx - 1 + "px"; })
  .style("height", function(d) { return d.dy - 1 + "px"; });
}

