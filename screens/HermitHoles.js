import React from 'react';
import StackNavigator from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import { AppRegistry, Alert, AsyncStorage, Modal, StyleSheet, TouchableOpacity, Text, View, Image, Button } from 'react-native';
import hermitImg from './../assets/hermitGreenBgWhite.png';
import WalkthroughButton from './../components/walkthroughbutton';
import SetupHeading from './../components/setupheading';
import { Constants, Location, Permissions } from 'expo';
import Dashboard from './Dashboard.js';

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
	componentDidMount() {
		// Call funcs
		this.getHermitHole();
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
	async getHermitHole() {
		let hermitHole = await AsyncStorage.getItem('@store:hermitHole');
		this.setState({hermitHole: hermitHole});
	}
	render() {
		return (
			<View style={styles.container}>

				<SetupHeading 
					title="HERMIT HOLES"
					style={styles.heading} />

				<Icon 
					name = "home" 
					size={150}
					style={styles.icon} />

				<Text style={styles.paragraph}>
					Your current Hermit Hole is: </Text>

				<Text style={styles.bold}>
					{this.state.hermitHole} </Text>

				<Text style={styles.paragraph}>
					Click the button below to update. </Text>

				<WalkthroughButton 
					text="SET HERMIT HOLE"
					style={styles.startButton}
					onPress={this.setHermitHole} />

				<WalkthroughButton 
					text="CANCEL"
					style={styles.cancelButton}
					onPress={() => this.props.navigation.navigate('Dashboard')} />

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
	icon: {
		color: "#333",
		marginTop: 10,
		marginBottom: 5
	},
	heading: {
		backgroundColor: '#333',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: 100,
	},
	startButton: {
		marginTop: 15,
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
		fontSize: 18,
		lineHeight: 20,
		marginTop: 10,
		marginBottom: 5,
		marginLeft: 15,
		marginRight: 15,
		textAlign: 'center'
	},
	bold: {
		fontSize: 24,
		lineHeight: 26,
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 15,
		marginRight: 15,
		textAlign: 'center',
		fontWeight: '700'
	}
});

AppRegistry.registerComponent('HermitHolesSetup');
