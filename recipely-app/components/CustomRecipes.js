import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View
} from 'react-native';
import { Card } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import Button from '../components/CustomButton';

const CustomRecipeList = ({navigation, customRecipes, idToken, onCustomRecipesChange}) => {

  onCustomLearnMore = ({ingredients, title, directions}) => {
    console.log('custom learn more... ', ingredients);
    //TODO: change hardcoded directions to parse database directions
    // directions = 'mix this.stir that.';
    // directions = directions.split('.');
    navigation.navigate('CustomDetails', {ingredients, title, directions, idToken});
  };

  onCustomDeletePress = (recipe) => {
    console.log('deleting........', customRecipes);
    onCustomRecipesChange(customRecipes.filter(otherRecipe => otherRecipe.id !== recipe.id));
    fetch(`https://fireant-recipely.herokuapp.com/api/users/custom_recipes/${recipe.id}`, {
      method: 'DELETE',
      headers: {
        'x-access-token': `Bearer ${idToken}`,
      },
    });
  };

  return (
    <ScrollView>
      {customRecipes.map(recipe => {
        console.log ('mapping custom recipe ...', recipe);
        return (
          <Card
            key={recipe.id}
            title={<Text>{recipe.title}</Text>}
            image={{uri: "http://donaldandcathy.typepad.com/.a/6a00e55288aaf8883301675f83fbb9970b-800wi" }}
            >
            <View style={styles.buttonContainer}>
              <Button
                title='Details'
                icon={{name: 'explore'}}
                buttonStyle={{marginLeft: 0}}
                onPress={() => this.onCustomLearnMore(recipe)}
                />
                <Button
                  title='Delete'
                  icon={{name: 'delete'}}
                  buttonStyle={{marginRight: 0}}
                  onPress={() => this.onCustomDeletePress(recipe)}
                  />
            </View>
          </Card>
        );
      })
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

export default CustomRecipeList;
