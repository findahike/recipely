import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
// import GroceryList from '../components/GroceryList';
import { Card, List, ListItem } from 'react-native-elements';
import IngredientList from '../components/IngredientList';
import Button from '../components/CustomButton';

class GroceryListScreen extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   // ingredients: this.props.,
    //   // allIngredients: []
    // };



    // onDeletePress = (ingredient) => {
    //   // Remove grocery list from user's grocery list
    //   this.props.screenProps.onNotesChange(
    //     this.props.screenProps.notes.filter(otherNote => otherNote.id !== note.id)
    //   );
    //   // Show notes that are associated with this recipe except for the deleted one
    //   this.setState({
    //     ingredients: this.state.ingredients.filter(otherNote => otherNote.id !== note.id)
    //   });
    //   // TODO: remove grocery list by id from database
    //   const { idToken } = this.props.navigation.state.params;
    //   fetch(`https://jellyfiish-recipely.herokuapp.com/api/notes/${note.id}`, {
    //     method: 'DELETE',
    //     headers: {
    //       'x-access-token': `Bearer ${idToken}`,
    //     },
    //   });
    // };

  }

  // TODO: fetch the grocery list from the database and assign to a state variable
  // componentDidMount() {
  //   fetch(`https://jellyfiish-recipely.herokuapp.com/api/grocerylist`, {
  //     method: 'GET',
  //     headers: {
  //       'x-access-token': `Bearer ${idToken}`,
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ text: this.state.text }),
  //   });
  // }

  // const recipes = this.props.screenProps.recipes[0].ingredients;
  //   console.log('rendering grocery list screen!!!!! ', recipes);
  //   return (
  //     recipes[0].ingredients.map((ingredient) => {
  //       return (
  //         <View style={styles.container}>
  //           ingredient
  //           <Button
  //             title="Remove"
  //             icon={{name: 'remove-circle-outline'}}
  //             buttonStyle={{marginRight: 0, height: 36, paddingHorizontal: 8}}
  //             // onPress={() => this.onRemovePress(i)}
  //           />
  //         </View>
  //       );
  //     })
  //   );
  render() {
    // TODO: populate with grocery list ingredients from database
    const ingredients = ['1','asdfadsfa','1252352rewfdsv'];
    var length = 0;
    return (
      <View>
        <Card title="Grocery List">
          { ingredients.map((item, i) => {
            length++;
              return (
                <View
                  key={length}
                  style={styles.rowContainer}
                >
                <View style={styles.ingredientEntry}>
                  <Text>{item}</Text>
                </View>
                <Button
                  title="Remove"
                  icon={{name: 'remove-circle-outline'}}
                  buttonStyle={{marginRight: 0, height: 36, paddingHorizontal: 8}}
                />
                </View>
              );
            })
          }
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  ingredientEntry: {
    flexDirection: 'column',
  }
});

export default GroceryListScreen;