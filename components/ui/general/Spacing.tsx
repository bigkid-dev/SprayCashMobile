import React from 'react'
import { View } from 'react-native'

type spaceProps = {
    space?: number;
}

const Spacing = ({space}: spaceProps) => {
  return (
    <View  style={{height: space ? space: 10}}/>
  )
}

export default Spacing