import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Recording from '../components/recording';


export default class Recordscreen extends React.Component {
  static navigationOptions = {
    title: 'Record',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        {/* <KeepAwake /> */}
        <Recording type='facilitate'/>
        <TouchableHighlight style={{backgroundColor: 'red'}} onPress={() => 
            navigate('Results')}>
            <Text style={{color:'black'}}> Result </Text>
          </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});