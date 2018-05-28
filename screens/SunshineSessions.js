// Import modules
import React from 'react';
import StackNavigator from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import { AppRegistry, AsyncStorage, StyleSheet, TouchableOpacity, Text, TextInput, View, Image, Button } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

// Import custom styles, assets & components 
import Styles from './../styles.js';
import hermitImg from './../assets/hermitYellowBgWhite.png';
import { WalkthroughButton, SetupHeading, Dashboard } from './../index.js'

export default class SunshineSessions extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hermitHole: '',
			goalAmount: 0
		}

		// Bind functions
		this.decrement = this.decrement.bind(this);
		this.increment = this.increment.bind(this);
		this.goToDashboard = this.goToDashboard.bind(this);
	}

	/*
	 * On mount, runs functions to initialise state
	 */
	componentDidMount() {
		this.getHermitHole();
		this.getGoalAmount();
	}

	/*
	 * Retrieves & sets stored hermit hole string to current state
	 */
	async getHermitHole() {
		let hermitHole = await AsyncStorage.getItem('@store:hermitHole');
		this.setState({hermitHole: hermitHole});
	}

	/*
	 * Retrieves & sets stored goal amount string to current state
	 */
	async getGoalAmount() {
		let goalAmount = await AsyncStorage.getItem('@store:goalAmount');
		this.setState({goalAmount: goalAmount});
	}

	/*
	 * Decrements sunshine sessions goal by 1
	 */
	decrement() {
		this.setState({goalAmount: this.state.goalAmount - 1});
	}

	/*
	 * Increments sunshine sessions goal by 1
	 */
	increment() {
		this.setState({goalAmount: parseInt(this.state.goalAmount) + 1});
	}

	/*
	 * Stores goal amount and navigates to dashboard
	 */
	async goToDashboard() {
		await AsyncStorage.setItem('@store:goalAmount', this.state.goalAmount.toString());
		this.props.navigation.navigate('Dashboard', {refresh: true});
	}

	render() {
		return (
			<View style={Styles.setupContainer}>
				<SetupHeading 
					title="SUNSHINE SESSIONS"
					style={Styles.screenHeading} />
				
				<Icon 
					name = "sun" 
					size={120}
					style={Styles.icon} />

				<Text style={Styles.goalText}>
					Weekly Goal:</Text>

				<View style={Styles.counterContainer}>

					<WalkthroughButton 
						text=" - "
						onPress={this.decrement}
						style={Styles.decrement} />

					<Text style={Styles.counter}>
							{this.state.goalAmount}
						</Text>

					<WalkthroughButton 
						text=" + "
						onPress={this.increment}
						style={Styles.increment} />

				</View>

				<View style={Styles.buttonsContainer}>
					<WalkthroughButton 
						text="SET GOAL"
						style={Styles.startButton}
						onPress={this.goToDashboard} />

					<WalkthroughButton 
						text="CANCEL"
						style={Styles.cancelButton}
						onPress={() => this.props.navigation.navigate('Dashboard')} />
				</View>

			</View>
		);
	}
}

AppRegistry.registerComponent('SunshineSessionsSetup');
