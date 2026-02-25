import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { COLORS, SIZES } from "../../constants/theme";

export default function ProfileScreen() {
    const router = useRouter();

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
            {/* Avatar & Info */}
            <View style={styles.profileHeader}>
                <View style={styles.avatar}>
                    <Text style={{ fontSize: 36 }}>👤</Text>
                </View>
                <Text style={styles.name}>Aarav Sharma</Text>
                <Text style={styles.role}>Restaurant · Green Bowl Kitchen</Text>
                <View style={styles.verifiedBadge}>
                    <Text style={{ fontSize: 12 }}>✅</Text>
                    <Text style={styles.verifiedText}>Verified Donor</Text>
                </View>
            </View>

            {/* Stats */}
            <View style={styles.statsRow}>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>47</Text>
                    <Text style={styles.statLabel}>Donations</Text>
                </View>
                <View style={[styles.statItem, { borderLeftWidth: 1, borderRightWidth: 1, borderColor: COLORS.border }]}>
                    <Text style={styles.statValue}>1,240</Text>
                    <Text style={styles.statLabel}>Meals</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>12🔥</Text>
                    <Text style={styles.statLabel}>Streak</Text>
                </View>
            </View>

            {/* Menu Items */}
            <View style={styles.menuSection}>
                {[
                    { label: "Edit Profile", emoji: "✏️" },
                    { label: "Notification Settings", emoji: "🔔" },
                    { label: "Download Impact Report (PDF)", emoji: "📄" },
                    { label: "Donation History", emoji: "📋" },
                    { label: "Help & Support", emoji: "❓" },
                    { label: "Privacy Policy", emoji: "🔐" },
                    { label: "Terms of Service", emoji: "📜" },
                ].map((item) => (
                    <TouchableOpacity key={item.label} style={styles.menuItem} activeOpacity={0.7}>
                        <Text style={{ fontSize: 18 }}>{item.emoji}</Text>
                        <Text style={styles.menuLabel}>{item.label}</Text>
                        <Text style={styles.menuArrow}>›</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Logout */}
            <TouchableOpacity
                style={styles.logoutBtn}
                activeOpacity={0.85}
                onPress={() => router.replace("/")}
            >
                <Text style={styles.logoutText}>Sign Out</Text>
            </TouchableOpacity>

            {/* Disclaimer */}
            <View style={styles.disclaimerBox}>
                <Text style={styles.disclaimerText}>
                    ⚠️ FAARZ is a platform to connect surplus food donors with NGOs. We act solely as a connector and do not certify food safety.
                </Text>
            </View>

            <Text style={styles.footer}>Made with love by Aamina</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.bg, paddingHorizontal: SIZES.paddingH, paddingTop: 60 },
    profileHeader: { alignItems: "center", marginBottom: 24 },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.bgCard,
        borderWidth: 2,
        borderColor: COLORS.green,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
        shadowColor: COLORS.green,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
    },
    name: { fontSize: 22, fontWeight: "800", color: COLORS.text },
    role: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
    verifiedBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginTop: 8,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        backgroundColor: "rgba(52,211,153,0.1)",
    },
    verifiedText: { fontSize: 12, fontWeight: "600", color: COLORS.green },
    statsRow: {
        flexDirection: "row",
        backgroundColor: COLORS.bgCard,
        borderRadius: SIZES.radius,
        borderWidth: 1,
        borderColor: COLORS.border,
        marginBottom: 24,
    },
    statItem: { flex: 1, alignItems: "center", paddingVertical: 16 },
    statValue: { fontSize: 20, fontWeight: "800", color: COLORS.neon },
    statLabel: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
    menuSection: {
        backgroundColor: COLORS.bgCard,
        borderRadius: SIZES.radius,
        borderWidth: 1,
        borderColor: COLORS.border,
        overflow: "hidden",
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        gap: 12,
    },
    menuLabel: { flex: 1, fontSize: 14, fontWeight: "500", color: COLORS.text },
    menuArrow: { fontSize: 18, color: COLORS.textMuted },
    logoutBtn: {
        marginTop: 20,
        paddingVertical: 14,
        borderRadius: SIZES.radiusSm,
        backgroundColor: "rgba(255,107,107,0.1)",
        borderWidth: 1,
        borderColor: "rgba(255,107,107,0.3)",
        alignItems: "center",
    },
    logoutText: { fontSize: 14, fontWeight: "700", color: COLORS.danger },
    disclaimerBox: {
        marginTop: 16,
        padding: 14,
        borderRadius: SIZES.radiusSm,
        backgroundColor: "rgba(251,191,36,0.08)",
        borderWidth: 1,
        borderColor: "rgba(251,191,36,0.2)",
    },
    disclaimerText: { fontSize: 11, color: COLORS.textSecondary, lineHeight: 16 },
    footer: {
        textAlign: "center",
        fontSize: 11,
        color: COLORS.textMuted,
        marginTop: 20,
        opacity: 0.5,
        letterSpacing: 0.5,
    },
});
