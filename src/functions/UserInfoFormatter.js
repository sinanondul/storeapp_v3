import React from "react";
import {Avatar} from 'react-native-paper';

function upperCaseFirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getFullName(info) {
  return upperCaseFirst(info.name) + " " + upperCaseFirst(info.surename);
}

function getAvatarTag(info) {
  return (info.name.charAt(0) + info.surename.charAt(0)).toUpperCase();
}

function getAvatar(info) {
  if (!(info.avatar == null)) {
    return <Avatar.Image size={40} source={info.avatar} />;
  } else {
    return (
      <Avatar.Text
        size={40}
        label={getAvatarTag(info)}
        style={{ backgroundColor: "#f4511e" }}
      />
    );
  }
}

export {getFullName, getAvatarTag, getAvatar}