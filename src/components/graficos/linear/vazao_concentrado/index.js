import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import axios from 'axios';


class vazao_concentrado extends Component{
    constructor(props){
        super(props);
        this.state = {
            chartData:{}
        }
    }

    componentDidMount(){
        this.getChartData();
    }

    
    getChartData(){
        axios.get("/person").then(res => {
       
            const value = res.data;
            
            let novo_array_date = [];
            let novo_array_concentrated_flow = [];
           
            // pega o valor especifico dentro da aarray de obejtos e gera um anova array de objetos
           value.map(function(i){
                novo_array_date.push({
                    "Date": i.Date,
                });
            })

            value.map(function(i){
                novo_array_concentrated_flow.push({
                    "ConcentratedFlow": i.ConcentratedFlow,
                });
            })
        
            //pega apenas o valor da array de objeto transformando em uma array
            let ConcentratedFlowArray1 = novo_array_concentrated_flow.map(a => a.ConcentratedFlow);
            let DateArray1 = novo_array_date.map(a => a.Date);
        
            //converte a array de string em nnumeros
            let ConcentratedFlowArray2 = ConcentratedFlowArray1.map(Number);
            let DateArray2 = DateArray1;

            let ConcentratedFlowArray3 = ConcentratedFlowArray2.reverse();
            let DateArray3 = DateArray2.reverse();
        
            this.setState({
                chartData:{
                    labels: DateArray3,
                    datasets: [
                        {
                            label: "Vazão Concentrado (m³/h)",
                            data: ConcentratedFlowArray3,
                            lineTension: 0.1,
                            fill:false,
                            backgroundColor: 'rgba(216,216,216,0.4)',
                            borderColor: 'rgba(75,192,192,1)',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(75,192,192,1)',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                        }
                    ]
                }
            });
        });
    }



    render(){
        return(
            <div className = "vazao_concentrado">
                
                <Line
                    data = {this.state.chartData}
                    width = {1200}
                    height = {400}
                    options={{
                        title:{
                            display: true,
                            text: 'Vazão Concentrado (m³/h)',
                            fontSize: 30
                        },
                        legend:{
                            display:false,
                            position: 'top',
                        },
                        scales:{
                            yAxes:[{
                                ticks: {
                                    beginAtZero: false,
                                }
                            }]
                        }
                    }}
                 />
                
            </div>
        )
    }
}

export default vazao_concentrado;