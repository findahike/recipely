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
import { Card, List, ListItem } from 'react-native-elements';
import IngredientList from '../components/IngredientList';
import Button from '../components/CustomButton';

class GroceryListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groceryList: []
    };
  }

  componentDidMount() {
    const { idToken } = this.props.screenProps;
    fetch(`https://fireant-recipely.herokuapp.com/api/users/lists`, {
      headers: {
        'x-access-token': `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res =>
       res.json()
    )
    .then(result => {
      var groceryList = result.map((recipe) => {
        return recipe.ingredients.substring(2, recipe.ingredients.length - 2);
      });
      this.setState({groceryList: groceryList.join('","').split('","')});
    });
  }

  onDeletePress = (index) => {
    const { idToken } = this.props.screenProps;

    this.state.groceryList.splice(index, 1);
    this.setState({groceryList: this.state.groceryList});

    fetch(`https://fireant-recipely.herokuapp.com/api/users/lists/grocerylist`, {
      method: 'DELETE',
      headers: {
        'x-access-token': `Bearer ${idToken}`,
      },
    })
    .then((result) => {
      fetch(`https://fireant-recipely.herokuapp.com/api/users/lists`, {
        method: 'POST',
        headers: {
          'x-access-token': `Bearer ${idToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({listName: 'grocerylist', ingredients: this.state.groceryList})
      });
    });
  }


  render() {
    const ingredients = this.state.groceryList;
    var length = 0;
    return (
      <ScrollView>
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
                  onPress={() => this.onDeletePress(i)}
                />
                </View>
              );
            })
          }
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    flexWrap: 'wrap'
  },
  ingredientEntry: {
    flexDirection: 'column',
    maxWidth: 200,
    flexGrow: 1
  }
});

export default GroceryListScreen;