import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View
} from 'react-native';
import ResultList from '../components/ResultList';

class SearchResultScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { searchResults, onSearchChange, idToken, onUserRecipeChange } = this.props.screenProps;
    const { query } = this.props.navigation.state.params;
    var userRecipes;
    var apiData;
    if (!searchResults.hasOwnProperty(query)) {
      fetch(`https://fireant-recipely.herokuapp.com/api/recipes?q=${query}`)
        .then(res => res.json())
        .then(res => apiData = res.recipes)
        .then(apiResults => {
          // fetch user recipes
          apiData = apiResults;
          return fetch(`https://fireant-recipely.herokuapp.com/api/users/custom_recipes/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': `Bearer ${idToken}`
            }
          })
        })
        .then(res => res.json())
        .then(res => userRecipes = res)
        .then(results => {
          apiData.push(userRecipes.pop());
          onSearchChange(query, apiData);
        });
    }
  }

  render() {
    const {
      searchResults,
      idToken,
      onRecipesChange,
      recipes: savedRecipes,
      onSearchChange,
      onUserRecipeChange,
      userRecipes
    } = this.props.screenProps;
    const { query } = this.props.navigation.state.params;
    const { navigation } = this.props;

    let recipes = [];
    if (searchResults.hasOwnProperty(query)) {
      recipes = searchResults[query];
    }

    return (
      <View style={styles.container}>
        { recipes.length !== 0
          ? <ResultList
              navigation={navigation}
              recipes={recipes}
              savedRecipes={savedRecipes}
              idToken={idToken}
              query={query}
              onRecipesChange={onRecipesChange}
              onSearchChange={onSearchChange}
              onUserRecipeChange={onUserRecipeChange}
              userRecipes={userRecipes}
            />
          : <View style={styles.loadingContainer}>
              <Text>Loading recipes</Text>
              <ActivityIndicator size="large" />
            </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchResultScreen;
