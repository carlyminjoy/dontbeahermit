import React from 'react';
import StackNavigator from 'react-navigation';
import { AppRegistry, AsyncStorage, StyleSheet, TouchableOpacity, Text, TextInput, View, Image, Button } from 'react-native';
import hermitImg from './../assets/hermitYellowBgWhite.png';
import WalkthroughButton from './../components/walkthroughbutton';
import SetupHeading from './../components/setupheading';
import { Constants, Location, Permissions } from 'expo';
import Dashboard from './Dashboard.js';

export default class SunshineSessionsSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      goalAmount: 3
    }

    // Bind functions
    this.decrement = this.decrement.bind(this);
    this.increment = this.increment.bind(this);
    this.goToDashboard = this.goToDashboard.bind(this);
  }
  componentDidMount() {
    this.getAddress();
  }

  async getAddress() {
    let address = await AsyncStorage.getItem('@store:hermitHole');
    this.setState({address: address});
  }

  decrement() {
    this.setState({goalAmount: this.state.goalAmount - 1});
  }

  increment() {
    this.setState({goalAmount: this.state.goalAmount + 1});
  }

  async goToDashboard() {
    // Navigate to next screen
    await AsyncStorage.setItem('@store:goalAmount', this.state.goalAmount.toString());
    this.props.navigation.navigate('Dashboard');
  }

  render() {
    return (
      <View style={styles.container}>
        <SetupHeading 
          title="SUNSHINE SESSIONS"
          style={styles.heading} />

        <View style={styles.imgContainer}>

          <Image source={hermitImg} 
            style={styles.img}/>
          <Image source={hermitImg} 
            style={styles.img}/>
          <Image source={hermitImg} 
            style={styles.img}/>

        </View>

        <Text style={styles.paragraph}>
          Yay! Your hermit hole is: </Text>

        <Text style={styles.bold}>
          {this.state.address} </Text>

          <Text style={styles.paragraph}>
          How often do you want to leave your hermit hole? (These are called Sunshine Sessions!)</Text>

        <View style={styles.imgContainer}>

          <WalkthroughButton 
            text=" - "
            onPress={this.decrement}
            style={styles.decrement} />

          <Text style={styles.counter}>
              {this.state.goalAmount}
            </Text>

          <WalkthroughButton 
            text=" + "
            onPress={this.increment}
            style={styles.increment} />

        </View>

        <WalkthroughButton 
          text="NEXT"
          onPress={this.goToDashboard}
          style={styles.startButton} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    alignItems: 'center',
  },
  imgContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  counter: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 36,
    color: '#000',
    fontWeight: '700',
    textAlign: 'center'
  },
  decrement: {
    backgroundColor: '#EF476F',
    height: 60,
    width: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 30
  },
  increment: {
    backgroundColor: '#06D6A0',
    height: 60,
    width: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 30
  },
  img: {
    height: 50,
    width: 50,
    margin: 10
  },
  heading: {
    backgroundColor: '#FFD166',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 100,
  },
  startButton: {
    marginTop: 30,
    alignItems: 'center',
    backgroundColor: '#FFD166',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    width: 290,
    borderRadius: 10
  },
  paragraph: {
    fontSize: 18,
    lineHeight: 20,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
    textAlign: 'center'
  },
  bold: {
    fontSize: 18,
    lineHeight: 20,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
    textAlign: 'center',
    fontWeight: '700'
  }
});

AppRegistry.registerComponent('SunshineSessionsSetup');
