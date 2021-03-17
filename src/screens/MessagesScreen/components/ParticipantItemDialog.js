import React from 'react';
import {View, Text, TouchableOpacity, Alert} from "react-native";
import {Portal, Dialog} from "react-native-paper";
import firebase from 'firebase';
import moment from 'moment';

import {getFullName, getAvatar} from "../../../functions/UserInfoFormatter";
import styles, {ParticipantItemDialogStyles as pageStyles} from './styles';
import Fire from '../../../firebase/Fire';


export default class ParticipantItemDialog extends React.Component{

  constructor(props) {
    super(props)

  }

  componentDidMount() {
  }

  render(){
    const target = this.props.target;
    return (
      <Portal>
        <Dialog visible={true} onDismiss={this.props.toggleDialog} >
          <TouchableOpacity style={pageStyles.row} onPress={() => {
              
              this.props.toggleDialog();
            }}
          >
            <Text style={pageStyles.text}>
              Profile
            </Text>
          </TouchableOpacity>
          { this.props.amAdmin
            ? this.props.target.isAdmin
            ? <TouchableOpacity style={pageStyles.row} onPress={() => {
              
                  this.props.toggleDialog();
                }}
              >
                  <Text style={pageStyles.text}>
                    Remove admin
                  </Text>
                </TouchableOpacity>
              : <TouchableOpacity style={pageStyles.row} onPress={() => {
                    Fire.shared.setAdmin(this.props.chatId, target.uid)
                    this.props.toggleDialog();
                  }}
                >
                  <Text style={pageStyles.text}>
                    Make admin
                  </Text>
                </TouchableOpacity>
            : null
          }
          
          { this.props.amAdmin
            ? <TouchableOpacity style={pageStyles.row} onPress={() => {
              
                this.props.toggleDialog();
              }}
            >
                <Text style={pageStyles.redText}>
                  Remove from group
                </Text>
              </TouchableOpacity>
            : null
          }
        </Dialog>
      </Portal>
    );
  }
}