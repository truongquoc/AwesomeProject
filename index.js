/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import RNAndroidNotificationListener, { RNAndroidNotificationListenerHeadlessJsName } from 'react-native-android-notification-listener';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from "react-native-push-notification";

const headlessNotificationListener = async ({ notification }) => {
    /**
     * This notification is a JSON string in the follow format:
     *  {
     *      "app": string,
     *      "title": string,
     *      "titleBig": string,
     *      "text": string,
     *      "subText": string,
     *      "summaryText": string,
     *      "bigText": string,
     *      "audioContentsURI": string,
     *      "imageBackgroundURI": string,
     *      "extraInfoText": string,
     *      "groupedMessages": Array<Object> [
     *          {
     *              "title": string,
     *              "text": string
     *          }
     *      ]
     *  }
     */

    if (notification) {
        /**
         * Here you could store the notifications in a external API.
         * I'm using AsyncStorage here as an example.
         */
     
        // console.log("notification", notification);
        // await AsyncStorage.setItem('@lastNotification', notification);
    }
}

// PushNotification.localNotificationSchedule({
//     //... You can use all the options from localNotifications
//     message: "My Notification Messagsse", // (required)
//     date: new Date(Date.now() + 60 * 1000), // in 60 secs
//     allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
  
//     /* Android Only Properties */
//     repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
//   });


AppRegistry.registerHeadlessTask(RNAndroidNotificationListenerHeadlessJsName,	() => headlessNotificationListener)
AppRegistry.registerComponent(appName, () => App);
