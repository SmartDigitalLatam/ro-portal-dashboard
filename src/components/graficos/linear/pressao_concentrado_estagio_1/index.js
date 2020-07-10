import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import axios from 'axios';


class pressao_concentrado_estagio_1 extends Component{
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
        axios.get("https://ro-back-graph.azurewebsites.net/person").then(res => {
    
            //pegando valor do api - uri - localhost
            const value = res.data;
        
            // pega o valor especifico dentro da aarray de obejtos e gera um anova array de objetos
            let novo_array_pressao_concentrado_estag_1 = [];
            let novo_array_date = [];

            value.map(function(i){
                novo_array_date.push({
                    "Date": i.Date,
                   
                });
            })

            value.map(function(i){
                novo_array_pressao_concentrado_estag_1.push({
            
                    "PressureConcentradStageOne": i.PressureConcentradStageOne,
                });
            })
        
           //pega apenas o valor da array de objeto transformando em uma array
           let PressureConcentradStageOneArray1 = novo_array_pressao_concentrado_estag_1.map(a => a.PressureConcentradStageOne);
           let DateArray1 = novo_array_date.map(a => a.Date);
       
           //converte a array de string em nnumeros
           let PressureConcentradStageOneArray2 = PressureConcentradStageOneArray1.map(Number);
           let DateArray2 = DateArray1;

           let PressureConcentradStageOneArray3 = PressureConcentradStageOneArray2.reverse();
           let DateArray3 = DateArray2.reverse();    
        
            //-----------------------------------------------__________--------------------------------------   
                    
            this.setState({
                chartData:{
                    labels: DateArray3,
                    datasets: [
                        {
                            label: "Pressão Concentrado Estágio 1 (kgf/cm²)",
                            data: PressureConcentradStageOneArray3,
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
            <div className = "pressao_concentrado_estagio_1">
                
                <Line
                    data = {this.state.chartData}
                    width = {1200}
                    height = {400}
                    options={{
                        title:{
                            display: true,
                            text: 'Pressão Concentrado Estágio 1 (kgf/cm²)',
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

export default pressao_concentrado_estagio_1;