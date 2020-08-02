import React, { useState } from 'react';

import { 
    Button,
    Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Checkbox,
	FormControlLabel
} from '@material-ui/core';

import { Context as RecipeContext } from '../../../context/RecipeContext';

const CreateForm = ({ open, handleClose, actions }) => {

	const [values, setValues] = useState({ 
		instructions: '',
		optional: false,
	})

	const handleInputChange = e => {
        const {name, value} = e.target
        setValues({...values, [name]: value})
    }

    const createRecipe = async () => {
    	const { instructions } = values
        if(!instructions) return
        await actions.addDirections( values );
        await handleClose();

        await setValues({ 
			instructions: '',
			optional: false,
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
	                    name='instructions'
	                    label='Instructions'
	                    onChange={handleInputChange}
	                    value={values.instructions}
                    />
                    <FormControlLabel
			            control={
			            	<Checkbox
			                    name='optional'
			                    label='Optional'
			                    value={values.optional}
						        onChange={handleInputChange}
						    />
			            }
			            label="Optional"
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

const RecipesWithContext = (localProps) => (
    <RecipeContext.Consumer>
        {(props) => {
           return <CreateForm {...props} {...localProps}/>
        }}
    </RecipeContext.Consumer>
)

export default RecipesWithContext