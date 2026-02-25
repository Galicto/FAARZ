import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../constants/theme";

export default function RootLayout() {
    return (
        <>
            <StatusBar style="light" backgroundColor={COLORS.bg} />
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: COLORS.bg },
                    animation: "fade",
                }}
            />
        </>
    );
}
