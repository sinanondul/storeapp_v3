import React from "react";
import { View, Text, FlatList, Alert, Platform } from "react-native";

import firebase from 'firebase';

import AdItem from './AdItem'
import FeedItem from './FeedItem';
import styles from ".././styles";

const adStep = 10;

export default class FeedList extends React.Component {

    state = {
        posts: [],
        adCount: 0,
    }

    componentDidMount() {
        let postsArray = [];
        let postsQuery;
        if (!(this.props.followingOnly && Object.keys(this.props.userData.following).length <= 0)) {
            if (!this.props.followingOnly){
                postsQuery = firebase.firestore().collection("posts").orderBy("timestamp", 'desc')
            }
            else {
                postsQuery = firebase.firestore().collection("posts")
                .where('uid', 'in', Object.keys(this.props.userData.following)).orderBy("timestamp", 'desc');
            }
            this._unsubscribe = postsQuery
                .onSnapshot((snapshot) => {
                    let changes = snapshot.docChanges();

                    changes.forEach((change) => {
                        const newPost = change.doc.data();
                        const uped = change.doc.id in this.props.userData.upedPosts;
                        const faved = change.doc.id in this.props.userData.favPosts;
                        const newPostData = {
                            id: change.doc.id,
                            name: newPost.name,
                            text: newPost.text,
                            timestamp: newPost.timestamp,
                            image: newPost.image,
                            senderId: newPost.uid,
                            upCount: newPost.upCount,
                            comments: newPost.comments,
                            uped: uped,
                            faved: faved,
                        };
                        if (change.type === "added") {
                            postsArray.push(newPostData);
                        }
                        else if (change.type === 'modified') {
                            const index = postsArray.findIndex((item) => item.id === newPostData.id)
                            postsArray[index] = newPostData;
                        }
                        else if (change.type === 'removed') 
                        {
                            //Modifying previously added chat. 
                            const index = postsArray.findIndex((item) => item.id === newPostData.id)
                            postsArray.splice(index, 1);
                        }
                    });
                    postsArray.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : ((b.timestamp < a.timestamp) ? -1 : 0))
                    postsArray.unshift({id: 'adId0000', isAd: true});
                    this.setState({ posts: postsArray });
                });
        }
    }

    componentWillUnmount() {
        // this._unsubscribe();
    }

    renderItem = ({ item }) => {
        return (
            item.isAd 
            ?   <AdItem/>
            :   <FeedItem {...this.props} post={item} profileRoute={"ProfileFromHome"} />
        );
    }

    render() {
        return (
            <View>
                <FlatList
                    style={styles.myposts}
                    //horizontal
                    data={this.state.posts}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.id} 
                    nestedScrollEnabled
                    showsVerticalScrollIndicator={true}
                    extraData={this.state}
                />
            </View>
        );
    }
}
