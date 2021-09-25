import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootState, store } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
/*
  read : https://docs.expo.dev/guides/using-firebase/#temporarily-bypass-default-security-rules
  quanlyFireBase: https://console.firebase.google.com/project/myapp-14d22https://console.firebase.google.com/project/myapp-14d22/overview
  cloudStore: https://console.firebase.google.com/project/myapp-14d22/firestore/data/~2Fusers~2FsnII96JUneFWEHQ33dkP
  icon:https://icons.expo.fyi/Ionicons/search  
  => Done{
    connect firestore success!
    read basic doccument form firesotre ok!
    redux basic ok, Read Firestore then save to redux.
  }
  todo:{
    fix warning asyn await?
    CRUD userFireStore
    draw Authentication flow??
    implement function authentication 

    =>UI Login
    =>
  }
*/

const UserList = (userData: { username: string; phone: string }[]) => {
   if (!userData.length) return <Text></Text>;
   return (
      <Text>
         {userData[0].username}:{userData[0].phone}{" "}
      </Text>
   );
};

export default function ModalScreen() {
   const user = useSelector((state: RootState) => state.counter.user);
   const dispatch = useDispatch();
   console.log("user", user.payload);

   return (
      <View style={styles.container}>
         <Text style={styles.title}>Modal</Text>
         <UserList {...user.payload} />
         <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
         />
         <EditScreenInfo path="/screens/ModalScreen.tsx" />

         {/* Use a light status bar on iOS to account for the black space above the modal */}
         <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
   },
   title: {
      fontSize: 20,
      fontWeight: "bold",
   },
   separator: {
      marginVertical: 30,
      height: 1,
      width: "80%",
   },
});
