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
  StyleSheet,
  StatusBar,
  NavigatorIOS,
} from 'react-native';

// ES6 中采用import 替换 require
import Feed from './components/Feed.js';

class RNBBCNews extends Component {
  // 设置StatusBar样式
  componentWillMount() {
    // 设置StatusBar的颜色, 默认default是黑色, light-content是白色
    // 参考: https://facebook.github.io/react-native/docs/statusbar.html#barstyle
    StatusBar.setBarStyle('light-content');
  }

  render() {
    return (
      <NavigatorIOS
        style={{flex:1}}
        translucent={false}
        barTintColor={'#BB1919'}
        titleTextColor={'white'}
        tintColor={'white'}
        initialRoute= {{
          component: Feed,
          title: "Feed",
          passProps: {},
        }}
        />
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
});

AppRegistry.registerComponent('RNBBCNews', () => RNBBCNews);
