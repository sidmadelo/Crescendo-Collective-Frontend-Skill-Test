import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import RecipesListPage from './pages/recipes';
import RecipesViewPage from './pages/recipes/view';
import Appbar from './components/Appbar';
import RecipeProvider from './context/RecipeContext';

function App() {
    return (
        <RecipeProvider>
            <Router>
                <Appbar />
                <div>
                    <Switch>
                        <Route exact path="/">
                            <RecipesListPage />
                        </Route>
                        <Route exact path="/recipes/:id">
                            <RecipesViewPage />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </RecipeProvider>
    );
}

export default App;
