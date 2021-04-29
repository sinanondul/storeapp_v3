import React from "react";
import { View, ScrollView, Text, FlatList, Alert, Platform, RefreshControl } from "react-native";

import firebase from 'firebase';

import AdItem from './AdItem'
import FeedItem from './FeedItem';
import styles from ".././styles";

const adStep = 10;

export default class FeedList extends React.Component {

    constructor(props) {
        super(props)
        this.onRefresh = this.onRefresh.bind(this);
        this.onEndReached = this.onEndReached.bind(this);
    }

    state = {
        posts: [],
        startAfter: null,
        refreshing: false,
        adCount: 0,
        batchIndex: 0,
    }

    componentDidMount() {
        let postsArray = [];
        const postsExist = !(this.props.followingOnly && Object.keys(this.props.userData.following).length <= 0);
        if (postsExist)
        {
            const followingOnly = this.props.followingOnly;

            this.getPostBatch({postsArray: postsArray, followingOnly: followingOnly}).then(lastPostItem => {
                this.setState({startAfter: lastPostItem})
            })
        }
    }

    componentWillUnmount() {
        // this._unsubscribe();
    }

    wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    getPostBatch({postsArray, batchIndex = 0, batchSize = 10, startAfter = null, followingOnly = false, orderByUpCount = false}) {
        let postsQuery = firebase.firestore().collection('posts');
        const perLoadCount = batchSize;

        //Checking whether to show only posts from followed users.
        if (followingOnly){
            postsQuery = postsQuery.where('uid', 'in', Object.keys(this.props.userData.following));
        }

        //Setting ordering method.
        orderByUpCount
        ?   postsQuery = postsQuery.orderBy('upCount', 'desc')
        :   postsQuery = postsQuery.orderBy('timestamp', 'desc')

        //Checking if first batch.
        postsQuery = startAfter
            ?   orderByUpCount
                ?   postsQuery.startAfter(startAfter.upCount).limit(perLoadCount)
                :   postsQuery.startAfter(startAfter.timestamp).limit(perLoadCount)
            :   postsQuery.limit(perLoadCount)
        
        return new Promise((resolve, reject) => {
            postsQuery.get().then(postsSnapshot => {
                postsSnapshot.docs.forEach((postDoc, index, array) => {
                    const postData = postDoc.data();
                    const uped = postDoc.id in this.props.userData.upedPosts;
                    const faved = postDoc.id in this.props.userData.favPosts;
                    
                    const newPostData = {
                        id: postDoc.id,
                        name: postData.name,
                        text: postData.text,
                        timestamp: postData.timestamp,
                        image: postData.image,
                        senderId: postData.uid,
                        upCount: postData.upCount,
                        comments: postData.comments,
                        commentCount: postData.commentCount,
                        uped: uped,
                        faved: faved,
                    };
                    postsArray.push(newPostData);
                    if (index === array.length - 1) {
                        // const adItem = {id: 'ad000' + batchIndex, isAd: true};
                        // postsArray.splice(batchIndex * batchSize + this.state.adCount , 0, adItem);
                        this.setState({posts: postsArray, adCount: this.state.adCount + 1})
                        resolve(newPostData);
                    }
                })
            })
        })
    }

    onRefresh() {
        this.setState({refreshing: true, batchIndex: 0, startAfter: null, adCount: 0});
        this.wait(2000).then(() => {
            this.setState({refreshing: false});

            let postsArray = [];
            const postsExist = !(this.props.followingOnly && Object.keys(this.props.userData.following).length <= 0);
            if (postsExist)
            {
                
                const followingOnly = this.props.followingOnly;

                this.getPostBatch({postsArray: postsArray, followingOnly: followingOnly}).then(lastPostItem => {
                    this.setState({startAfter: lastPostItem})
                })
            }
        })
    }

    onEndReached() {
        let postsArray = this.state.posts;
        const batchIndex = this.state.batchIndex + 1;
        const postsExist = !(this.props.followingOnly && Object.keys(this.props.userData.following).length <= 0);
        if (postsExist)
        {
            
            const followingOnly = this.props.followingOnly;

            this.getPostBatch({postsArray: postsArray, followingOnly: followingOnly, batchIndex: batchIndex, startAfter: this.state.startAfter})
            .then(lastPostItem => {
                this.setState({startAfter: lastPostItem, batchIndex: batchIndex})
            })
        }
    }

    renderItem = ({ item }) => {
        return (
            item.isAd 
            ?   <AdItem/>
            :   <FeedItem {...this.props} post={item} profileRoute={"ProfileFromHome"} toggleCommentsModal={this.props.toggleCommentsModal}/>
        );
    }

    render() {
        return (
            <View>
                {this.state.posts.length > 0
                    ?   <FlatList
                            style={styles.myposts}
                            //horizontal
                            data={this.state.posts}
                            renderItem={this.renderItem}
                            keyExtractor={(item) => item.id} 
                            nestedScrollEnabled
                            showsVerticalScrollIndicator={true}
                            extraData={this.state}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.onRefresh}
                                />
                            }
                            onEndReached={this.onEndReached}
                            onEndReachedThreshold={1}
                    
                        />
                    :   <ScrollView 
                            contentContainerStyle={styles.emptyFeedContainer}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.onRefresh}
                                />
                            }
                        >   
                            <View style={styles.emptyFeedContainer}>
                                <View style={styles.emptyFeedCard}>
                                    <Text style={styles.emptyFeedText}>
                                        Nothing here...
                                    </Text>
                                </View>
                            </View>
                        </ScrollView>
                }
            </View>
        );
    }
}
