
import React from 'react';
import { StyleSheet } from 'react-native';

import colors from './colors'

const text = StyleSheet.create({
    formLabel: {
        color: 'gray',
        fontSize: 15,
        marginBottom: 10
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
    },
    linkButton: {
        color: colors.primary,
        fontSize: 15,
        fontWeight: 'bold'
    },
    detailsText: {
        color: 'gray',
        paddingTop: 15,
        fontSize: 15
    }
})

export default text