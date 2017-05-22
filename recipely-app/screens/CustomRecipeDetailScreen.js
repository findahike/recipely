import Expo, { WebBrowser } from 'expo';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import Popup from 'react-native-popup';
import { Card, Icon } from 'react-native-elements';
import IngredientList from '../components/IngredientList';
import { MaterialIcons } from '@expo/vector-icons';
import Button from '../components/CustomButton';

class CustomRecipeDetailScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  handlePressButtonDirections = () => {

  };

  // Navigate to grocery list
  onGroceryPress = (ingredients) => {
    this.popup.confirm({
      content: 'Are you sure?',
      ok: {
        callback: () => {
          const { idToken } = this.props.navigation.state.params;
          fetch('https://fireant-recipely.herokuapp.com/api/users/lists', {
            method: 'POST',
            headers: {
              'x-access-token': `Bearer ${idToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({listName: 'grocerylist', ingredients: ingredients})
          });
        }
      }
    });
  }

  render() {
    const { title, thumbnail_url, image_url, customIngredients, directions } = this.props.navigation.state.params;
    return (
      <ScrollView>
        <Card
          title={<Text>{title}</Text>}
          titleStyle={styles.titleStyle}
          image={{uri: "http://donaldandcathy.typepad.com/.a/6a00e55288aaf8883301675f83fbb9970b-800wi" }}
        >
          <View>
            <Text style={styles.ingredientText}>Ingredients</Text>
            { customIngredients
              ? <View>
                  <IngredientList ingredients={customIngredients}
                  />
                </View>
              : <View>
                  <Text>Loading ingredients</Text>
                  <ActivityIndicator size="large" />
                </View>
            }
          </View>
          <View>
            <Text style={styles.ingredientText}>Directions</Text>
            {
              directions.map((direction, i) => {
                return (
                  <Text key={i}>{`\u2022 ${direction}`}</Text>
                );
              })
            }
          </View>
          <View style={styles.buttonMargins}>
            <Button
              title='Add to Grocery List'
              onPress={
                () => this.onGroceryPress(customIngredients)
              }
            />
          </View>
        </Card>
        <Popup ref={popup => this.popup = popup } isOverlay={true} isOverlayClickClose={true}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 16,
  },
  publisherText: {
    fontSize: 16,
    marginBottom: 10
  },
  ingredientText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonMargins: {
    marginTop: 10,
    marginBottom: 10,
  },
  notesTitleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#474747',
  },
  notesTitleContainer: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteTextStyle: {
    fontSize: 18,
    color: '#474747'
  },
});

export default CustomRecipeDetailScreen;
