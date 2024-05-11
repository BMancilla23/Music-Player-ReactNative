import MusicPlayer from "@/components/MusicPlayer";
import { StatusBar, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <MusicPlayer></MusicPlayer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
