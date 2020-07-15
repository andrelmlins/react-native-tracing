import React, {useState, useEffect} from 'react';
import {
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  FlatList,
  NativeEventEmitter,
} from 'react-native';
import SpecialBle from 'rn-contact-tracing';

const App = () => {
  const [tokens, setTokens] = useState([]);
  const [config, setConfig] = useState({
    serviceUUID: '',
    scanDuration: 0,
    scanInterval: 0,
    advertiseInterval: 0,
    advertiseDuration: 0,
    advertiseMode: 0,
    token: 'default_token',
  });

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(SpecialBle);
    eventEmitter.addListener('scanningStatus', status => {
      //
    });
    eventEmitter.addListener('advertisingStatus', status => {
      //
    });
    getConfigs();
  }, []);

  const getStart = async () => {
    await SpecialBle.setConfig(config);
    await SpecialBle.startBLEService();
  };

  const getDevices = () => {
    SpecialBle.fetchInfectionDataByConsent(res => {
      const devicesToken = JSON.parse(res).days[new Date().getDate() - 1];

      setTokens(devicesToken.reduce((acc, item) => [...acc, ...item], []));
    });
  };

  const getConfigs = () => {
    SpecialBle.getConfig(config => {
      setConfig({
        ...config,
        notificationLargeIconPath: 'large_icon.png',
        notificationSmallIconPath: 'small_icon',
        disableBatteryOptimization: false,
      });
    });
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.root}>
        <Text style={{marginBottom: 32, fontSize: 35}}>
          Example - React Native Tracing
        </Text>
        <Button onPress={() => getStart()} title="Start Tracing"></Button>
        <View style={{marginTop: 16}}>
          <Button
            onPress={() => getDevices()}
            title="Read Token Devices"></Button>
        </View>
      </ScrollView>
      <View style={{paddingHorizontal: 16}}>
        <FlatList
          data={tokens}
          renderItem={({item}) => <Text>{item}</Text>}
          keyExtractor={item => item}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {padding: 16},
});

export default App;
