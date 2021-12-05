import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
} from "react-native";
import { getSugangInfo } from "./apis/sugang";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const lectureComponent = (
  idx,
  { gwamokNm, suupNo, haksuNo, jehanInwon, daepyoGangsaNm }
) => {
  return (
    <View key={idx} style={styles.lecture}>
      <Text>
        {`강좌명: ${gwamokNm}, 교강사: ${daepyoGangsaNm}, 수업번호: ${suupNo}, 학수번호: ${haksuNo}, 제한인원: ${jehanInwon}`}
      </Text>
    </View>
  );
};

export default function App() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [lectures, setLectures] = useState([]);

  useEffect(async () => {
    setLectures(await getSugangInfo(name));
    setLoading(true);
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="과목 검색"
        value={name}
        onChangeText={(text) => setName(text)}
        onSubmitEditing={async () => setLectures(await getSugangInfo(name))}
      />
      <Text>총 {lectures.length}개의 과목이 있습니다.</Text>
      <ScrollView style={styles.scroll}>
        {lectures.length > 0 ? (
          lectures.map((e, idx) => {
            console.log(e);
            return lectureComponent(idx, e);
          })
        ) : (
          <Text>{loading ? "Loading..." : "No result"}</Text>
        )}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  search: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    flex: 1,
  },
  lecture: {
    height: SCREEN_HEIGHT * 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
});
