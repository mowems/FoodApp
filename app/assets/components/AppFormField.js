import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import { useFormikContext } from 'formik';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function AppFormField({ fieldName, iconName, ...otherProps }) {
  const { errors, handleChange, setFieldTouched, touched } = useFormikContext();

  return (
    <>
      <Text style={styles.labelText}>{fieldName}</Text>
      <View style={styles.container}>
        <TextInput
          onChangeText={handleChange(fieldName)}
          onBlur={() => setFieldTouched(fieldName)}
          style={styles.textInput}
          {...otherProps}
        />
        <MaterialCommunityIcons
          name={iconName}
          size={20}
          color='#716f6f'
          style={styles.icon}
        />
      </View>
      {touched[fieldName] &&
        <Text style={{ fontSize: 10, color: 'red' }}>{errors[fieldName]}</Text>
      }
    </>
  );
}

export default AppFormField;

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    right: 20,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    fontWeight: '500',
    width: '100%',
    padding: 10,
    height: 40,
    marginVertical: 10,
    fontFamily: 'Inter-Regular',
  },
  labelText: {
    color: 'black',
    fontSize: 12,
    marginLeft: 5,
    fontFamily: 'Inter-Medium',
    height: 15,
  },
});