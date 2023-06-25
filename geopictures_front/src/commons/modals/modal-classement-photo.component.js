import React, {useEffect, useState} from 'react'
import {ImageBackground, ScrollView, StyleSheet, View} from "react-native";
import {Button} from "@rneui/themed";
import { getClassementByPhotoId } from '../../features/classement/services/classement.service';
import { Text } from '@rneui/base';
import ClassementResume from '../../features/classement/component/classement-resume.component';

const ModalClassementPhoto = ({ modal: { closeModal, getParam }}) => {

    const [classementPhoto, setClassementPhoto] = useState("");

    const init = () => {
        const photoId = getParam("photoId", "");
        getClassementByPhotoId(photoId)
            .then(classementPhoto => setClassementPhoto(classementPhoto.data.classement))
            .catch(err => console.log(err))
            .finally(() => setLoadingClassement(false));
    }

    useEffect(init, []);

    return(
        <>
            <View style={style.modalContainer}>
                <View style={style.titleContainer}>
                    <Text style={style.title}>Top 3 de cette photo</Text>
                </View>
                <ScrollView style={ style.zones } showsVerticalScrollIndicator={false}>
                        <View style={{ marginBottom: 10}}>
                            {
                                classementPhoto && classementPhoto.length > 0 ? classementPhoto.slice(0, 3).map((rank, index) => {
                                    return(
                                        <View key={ rank.joueurId}>
                                            <ClassementResume rank={rank} index={index} last={ index === classementPhoto.length - 1 }/>
                                        </View>
                                    )
                                }) :
                                    null
                            }
                        </View>
                        {
                            classementPhoto.length > 0 ? null :
                                <View  style={ style.noZoneContainer }>
                                    <Text style={ style.noZone }>{`Donnée insuffisante pour créer un classement. Joue une partie et soit le premier à en faire partie !`}</Text>
                                </View>
                        }
                    </ScrollView>
            </View>
        </>
    )
};

const style = StyleSheet.create({
    modalContainer: {
        backgroundColor: "#5f5f5f",
        padding: 20,
        borderRadius: 20,
        borderWidth:2,
        marginTop: "auto",
        marginBottom: "auto",
        width: 350
    },
    titleContainer: {
        alignSelf:'center',
        margin:5
    },
    title: {
        fontWeight:'bold',
        color:'white',
        fontSize:20,
    },
    descriptionContainer: {
        margin:5
    },
    description: {
        color:'white',
        textAlign:'center'
    },
    boutonContainer: {
        flexDirection:'row',
        alignSelf:'center',
        marginTop:10
    },
    boutonValid: {
        margin:5,
        backgroundColor:'darkgreen',
        borderRadius:10
    },
    boutonCancel: {
        borderRadius:10,
        margin:5,
        backgroundColor:'darkred'
    }
})

export default ModalClassementPhoto;
