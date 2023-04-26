import {Avatar} from "@rneui/themed";
import {URL_API} from "../../../utils/url.utils";
import * as React from "react";
import {useState} from "react";
import {StyleSheet, View} from "react-native";

export default function AvatarsList({ avatars, avatarActif, onSaveAvatar }) {

    const handlePressAvatar = (avatar) => {
    }

    return(
        <>
            {
                avatars && avatars.map(avatar => {
                    return(
                        <View key={avatar.id}>
                            <Avatar
                                onPress={ () => onSaveAvatar(avatar) }
                                containerStyle={ style.avatarContainer }
                                avatarStyle={ avatarActif?.id === avatar.id ? style.avatarChoosen : {} }
                                size={64}
                                key={ avatar.id }
                                rounded
                                source={{ uri :`${URL_API}/images/${avatar.image}` }}/>
                        </View>
                    )
                })
            }
        </>
    )
}

const style = StyleSheet.create({
    avatarContainer: {
        margin:3,
    },
    avatarChoosen: {
        borderStyle: "solid",
        borderColor: 'white',
        borderWidth: 2
    }
})