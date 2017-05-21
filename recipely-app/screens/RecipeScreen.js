import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import RecipeList from '../components/RecipeList';
import CustomRecipeList from '../components/CustomRecipes';

class RecipeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation, screenProps } = this.props;
    //console.log(this.props.navigation, 'props');


    return (
      <View style={styles.container}>
        <CustomRecipeList
          navigation={navigation}
          customRecipes={screenProps.customRecipes}
          idToken={screenProps.idToken}
          onCustomRecipesChange={screenProps.onCustomRecipesChange}
        />
        <RecipeList
          navigation={navigation}
          recipes={screenProps.recipes}
          notes={screenProps.notes}
          idToken={screenProps.idToken}
          onRecipesChange={screenProps.onRecipesChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RecipeScreen;



/*
{screenProps.customRecipes.length !==0
           ? <View>
              <CustomRecipes
                navigation={navigation}
                recipes={screenProps.customRecipes}
                idToken={screenProps.idToken}
                onCustomRecipesChange={screenProps.onCustomRecipesChange}
              />
              <RecipeList
                navigation={navigation}
                recipes={screenProps.recipes}
                notes={screenProps.notes}
                idToken={screenProps.idToken}
                onRecipesChange={screenProps.onRecipesChange}
              />
            </View>
            :
*/













