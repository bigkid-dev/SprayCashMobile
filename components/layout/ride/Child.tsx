import React, { useEffect, useState } from "react";
import { View, StyleSheet, Modal, Text } from "react-native";
import Places from "@/components/ui/modals/subComponents/Places";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Octicons } from "@expo/vector-icons";
import EvilIcons from "@expo/vector-icons/EvilIcons";


 const RideChildComponent = () => {
    return (
      <>
        <Places
          icon={
            <MaterialCommunityIcons
              name="circle-slice-8"
              size={18}
              color="#2F4CD4"
            />
          }
          textOne="Home"
          textTwo="4, Lekki County, Ikota, Lagos"
          widthOne={"20%"}
          widthTwo={"80%"}
          flexValue={1}
        />
        <Places
          icon={
            <MaterialCommunityIcons
              name="circle-slice-8"
              size={18}
              color="#C5C5C5"
            />
          }
          textOne="Work"
          textTwo="23, Adetutu House, Lekki Phase 1, Lagos"
          widthOne={"20%"}
          widthTwo={"80%"}
          flexValue={1}
          hasBorder={true}
        />
        <Places
          icon={<Octicons name="star" size={18} color="black" />}
          textOne="Saved Places"
          textTwo="23, Adetutu House, Lekki Phase 1, Lagos"
          widthOne={"20%"}
          widthTwo={"80%"}
          flexValue={1}
          hasBorder={true}
        />
        <Places
          icon={<EvilIcons name="clock" size={24} color="black" />}
          textOne="Oniru Private"
          textTwo="maroko lagos"
          widthOne={"20%"}
          widthTwo={"80%"}
          flexValue={1}
        />
      </>
    );
  };



  export default RideChildComponent