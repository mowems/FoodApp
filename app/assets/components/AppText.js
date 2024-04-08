import React from 'react';
import { Text, View } from 'react-native';

export default function AppText({ text, style }) {
  return (
      <Text style={[style]}>{text}</Text>
  )
}

