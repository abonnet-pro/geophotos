import Svg, { Circle } from "react-native-svg"
import {View, StyleSheet} from "react-native";
import {Text} from "@rneui/base";

export default function PercentageCircle({ size, percentage, colorProgress }) {

    const radio = size - 5;
    const CIRCLE_LENGTH = 2 * Math.PI * radio;

    return(
        <View style={{
            justifyContent: 'center',
            height: size*2,
            width: size*2,
            alignItems:'center',
            alignSelf:'center',
        }}>
            <Svg style={ styles.svgContainer }>
                <Circle
                    cx={size}
                    cy={size}
                    r={radio}
                    stroke={"grey"}
                    strokeWidth={2.5}
                    strokeDasharray={CIRCLE_LENGTH}
                    strokeDashoffset={0}/>
                <Circle
                    cx={size}
                    cy={size}
                    r={radio}
                    stroke={colorProgress}
                    strokeWidth={8}
                    strokeDasharray={CIRCLE_LENGTH}
                    strokeDashoffset={-CIRCLE_LENGTH * (1 - percentage / 100)}
                />
            </Svg>
            <View style={{ position: 'absolute' }}>
                <Text style={ styles.percentageText }>{percentage}%</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    svgContainer: {
        alignSelf: 'center',
        transform: [
            { rotateZ: "90deg" },
            { rotateX: "0deg" },
            { rotateY:"180deg" }
        ]
    },
    percentage: {
        textAlign: 'center',
        color: 'white',
    },
    percentageText: {
        fontWeight: 'bold',
        fontSize: 20
    }
})