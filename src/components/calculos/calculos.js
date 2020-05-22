import React  from 'react';

const vazaoPermeadoI = 60.02;
const vazaoConcentradoI = 18.73;
const pressaoEntradaI = 10.04;
const pressaoConcentradoI = 8.78;
const pressaoPermeadoI = 7.70;
const condutividadeEntradaI = 88;
const condutividadePermeadoI = 2;
const temperaturaEntradaI = 25;


const vazaoPermeadoZero = 60.94;
const vazaoConcentradoZero = 20.74;
const pressaoEntrada = 8.76;
const pressaoConcentradoZero = 7.68;
const pressaoPermeadoZero = 6.14;
const condutividadePermeadoZero = 2;
const temperaturaEntradaZero = 25;
const pressureNetDrivingZero = 2.02514;
const correcaoTemperaturaZero = 1;
const concentracaoMediaCalculadaEntradaZero = 69.087149;
const TDSCalculatedFeedZero = 37.603419;
const ip = '10.170.20.94';


function funcTDSCalculatedFeed(condutividadeEntradaI) {
    if (condutividadeEntradaI == 0) { //TODO; Confirmar variavel ()
        let TDSCalculatedFeed;
        return TDSCalculatedFeed = 0;
    }
    if (condutividadeEntradaI > 0 && condutividadeEntradaI <= 7630) {
        let TDSCalculatedFeed = 7.7013840097 * Math.pow(10, -20) * Math.exp(Math.pow(-90.475562243 - Math.log(condutividadeEntradaI), 2) / 188.88442227);
        return TDSCalculatedFeed;
    }
    if (condutividadeEntradaI > 7630) {
        let TDSCalculatedFeed = 8.0090966 * Math.pow(10, -11) * Math.exp(Math.pow(-50.645805186 - Math.log(condutividadeEntradaI), 2) / 112.483950289);
        return TDSCalculatedFeed;

    }
}
let TDSCalculatedFeed = funcTDSCalculatedFeed(condutividadeEntradaI);
// console.log(`Condutividade de Entrada: ${TDSCalculatedFeed}`);

function funcTDSFeed(condutividadeEntradaI) {
    let TDSFeedI = condutividadeEntradaI * 0.7;
    return TDSFeedI;
}
let TDSFeedI = funcTDSFeed(condutividadeEntradaI);
// console.log(`TDS feed: ${TDSFeedI}`);

function funcTDSCalculatedPermeado(condutividadePermeadoI) {
    if (condutividadePermeadoI == 0) { //TODO; Confirmar variavel ()
        return TDSCalculatedPermeado = 0;
    }
    if (condutividadePermeadoI > 0 && condutividadePermeadoI <= 7630) {
        let TDSCalculatedPermeado = 7.7013840097 * Math.pow(10, -20) * Math.exp(Math.pow(-90.475562243 - Math.log(condutividadePermeadoI), 2) / 188.88442227);
        return TDSCalculatedPermeado;
    }
    if (condutividadePermeadoI > 7630) {
        let TDSCalculatedPermeado = 8.0090966 * Math.pow(10, -11) * Math.exp(Math.pow(-50.645805186 - Math.log(condutividadePermeadoI), 2) / 112.483950289);
        return TDSCalculatedPermeado;
    }
}

let TDSCalculatedPermeado = funcTDSCalculatedPermeado(condutividadePermeadoI);
// console.log(`TDS Calculated Permeado: ${TDSCalculatedPermeado}`);

function funcTDSPermeado(condutividadePermeadoI) {
    let TDSPermeado = condutividadePermeadoI * 0.7;
    return TDSPermeado;
}

let TDSPermeado = funcTDSPermeado(condutividadePermeadoI);
// console.log(`TDS Permeado: ${TDSPermeado}`);

function funcVazaoEntrada(vazaoPermeadoZero, vazaoConcentradoZero) {
    let vazaoEntrada = vazaoPermeadoZero + vazaoConcentradoZero;
    return vazaoEntrada;
}

