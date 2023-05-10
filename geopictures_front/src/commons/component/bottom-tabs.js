import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccueilContainer from "../../features/accueil/containers/accueil.container";
import { HomeScreenNavigator } from "../../../CustomNavigation";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarStyle: {
                position: "absolute",
                bottom: 25,
                left: 20,
                right: 20,
                elevation: 0,
                backgroundColor: "white",
                borderRadius: 15,
                height: 90
            },
        }}>
            <Tab.Screen name="boutique" component={AccueilContainer} options={{
                tabBarIcon: ({}) => (
                    <View style={{alignItems: "center", justifyContent: "center", top:20, left:5}}>
                        <FontAwesome name="shopping-cart" size={35} color="black" />
                        <Text style={{fontSize: 9}}>BOUTIQUE</Text>
                    </View>
                ),
                tabBarLabel: "",
            }}/>
            <Tab.Screen name="accueil" component={HomeScreenNavigator} options={{
                tabBarIcon: ({}) => (
                    <View style={{alignItems: "center", justifyContent: "center", top:20, left:5}}>
                        <FontAwesome name="home" size={35} color="black" />
                        <Text style={{fontSize: 9}}>ACCUEIL</Text>
                    </View>
                ),
                tabBarLabel: "",
            }}/>
            <Tab.Screen name="new" component={AccueilContainer} options={{
                tabBarLabel: "",
                tabBarButton: () => (
                    <TouchableOpacity style={{
                        top: -30,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <View style={{
                            width: 70,
                            height: 70,
                            borderRadius: 35,
                            backgroundColor: '#005202'
                        }}>
                        <FontAwesome name="plus" size={45} color="white" style={{
                            justifyContent: "center",
                            alignItems: "center",
                            top: 14,
                            left: 17
                        }}/>
                        </View>
                    </TouchableOpacity>
                )
            }}/>
            <Tab.Screen name="profil" component={AccueilContainer} options={{
                tabBarIcon: ({}) => (
                    <View style={{alignItems: "center", justifyContent: "center", top:20, right:5}}>
                        <FontAwesome name="star" size={35} color="black" />
                        <Text style={{fontSize: 9}}>CLASSEMENT</Text>
                    </View>
                ),
                tabBarLabel: "",
            }}/>
            <Tab.Screen name="classement" component={AccueilContainer} options={{
                tabBarIcon: ({}) => (
                    <View style={{alignItems: "center", justifyContent: "center", top:20, right:5}}>
                        <FontAwesome name="user" size={35} color="black" />
                        <Text style={{fontSize: 9}}>PROFIL</Text>
                    </View>
                ),
                tabBarLabel: "",
            }}/>
        </Tab.Navigator>
    )
}

export default Tabs;