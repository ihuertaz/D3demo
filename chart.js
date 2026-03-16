const data = [
  { name: "A", value: 30 },
  { name: "B", value: 80 },
  { name: "C", value: 45 },
  { name: "D", value: 60 }
];

const width = 600;
const height = 400;

const margin = { top: 40, right: 20, bottom: 40, left: 50 };

const chartWidth = width - margin.left - margin.right;
const chartHeight = height - margin.top - margin.bottom;

// Create the SVG inside the div
const svg = d3.select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Inner chart area
const g = svg.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Scales
const x = d3.scaleBand()
  .domain(data.map(d => d.name))
  .range([0, chartWidth])
  .padding(0.2);

const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.value)])
  .nice()
  .range([chartHeight, 0]);

// Axes
const xAxis = d3.axisBottom(x);
const yAxis = d3.axisLeft(y);

g.append("g")
  .attr("transform", `translate(0,${chartHeight})`)
  .call(xAxis);

g.append("g")
  .call(yAxis);

// Bars
g.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", d => x(d.name))
  .attr("y", d => y(d.value))
  .attr("width", x.bandwidth())
  .attr("height", d => chartHeight - y(d.value))
  .attr("fill", "steelblue")
  .on("mouseover", function () {
    d3.select(this).attr("fill", "orange");
  })
  .on("mouseout", function () {
    d3.select(this).attr("fill", "steelblue");
  });

// Title
svg.append("text")
  .attr("x", width / 2)
  .attr("y", 20)
  .attr("text-anchor", "middle")
  .attr("font-size", "16px")
  .text("Simple D3 Bar Chart");
