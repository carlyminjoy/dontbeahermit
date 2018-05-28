// Import modules
import React from 'react';
import StackNavigator from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import { AppRegistry, AsyncStorage, StyleSheet, TouchableOpacity, Text, View, Image, Button } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

// Import custom styles
import Styles from './../styles.js';

// Import custom components/screens
import { HappyCrab, MediocreCrab, SadCrab, WalkthroughButton, HermitHoles, SunshineSessions } from './../index.js'

export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hermitHole: '',
			lat: '',
			lon: '',
			sunshineSessions: 0,
			goalAmount: 0,
			goalPercentage : 0,
			outing: false
		}

		// Bind functions
		this.getHermitHole = this.getHermitHole.bind(this)
		this.getGoalAmount = this.getGoalAmount.bind(this)
		this.getSunshineSessions = this.getSunshineSessions.bind(this)
		this.updateGoalPercentage = this.updateGoalPercentage.bind(this)
		this.componentDidMount = this.componentDidMount.bind(this)
	}

	/*
	 * On props update, refresh goal amount & percentage 
	 *
	 * NextProps (obj)	The props object received
	 */
	componentWillReceiveProps(NextProps) {
		// Check if goal amount has changed & update
		if (NextProps.navigation.state.params &&
				NextProps.navigation.state.params.refresh) {
			this.getGoalAmount();
			this.updateGoalPercentage();
		}
	}

	/*
	 * On mount, runs functions to initialise state
	 * and setup location tracking
	 */
	componentDidMount() {
		this.getHermitHole();
		this.getSunshineSessions();
		this.getGoalAmount();
		this.initLocationTracking();
	}

	/*
	 * Updates & sets goal percentage
	 */
	updateGoalPercentage() {
		let percentage = parseInt((parseInt(this.state.sunshineSessions) * 100) / parseInt(this.state.goalAmount));
		this.setState({goalPercentage: percentage})
	}

	/*
	 * Retrieves & sets stored hermit hole string
	 */
	async getHermitHole() {
		let hermitHole = await AsyncStorage.getItem('@store:hermitHole');
		let lat = await AsyncStorage.getItem('@store:hermitHoleLat');
		let lon = await AsyncStorage.getItem('@store:hermitHoleLon');
		this.setState({hermitHole: hermitHole});

		// Set latitude & longitude to 3 decimals (covers 110 metres)
		this.setState({lat: parseFloat(this.state.lat).toFixed(3)});
		this.setState({lon: parseFloat(this.state.lon).toFixed(3)});
	}

	/*
	 * Retrieves & sets stored sunshine session count
	 */
	async getSunshineSessions() {
		let sunshineSessions = await AsyncStorage.getItem('@store:sunshineSessions');
		this.setState({sunshineSessions: parseInt(sunshineSessions)});
	}

	/*
	 * Retrieves & sets stored sunshine session goal amount
	 * & updates goal percentage
	 */
	async getGoalAmount() {
		let goalAmount = await AsyncStorage.getItem('@store:goalAmount');
		this.setState({goalAmount: goalAmount});
		this.updateGoalPercentage();
	}

	/*
	 * Initialises location tracking functionality
	 */
	initLocationTracking() {
		Location.watchPositionAsync({
			enableHighAccuracy: true,
			timeInterval: 900000,
			distanceInterval: 2000
		}, (position) => {
			// Ensure location state is set
			if (!this.state.lat || !this.state.lon) { return }

			// Initialise location variables
			let outingLat =  parseFloat(position.coords.latitude).toFixed(3);
			let outingLon =  parseFloat(position.coords.longitude).toFixed(3);

			// Check location doesn't match hermit hole
			// as API accuracy can be low
			if (outingLat == this.state.lat && 
					outingLon == this.state.lon) { 
				// Set outing to false & return
				this.setState({outing: false})
				return;
			}

			// Update only if not already on outing
			// to avoid duplicate sunshine sessions
			if (this.state.outing) { return }

			// Otherwise, set outing to true & increment sunshine sessions
			this.setState({outing: true})
			this.setState({sunshineSessions: parseInt(this.state.sunshineSessions) + 1});
			AsyncStorage.setItem('@store:sunshineSessions', this.state.sunshineSessions.toString());

			// Update goal percentage
			this.updateGoalPercentage();
		});
	}

	render() {
		return (
			<View style={Styles.container}>
				
				<View style={Styles.statContainer}>
					<Text style={Styles.heading}>
					{ this.state.sunshineSessions } / { this.state.goalAmount }</Text>
					<Text style={Styles.paragraph}>
					SUNSHINE SESSIONS THIS WEEK </Text>
				</View>

				<View style={Styles.statContainer}>
					<Text style={Styles.heading}>
					{ this.state.goalPercentage } %</Text>
					<Text style={Styles.paragraph}>
					WEEKLY GOAL ACHIEVED </Text>
				</View>

				{ this.state.goalPercentage >= 75 &&
					<HappyCrab /> }

				{ (this.state.goalPercentage >= 25 && this.state.goalPercentage < 75) && 
					<MediocreCrab /> }

				{ this.state.goalPercentage < 25 && 
					<SadCrab /> }

				// NAVBAR
				<View style={Styles.nav} >
					<Icon.Button 
						name = "home" 
						size={50}
						style={Styles.navBtn}
						onPress={() => this.props.navigation.navigate('HermitHoles')} />

					<Icon.Button 
						name = "sun"
						size={50}
						style={Styles.navBtn}
						onPress={() => this.props.navigation.navigate('SunshineSessions')} />

					<Icon.Button name = "heart" 
						size={50}
						disabled
						style={Styles.navBtn}
						onPress={() => alert('Fab Crabs coming soon!')} />

					<Icon.Button name = "user" 
						size={50}
						disabled
						style={Styles.navBtn}
						onPress={() => alert('User page coming soon!')} />
				</View>

			</View>
		);
	}
}

AppRegistry.registerComponent('Dashboard');