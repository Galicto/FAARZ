import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const categories = ["Cooked Meals", "Packaged Food", "Bakery", "Beverages", "Dairy", "Fruits"];
const allergens = ["Gluten", "Dairy", "Nuts", "Soy", "Eggs"];

export default function DonateScreen() {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isVeg, setIsVeg] = useState(true);
    const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
    const [quantity, setQuantity] = useState("");
    const [pickupWindow, setPickupWindow] = useState("30 min");

    const toggleAllergen = (a: string) => {
        setSelectedAllergens((prev) =>
            prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
        );
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Donate Food</Text>
            <Text style={styles.subtitle}>Fill in details about your surplus food</Text>

            {/* Category */}
            <Text style={styles.label}>Food Category</Text>
            <View style={styles.chipRow}>
                {categories.map((c) => (
                    <TouchableOpacity
                        key={c}
                        style={[styles.chip, selectedCategory === c && styles.chipActive]}
                        onPress={() => setSelectedCategory(c)}
                        activeOpacity={0.7}
                    >
                        <Text style={[styles.chipText, selectedCategory === c && styles.chipTextActive]}>{c}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Veg / Non-veg */}
            <Text style={styles.label}>Type</Text>
            <View style={styles.typeRow}>
                <TouchableOpacity
                    style={[styles.typeBtn, isVeg && styles.typeBtnActive]}
                    onPress={() => setIsVeg(true)}
                    activeOpacity={0.7}
                >
                    <Text style={{ fontSize: 18 }}>🟢</Text>
                    <Text style={[styles.typeText, isVeg && { color: COLORS.green }]}>Veg</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.typeBtn, !isVeg && styles.typeBtnNonVeg]}
                    onPress={() => setIsVeg(false)}
                    activeOpacity={0.7}
                >
                    <Text style={{ fontSize: 18 }}>🔴</Text>
                    <Text style={[styles.typeText, !isVeg && { color: COLORS.danger }]}>Non-Veg</Text>
                </TouchableOpacity>
            </View>

            {/* Allergens */}
            <Text style={styles.label}>Allergen Tags</Text>
            <View style={styles.chipRow}>
                {allergens.map((a) => (
                    <TouchableOpacity
                        key={a}
                        style={[styles.chip, selectedAllergens.includes(a) && styles.chipWarning]}
                        onPress={() => toggleAllergen(a)}
                        activeOpacity={0.7}
                    >
                        <Text style={[styles.chipText, selectedAllergens.includes(a) && { color: COLORS.warning }]}>{a}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Quantity */}
            <Text style={styles.label}>Quantity (servings)</Text>
            <TextInput
                placeholder="e.g., 50"
                placeholderTextColor={COLORS.textMuted}
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
                style={styles.input}
            />

            {/* Pickup Window */}
            <Text style={styles.label}>Pickup Window</Text>
            <View style={styles.chipRow}>
                {["30 min", "1 hour", "2 hours", "4 hours"].map((t) => (
                    <TouchableOpacity
                        key={t}
                        style={[styles.chip, pickupWindow === t && styles.chipActive]}
                        onPress={() => setPickupWindow(t)}
                        activeOpacity={0.7}
                    >
                        <Text style={[styles.chipText, pickupWindow === t && styles.chipTextActive]}>{t}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Hygiene Declaration */}
            <View style={styles.hygieneBox}>
                <Text style={{ fontSize: 16 }}>✅</Text>
                <Text style={styles.hygieneText}>
                    I declare this food is safe for consumption, prepared under hygienic conditions, and within its freshness window.
                </Text>
            </View>

            {/* Upload Photo */}
            <TouchableOpacity style={styles.uploadBtn} activeOpacity={0.7}>
                <Text style={{ fontSize: 24 }}>📸</Text>
                <Text style={styles.uploadText}>Upload Food Photo</Text>
            </TouchableOpacity>

            {/* Submit */}
            <TouchableOpacity
                style={styles.submitBtn}
                activeOpacity={0.85}
                onPress={() => Alert.alert("🎉 Donation Submitted!", "Your food donation has been posted. Nearby NGOs have been notified.")}
            >
                <Text style={styles.submitText}>Submit Donation</Text>
                <Text style={{ fontSize: 16 }}>🤲</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.bg, paddingHorizontal: SIZES.paddingH, paddingTop: 60 },
    title: { fontSize: 26, fontWeight: "800", color: COLORS.text },
    subtitle: { fontSize: 13, color: COLORS.textSecondary, marginTop: 4, marginBottom: 24 },
    label: { fontSize: 13, fontWeight: "700", color: COLORS.textSecondary, marginBottom: 8, marginTop: 16 },
    chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    chip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    chipActive: {
        backgroundColor: COLORS.neonGlow,
        borderColor: COLORS.neon,
    },
    chipWarning: {
        backgroundColor: "rgba(251,191,36,0.1)",
        borderColor: COLORS.warning,
    },
    chipText: { fontSize: 12, fontWeight: "600", color: COLORS.textSecondary },
    chipTextActive: { color: COLORS.neon },
    typeRow: { flexDirection: "row", gap: 12 },
    typeBtn: {
        flex: 1,
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
    typeBtnActive: { borderColor: COLORS.green, backgroundColor: "rgba(52,211,153,0.1)" },
    typeBtnNonVeg: { borderColor: COLORS.danger, backgroundColor: "rgba(255,107,107,0.1)" },
    typeText: { fontSize: 14, fontWeight: "600", color: COLORS.textSecondary },
    input: {
        backgroundColor: COLORS.surface,
        borderRadius: SIZES.radiusSm,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 14,
        height: 48,
        color: COLORS.text,
        fontSize: 14,
    },
    hygieneBox: {
        flexDirection: "row",
        gap: 10,
        backgroundColor: "rgba(52,211,153,0.08)",
        borderRadius: SIZES.radiusSm,
        padding: 14,
        marginTop: 20,
        borderWidth: 1,
        borderColor: COLORS.green + "30",
    },
    hygieneText: { flex: 1, fontSize: 12, color: COLORS.textSecondary, lineHeight: 18 },
    uploadBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        paddingVertical: 16,
        borderRadius: SIZES.radius,
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: COLORS.border,
        marginTop: 16,
    },
    uploadText: { fontSize: 14, fontWeight: "600", color: COLORS.textSecondary },
    submitBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        paddingVertical: 16,
        borderRadius: SIZES.radiusSm,
        backgroundColor: COLORS.green,
        marginTop: 20,
    },
    submitText: { fontSize: 16, fontWeight: "700", color: COLORS.bg },
});