let vazaoEntradaI = funcVazaoEntrada(vazaoPermeadoI, vazaoConcentradoI);
// console.log(`Vazão de Entrada: ${vazaoEntradaI}`);

function funcPressaoDiferencial(pressaoEntradaI, pressaoConcentradoI) {

    if (pressaoEntradaI > 0) {
        let pressaoDiferencialI = pressaoEntradaI - pressaoConcentradoI; //TODO; confiarmar variaveis (x)
        return pressaoDiferencialI
    }
    if (pressaoEntradaI <= 0) {
        let pressaoDiferencialI = 0;
        return pressaoDiferencialI
    }
}

let pressaoDiferencialI = funcPressaoDiferencial(pressaoEntradaI, pressaoConcentradoI);
// console.log(`Pressão Diferencial: ${pressaoDiferencialI}`);

function funcCorrecaoTemperatura(temperaturaEntradaI) {
    if (temperaturaEntradaI <= 0) {
        let correcaoTemperatura = 0;
        return correcaoTemperatura;
    } else {
        let correcaoTemperatura = Math.exp(2640 * ((1 / 298.15) - 1 / (temperaturaEntradaI + 273.15)));
        return correcaoTemperatura;
    }
}

let correcaoTemperatura = funcCorrecaoTemperatura(temperaturaEntradaI);
// console.log(`Correção do fator de Temperatura: ${correcaoTemperatura}`);

function funcConcentracaoMediaCalculadaEntrada(TDSCalculatedFeed, vazaoPermeadoI, condutividadeEntradaI, vazaoEntradaI, TDSFeedI) {
    if (vazaoPermeadoI > 0) {
        if (condutividadeEntradaI > 0) {
            let concentracaoMediaCalculadaEntrada = TDSCalculatedFeed * Math.log(1 / (1 - vazaoPermeadoI / vazaoEntradaI)) / (vazaoPermeadoI / vazaoEntradaI);
            return concentracaoMediaCalculadaEntrada;
            if (condutividadeEntradaI <= 0) {
                let concentracaoMediaCalculadaEntrada = TDSFeedI * Math.log(1 / (1 - vazaoPermeadoI / vazaoEntradaI)) / (vazaoPermeadoI / vazaoEntradaI);
                return concentracaoMediaCalculadaEntrada;
            }
        }
        if (vazaoPermeadoI <= 0) {
            let concentracaoMediaCalculadaEntrada;
            return concentracaoMediaCalculadaEntrada = 0;
        }
    }
}
let concentracaoMediaCalculadaEntrada = funcConcentracaoMediaCalculadaEntrada(TDSCalculatedFeed, vazaoPermeadoI, condutividadeEntradaI, vazaoEntradaI, TDSFeedI);
// console.log(`Concentração Média de Entrada Calculada: ${concentracaoMediaCalculadaEntrada}`);

function funcPressaoOsmoticaEntrada(pressaoEntradaI, temperaturaEntradaI, concentracaoMediaCalculadaEntrada) {
    if (pressaoEntradaI > 0 && temperaturaEntradaI > 0) {
        let pressaoOsmoticaEntradaI = 0.0385 * concentracaoMediaCalculadaEntrada * (temperaturaEntradaI + 273.15) / ((1000 - (concentracaoMediaCalculadaEntrada / 1000)) * 14.25);
        return pressaoOsmoticaEntradaI;

        //TODO; confirmar se tem o .015 (x)
    }

    if (pressaoEntradaI <= 0 || temperaturaEntradaI <= 0) {
        let pressaoOsmoticaEntradaI = 0
        return pressaoOsmoticaEntradaI
    }
}

let pressaoOsmoticaEntradaI = funcPressaoOsmoticaEntrada(pressaoEntradaI, temperaturaEntradaI, concentracaoMediaCalculadaEntrada);
// console.log(`Pressão Osmotica de Entrada: ${pressaoOsmoticaEntradaI}`);

