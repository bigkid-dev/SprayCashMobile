import DefaultPageLayout from "@/components/layout/Default";
import OnboardTwo from "@/components/layout/OnboardTwo";
import { TapGestureHandler, RotationGestureHandler } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';


const Index = () =>{
    return(
        <DefaultPageLayout>
            <OnboardTwo />
        </DefaultPageLayout>
    )
}

export default Index