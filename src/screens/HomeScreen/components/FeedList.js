import React from "react";
import { View, Text, FlatList, Alert, Platform } from "react-native";

import firebase from 'firebase';

import FeedItem from './FeedItem';
import styles from ".././styles";

export default class FeedList extends React.Component {

    state = {
        posts: [],
    }

    componentDidMount() {
        let postsArray = [];
        let postsQuery;
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
                        chatsArray[index] = newPostData;
                    }
                    else if (change.type === 'removed') 
                    {
                      //Modifying previously added chat. 
                      const index = postsArray.findIndex((item) => item.id === newPostData.id)
                      postsArray.splice(index, 1);
                    }
                });
                this.setState({ posts: postsArray });
            });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    renderItem = ({ item }) => {
        return <FeedItem {...this.props} post={item} profileRoute={"ProfileFromHome"} />;
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
