import React from 'react';
import {createStackNavigator} from 'react-navigation';
import { AppRegistry, StyleSheet, TouchableOpacity, Text, View, Image, Button } from 'react-native';
import hermitLogo from './assets/hermitPinkBgBlue.png';
import WalkthroughButton from './components/walkthroughbutton';
import HermitHolesSetup from './screens/HermitHolesSetup.js';
import HermitHoles from './screens/HermitHoles.js';
import SunshineSessionsSetup from './screens/SunshineSessionsSetup.js';
import SunshineSessions from './screens/SunshineSessions.js';
import Dashboard from './screens/Dashboard.js';
import HomeScreen from './screens/HomeScreen.js';

class App extends React.Component {
	render() {
		return (
			<View style={styles.container}>

				<HomeScreen />

			</View>
		);
	}
}

export default createStackNavigator({
	Home: { screen: HomeScreen },
	HermitHolesSetup: { screen: HermitHolesSetup },
	HermitHoles: { screen: HermitHoles },
	Dashboard: { screen: Dashboard },
	SunshineSessions: { screen: SunshineSessions },
	SunshineSessionsSetup: { screen: SunshineSessionsSetup } }, {
	headerMode: 'none',
	navigationOptions: {
		headerVisible: false,
	}
});
