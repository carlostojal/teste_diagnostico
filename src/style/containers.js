import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

import colors from './colors'

const containers = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: 'white'
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 30,
        backgroundColor: 'white',
        fontSize: 15,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: colors.primary,
        borderRadius: 30,
        padding: 15,
    },
    imageContainer: {
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        width: (Dimensions.get('window').width - (2 * 15)) / 4,
        height: (Dimensions.get('window').width - (2 * 15)) / 4
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        borderRadius: 10
    }
})

export default containers