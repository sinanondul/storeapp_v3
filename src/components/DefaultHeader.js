import React from "react";
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';

import { openDrawer } from "../../App";
import styles from "./styles";

export default class DefaultHeader extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <Appbar.Header>
                {this.props.mainScreen 
                    ? <Appbar.Action icon={"menu"} onPress={openDrawer}/>
                    : <Appbar.BackAction onPress={this.props.navigation.goBack()} />
                }
                <Appbar.Content title={this.props.title}/>
                <Appbar.Action icon="magnify"/>
                <Appbar.Action icon="dots-vertical" />
            </Appbar.Header>
        );
    }
}