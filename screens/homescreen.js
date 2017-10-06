import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  Image
} from 'react-native';

import Expo, { Asset, Font } from 'expo';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
    }
  }

  static navigationOptions = {
    title: 'ally.ai',
  };

  componentDidMount() {
      (async () => {
        await Font.loadAsync({
          'open-sans': require('../assets/fonts/OpenSans-Regular.ttf')
        });
        this.setState({ fontLoaded: true });
      })();
    }

  render() {
    const { navigate } = this.props.navigation;
    if(this.state.fontLoaded) {
    return (
      <View style={styles.container}>

        {/* <View style={styles.top_view}>
          <TouchableHighlight onPress={() => 
            navigate('Results')}>
            <Text> Result </Text>
          </TouchableHighlight>
        </View> */}

        <TouchableHighlight style={styles.empower_view}
          onPress={() =>
            navigate('Intent', { role: 'Empowered' })
          }>
          <View style={styles.ally_inner}>
            <Text style={styles.empowered_text} >I am empowered.</Text>
            <Text style={styles.empowered_desc}>I want to be an advocate for myself and my ideas.</Text>
            <Image 
              style={styles.image}
              source={require('../assets/image/arrow-purple.png')}
            />
          </View>
        </TouchableHighlight>

        <TouchableHighlight style={styles.ally_view}
          onPress={() =>
            navigate('Intent', { role: 'Ally' })
          }>
          <View style={styles.ally_inner}>
            <Text style={styles.ally_text}>I am an ally.</Text>
            <Text style={styles.ally_desc}>I will help those who are not being heard.</Text>
            <Image 
              style={styles.image}
              source={require('../assets/image/arrow-white.png')}
            />
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
  // top_view: {
  //   flex: 1,
  //   backgroundColor: '#efefef',
  //   elevation:1.8,
	// 	shadowColor: "#000000",
	// 	shadowOpacity: 0.2,
	// 	shadowRadius: 2,
	// 	shadowOffset: {
	// 		height: 4,
	// 		width: 0
	// 	}
  // },
  empower_view: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // elevation:1.8,
    alignItems: 'center',
		// shadowColor: "#000000",
		// shadowOpacity: 0.2,
		// shadowRadius: 2,
		// shadowOffset: {
		// 	height: 4,
		// 	width: 0
		// },
    //backgroundColor: '#ffffff',
  },
  ally_view: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#EDC45B',
  },
  ally_text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 50,
    fontFamily: 'open-sans'
  },
  empowered_text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#5500FF',
    marginBottom: 50,
    fontFamily: 'open-sans'
  },
  ally_desc: {
    color: '#ffffff',
    maxWidth: 184
  },
  empowered_desc: {
    color: '#5500FF',
    maxWidth: 184
  },
  ally_inner:{

    justifyContent: 'center',
    padding: 16,
  },
  image: {
    width: 27,
    height: 25,
    marginTop: 40,
  }
});
