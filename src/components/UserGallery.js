
import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';

import containers from '../style/containers'

export default class UserGallery extends Component {

	openViewer = (item) => {
		this.props.navigation.navigate('ViewImage', {image: item})
	}

	showDetails = (item) => {
		console.log("ITEM: " + item.key)
		let details = ""
		details += "Name: " + item.name + "\n"
		details += "File name: " + item.uri + "\n"
		details += "Dimensions: " + item.dimensions[0] + "x" + item.dimensions[1] + " px" + "\n"
		details += "Size: " + item.size + "\n"
		details += "Coordinates: "
		if(item.coordinates[0] == 0 && item.coordinates[1] == 0)
			details += "NA"
		else
			details += item.coordinates[0] + ", " + item.coordinates[1]
		details += "\n"
		let date = new Date(item.id)
		details += "Upload date: " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()) + "\n"
		Alert.alert("Details", details)
	}

    render() {
        var dimensions = []
		for(var i = 0; i < this.props.images.length; i++) {
			var width = Dimensions.get('window').width - (4 * 15)
			var height = this.props.images[i].dimensions[1] / (this.props.images[i].dimensions[0] / width)
			dimensions.push([width, height])
        }
        // console.log(this.props.images)
        return(
			<View style = {{flex: 1}}>
				{this.props.images.length > 0 &&
					<FlatList
						style={{flexDirection: 'row'}}
						data = {this.props.images}
						numColumns = {4}
						renderItem = {({item, index}) => (
							<TouchableOpacity key = {item.id} style = {containers.imageContainer} onPress = {() => this.openViewer(item)} onLongPress = {() => this.showDetails(item)}>
								<Image resizeMode="cover" source={{uri: 'file://' + item.uri}} style={containers.image} />
							</TouchableOpacity>
                        )}
                        keyExtractor = {item => item.id.toString()}
					/>
				}
				{this.props.images.length == 0 &&
					<Text> No images. </Text>
				}
			</View>
		)
    }
}