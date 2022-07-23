import PushNotification from 'react-native-push-notification';

const LOCAL_CHANEL_ID = 'local-notif';

export const sendLocalNotification = (title, message) => {
  PushNotification.localNotification({
    channelId: LOCAL_CHANEL_ID,
    title,
    message,
  });
};

export const sendScheduleNotification = (title, message, date) => {
  PushNotification.localNotificationSchedule({
    channelId: LOCAL_CHANEL_ID,
    title,
    message,
    date,
  });
};
