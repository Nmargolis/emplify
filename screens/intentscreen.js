import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Recording from '../components/recording';

export default class Intentscreen extends React.Component {
  static navigationOptions = {
    title: 'Choose your role',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Recording type='intent'/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});