/* Importing util libraries .*/
import React, { Component,useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { Container } from './styles';
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
let condutividadeEntrada;
let vazaoEntrada;
let temperaturaEntrada;
let pH;

export default class entrada extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressaoEntrada:0,  
            condutividadeEntrada:0,
            vazaoEntrada:0,
            temperaturaEntrada:0,
            pH:0,
            style:{
                custom_card:{
                    color:'white',
                    minWidth: 12,
                    borderRadius:'25px',
                    backgroundColor:'#009065',
                    border: '0',
                    boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.19);',
                },
                custom_title:{
                    fontSize: 14,
                    color:'white',
                    borderRadius:'25px',
                },
                custom_root:{
                    flexGrow: 1,
                },
                custom_center_item:{
                    textAlign:"center",
                    width:'18%',
                },
                custom_button:{
                    fontSize:'14px',
                    fontWeight:'bold'
                }
            }
        }
    }
    componentDidMount() {
        var me = this;
        // Setting the URL to create a WebSocket connection with the back-end server
        me.ws = new WebSocket(me.props.url);
    
        me.ws.onmessage = e => {
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
            [, variable] = dados[9].split(':');
            [, condutividadeEntrada] = dados[2].split(':');
            [, vazaoEntrada] = dados[8].split(':');
            [, temperaturaEntrada] = dados[5].split(':');
            [, pH] = dados[4].split(':');

            /* Getting the exact hour */
            [, hour, minutes, seconds] = dados[1].split(':');
            formated_hour=`${date}-${hour}:${minutes}:${seconds}`;
          
            formated_date = new Date(ano,mes-1,dia,hour,minutes,seconds);

            /*
                Creating a local variable that store the object that'll be sent to 
                the Data of this chart .
            */
            let obj = {x:formated_hour,y:parseInt(variable)};
            add=add+100;
            data_list.push(obj);
    
            /* Updating data .*/
            me.setState({
                pressaoEntrada:variable,
                condutividadeEntrada:parseInt(condutividadeEntrada),
                vazaoEntrada:vazaoEntrada,
                temperaturaEntrada:parseFloat(temperaturaEntrada).toFixed(1),
                pH:parseFloat(pH).toFixed(1),
            });
        };
    }
    componentWillUnmount() {
        var me = this;
        me.ws.close();
    }
    render() {
        var me = this;
        // console.log(this.state);
        return (
            <div>
                <Container>
                    <div style={me.state.style.custom_root}>
                        <div id="card_title">
                            <p>ENTRADA</p>
                        </div>
                        <Grid container spacing={0.5} direction="row" justify="center" alignItems="center" style={me.state.style.custom_card}>
                            <Grid style={me.state.style.custom_center_item} item xs={12} sm={2}>
                                <Typography id='card_content'component="h2">
                                    {me.state.pressaoEntrada}
                                </Typography>
                                <Typography>
                                    kgf/cm²
                                </Typography>
                                <Typography id='card_desc' variant="body2" component="p" color="textSecondary">
                                    <a href=" " style={me.state.style.custom_button}>Pressão</a>
                                </Typography>
                            </Grid>
                            <Grid style={me.state.style.custom_center_item} item xs={12} sm={2}>
                                <Typography id='card_content'component="h2">
                                {me.state.condutividadeEntrada}
                                </Typography>
                                <Typography>
                                    μS/cm
                                </Typography>
                                <Typography noWrap={true} id='card_desc' variant="body2" component="p" color="textSecondary"><a href=" "style={me.state.style.custom_button}>Condutividade</a></Typography>
                            </Grid>
                            <Grid style={me.state.style.custom_center_item} item xs={12} sm={2}>
                                <Typography id='card_content'component="h2">
                                {me.state.vazaoEntrada}

                                </Typography>
                                <Typography>
                                    m³/h
                                </Typography>
                                <Typography noWrap={true} id='card_desc' variant="body2" component="p" color="textSecondary">
                                    <a href=" " style={me.state.style.custom_button}>Vazão.</a>
                                </Typography>
                            </Grid>
                            <Grid style={me.state.style.custom_center_item} item xs={6} sm={2}>
                                <Typography id='card_content'component="h2">
                                {me.state.temperaturaEntrada}
                                </Typography>
                                <Typography>
                                    ºC
                                </Typography>
                                <Typography noWrap={true} id='card_desc' variant="body2" component="p" color="textSecondary"><a href=" " style={me.state.style.custom_button}>Temperatura</a></Typography>
                            </Grid>
                            <Grid style={me.state.style.custom_center_item} item xs={12} sm={2}>
                                <Typography id='card_content'component="h2">
                                {me.state.pH}
                                </Typography>
                                <Typography>
                                <br />
                                </Typography>
                                <Typography noWrap={true} id='card_desc' variant="body2" component="p" color="textSecondary">
                                    <a href=" " style={me.state.style.custom_button}>pH</a>  
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </div>
        );
    }
}
