import React from 'react';
import {Chart} from 'react-google-charts';


export default class TimeLine extends React.Component {
    state = {
        chartData: this.props.chartData
    }

  getDays = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

    checkAvailability = () => {
      //a function to find out the dates which do not lie in the busy date range of all the records. I couldnot find any utility regarding showing a vertical reference line in the google visualisation that's why i have added a small square at the top to demonstrate my logic
      const availableMonth = [9]; 
      const availableYear = [2019];
      const dateArray = [];
      // initialising the month and year arrays for storing
      let noOfDays = this.getDays(availableMonth, availableYear);
      for (let i = 1; i <= noOfDays; i++) {
        dateArray.push(i);
      }
      this.state.chartData.forEach(data => {
        var startingDate = new Date(data[2]).getDate();
        var endingDate = new Date(data[3]).getDate();
        for (let j = startingDate; j <= endingDate; j++) {
          delete dateArray[dateArray.indexOf(j)];
        }
      });
      dateArray.forEach(date => {
        if (date) {
          console.log(date);
          let cdata = [
            this.state.chartData[1][0],
            "available",
            new Date(`${availableMonth[0]}/${date - 1}/${availableYear[0]}`),
            new Date(`${availableMonth[0]}/${date}/${availableYear[0]}`),
          ];
          const { chartData } = this.state;
          chartData.push(cdata);
          this.setState({
            chartData: chartData,
          });
        }
      });
    };

    render(){
        return (
          <div>
          <Chart
  width={'90%'}
  height={'600px'}
  chartType="Timeline"
  loader={<div>Loading Chart</div>}
  data={this.state.chartData}
  options={{
    showRowNumber: true,
    colors: ['#FF5733','#46FF33']
  }}
  rootProps={{ 'data-testid': '1' }}
/>
<button className = "btn btn-success" onClick ={this.checkAvailability}> check availability </button>
          </div>
        )
    }
}