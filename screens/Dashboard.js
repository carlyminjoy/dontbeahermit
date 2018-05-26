// Import modules
import React from 'react';
import StackNavigator from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import { AppRegistry, AsyncStorage, StyleSheet, TouchableOpacity, Text, View, Image, Button } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

// Import custom modules
import hermitLogo from './../assets/hermitSadPinkBgBlue.png';
import HappyCrab from './../components/happycrab.js';
import MediocreCrab from './../components/mediocrecrab.js';
import SadCrab from './../components/sadcrab.js';
import WalkthroughButton from './../components/walkthroughbutton';
import HermitHoles from './HermitHoles.js';
import SunshineSessionsSetup from './SunshineSessionsSetup.js';
import SunshineSessions from './SunshineSessions.js';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hermitHole: '',
      lat: '',
      lon: '',
      sunshineSessions: 0,
      goalAmount: 0,
      goalPercentage : 0
    }

    // Bind functions
    this.getHermitHole = this.getHermitHole.bind(this)
    this.getGoalAmount = this.getGoalAmount.bind(this)
    this.getSunshineSessions = this.getSunshineSessions.bind(this)
    this.updateGoalPercentage = this.updateGoalPercentage.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentWillReceiveProps(NextProps) {
    if (NextProps.navigation.state.params &&
        NextProps.navigation.state.params.refresh) {
        this.getGoalAmount();
        this.updateGoalPercentage();
    }
  }

  componentDidMount() {
    this.getHermitHole();
    this.getGoalAmount();
    this.getSunshineSessions();
    this.updateGoalPercentage();

    // Set up location tracking
    Location.watchPositionAsync({
        enableHighAccuracy: true,
        timeInterval: 900000,
        distanceInterval: 2000
    }, (coords) => {
        // Check location doesn't match hermit hole
        if (coords.latitude == this.state.lat && coords.longitude == this.state.lon) { return; }

        // Update sunshine sessions
        this.setState({sunshineSessions: parseInt(this.state.sunshineSessions) + 1});
        AsyncStorage.setItem('@store:sunshineSessions', this.state.sunshineSessions.toString());
        
        // Update goal percentage
        this.updateGoalPercentage();
    });
  }

  updateGoalPercentage() {
    let percentage = parseInt((parseInt(this.state.sunshineSessions) * 100) / parseInt(this.state.goalAmount));
    this.setState({goalPercentage: percentage})
  }

  async getHermitHole() {
    let hermitHole = await AsyncStorage.getItem('@store:hermitHole');
    let lat = AsyncStorage.getItem('@store:hermitHoleLat');
    let lon = AsyncStorage.getItem('@store:hermitHoleLon');
    this.setState({hermitHole: hermitHole});
    this.setState({lat: lat});
    this.setState({lon: lon});
  }

  async getSunshineSessions() {
    let sunshineSessions = await AsyncStorage.getItem('@store:sunshineSessions');
    this.setState({sunshineSessions: parseInt(sunshineSessions)});
    console.log(this.state.sunshineSessions);
  }

  async getGoalAmount() {
    let goalAmount = await AsyncStorage.getItem('@store:goalAmount');
    this.setState({goalAmount: goalAmount});
  }

  render() {
    return (
      <View style={styles.container}>
        
        <View style={styles.statContainer}>
            <Text style={styles.heading}>
            { this.state.sunshineSessions } / { this.state.goalAmount }</Text>
            <Text style={styles.paragraph}>
            SUNSHINE SESSIONS THIS WEEK </Text>
        </View>

        <View style={styles.statContainer}>
            <Text style={styles.heading}>
            { this.state.goalPercentage } %</Text>
            <Text style={styles.paragraph}>
            WEEKLY GOAL ACHIEVED </Text>
        </View>

        { this.state.goalPercentage >= 75 &&
            <HappyCrab /> }

        { (this.state.goalPercentage >= 25 && this.state.goalPercentage < 75) && 
            <MediocreCrab /> }

        { this.state.goalPercentage < 25 && 
            <SadCrab /> }

        // NAVBAR
        <View style={styles.nav} >
            <Icon.Button 
                name = "home" 
                size={50}
                style={styles.navBtn}
                onPress={() => this.props.navigation.navigate('HermitHoles')} />

            <Icon.Button 
                name = "sun" 
                size={50}
                style={styles.navBtn}
                onPress={() => this.props.navigation.navigate('SunshineSessions')} />

            <Icon.Button name = "heart" 
                size={50}
                style={styles.navBtn} />

            <Icon.Button name = "user" 
                size={50}
                style={styles.navBtn} />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop:50,
    flex: 1,
    backgroundColor: '#26547C',
    alignItems: 'center',
    justifyContent:'space-between'
  },
  logoText: {
    width: 300,
    height: 120
  },
  nav: {
    display: 'flex',
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#333',
    position: 'relative',
    bottom: 0,
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  navBtn: {
    flex: 1,
    width: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    backgroundColor: '#333'
  },
  statContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paragraph: {
    fontSize: 18,
    color: '#FCFCFC',
    letterSpacing: 2,
    lineHeight: 20,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
    textAlign: 'center'
  },
  heading: {
    fontSize: 48,
    color: '#FFD166',
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

AppRegistry.registerComponent('Dashboard');