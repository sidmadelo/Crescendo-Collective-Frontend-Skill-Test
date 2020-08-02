import React, { Component } from 'react';
import { CircularProgress, Grid, Box, Button} from '@material-ui/core';
import PlusIcon from '@material-ui/icons/AddBox';

import CreateDialog from './components/CreateRecipeDialog';
import RecipeCard from './components/RecipeCard';
import { WithRecipesContext } from '../../context/RecipeContext';

class Recipes extends Component {

    state = {
        open: false
    }

    componentDidMount() {
        this.props.actions.getRecipesFromApi();
    }

    render() {
        const { isLoading, recipes } = this.props.state

        const handleClickOpen = () => {
            this.setState({
                open: true
            });
        };

        const handleClose = () => {
            this.setState({
                open: false
            });
        };

        return(
            <Box p={2}>
                <CreateDialog 
                    open={this.state.open}
                    handleClose={handleClose}
                />
                <Box py={2}>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<PlusIcon />}
                        onClick={handleClickOpen}
                    >
                        recipe
                    </Button>
                </Box>

                <Grid container spacing={3}>
                    {isLoading ? <CircularProgress /> :
                        recipes.map( recipe => (
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


export default WithRecipesContext(Recipes)