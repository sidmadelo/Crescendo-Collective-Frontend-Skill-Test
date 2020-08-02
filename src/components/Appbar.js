import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { 
	AppBar,
    Toolbar,
    IconButton,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
    appBarColor: {
        color: grey[50],
    },
    title: {
        flexGrow: 1,
    }
}));

export default () => {
    const classes = useStyles();

    return (
    	<div>
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
    	</div>
    );
}
