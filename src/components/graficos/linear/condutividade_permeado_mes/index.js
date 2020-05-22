/* Util libraries .*/
import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';

/* Variables to buildup the time that the chart'll update .*/
var data = [];
var data_list = [];

/* Local variables that're used to build the data structure .*/
let variable;
let hour;
let minutes;
let seconds;
let formated_hour;
let date;
let dia,mes,ano,formated_date;
let add=0;

// function resetData(){
//   // Alternatively, you can also reset the data at certain intervals to prevent creating a huge series .
//   data = data.slice(data.length - 10, data.length);
// }

export default class condutividade_permeado_mes extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
      series: [{
        data: data_list.slice(),
        name:'Valor' // Here goes the name that'll appear when u hover the marker .
      }],
      options: {
        chart: {
          id: 'realtime',
          height: 250,
          type: 'line',
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000 // The speed that the chart'll connect 2 lines .
            }
          },
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: {
            show: false,
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
        },
        title: {
          text: 'Condutividade do Permeado Mensal',
          align: 'center'
        },
        markers: {
          size: 0
        },
        xaxis: {
          type: 'category', // This type is a non-numeric so we can put everytype of data .
          range: 4000, // Here is the range of the X axis ...  so 100 = 100 values in the X axis .
          title:{
            text:'',
          },
          labels:{
            show: true,
          },
          categories:{
            offsetX:10
          }
        },
        yaxis: {
          max: 700, // Here goes the max value for the Y axis .
          min: 300,
          range:500,
          title:{
            text:'μS/cm',
          }
        },
        legend: {
          show: true,
        },
      },
    };
  }
  componentDidMount() {
    /* Function that keeps the chart updating after every 10 seconds .*/
    window.setInterval(() => {
      if(formated_date!==0){
        if(data.length>0){
          ApexCharts.exec('realtime', 'updateSeries', [{
            data: data_list
          }]);
        }
      }
    }, 3000);
    
    // Setting the URL to create a WebSocket connection with the back-end server .
    this.ws = new WebSocket(this.props.data);

    this.ws.onmessage = e => {
      /* Building the data structure that were text formated .*/
      const value = JSON.parse(e.data);
      var lista_teste=value.IotData.data;
      var lista_converted='';

      /* Uncrypting the data that comes from raspberry/plc .*/
      lista_teste.map(function(item,i){
        if(item!==32 && item!==0){
          lista_converted=lista_converted+String.fromCharCode(item);
        }
      });
      let dados = lista_converted.split(',');

      /* Getting the date */
      [, date] = dados[0].split(':');
      [dia,mes,ano]=date.split('/');
      /* Filtering variables */
      [, variable] = dados[3].split(':');
      /* Getting the exact hour */
      [, hour, minutes, seconds] = dados[1].split(':');
      formated_hour=`${date}-${hour}:${minutes}:${seconds}`;
      
      formated_date = `${dia}/${mes} ${hour}:${minutes}:${seconds}`;

      /*
       Creating a local variable that store the object that'll be sent to 
       the Data of this chart .
      */
      let obj = {x:formated_date,y:parseFloat(variable)};
      add=add+100;
      data_list.push(obj);

      /* Updating chart .*/
      this.setState({
        series:[{
          data:data_list.slice(),
        }]
      });
    };
  }
  componentWillUnmount() {
    this.ws.close();
  }

  /* Rendering the component .*/
  render() {
    return (
      <div>
        <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
      </div>
    );
  }
}
