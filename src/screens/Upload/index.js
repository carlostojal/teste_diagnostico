
import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, Alert, Image, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import containers from '../../style/containers';
import text from '../../style/text';

import saveImage from '../../utils/saveImage';
import getUser from '../../utils/getUser';
import getFileSize from '../../utils/getFileSize';
import moveFile from '../../utils/moveFile';

export default class Upload extends Component {

	state = {
		image: {
			id: new Date().getTime(),
			user_email: "",
			uri: "",
			name: "",
			size: "",
			dimensions: [0, 0],
			coordinates: [0, 0],
			classification: null
		},
		firstOpen: true,
		status: "",
		tfReady: false,
		createdImage: false,
		gotImageSize: false,
		gotLocation: false,
		gotUserEmail: false,
		classified: false
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

	updateStatus = (text) => {
		this.setState({ status: text })
	}

	setTfReady = () => {
		this.setState({ tfReady: true })
	}

	setGotImageSize = () => {
		this.setState({ gotImageSize: true })
	}

	setGotLocation = () => {
		this.setState({ gotLocation: true })
	}

	setClassified = () => {
		this.setState({ classification: true })
	}

	upload = async () => {
		try {
			console.log("User selecting image")
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				allowsMultipleSelection: false,
				quality: 1,
				exif: true
			})
			// console.log(result)
			if(!result.cancelled) {
				let image = this.state.image
				image.uri = result.uri
				console.log(result)
				// console.log(image.data)
				image.dimensions = [result.width, result.height]
				if(result.exif.hasOwnProperty('GPSLatitude') && result.exif.hasOwnProperty('GPSLongitude'))
					image.coordinates = [result.exif.GPSLatitude, result.exif.GPSLongitude]
				this.setState({
					image: image,
					firstOpen: false
				})
				console.log("User selected image")
			} else {
				console.log("User haven't selected image")
				this.props.navigation.goBack()
			}
		} catch (error) {
			console.log("Error opening image selector. " + error)
		}
	}

	getImageSize = async (uri) => {
		let size = await getFileSize(uri)
		let image = this.state.image
		image.size = size
		this.setState({
			image: image,
			gotImageSize: true,
			status: "Got image size."
		})
	}

	getUserEmail = async () => {
		let user_email = await getUser()
		let image = this.state.image
		image.user_email = user_email
		this.setState({
			image: image,
			gotUserEmail: true,
			status: "Got user session."
		})
	}

	createImage = async () => {
		let uri = await moveFile(this.state.image.uri, this.state.image.id)
		let image = this.state.image
		image.uri = uri
		this.setState({
			image: image,
			createdImage: true,
			status: "Created image."
		})
	}

	save = () => {
		if(this.state.image.name != "") {
			console.log("IMAGE URI: " + this.state.image.uri)
			this.createImage().then(() => {
				saveImage(this.state.image).then((result) => {
					if(result == 0) {
						Alert.alert("Success", "Image saved successfully.")
						this.props.route.params.load()
						this.props.navigation.goBack()
					} else if(result == 1) {
						Alert.alert("Warning", "An image with the same name was already registered.")
					} else {
						Alert.alert("Error", "An unexpected error occurred saving the image. Please try again later.")
					}
				}).catch((error) => {
					console.log("Error saving image. " + error)
					Alert.alert("Error", "Couldn't save image. Please try again later.")
				})
			}).catch((error) => {
				console.log("Error moving file from cache. " + error)
				Alert.alert("Error", "Couldn't retrieve image from cache.")
			})
		} else {
			Alert.alert("Warning", "The name field can't be empty.")
		}
	}
	
	render() {
		if(this.state.firstOpen) { // open the image library only in the first activity render
			this.upload() // open image library
		}
		var targetWidth, targetHeight
		if(!this.state.firstOpen && this.state.image.uri != "") { // image was uploaded
			targetWidth = Dimensions.get('window').width - (2 * 15)
			targetHeight = this.state.image.dimensions[1] / (this.state.image.dimensions[0] / targetWidth)
			if(!this.state.gotImageSize) { // get image size
				this.getImageSize(this.state.image.uri)
			}
			if(!this.state.gotUserEmail) { // get current user email
				this.getUserEmail()
			}
		}

		// console.log(this.state.image)
		console.log(this.state.status)

		return(
			<View style={containers.container}>
				<ScrollView>
					<View style={{paddingBottom: 15}}>
						<Text style={text.formLabel}> Image name </Text>
						<TextInput style={containers.textInput} onChangeText={ (name) => this.updateName(name)}/>
					</View>
					{this.state.image.uri != "" &&
						<Image source={{uri: 'file://' + this.state.image.uri}} style={{width: targetWidth, height: targetHeight}} />
					}
				</ScrollView>
				{this.state.image.uri != "" &&
					<TouchableOpacity style={containers.button} onPress={ () => this.save() }>
						<Text style={text.buttonText}> Save </Text>
					</TouchableOpacity>
				}
			</View>
		)
	}
}
