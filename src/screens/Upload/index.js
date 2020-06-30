
import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, Alert, Image, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Exif from 'react-native-exif';

/*
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { fetch, decodeJpeg } from '@tensorflow/tfjs-react-native';*/

import containers from '../../style/containers';
import text from '../../style/text';

import saveImage from '../../utils/saveImage';
import getUser from '../../utils/getUser';
import getFileSize from '../../utils/getFileSize';

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
				quality: 1
			})
			if(!result.cancelled) {
				let image = this.state.image
				image.uri = result.uri
				image.dimensions = [result.width, result.height]
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

	getLatLong = async (uri) => {
		let location = await Exif.getLatLong(uri)
		let image = this.state.image
		image.coordinates = [location.latitude, location.longitude]
		this.setState({
			image: image,
			gotLocation: true,
			status: "Got capture coordinates."
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

	classify = async (uri) => {
		// Load mobilenet.
		const model = await mobilenet.load();

		// Get a reference to the bundled asset and convert it to a tensor
		const image = require('../../../assets/cat.jpg');
		const imageAssetPath = Image.resolveAssetSource(image);
		const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
		const imageData = await response.arrayBuffer();

		const imageTensor = decodeJpeg(imageData);

		const prediction = await model.classify(imageTensor);

		let image_data = this.state.image
		image_data.classification = prediction
		this.setState({
			image: image_data,
			classified: true,
			status: "Classified. Done."
		})
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
		}
		var targetWidth, targetHeight
		if(!this.state.firstOpen && this.state.image.uri != "") { // image was uploaded
			targetWidth = Dimensions.get('window').width - (2 * 15)
			targetHeight = this.state.image.dimensions[1] / (this.state.image.dimensions[0] / targetWidth)
			if(!this.state.gotImageSize) { // get image size
				this.getImageSize(this.state.image.uri)
			}
			if(!this.state.gotLocation) { // get capture coordinates
				this.getLatLong(this.state.image.uri)
			}
			if(!this.state.gotUserEmail) {
				this.getUserEmail()
			}
			/*
			if(this.state.tfReady) {
				if(!this.state.classified) {
					this.classify()
				}
			}*/
		}

		console.log(this.state.image)

		return(
			<View style={containers.container}>
				<ScrollView>
					<View style={{paddingBottom: 15}}>
						<Text style={text.formLabel}> Image name </Text>
						<TextInput style={containers.textInput} onChangeText={ (name) => this.updateName(name)}/>
					</View>
					<Text> {this.state.status} </Text>
					{this.state.image.uri != "" &&
						<Image source={{uri: this.state.image.uri}} style={{width: targetWidth, height: targetHeight}} />
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
