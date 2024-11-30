import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import React from 'react'
import { useAuthContext } from "@/contexts/AutContext";

type Props = {}

const FundWallet = (props: Props) => {
    const { values, updateValues } = useAuthContext();
  return (
    <SafeAreaView>
        <Stack.Screen options={{
            headerShown: false
        }
        }/>
        <View>
            <Text>Fund Wallet</Text>
        </View>
        <View style={styles.walletShow}>
            <Text>Account Number: {values["accountDetails"].account_no} </Text>
            <Text>Account Name: {values["accountDetails"].account_name}</Text>
            <Text>Bank Name: {values["accountDetails"].bank_name}</Text>

        </View>
    </SafeAreaView>
  )
}

export default FundWallet

const styles = StyleSheet.create({
    walletShow: {
        marginTop: 10,
    }
})