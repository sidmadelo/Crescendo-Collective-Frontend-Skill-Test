import React, { Component } from 'react';
import { 
    CircularProgress,
    Container,
    Card,
    CardContent,
    Typography,
    Divider,
    Grid,
    Box
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';

import IngredientCard from './components/IngredientCard';
import api from '../../utils/api';


const useStyles = theme => ({
    root: {
       padding: 50
    },
    details: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    content: {
        flex: '1 0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    imgStyle: {
        width: 400,
        padding: 16
    },

    directionStyle: {
        padding: 16,
    },
    ingredientContainer: {
        marginTop: 10,
        flexGrow: 1,
    }
});

class Recipes extends Component {
    state = {
        recipe: {},
        isLoading: true,
        specials: []
    }

    getRecipeById = async () => {
        const id = this.props.match.params.id;

        const { data } = await api.get(`recipes/${id}`);
        return this.setState({
            recipe: data,
        })
    }

    getSpecials = async () => {
        const { data } = await api.get(`specials`)

        return this.setState({
            specials: data,
        })
    } 

    async componentDidMount() {
        await this.getRecipeById();
        await this.getSpecials();

        this.setState({
            isLoading: false,
        })
    }

    render() {
        const { classes } = this.props;

        return(
            <Container className={classes.root}>
                {this.state.isLoading ? <CircularProgress/> :

                    <Card >
                        <div className={classes.details}>
                            <CardContent className={classes.content}>
                                <div>
                                    <Typography component="h4" variant="h4">
                                        {this.state.recipe.title}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {this.state.recipe.description}
                                    </Typography>
                                </div>

                                <div>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        Servings: up to {this.state.recipe.servings} persons
                                    </Typography>

                                    <Typography variant="subtitle1" color="textSecondary">
                                        Prep Time: {this.state.recipe.prepTime} mins
                                    </Typography>

                                    <Typography variant="subtitle1" color="textSecondary">
                                        Cook Time: {this.state.recipe.cookTime} mins
                                    </Typography>
                                </div>

                            </CardContent>
                            <img
                                className={classes.imgStyle}
                                src={`${process.env.REACT_APP_API_URL}/${this.state.recipe.images.medium}`}
                                alt={this.state.recipe.images.medium}
                            />
                        </div>

                        <div className={classes.directionStyle}>
                            <Typography component="h4" variant="h4">
                                Directions
                            </Typography>
                            <Divider />

                            { this.state.recipe.directions.map( (direction, index) => (
                                <Box m={2} key={index}>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {index + 1}. {direction.instructions}
                                    </Typography>
                                </Box>

                            )) }
                        </div>

                        <div className={classes.directionStyle}>
                            <Typography component="h4" variant="h4">
                                Indgredients
                            </Typography>
                            <Divider />

                            <Grid container className={classes.ingredientContainer}  spacing={3}>
                                { this.state.recipe.ingredients.map( (ingredient, index) => (
                                    <Grid xs={12} item key={ingredient.uuid}>
                                        <IngredientCard ingredient={ingredient} specials={this.state.specials} />
                                    </Grid>
                                )) }
                            </Grid>
                        </div>

                    </Card>

                }
            </Container>
        )

    }
}

export default withRouter(withStyles(useStyles)(Recipes))