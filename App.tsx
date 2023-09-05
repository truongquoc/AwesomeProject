/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Button,
  View,
  Image,
  TouchableOpacity,
  AppState,
  FlatList
} from 'react-native';
import PushNotification from "react-native-push-notification";


import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import RNAndroidNotificationListener from 'react-native-android-notification-listener'


import styles from './styles'


type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View></View>
  );
}

interface INotificationProps {
  time: string
  app: string
  title: string
  titleBig: string
  text: string
  subText: string
  summaryText: string
  bigText: string
  audioContentsURI: string
  imageBackgroundURI: string
  extraInfoText: string
  icon: string
  image: string
  iconLarge: string
}


const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
  
  type ItemProps = {title: string};
  
  const Item = ({title}: ItemProps) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

const Notification: React.FC<INotificationProps> = ({
  time,
  app,
  title,
  titleBig,
  text,
  subText,
  summaryText,
  bigText,
  audioContentsURI,
  imageBackgroundURI,
  extraInfoText,
  icon,
  image,
  iconLarge,
}) => {
  return (
      <View style={styles.notificationWrapper}>
          <View style={styles.notification}>
              <View style={styles.imagesWrapper}>
                  {!!icon && (
                      <View style={styles.notificationIconWrapper}>
                          <Image
                              source={{ uri: icon }}
                              style={styles.notificationIcon}
                          />
                      </View>
                  )}
                  {!!image && (
                      <View style={styles.notificationImageWrapper}>
                          <Image
                              source={{ uri: image }}
                              style={styles.notificationImage}
                          />
                      </View>
                  )}
                  {!!iconLarge && (
                      <View style={styles.notificationImageWrapper}>
                          <Image
                              source={{ uri: iconLarge }}
                              style={styles.notificationImage}
                          />
                      </View>
                  )}
              </View>
              <View style={styles.notificationInfoWrapper}>
                  <Text style={styles.textInfo}>{`app: ${app}`}</Text>
                  <Text style={styles.textInfo}>{`title: ${title}`}</Text>
                  <Text style={styles.textInfo}>{`text: ${text}`}</Text>
                  {!!time && (
                      <Text style={styles.textInfo}>{`time: ${time}`}</Text>
                  )}
                  {!!titleBig && (
                      <Text
                          style={
                              styles.textInfo
                          }>{`titleBig: ${titleBig}`}</Text>
                  )}
                  {!!subText && (
                      <Text
                          style={
                              styles.textInfo
                          }>{`subText: ${subText}`}</Text>
                  )}
                  {!!summaryText && (
                      <Text
                          style={
                              styles.textInfo
                          }>{`summaryText: ${summaryText}`}</Text>
                  )}
                  {!!bigText && (
                      <Text
                          style={
                              styles.textInfo
                          }>{`bigText: ${bigText}`}</Text>
                  )}
                  {!!audioContentsURI && (
                      <Text
                          style={
                              styles.textInfo
                          }>{`audioContentsURI: ${audioContentsURI}`}</Text>
                  )}
                  {!!imageBackgroundURI && (
                      <Text
                          style={
                              styles.textInfo
                          }>{`imageBackgroundURI: ${imageBackgroundURI}`}</Text>
                  )}
                  {!!extraInfoText && (
                      <Text
                          style={
                              styles.textInfo
                          }>{`extraInfoText: ${extraInfoText}`}</Text>
                  )}
              </View>
          </View>
      </View>
  )
}

function localNotif() {
    console.log('localNotif');
    
    PushNotification.localNotification({
      /* Android Only Properties */
      channelId: 'default-channel-id',
      ticker: 'My Notification Ticker', // (optional)
      autoCancel: true, // (optional) default: true
      largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
      smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
      bigText: 'My big text that will be shown when notification is expanded', // (optional) default: "message" prop
      subText: 'This is a subText', // (optional) default: none
      color: 'red', // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      tag: 'some_tag', // (optional) add tag to message
      group: 'group', // (optional) add group to message
      groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
      ongoing: false, // (optional) set whether this is an "ongoing" notification
      actions: ['Yes', 'No'], // (Android only) See the doc for notification actions to know more
      invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

      when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
      usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
      timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

      /* iOS only properties */
      category: '', // (optional) default: empty string

      /* iOS and Android properties */
      title: 'Local Notification', // (optional)
      message: 'My Notification Message', // (required)
      userInfo: { screen: 'home' }, // (optional) default: {} (using null throws a JSON value '<null>' error)
      number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    });
  }

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [hasPermission, setHasPermission] = React.useState<boolean>(false);
  const [lastNotification, setLastNotification] = React.useState<any>(null);


  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleOnPressPermissionButton = async () => { 
    RNAndroidNotificationListener.requestPermission();
  };

 
//   RNAndroidNotificationListener.getPermissionStatus().then((status) => {
//     console.log("status", status);
//   })

  const handleAppStateChange = async (nextAppState: string, force = false) => {
    if (nextAppState === 'active' || force) {
        const status = await RNAndroidNotificationListener.getPermissionStatus();
        
        setHasPermission(status !== 'denied')
    }
  }


  useEffect(() => { 
    
    const listener = AppState.addEventListener(
      'change',
      handleAppStateChange
    )
    
    const interval = setInterval(async () => {
    //   console.log('interval', new Date().toLocaleTimeString());
      const lastStoredNotification = await AsyncStorage.getItem(
        '@lastNotification'
    )
      
    // AsyncStorage.getAllKeys().then((keys) => {
    //   console.log('keys', keys);
    // });
    
    if (lastStoredNotification) {
        // console.log('last notification', lastStoredNotification);
        
        /**
         * As the notification is a JSON string,
         * here I just parse it
         */
        // console.log('lastStoredNotification', lastStoredNotification);
        
        setLastNotification(JSON.parse(lastStoredNotification))
    }
     }, 3000);

    handleAppStateChange('', true)

    return () => {
      listener.remove();
      clearInterval(interval);
  }
  }, []);

  const hasGroupedMessages =
  lastNotification &&
  lastNotification.groupedMessages &&
  lastNotification.groupedMessages.length > 0

  
  return (
    <SafeAreaView style={styles.container}>
            <View style={styles.buttonWrapper}>
                <Text
                    style={[
                        styles.permissionStatus,
                        { color: hasPermission ? 'green' : 'red' },
                    ]}>
                    {hasPermission
                        ? 'Allowed to handle notifications'
                        : 'NOT allowed to handle notifications'}
                </Text>
                <Button
                    title='Open Configuration'
                    onPress={handleOnPressPermissionButton}
                    disabled={hasPermission}
                />
            </View>
            <View></View>
            <View style={styles.notificationsWrapper}>
                {lastNotification && !hasGroupedMessages && (
                    <ScrollView style={styles.scrollView}>
                        <Notification {...lastNotification} />
                    </ScrollView>
                )}
                {lastNotification && hasGroupedMessages && (
                    <FlatList
                        data={lastNotification.groupedMessages}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Notification
                                app={lastNotification.app}
                                {...item}
                            />
                        )}
                    />
                )}
            </View>

            <SafeAreaView style={styles.container}>
                <FlatList
                    data={DATA}
                    renderItem={({item}) => <Item title={item.title} />}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
            <TouchableOpacity
          onPress={() => {
            localNotif();
          }}>
          <Text>Local Notification (now)</Text>
        </TouchableOpacity>
        </SafeAreaView>
  );
}

export default App;
