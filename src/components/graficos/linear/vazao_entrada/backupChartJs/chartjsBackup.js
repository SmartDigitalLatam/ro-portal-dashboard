import React from "react";
import { render } from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import Chart from "./chart";

let variable;
let hour;
let minutes;
let seconds;
let formated_hour;
let date;

const styles = theme => ({
  "chart-container": {
    height: 400
  }
});

class App extends React.Component {
  state = {
    lineChartData: {
      labels: [],
      datasets: [
        {
          type: "line",
          label: "Vazão de entrada",
          backgroundColor: "rgba(0, 0, 0, 0)",
          borderColor: this.props.theme.palette.primary.main,
          pointBackgroundColor: this.props.theme.palette.secondary.main,
          pointBorderColor: this.props.theme.palette.secondary.main,
          borderWidth: "2",
          lineTension: 0.45,
          data: []
        }
      ]
    },
    lineChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        enabled: true
      },
      scales: {
        xAxes: [
          {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 5
            }
          }
        ]
      }
    }
  };

  componentDidMount() {
    const subscribe = {
      IotData: [
        {
          name: "temperature"
        }
      ]
    };


    // Passando o servidor que o WEBSOCKET irá consultar
    this.ws = new WebSocket(this.props.url);

    this.ws.onopen = () => {
      this.ws.send(JSON.stringify(subscribe));

    };

    this.ws.onmessage = e => {
      const value = JSON.parse(e.data);

      var lista_teste=value.IotData.data
      var lista_converted=''
      
      lista_teste.map(function(item,i){
        if(item!==32 && item!==0){
          lista_converted=lista_converted+String.fromCharCode(item)
        }
      })


      let dados = lista_converted.split(',');
      /* Getting the date */
      [, date] = dados[0].split(':');
      /* Filtering variables */
      [, variable] = dados[6].split(':');
      /* Getting the exact hour */
      [, hour, minutes, seconds] = dados[1].split(':');
      formated_hour=`${date}-${hour}:${minutes}:${seconds}`;
      

      const oldBtcDataSet = this.state.lineChartData.datasets[0];
      const newBtcDataSet = { ...oldBtcDataSet };
      newBtcDataSet.data.push(variable);
      
      const newChartData = {
        ...this.state.lineChartData,
        datasets: [newBtcDataSet],
        labels: this.state.lineChartData.labels.concat(
          formated_hour
        )
      };
      this.setState({ lineChartData: newChartData });
    };
  }

  componentWillUnmount() {
    this.ws.close();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes["chart-container"]}>
        <Chart
          data={this.state.lineChartData}
          options={this.state.lineChartOptions}
        />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);