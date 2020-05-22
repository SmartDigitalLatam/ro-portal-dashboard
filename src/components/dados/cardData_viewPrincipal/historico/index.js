import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

//
import Typography from '@material-ui/core/Typography';
import { Container } from './styles';

const useStyles = makeStyles(theme => ({
    card: {
        color:'white',
        minWidth: 12,
        borderRadius:'25px',
        backgroundColor:'#009065',
        width:'90%',
        marginLeft:'2%',
        border: '0',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.2)'
    },
    card2: {
        color:'#009065',
        borderRadius:'25px',
        backgroundColor:'#ffffff',
        height:'100%',
        width:'100%',
        padding:'2px 0px',
        textAlign:'center',
        fontSize:'35px',
        fontWeight:'bold',
    },
    title: {
        fontSize: 14,
        borderRadius:'25px',
    },
    Divider:{
        backgroundColor:'red',
        border: 'solid 2px red',
    },
    root: {
        flexGrow: 1,
    },
    center_item:{
        textAlign:"center",
        
    },
    container: {
        display: 'grid',
        justifyItems:'center',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridGap: theme.spacing(3),
    },
}));

export default function FullWidthGrid() {
  const classes = useStyles();

  // aqui que será feito o trigger das mensagens
  return (
    <Container>
        <div className={classes.root}>
            <div id="card_title">
                <p>Últimos alarmes</p>
            </div>
            <Grid container spacing={2} direction="row" justify="center" alignItems="center" className={classes.card}>
                <Grid className={classes.center_item} item >
                    <div className={classes.card2}>
                        <Grid container spacing={3}>
                            {/* <PerfectScrollbar> */}
                            {/* <PerfectScrollbar onScrollY={container => console.log(`scrolled to: ${container.scrollTop}.`)}> */}
                                <Grid item xs={12}> 
                                    <Typography id='card_title'component="h2">
                                        26/12/2019
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}> 
                                    <Typography id='card_desc' variant="body2" component="p" color="textSecondary">
                                        Vazão normalizada do permeado baixa
                                    </Typography>
                                </Grid>
                                <Grid style={{ padding: 5 }} item xs={12}> 
                                    <Typography id='card_title'component="h2">
                                        27/12/2019
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}> 
                                    <Typography id='card_desc' variant="body2" component="p" color="textSecondary">
                                        Testando responsividade
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}> 
                                    <Typography id='card_title'component="h2">
                                        29/12/2019
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}> 
                                    <Typography id='card_desc' variant="body2" component="p" color="textSecondary">
                                        Testando responsividadeeee
                                    </Typography>
                                </Grid>
                            {/* </PerfectScrollbar>                                 */}
                            {/* </PerfectScrollbar> */}
                        </Grid>
                    </div>
                </Grid>
                {/* </div>  */}
            </Grid>
        </div>
    </Container>
  );
}