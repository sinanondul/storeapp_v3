import React from 'react';
import {View, Text, TouchableOpacity, FlatList, Animated, Alert} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import firebase from 'firebase';

import CourseTag from './CourseTag';
import CourseItem from './CourseItem';
import styles from './styles';

function upperCaseFirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export default class ExpandableCourseItem extends React.Component{

    state={
        expanded: false,
        animation: new Animated.Value(80),
        sections: []
    }

    constructor(props) {
        super(props)

    }
    
    //Animation functions

    _setMinHeight(event){
        this.setState({
            minHeight   : event.nativeEvent.layout.height
        });
    }

    _setMaxHeight(event){
        this.setState({
            maxHeight   : event.nativeEvent.layout.height
        });
    }

    toggle(){
        //Step 1
        let initialValue    = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue      = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;
    
        this.setState({
            expanded : !this.state.expanded  //Step 2
        });
    
        this.state.animation.setValue(initialValue);  //Step 3
        Animated.spring(     //Step 4
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start();  //Step 5
    }

    //

    componentDidMount() {
    }

    renderItem = ({item}) => {
        return (
            <TouchableOpacity style={styles.sectionItem}>
                <Text style={styles.sectionItemText}>
                    {upperCaseFirst(item)}
                </Text>
            </TouchableOpacity>
        );
      }

    render(){
        const sectionMap = this.props.courseInfo.sections;
        var sectionNames = Array.from(Object.values(sectionMap));
        return (
            <Animated.View style={[styles.container,{height: this.state.animation}]}>
                <TouchableOpacity 
                    style={styles.container} 
                    onPress={() => this.toggle()}
                    onLayout={this._setMinHeight.bind(this)}
                >
                    <CourseItem {...this.props}/>
                    {   this.state.expanded
                        ?   <Icon 
                                name='chevron-down-outline'
                                size={32} 
                                style={{
                                    position: 'absolute',
                                    top: 25,
                                    right: 10,
                                }}
                            />
                        :   <Icon 
                                name='chevron-forward-outline'
                                size={32} 
                                style={{
                                    position: 'absolute',
                                    top: 25,
                                    right: 10,
                                }}
                            />

                    }
                </TouchableOpacity>
                <View onLayout={this._setMaxHeight.bind(this)}>
                    <FlatList
                        data={sectionNames.sort((a, b) => (a > b) ? 1 : ((b > a) ? -1 : 0))}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        extraData={this.state}
                    />
                </View>
            </Animated.View>
        );
    }
}