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
        courseInfos: [],
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

    onChangeSearch = (searchText => {
        if (searchText.length > 0) {
            const formattedText = searchText.toUpperCase();
            let coursesArray = [];
            const limitString = formattedText.replace(/.$/, nextChar(formattedText.charAt(formattedText.length - 1)));

            //Getting course document refs.
            var coursesQuery = coursesRef.where('code', '>=', formattedText.toUpperCase()).where('code', '<', limitString).orderBy('code').limit(10);
            var coursesPromise = coursesQuery.get();
            var getCourseRefs = coursesPromise.then(function(coursesSnapshot) {
                var results = [];
                coursesSnapshot.forEach(function(courseDoc) {
                    var docRef = coursesRef.doc(courseDoc.id);
                    results.push(docRef.get());
                })
                return Promise.all(results);
            })

            //Adding course document datas.
            getCourseRefs.then(courseRefs => {
                if (courseRefs.length > 0)  {
                    courseRefs.forEach(courseRef => {
                        const courseData = courseRef.data();
                        let courseInfo = {
                            id: courseRef.id,
                            code: courseData.code,
                            color: courseData.color,
                            name: courseData.name,
                            sections: courseData.sections,
                        }
                        if (!this.props.courses.some(course => course.code === courseInfo.code)) {
                            coursesArray.push(courseInfo);
                        }
                    })
                    this.setState({courseInfos: coursesArray});
                }
                else {
                    this.setState({courseInfos: []})
                }
            })
        }
        else {
            this.setState({courseInfos: []})
        }
        this.setState({searchQuery: searchText});
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
                    data={this.state.courseInfos.sort((a, b) => (a.code > b.code) ? 1 : ((b.code > a.code) ? -1 : 0))}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.id}
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

