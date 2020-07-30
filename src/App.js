import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import RecipesListPage from './pages/recipes';
import RecipesViewPage from './pages/recipes/view';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import HomeIcon from '@material-ui/icons/Home';


const useStyles = makeStyles((theme) => ({
    appBarColor: {
        color: grey[50],
    },
    title: {
        flexGrow: 1,
    },
}));

function App() {
    const classes = useStyles();

    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <IconButton 
                        className={classes.appBarColor} 
                        edge="start"
                        component={Link}
                        to="/"
                    >
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Crescendo Collective - Frontend Skill Test
                    </Typography>
                </Toolbar>
            </AppBar>

            <div>
                <Switch>
                    <Route exact path="/">
                        <RecipesListPage />
                    </Route>
                    <Route exact path="/recipes/:id">
                        <RecipesViewPage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
