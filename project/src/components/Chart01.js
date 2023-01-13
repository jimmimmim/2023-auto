import React, { Component } from "react";
import Chart from "react-apexcharts";

class Chart01 extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
        // 도넛 그래프 
        optionsDonutChart: {
            chart: {
                // fontFamily: 'Noto Sans KR',
            },
            plotOptions: {
                pie: {
                    startAngle: -90,
                    endAngle: 90,
                    offsetY: 10,
                    donut: {
                        labels: {
                            show: false,
                            name: {
                                show: true
                            },
                            value: {
                                show: true
                            },
                        },
                        size: '45%', // 구멍 크기
                    },
                    expandOnClick: false,
                }
            },
            dataLabels: {
                enabled: false,
            },
            legend: {
                show: false,
                position: 'bottom',
                horizontalAlign: 'left',
                fontSize: '10px',
                markers:{
                    width: 10,
                    height: 10,
                }
            },
            stroke: {
                show: false,
                width: 1,
            },
            colors: ["#1871D9", "#2D4A65"],
            tooltip: {
                shared: true,
                intersect: false,
                y: {
                  formatter: function (y) {
                    if (typeof y !== "undefined") {
                      return y.toFixed(0) + "개";
                    }
                    return y;
                  }
                }
            },
            labels: ['장애물', '기타']
          },
          seriesDonut: [2253, 587],    
    };
  }

  render() {
    return (
        <div className="pb-3 text-white" style={{backgroundColor: "#1F2834"}}>
            <Chart
            options={this.state.optionsDonutChart}
            height={this.height}
            series={this.state.seriesDonut}
            type="donut"
            width={this.width}
            />
        </div>
    );
  }
}

export default Chart01;