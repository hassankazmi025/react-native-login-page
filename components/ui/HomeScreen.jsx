import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";

export default function HomeScreen({ email, onLogout }) {
  const displayEmail = email ?? "there";

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#12131A" />

      <View style={styles.successBadge}>
        <Text style={styles.successBadgeText}>✓</Text>
      </View>

      <Text style={styles.title}>You`re logged in!</Text>
      <Text style={styles.subtitle}>
        Welcome back, <Text style={styles.emailText}>{displayEmail}</Text>
      </Text>

      <TouchableOpacity
        style={styles.logoutButton}
        activeOpacity={0.85}
        onPress={onLogout}
      >
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

// const ACCENT = "#5B6CFF";
const BG_DARK = "#12131A";
const BORDER = "#2A2C3A";
const TEXT_PRIMARY = "#F3F3F7";
const TEXT_MUTED = "#8A8D9F";
const SUCCESS = "#4ADE80";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_DARK,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  successBadge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(74,222,128,0.12)",
    borderWidth: 1.5,
    borderColor: "rgba(74,222,128,0.4)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },
  successBadgeText: {
    color: SUCCESS,
    fontSize: 32,
    fontWeight: "700",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: TEXT_PRIMARY,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: TEXT_MUTED,
    textAlign: "center",
    marginBottom: 40,
  },
  emailText: {
    color: TEXT_PRIMARY,
    fontWeight: "600",
  },
  logoutButton: {
    borderWidth: 1.5,
    borderColor: BORDER,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 32,
    backgroundColor: "#1B1D28",
  },
  logoutButtonText: {
    color: TEXT_PRIMARY,
    fontSize: 15,
    fontWeight: "600",
  },
});
