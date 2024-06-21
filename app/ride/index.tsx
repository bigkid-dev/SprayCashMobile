import React, { useEffect, useState } from "react";
import { View, StyleSheet, Modal, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
//
import { late } from "zod";
import { useAuthContext } from "@/contexts/AutContext";
import { useGeoContext } from "@/contexts/AutContext";
import { Link } from "expo-router";
import ModalBottom from "@/components/ui/modals/BottomModal";
import Places from "@/components/ui/modals/subComponents/Places";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Octicons } from "@expo/vector-icons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import SearchComp from "@/components/ui/modals/subComponents/Search";
import { Marker } from "react-native-maps";
import { Callout } from "react-native-maps";
import { Entypo } from '@expo/vector-icons';
import RideChildComponent from "@/components/layout/ride/Child";

type Region = {
  latitude: number;
  latitudeDelta: number;
  longitude: number;
  longitudeDelta: number;
};

function getRandomRegion(initialRegion: Region): Region {
  const { latitude, longitude } = initialRegion;

  // Convert miles to meters (geolib uses meters for distance)
  const radiusMeters = 50 * 1609.34; // 1 mile = 1609.34 meters

  // Generate random point within the circle of radiusMeters
  const randomAngle = Math.random() * 2 * Math.PI;
  const randomRadius = Math.sqrt(Math.random()) * radiusMeters;

  const latitudeDelta = randomRadius / 1000 / 111.32; // 1 degree of latitude = 111.32 km
  const longitudeDelta =
    randomRadius / 1000 / (111.32 * Math.cos((latitude * Math.PI) / 180));

  const randomLatitude =
    latitude + (latitudeDelta * (Math.cos(randomAngle) * 180)) / Math.PI;
  const randomLongitude =
    longitude + (longitudeDelta * (Math.sin(randomAngle) * 180)) / Math.PI;

  return {
    latitude: randomLatitude,
    latitudeDelta,
    longitude: randomLongitude,
    longitudeDelta,
  };
}

const Main = () => {
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const { geoValues, updateGeoValues } = useGeoContext();
  const [markers, setMarkers] = useState<Region[]>([]);
  const [markersOne, setMarkersOne] = useState<{ [key: string]: Region }>({});
  const [markersTwo, setMarkersTwo] = useState<{ [key: string]: Region }>({});
  const [markersThree, setMarkersThree] = useState<{ [key: string]: Region }>(
    {}
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // setLocation(location);
      const locationJSON = location.coords;
      console.log(locationJSON);
      updateGeoValues(locationJSON);
    })();
  }, []);

  const initial_region = {
    latitude: geoValues.latitude,
    longitude: geoValues.longitude,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  console.log("initial", initial_region);
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
    console.log(text);
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        initialRegion={initial_region}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        <Marker coordinate={initial_region}>
          <Callout>
            <View style={{ padding: 10 }}>
              <Text style={{ fontSize: 12 }}>Ride</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
      <ModalBottom
        hasSearch={true}
        heading={
          <SearchComp
            icon={<Entypo name="location-pin" size={20} color="#E30000" />}
            interText="Where do you wanna go"
            widthOne={"25%"}
            widthTwo={"70%"}
          />
        }
        children={<RideChildComponent/>}
      />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2F4CD4",
    justifyContent: "center",
    alignItems: "center",
  },
  centerText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontFamily: "Roboto",
    fontSize: 40,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
export default Main;
