import React, { Component } from 'react';
import { CircularProgress, Grid, Box} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import RecipeCard from './components/RecipeCard';
import api from '../../utils/api';

const useStyles = theme => ({
    root: {
       flexGrow: 1,
    },
});

class Recipes extends Component {

    state = {
        recipes: [],
        isLoading: true,
    }

    getRecipes = async () => {
        const { data } = await api.get('recipes');
        this.setState({
            recipes: data,
            isLoading: false
        })
    } 

    componentDidMount() {
        this.getRecipes();
    }

    render() {
        const { classes } = this.props;

        return(
            <Box p={2}>
                <Grid container className={classes.root} spacing={3}>
                    {this.state.isLoading ? <CircularProgress /> :
                        this.state.recipes.map( recipe => (
                            <Grid item key={recipe.uuid}>
                                <RecipeCard recipe={recipe}/>
                            </Grid>
                        )) 
                    }
                </Grid>
            </Box>
        )

    }
}

export default withStyles(useStyles)(Recipes)