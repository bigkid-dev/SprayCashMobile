import { Platform, Dimensions } from "react-native";


export const ScreenHeight =() => {
    const height = Dimensions.get("window").height
    return height
}


export const ScreenWidth =() => {
    const width = Dimensions.get("window").width
    return width
}


export const ScaleFactor =() =>{
    const height = ScreenHeight()
    return height/ 800
}


export const widthFactor = () =>{
    const width = ScreenWidth()
    return width/ 400
}
