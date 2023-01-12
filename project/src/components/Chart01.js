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
                    donut: {
                        labels: {
                            show: false,
                            name: {
                                show: true
                            },
                            value: {
                                show: true
                            }
                        },
                        size: '40%', // 구멍 크기
                    },
                    expandOnClick: false
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
            colors: ["#1871D9", "#2D4A65"],
            tooltip: {
                shared: true,
                intersect: false,
                y: {
                  formatter: function (y) {
                    if (typeof y !== "undefined") {
                      return y.toFixed(0) + "가구";
                    }
                    return y;
                  }
                }
            },
            labels: ['단독주택', '아파트', '연립주택', '다세대 주택', '비주거용 건물 내 주택']
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