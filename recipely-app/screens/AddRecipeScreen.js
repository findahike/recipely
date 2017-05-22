import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  TextInput,
} from 'react-native';
import Slider from 'react-native-slider';
import ModalDropdown from 'react-native-modal-dropdown';
import Button from '../components/CustomButton';
import { Card, List, ListItem } from 'react-native-elements';
import IngredientList from '../components/IngredientList';

class AddRecipeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      size: 0,
      title: '',
      ingredients: [],
      valueArray: [],
      unitArray: [],
      text: '',
      value: 0,
      isAdding: false,
      body: []
    };
  }

  componentDidMount() {
    const { idToken } = this.props.screenProps;
    var ingredients = this.props.screenProps.ingredients;
    var ingredientList = ingredients.map((ingredient) => {
      this.state.unitArray.push(0);
      this.state.valueArray.push(0);
      this.state.size++;
      return ingredient.name;
    });

    this.setState({ingredients: ingredientList});
  }

  onValueChange = (value, i) => {
    this.state.valueArray[i] = value;
    this.setState({valueArray: this.state.valueArray});
  }

  onUnitChange = (value, i) => {
    console.log(value, 'value');
    console.log(i, 'i');
    this.state.unitArray[i] = value;
    this.setState({unitArray: this.state.unitArray});
  };

  onAddPress = () => {
    this.setState({isAdding: true});
    const { idToken } = this.props.screenProps;
    this.setState({body: []});
    for(var i = 0; i < this.state.size; i++) {
      var temp = this.state.valueArray[i] + ' ' + this.state.unitArray[i] + ' ' + this.state.ingredients[i];
      console.log('temp... ', temp);
      this.state.body.push(temp);
      // console.log('body ...', body);
    }
    // console.log('body is ....',body);
    this.setState({body: this.state.body});
    console.log('state ...', this.state);



    fetch(`https://fireant-recipely.herokuapp.com/api/users/custom_recipes`, {
      method: 'POST',
      headers: {
        'x-access-token': `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: this.state.title,
        ingredients: this.state.body,
        directions: this.state.text
      }),
    }).then((results) => {
        console.log("recipe was added", results);
        this.setState({isAdding: false});
      });
  };

  render() {
    const ingredients = this.state.ingredients;
    //const ingredient = '';
    //console.log(this.state.ingredients, 'ingredients');
    //console.log(this.state.unitArray, 'units');
    return (
      <ScrollView>
        <View style={styles.wrapper}>
          <View style={styles.inputWrap}>
            <Card title="Recipe Name">
              <TextInput
                  style={[styles.input, {height: Math.max(40, this.state.height + 10)}]}
                  autoFocus={true}
                  multiline={true}
                  onChangeText={title => {
                    this.setState({title});
                  }}
                >
                  <Text>{this.state.title}</Text>
                </TextInput>
              </Card>
          </View>
          <View style={styles.inputWrap}>
             <Card title="Ingredients">
              { ingredients.map((item, i) => {
                return (
                  <View key={i}>
                    <View >
                      <Slider
                        trackStyle={styles.track}
                        thumbStyle={styles.thumb}
                        value={this.state.value}
                        onSlidingComplete={(value) => this.onValueChange(value, i)}
                        step={1} maximumValue={15} minimumValue={0} />
                    </View>
                    <View
                      style={styles.rowContainer}
                    >
                      <View style={styles.ingredientEntry}>
                        <Text>{this.state.valueArray[i]}</Text>
                        <ModalDropdown onSelect={(optionsI, value) => this.onUnitChange(value, i)}
                          options={['-', 'tsp', 'Tbsp','cups', 'oz', 'lb', 'lbs', 'pinch']}
                        //}
                        />
                        <Text>{item}</Text>
                      </View>
                    </View>
                  </View>
                );
                })
              }
            </Card>
          </View>
          <Card>
            <View style={styles.wrapper}>
              <View style={styles.inputWrap}>
                <TextInput
                  style={[styles.input, {height: Math.max(40, this.state.height + 10)}]}
                  autoFocus={true}
                  multiline={true}
                  onChangeText={text => {
                    this.setState({text});
                  }}
                  onChange={event => {
                    this.setState({height: event.nativeEvent.contentSize.height});
                  }}
                >
                  <Text>{this.state.text}</Text>
                </TextInput>
              </View>
            </View>
          </Card>
          { this.state.isAdding
            ? <ActivityIndicator size="large" />
              : <Button
                  title="Add Recipe"
                  icon={{name: 'note-add'}}
                  onPress={() => this.onAddPress()}
                />
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  track: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#d0d0d0',
  },
  thumb: {
    width: 4,
    height: 20,
    backgroundColor: '#eb6e1b',
    top: 25,
  },
  wrapper: {
    paddingHorizontal: 15,
  },
  inputWrap: {
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    flexWrap: 'wrap'
  },
  ingredientEntry: {
    flexDirection: 'column',
    maxWidth: 100,
    flexGrow: 1
  },
  numEntry: {
    flexDirection: 'column',
    maxWidth: 100,
    flexGrow: 1
  },
  unitEntry: {
    flexDirection: 'column',
    maxWidth: 100,
    flexGrow: 1
  }
});

export default AddRecipeScreen;








