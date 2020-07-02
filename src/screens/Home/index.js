
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

import containers from '../../style/containers';
import text from '../../style/text';
import getUserImages from '../../utils/getUserImages';
import UserGallery from '../../components/UserGallery';
import getUser from '../../utils/getUser';
import clearData from '../../utils/clearData';

export default class Home extends Component {

	state = {
		images: [],
		firstRender: true
	}

	updateImages = (images) => {
		this.setState({ images: images })
	}

	setRendered = () => {
		this.setState({firstRender: false})
	}

	/* 
		example image object

		{
			id: 12345,
			user_email: "",
			uri: "",
			name: "Example Name",
			size: 1024,
			dimensions: [1920, 1080],
		}
	*/

	upload = () => {
		this.props.navigation.navigate('Upload', {load: this.load.bind(this)})
	}

	load = () => {
		getUser().then((user_email) => {
			getUserImages(user_email).then((images) => {
				if(images != 1) {
					if(images.length != this.state.images.length) {
						// console.log("UPDATING STATE")
						this.setState({
							images: images,
							firstRender: false
						})
					}
				} else {
					Alert.alert("Error", "Error getting images.")
				}
				
			})
		})
	}

	render() {
		this.load()
		return(
			<View style={containers.container}>
				<UserGallery images={this.state.images} navigation={this.props.navigation} route={this.props.route}/>
				<TouchableOpacity style={containers.button} onPress={ () => this.upload() }>
					<Text style={text.buttonText}> Upload Image </Text>
				</TouchableOpacity>
				{/*
				<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
					<TouchableOpacity style={containers.button} onPress={ () => this.load() }>
						<Text style={text.buttonText}> Reload </Text>
					</TouchableOpacity>
					<TouchableOpacity style={containers.button} onPress={ () => clearData() }>
						<Text style={text.buttonText}> Clear Data </Text>
					</TouchableOpacity>
				</View>*/
				}
			</View>
		)
	}
}
