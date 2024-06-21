import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


type LinearGradientProps = {
    background: string;
    colorOne: string;
    colorTwo: string;
    colorThree: string;
}

const LinearGradientComp: React.FC<LinearGradientProps> = ({background, colorOne, colorThree, colorTwo})=>{
    const styles = StyleSheet.create({
        container: {
          flex: 1,
        },
        button: {
          padding: 15,
          alignItems: 'center',
          borderRadius: 5,
          flex: 1
        },
       
      });

  return (
    <View style={styles.container}>
       <LinearGradient
        // Button Linear Gradient
        colors={[colorOne, colorTwo, colorThree]}
        style={styles.button}>
      </LinearGradient> 
    </View>
  );
}

export default LinearGradientComp