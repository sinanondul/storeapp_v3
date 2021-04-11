import React from "react";
import { View, Text, FlatList, Alert, Platform } from "react-native";

import firebase from 'firebase';

import FeedItem from '../../HomeScreen/components/FeedItem';
import styles from ".././styles";

function isNew(prevPosts, newIds) {

    //Check if either or both are null.
    if ((!prevPosts && newIds) || (prevPosts && !newIds)) {
        return true;
    }
    else if (!prevPosts && !newIds){
        return false;
    }
    else {

        //Check if lengths are different.
        if (prevPosts.length !== newIds.length) {
            return true;
        }
        else {

            //Check if ids match.
            const difference = newIds.filter(id => !prevPosts.some(post => post.id === id));
            if (difference && difference.length > 0) {
                return true;
            }
            else {
                return false;
            }

        }
    }
}

export default class PostList extends React.Component {

    state = {
        posts: [],
    }

    getPosts() {
        this.setState({posts: []});
        let postsArray = [];
        const postsRef = firebase.firestore().collection('posts');
        Object.keys(this.props.postIds).forEach(postId => {
            postsRef
            .doc(postId)
            .get()
            .then(postDoc => {
                const newPost = postDoc.data();
                const uped = postDoc.id in this.props.userData.upedPosts;
                const faved = postDoc.id in this.props.userData.favPosts;
                const newPostData = {
                    id: postDoc.id,
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
                postsArray.push(newPostData);
                this.setState({posts: postsArray})
            })
        })
    }

    componentDidMount() {
        this.getPosts();
        this._unsubscribeFocus = this.props.navigation.addListener('focus', () => {
            this.getPosts();
            // let postsArray = this.state.posts;
            // postsArray.forEach(post => {
            //     if (post.uped && !Object.keys(this.props.userData.upedPosts).some(postId => post.id === postId)) {
            //         Alert.alert("howdy")
            //         post.uped = false;
            //     }
            //     else if (!post.uped && Object.keys(this.props.userData.upedPosts).some(postId => post.id === postId)) {
            //         post.uped = true;
            //     }

            //     if (post.faved && !Object.keys(this.props.userData.favPosts).some(postId => post.id === postId)) {
            //         post.faved = false;
            //     }
            //     else if (!post.faved && Object.keys(this.props.userData.favPosts).some(postId => post.id === postId)) {
            //         post.faved = true;
            //     }
            // })
            // this.setState({posts: postsArray})
        })
        this._unsubscribeBlur = this.props.navigation.addListener('blur', () => {
            this.setState({posts: []})
        })
    }

    componentWillUnmount() {
        this._unsubscribeFocus();
        this._unsubscribeBlur();
    }

    renderItem = ({ item }) => {
        return <FeedItem {...this.props} post={item} profileRoute={"ProfileFromProfile"} ownerId={this.props.ownerId}/>;
    }

    render() {
        return (
            <View>
                <FlatList
                    style={styles.myposts}
                    //horizontal
                    data={this.state.posts.sort((a, b) => b.timestamp - a.timestamp)}
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
