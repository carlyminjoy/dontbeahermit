import React from 'react';
import StackNavigator from 'react-navigation';
import { Icon } from 'react-native-vector-icons';
import { AppRegistry, AsyncStorage, StyleSheet, TouchableOpacity, Text, View, Image, Button } from 'react-native';
import hermitLogo from './../assets/hermitSadPinkBgBlue.png';
import WalkthroughButton from './../components/walkthroughbutton';
import { Constants, Location, Permissions } from 'expo';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hermitHole: '',
      sunshineSessions: 0,
      goalAmount: 0,
      goalPercentage : 0
    }

    // Bind functions
    this.getAddress = this.getAddress.bind(this)
    this.getGoalAmount = this.getGoalAmount.bind(this)
  }
  componentDidMount() {
    this.getAddress();
    this.getGoalAmount();

    console.log(this.state.goalAmount);

    // calculate goal percentage
    if (parseInt(this.state.goalAmount) > 0) {
      this.setState({goalPercentage: parseInt(1) / parseInt(this.state.goalAmount) })
    }

    // Set up location tracking
  }
  async getAddress() {
    let address = await AsyncStorage.getItem('@store:hermitHole');
    this.setState({hermitHole: address});
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

        <View style={styles.quoteContainer}>
          <Image source={hermitLogo} 
            style={styles.logo}/>

          <Text style={styles.quote}>
            "Sun? What dat?" </Text>
        </View>

        <View style={styles.nav} >

          <Text style={styles.navBtnPink} >
            HH </Text>

            <Text style={styles.navBtnGreen} >
             SS </Text>

            <Text style={styles.navBtnPink} >
               FB </Text>

            <Text style={styles.navBtnGreen} >
               ME! </Text>

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
  logo: {
    height: 100,
    width: 100,
    margin: 10
  },
  logoText: {
    width: 300,
    height: 120
  },
  nav: {
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#FFD166',
    position: 'relative',
    bottom: 0,
    width:'100%'
  },
  navBtnPink: {
    flex: 1,
    width: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#333',
    color:'#FCFCFC',
    textAlign:'center',
    lineHeight: 60,
    fontWeight: '700'
  },
  navBtnGreen: {
    flex: 1,
    width: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#333',
    color:'#FCFCFC',
    textAlign: 'center',
    lineHeight:60,
    fontWeight: '700'
  },
  statContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  quoteContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20
  },
  quote: {
    fontSize: 18,
    color: '#FCFCFC',
    lineHeight: 20,
    marginLeft: 15,
    marginRight: 15,
    textAlign: 'center',
    fontStyle: 'italic'
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