function funcPressaoOsmoticaPermeado(pressaoEntradaI, condutividadePermeadoI, TDSCalculatedPermeado, TDSPermeado) {

    if (pressaoEntradaI <= 0) {
        let pressaoOsmoticaPermeado;
        return pressaoOsmoticaPermeado = 0;
    }
    if (pressaoEntradaI > 0 && condutividadePermeadoI > 0 && temperaturaEntradaI > 0) {
        let pressaoOsmoticaPermeado = ((0.0385 * TDSCalculatedPermeado * (temperaturaEntradaI + 273.15)) / (1000 - (TDSCalculatedPermeado / 1000))) / 14.25;
        return pressaoOsmoticaPermeado;

    }
    if (pressaoEntradaI > 0 && condutividadePermeadoI > 0 && temperaturaEntradaI <= 0) {
        let pressaoOsmoticaPermeado;
        return pressaoOsmoticaPermeado = 0;
    }

    if (pressaoEntradaI > 0 && condutividadePermeadoI <= 0) {
        if (TDSPermeado <= 0 || temperaturaEntradaI <= 0) {
            let pressaoOsmoticaPermeado;
            return pressaoOsmoticaPermeado = 0;
        } else {
            let pressaoOsmoticaPermeado = ((0.0385 * TDSPermeado * (temperaturaEntradaI + 273.15)) / (1000 - (TDSPermeado / 1000))) / 14.25;
            return pressaoOsmoticaPermeado;
        }

    }
}

let pressaoOsmoticaPermeado = funcPressaoOsmoticaPermeado(pressaoEntradaI, condutividadePermeadoI, TDSCalculatedPermeado, TDSPermeado);
// console.log(`Pressâo Osmotica do Permeado: ${pressaoOsmoticaPermeado}`);

function funcPressureNetDriving(pressaoEntradaI, pressaoDiferencialI, pressaoOsmoticaEntradaI, pressaoPermeadoI, pressaoOsmoticaPermeado) {
    let pressureNetDrivingI

    if (pressaoEntradaI > 0) {
        return pressureNetDrivingI = pressaoEntradaI - (pressaoDiferencialI / 2) - pressaoOsmoticaEntradaI - pressaoPermeadoI + pressaoOsmoticaPermeado; //TODO; confirmar variavel (x)
        
    }
    if (pressaoEntradaI <= 0) {
        return pressureNetDrivingI = 0;
    }
}
let pressureNetDrivingI = funcPressureNetDriving(pressaoEntradaI, pressaoDiferencialI, pressaoOsmoticaEntradaI, pressaoPermeadoI, pressaoOsmoticaPermeado);
// console.log(`Pressure Net Driving: ${pressureNetDrivingI}`);

function funcVazaoNormalizadaPermeado(vazaoPermeadoI, pressureNetDrivingZero, pressureNetDrivingI, correcaoTemperatura, correcaoTemperaturaZero) {
    let vazaoNormalizadaPermeado
    if (vazaoPermeadoI > 0) {
        return vazaoNormalizadaPermeado = (pressureNetDrivingZero * correcaoTemperaturaZero) / (pressureNetDrivingI * correcaoTemperatura) * vazaoPermeadoI;
      
    }
    if (vazaoPermeadoI < 0) {
        return vazaoNormalizadaPermeado = 0;
    }
}

let vazaoNormalizadaPermeado = funcVazaoNormalizadaPermeado(vazaoPermeadoI, pressureNetDrivingZero, pressureNetDrivingI, correcaoTemperatura, correcaoTemperaturaZero);
// console.log(`Vazão Normalizada do Permeado:${vazaoNormalizadaPermeado}`);
 
