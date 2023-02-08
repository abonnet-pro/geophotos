import {ActivityIndicator, View, StyleSheet} from "react-native";

export default function LoadingView() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={"large"} color="#000000"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    }
});