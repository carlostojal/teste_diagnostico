
import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, Alert, Image, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

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

	
	componentDidMount() {
		this.getPermissionAsync();
	}
	
	getPermissionAsync = async () => {
		if (Constants.platform.ios) {
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			if (status !== 'granted') {
				Alert.alert("Warning", "You have to accept the permission request.");
			}
		}
	}

	upload = async () => {
		try {
			console.log("User selecting image")
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				quality: 1
			})
			if(!result.cancelled) {
				console.log("User selected image")
				var size
				var base64 = require('base-64')
				RNFetchBlob.fs.readFile(result.uri, 'base64').then((data) => {
					var decodedData = base64.decode(data)
					var bytes=decodedData.length
					if(bytes < 1024) size = bytes + " B"
					else if(bytes < 1048576) size = (bytes / 1024).toFixed(3) + " KB"
					else if(bytes < 1073741824) size = (bytes / 1048576).toFixed(2) + " MB"
					else size = (bytes / 1073741824).toFixed(3) + " GB"
					getUser().then((user_email) => {
						this.updateImage({id: new Date().getTime(), uri: result.uri, dimensions: [result.width, result.height], user_email: user_email, size: size})
						console.log(result)
					})
				})
			} else {
				console.log("User haven't selected image")
				this.props.navigation.goBack()
			}
		} catch (error) {
			console.log("Error opening image selector. " + error)
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
