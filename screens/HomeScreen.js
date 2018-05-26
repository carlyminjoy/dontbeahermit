import React from 'react';
import StackNavigator from 'react-navigation';
import { AppRegistry, AsyncStorage, StyleSheet, TouchableOpacity, Text, View, Image, Button } from 'react-native';
import hermitImg from './../assets/hermitGreenBgWhite.png';
import hermitLogo from './../assets/hermitPinkBgBlue.png';
import WalkthroughButton from './../components/walkthroughbutton';
import SetupHeading from './../components/setupheading';
import { Constants, Location, Permissions } from 'expo';
import HermitHolesSetup from './HermitHolesSetup.js';
import Dashboard from './Dashboard.js';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hermitHole: null
    }

    // Bind functions
    this.goToNextPage = this.goToNextPage.bind(this);
    this.checkSetupComplete = this.checkSetupComplete.bind(this);
  }

  componentDidMount() {
    // Testing - delete for prod
    AsyncStorage.setItem('@store:sunshineSessions', '-1');
    AsyncStorage.setItem('@store:hermitHole', '');
    AsyncStorage.setItem('@store:goalAmount', '3');
    //
    this.checkSetupComplete();
  }

  async checkSetupComplete() {
    // Check if user has already set up
    let hermitHole = await AsyncStorage.getItem('@store:hermitHole');
    if (!hermitHole || hermitHole == '') {
      // Set default stored values
      AsyncStorage.setItem('@store:sunshineSessions', '-1');
    } else {
      this.setState({hermitHole: hermitHole});
    }
  }

  goToNextPage() {
    if (this.state.hermitHole) {
      this.props.navigation.navigate('Dashboard')
    } else {
      this.props.navigation.navigate('HermitHolesSetup')
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.heading}>
          Don't Be A Hermit </Text>

        <Image source={hermitLogo} 
          style={styles.logo}/>

        <WalkthroughButton 
          text="START"
          style={styles.startButton}
          onPress={this.goToNextPage} />

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#26547C',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 20,
    paddingRight: 20
  },
  logo: {
    height: 200,
    width: 200,
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