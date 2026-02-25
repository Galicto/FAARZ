import React, { useEffect, useRef } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { COLORS, SIZES } from "../constants/theme";

const { width, height } = Dimensions.get("window");

// Floating particle component
function Particle({ delay, size, x }: { delay: number; size: number; x: number }) {
    const anim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.delay(delay),
                Animated.timing(anim, { toValue: 1, duration: 4000, useNativeDriver: true }),
                Animated.timing(anim, { toValue: 0, duration: 4000, useNativeDriver: true }),
            ])
        ).start();
    }, []);
    const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [0, -40] });
    const opacity = anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.1, 0.4, 0.1] });
    return (
        <Animated.View
            style={{
                position: "absolute",
                left: x,
                top: height * 0.3 + Math.random() * height * 0.4,
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: COLORS.green,
                opacity,
                transform: [{ translateY }],
            }}
        />
    );
}

export default function LoginScreen() {
    const router = useRouter();
    const fadeIn = useRef(new Animated.Value(0)).current;
    const slideUp = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeIn, { toValue: 1, duration: 800, useNativeDriver: true }),
            Animated.timing(slideUp, { toValue: 0, duration: 800, useNativeDriver: true }),
        ]).start();
    }, []);

    return (
        <View style={styles.container}>
            {/* Particles */}
            {Array.from({ length: 12 }).map((_, i) => (
                <Particle key={i} delay={i * 300} size={3 + Math.random() * 3} x={Math.random() * width} />
            ))}

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                    <Animated.View style={[styles.card, { opacity: fadeIn, transform: [{ translateY: slideUp }] }]}>
                        {/* Logo */}
                        <View style={styles.logoContainer}>
                            <View style={styles.logoIcon}>
                                <Text style={styles.logoEmoji}>🌿</Text>
                            </View>
                            <Text style={styles.logoText}>FAARZ</Text>
                            <Text style={styles.tagline}>Turning surplus into sustenance</Text>
                        </View>

                        {/* Inputs */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email</Text>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.inputIcon}>📧</Text>
                                <TextInput
                                    placeholder="you@example.com"
                                    placeholderTextColor={COLORS.textMuted}
                                    style={styles.input}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Password</Text>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.inputIcon}>🔒</Text>
                                <TextInput
                                    placeholder="••••••••"
                                    placeholderTextColor={COLORS.textMuted}
                                    style={styles.input}
                                    secureTextEntry
                                />
                            </View>
                        </View>

                        {/* Role selection */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>I am a...</Text>
                            <View style={styles.roleRow}>
                                {[
                                    { label: "Restaurant", emoji: "🍽️" },
                                    { label: "NGO", emoji: "🏛️" },
                                    { label: "Volunteer", emoji: "🙋" },
                                ].map((role) => (
                                    <TouchableOpacity
                                        key={role.label}
                                        style={styles.roleChip}
                                        onPress={() => router.push("/(tabs)")}
                                        activeOpacity={0.7}
                                    >
                                        <Text style={{ fontSize: 18 }}>{role.emoji}</Text>
                                        <Text style={styles.roleLabel}>{role.label}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Sign In */}
                        <TouchableOpacity
                            style={styles.signInBtn}
                            activeOpacity={0.85}
                            onPress={() => router.push("/(tabs)")}
                        >
                            <Text style={styles.signInText}>Sign In</Text>
                            <Text style={{ fontSize: 16 }}>→</Text>
                        </TouchableOpacity>

                        {/* Divider */}
                        <View style={styles.divider}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>or</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        {/* Google */}
                        <TouchableOpacity style={styles.googleBtn} activeOpacity={0.85}>
                            <Text style={{ fontSize: 18 }}>G</Text>
                            <Text style={styles.googleText}>Continue with Google</Text>
                        </TouchableOpacity>

                        {/* Footer */}
                        <Text style={styles.footer}>Made with love by Aamina</Text>
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        padding: SIZES.paddingH,
    },
    card: {
        backgroundColor: COLORS.bgCard,
        borderRadius: SIZES.radiusLg,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 28,
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 28,
    },
    logoIcon: {
        width: 64,
        height: 64,
        borderRadius: 20,
        backgroundColor: COLORS.green,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
        shadowColor: COLORS.green,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 10,
    },
    logoEmoji: { fontSize: 30 },
    logoText: {
        fontSize: 32,
        fontWeight: "800",
        color: COLORS.neon,
        letterSpacing: 2,
    },
    tagline: {
        fontSize: 13,
        color: COLORS.textMuted,
        marginTop: 4,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 12,
        fontWeight: "600",
        color: COLORS.textSecondary,
        marginBottom: 6,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.surface,
        borderRadius: SIZES.radiusSm,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 12,
    },
    inputIcon: {
        fontSize: 16,
        marginRight: 8,
    },
    input: {
        flex: 1,
        height: 48,
        color: COLORS.text,
        fontSize: 14,
    },
    roleRow: {
        flexDirection: "row",
        gap: 10,
    },
    roleChip: {
        flex: 1,
        backgroundColor: COLORS.surface,
        borderRadius: SIZES.radiusSm,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingVertical: 12,
        alignItems: "center",
        gap: 4,
    },
    roleLabel: {
        fontSize: 11,
        fontWeight: "600",
        color: COLORS.textSecondary,
    },
    signInBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        paddingVertical: 14,
        borderRadius: SIZES.radiusSm,
        marginTop: 8,
        backgroundColor: COLORS.green,
    },
    signInText: {
        fontSize: 15,
        fontWeight: "700",
        color: COLORS.bg,
    },
    divider: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 18,
        gap: 12,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.border,
    },
    dividerText: {
        fontSize: 12,
        color: COLORS.textMuted,
    },
    googleBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        paddingVertical: 14,
        borderRadius: SIZES.radiusSm,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    googleText: {
        fontSize: 14,
        fontWeight: "600",
        color: COLORS.text,
    },
    footer: {
        textAlign: "center",
        fontSize: 11,
        color: COLORS.textMuted,
        marginTop: 24,
        opacity: 0.5,
        letterSpacing: 0.5,
    },
});
