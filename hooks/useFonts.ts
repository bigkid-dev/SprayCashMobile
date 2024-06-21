import { useEffect, useState } from "react"
import { NunitoSans_400Regular, NunitoSans_700Bold } from '@expo-google-fonts/nunito-sans';
import * as Font from "expo-font"

const UseFont = () =>{

    useEffect(() =>{
    const loadFont = async() =>{
    await Font.loadAsync({
        NunitoSans_400Regular, 
        NunitoSans_700Bold
    })
    }
    loadFont()

    }, [])

}

export default UseFont