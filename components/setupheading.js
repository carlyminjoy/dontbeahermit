import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

export default class setupHeading extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={this.props.style}>

        <Text style={styles.headingText}>
            {this.props.title}</Text>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  headingText: {
    marginTop: 15,
    color: '#FCFCFC',
    fontSize: 24,
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    letterSpacing:1
  }
});