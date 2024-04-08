
import { useCallback } from 'react';
import { Text, View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

function AppTextInput(props) {
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
    <View style={styles.inputContainer} top={props.top} >
      <Text style={styles.labelText}>{props.label}</Text>
      <View style={styles.passwContainer}>
        <TextInput style={styles.textInput} placeholder={props.placeholder} onChangeText={props.onChangeText} name={props.name} />
        {props.icon && (
        <MaterialCommunityIcons
          name={props.icon}
          size={20}
          color='#716f6f'
          style={styles.icon}
        />
      )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  passwContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    right: 20,
  },
  inputContainer: {
    width: "90%",
  },
  labelText: {
    color: 'black',
    fontSize: 15,
    marginLeft: 5,
    fontFamily: 'Inter-Medium',
  },
  textInput: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    fontWeight: '300',
    width: '100%',
    padding: 10,
    marginVertical: 10,
    fontFamily: 'Inter-Thin',
  }
});

export default AppTextInput;