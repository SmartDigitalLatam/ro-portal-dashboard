import styled from 'styled-components';

export const Container = styled.div`
    #teste_card_style{
        //color:#009078;
        color:white;
        text-align:center;
    }
    #inside_card{;
        border-style:dotted dashed solid double; 
        border-color:coral;
    }
    #card_desc{
        font-size:14px;
        font-weight: bold;
        color:black;
    }
    #card_desc a{
        color:#404040;
        text-decoration:none;
    }
    #card_title {
        border-top-right-radius:15px;
        border-top-left-radius:15px;
    }
    #card_title p {
        font-size: 18px;
        text-align:center;
        font-weight: bold;
        color:#009078;
        border-top-right-radius:15px;
        border-top-left-radius:15px;
    }
    #card_content{
        font-size:22px;
        //color:#009078;
        color:white;
        font-weight: bold;
    }
    .grid_content{
        display:grid;
        justify-items: center;
    }
`;