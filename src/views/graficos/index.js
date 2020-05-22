import React from 'react';
import Linear_gaph_grid from '../../components/dados/graphs_viewGraficos/linear_graph_grid';
// import AddItemPopup  from '../../components/Button/Button';
// import { Container } from './styles';

export default function config(url) {
  return (
    <> 
      <Linear_gaph_grid url={url.data}/>    
    </>
    
  );
}
