import React, { useState } from 'react';

import { 
    Button,
    Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	TextField
} from '@material-ui/core';

import api from '../utils/api';
import { WithRecipesContext } from '../context/RecipeContext';

const CreateForm = ({ open, handleClose, actions }) => {

	const [values, setValues] = useState({ 
		title: '',
		description: '',
		servings: 0,
		prepTime: 0,
		cookTime: 0,
		ingredients: [],
		directions: [],
		images: {} 
	})

	const handleInputChange = e => {
        const {name, value} = e.target
        setValues({...values, [name]: value})
    }

    const createRecipe = async () => {
    	const { title ,description ,servings ,prepTime , cookTime  } = values

        if(!title || !description || !servings || !prepTime || !cookTime) return

        await actions.createRecipeToApi( values );
        await actions.getRecipesFromApi();
        await handleClose();
        await setValues({ 
			title: '',
			description: '',
			servings: 0,
			prepTime: 0,
			cookTime: 0,
			ingredients: [],
			directions: [],
			images: {} 
		})
    }

    return (
    	<div>
	        <Dialog
		        open={open}
		        onClose={handleClose}
		    >
		        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
		        <DialogContent>
		          	<TextField 
	                    name='title'
	                    label='Title'
	                    onChange={handleInputChange}
	                    value={values.title}
                    />
                    <TextField 
	                    name='description'
	                    label='Description'
	                    onChange={handleInputChange}
	                    value={values.description}
                    />
                    <TextField 
	                    name='servings'
	                    label='Servings'
	                    onChange={handleInputChange}
	                    value={values.servings}
                    />
                    <TextField 
	                    name='prepTime'
	                    label='Prep Time'
	                    onChange={handleInputChange}
	                    value={values.prepTime}
                    />
                    <TextField 
	                    name='cookTime'
	                    label='Cook Time'
	                    onChange={handleInputChange}
	                    value={values.cookTime}
                    />
		        </DialogContent>
		        <DialogActions>
		          	<Button onClick={handleClose} color="secondary" autoFocus>
		            	Cancel
		          	</Button>
        	        <Button variant="contained" onClick={createRecipe} color="primary" >
		            	Create
		          	</Button>
		        </DialogActions>
	      	</Dialog>
    	</div>
    );
}

export default WithRecipesContext(CreateForm)