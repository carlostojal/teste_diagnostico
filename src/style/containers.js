import React from 'react';
import { StyleSheet } from 'react-native';

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
    image: {
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 30,
        padding: 15,
        marginBottom: 15
    }
})

export default containers