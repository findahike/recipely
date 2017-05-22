import Expo from 'expo';
import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, ActivityIndicator, View, Text, Button } from 'react-native';
import StartupStack from './navigation/routes';
import jwtDecode from 'jwt-decode';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAppReady: false,
      isLoggedIn: false,
      idToken: null,
      user: { username: null, userId: null },
      recipes: [],
      image: null,
      predictions: [],
      searchResults: {},
      ingredients: [],
      notes: [],
      popularRecipes: null,
      userRecipes: [],
      customRecipes:[]
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('id_token', (error, idToken) => {
      // Check if the user is still logged in and token is still valid
      const isTokenExpired = (idToken) => {
        const decoded = jwtDecode(idToken);
        const timeCurr = new Date().getTime();
        const timeExp = decoded.exp * 1000;
        return timeExp - timeCurr < 300000;
      };

      if (idToken !== null && !isTokenExpired(idToken)) {
        this.setState({isLoggedIn: true});
        this.setIdToken(idToken);

        // Make a request to our server to get a new token
        const getRefreshToken = fetch('https://fireant-recipely.herokuapp.com/api/token', {
          headers: { 'x-access-token': `Bearer ${idToken}` }
        }).then(res => res.json())
          .then(refreshToken => {
            AsyncStorage.setItem('id_token', refreshToken, () => {
              this.setIdToken(refreshToken);
            });
          });
        // Fetch user's recipes
        const fetchRecipes = fetch('https://fireant-recipely.herokuapp.com/api/users/recipes', {
          headers: { 'x-access-token': `Bearer ${idToken}` }
          }).then(res => {
            if (res.status === 200) {
              res.json()
                .then(recipes => this.onRecipesChange(recipes));
            }
        });
          //fetch user's custom recipes
        const fetchCustom = fetch('https://fireant-recipely.herokuapp.com/api/users/custom_recipes', {
          headers: { 'x-access-token': `Bearer ${idToken}` }
          }).then(res => {
            if (res.status === 200) {
              res.json()
                .then(recipes => this.onCustomRecipesChange(recipes));
            }
        });

        // Fetch user's notes
        const fetchNotes = fetch('https://fireant-recipely.herokuapp.com/api/users/notes', {
          headers: { 'x-access-token': `Bearer ${idToken}` }
        }).then(res => {
            if (res.status === 200) {
              res.json()
                .then(notes => this.onNotesChange(notes))
            }
          });

        // App is ready when the user's recipes and notes have been fetched.
        Promise.all([fetchRecipes, fetchCustom, fetchNotes, getRefreshToken])
          .then(() => this.setState({isAppReady: true}));
      } else {
        this.setState({isAppReady: true});
      }
    });
  }

  setIdToken = (idToken) => {
    if (idToken === null) {
      this.setState({
        idToken: null,
        user: { username: null, userId: null }
      });
    } else {
      // Set token and user information
      const decoded = jwtDecode(idToken);
      this.setState({
        idToken,
        user: {
          username: decoded.user,
          userId: decoded.sub
        }
      });
    }
  };

  onRecipesChange = (recipes) => {
    this.setState({recipes});
    //console.log(this.state.recipes, 'recipes state');
  };

  onImageChange = (image) => {
    this.setState({image});
  };

  onPredictionsChange = (predictions) => {
    this.setState({predictions});
  };

  onSearchChange = (query, results) => {
    this.setState({
      searchResults: { ...this.state.searchResults, [query]: results }
    });
  };

  onIngredientChange = (ingredients) => {
    this.setState({ingredients});
  };

  onLoginChange = () => {
    this.setState({isLoggedIn: !this.state.isLoggedIn});
  }

  onNotesChange = (notes, cb = () => {}) => {
    this.setState({notes}, cb);
  };

  onPopularRecipesChange = (popularRecipes) => {
    this.setState({popularRecipes});
  };

  onUserRecipeChange = (userRecipes) => {
    this.setState({userRecipes});
  };

  onCustomRecipesChange = (customRecipes) => {
    //console.log(customRecipes, 'inside onCustomRecipesChange');
    this.setState({customRecipes});
    //console.log(this.state.customRecipes, 'customRecipes state');
  };

  render() {
    return (
      <StartupStack
        screenProps={
          {
            isAppReady: this.state.isAppReady,
            isLoggedIn: this.state.isLoggedIn,
            idToken: this.state.idToken,
            user: this.state.user,
            recipes: this.state.recipes,
            image: this.state.image,
            predictions: this.state.predictions,
            searchResults: this.state.searchResults,
            ingredients: this.state.ingredients,
            notes: this.state.notes,
            popularRecipes: this.state.popularRecipes,
            userRecipes: this.state.userRecipes,
            setIdToken: this.setIdToken,
            onRecipesChange: this.onRecipesChange,
            onImageChange: this.onImageChange,
            onPredictionsChange: this.onPredictionsChange,
            onSearchChange: this.onSearchChange,
            onIngredientChange: this.onIngredientChange,
            onLoginChange: this.onLoginChange,
            onNotesChange: this.onNotesChange,
            onPopularRecipesChange: this.onPopularRecipesChange,
            onUserRecipeChange: this.onUserRecipeChange,
            customRecipes: this.state.customRecipes,
            onCustomRecipesChange: this.onCustomRecipesChange
          }
        }
      />
    );
  }
}

Expo.registerRootComponent(App);
