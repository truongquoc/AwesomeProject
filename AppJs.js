/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect, useState} from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button,
  AppState
} from 'react-native';
import NotifService from './NotifService';
import RNAndroidNotificationListener from 'react-native-android-notification-listener';
import styles from './styles';
import {BlockingQueueWithAsyncStorage} from './config/AsynStorage';

function App() {
  const [registerToken, setRegisterToken] = useState("");
  const [fcmRegistered, setFcmRegistered] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  const handleOnPressPermissionButton = async () => {
    /**
     * Open the notification settings so the user
     * so the user can enable it
     */
    RNAndroidNotificationListener.requestPermission()
}

const handleAppStateChange = async (
  nextAppState,
  force = false
) => {
  if (nextAppState === 'active' || force) {
      const status =
          await RNAndroidNotificationListener.getPermissionStatus()
      setHasPermission(status !== 'denied')
  }
}

  const onRegister = (token)  =>{
    console.log('on registered', token);
    setRegisterToken(token.token);
    setFcmRegistered(true);
  }

  const onNotif = (notif) => {
    console.log('on notif', notif);
    Alert.alert(notif.title, notif.message);
  }

  const handlePerm = (perms) => {
    Alert.alert('Permissions', JSON.stringify(perms));
  }

  const notif  = new NotifService(onRegister, onNotif);
  blockingQueueStorage = new BlockingQueueWithAsyncStorage("payment-"); 
  
  useEffect(() => {
    /** set interval to frequently check if there is an available message notification in asyn storage */
    const interval = setInterval(() => {
      console.log('is processing', blockingQueueStorage.isProcessing);
        blockingQueueStorage.processingItem();
    }, 3000);

    const listener = AppState.addEventListener(
      'change',
      handleAppStateChange
    );
    return () => {
      clearInterval(interval);
      listener.remove();
    }
  },[]);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Example app react-native-push-notification
      </Text>
      <View style={styles.spacer}></View>
      <TextInput
        style={styles.textField}
        value={registerToken}
        placeholder="Register token"
      />
      <View style={styles.spacer}></View>
      <Button
        title='Open Configuration'
        onPress={handleOnPressPermissionButton}
        disabled={hasPermission}
      />
      <Text
          style={[
              styles.permissionStatus,
              { color: hasPermission ? 'green' : 'red' },
          ]}>
          {hasPermission
              ? 'Allowed to handle notifications'
              : 'NOT allowed to handle notifications'}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.localNotif();
        }}>
        <Text>Local Notification (now)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log("popInitialNotification");
          notif.localNotif('sample.mp3');
        }}>
        <Text>Local Notification with sound (now)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.scheduleNotif();
        }}>
        <Text>Schedule Notification in 30s</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.scheduleNotif('sample.mp3');
        }}>
        <Text>Schedule Notification with sound in 30s</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.cancelNotif();
        }}>
        <Text>Cancel last notification (if any)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.cancelAll();
        }}>
        <Text>Cancel all notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.checkPermission(handlePerm);
        }}>
        <Text>Check Permission</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // RNAndroidNotificationListener.requestPermission()
          notif.requestPermissions();
        }}>
        <Text>Request Permissions</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.abandonPermissions();
        }}>
        <Text>Abandon Permissions</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.getScheduledLocalNotifications(notifs => console.log(notifs));
        }}>
        <Text>Console.Log Scheduled Local Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.getDeliveredNotifications(notifs => console.log(notifs));
        }}>
        <Text>Console.Log Delivered Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.createOrUpdateChannel();
        }}>
        <Text>Create or update a channel</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log("popInitialNotification");
          notif.popInitialNotification();
        }}>
        <Text>popInitialNotification</Text>
      </TouchableOpacity>

      <View style={styles.spacer}></View>

      {fcmRegistered && <Text>FCM Configured !</Text>}

      <View style={styles.spacer}></View>
    </View>
  );
}

export default App;