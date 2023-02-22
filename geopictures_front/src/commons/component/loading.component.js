import {ActivityIndicator, View, StyleSheet} from "react-native";

export default function LoadingView({ color }) {

    function getColor() {
        return color ? color : "#000000";
    }

    return (
        <View style={styles.container}>
            <ActivityIndicator size={"large"} color={getColor()}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    }
});