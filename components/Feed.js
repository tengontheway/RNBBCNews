/**
 * React Native BBC News
 * https://github.com/tengontheway/RNBBCNews
 * 参考:@SpikeKing
 * @Evil.T
 * 
 * step:
 * 1.创建ListView填充数据
 * 2.加载内容中渲染loading 加载结束渲染每个数据项
 * 
 * Promise用法参考:https://wohugb.gitbooks.io/ecmascript-6/content/docs/promise.html
 */
'use strict';

import React, { Component } from 'react';
import {
    AppRegistry,
    View,
    StyleSheet,
    ListView,
    ActivityIndicatorIOS,
    RefreshControl
} from 'react-native';

import Story from './Story.js';

class Feed extends Component {
    // 构造函数
    constructor(props) {
        super(props);

        var dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });

        this.state = {
            dataSource: dataSource,
            loaded: false,
            isAnimatting: true,
            isRefreshing: false
        }
    }

    // 控件加载结束
    componentDidMount() {
        this._fetchData();
    }

    // 异步获取数据
    // Promise用法参考:https://wohugb.gitbooks.io/ecmascript-6/content/docs/promise.html
    _fetchData() {
        this.setState({
            isRefreshing: true
        });

        fetch(`http://trevor-producer-cdn.api.bbci.co.uk/content${this.props.collection || '/cps/news/world'}`)
            .then((response) => response.json())
            .then((responseData) => this._filterNews(responseData.relations))
            .then((newsItems) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(newsItems),
                    loaded: true,
                    isAnimatting: false,
                    isRefreshing: false,
                });
            })
            .done();
    }

    // 过滤新闻
    _filterNews(news = []) {
        return new Promise((resolve, reject) => {
            const filtered = news.filter(item => {
                return item.content.format === 'bbc.mobile.news.format.textual'
            });

            resolve(filtered);
        })
    }

    // 加载中...
    _renderLoading() {
        return (
            <ActivityIndicatorIOS
                style={styles.indicator}
                animating={this.state.isAnimatting}
                size={'large'} />
        );
    }

    // 渲染行数据
    _renderRow(rowData) {
        return (
            <Story story={rowData} navigator={this.props.navigator} />
        );
    }

    render() {
        if (!this.state.loaded) {
            return this._renderLoading();
        }

        return (
            <ListView
                style={styles.listview}
                dataSource={this.state.dataSource}
                renderRow={(rowData) => this._renderRow(rowData) }
                contentInset={{top:0, left:0, bottom: 64, right: 0}}
                refreshControl = {
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={() => this._fetchData }
                        tintColor={'#BB1919'}
                        title={'Loading...'}
                        progressBackgroundColor='#00ff00'
                        />
                }
                >
            </ListView>
        );
    }
}

const styles = StyleSheet.create({
    indicator: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listview: {
        backgroundColor: '#eee',
    },

});




export default Feed;