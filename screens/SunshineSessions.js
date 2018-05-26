import React from 'react';
import StackNavigator from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import { AppRegistry, AsyncStorage, StyleSheet, TouchableOpacity, Text, TextInput, View, Image, Button } from 'react-native';
import hermitImg from './../assets/hermitYellowBgWhite.png';
import WalkthroughButton from './../components/walkthroughbutton';
import SetupHeading from './../components/setupheading';
import { Constants, Location, Permissions } from 'expo';
import Dashboard from './Dashboard.js';

export default class SunshineSessions extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			address: '',
			goalAmount: 0
		}

		// Bind functions
		this.decrement = this.decrement.bind(this);
		this.increment = this.increment.bind(this);
		this.goToDashboard = this.goToDashboard.bind(this);
	}
	componentDidMount() {
		this.getAddress();
		this.getGoalAmount();
	}

	async getAddress() {
		let address = await AsyncStorage.getItem('@store:hermitHole');
		this.setState({address: address});
	}

	async getGoalAmount() {
		let goalAmount = await AsyncStorage.getItem('@store:goalAmount');
		this.setState({goalAmount: goalAmount});
	}

	decrement() {
		this.setState({goalAmount: this.state.goalAmount - 1});
	}

	increment() {
		this.setState({goalAmount: parseInt(this.state.goalAmount) + 1});
	}

	async goToDashboard() {
		// Navigate to next screen
		await AsyncStorage.setItem('@store:goalAmount', this.state.goalAmount.toString());
		this.props.navigation.navigate('Dashboard', {refresh: true});
	}

	render() {
		return (
			<View style={styles.container}>
				<SetupHeading 
					title="SUNSHINE SESSIONS"
					style={styles.heading} />
				
				<Icon 
					name = "sun" 
					size={150}
					style={styles.icon} />

				<Text style={styles.paragraph}>
					Weekly Goal:</Text>

				<View style={styles.counterContainer}>

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

				<View style={styles.buttonContainer}>
					<WalkthroughButton 
						text="SET GOAL"
						style={styles.startButton}
						onPress={this.goToDashboard} />

					<WalkthroughButton 
						text="CANCEL"
						style={styles.cancelButton}
						onPress={() => this.props.navigation.navigate('Dashboard')} />
				</View>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		backgroundColor: '#FCFCFC',
		alignItems: 'center',
		maxHeight: '100%'
	},
	icon: {
		color: "#333",
		paddingTop: 15,
		paddingBottom: 15
	},
	counterContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10
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
		backgroundColor: '#333',
		height: 60,
		width: 60,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 10,
		marginRight: 10,
		borderRadius: 5
	},
	increment: {
		backgroundColor: '#333',
		height: 60,
		width: 60,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 10,
		marginRight: 10,
		borderRadius: 5
	},
	img: {
		height: 50,
		width: 50,
		margin: 10
	},
	heading: {
		backgroundColor: '#333',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: 100,
	},
	buttonContainer: {
		height: 'auto',
		paddingBottom: 30,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	startButton: {
		alignItems: 'center',
		backgroundColor: '#EF476F',
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 5,
		paddingRight: 5,
		width: 290,
		borderRadius: 10
	},
	cancelButton: {
		marginTop: 10,
		alignItems: 'center',
		backgroundColor: '#333',
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 5,
		paddingRight: 5,
		width: 290,
		borderRadius: 10
	},
	paragraph: {
		fontSize: 24,
		lineHeight: 26,
		fontWeight: '700',
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
