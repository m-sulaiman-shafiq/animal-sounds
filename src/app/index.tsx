import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import styles from "./styles";
import * as Speech from "expo-speech";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { ANIMALS } from "../../animals";
import WelcomeScreen from "../components/WelcomeScreen";

// const { width } = Dimensions.get("window");


export default function HomeScreen() {
  const [showWelcome, setShowWelcome] = useState(true);
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
                 <Animated.Text style={[styles.label, { transform: [{ scale }] }]}>
                {active.name}
              </Animated.Text>
              </Animated.View>
             
            </>
          )}
        </Pressable>
      </Modal>
      {showWelcome && <WelcomeScreen onDone={() => setShowWelcome(false)} />}
    </View>
  );
}