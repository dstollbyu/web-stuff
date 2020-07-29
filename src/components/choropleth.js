import React from 'react';
import NavbarProj from './NavbarProj.js';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

// "use strict";

// Code mostly taken from example because this is all new to me and I'm learning! :)
// Establish base attributes
var w = 960,
    h = 600; // Create base SVG

var svg = d3.select("#svgcontainer").append("svg").attr("width", w).attr("height", h); // Create base tooltip

var tooltip = d3.select("#svgcontainer").append("div").attr("class", "tooltip").attr("id", "tooltip").style("opacity", 0); // Create base canvas path

var path = d3.geoPath(); // Define scales for axes

var xScale = d3.scaleLinear().domain([2.6, 75.1]) // Values taken from min-max bachelorsOrHigher variable in education url
    .rangeRound([600, 860]); // Color scale of 9 different colors of blue

var color = d3.scaleThreshold().domain(d3.range(2.6, 75.1, (75.1 - 2.6) / 8)).range(d3.schemeBlues[9]); // Create legend

var legend = svg.append("g").attr("class", "key").attr("id", "legend").attr("transform", "translate(0,40)"); // Color fills of legend

legend.selectAll("rect").data(color.range().map(function(d) {
    d = color.invertExtent(d);
    if (d[0] == null) d[0] = xScale.domain()[0];
    if (d[1] == null) d[1] = xScale.domain()[1];
    return d;
})).enter().append("rect").attr("height", 8).attr("width", function(d) {
    return xScale(d[1]) - xScale(d[0]);
}).attr("x", function(d) {
    return xScale(d[0]);
}).attr("fill", function(d) {
    return color(d[0]);
}); // Captions of legend

var xAxis = d3.axisBottom(xScale).tickSize(13).tickFormat(function(x) {
    return Math.round(x) + "%";
}).tickValues(color.domain());
legend.append("g").attr("class", "caption").attr("x", xScale.range()[0]).attr("y", -6).attr("fill", "#000").attr("text-anchor", "start").call(xAxis) // Selects and removes the horizontal line on the top of the legend
    .select(".domain").remove(); // Define urls for JSON to pull from

var EDUCATION_URL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
var COUNTY_URL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"; // Load data into Promise

Promise.all([d3.json(EDUCATION_URL), d3.json(COUNTY_URL)]).then(function(files) {
    var edu = files[0];
    var us = files[1]; // Add info for the map

    svg.append("g").attr("class", "counties").selectAll("path").data(topojson.feature(us, us.objects.counties).features).enter().append("path").attr("class", "county") // FIPS is a 5-number code representing county ID and stuff
        .attr("data-fips", function(d) {
            return d.id;
        }).attr("data-education", function(d) {
            // Return true if us id equals education FIPS
            var result = edu.filter(function(obj) {
                return obj.fips === d.id;
            }); // If a value matches, return the bachelorsOrHigher value of it

            if (result[0]) return result[0].bachelorsOrHigher; // Else return an error message

            console.log("could not find data for " + d.id);
            return 0;
        }).attr("fill", function(d) {
            // Same as last attr, but use the color scale instead
            var result = edu.filter(function(obj) {
                return obj.fips === d.id;
            });
            if (result[0]) return color(result[0].bachelorsOrHigher);
            return color(0);
        }).attr("d", path) // Apply mouseover and mouseout for tooltip
        .on("mouseover", function(d) {
            tooltip.style("opacity", .9).html(function() {
                var result = edu.filter(function(obj) {
                    return obj.fips === d.id;
                });

                if (result[0]) {
                    return result[0]['area_name'] + ", " + result[0]['state'] + ": " + result[0].bachelorsOrHigher + "%";
                }

                return 0;
            }).attr("data-education", function() {
                var result = edu.filter(function(obj) {
                    return obj.fips === d.id;
                });
                if (result[0]) return result[0].bachelorsOrHigher;
                return 0;
            }).style("left", d3.event.pageX + 10 + "px").style("top", d3.event.pageY - 28 + "px");
        }).on("mouseout", function(d) {
            tooltip.style("opacity", 0);
        }); // Add image of US map with topojson data

    svg.append("path").datum(topojson.mesh(us, us.objects.states, function(a, b) {
        return a !== b;
    })).attr("class", "states").attr("d", path);
}).catch(function(err) {
    return function(e) {
        throw e;
    }(err);
});

const Choropleth = () => {

  return (
    <>
      <NavbarProj />

      <div id="title">Choropleth</div>
      <div id="description">Unemployment rate, by US county</div>
      <div id="svgcontainer"></div>
    </>
  )
}

export default Choropleth;