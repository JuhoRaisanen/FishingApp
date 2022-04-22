import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';

export default function MenuButton (props) {
  return (
    <TouchableOpacity onPress={props.disabled ? null : props.onPress}>
      <View style={[styles.button, {backgroundColor: (props.selected ? "#3891d9" : "#1d4769")}]}>
        <Text style={styles.buttonText}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 10,  
  },
  buttonText: {
    fontFamily: "monospace",
    fontSize: 18,
    textTransform: "none",
    textAlign: "center",
    color: "white",
  },
})