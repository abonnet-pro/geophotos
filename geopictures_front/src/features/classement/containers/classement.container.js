import {containerStyle} from "../../../commons/styles/commons.styles";
import {ImageBackground} from "react-native";

export default function ClassementContainer() {
    return (
        <ImageBackground
            source={require('../../../../assets/auth_background.jpg')}
            style={ containerStyle.backgroundHover100 }>
        </ImageBackground>
    )
}