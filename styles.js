import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	homeContainer: {
		flex: 1,
		backgroundColor: '#26547C',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingTop: 50,
		paddingBottom: 50,
		paddingLeft: 20,
		paddingRight: 20
	},
	container: {
		paddingTop:50,
		flex: 1,
		backgroundColor: '#26547C',
		alignItems: 'center',
		justifyContent:'space-between'
	},
	logo: {
		height: 200,
		width: 200,
		margin: 20
	},
	logoText: {
		width: 300,
		height: 120
	},
	paragraph: {
		fontSize: 18,
		color: '#FCFCFC',
		letterSpacing: 2,
		lineHeight: 20,
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 15,
		marginRight: 15,
		textAlign: 'center'
	},
	heading: {
		fontSize: 48,
		color: '#FFD166',
		fontFamily: 'Avenir',
		fontWeight: 'bold',
		textAlign: 'center',
		marginLeft: 10,
		marginRight: 10
	},
	startButton: {
		marginTop: 30,
		alignItems: 'center',
		backgroundColor: '#EF476F',
		paddingTop: 10,
		paddingBottom: 10,
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
	statContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	nav: {
		display: 'flex',
		flexDirection: 'row',
		height: 70,
		backgroundColor: '#333',
		position: 'relative',
		bottom: 0,
		width:'100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	navBtn: {
		flex: 1,
		width: 80,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: 70,
		backgroundColor: '#333'
	},
	setupContainer: {
		flex: 1,
		justifyContent: 'space-between',
		backgroundColor: '#FCFCFC',
		alignItems: 'center',
		maxHeight: '100%'
	},
	icon: {
		color: "#333",
		marginTop:15,
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
		borderRadius:5
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
		borderRadius:5
	},
	img: {
		height: 50,
		width: 50,
		margin: 10
	},
	setupHeading: {
		backgroundColor: '#333',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: 100,
		marginBottom:15
	},
	screenHeading: {
		backgroundColor: '#999',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: 100,
		marginBottom:15
	},
	buttonContainer: {
		height: 100,
		paddingBottom: 40,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonsContainer: {
		marginTop:0,
		paddingTop:0,
		height: 'auto',
		paddingBottom: 40,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	setupButton: {
		alignItems: 'center',
		backgroundColor: '#EF476F',
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 5,
		paddingRight: 5,
		width: 290,
		borderRadius: 10
	},
	setupParagraph: {
		fontSize: 18,
		lineHeight: 20,
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 15,
		marginRight: 15,
		textAlign: 'center'
	},
	goalText: {
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