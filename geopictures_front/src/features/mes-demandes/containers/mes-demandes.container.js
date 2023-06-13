import {commonsStyle, containerStyle, font} from "../../../commons/styles/commons.styles";
import * as React from "react";
import {ImageBackground, StyleSheet, View} from "react-native";
import {Button, Text} from "@rneui/base";
import {useEffect, useState} from "react";
import {loadDemandes} from "../services/mes-demandes.service";
import MesDemandes from "../component/mes-demandes.component";
import LoadingGeneral from "../../../commons/component/loading-general.component";
import {modalfy} from "react-native-modalfy";

export default function MesDemandesContainer({ navigation }) {

    const [demandes, setDemandes] = useState(null);
    const [loadingDemandes, setLoadingDemandes] = useState(false);
    const {currentModal,openModal,closeModal,closeModals,closeAllModals} = modalfy();

    const init = () => {
        setLoadingDemandes(true);
        loadDemandes()
            .then(demandes => setDemandes(demandes.data.mesDemandes))
            .catch(err => console.log(err))
            .finally(() => setLoadingDemandes(false))
    }

    useEffect(init, []);

    return(
        <ImageBackground
            source={require('../../../../assets/auth_background.jpg')}
            style={ containerStyle.backgroundHover100 }>
            { loadingDemandes && <LoadingGeneral/> }
            <View>
                <Button
                    onPress={() => navigation.navigate("collaboration-container")}
                    title="Nouvelle demande"
                    raised={true}
                    radius={20}
                    containerStyle={ style.containerBoutonNavigation }
                    titleStyle={ font(15, 'bold') }
                    buttonStyle={ commonsStyle.boutonSuccess }/>
            </View>

            <View style={style.containerMesDemandes}>
                <MesDemandes demandes={ demandes } openModal={openModal}></MesDemandes>
            </View >
        </ImageBackground>
    )
}

const style = StyleSheet.create({
    containerBoutonNavigation: {
       alignSelf:"flex-end",
        marginTop:10,
        marginRight:10,
        marginBottom:5,
    },
    containerMesDemandes: {
        marginTop:5,
        marginRight:10,
        marginLeft:10,
        marginBottom:10,
        flex:1
    }
});