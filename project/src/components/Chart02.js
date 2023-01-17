import React, { Component } from "react";
import Chart from "react-apexcharts";

class Chart02 extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      // 인구 변화량 - 막대 그래프
      optionsBarChart: {
          chart: {
              id: "stacked-bar",
              type: 'bar',
              toolbar: {
                  show: false
              },
              stacked: false,
              animations: {
                animateGradually: {
                  enabled: false,
                  delay: 150
              },
              }
          },
          plotOptions: {
            bar: {
              dataLabels: {
                position: 'top'
              }
            },
          },
          colors: ["#2D4A65", "#2D4A65", "#2D4A65", "#1871D9", ],
          xaxis: {
            categories: ['10.12.', '11.12.', '01.08.', '01.09.'],
            labels: {
              style: {
                colors: 'white',
                fontSize: '12px',
                fontFamily: 'Pretendard-Regular',
                fontWeight: 400,
              },
            },
            axisTicks: {
              show: false,
            },
        },
        yaxis: {
          labels: {
              show:false,
          }
        },
        fill: {
          opacity: 1, // bar opacity
        },
        grid: {
          show: false,
        },
        dataLabels: {
          enabled: true,
          offsetY: -25,
        },
        stroke: {
          show: false,
          curve: 'smooth',
          width: 3
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
        },
        markers: {
            show: false,
            hover: {
              strokeWidth: 3,
              size: 6
            }
        },
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
            },
        },
      },
      seriesBar: [
        {
            name: '개체수',
            data: [12, 10, 16, 18]
        }, 
      ]
    };
  }

  render() {
    return (
        <div className="text-black border-white">
            <Chart
            options={this.state.optionsBarChart}
            height='200px'
            series={this.state.seriesBar}
            type="bar"
            width={this.width}
            />
        </div>
    );
  }
}

export default Chart02;