/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';
const PrimaryColor = "#7B27A3"

export const Colors = {
  main: {
    primaryColor: PrimaryColor
  },
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  text: {
    faint: "#7E7E8E",
    default:"##101010",
    underline: "#626262",
    grey:"#BDBDBD",
    greyTwo:"#828282",
    white:"#FFFFFF"
  },
  btn: {
    grey:"#C7C7C7",
    blue: PrimaryColor
  },
  containers:{
    grey: "#E8E8E8",
    inputGrey:"#F2F2F2",
  },
  borders: {
    dark:"#5E5E5E",
    blue:PrimaryColor
  }
};
