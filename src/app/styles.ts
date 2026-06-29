import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
export const COLS = 3;
export const TILE = (width - 16 * (COLS + 1)) / COLS;
export const CIRCLE = width * 0.62;

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
  modalRoot: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.45)",
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
    marginTop: 5,
    marginBottom: 15,
    fontSize: 34,
    fontWeight: "900",
    color: "#333",
  },
  //welcome screen styles
  welcome: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "#FFC93C",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    elevation: 10,
  },
  welcomeTitle: {
    fontSize: 56,
    fontWeight: "900",
    color: "#fff",
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.18)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 6,
    marginBottom: 28,
  },
  welcomeEmojis: { fontSize: 50 },
});

export default styles;
