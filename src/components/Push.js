import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

//press send button on UP
async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "New Message📬",
      body: "How Are You?",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}

//On Message Received
//On Post Upped
//On Post Commented
//On Followed

//dismissAllNotificationsAsync(): Promise<void>

export { schedulePushNotification };
