import { ScaleFromCenterAndroid } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';
import React from 'react';
import { View } from 'react-native';
import styles from "../styles";

class CommentsScreen extends React.Component {
    state={
        comments=[],
    }
    componentDidMount(){
        
        comments =this.props.comments;
    }

    renderItem = ({ item }) => {
        return <CommentItem {...this.props} post={item} />;
      };

    render(){
        return(
        <SafeAreaView style={styles.container}>
            <FlatList
              style={styles.feed}
              data={this.state.posts.sort((a, b) => b.timestamp - a.timestamp)}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            ></FlatList>
            <DefaultFooter {...this.props} />
        </SafeAreaView>
        );
    };
    
}

export default CommentsScreen;