
import React, { Component } from 'react';
import { View, Image } from 'react-native';

import containers from '../../style/containers';

export default class ViewImage extends Component {

    render() {
        this.props.navigation.setOptions({ title: this.props.route.params.image.name })
        return(
            <View style={{flex: 1}}>
                <Image resizeMode="contain" source={{uri: 'file://' + this.props.route.params.image.uri}} style={containers.fullscreenImage}/>
            </View>
        )
    }
}