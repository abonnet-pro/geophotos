import {BACKGROUND_ASSETS} from "../../../utils/store.utils";
import {Image, ImageBackground, ScrollView, StyleSheet, TextInput, View} from "react-native";
import {Button, Text} from "@rneui/base";
import Picker from "@ouroboros/react-native-picker/index";
import {Region, RegionLibelle} from "../../../commons/enums/regions.enum";
import {Difficulte} from "../../photo/enums/difficulte.enum";
import * as React from "react";
import {commonsStyle, font, primary1} from "../../../commons/styles/commons.styles";

export default function NouvelleDemande({handleEnvoiDemandeZone, zoneLibelle, imageZone, pickImage, handleZoneLibelleChange, onNouvelleZoneEdit,handleIndiceChange, handleTitreChange, regionSelected, handleRegionSelected, zonesOptions, zoneSelected, handleZoneSelected, handleDifficulteSelected, difficulteSelected, handlePressPhoto}) {

    return(
        <ImageBackground
            source={ BACKGROUND_ASSETS.bordure } style={{ padding:5 }} borderRadius={20}>
            <ImageBackground source={ BACKGROUND_ASSETS.background } borderRadius={20}>
                <ScrollView style={ style.nouvelleDemandeContainer } showsVerticalScrollIndicator={false}>
                    <Text style={style.titre}>Nouvelle demande</Text>
                    <View style={style.formulaireContainer}>
                        <View style={style.formulaireLigneContainer}>
                            <View style={style.formulaireLibelleContainer}>
                                <Text style={style.formulaireLibelle}>Region :</Text>
                            </View>
                            <View style={ style.formulaireInputContainer}>
                                <Picker
                                    onChanged={handleRegionSelected}
                                    options={[
                                        {text: RegionLibelle(Region.HAUT_DE_FRANCE), value: Region.HAUT_DE_FRANCE},
                                        {text: RegionLibelle(Region.GRAND_EST), value: Region.GRAND_EST},
                                        {text: RegionLibelle(Region.ILE_DE_FRANCE), value: Region.ILE_DE_FRANCE},
                                        {text: RegionLibelle(Region.NORMANDIE), value: Region.NORMANDIE},
                                        {text: RegionLibelle(Region.BRETAGNE), value: Region.BRETAGNE},
                                        {text: RegionLibelle(Region.PAYS_DE_LA_LOIRE), value: Region.PAYS_DE_LA_LOIRE},
                                        {text: RegionLibelle(Region.CENTRE_VAL_DE_LOIRE), value: Region.CENTRE_VAL_DE_LOIRE},
                                        {text: RegionLibelle(Region.BOURGOGNE_FRANCHE_COMTE), value: Region.BOURGOGNE_FRANCHE_COMTE},
                                        {text: RegionLibelle(Region.AUVERGNE_RHONE_ALPES), value: Region.AUVERGNE_RHONE_ALPES},
                                        {text: RegionLibelle(Region.NOUVELLE_AQUITAINE), value: Region.NOUVELLE_AQUITAINE},
                                        {text: RegionLibelle(Region.OCCITANIE), value: Region.OCCITANIE},
                                        {text: RegionLibelle(Region.PROVENCE_ALPE_COTE_AZUR), value: Region.PROVENCE_ALPE_COTE_AZUR},
                                        {text: RegionLibelle(Region.CORSE), value: Region.CORSE},
                                    ]}
                                    style={{padding: 5}}
                                    value={regionSelected}
                                />
                            </View>
                        </View>

                        {
                            zonesOptions && !onNouvelleZoneEdit ?
                            <View style={style.formulaireLigneContainer}>
                                <View style={style.formulaireLibelleContainer}>
                                    <Text style={style.formulaireLibelle}>Zone :</Text>
                                </View>
                                <View style={ style.formulaireInputContainer}>
                                    <Picker
                                        onChanged={handleZoneSelected}
                                        options={zonesOptions}
                                        style={{padding: 5}}
                                        value={zoneSelected}
                                    />
                                </View>
                            </View> : <></>
                        }

                        {
                            regionSelected && onNouvelleZoneEdit ? <>
                            <View style={style.formulaireLigneContainer}>
                                <View style={style.formulaireLibelleContainer}>
                                    <Text style={style.formulaireLibelle}>Zone :</Text>
                                </View>
                                <View style={ style.formulaireInputContainer}>
                                    <TextInput autoFocus={true} onChangeText={handleZoneLibelleChange} containerStyle={ style.formulaireInputContainer }
                                               inputContainerStyle={{borderBottomWidth:0}}
                                    />
                                </View>
                            </View>

                            <View style={style.formulaireLigneContainer}>
                                <View style={style.formulaireLibelleContainer}>
                                    <Text style={style.formulaireLibelle}>Image :</Text>
                                </View>
                                <View style={style.chooseFileContainer}>
                                    <Button title="Choisir une image" onPress={pickImage} buttonStyle={style.boutonChoose}/>
                                    {imageZone && <Image source={{ uri: imageZone.uri }} style={{ width: 50, height: 50 }} />}
                                </View>
                            </View>

                            <Button disabled={!!!zoneLibelle}
                                    containerStyle={style.boutonEnvoyerZoneContainer}
                                    buttonStyle={style.boutonEnvoyerZone}
                                    title={"Envoyer la demande"}
                                    onPress={handleEnvoiDemandeZone}>
                            </Button>
                            </> : <></>
                        }

                        {
                            zoneSelected && !onNouvelleZoneEdit ? <>
                                <View style={style.formulaireLigneContainer}>
                                    <View style={style.formulaireLibelleContainer}>
                                        <Text style={style.formulaireLibelle}>Difficulté :</Text>
                                    </View>
                                    <View style={ style.formulaireInputContainer}>
                                        <Picker
                                            onChanged={handleDifficulteSelected}
                                            options={[
                                                {text: "Facile", value: Difficulte.FACILE},
                                                {text: "Normal", value: Difficulte.NORMAL},
                                                {text: "Difficile", value: Difficulte.DIFFICILE},
                                                {text: "Extrême", value: Difficulte.EXTREME},
                                            ]}
                                            style={{padding: 5}}
                                            value={difficulteSelected}
                                        />
                                    </View>
                                </View>

                                <View style={style.formulaireLigneContainer}>
                                    <View style={style.formulaireLibelleContainer}>
                                        <Text style={style.formulaireLibelle}>Titre :</Text>
                                    </View>
                                    <View style={ style.formulaireInputContainer}>
                                        <TextInput onChangeText={handleTitreChange} containerStyle={ style.formulaireInputContainer }
                                                   inputContainerStyle={{borderBottomWidth:0}}
                                        />
                                    </View>
                                </View>

                                <View style={style.formulaireLigneContainer}>
                                    <View style={style.formulaireLibelleContainer}>
                                        <Text style={style.formulaireLibelle}>Indice :</Text>
                                    </View>
                                    <View style={ style.formulaireInputContainer}>
                                        <TextInput onChangeText={handleIndiceChange} containerStyle={ style.formulaireInputContainer }
                                                   inputContainerStyle={{borderBottomWidth:0}}
                                        />
                                    </View>
                                </View>

                                <View style={style.formulaireLigneContainer}>
                                    <View style={style.formulaireLibelleContainer}>
                                        <Text style={style.formulaireLibelle}>Photo :</Text>
                                    </View>
                                    <Button
                                        onPress={handlePressPhoto}
                                        title="Prendre une photo"
                                        raised={true}
                                        radius={20}
                                        containerStyle={ style.containerBoutonPhoto }
                                        titleStyle={ font(15, 'bold') }
                                        buttonStyle={ commonsStyle.boutonSuccess }/>
                                </View>
                            </> : <></>
                        }
                    </View>
                </ScrollView>
            </ImageBackground>
        </ImageBackground>
    )
}

const style = StyleSheet.create({
    nouvelleDemandeContainer: {
        height: "100%",
    },
    titre: {
        fontWeight:'bold',
        fontSize:24,
        marginLeft:'auto',
        marginRight:'auto',
        marginTop: 10
    },
    formulaireContainer: {
        margin:10,
    },
    formulaireLibelleContainer: {
        flex:1
    },
    formulaireLibelle: {
        fontSize:16,
        marginRight:5,
        marginTop:'auto',
        marginBottom:'auto'
    },
    formulaireLigneContainer: {
      flexDirection: "row",
      margin:5
    },
    formulaireInputContainer: {
        padding:5,
        flex:2,
        height:35,
        marginRight:5,
        backgroundColor: 'white',
        borderRadius: 20,
    },
    chooseFileContainer: {
        flex:2,
        padding:5,
        marginRight:5,
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems:"center",
    },
    boutonChoose: {
        backgroundColor:'#6c9372',
        borderRadius:5
    },
    boutonEnvoyerZoneContainer: {
        marginTop:70,
        alignItems:"flex-end",
    },
    boutonEnvoyerZone: {
        backgroundColor:primary1
    }
});