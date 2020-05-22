// This is a backup file
/* Importing util libraries .*/
import React,{useState,Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Zoom from '@material-ui/core/Zoom';
import Typography from '@material-ui/core/Typography';

/* Importing style from local folder .*/
import { Container } from './styles';

/* Local variables that'll build the data that comes from back-end .*/
let var1,var2,var3,var4,var5,var6,var7,var8,var9,var10,var11,var12;
let hour;
let minutes;
let seconds;
let formated_hour;
let date;
let page_load=0;

/* Local style */
const useStyles = makeStyles(theme => ({
  card: {
      color:'white',
      minWidth: 12,
      borderRadius:'25px',
      backgroundColor:'#009065',
      border: '0',
      boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.19);',

  },
  title: {
      fontSize: 14,
      color:'white',
      borderRadius:'25px',
  },
  root: {
      flexGrow: 1,
  },
  center_item:{
      textAlign:"center",
      width:'18%',
  },
  btn:{
      fontSize:'14px',
      fontWeight:'bold'
  }
}));

export default class entrada extends Component {
  //classes = useStyles();
  render() {
    return (
      <Container>
        <div className={classes.root}>
          <div id="card_title">
              <p>ENTRADA</p>
          </div>
          <Grid container spacing={1} direction="row" justify="center" alignItems="center" className={classes.card}>
            <Grid className={classes.center_item} item xs={12} sm={2}>
                <Typography id='card_content'component="h2">
                    {state.teste}
                </Typography>
                <Typography className={classes.pos}>
                    kgf/cm²
                </Typography>
                <Typography id='card_desc' variant="body2" component="p" color="textSecondary">
                    <a href=" " className={classes.btn}>Pressão</a>
                </Typography>
                {/* <Typography>
                    <p>{JSON.stringify  (dados)}</p> 
                </Typography> */}
            </Grid>
            <Grid className={classes.center_item} item xs={12} sm={2}>
                <Typography id='card_content'component="h2">
                    476
                </Typography>
                <Typography className={classes.pos}>
                    μS/cm
                </Typography>
                <ClickAwayListener onClickAway={handleTooltipClose}>
                    <Tooltip TransitionComponent={Zoom} 
                        PopperProps={{
                        disablePortal: true,
                        }}
                        onClose={handleTooltipClose}
                        open={open}
                        title="Condutividade">
                        <Typography onClick={handleTooltipOpen} noWrap={true} id='card_desc' variant="body2" component="p" color="textSecondary"><a href=" "className={classes.btn}>Condutividade</a></Typography>
                    </Tooltip>
                </ClickAwayListener>
            </Grid>
            <Grid className={classes.center_item} item xs={12} sm={2}>
                <Typography id='card_content'component="h2">
                    13.33
                </Typography>
                <Typography className={classes.pos}>
                    m³/h
                </Typography>
                <Typography noWrap={true} id='card_desc' variant="body2" component="p" color="textSecondary">
                    <a href=" " className={classes.btn}>Vazão.</a>
                </Typography>
            </Grid>
            <Grid className={classes.center_item} item xs={6} sm={2}>
                <Typography id='card_content'component="h2">
                    25
                </Typography>
                <Typography className={classes.pos}>
                    ºC
                </Typography>
                <ClickAwayListener onClickAway={handleTooltipClose}>
                    <Tooltip TransitionComponent={Zoom} 
                        PopperProps={{
                        disablePortal: true,
                        }}
                        onClose={handleTooltipClose}
                        open={open}
                        title="Temperatura">
                        <Typography onClick={handleTooltipOpen} noWrap={true} id='card_desc' variant="body2" component="p" color="textSecondary"><a href=" " className={classes.btn}>Temperatura</a></Typography>
                    </Tooltip>
                </ClickAwayListener>
            </Grid>
            <Grid className={classes.center_item} item xs={12} sm={2}>
                <Typography id='card_content'component="h2">
                    7.01
                </Typography>
                <Typography className={classes.pos}>
                <br />
                </Typography>
                <Typography noWrap={true} id='card_desc' variant="body2" component="p" color="textSecondary">
                    <a href=" " className={classes.btn}>pH</a>  
                </Typography>
            </Grid>
          </Grid>
        </div>
      </Container>
    );
  }
}
