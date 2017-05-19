import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
// import GroceryList from '../components/GroceryList';
import IngredientList from '../components/IngredientList';

class GroceryListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: this.props.navigation.state.params.ingredients,
      allIngredients: []
    };

    this.addIngredients = () => {
      if(this.state.allIngredeints.length === 0) {
        this.setState({allIngredients: this.state.ingredients});
      } else {
        this.setState({allIngredients: this.state.allIngredients.concat(this.state.ingredients)});
      }
    };

    // onDeletePress = (ingredient) => {
    // // Remove note from user's list of notes
    // this.props.screenProps.onNotesChange(
    //   this.props.screenProps.notes.filter(otherNote => otherNote.id !== note.id)
    // );
    // // Show notes that are associated with this recipe except for the deleted one
    // this.setState({
    //   ingredients: this.state.ingredients.filter(otherNote => otherNote.id !== note.id)
    // });
    // // Remove note from database
    // const { idToken } = this.props.navigation.state.params;
    // fetch(`https://jellyfiish-recipely.herokuapp.com/api/notes/${note.id}`, {
    //   method: 'DELETE',
    //   headers: {
    //     'x-access-token': `Bearer ${idToken}`,
    //   },
    // });
  // };
  }

  render() {

    return (
      <View style={styles.container}>
        { screenProps.recipes.length !== 0
          ? <IngredientList ingredients={this.state.allIngredients}
            />
          : <View>
              <Text>You have no ingredients.</Text>
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
});

export default GroceryListScreen;