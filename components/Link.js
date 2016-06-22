/**
 * React Native BBC News
 * https://github.com/tengontheway/RNBBCNews
 * 参考:@SpikeKing
 * @Evil.T
 * 
 * 文本链接
 **/
'use strict';

import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    Linking // LinkingIOS被遗弃, 使用Linking代替
} from 'react-native';

class Link extends Component {
    constructor(props) {
        super(props);
    }

    pressedURL() {
        console.log('hi', this.props.url)

        // 跳转链接
        Linking.openURL(this.props.url)
    }

    render() {
        return (
            <Text style={styles.hyperlink}
                onPress={() => this.pressedURL }>
                {this.props.children}
            </Text>
        );
    }
}

var styles = StyleSheet.create({
    hyperlink: {
        color: 'black',
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    }
});

export default Link;