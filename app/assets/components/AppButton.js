import { useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import colors from '../config/colors';
import AppText from './AppText';

function AppButton(props) {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Bold': require('../fonts/Inter-Bold.ttf'),
    'Inter-Medium': require('../fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('../fonts/Inter-Regular.ttf'),
    'Inter-Thin': require('../fonts/Inter-Thin.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <TouchableOpacity onPress={props.onPress}>
       <View style={styles.button} borderRadius={props.borderRadius} backgroundColor={props.backgroundColor} top={props.top} >
        <Text style={{fontFamily: 'Inter-Medium', color: props.color, fontSize: props.fontSize, fontWeight: '600', lineHeight: 18, }}>{props.title}</Text>
       </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: 335,
    height: 54,
  }
})

export default AppButton;