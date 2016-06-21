/**
 * React Native BBC News
 * https://github.com/tengontheway/RNBBCNews
 * 参考:@SpikeKing
 * @Evil.T
 */
'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  StyleSheet,
  StatusBar,
  NavigatorIOS,
  Text,
  ScrollView
} from 'react-native';

class Feed extends Component {
    // 构造函数
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView>
            <Text>Test Feed</Text>
            </ScrollView>
        );
    }
}

export default Feed;