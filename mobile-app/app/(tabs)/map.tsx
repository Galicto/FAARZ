import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const nearbyDonations = [
    { id: "DON-2847", restaurant: "Green Bowl Kitchen", food: "Dal Chawal × 50", distance: "0.8 km", type: "Veg", status: "Available" },
    { id: "DON-2846", restaurant: "Tandoori Nights", food: "Roti × 200", distance: "1.2 km", type: "Veg", status: "Available" },
    { id: "DON-2844", restaurant: "Spice Route", food: "Biryani × 80", distance: "2.1 km", type: "Non-Veg", status: "Assigned" },
    { id: "DON-2842", restaurant: "Royal Kitchen", food: "Paneer Tikka × 60", distance: "3.4 km", type: "Veg", status: "Available" },
];

export default function MapScreen() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Nearby Donations</Text>
            <Text style={styles.subtitle}>Find surplus food near you</Text>

            {/* Map placeholder */}
            <View style={styles.mapPlaceholder}>
                <Text style={{ fontSize: 48 }}>🗺️</Text>
                <Text style={styles.mapText}>Interactive map will display here</Text>
                <Text style={styles.mapSubText}>Requires Google Maps API key</Text>
            </View>

            {/* Filter chips */}
            <View style={styles.filterRow}>
                {["All", "< 1km", "1-3km", "3-5km", "Veg Only"].map((f) => (
                    <TouchableOpacity key={f} style={styles.filterChip} activeOpacity={0.7}>
                        <Text style={styles.filterText}>{f}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Nearby List */}
            {nearbyDonations.map((d) => (
                <View key={d.id} style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.cardTitle}>{d.restaurant}</Text>
                            <Text style={styles.cardFood}>{d.food}</Text>
                        </View>
                        <View style={styles.distanceBadge}>
                            <Text style={styles.distanceText}>📍 {d.distance}</Text>
                        </View>
                    </View>
                    <View style={styles.cardFooter}>
                        <Text style={[styles.typeTag, { color: d.type === "Veg" ? COLORS.green : COLORS.danger }]}>
                            {d.type === "Veg" ? "🟢" : "🔴"} {d.type}
                        </Text>
                        {d.status === "Available" ? (
                            <TouchableOpacity style={styles.acceptBtn} activeOpacity={0.85}>
                                <Text style={styles.acceptText}>Accept</Text>
                            </TouchableOpacity>
                        ) : (
                            <Text style={styles.assignedText}>Assigned</Text>
                        )}
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.bg, paddingHorizontal: SIZES.paddingH, paddingTop: 60 },
    title: { fontSize: 26, fontWeight: "800", color: COLORS.text },
    subtitle: { fontSize: 13, color: COLORS.textSecondary, marginTop: 4, marginBottom: 20 },
    mapPlaceholder: {
        height: 200,
        backgroundColor: COLORS.bgCard,
        borderRadius: SIZES.radius,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    mapText: { fontSize: 14, color: COLORS.textSecondary, marginTop: 8 },
    mapSubText: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
    filterRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 16 },
    filterChip: {
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: 20,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    filterText: { fontSize: 12, fontWeight: "600", color: COLORS.textSecondary },
    card: {
        backgroundColor: COLORS.bgCard,
        borderRadius: SIZES.radius,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 16,
        marginBottom: 10,
    },
    cardHeader: { flexDirection: "row", alignItems: "flex-start" },
    cardTitle: { fontSize: 15, fontWeight: "700", color: COLORS.text },
    cardFood: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
    distanceBadge: {
        backgroundColor: COLORS.neonGlow,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    distanceText: { fontSize: 11, fontWeight: "700", color: COLORS.neon },
    cardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 12,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    typeTag: { fontSize: 12, fontWeight: "600" },
    acceptBtn: {
        backgroundColor: COLORS.green,
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 20,
    },
    acceptText: { fontSize: 12, fontWeight: "700", color: COLORS.bg },
    assignedText: { fontSize: 12, fontWeight: "600", color: COLORS.textMuted },
});
