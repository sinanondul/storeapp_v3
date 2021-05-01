import React from "react";
import { TouchableOpacity, Text, FlatList, Alert, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import Fire from '../../../firebase/Fire';

import styles from "./styles";

export default class PostList extends React.Component {

    state = {
        following: false,
    }

    componentDidMount() {
        const targetId = this.props.targetId;
        const followingArray = Object.keys(this.props.userData.following);
        this.setState({following: followingArray.includes(targetId)})
    }

    componentWillUnmount() {
    }

    toggleFollowing = () => {
        if (!this.state.following) {
            Fire.shared.follow(this.props.userData, this.props.targetId)
            this.props.followerHandler(true);
            this.setState({following: true})
        }
        else {
            Fire.shared.unFollow(this.props.userData, this.props.targetId)
            this.props.followerHandler(false);
            this.setState({following: false})
        }
    }

    render() {
        return (
            <TouchableOpacity 
                style={this.state.following ? styles.followingButton : styles.notFollowingButton} 
                onPress={this.toggleFollowing}
            >
                {   this.state.following
                    ?   
                        <Text style={styles.followingButtonText}>
                            Following
                        </Text>
                    :   <Icon
                            name="add"
                            size={15}
                            color='white'
                            style={{ alignItems: "center", justifyContent: "center" }}
                        >
                            <Text style={styles.followingButtonText}>
                                Follow
                            </Text>
                        </Icon>
                }
               
            </TouchableOpacity>
        );
    }
}