function funcPassagemNormalizadaDeSalDoPermeado(vazaoPermeadoI,condutividadeEntradaI,TDSCalculatedPermeado, correcaoTemperaturaZero, concentracaoMediaCalculadaEntradaZero, vazaoPermeadoZero, TDSCalculatedFeedZero, concentracaoMediaCalculadaEntrada, TDSPermeado) {
    let PassagemNormalizadaDeSalDoPermeado;
    if (vazaoPermeadoI <= 0) {
        return PassagemNormalizadaDeSalDoPermeado = 0;
    }
    if (vazaoPermeadoI > 0 && condutividadeEntradaI > 0) {
        return PassagemNormalizadaDeSalDoPermeado = TDSCalculatedPermeado * vazaoPermeadoI * correcaoTemperaturaZero * concentracaoMediaCalculadaEntradaZero / (vazaoPermeadoZero * correcaoTemperatura * concentracaoMediaCalculadaEntrada * TDSCalculatedFeedZero) * 100;
    }
    if (vazaoPermeadoI > 0 && condutividadeEntradaI <= 0 && TDSFeedI > 0) {
        return PassagemNormalizadaDeSalDoPermeado = TDSPermeado * vazaoPermeadoI * correcaoTemperaturaZero * concentracaoMediaCalculadaEntradaZero / (vazaoPermeadoZero * correcaoTemperatura * concentracaoMediaCalculadaEntrada * TDSCalculatedFeedZero) * 100;

    }
    if (vazaoPermeadoI > 0 && condutividadeEntradaI <= 0 && TDSFeedI <= 0) {
        return PassagemNormalizadaDeSalDoPermeado = 0;

    }
}

let PassagemNormalizadaDeSalDoPermeado = funcPassagemNormalizadaDeSalDoPermeado(vazaoPermeadoI,condutividadeEntradaI,TDSCalculatedPermeado, correcaoTemperaturaZero, concentracaoMediaCalculadaEntradaZero, vazaoPermeadoZero, TDSCalculatedFeedZero,concentracaoMediaCalculadaEntrada, TDSPermeado);
// console.log(`Passagem Normalizada de Sal: ${PassagemNormalizadaDeSalDoPermeado}`);

function funcRejeicaoNormalizadaDeSalDoPermeado(vazaoPermeadoI, condutividadeEntradaI, PassagemNormalizadaDeSalDoPermeado, TDSFeedI) {
    let RejeicaoNormalizadaDeSalDoPermeado
    if (vazaoPermeadoI <= 0) {
        return RejeicaoNormalizadaDeSalDoPermeado = 0; 
    }
    if (vazaoPermeadoI > 0 && condutividadeEntradaI > 0) {
        return RejeicaoNormalizadaDeSalDoPermeado = 100 - PassagemNormalizadaDeSalDoPermeado; 

    }
    if (vazaoPermeadoI > 0 && condutividadeEntradaI <= 0 && TDSFeedI > 0) {
        return RejeicaoNormalizadaDeSalDoPermeado = 100 - PassagemNormalizadaDeSalDoPermeado; 

    }
    if (vazaoPermeadoI > 0 && condutividadeEntradaI <= 0 && TDSFeedI <= 0) {
        return RejeicaoNormalizadaDeSalDoPermeado = 0; 

    }
}

let RejeicaoNormalizadaDeSalDoPermeado = funcRejeicaoNormalizadaDeSalDoPermeado(vazaoPermeadoI, condutividadeEntradaI, PassagemNormalizadaDeSalDoPermeado, TDSFeedI);
// console.log(`Reijeção Normalizada de Sal do Permeado: ${RejeicaoNormalizadaDeSalDoPermeado}`);

export {funcConcentracaoMediaCalculadaEntrada, funcCorrecaoTemperatura, funcPassagemNormalizadaDeSalDoPermeado, funcPressaoDiferencial, funcPressaoOsmoticaEntrada, funcPressaoOsmoticaPermeado,
funcPressureNetDriving, funcRejeicaoNormalizadaDeSalDoPermeado, funcTDSCalculatedFeed, funcTDSCalculatedPermeado, funcTDSFeed, funcTDSPermeado, funcVazaoEntrada, funcVazaoNormalizadaPermeado};