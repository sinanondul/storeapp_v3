import React from "react";
import { View } from "react-native";
import { Avatar } from "react-native-paper";
import { Image } from "react-native-expo-image-cache";

function capitalizeFirstOfEach(words) {
  var separateWord = words.toLowerCase().split(" ");
  for (var i = 0; i < separateWord.length; i++) {
    separateWord[i] =
      separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
  }
  return separateWord.join(" ");
}

function upperCaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getName(info) {
  var nameString = info.name;
  const index = nameString.indexOf(" ");
  if (index > 0) {
    nameString = nameString.substr(0, nameString.indexOf(" "));
  }
  return upperCaseFirst(nameString);
}

function getFullName(info) {
  return capitalizeFirstOfEach(info.fullName);
}

function getAvatarTag(info) {
  return (info.name.charAt(0) + info.surename.charAt(0)).toUpperCase();
}
function getHandle(info) {
  return info.handle ? info.handle : "";
}
function getAbout(info) {
  return info.about;
}
function getPhone(info) {
  return info.phone;
}
function getLocation(info) {
  return info.location;
}
function getDepartment(info) {
  return info.department;
}
function getFollowingCount(info) {
  return Object.keys(info.following).length;
}
function getFollowersCount(info) {
  return Object.keys(info.followers).length;
}
function getFollowing(info) {
  return info.following;
}
function getFollowers(info) {
  return info.followers;
}

function getPostCount(info) {
  return 0;
  // return Object.keys(info.following).length;
}

function getAvatar(info, size = 40) {
  if (!(info.avatar == null)) {
    return (
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          overflow: "hidden",
        }}
      >
        <Image
          {...{ uri: info.avatar }}
          style={{
            width: size,
            height: size,
          }}
          resizeMode={"stretch"}
        />
      </View>
    );
  } else {
    return (
      <Avatar.Text
        size={size}
        label={getAvatarTag(info)}
        style={{ backgroundColor: "#f4511e" }}
      />
    );
  }
}

function getGroupChatName(info) {
  // return capitalizeFirstOfEach(info.name);
  return info.name;
}

function getGroupChatAvatarTag(info) {
  return info.name.charAt(0).toUpperCase();
}

function getGroupChatAvatar(info, size = 40) {
  if (!(info.avatar == null)) {
    return <Avatar.Image size={size} source={info.avatar} />;
  } else {
    return (
      <Avatar.Text
        size={size}
        label={getGroupChatAvatarTag(info)}
        style={{ backgroundColor: "#f4511e" }}
      />
    );
  }
}

export {
  getName,
  getFullName,
  getAvatarTag,
  getAvatar,
  getGroupChatName,
  getGroupChatAvatar,
  getAbout,
  getLocation,
  getHandle,
  getPhone,
  getDepartment,
  getFollowersCount,
  getFollowingCount,
  getPostCount,
  getFollowers,
  getFollowing,
};
