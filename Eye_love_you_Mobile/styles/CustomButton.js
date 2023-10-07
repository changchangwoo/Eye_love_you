import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native';

export default class CustomButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { style, textStyle, title, onPress, backgroundColor } = this.props;

        return (
            <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
                <Text style={[styles.title, textStyle]}>{title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FBE3F0',
    },
    title: {
        fontSize: 10,
    },
});
