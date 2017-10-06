import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
} from 'react-native';

import Expo, { Asset, Font } from 'expo';

const ENDPOINT = 'http://fa474678.ngrok.io';
// const ENDPOINT = 'http://be7a4709.ngrok.io';

export default class Resultscreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      results: null
    }
  }

  static navigationOptions = {
    title: 'Choose your role',
  };

  componentDidMount() {
      (async () => {
        await Font.loadAsync({
          'akademie-bold': require('../assets/fonts/nb_akademie_mono_std_bold.ttf'),
        });
        this.setState({ fontLoaded: true });
      })();

      (async () => {
        try {
          const endpoint = ENDPOINT + '/results'
          let response = await fetch(endpoint);
          let responseJson = await response.json();
          this.setState({results: responseJson})
          console.log()
          return responseJson;
        } catch(error) {
          console.error(error);
        }
      })();
  }

  render() {
    const { navigate } = this.props.navigation;
    if(this.state.fontLoaded && this.state.results) {
    return (
      <View style={styles.container}>

        <View style={styles.top_view}>
        </View>

        <TouchableHighlight style={styles.ally_view}
          onPress={() =>
            navigate('Tips', { role: 'Ally' })
          }>
          <View style={styles.ally_inner}>
          <Text style={styles.empowered_text} >I am{"\n"}empowered.</Text>
          <Text style={styles.empowered_desc}>I want to work on being an advocate for myself and my ideas.</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight style={styles.empowered_view}
          onPress={() =>
            navigate('Tips', { role: 'Empowered' })
          }>
          <View style={styles.ally_inner}>
          <Text style={styles.ally_text}>I am an{"\n"}ally.</Text>
          <Text style={styles.ally_desc}>I will help those who are not being heard.</Text>
          </View>

        </TouchableHighlight>



      </View>
    );} else {
      return(<View />);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    flex:1,
    backgroundColor: '#fff',

  },
  top_view: {
    flex: 1,
    backgroundColor: '#efefef',
    elevation:1.8,
		shadowColor: "#000000",
		shadowOpacity: 0.2,
		shadowRadius: 2,
		shadowOffset: {
			height: 4,
			width: 0
		}
  },
  ally_view: {
    flex: 1,
    //backgroundColor: '#ffffff',
  },
  empowered_view: {
    flex: 1,
    backgroundColor: '#EDC45B',
  },
  ally_text: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    fontFamily: 'akademie-bold'
  },
  empowered_text: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#5500FF',
    marginBottom: 8,
    fontFamily: 'akademie-bold'
  },
  ally_desc: {
    color: '#ffffff',
  },
  empowered_desc: {
    color: '#5500FF',
  },
  ally_inner:{

    justifyContent: 'center',
    padding: 16,
  },
});
