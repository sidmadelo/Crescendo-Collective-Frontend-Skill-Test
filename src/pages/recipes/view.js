import React, { Component } from 'react';
import { 
    CircularProgress,
    Container,
    Card,
    CardContent,
    Typography,
    Divider,
    Grid,
    Box,
    Button
} from '@material-ui/core';
import PlusIcon from '@material-ui/icons/AddBox';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import { withRouter } from 'react-router';

import IngredientCard from './components/IngredientCard';
import CreateDialog from './components/CreateDirectionDialog';
import { WithRecipesContext } from '../../context/RecipeContext';

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
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    directionsContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    directionsButton: {
        backgroundColor: green[500],
        color: '#ffffff'
    }
});

class Recipes extends Component {
    state = {
        isLoading: true,
        isEdit: false,
        localRecipe: {},
        openCreateDirectionDialog: false
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        await this.props.actions.getSpecialsFromApi();
        await this.props.actions.getRecipeByIdFromApi(id);
        await this.setState({
            isLoading: false
        })
    }


    render() {
        const { classes, actions } = this.props;
        const { recipe, specials } = this.props.state

        const onEdit = () => {
            this.setState({
                isEdit: !this.state.isEdit
            })
        }

        const onDelete = async () => {
            await actions.deleteRecipeToApi( this.props.match.params.id )
            await this.props.history.push('/')
        }

        const onUpdate = async () => {
            await actions.updateRecipeToApi( recipe )
            await this.setState({
                isEdit: !this.state.isEdit
            })
        }

        const handleClickOpen = () => {
            this.setState({
                openCreateDirectionDialog: true
            });
        };

        const handleClose = () => {
            this.setState({
                openCreateDirectionDialog: false
            });
        };

        const ImageContainer = () => {
            return !recipe.images.medium ? null :
                <img
                    className={classes.imgStyle}
                    src={`${process.env.REACT_APP_API_URL}/${recipe.images.medium}`}
                    alt={recipe.images.medium}
                />
        }

        return(
            <Container className={classes.root}>
                {this.state.isLoading ? <CircularProgress/> :

                    <Card >
                        <Box p={2} className={classes.buttonContainer}>
                            <Box mx={2}>
                                <Button
                                    variant={this.state.isEdit ? 'outlined' : 'contained'}
                                    color="secondary"
                                    onClick={onEdit}
                                >
                                    {this.state.isEdit ? 'Cancel' : 'Edit'}
                                </Button>
                            </Box>
                            {!this.state.isEdit ? null : (
                                <div className={classes.buttonContainer}>
                                    <Box mr={2}>
                                        <Button
                                            variant="text"
                                            color="secondary"
                                            onClick={onDelete}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={onUpdate}
                                        >
                                            Save
                                        </Button>
                                </div>
                            )}
                        </Box>
                        <div className={classes.details}>
                            <CardContent className={classes.content}>
                                <div>
                                    <Typography component="h4" variant="h4">
                                        {recipe.title}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {recipe.description}
                                    </Typography>
                                </div>

                                <div>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        Servings: up to {recipe.servings} persons
                                    </Typography>

                                    <Typography variant="subtitle1" color="textSecondary">
                                        Prep Time: {recipe.prepTime} mins
                                    </Typography>

                                    <Typography variant="subtitle1" color="textSecondary">
                                        Cook Time: {recipe.cookTime} mins
                                    </Typography>
                                </div>

                            </CardContent>
                            <ImageContainer />
                            
                        </div>

                        <div className={classes.directionStyle}>
                            <div className={classes.directionsContainer}>
                                <Typography component="h4" variant="h4">
                                    Directions
                                </Typography>
                                {!this.state.isEdit ? null : (
                                        <Box mb={2}>
                                            <Button
                                                variant="contained"
                                                onClick={handleClickOpen}
                                                className={classes.directionsButton}
                                                startIcon={<PlusIcon />}
                                            >
                                                directions
                                            </Button>
                                        </Box>
                                    )
                                }
                            </div>
                            <Divider />

                            { recipe.directions.map( (direction, index) => (
                                <Box m={2} key={index}>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {index + 1}. {direction.instructions} { direction.optional ? '(optional)' : null}
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
                                { recipe.ingredients.map( (ingredient, index) => (
                                    <Grid xs={12} item key={ingredient.uuid}>
                                        <IngredientCard ingredient={ingredient} specials={specials} />
                                    </Grid>
                                )) }
                            </Grid>
                        </div>
                        <CreateDialog 
                            open={this.state.openCreateDirectionDialog}
                            handleClose={handleClose}
                        />
                    </Card>

                }
            </Container>
        )

    }
}

export default WithRecipesContext(withRouter(withStyles(useStyles)(Recipes)))