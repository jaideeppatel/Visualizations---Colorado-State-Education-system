visualizationFunctions.zoomsunburst = function(element, data, opts) {
    var network = visualizations[opts.ngIdentifier];
    network.parentVis = visualizations[opts.ngComponentFor];
    network.config = network.CreateBaseConfig();
    network.SVG = network.config.easySVG(element[0])
        .attr("background", "white")
        .attr("class", "canvas " + opts.ngIdentifier)
    network.VisFunc = function() {
    	inputdata = ntwrk.filteredData.records.data
    	var width = 1500,
		    height = 1000,
		    radius = (Math.min((width-400), height) / 2) - 10;

		var formatNumber = d3.format(",d");

		var x = d3.scale.linear()
		    .range([0, 2 * Math.PI]);

		var y = d3.scale.sqrt()
		    .range([0, radius]);

		var color = d3.scale.category20();

		var partition = d3.layout.partition()
		    .value(function(d) { return d.size; });

		var arc = d3.svg.arc()
		    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
		    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
		    .innerRadius(function(d) { return Math.max(0, y(d.y)); })
		    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });
		var container = network.SVG.append("svg")
		                .attr("width", width)
		                .attr("height", height)
		var svg = container
		    .append("g")
		    .attr("transform", "translate(" + (width-400) / 2 + "," + (height / 2) + ")");

		var render = inputdata(foreach(function(error, root) {
		  if (error) throw error;

		  svg.selectAll("path")
		      .data(partition.nodes (root))
		      .enter().append("path")
		      .attr("d", arc)
		      .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
		      .on("click", click)
		      .append("title")
		      .text(function(d) {
		        if(d.depth == 0){
		          return "States \n # Schools: " + formatNumber(d.value);
		        }
		        if(d.depth == 5){
		          return d.name;
		        }
		        else {
		          return d.name + "\n # Schools: " + formatNumber(d.value); 
		        }
		        });  
		  }
		    });

		var titlegrp = container.append('g').attr('transform','translate(1150,25)')
		  titlegrp.append("foreignObject")
		    .attr('style','black')
		    .attr('width',400)
		    .attr('height',500)
		    .html(function(){
		      return "<p><b>Level 1: States<br /><br />Level 2: Colorado <br /><br /> Level 3: County<br /><br /> Level 4: School Type<br /><br /> Level 5: School Grades <br /><br /> Level 6: School Name</b></p>"
		      })
		  .attr('class','titles')

		function click(d) {
		  svg.transition()
		      .duration(750)
		      .tween("scale", function() {
		        var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
		            yd = d3.interpolate(y.domain(), [d.y, 1]),
		            yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
		        return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
		      })
		    .selectAll("path")
		      .attrTween("d", function(d) { return function() { return arc(d); }; });
		}

		d3.select(self.frameElement).style("height", height + "px");
    }
    return network;
}
