import React, { Component } from 'react';
import * as d3 from "d3";
import Input from "./input";

class BarChart extends Component {
    state = {
        dataArray: [
          {date: "2013-01", num: 53},
          {date: "2013-02", num: 165},
          {date: "2013-03", num: 269},
          {date: "2013-04", num: 344},
          {date: "2013-05", num: 376},
          {date: "2013-06", num: 410},
          {date: "2013-07", num: 421},
          {date: "2013-08", num: 405},
          {date: "2013-09", num: 376},
          {date: "2013-10", num: 359},
          {date: "2013-11", num: 392},
          {date: "2013-12", num: 433},
          {date: "2014-01", num: 455},
          {date: "2014-02", num: 478}
        ],
        inputValue: {
          date: "",
          num: ""
        }
    }
    componentDidMount() {
        this.drawChart();
    }
    componentDidUpdate() {
        this.drawChart();
    }
    
    // This function is called to draw bar chart
    drawChart = () => {   
        d3.selectAll("svg").remove();
        const margin = 60;
        const width = 1000;
        const height = 600;
    
        // initialize the canvas
        const canvas = d3.select("#svg")
                       .append("svg")
                       .attr("width", width)
                       .attr("height", height)
                       .append("g")
                           .attr("transform", "translate(" + margin + "," + margin + ")");
        
        // compute the minimum and maximum of the data(for axis range)
        const dataArray = this.state.dataArray;
        let max = dataArray[0].num;
        let min = dataArray[0].num;
        dataArray.forEach(function(d){
            max = max > d.num ? max : d.num;
            min = min < d.num ? min : d.num;
        });

        // create y axis
        const yScale = d3.scaleLinear()
                       .domain([min-20, max+20])
                       .range([height - 80, 0]);

        canvas.append("g")
              .call(d3.axisLeft(yScale));
    
        
        // create x axis
        const xScale = d3.scaleBand()
                       .domain(this.state.dataArray.map((d) => d.date))
                       .range([0, width - 80])
                       .padding(0.4)
    
        canvas.append("g")
              .attr("transform", "translate(0, 520)")
              .call(d3.axisBottom(xScale));
    
    
        // create bar according to the data
        canvas.selectAll("rect")
              .data(this.state.dataArray)
              .enter()
                  .append("rect")
                  .attr("x", (d) => xScale(d.date))
                  .attr("y", (d) => yScale(d.num))
                  .attr("height", (d) => height - yScale(d.num) - 80)
                  .attr("width", xScale.bandwidth());
        
        // create text for each bar
        canvas.selectAll("text1")
              .data(this.state.dataArray)
              .enter()
                  .append("text")
                  .text((d)=>d.num)
                  .attr("x", (d)=>xScale(d.date))
                  .attr("y", (d)=>yScale(d.num));
    
        // create the grid system
        canvas.append("g")
              .attr("class", "grid")
              .call(d3.axisLeft(yScale)
                      .tickSize(-width, 0, 0)
                      .tickFormat(""));
          
    }
    
    // handle event when the input area of date changes
    handleChangeDate = (event) => {
        let inputValue = this.state.inputValue;
        inputValue.date = event.target.value;
        this.setState({inputValue});
    }
    // handle event when the input area of number changes
    handleChangeNum = (event) => {
      let inputValue = this.state.inputValue;
      inputValue.num = event.target.value;
      this.setState({inputValue});
    }
    // handle event when the "Append" button is clicked
    handleAppend = () => {
      let inputValue = {
          date: this.state.inputValue.date,
          num: Number(this.state.inputValue.num)
      }
      // check if the input is valid
      if(!inputValue.num || !this.validDate(inputValue.date)){
        alert("Please enter a valid input!");
        return;
      }
      let dataArray = this.state.dataArray;
      dataArray.push(inputValue);
      this.setState({dataArray});   
    }
    
    // check if the date input is valid
    validDate = (date) => {
        if(date.length !== 7 || date.indexOf("-") !== 4) return false;
        if(!Number(date.substring(0,4)) || !Number(date.substring(5))) return false;
        return true;
    }
    render() { 
        return (
        <React.Fragment>
            <div id="svg"></div>
            <Input onAppend={this.handleAppend} onChangeDate={this.handleChangeDate} onChangeNum={this.handleChangeNum} />
        </React.Fragment>
        );
    }
}
 
export default BarChart;