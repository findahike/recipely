// TODO: RecipeList.js and ResultList.js share a lot of code. Maybe refactor to
// use higher order components.
import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
} from 'react-native';
import { Card } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import Button from '../components/CustomButton';

// Navigation prop needs to be passed down because it does not get passed down
// child components.
const ResultList = ({
  navigation,
  recipes,
  savedRecipes,
  idToken,
  query,
  onRecipesChange,
  onSearchChange,
  onUserRecipeChange,
  userRecipes
}) => {
  onLearnMore = (recipe) => {
    // When user presses on "Details" button, navigate them to a detail screen.
    // Pass down props that can be acessed using this.props.navigation.state.params
    navigation.navigate('SearchDetail', { ...recipe });
  }

  handleSaveRecipeButton = async (recipe) => {
    const id = recipe.recipe_id;
    const isSaved = savedRecipes.find(recipe => recipe.f2f_id === id);
    // Only add recipe if it has not been saved yet
    if (!isSaved) {
      // Remove recipe from search so user knows it was saved
      removeRecipeFromSearch(recipe);
      // Making get request to get details of recipe so that it can be added to database
      let recipeObj = await
        fetch(`https://fireant-recipely.herokuapp.com/api/recipes/${id}`)
          .then(res => res.json())
          .then(result => result.recipe);
      recipeObj = {
        ...recipeObj,
        f2f_id: recipe.recipe_id,
        thumbnail_url: recipe.image_url,
      };
      // Update client's list of recipes. We wait until we get the ingredients to add it.
      onRecipesChange([ ...savedRecipes, recipeObj]);
      // Make the post request to add recipe to database
      fetch('https://fireant-recipely.herokuapp.com/api/users/recipes/', {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `Bearer ${idToken}`,
        },
        method: 'POST',
        body: JSON.stringify(recipeObj),
      });
    }
  };

  removeRecipeFromSearch = (recipe) => {
    const newResults = recipes.filter(otherRecipe => otherRecipe.recipe_id !== recipe.recipe_id);
    onSearchChange(query, newResults);
  };

  mapStateToProps = () => {
    if (userRecipes.length > 0) {
      onUserRecipeChange(userRecipes);
      onSearchChange(query);
    } else {
      onUserRecipeChange([]);
      onSearchChange([]);
    }
  }
  return (
    <ScrollView>
      { userRecipes !== undefined ? recipes.map(recipe => {
        if (recipe.hasOwnProperty('id') && recipe.title.length > 0) {
          console.log('user recipe :' , recipe);
          return (
            <Card
              key={recipe.id}
              title={recipe.title}
              // image={{ uri: recipe.image_url }}
            >
              <Text style={styles.publisherText}>{recipe.publisher}</Text>
              <View style={styles.buttonContainer}>
                <Button
                  title='Details'
                  icon={{name: 'explore'}}
                  buttonStyle={{marginLeft: 0}}
                  onPress={() => this.onLearnMore(recipe)}
                />

                <Button
                  title='Add'
                  icon={{name: 'add'}}
                  buttonStyle={{marginRight: 0}}
                  onPress={() => this.handleSaveRecipeButton(recipe)}
                />
              </View>
            </Card>
          );
        } else {
          return (
            <Card
              key={recipe.recipe_id}
              title={<Text>{recipe.title}</Text>}
              image={{ uri: recipe.image_url }}
            >
              <Text style={styles.publisherText}>{recipe.publisher}</Text>
              <View style={styles.buttonContainer}>
                <Button
                  title='Details'
                  icon={{name: 'explore'}}
                  buttonStyle={{marginLeft: 0}}
                  onPress={() => this.onLearnMore(recipe)}
                />

                <Button
                  title='Add'
                  icon={{name: 'add'}}
                  buttonStyle={{marginRight: 0}}
                  onPress={() => this.handleSaveRecipeButton(recipe)}
                />
              </View>
            </Card>
          );
        }
      }) : <Text>Nothing</Text>
    }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  publisherText: {
    marginBottom: 10,
  },
});

export default ResultList;
