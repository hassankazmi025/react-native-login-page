import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Pressable,
  ActivityIndicator,
//   Alert,
} from "react-native";
import { router } from "expo-router";

// Mock API call — swap this out for a real fetch/axios call to your backend.
// Simulates network latency and randomly fails ~20% of the time so you can
// see both the success and error paths while wiring up the UI.
const mockLoginApi = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldFail = Math.random() < 0.2;
      if (shouldFail) {
        reject(new Error("Invalid email or password."));
      } else {
        resolve({
          user: { email },
          token: "mock-jwt-token-abc123",
        });
      }
    }, 1500); // simulated network delay
  });
};

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const next = {};
    if (!email.trim()) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Enter a valid email address";
    }
    if (!password) {
      next.password = "Password is required";
    } else if (password.length < 6) {
      next.password = "Password must be at least 6 characters";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setErrors((e) => ({ ...e, general: null }));
    setLoading(true);
    try {
      const response = await mockLoginApi(email.trim(), password);
      console.log("Logged in:", response);
    //   Alert.alert("Success", `Welcome back, ${response.user.email}!`);
      // Replace with real navigation once wired to actual auth, e.g.:
      router.replace('/home');
    } catch (err) {
      setErrors({
        general: err.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor="#12131A" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Top band */}
        <View style={styles.topBand}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoBadgeText}>◆</Text>
          </View>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>
            Sign in to pick up where you left off
          </Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          {errors.general ? (
            <View style={styles.generalError}>
              <Text style={styles.generalErrorText}>{errors.general}</Text>
            </View>
          ) : null}

          {/* Email field */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email</Text>
            <View
              style={[
                styles.inputWrapper,
                focusedField === "email" && styles.inputWrapperFocused,
                errors.email && styles.inputWrapperError,
              ]}
            >
              <Text style={styles.inputIcon}>✉</Text>
              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor="#8A8D9F"
                value={email}
                onChangeText={(t) => {
                  setEmail(t);
                  if (errors.email) setErrors((e) => ({ ...e, email: null }));
                }}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                textContentType="emailAddress"
                returnKeyType="next"
              />
            </View>
            {errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
          </View>

          {/* Password field */}
          <View style={styles.fieldGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Password</Text>
              <Pressable
                onPress={() => console.log("Navigate to forgot password")}
              >
                <Text style={styles.forgotText}>Forgot?</Text>
              </Pressable>
            </View>
            <View
              style={[
                styles.inputWrapper,
                focusedField === "password" && styles.inputWrapperFocused,
                errors.password && styles.inputWrapperError,
              ]}
            >
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#8A8D9F"
                value={password}
                onChangeText={(t) => {
                  setPassword(t);
                  if (errors.password)
                    setErrors((e) => ({ ...e, password: null }));
                }}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
              <Pressable
                onPress={() => setShowPassword((s) => !s)}
                hitSlop={10}
                style={styles.eyeButton}
              >
                <Text style={styles.eyeIcon}>{showPassword ? "🙈" : "👁"}</Text>
              </Pressable>
            </View>
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
          </View>

          {/* Login button */}
          <TouchableOpacity
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? (
              <View style={styles.loadingRow}>
                <ActivityIndicator color="#FFFFFF" style={{ marginRight: 8 }} />
                <Text style={styles.loginButtonText}>Signing in…</Text>
              </View>
            ) : (
              <Text style={styles.loginButtonText}>Log In</Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social buttons */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
              <Text style={styles.socialButtonText}>Apple</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don`t have an account? </Text>
          <Pressable onPress={() => console.log("Navigate to sign up")}>
            <Text style={styles.footerLink}>Sign up</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const ACCENT = "#5B6CFF";
const BG_DARK = "#12131A";
const CARD_BG = "#1B1D28";
const BORDER = "#2A2C3A";
const TEXT_PRIMARY = "#F3F3F7";
const TEXT_MUTED = "#8A8D9F";
const ERROR = "#FF6B6B";

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: BG_DARK,
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: BG_DARK,
    paddingBottom: 32,
  },
  topBand: {
    paddingTop: 72,
    paddingBottom: 40,
    paddingHorizontal: 28,
    alignItems: "flex-start",
  },
  logoBadge: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: ACCENT,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    shadowColor: ACCENT,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  logoBadgeText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: TEXT_PRIMARY,
    letterSpacing: 0.2,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: TEXT_MUTED,
  },
  card: {
    marginHorizontal: 20,
    backgroundColor: CARD_BG,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: BORDER,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8,
  },
  generalError: {
    backgroundColor: "rgba(255,107,107,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,107,107,0.35)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  generalErrorText: {
    color: ERROR,
    fontSize: 13,
    fontWeight: "500",
  },
  fieldGroup: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: TEXT_MUTED,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  forgotText: {
    fontSize: 13,
    fontWeight: "600",
    color: ACCENT,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#14151F",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: BORDER,
    paddingHorizontal: 14,
    height: 52,
  },
  inputWrapperFocused: {
    borderColor: ACCENT,
    backgroundColor: "#14151F",
  },
  inputWrapperError: {
    borderColor: ERROR,
  },
  inputIcon: {
    fontSize: 16,
    marginRight: 10,
    color: TEXT_MUTED,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: TEXT_PRIMARY,
    paddingVertical: 0,
    height: "100%",
  },
  eyeButton: {
    paddingLeft: 10,
  },
  eyeIcon: {
    fontSize: 16,
  },
  errorText: {
    marginTop: 6,
    fontSize: 12,
    color: ERROR,
    fontWeight: "500",
  },
  loginButton: {
    marginTop: 4,
    backgroundColor: ACCENT,
    borderRadius: 14,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: ACCENT,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 5,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: BORDER,
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 12,
    color: TEXT_MUTED,
  },
  socialRow: {
    flexDirection: "row",
    gap: 12,
  },
  socialButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#14151F",
  },
  socialButtonText: {
    color: TEXT_PRIMARY,
    fontSize: 14,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 28,
  },
  footerText: {
    color: TEXT_MUTED,
    fontSize: 14,
  },
  footerLink: {
    color: ACCENT,
    fontSize: 14,
    fontWeight: "700",
  },
});
