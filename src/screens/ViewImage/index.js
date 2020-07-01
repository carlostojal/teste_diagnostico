
import React, { Component } from 'react';
import { View, Image } from 'react-native';

import containers from '../../style/containers';

export default class ViewImage extends Component {

    render() {
        this.props.navigation.setOptions({ title: this.props.route.params.image.name })
        return(
            <View style={{flex: 1}}>
                <Image resizeMode="contain" source={{uri: this.props.route.params.image.data}} style={containers.image}/>
            </View>
        )
    }
}