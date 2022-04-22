import React from 'react';
import {Easing, Animated, Dimensions} from 'react-native';


export default function Bubble (props) {

  const screenX = Dimensions.get("window").width;
  const screenY = Dimensions.get("window").height;
  const startX = Math.floor(Math.random() * screenX);
  const startY = Math.floor(Math.random() * screenY * 0.5) + screenY * 0.5;
  const endX = Math.floor(Math.random() * screenX);
  const endY = 0;
  const duration = startY * 10;
  const opacity = React.useState(new Animated.Value(0))[0];
  const xPos = React.useState(new Animated.Value(startX))[0];
  const yPos = React.useState(new Animated.Value(startY))[0];
  const size = 8;

  React.useEffect(() => {
    move();
  }, []);

  function move() {
    Animated.loop(
      Animated.timing(opacity, {
        easing: Easing.quad,
        toValue: 0.5,
        duration: duration-50,
        useNativeDriver: false
      }),
      Animated.timing(opacity, {
        easing: Easing.quad,
        toValue: 0,
        duration: 50,
        useNativeDriver: false
      })
    ).start();
    Animated.loop(Animated.timing(xPos, {
      toValue: endX,
      duration: duration,
      useNativeDriver: false
    })).start();
    Animated.loop(Animated.timing(yPos, {
      toValue: endY,
      duration: duration,
      useNativeDriver: false
    })).start();
  }

  return (
    <Animated.View 
      style={[
        {
          width: size,
          height: size,
          opacity: opacity,
          marginLeft: xPos,
          marginTop: yPos,
          position: 'absolute',
          borderColor: "white",
          borderRadius: size/2,
          borderWidth: 1    
        }
      ]} 
    />
  )
}