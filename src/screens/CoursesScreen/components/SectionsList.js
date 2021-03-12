import React from "react";
import {View, Text, FlatList, Alert, Platform} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import BottomRightButton from '../../../components/BottomRightButton';

import CourseItem from './CourseItem';
import styles from "./styles";

export default class SectionsList extends React.Component{

  renderItem = ({item}) => {
    return (
        <SectionItem {...this.props} chat={item}/>
    );
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render(){
    const sectionChats = this.props.courseInfo.sectionChats;
    return (
      <View style={styles.container}>
        <FlatList
            data={sectionChats.sort((a, b) => (a.groupChatInfo.name > b.groupChatInfo.name) ? 1 : ((b.groupChatInfo.name > a.groupChatInfo.name) ? -1 : 0))}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            extraData={this.state}
        />
      </View>
    );
  }
}

