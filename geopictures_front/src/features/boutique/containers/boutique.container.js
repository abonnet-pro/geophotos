import {containerStyle} from "../../../commons/styles/commons.styles";
import {ImageBackground, ScrollView, StyleSheet, View} from "react-native";
import {useEffect, useState} from "react";
import {achatBoutique, loadBoutique} from "../services/boutique.service";
import LoadingGeneral from "../../../commons/component/loading-general.component";
import {handleError} from "../../../utils/http.utils";
import Toast from "react-native-root-toast";
import AvatarsBoutique from "../components/avatars-boutique.component";
import BorduresBoutique from "../components/bordures-boutique.component";
import TitresBoutique from "../components/titres-boutique.component";
import GadgetsBoutique from "../components/gadgets-boutique.component";
import {modalfy} from "react-native-modalfy";

export default function BoutiqueContainer({ navigation }) {

    const [loadingBoutique, setLoadingBoutique] = useState(false);
    const [boutique, setBoutique] = useState(null);
    const {currentModal,openModal,closeModal,closeModals,closeAllModals} = modalfy();

    const init = () => {
        load();
    }

    const load = () => {
        setLoadingBoutique(true);
        loadBoutique()
            .then(boutique => setBoutique(boutique.data))
            .catch(err => {
                handleError(err, navigation);
                Toast.show(err.response.data);
            })
            .finally(() => setLoadingBoutique(false))
    }

    const handlePressGadgetInfos = (gadget) => {
        openModal("ModalInfoGadget", {gadget: gadget, showAction: false});
    }

    const handlePressAchat = (boutiqueId, typeAchatBoutique) => {
        const achatBoutiqueRequest = {
            typeAchatBoutique: typeAchatBoutique,
            boutiqueId: boutiqueId
        }

        setLoadingBoutique(true);

        achatBoutique(achatBoutiqueRequest)
            .then(_ => {
                load();
            })
            .catch(err => {
                handleError(err, navigation);
                Toast.show(err.response.data)
            })
            .finally(() => setLoadingBoutique(false))
    }

    useEffect(init, []);

    return (
        <ImageBackground
            source={require('../../../../assets/auth_background.jpg')}
            style={ containerStyle.backgroundHover100 }>
            {
                loadingBoutique ? <LoadingGeneral titre={"Chargement en cours"}/>
                    :
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
                            <AvatarsBoutique handlePressAchat={handlePressAchat} avatarsBoutique={boutique?.avatarsBoutique}/>
                        </View>

                        <View>
                            <BorduresBoutique handlePressAchat={handlePressAchat} borduresBoutique={boutique?.borduresBoutique}/>
                        </View>

                        <View>
                            <TitresBoutique handlePressAchat={handlePressAchat} titresBoutique={boutique?.titresBoutique}/>
                        </View>

                        <View style={{ marginBottom:20}}>
                            <GadgetsBoutique handlePressAchat={handlePressAchat} gadgetsBoutique={boutique?.gadgtesBoutique} handlePressGadgetInfos={handlePressGadgetInfos}/>
                        </View>
                    </ScrollView>
            }
        </ImageBackground>
    )
}

const style = StyleSheet.create({
    avatarsContainer: {

    }
});