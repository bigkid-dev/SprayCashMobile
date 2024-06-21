import React, { Children, ReactElement } from "react";

import {
  Pressable,
  View,
  StyleSheet,
  Text,
  ViewProps,
  TouchableOpacity,
  Image,
  ImageProps,
} from "react-native";

import { Colors } from "@/constants/Colors";
import { ScaleFactor } from "@/constants/ScreenSize";
import { Link, router } from "expo-router";
import { widthFactor } from "@/constants/ScreenSize";
import { useAuthContext } from "@/contexts/AutContext";
import { makePostRequest } from "@/lib/requests";
import { postUserData } from "@/lib/api-client";
import { storeValue } from "@/constants/storage";

type PryButtonProps = {
  text?: string;
  isCentered?: boolean;
  url?: string;
  height?: number;
  width?: any;
  handleRequest?: () => void;
  isRequest?: boolean;
  requestUrl?: string;
  color?: string;
  lastScreen?: string;
};

interface rippleBtnProps {
  onPress: () => void;
  backgroundColor: string;
  children: ReactElement<ViewProps>;
}

interface errorObj {
  errors: string;
}

interface dataType {
  [key: string]: errorObj;
}

const getDataKey = (data: dataType): string | null | undefined => {
  for (const key in data) {
    if (data[key].hasOwnProperty("errors")) {
      return key;
    }
  }
};

export const PryButton = ({
  text,
  isCentered,
  isRequest,
  url,
  height,
  width,
  handleRequest,
  requestUrl,
  color,
  lastScreen,
}: PryButtonProps) => {
  const { values, updateValues } = useAuthContext();
  const handleBtnPress = async () => {
    if (isRequest) {
      const value = {
        username: values.userName,
        first_name: values.firstName,
        last_name: values.firstName,
        email: values.email,
        password: values.password,
        phone_number: `${values.countryCode}${values.phone_number}`,
        country_code: values.countryCode,
        code: values.code,
      };

      //   makePostRequest('api/v1/auth/signup/', value )

      const { status, data } = await postUserData(value, requestUrl!);
      console.log(status);

      if (url && status === 200) {
        router.replace(url);
      } else if (url && status === 201) {
        router.replace(url);
      } else if (url && status === 400) {
        const key = getDataKey(data);
        if (data["errors"]) {
          updateValues({
            notification: true,
            notificationMessage: data["errors"],
          });
        } else if (key !== undefined && key !== null && key in value) {
          console.log(data[key]);
          updateValues({
            notification: true,
            notificationMessage: data[key]["errors"],
          });
        } else if (data) {
          for (const someKey in data) {
            updateValues({
              notification: true,
              notificationMessage: `${data[someKey]}`,
            });
          }
        }
      }
    } else if (url && !requestUrl) {
      router.push(url);
    }
  };
  return (
    <TouchableOpacity
      onPress={handleBtnPress}
      style={[
        styles.pryBtn,
        isCentered && { alignSelf: "center" },
        {
          backgroundColor: color ? color : Colors.main.primaryColor,
          height: height ? height : 45 * ScaleFactor(),
          width: width ? width : "80%",
        },
      ]}
    >
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default PryButton;

interface socialBtnProps {
  height: number;
  width: any;
  text: string;
  image: ImageProps;
}

export const SocialButton = ({
  height,
  width,
  text,
  image,
}: socialBtnProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.socialBtn,
        {
          height: height ? height * ScaleFactor() : 45 * ScaleFactor(),
          width: width ? width : "100%",
        },
      ]}
    >
      <Text style={styles.socialText}>{text}</Text>
      <View
        style={[
          styles.socialLogo,
          { height: height ? height * ScaleFactor() : 45 * ScaleFactor() },
        ]}
      >
        <Image
          source={image}
          resizeMode="contain"
          style={{
            width: 25 * ScaleFactor(),
            height: 25 * ScaleFactor(),
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

// export const RippleButton  =({onPress, backgroundColor, children}: rippleBtnProps) =>{
//     const child = Children.only(children)

//     return <TapGesture>

//     </TapGesture>
// }

const styles = StyleSheet.create({
  pryBtn: {
    backgroundColor: Colors.btn.blue,
    height: 45 * ScaleFactor(),
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    borderRadius: 7,
  },
  btnText: {
    fontSize: 14 * ScaleFactor(),
    lineHeight: 16 * ScaleFactor(),
    color: "#fff",
  },

  socialBtn: {
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 7,
    justifyContent: "center",
    marginBottom: 20 * ScaleFactor(),
  },
  socialLogo: {
    position: "absolute",
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  socialText: {
    alignSelf: "center",
  },
});
