/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
   NavigationContainer,
   DefaultTheme,
   DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import {
   ColorSchemeName,
   Pressable,
   SafeAreaView,
   TextInput,
   StyleSheet,
   View,
   Text,
} from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import {
   RootStackParamList,
   RootTabParamList,
   RootTabScreenProps,
} from "../../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SearchBar } from "react-native-elements";
import { Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function Navigation({
   colorScheme,
}: {
   colorScheme: ColorSchemeName;
}) {
   return (
      <NavigationContainer
         linking={LinkingConfiguration}
         theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
         <RootNavigator />
      </NavigationContainer>
   );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
   return (
      <Stack.Navigator>
         <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
         />
         <Stack.Screen
            name="NotFound"
            component={NotFoundScreen}
            options={{ title: "Oops!" }}
         />
         <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="Modal" component={ModalScreen} />
         </Stack.Group>
      </Stack.Navigator>
   );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
function LogoTitle(props: any) {
   const [searchQuery, setSearchQuery] = React.useState("");
   const [isFocus, setIsFocus] = React.useState(false);
   const onChangeSearch = (query: React.SetStateAction<string>) => {
      setSearchQuery(query);
   };
   const onKeyPressHandle = (even) => {
      const {
         nativeEvent: { key },
      } = even;
      console.log("key", even);
      if (key === "Enter") {
         setIsFocus(false);
      }
   };

   return (
      <View
         style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            width: "100%",
            paddingHorizontal: 10,
            margin: 0,
            borderColor: isFocus ? "" : "grey",
            borderWidth: 1,
            borderRadius: 12,
         }}
      >
         {isFocus && (
            <TextInput
               style={styles.input}
               onChangeText={onChangeSearch}
               value={searchQuery}
               onBlur={(props) => {}}
               inlineImageLeft="search_icon"
               onEndEditing={() => setIsFocus(false)}
               autoFocus={true}
            />
         )}

         {!isFocus && (
            <>
               <Ionicons
                  name="search"
                  onPress={() => setIsFocus(true)}
                  size={24}
                  color="black"
                  style={{
                     paddingTop: 15,
                     color: "#FFB319",
                     marginRight: 5,
                     opacity: 0.6,
                  }}
               />
               <Text
                  onPress={() => props.navigation.navigate("TabTwo")} // chuyen sang screen co search kkk
                  numberOfLines={1}
                  style={{
                     paddingTop: searchQuery ? 15 : 5,
                     marginLeft: 5,
                     width: "85%",
                     fontSize: searchQuery ? 14 : 25,
                     opacity: 0.5,
                  }}
               >
                  {searchQuery ? searchQuery : "..."}
               </Text>
            </>
         )}
         <Feather
            name="camera"
            size={27}
            color="black"
            style={{ paddingTop: 15, color: "#FFB319", opacity: 0.6 }}
         />
      </View>
   );
}
const styles = StyleSheet.create({
   input: {
      height: 40,
      //margin: 12,
      marginTop: 7,
      marginRight: 10,
      borderWidth: 1,
      padding: 10,
      width: "90%",
      borderColor: "#FFF",
   },
});

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
   const colorScheme = useColorScheme();

   return (
      <BottomTab.Navigator
         initialRouteName="TabOne"
         screenOptions={{
            tabBarActiveTintColor: "#FFB319",
            tabBarShowLabel: false,
            tabBarStyle: {
               borderTopColor: "#fff",
            },
         }}
      >
         <BottomTab.Screen
            name="TabTwo"
            component={TabTwoScreen}
            options={{
               title: "Scan",
               tabBarIcon: ({ color, focused }) => {
                  return focused ? (
                     <Ionicons name="qr-code-sharp" size={32} color="#FFB319" />
                  ) : (
                     <Ionicons
                        name="qr-code-outline"
                        size={28}
                        color="#FFB319"
                     />
                  );
               },
            }}
         />
         <BottomTab.Screen
            name="TabOne"
            component={TabOneScreen}
            options={({ navigation }: RootTabScreenProps<"TabOne">) => ({
               //title:"Home",
               tabBarIcon: ({ color, focused }) => {
                  return focused ? (
                     <Ionicons name="home-sharp" size={36} color="#FFB319" />
                  ) : (
                     <Ionicons name="home-outline" size={32} color="#FFB319" />
                  );
               },

               headerTitle: (props) => <LogoTitle {...{ props, navigation }} />,
               headerRight: () => (
                  <Pressable
                     onPress={() => navigation.navigate("Modal")}
                     style={({ pressed }) => ({
                        opacity: pressed ? 0.5 : 1,
                     })}
                  >
                     <AntDesign
                        name="shoppingcart"
                        size={32}
                        color="#FFB319"
                        style={{ marginRight: 20 }}
                     />
                  </Pressable>
               ),
            })}
         />
         <BottomTab.Screen
            name="TabThree"
            component={TabTwoScreen}
            options={({ navigation }) => ({
               title: "Giỏ hàng",
               tabBarIcon: ({ color, focused }) => {
                  return focused ? (
                     <Ionicons name="cart" size={36} color="#FFB319" />
                  ) : (
                     <Ionicons name="cart-outline" size={32} color="#FFB319" />
                  );
               },
               headerTitleStyle: {
                  color: "#FFB319",
               },
               headerRight: () => (
                  <Pressable
                     onPress={() => navigation.navigate("Modal")}
                     style={({ pressed }) => ({
                        opacity: pressed ? 0.5 : 1,
                     })}
                  >
                     <AntDesign
                        name="shoppingcart"
                        size={32}
                        color={"#FFB319"}
                        style={{ marginRight: 20 }}
                     />
                  </Pressable>
               ),
            })}
         />
      </BottomTab.Navigator>
   );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
   name: React.ComponentProps<typeof FontAwesome>["name"];
   color: string;
}) {
   return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
