import React,{ReactElement} from 'react';
import { View, ScrollView, ViewProps } from 'react-native';
import DefaultPageLayout from '@/components/layout/Default';
import BasicTemp from '@/components/ui/general/BasicTemplate';
import HeadingText from '@/components/ui/auth/HeadingText';
import PryButton from '@/components/ui/button/Buttons';
import PryTextInput from '@/components/ui/inputs/textInputs';

interface topChildProps{
    heading: ReactElement<ViewProps>;
    content: ReactElement
}

const TopChild =({heading, content}: topChildProps) => {
    return(
        <View style={{flex: 1}}>
            <View style={{flex: 0.2}}>
               {heading}
            </View>
            <View style={{flex: 0.8, paddingTop: 10, paddingBottom: 20}}>
                <ScrollView style={{}} showsVerticalScrollIndicator={false}>
                    {content}
                </ScrollView>
            </View>
            
        </View>
    )
}

export default TopChild