import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
    Box,
    Card,
    CardHeader, 
    CardMedia, 
    CardContent, 
    CardActions, 
    Chip,
    Typography,
} from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';

import GroupIcon from '@material-ui/icons/Group';
import SpeedIcon from '@material-ui/icons/Speed';
import FireplaceIcon from '@material-ui/icons/FireplaceOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 300,
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    expand: {
        marginLeft: 'auto',
    },
    header: {
        color: grey[800],
        textDecoration: 'none',
    }
}));


const RecipeCard = props => {
    const classes = useStyles();

    const ImageContainer = () => {
        return !props.recipe.images.medium ? null :
            <CardMedia
                component={Link}
                to={`recipes/${props.recipe.uuid}`}
                className={classes.media}
                image={`${process.env.REACT_APP_API_URL}/${props.recipe.images.medium}`}
            />
        }

    return (
        <Card className={classes.root}>
            <CardHeader
                className={classes.header}
                component={Link}
                to={`recipes/${props.recipe.uuid}`}
                title={props.recipe.title}
            />

            <ImageContainer />

            <CardContent>
                <Typography noWrap variant="body2" color="textSecondary" component="p">
                    { props.recipe.description }
                </Typography>
            </CardContent>
            <CardActions disableSpacing>

                <Box m={1}>
                    <Chip
                        variant="outlined"
                        color="secondary"
                        icon={<SpeedIcon />}
                        label={`${props.recipe.prepTime} mins`}
                    />
                </Box>

                <Box m={1}>
                    <Chip
                        variant="outlined"
                        color="secondary"
                        icon={<FireplaceIcon />}
                        label={`${props.recipe.cookTime} mins`}
                    />
                </Box>

                <Box m={1}>
                    <Chip
                        variant="outlined"
                        color="secondary"
                        icon={<GroupIcon />}
                        label={props.recipe.servings}
                    />
                </Box>
            </CardActions>
        </Card>
    );
};

export default RecipeCard;