import React, { Children, ReactElement } from "react";
import { AuthValues } from "@/contexts/AutContext";
import {
  Pressable,
  View,
  StyleSheet,
  Text,
  ViewProps,
  TouchableOpacity,
  Image,
  ImageProps,
  ActivityIndicator,
} from "react-native";

import { Colors } from "@/constants/Colors";
import { ScaleFactor } from "@/constants/ScreenSize";
import { Link, router } from "expo-router";
import { widthFactor } from "@/constants/ScreenSize";
import { useAuthContext } from "@/contexts/AutContext";
import { makePostRequest } from "@/lib/requests";
import { postUserData, getUserData } from "@/lib/api-client";
import { storeValue } from "@/constants/storage";

interface valueType {
  [key: string]: string;
}

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
  isGet: boolean;
  handleAction: () => void;
  preloader: boolean;
  value: valueType;
  disabled?: boolean;
};

interface rippleBtnProps {
  onPress: () => void;
  backgroundColor: string;
  children: ReactElement<ViewProps>;
}

interface errorObj {
  errors: string;
  status: string;
  message: string;
}

interface dataType {
  [key: string]: errorObj;
}

type ApiResponse = {
  data: any; // Use `any` if the data can be null or other types
  message: string;
  status: "success" | "error"; // Use literal types for predefined string values
  status_code: number;
};

interface Data {
  str: string;
}

interface ValueData {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  country_code: string;
  code: string;
  status: string;
}

type GetDataKey = (data: Data) => string | undefined;

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
  handleAction,
  width,
  handleRequest,
  requestUrl,
  color,
  lastScreen,
  isGet,
  disabled,
  value,
  preloader,
}: PryButtonProps) => {
  const { values, updateValues } = useAuthContext();
  const handleResponse = (
    status: number,
    data: ApiResponse,
    url: string,
    value: ValueData
  ) => {
    console.log("status", status);

    if (url && (status === 200 || status === 201)) {
      updateValues({
        notification: true,
        notificationMessage: data["message"],
        notificationType: data["status"],
      });
      router.replace(url);
    } else if (status === 401) {
      router.push("auth/login");
    } else if ((url && status === 400) || 409) {
      updateValues({
        notification: true,
        notificationMessage: data["message"],
        notificationType: data["status"],
      });
    }
  };

  const handleBtnPress = async () => {
    console.log("values", value);
    if (isRequest) {
      const { status, data } = await postUserData(value, requestUrl!);
      console.log(data, "data");
      handleResponse(status, data, url!, value);
    } else if (url && !requestUrl) {
      router.push(url);
    } else if (handleAction) {
      handleAction();
      router.push("auth/login");
    }
  };
  return (
    <TouchableOpacity
      onPress={handleBtnPress}
      disabled={disabled ? true : false}
      style={[
        styles.pryBtn,
        isCentered && { alignSelf: "center" },
        {
          backgroundColor: color ? color : "#7B27A3",
          height: height ? height : 45 * ScaleFactor(),
          width: width ? width : "80%",
          borderWidth: color === "#fff" ? 1 : 0,
          borderColor: color === "#fff" ? "#7B27A3" : "",
        },
      ]}
    >
      <Text
        style={[
          styles.btnText,
          { color: color === "#fff" ? "#7B27A3" : "#fff" },
        ]}
      >
        {preloader ? <ActivityIndicator /> : text}
      </Text>
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
    backgroundColor: "#C82F81",
    height: 45 * ScaleFactor(),
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    borderRadius: 50,
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
