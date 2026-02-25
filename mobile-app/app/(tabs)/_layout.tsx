import { Tabs } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

function TabIcon({
    label,
    emoji,
    focused,
}: {
    label: string;
    emoji: string;
    focused: boolean;
}) {
    return (
        <View style={[styles.tabItem, focused && styles.tabItemActive]}>
            <Text style={{ fontSize: 20 }}>{emoji}</Text>
            <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>
                {label}
            </Text>
        </View>
    );
}

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: COLORS.surface,
                    borderTopColor: COLORS.border,
                    borderTopWidth: 1,
                    height: 72,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarShowLabel: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon label="Home" emoji="🏠" focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="donate"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon label="Donate" emoji="🤲" focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="map"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon label="Map" emoji="🗺️" focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="impact"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon label="Impact" emoji="📊" focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon label="Profile" emoji="👤" focused={focused} />
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabItem: {
        alignItems: "center",
        gap: 2,
        paddingVertical: 2,
        paddingHorizontal: 12,
        borderRadius: 12,
    },
    tabItemActive: {
        backgroundColor: COLORS.neonGlow,
    },
    tabLabel: {
        fontSize: 10,
        fontWeight: "600",
        color: COLORS.textMuted,
    },
    tabLabelActive: {
        color: COLORS.neon,
    },
});
