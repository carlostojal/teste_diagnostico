import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StackActions, NavigationAction } from '@react-navigation/native';

import containers from '../../style/containers';
import text from '../../style/text';

import loginUser from '../../utils/loginUser';
import setUser from '../../utils/setUser';

export default class Login extends Component {
	
	state = {
		email: "",
		password: ""
	}

	updateEmail = (email) => {
		this.setState({ email: email })
	}

	updatePassword = (password) => {
		this.setState({ password: password })
	}

	login = () => {
		if(this.state.email != "" && this.state.password != "") {
			loginUser(this.state.email, this.state.password).then((result) => {
				if(result == 0) {
					setUser(this.state.email).then((result) => {
						if(result == 0) {
							const replaceAction = StackActions.replace('Home')
							this.props.navigation.dispatch(replaceAction)
						} else {
							Alert.alert("Error", "An error occurred saving your session. Please try again later.")
						}
					})
				} else if(result == 1) {
					Alert.alert("Warning", "Wrong credentials or the user is not registered.")
				} else {
					Alert.alert("Error", "An unexpected error occured. Please try again later.")
				}
			})
		} else {
			Alert.alert("Warning", "One or more fields were left empty.")
		}
	}

	render() {
		return(
			<View style={containers.container}>
				<View>
					<View style={{paddingBottom: 15}}>
						<Text style={text.formLabel}> Email </Text>
						<TextInput style={containers.textInput} onChangeText={ (email) => this.updateEmail(email) } />
					</View>
					<View style={{paddingBottom: 15}}>
						<Text style={text.formLabel}> Password </Text>
						<TextInput secureTextEntry={true} style={containers.textInput} onChangeText={ (password) => this.updatePassword(password) } />
					</View>
					<TouchableOpacity
						onPress={() => {
							this.props.navigation.navigate('Signup')
						}
					}>
						<Text style={text.linkButton}> Signup instead </Text>
					</TouchableOpacity>
				</View>
				<TouchableOpacity style={containers.button} onPress={ () => this.login() }>
					<Text style={text.buttonText}> Login </Text>
				</TouchableOpacity>
			</View>
		)
	}
}
