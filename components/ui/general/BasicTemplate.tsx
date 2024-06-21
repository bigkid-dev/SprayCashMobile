import React, {ReactElement} from 'react'
import { StyleSheet, Text, View, ViewProps } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScaleFactor } from '@/constants/ScreenSize';
import PryButton from '../button/Buttons';
import { SocialButton } from '../button/Buttons';


interface  TempProps {
  textOne?: string,
  textTwo?: string,
  topChild?: ReactElement<ViewProps>,
  lowChild?: ReactElement<ViewProps>,
  hasBtn?: boolean,
  btnText?: string,
  btnUrl?: string
}


const BasicTemp = ({topChild, lowChild}:TempProps) => {
  return (
    <View style={styles.temp}>
        <View style={styles.headers}>
        <AntDesign name="arrowleft" size={20} color="black" onPress={() => router.back()}/>
        </View>
        <View style={{flex:0.70}}>
            <View style={{flex: 0.9}}>
                {topChild}
            </View>
            <View style={{flex: 0.3,}}>
                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                    <View style={styles.boundary}></View>
                    <Text style={styles.boundaryText}>or</Text>
                    <View style={styles.boundary}></View>
                </View>
                
                <SocialButton height={45} width="100%" text='continue with apple' image={require('@/assets/images/onboardOne/apple.png')}/>
                <SocialButton height={45} width="100%" text='continue with Google' image={require('@/assets/images/onboardOne/google.png')}/>
            </View>
            
        </View>
        <View style={{flex: 0.15, justifyContent:"flex-end"}}>
            {lowChild}
        </View>
    </View>
  )
}

export default BasicTemp


const styles = StyleSheet.create({
  temp:{
    flex: 1, 
    backgroundColor:"#fff", 
    padding: 15
  },
  headers:{
    flex:0.10, 
    justifyContent:"center",
  },
  headerText: {
    fontWeight:"700",
    fontSize: 40 * ScaleFactor(),
    lineHeight: 50.88 * ScaleFactor(),
    fontFamily: 'NunitoSans_400Regular',
    color: '#2F4CD4',
  },
  topText:{
    fontSize: 16 * ScaleFactor(),
    fontWeight: "400",
    fontFamily: 'NunitoSans_400Regular'
  },
  boundary:{width:"40%", borderTopWidth: 1, height: 1, borderColor:"#C4C4C4"},
  boundaryText:{
    bottom: 12 * ScaleFactor(),
    fontSize: 16 * ScaleFactor()
  }
  
})