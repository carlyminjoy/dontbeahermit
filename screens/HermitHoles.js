// Import modules
import React from 'react';
import StackNavigator from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import { AppRegistry, Alert, AsyncStorage, Modal, StyleSheet, TouchableOpacity, Text, View, Image, Button } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

// Import custom styles, assets & components 
import Styles from './../styles.js';
import hermitImg from './../assets/hermitGreenBgWhite.png';
import { WalkthroughButton, SetupHeading, Dashboard } from './../index.js'


export default class HermitHoles extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hermitHole : ''
		}

		// Bind functions
		this.setHermitHole = this.setHermitHole.bind(this)
		this.getHermitHole = this.getHermitHole.bind(this)
	}

	/*
	 * On mount, runs functions to initialise state
	 */
	componentDidMount() {
		this.getHermitHole();
	}

	/*
	 * Retrieves and stores user's current location as hermit hole
	 */
	async setHermitHole() {
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status == 'granted') {
			// Get current location coords & store
			let location = await Location.getCurrentPositionAsync({});
			let lat = location.coords.latitude;
			let lon = location.coords.longitude;
			await AsyncStorage.setItem('@store:hermitHoleLat', lat.toString());
			await AsyncStorage.setItem('@store:hermitHoleLon', lon.toString());

			// Convert coords to address string & store
			let convertedObj = await Location.reverseGeocodeAsync(location.coords);
			let converted = convertedObj[0].name + ', ' + convertedObj[0].city + ', ' + convertedObj[0].region;
			await AsyncStorage.setItem('@store:hermitHole', converted);

			// Alert user that hermit hole has changed
			Alert.alert(
			  "You've found a new home!",
			  "\nHermit hole has been updated to: \n\n" + converted,
			  [
			    {text: 'OK', onPress: () => this.props.navigation.navigate('Dashboard')},
			  ],
			  { cancelable: false }
			)
		}
	}

	/*
	 * Retrieves hermit hole string from local storage
	 */
	async getHermitHole() {
		let hermitHole = await AsyncStorage.getItem('@store:hermitHole');
		this.setState({hermitHole: hermitHole});
	}
	
	render() {
		return (
			<View style={Styles.setupContainer}>

				<SetupHeading 
					title="HERMIT HOLE"
					style={Styles.screenHeading} />

				<Icon 
					name = "home" 
					size={120}
					style={Styles.icon} />

				<Text style={Styles.setupParagraph}>
					Your current Hermit Hole is: </Text>

				<Text style={Styles.bold}>
					{this.state.hermitHole} </Text>

				<Text style={Styles.setupParagraph}>
					Click the button below to update. </Text>

				<View style={Styles.buttonsContainer}>
					<WalkthroughButton 
						text="SET HERMIT HOLE"
						style={Styles.startButton}
						onPress={this.setHermitHole} />

					<WalkthroughButton 
						text="CANCEL"
						style={Styles.cancelButton}
						onPress={() => this.props.navigation.navigate('Dashboard')} />
				</View>

			</View>
		);
	}
}

AppRegistry.registerComponent('HermitHolesSetup');
