/**
 * React Native BBC News
 * https://github.com/tengontheway/RNBBCNews
 * 参考:@SpikeKing
 * @Evil.T
 * 
    |         新闻图片          |
    |         新闻内容          |
    |     时间   |  同类文章     |
    显示内容参照: doc/NewsFormat.json
 */
'use strict';

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight
} from 'react-native';

import moment from 'moment';
import Feed from './Feed.js';
import StoryDetail from './StoryDetail.js';


class Story extends Component {
    constructor(props) {
        super(props);
    }

    // 点击列表项
    _onPressedItem(story) {
        this.props.navigator.push({
            component: StoryDetail,
            title: this._truncateTitle(story.content.name),
            passProps: {
                story, navigator: this.props.navigator
            }
        });
    }

    // 截取字符串
    _truncateTitle(title) {
        if (title.length > 15) {
            return `${title.substring(0, 15)}...`;
        } else {
            return title;
        }
    }

    // 点击同类型文章
    // @param collection 同类文章的json结构
    _onPressedCollection(collection) {
        this.props.navigator.push({
            component: Feed,
            title: collection.content.name,
            passProps: {
                collection: collection.content.id,      //同类文章的相对网址
                navigator: this.props.navigator
            }
        });
    }

    // 获得列表项的文章类型
    _getCollectionForStory(story) {
        if (story.content.relations && story.content.relations.length) {
            return story.content.relations.find(item => {
                return item.primaryType === 'bbc.mobile.news.collection';
            });
        } else {
            throw 'No collection found';
        }
    }

    render() {
        var story = this.props.story;
        var time = moment.unix(story.content.lastUpdated / 1000).fromNow();     //处理时间:XX小时前
        var collection = this._getCollectionForStory(story) || {};  //文章类型

        return (
            <TouchableHighlight
                underlayColor={'white'}
                onPress={() => this._onPressedItem(story)}>
                <View>
                    <View style={styles.imgFlex}>
                        <View style={styles.imgContainer}>
                            <Image style={styles.flex} source={{ uri: story.content.relations[0].content.href }} />
                        </View>
                    </View>

                    <View style={styles.flexText}>
                        <Text style={styles.head}>{story.content.name}</Text>

                        <View style={styles.foot}>
                            <Text style={styles.timestamp}>{time}</Text>
                            <Text style={styles.border}>|</Text>
                            <TouchableHighlight onPress={() => this._onPressedCollection(collection) }>
                                <Text style={styles.collect}>
                                    {collection.content ? collection.content.name : ''}
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    imgFlex: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        marginLeft: 5,
        marginRight: 5,
    },
    imgContainer: {
        flex: 1,
        height: 200,
        alignItems: 'stretch'
    },
    flexText: {
        flex: 0,
    },
    foot: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    head: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 3,
    },
    timestamp: {
        flex: 0,
        margin: 3,
    },
    border: {
        padding: 3,
        borderLeftWidth: 1,
        borderLeftColor: 'black',
        borderStyle: 'solid'
    },
    collect: {
        color: 'red',
        margin: 3,
    }
});

export default Story;