import * as React from 'react';
import * as d3 from 'd3';
import d3Wrap from 'react-d3-wrap'

const MyChart = d3Wrap({
    update (svg, data, options) {

        const chart = d3.select(svg)
            .append("text")
            .attr('x', 3)
            .attr('y', 40)
            .attr("font-size", "2em")
            .text("Hello D3!");

    }
});

export default class HelloD3 extends React.Component {
    render() {
        return (<MyChart data={null} width='400px' height='60px' options={ {color: '#ff0000'} }/>)
    }
}