// Import modules
import React from 'react';
import StackNavigator from 'react-navigation';
import { AppRegistry, AsyncStorage, StyleSheet, TouchableOpacity, Text, View, Image, Button } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

// Import custom styles, assets & components 
import Styles from './../styles.js';
import hermitImg from './../assets/hermitGreenBgWhite.png';
import hermitLogo from './../assets/hermitPinkBgBlue.png';
import { WalkthroughButton, SetupHeading, HermitHolesSetup, Dashboard } from './../index.js'


export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newUser: true
		}

		// Bind functions
		this.goToNextPage = this.goToNextPage.bind(this);
		this.checkSetupComplete = this.checkSetupComplete.bind(this);
		this.checkIfNewWeek = this.checkIfNewWeek.bind(this);
		this.getHermitHole = this.getHermitHole.bind(this);
		this.initialiseDefaults = this.initialiseDefaults.bind(this);
	}

	/*
	 * On mount, runs functions to initialise state
	 */
	componentDidMount() {
		this.checkSetupComplete()
			? this.setState({ newUser: false })
			: this.initialiseDefaults()

		if (!this.state.newUser && this.checkIfNewWeek()) {
			
		}
	}

	/*
	 * Checks if user has already completed setup
	 */
	async checkSetupComplete() {
		let hermitHole = await this.getHermitHole();
		return (hermitHole && hermitHole != '');
	}

	/*
	 * Checks if it is a new week
	 */
	async checkIfNewWeek(currentDate) {
		// Get last login date and day
		let lastLogin = new Date(await AsyncStorage.getItem('@store:lastLogin'))
		let lastLoginDay = lastLogin.getDay()

		// Set one week in milliseconds
		let oneWeek = 604800000;
		// Get current day
		let currentDay = currentDate.getDay()

		// Return if new week has occurred since last login
		return (currentDay < lastLoginDay ||
			currentDate - lastLogin > oneWeek)
	}

	async getHermitHole() {
		let hermitHole = await AsyncStorage.getItem('@store:hermitHole');
		return hermitHole;
	}

	initialiseDefaults() {
		AsyncStorage.setItem('@store:sunshineSessions', '0');
		AsyncStorage.setItem('@store:goalAmount', '7');
	}

	/*
	 * Navigates to next setup page or dashboard
	 */
	goToNextPage() {
		let screen = this.state.newUser
			? 'HermitHolesSetup'
			: 'Dashboard'

		this.props.navigation.navigate(screen);
	}

	render() {
		return (
			<View style={Styles.homeContainer}>

				<Text style={Styles.heading}>
					Don't Be A Hermit </Text>

				<Image source={hermitLogo} 
					style={Styles.logo}/>

				<WalkthroughButton 
					text="START"
					style={Styles.startButton}
					onPress={this.goToNextPage} />

			</View>
		);
	}
}

AppRegistry.registerComponent('HomeScreen');