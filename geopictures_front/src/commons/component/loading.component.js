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
        justifyContent: "center",
        alignItems: "center",
    }
});