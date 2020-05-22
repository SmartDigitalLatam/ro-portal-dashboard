import React, { Component } from "react";
import axios from "axios";
import GlobalStyle from "./styles/global";
import Header from "./components/header";

//Rotas .
import { BrowserRouter } from "react-router-dom";

/* Local IP to connect with the WebSocket server .*/
// const ip = "10.170.0.196";
// const url = `ws://${ip}:4001`;

// Back<>Front-end connection - in this case the back is deployed in app services
const url = `wss://backend-osmose.azurewebsites.net/`


export default class src extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resultado_dados: []
    };

    //Rotas .
    axios.get("/").then(resultado => {
      this.setState({
        resultado_dados: resultado.data
      });
      //console.log(resultado.data)
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <GlobalStyle />
          <Header url={url} />
        </div>
      </BrowserRouter>
    );
  }
}
