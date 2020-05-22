import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

//style .
import { Container } from './styles';

//Ícones .
import DashboardIcon from '@material-ui/icons/Dashboard';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import BarChartIcon from '@material-ui/icons/BarChart';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

//Rotas .
import Principal from '../../views/principal_menu';
import Graficos from '../../views/graficos';
import Config from '../../views/config';
import Historico from '../../views/historico_alarmes';

import {Switch,Route,Redirect} from 'react-router-dom'
const drawerWidth = 220;

/* Local IP to connect with the WebSocket server .*/
// const ip = '192.168.0.40';
// const url = `ws://${ip}:4001`;


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  toolbar: theme.mixins.toolbar,
}));



export default function ClippedDrawer(url) {
  const classes = useStyles();
  return (
    <Container>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar id='header_menu'>
            <Typography variant="h6" noWrap>
              Buckman
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <List>
            <ListItem button component="a" href='/principal'> 
              <ListItemIcon>
                  <DashboardIcon />
              </ListItemIcon>
              <ListItemText>
                  Dashboard
              </ListItemText>
            </ListItem>

            <ListItem button component="a" href='/graficos'>
              <ListItemIcon>
                  <BarChartIcon />
              </ListItemIcon>
              <ListItemText>
                  Gráficos
              </ListItemText>
            </ListItem>

            <ListItem button component="a" href='/historico'>
              <ListItemIcon>
                  <ReportProblemIcon />
              </ListItemIcon>
              <ListItemText>
                  Histórico de alarmes
              </ListItemText>
            </ListItem>
            {/* <ListItem button component="a" href='/config'>
              <ListItemIcon>
                  <SettingsIcon />
              </ListItemIcon>
              <ListItemText>
                  Startup
              </ListItemText>
            </ListItem> */}
          </List>
          {/* <List>
            <ListItem button component="a" href='/sair'>
                <ListItemIcon>
                    <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText>
                    Sair
                </ListItemText>
            </ListItem>
          </List> */}
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Redirect exact from='/' to='/principal'/>
            <Route path='/principal' render={(props) => <Principal data={url.url}/>}/>
            <Route path='/historico' component={Historico}/>
            <Route path='/graficos' render={(props) => <Graficos data={url.url}/>}/>
            {/* <Route path='/config' component={Config}/> */}
          </Switch>
        </main>
      </div>
    </Container>
  );
}
