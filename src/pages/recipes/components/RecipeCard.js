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

    return (
        <Card className={classes.root}>
            <CardHeader
                className={classes.header}
                component={Link}
                to={`recipes/${props.recipe.uuid}`}
                title={props.recipe.title}
            />

            <CardMedia
                component={Link}
                to={`recipes/${props.recipe.uuid}`}
                className={classes.media}
                image={`http://localhost:3001/${props.recipe.images.medium}`}
            />

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