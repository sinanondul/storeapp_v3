import React from "react";
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';

import MessagesIcon from './MessagesIcon';
import AddIcon from './AddIcon';
import NotificationsIcon from './NotificationsIcon';
import styles from "./styles";

export default class DefaultHeader extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <Appbar style={styles.footerContainer}>
                <MessagesIcon {...this.props}/>
                <AddIcon/>
                <NotificationsIcon {...this.props}/>
            </Appbar>
        );
    }
}