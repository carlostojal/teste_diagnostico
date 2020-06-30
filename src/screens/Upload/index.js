
import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, Alert, Image, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import containers from '../../style/containers';
import text from '../../style/text';

import saveImage from '../../utils/saveImage';
import getUser from '../../utils/getUser';

export default class Upload extends Component {

	state = {
		image: {
			id: new Date().getTime(),
			user_email: "",
			uri: "",
			name: "",
			size: "",
			dimensions: [0, 0]
		},
		firstOpen: true
	}

	updateImage = (image) => {
		this.setState({ image: image })
	}

	updateName = (name) => {
		var img = this.state.image
		img.name = name
		this.setState({ image: img })
	}

	setOpened = () => {
		this.setState({ firstOpen: false })
	}

	upload = async () => {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				quality: 1
			})
			if(!result.cancelled) {
				getUser().then((user_email) => {
					console.log(result.data)
					this.updateImage({id: new Date().getTime(), uri: result.uri, dimensions: [result.width, result.height], user_email: user_email})
					console.log(result)
				})
			} else {
				this.props.navigation.goBack()
			}
		} catch (error) {
			console.log(error)
		}
	}

	save = () => {
		if(this.state.image.name != "") {
			saveImage(this.state.image).then((result) => {
				if(result == 0) {
					Alert.alert("Success", "Image saved successfully.")
					this.props.navigation.goBack()
				} else if(result == 1) {
					Alert.alert("Warning", "This image was already registered, or one with the same name.")
				} else {
					Alert.alert("Error", "An unexpected error occurred saving the image. Please try again later.")
				}
			})
		} else {
			Alert.alert("Warning", "The name field can't be empty.")
		}
	}

	render() {
		if(this.state.firstOpen) { // open the image library only in the first activity render
			this.upload() // open image library
			this.setOpened()
		}
		var targetWidth, targetHeight
		if(this.state.image.uri != "") {
			targetWidth = Dimensions.get('window').width - (2 * 15)
			targetHeight = this.state.image.dimensions[1] / (this.state.image.dimensions[0] / targetWidth)
		}
		return(
			<View style={containers.container}>
				<ScrollView>
					<View style={{paddingBottom: 15}}>
						<Text style={text.formLabel}> Image name </Text>
						<TextInput style={containers.textInput} onChangeText={ (name) => this.updateName(name)}/>
					</View>
					{this.state.image.uri != "" &&
						<Image source={{uri: this.state.image.uri}} style={{width: targetWidth, height: targetHeight}} />
					}
				</ScrollView>
				<TouchableOpacity style={containers.button} onPress={ () => this.save() }>
					<Text style={text.buttonText}> Save </Text>
				</TouchableOpacity>
			</View>
		)
	}
}
