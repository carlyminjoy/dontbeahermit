import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default class walkthroughButton extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity 
          style={this.props.style}
          onPress={this.props.onPress} >

          <Text style={styles.buttonText}>
            {this.props.text}</Text>

        </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  },
  buttonText: {
    color: '#FCFCFC',
    fontSize: 24,
    fontWeight: 'bold',
  }
});