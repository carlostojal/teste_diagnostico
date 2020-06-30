import React, { Component } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { StackActions } from '@react-navigation/native';

import containers from '../../style/containers';
import text from '../../style/text';

import registerUser from '../../utils/registerUser';

export default class Signup extends Component {
	
	state = {
		name: "",
		email: "",
		password: ""
	}

	updateName = (name) => {
		this.setState({ name: name })
	}

	updateEmail = (email) => {
		this.setState({ email: email })
	}

	updatePassword = (password) => {
		this.setState({ password: password })
	}

	register = () => {
		if(this.state.name != "" && this.state.email != "" && this.state.password != "") {
			registerUser(this.state.name, this.state.email, this.state.password).then((result) => {
				if(result == 0) {
					Alert.alert("Success", "User registered successfully.")
					this.props.navigation.goBack()
				} else if(result == 1) {
					Alert.alert("Warning", "A user with the name \"" + user.name + "\" already exists.")
				} else if(result == 2) {
					Alert.alert("Warning", "A user with the email \"" + user.email + "\" already exists.")
				} else {
					Alert.alert("Error", "Error registering your user. Please try again later.")
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
						<Text style={text.formLabel}> Name </Text>
						<TextInput style={containers.textInput} onChangeText={ (name) => this.updateName(name) } />
					</View>
					<View style={{paddingBottom: 15}}>
						<Text style={text.formLabel}> Email </Text>
						<TextInput style={containers.textInput} onChangeText={ (email) => this.updateEmail(email) } />
					</View>
					<View style={{paddingBottom: 15}}>
						<Text style={text.formLabel}> Password </Text>
						<TextInput secureTextEntry={true} style={containers.textInput} onChangeText={ (password) => this.updatePassword(password) } />
					</View>
				</View>
				<TouchableOpacity style={containers.button} onPress={ () => this.register() }>
					<Text style={text.buttonText}> Signup </Text>
				</TouchableOpacity>
			</View>
		)
	}
}
