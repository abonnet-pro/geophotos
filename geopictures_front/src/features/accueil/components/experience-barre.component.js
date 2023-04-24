import {StyleSheet, View} from "react-native";
import {Text} from "@rneui/base";
import {primary1} from "../../../commons/styles/commons.styles";

export default function ExperienceBarre({ experience, prochainNiveau }) {

    const styleExperience = () => {
        const current = experience / prochainNiveau * 100;
        return {
            backgroundColor: primary1,
                width: current + "%",
                height: 20,
        }
    }

    return(
        <>
            <View style={ style.container }>
                <View style={ styleExperience() }>
                </View>
            </View>
            <Text style={ style.description }>{ experience + '/' +  prochainNiveau }</Text>
        </>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: "60%",
        height: 20
    },
    experience: {
        backgroundColor: primary1,
        width: "60%",
        height: 20,
    },
    description: {
        fontWeight: "bold",
    }
});