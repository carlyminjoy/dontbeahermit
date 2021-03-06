import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image } from 'react-native';
import hermitLogo from './../assets/hermitGreenBgBlue.png';

export default class mediocreCrab extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View style={styles.quoteContainer}>
				<Image source={hermitLogo} 
				    style={styles.logo}/>
				<Text style={styles.quote}>
				    "It's not so bad out here.." </Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	logo: {
		height: 100,
		width: 100,
		margin: 10
	},
	quoteContainer: {
		display: 'flex',
		flexDirection: 'row',
		width: 150,
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 20
	},
	quote: {
		fontSize: 18,
		color: '#FCFCFC',
		lineHeight: 20,
		marginLeft: 15,
		marginRight: 15,
		textAlign: 'center',
		fontStyle: 'italic'
	},
});