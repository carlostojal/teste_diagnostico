
import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity, Image, Dimensions } from 'react-native';

import containers from '../style/containers'
import text from '../style/text'
import getUserImages from '../utils/getUserImages';

export default class UserGallery extends Component {

    render() {
        var dimensions = []
		for(var i = 0; i < this.props.images.length; i++) {
			var width = Dimensions.get('window').width - (4 * 15)
			var height = this.props.images[i].dimensions[1] / (this.props.images[i].dimensions[0] / width)
			dimensions.push([width, height])
        }
        console.log(this.props.images)
        return(
			<View style = {{flex: 1}}>
				{this.props.images.length > 0 &&
					<FlatList
						data = {this.props.images}
						renderItem = {({item, index}) => (
							<TouchableOpacity key = {item.id} style = {containers.image}>
								<Image source={{uri: item.uri}} style={{width: dimensions[index][0], height: dimensions[index][1], borderRadius: 10}} />
								<Text style = {text.detailsText}> {"Name: " + item.name} </Text>
								<Text style = {text.detailsText}> {"Dimensions: " + item.dimensions[0] + "x" + item.dimensions[1] + " px"} </Text>
								<Text style = {text.detailsText}> {"Size: " + item.size} </Text>
								{item.coordinates[0] != 0 && item.coordinates[1] != 0 &&
									<Text style = {text.detailsText}> {"Coordinates: (" + item.coordinates[0] + ";" + item.coordinates[1] + ")"} </Text>
								}
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