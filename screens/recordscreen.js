import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Recording from '../recording';

export default class Recordscreen extends React.Component {
  static navigationOptions = {
    title: 'Record',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Recording />
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