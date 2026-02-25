import React, { useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Animated,
} from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const stats = [
    { label: "Total Donations", value: "47", emoji: "🤲", color: COLORS.green },
    { label: "Meals Saved", value: "1,240", emoji: "🍛", color: COLORS.neon },
    { label: "CO₂ Saved", value: "89kg", emoji: "🌿", color: COLORS.accent },
    { label: "Streak", value: "12🔥", emoji: "🔥", color: COLORS.warning },
];

const recentDonations = [
    { food: "Dal Chawal × 50", time: "12 min ago", status: "Pickup Pending" },
    { food: "Roti × 200", time: "28 min ago", status: "Volunteer Assigned" },
    { food: "Pastries × 30", time: "45 min ago", status: "Delivered" },
    { food: "Biryani × 80", time: "1h ago", status: "Delivered" },
];

function statusColor(s: string) {
    if (s === "Delivered") return COLORS.green;
    if (s === "Volunteer Assigned") return COLORS.info;
    return COLORS.warning;
}

export default function HomeScreen() {
    const fadeIn = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(fadeIn, { toValue: 1, duration: 600, useNativeDriver: true }).start();
    }, []);

    return (
        <Animated.ScrollView
            style={[styles.container, { opacity: fadeIn }]}
            contentContainerStyle={{ paddingBottom: 30 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Assalamu Alaikum 👋</Text>
                    <Text style={styles.subtitle}>Let&apos;s fight hunger today</Text>
                </View>
                <View style={styles.liveIndicator}>
                    <View style={styles.liveDot} />
                    <Text style={styles.liveText}>Live</Text>
                </View>
            </View>

            {/* Stat Cards */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsRow} contentContainerStyle={{ gap: 12 }}>
                {stats.map((s) => (
                    <View key={s.label} style={styles.statCard}>
                        <Text style={{ fontSize: 24 }}>{s.emoji}</Text>
                        <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
                        <Text style={styles.statLabel}>{s.label}</Text>
                    </View>
                ))}
            </ScrollView>

            {/* Quick Actions */}
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionsRow}>
                <TouchableOpacity style={[styles.actionCard, { borderColor: COLORS.green }]} activeOpacity={0.7}>
                    <Text style={{ fontSize: 28 }}>🍲</Text>
                    <Text style={styles.actionLabel}>Donate Food</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionCard, { borderColor: COLORS.info }]} activeOpacity={0.7}>
                    <Text style={{ fontSize: 28 }}>📍</Text>
                    <Text style={styles.actionLabel}>Find Nearby</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionCard, { borderColor: COLORS.purple }]} activeOpacity={0.7}>
                    <Text style={{ fontSize: 28 }}>🚗</Text>
                    <Text style={styles.actionLabel}>Volunteer</Text>
                </TouchableOpacity>
            </View>

            {/* Recent Activity */}
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            {recentDonations.map((d, i) => (
                <View key={i} style={styles.activityCard}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.activityFood}>{d.food}</Text>
                        <Text style={styles.activityTime}>{d.time}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: statusColor(d.status) + "20" }]}>
                        <Text style={[styles.statusText, { color: statusColor(d.status) }]}>{d.status}</Text>
                    </View>
                </View>
            ))}

            {/* Footer */}
            <Text style={styles.footer}>Made with love by Aamina</Text>
        </Animated.ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.bg, paddingHorizontal: SIZES.paddingH },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingTop: 60,
        paddingBottom: 20,
    },
    greeting: { fontSize: 24, fontWeight: "800", color: COLORS.text },
    subtitle: { fontSize: 14, color: COLORS.textSecondary, marginTop: 2 },
    liveIndicator: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 8 },
    liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.neon },
    liveText: { fontSize: 12, color: COLORS.textMuted },
    statsRow: { marginBottom: 24 },
    statCard: {
        backgroundColor: COLORS.bgCard,
        borderRadius: SIZES.radius,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingVertical: 16,
        paddingHorizontal: 20,
        alignItems: "center",
        gap: 4,
        width: 130,
    },
    statValue: { fontSize: 22, fontWeight: "800" },
    statLabel: { fontSize: 11, color: COLORS.textMuted },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: COLORS.text,
        marginBottom: 12,
    },
    actionsRow: { flexDirection: "row", gap: 10, marginBottom: 24 },
    actionCard: {
        flex: 1,
        backgroundColor: COLORS.bgCard,
        borderRadius: SIZES.radius,
        borderWidth: 1,
        paddingVertical: 18,
        alignItems: "center",
        gap: 8,
    },
    actionLabel: { fontSize: 11, fontWeight: "600", color: COLORS.textSecondary },
    activityCard: {
        backgroundColor: COLORS.bgCard,
        borderRadius: SIZES.radiusSm,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 14,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    activityFood: { fontSize: 14, fontWeight: "600", color: COLORS.text },
    activityTime: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
    statusBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
    statusText: { fontSize: 10, fontWeight: "700" },
    footer: {
        textAlign: "center",
        fontSize: 11,
        color: COLORS.textMuted,
        marginTop: 24,
        opacity: 0.5,
        letterSpacing: 0.5,
    },
});
