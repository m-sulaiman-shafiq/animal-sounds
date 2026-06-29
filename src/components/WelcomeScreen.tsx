import { useAudioPlayer } from "expo-audio";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import styles from "../app/styles";

export default function WelcomeScreen({ onDone }: { onDone: () => void }) {
  const player = useAudioPlayer(
    require("../../assets/animals/forestBirds.mp3")
  );

  const fade = useRef(new Animated.Value(1)).current;
  const titleScale = useRef(new Animated.Value(0)).current;
  const bounce = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    player.seekTo(0);
    player.play();

    Animated.spring(titleScale, {
      toValue: 1,
      friction: 5,
      tension: 80,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(bounce, {
          toValue: -22,
          duration: 450,
          useNativeDriver: true,
        }),
        Animated.timing(bounce, {
          toValue: 0,
          duration: 450,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const t = setTimeout(() => {
      player.remove(); // or player.remove() if you prefer

      Animated.timing(fade, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => onDone());
    }, 1500);

    return () => {
      clearTimeout(t);
    };
  }, []);

  return (
    <Animated.View style={[styles.welcome, { opacity: fade }]}>
      <Animated.Text
        style={[styles.welcomeTitle, { transform: [{ scale: titleScale }] }]}
      >
        Animal{"\n"}Sounds!
      </Animated.Text>
      <Animated.Text
        style={[styles.welcomeEmojis, { transform: [{ translateY: bounce }] }]}
      >
        🐮 🐶 🐱 🐸 🐴
      </Animated.Text>
    </Animated.View>
  );
}
