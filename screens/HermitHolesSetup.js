// Import modules
import React from 'react';
import StackNavigator from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import { AppRegistry, AsyncStorage, StyleSheet, TouchableOpacity, Text, View, Image, Button } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

// Import custom styles, assets & components 
import Styles from './../styles.js';
import hermitImg from './../assets/hermitGreenBgWhite.png';
import { WalkthroughButton, SetupHeading, SunshineSessionsSetup } from './../index.js'

export default class HermitHolesSetup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}

		// Bind functions
		this.setHermitHole = this.setHermitHole.bind(this)
	}

	/*
	 * Retrieves and stores user's current location as hermit hole
	 * and navigates to next setup screen
	 */
	async setHermitHole() {
		// Ask user permissions for location services
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
			<View style={Styles.setupContainer}>

				<SetupHeading 
					title="HERMIT HOLE"
					style={Styles.setupHeading} />

				<Icon 
					name = "home" 
					size={150}
					style={Styles.icon} />

				<Text style={Styles.setupParagraph}>
					Every hermit has a hole or two! </Text>

				<Text style={Styles.setupParagraph}>
					If you're at home right now, click the button below to set this as your hermit hole. </Text>

				<View style={Styles.buttonContainer}>
					<WalkthroughButton 
						text="SET HERMIT HOLE"
						style={Styles.setupButton}
						onPress={this.setHermitHole} />
				</View>

			</View>
		);
	}
}

AppRegistry.registerComponent('HermitHolesSetup');
