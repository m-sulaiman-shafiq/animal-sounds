import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import * as Speech from "expo-speech";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ANIMALS } from "../../animals";

const { width } = Dimensions.get("window");
const COLS = 3;
const TILE = (width - 16 * (COLS + 1)) / COLS;
const CIRCLE = width * 0.62;

export default function HomeScreen() {
  const [active, setActive] = useState(null);
  const scale = useRef(new Animated.Value(0)).current;

  const player = useAudioPlayer(); // one shared player
  const status = useAudioPlayerStatus(player);

  const handlePress = (animal: any) => {
    if (active) return; // ignore taps mid-play
    setActive(animal);
    Animated.spring(scale, {
      toValue: 1,
      friction: 6,
      useNativeDriver: true,
    }).start();
    player.replace(animal.sound);
    player.seekTo(0);
    player.play();
  };

  const dismiss = () => {
    Animated.timing(scale, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setActive(null));
  };

  // when the sound finishes, send the animal back
  useEffect(() => {
    if (active && status?.didJustFinish) {
      Speech.speak(`It's a ${active.name}`, {
        rate: 0.5, // slightly slower, clearer for kids
        pitch: 0.9,
        onDone: dismiss, // shrink back after the sentence finishes
        onStopped: dismiss, // safety: also dismiss if speech is interrupted
      });
    }
  }, [status?.didJustFinish]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Tap an animal!</Text>

      <ScrollView contentContainerStyle={styles.grid}>
        {ANIMALS.map((a: any) => (
          <Pressable
            key={a.id}
            style={[styles.tile, { backgroundColor: a.color }]}
            onPress={() => handlePress(a)}
          >
            <Image
              source={a.image}
              style={styles.tileImg}
              resizeMode="contain"
            />
            <Text style={styles.tileText}>{a.name}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* {active && (
        <Pressable style={styles.overlay} onPress={dismiss}>
          <Animated.View style={{ transform: [{ scale }], alignItems: "center" }}>
            <Image source={active.image} style={styles.bigImg} resizeMode="contain" />
            <Text style={styles.bigText}>{active.name}</Text>
          </Animated.View>
        </Pressable>
      )} */}
      <Modal
        visible={!!active}
        transparent
        animationType="fade"
        onRequestClose={dismiss}
      >
        <Pressable style={styles.modalRoot} onPress={dismiss}>
          {active && (
            <>
              <Animated.View
                style={[
                  styles.circle,
                  { backgroundColor: active.color, transform: [{ scale }] },
                ]}
              >
                <Image
                  source={active.image}
                  style={styles.circleImg}
                  resizeMode="contain"
                />
              </Animated.View>
              <Animated.Text style={[styles.label, { transform: [{ scale }] }]}>
                {active.name}
              </Animated.Text>
            </>
          )}
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#FFF8E1", paddingTop: 60 },
  title: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 16,
    color: "#333",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  tile: {
    width: TILE,
    height: TILE,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  tileImg: { width: TILE * 0.6, height: TILE * 0.6 },
  tileText: { marginTop: 6, fontSize: 15, fontWeight: "700", color: "#fff" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.92)",
    alignItems: "center",
    justifyContent: "center",
  },
  bigImg: { width: width * 0.6, height: width * 0.6 },
  bigText: { fontSize: 40, fontWeight: "900", color: "#333", marginTop: 12 },
  modalRoot: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.45)",   // dim; or "rgba(255,255,255,0.6)" to stay bright
  },
  circle: {
    width: CIRCLE,
    height: CIRCLE,
    borderRadius: CIRCLE / 2,
    alignItems: "center",
    justifyContent: "center",
    elevation: 12,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  circleImg: { width: CIRCLE * 0.68, height: CIRCLE * 0.68 },
  label: {
    marginTop: 20,
    fontSize: 34,
    fontWeight: "900",
    color: "#333",
    marginBottom: 0,
  },
});
