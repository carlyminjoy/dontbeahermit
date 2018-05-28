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

export default class SunshineSessionsSetup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hermitHole: '',
			goalAmount: 7
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
	}

	/*
	 * Retrieves & sets stored hermit hole string to current state
	 */
	async getHermitHole() {
		let hermitHole = await AsyncStorage.getItem('@store:hermitHole');
		this.setState({hermitHole: hermitHole});
	}

	/*
	 * Decrements sunshine sessions goal by 1
	 */
	decrement() {
		this.setState({goalAmount: this.state.goalAmount - 1});
	}

	/*
	 * Decrements sunshine sessions goal by 1
	 */
	increment() {
		this.setState({goalAmount: this.state.goalAmount + 1});
	}

	/*
	 * Stores goal amount and navigates to dashboard
	 */
	async goToDashboard() {
		// Navigate to next screen
		await AsyncStorage.setItem('@store:goalAmount', this.state.goalAmount.toString());
		this.props.navigation.navigate('Dashboard');
	}

	render() {
		return (
			<View style={Styles.setupContainer}>
				<SetupHeading 
					title="SUNSHINE SESSIONS"
					style={Styles.setupHeading} />

				<Text style={Styles.setupParagraph}>
					Yay! Your hermit hole is: </Text>

				<Text style={Styles.bold}>
					{this.state.hermitHole} </Text>

				<Icon 
					name = "sun" 
					size={100}
					style={Styles.icon}/>

				<Text style={Styles.setupParagraph}>
					How many times per week do you want to get some sunshine?</Text>

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

				<View style={Styles.buttonContainer}>
					<WalkthroughButton 
						text="SET GOAL"
						style={Styles.setupButton}
						onPress={this.goToDashboard} />
				</View>

			</View>
		);
	}
}

AppRegistry.registerComponent('SunshineSessionsSetup');
