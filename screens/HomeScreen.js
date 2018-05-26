import React from 'react';
import StackNavigator from 'react-navigation';
import { AppRegistry, AsyncStorage, StyleSheet, TouchableOpacity, Text, View, Image, Button } from 'react-native';
import hermitImg from './../assets/hermitGreenBgWhite.png';
import hermitLogo from './../assets/hermitPinkBgBlue.png';
import WalkthroughButton from './../components/walkthroughbutton';
import SetupHeading from './../components/setupheading';
import { Constants, Location, Permissions } from 'expo';
import HermitHolesSetup from './HermitHolesSetup.js';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.heading}>
          Don't Be </Text>
        <Text style={styles.heading}>
          A Hermit </Text>

        <Image source={hermitLogo} 
          style={styles.logo}/>

        <WalkthroughButton 
          text="START"
          style={styles.startButton}
          onPress={() => this.props.navigation.navigate('HermitHolesSetup')} />

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#26547C',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    height: 150,
    width: 150,
    margin: 20
  },
  logoText: {
    width: 300,
    height: 120
  },
  heading: {
    fontSize: 48,
    color: '#FCFCFC',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  startButton: {
    marginTop: 30,
    alignItems: 'center',
    backgroundColor: '#EF476F',
    paddingTop: 10,
    paddingBottom: 10,
    width: 290,
    borderRadius: 10
  }
});
AppRegistry.registerComponent('HomeScreen');