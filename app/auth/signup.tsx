import React ,{useState} from 'react'
import { View, StyleSheet, Text,  } from 'react-native';
import DefaultPageLayout from '@/components/layout/Default';
import ProfileSetup from '@/components/ui/auth/ProfileSetup';
import BasicTemp from '@/components/ui/general/BasicTemplate';
import { ScaleFactor,  } from '@/constants/ScreenSize';
import PryButton from '@/components/ui/button/Buttons';
import HeadingText from '@/components/ui/auth/HeadingText';
import PryTextInput from '@/components/ui/inputs/textInputs';
import TopChild from '@/components/ui/auth/TopChild';
import { Link } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { api } from '@/lib/api-client';
import { makePostRequest } from '@/lib/requests';
import { AuthContext } from '@/contexts/AutContext';
import { AuthContextType,  } from '@/contexts/Auth';
import { useAuthContext } from '@/contexts/AutContext';

// userName: string;
//         firstName: string;
//         lastName: string;
//         email: string;
//         phoneNo: string;
//         countryCode: string;
//         password: string;

const SetupProfile = () => {

  

  return (
    <DefaultPageLayout>
   
        <BasicTemp topChild={
        <TopChild 
            heading={
                <HeadingText 
                    heading='Sign up'
                    miniText='Finish up sign up by fill this information'
                />
            }
            content={
                <>
                    <PryTextInput placeHolder='Username' stateValue='userName'/>
                    <PryTextInput placeHolder='Full Name' stateValue='firstName'/>
                    <PryTextInput placeHolder='Email'stateValue='email'/>
                    <PryTextInput placeHolder='Password' secureText={true} stateValue='password'/>
                    <PryButton 
                      requestUrl='api/v1/auth/signup/'
                      url='ride'
                      isCentered={true} width={"100%"} 
                      text='sign up'
                      isRequest={true}
                      />
                </>
            }
        />
        
        }
        lowChild={
            <LowChild/>
        }
        />
    </DefaultPageLayout>
  )
}

export default SetupProfile


const LowChild = () =>{

      return(
        <Text style={styles.mainText}>Already Have an account? <Link href={"auth/login"}
         style={[styles.mainText, styles.link]}>Login</Link></Text>
      )
    }


    const styles = StyleSheet.create({
        mainText:{
          alignSelf:"center",
          fontWeight: "400",
        },
        link:{
          color:Colors.main.primaryColor,
          fontFamily: 'NunitoSans_400Regular'
        }
    
    })