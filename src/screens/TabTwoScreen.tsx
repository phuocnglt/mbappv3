import * as React from "react";
import { StyleSheet ,ScrollView} from "react-native";
import { Text, View,  } from "../components/Themed";

export default function TabTwoScreen() {
  return (
  <ScrollView>
    <View style={styles.container}>
      <Text style={{ fontSize: 96 }}>Scroll me plz</Text>
      <Text style={{ fontSize: 96 }}>Scroll me plz</Text>
      <Text style={{ fontSize: 96 }}>Scroll me plz</Text>
      <Text style={{ fontSize: 96 }}>Scroll me plz</Text>
      <Text style={{ fontSize: 96 }}>Scroll me plz</Text>

      <Text style={{ fontSize: 96 }}>Scroll me plz</Text>
      <Text style={{ fontSize: 96 }}>Scroll me plz</Text>
      <Text style={{ fontSize: 96 }}>Scroll me plz</Text>
      <Text style={{ fontSize: 96 }}>Scroll me plz</Text>
      <Text style={{ fontSize: 96 }}>Scroll me plz</Text>

      <Text style={{ fontSize: 96 }}>Scroll me plz</Text>
      <Text style={styles.title}>Tab Two</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      
       
    </View> 
    </ScrollView>
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
