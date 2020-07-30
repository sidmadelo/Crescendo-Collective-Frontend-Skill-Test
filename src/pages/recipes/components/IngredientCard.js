import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent, 
    CardActions, 
    Typography,
    Collapse,
    Button,
    Chip,
    Box,
    Divider
} from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import PromoIcon from '@material-ui/icons/Loyalty';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    cardActionsStyle: {
        justifyContent: 'flex-end'
    },
    promoContainer: {
        backgroundColor: grey[50]
    }

}));



const RecipeCard = props => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const promo = props.specials.find( special => special.ingredientId === props.ingredient.uuid ) || null

    return (
        <Card className={classes.root}>
            <CardContent
            >
                <Typography noWrap variant="h5" color="textSecondary" component="h5">
                    {`${props.ingredient.amount} ${props.ingredient.measurement} ${props.ingredient.name}`}
                </Typography>
            </CardContent>
            
            {!promo ? null :
                <div>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent className={classes.promoContainer}>
                            <Box mb={2}>
                                <Chip
                                    icon={<PromoIcon />}
                                    size="small"
                                    label={promo.type}
                                    variant="outlined"
                                    color="secondary"
                                />
                            </Box>
                            <Box mb={2}>
                                <Typography variant="h5" component="h5">{promo.title}</Typography>
                            </Box>
                            <Typography paragraph>{promo.text}</Typography>
                        </CardContent>
                    </Collapse>
                    <Divider />

                    <CardActions className={classes.cardActionsStyle} disableSpacing>
                        <Button 
                            size="small" 
                            color="primary"
                            onClick={handleExpandClick}
                        >
                            {expanded ? 'Hide' : 'Show'} Promo
                        </Button>
                    </CardActions>
                </div>
            }

        </Card>
    );
};

export default RecipeCard;