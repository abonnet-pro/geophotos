import FranceSelectRegion from "../components/france-select-region.component";
import {Image, ImageBackground, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {back} from "../../../utils/uri.utils";
import {commonsStyle, containerStyle, font, primary1} from "../../../commons/styles/commons.styles";
import {Button, Text} from "@rneui/base";
import {useState} from "react";
import {loadZonesByCode} from "../../zone/services/zone.service";
import LoadingView from "../../../commons/component/loading.component";

export default function RegionsContainer({ navigation }) {

    const [regionSelected, setRegionSelected] = useState();
    const [loading, setLoading] = useState(false);

    const goToZones = async () => {

        setLoading(true);
        const zones = await loadZonesByCode(regionSelected);
        setLoading(false);

        navigation.navigate("zones", {
            zones: zones.data
        })
    }

    return(
        <ImageBackground
            source={require('../../../../assets/auth_background.jpg')}
            style={ containerStyle.backgroundHover100 }>
            <View style={ style.backContainer }>
                <TouchableWithoutFeedback onPress={ () => navigation.goBack() }>
                    <Image style={ style.back } source={require('../../../../assets/back.png')}></Image>
                </TouchableWithoutFeedback>
            </View>
            <View style={ style.franceContainer }>
                <FranceSelectRegion regionSelected={ regionSelected } setRegionSelected={ setRegionSelected }/>
            </View>
            {
                regionSelected ?
                    <>
                        {
                            loading ?
                                <View style={style.containerValid}>
                                    <LoadingView/>
                                </View>
                                :
                                <Button onPress={() => goToZones()}
                                                                  title="Valider"
                                                                  raised={true}
                                                                  radius={20}
                                                                  titleStyle={ font(35, 'bold') }
                                                                  buttonStyle={ commonsStyle.boutonSuccess }
                                                                  containerStyle={ style.containerValid }
                                                                  disabled={loading}/>
                        }
                    </>
                    : null
            }

        </ImageBackground>
    )
}

const style = StyleSheet.create({
    backContainer: {
      marginLeft: 10,
    },
    back: {
        width: 50,
        height: 50
    },
    franceContainer: {
        marginTop: 40,
    },
    containerValid: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 'auto',
        marginTop: -200,
    }
});