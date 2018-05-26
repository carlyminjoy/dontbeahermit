import React from 'react';
import StackNavigator from 'react-navigation';
import { AppRegistry, AsyncStorage, StyleSheet, TouchableOpacity, Text, View, Image, Button } from 'react-native';
import hermitImg from './../assets/hermitGreenBgWhite.png';
import WalkthroughButton from './../components/walkthroughbutton';
import SetupHeading from './../components/setupheading';
import { Constants, Location, Permissions } from 'expo';
import SunshineSessionsSetup from './SunshineSessionsSetup.js';

export default class HermitHolesSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

    // Bind functions
    this.setHermitHole = this.setHermitHole.bind(this)
  }
  async setHermitHole() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status == 'granted') {
      // Get coords & store
      let location = await Location.getCurrentPositionAsync({});
      let lat = location.coords.latitude;
      let lon = location.coords.longitude;
      await AsyncStorage.setItem('@store:hermitHoleLat', lat.toString());
      await AsyncStorage.setItem('@store:hermitHoleLon', lon.toString());

      // Get address from coords & store
      let convertedObj = await Location.reverseGeocodeAsync(location.coords);
      let converted = convertedObj[0].name + ', ' + convertedObj[0].city + ', ' + convertedObj[0].region;
      await AsyncStorage.setItem('@store:hermitHole', converted);

      // Navigate to next screen
      this.props.navigation.navigate('SunshineSessionsSetup')
    }
  }
  render() {
    return (
      <View style={styles.container}>

        <SetupHeading 
          title="HERMIT HOLES"
          style={styles.heading} />

        <Image source={hermitImg} 
          style={styles.img}/>

        <Text style={styles.paragraph}>
          Every hermit has a hole or two! </Text>

        <Text style={styles.paragraph}>
          If you're at home right now, click the button below to set this as your hermit hole. </Text>

        <WalkthroughButton 
          text="SET HERMIT HOLE"
          style={styles.startButton}
          onPress={this.setHermitHole} />

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
  img: {
    height: 150,
    width: 150,
    margin: 20
  },
  heading: {
    backgroundColor: '#06D6A0',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 100,
  },
  startButton: {
    marginTop: 30,
    alignItems: 'center',
    backgroundColor: '#06D6A0',
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
  }
});

AppRegistry.registerComponent('HermitHolesSetup');
