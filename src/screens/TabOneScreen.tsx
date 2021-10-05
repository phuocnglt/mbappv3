import * as React from "react";
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  VirtualizedList,
  StatusBar,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../../types";
import { dataMock } from "./mockupData";
const DATA = [];

const getItem = (data, index) => ({
  id: Math.random().toString(12).substring(0),
  title: `Item ${index + 1}`,
  detailQuery: `${index+1}`,
});

const getItemCount = (data) => 200;

const Item = ({ title, nav, queryId }) => (
  <TouchableOpacity
    onPress={() =>
      nav.navigate("Modal", {
        itemId: queryId,
        otherParam: "anything you want here",
      })
    }
  >
    <View style={styles.item}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: "https://reactnative.dev/img/tiny_logo.png",
        }}
      />
      <View>
        <Text style={styles.title}>Ten san pham:{title}</Text>
        <Text style={styles.itemContent}>{"\n"}aaa</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const ProducList = (props) => {
  const createProductList = () => {
    return props.producInfo.map((_, index) => {
      return (
        <Text key={index} style={styles.title}>
          Tab Home
        </Text>
      );
    });
  };
  return <>{createProductList()}</>;
};

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<"TabHome">) {
  const getProducFromReduxStore = dataMock;
  return (
    <SafeAreaView>
      <VirtualizedList
        data={DATA}
        initialNumToRender={4}
        renderItem={({ item }) => (
          <Item
            title={item.title}
            nav={navigation}
            queryId={item.detailQuery}
          />
        )}
        keyExtractor={(item) => item.key}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </SafeAreaView>
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
    // dau gach ngang
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
  },
});
