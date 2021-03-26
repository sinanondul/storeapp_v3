import React from "react";
import {View, Text, TouchableOpacity, FlatList, Alert, Platform} from "react-native";
import {Searchbar} from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

import firebase from 'firebase';

import ExpandableCourseItem from './components/ExpandableCourseItem';
import styles from "./styles";

const coursesRef = firebase.firestore().collection('courses');

function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

export default class LandingScreen extends React.Component{

    state={
        loadIndex: 0,
        courses: [],
        searchQuery: '',
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return params;
    };

    renderItem = ({item}) => {
        return (
            <ExpandableCourseItem {...this.props} courseInfo={item} onPress={() => {}}/>
        );
    }

    getCourseItem = (formattedText, limitString, coursesArray, startAfter = null) => {

        const queryBase = coursesRef.where('code', '>=', formattedText.toUpperCase()).where('code', '<', limitString)
        var coursesQuery = startAfter
            ?   queryBase.orderBy('code').startAfter(startAfter.code).limit(1)
            :   queryBase.orderBy('code').limit(1)

        return new Promise((resolve, reject) => {
            coursesQuery.get().then(coursesSnapshot => {
                coursesSnapshot.forEach(courseDoc => {
                    const courseData = courseDoc.data();
                    
                    let courseInfo = {
                        code: courseData.code,
                        color: courseData.color,
                        name: courseData.name,
                        sections: courseData.sections,
                    }
                    if ( !this.props.courses.some(course => course.code === courseInfo.code) &&
                        !this.state.courses.some(course => course.code === courseInfo.code) ) {
                        coursesArray.push(courseInfo);
                        this.setState({courses: coursesArray})
                        resolve(courseInfo);
                    }
                })
            })
        })
    }

    getCourseItems = (formattedText, limitString, coursesArray, loadIndex, currCount = 0, startAfter = null, maxCount = 10) => {
        if (this.state.loadIndex === loadIndex && currCount < maxCount){
            this.getCourseItem(formattedText, limitString, coursesArray, startAfter).then(courseItem => {
                this.getCourseItems(formattedText, limitString, coursesArray, loadIndex, currCount + 1, courseItem, maxCount)
            })
        }
        else {
            return;
        }
    }

    onChangeSearch = (searchText => {
        
        const loadIndex = this.state.loadIndex + 1;
        this.setState({
            loadIndex: this.state.loadIndex + 1,
            courses: [],
            searchQuery: searchText,
        })

        if (searchText.length > 0) {
            let coursesArray = [];
            const formattedText = searchText.toUpperCase();
            const limitString = formattedText.replace(/.$/, nextChar(formattedText.charAt(formattedText.length - 1)));

            //Getting course document refs.
            let last;
            let currCount = 0;
            setTimeout(() => {
                this.getCourseItems(formattedText, limitString, coursesArray, loadIndex);
            }, 1000);
        }
    })

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render(){
        return (
            <View style={styles.container}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={this.onChangeSearch}
                    value={this.state.searchQuery}
                />
                <FlatList
                    data={this.state.courses}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.code}
                    showsVerticalScrollIndicator={false}
                    extraData={this.state}
                />
            </View>
        );
    }

    static navigationOptions = {
        title: 'Add',
        headerStyle: {
            backgroundColor: "#2890cf",
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        flex: 0.6,
        paddingRight: 60,
        alignSelf: 'center', 
        alignItems: 'center',
        fontWeight: 'bold',
        },
    };
}

