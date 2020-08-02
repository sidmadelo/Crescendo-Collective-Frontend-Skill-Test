import React, { Component } from 'react';
import api from '../utils/api';

export const Context = React.createContext()

class Provider extends Component {
	state = {
		recipes: [],
		specials: [],
		recipe: {
			directions: [],
			ingredients: []
		},
        isLoading: true
	}

	render() {
		const actions = {

		    getRecipesFromApi: async () => {
		        const { data } = await api.get('recipes');
		        this.setState({
		            recipes: data,
		            isLoading: false
		        })

		        return data
		    },

		    createRecipeToApi: async ( recipe ) => {
		        const { data } = await api.post('recipes', { ...recipe });

		        return data;
		    },

	        getRecipeByIdFromApi: async (id) => {
		        const { data } = await api.get(`recipes/${id}`);
		        return this.setState({
		            recipe: data,
		            isLoading: false
		        })
		    },

		    deleteRecipeToApi: async (id) => {
		        await api.delete(`recipes/${id}`);
		        return this.setState({
		            isLoading: false
		        })
		    },

		    updateRecipeToApi: async (recipe) => {
		        await api.patch(`recipes/${recipe.uuid}`, { ...recipe });
		        return this.setState({
		            isLoading: false
		        })
		    },

		    getSpecialsFromApi: async () => {
		        const { data } = await api.get(`specials`)

		        return this.setState({
		            specials: data,
		            isLoading: false
		        })
		    },

		    addDirections: (data) => {
		    	let recipeCopy = JSON.parse(JSON.stringify(this.state.recipe))
		    	recipeCopy.directions.push(data)
			   	this.setState({
			      	recipe: recipeCopy 
			    }) 
		    }

		};

		return (
			<Context.Provider value={{
				state: this.state,
				actions: actions
			}}>
				{ this.props.children }
			</Context.Provider>
		)
	}
}

export const WithRecipesContext = Component => {
	return localProps => {
		return (
		    <Context.Consumer>
		        {(props) => {
		           return <Component {...props} {...localProps} />
		        }}
		    </Context.Consumer>
		)
	}
}

export default Provider