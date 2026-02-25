import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const impactStats = [
    { label: "Total Meals Donated", value: "1,240", emoji: "🍛", color: COLORS.neon },
    { label: "CO₂ Emissions Saved", value: "89 kg", emoji: "🌿", color: COLORS.green },
    { label: "Waste Diverted", value: "215 kg", emoji: "♻️", color: COLORS.info },
    { label: "Donation Streak", value: "12 days", emoji: "🔥", color: COLORS.warning },
];

const monthlyBreakdown = [
    { month: "Jan 2026", meals: 180, co2: "12kg" },
    { month: "Dec 2025", meals: 240, co2: "16kg" },
    { month: "Nov 2025", meals: 210, co2: "14kg" },
    { month: "Oct 2025", meals: 195, co2: "13kg" },
    { month: "Sep 2025", meals: 160, co2: "11kg" },
    { month: "Aug 2025", meals: 140, co2: "9kg" },
];

const leaderboard = [
    { rank: 1, name: "Green Bowl Kitchen", meals: 4200, emoji: "🥇" },
    { rank: 2, name: "Tandoori Nights", meals: 3100, emoji: "🥈" },
    { rank: 3, name: "You", meals: 1240, emoji: "🥉", isMe: true },
    { rank: 4, name: "Fresh Bake Café", meals: 980, emoji: "4️⃣" },
    { rank: 5, name: "Café Bloom", meals: 720, emoji: "5️⃣" },
];

export default function ImpactScreen() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Your Impact</Text>
            <Text style={styles.subtitle}>See the difference you&apos;re making</Text>

            {/* Impact Cards */}
            <View style={styles.impactGrid}>
                {impactStats.map((s) => (
                    <View key={s.label} style={styles.impactCard}>
                        <Text style={{ fontSize: 28 }}>{s.emoji}</Text>
                        <Text style={[styles.impactValue, { color: s.color }]}>{s.value}</Text>
                        <Text style={styles.impactLabel}>{s.label}</Text>
                    </View>
                ))}
            </View>

            {/* Monthly Report */}
            <Text style={styles.sectionTitle}>Monthly Report</Text>
            {monthlyBreakdown.map((m) => (
                <View key={m.month} style={styles.monthRow}>
                    <Text style={styles.monthName}>{m.month}</Text>
                    <View style={{ flexDirection: "row", gap: 12 }}>
                        <Text style={styles.monthStat}>🍛 {m.meals}</Text>
                        <Text style={styles.monthStat}>🌿 {m.co2}</Text>
                    </View>
                </View>
            ))}

            {/* Leaderboard */}
            <Text style={styles.sectionTitle}>Leaderboard</Text>
            {leaderboard.map((l) => (
                <View
                    key={l.rank}
                    style={[styles.leaderRow, l.isMe && styles.leaderRowMe]}
                >
                    <Text style={{ fontSize: 20 }}>{l.emoji}</Text>
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={[styles.leaderName, l.isMe && { color: COLORS.neon }]}>{l.name}</Text>
                    </View>
                    <Text style={styles.leaderMeals}>{l.meals.toLocaleString()} meals</Text>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.bg, paddingHorizontal: SIZES.paddingH, paddingTop: 60 },
    title: { fontSize: 26, fontWeight: "800", color: COLORS.text },
    subtitle: { fontSize: 13, color: COLORS.textSecondary, marginTop: 4, marginBottom: 24 },
    impactGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        marginBottom: 24,
    },
    impactCard: {
        width: "48%" as unknown as number,
        backgroundColor: COLORS.bgCard,
        borderRadius: SIZES.radius,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 16,
        alignItems: "center",
        gap: 6,
    },
    impactValue: { fontSize: 24, fontWeight: "800" },
    impactLabel: { fontSize: 11, color: COLORS.textMuted, textAlign: "center" },
    sectionTitle: { fontSize: 18, fontWeight: "700", color: COLORS.text, marginBottom: 12, marginTop: 8 },
    monthRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: COLORS.bgCard,
        borderRadius: SIZES.radiusSm,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 14,
        marginBottom: 6,
    },
    monthName: { fontSize: 13, fontWeight: "600", color: COLORS.text },
    monthStat: { fontSize: 12, color: COLORS.textSecondary },
    leaderRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.bgCard,
        borderRadius: SIZES.radiusSm,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 14,
        marginBottom: 6,
    },
    leaderRowMe: {
        borderColor: COLORS.neon,
        backgroundColor: COLORS.neonGlow,
    },
    leaderName: { fontSize: 14, fontWeight: "600", color: COLORS.text },
    leaderMeals: { fontSize: 12, fontWeight: "700", color: COLORS.green },
});
