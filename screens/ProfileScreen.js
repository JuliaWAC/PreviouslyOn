import React, { useState, useEffect } from 'react'
import * as SecureStore from "expo-secure-store";
import Header from '../components/Header'
import { StatusBar } from 'expo-status-bar';
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    Image,
    Button,
    Modal,
    Pressable,
    Alert
} from 'react-native'

const ProfileScreen = () => {
    const [infosUser, setInfosUser] = useState([])
    const [userEmail, setEmailUser] = useState("")
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation("")

    function Logout() {
        SecureStore.deleteItemAsync('user_token')
        console.log('Déco');
        navigation.navigate('LogPage')
    }

    useEffect(() => {
        const getInfos = async () => {
            let getUserId = await SecureStore.getItemAsync('user_id')
            let userId = parseInt(getUserId)
            let url = "https://api.betaseries.com/members/infos"
            url += '?id=' + userId

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "X-BetaSeries-Key": "55ddcaa1bdf7",
                    "X-BetaSeries-Version": "3.0",
                }
            })
            if (response.ok) {
                const jsonRes = await response.json()
                setInfosUser(jsonRes.member)
            }
        }

        const getEmail = async () => {
            let token = await SecureStore.getItemAsync('user_token')
            let url = 'https://api.betaseries.com/members/email'
            url += '?token=' + token

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "X-BetaSeries-Key": "55ddcaa1bdf7",
                    "X-BetaSeries-Version": "3.0",
                }
            })
            if (response.ok) {
                const jsonRes = await response.json()
                setEmailUser(jsonRes.email)
            }
        }
        getInfos()
        getEmail()
    }, [])

    function UpdateProfile() {
        navigation.navigate('UpDateProfile')
    }

    useEffect(() => {
        const getInfos = async () => {
            let getUserId = await SecureStore.getItemAsync('user_id')
            let userId = parseInt(getUserId)
            let url = "https://api.betaseries.com/members/infos"
            url += '?id=' + userId

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "X-BetaSeries-Key": "55ddcaa1bdf7",
                    "X-BetaSeries-Version": "3.0",
                }
            })
            if (response.ok) {
                const jsonRes = await response.json()
                setInfosUser(jsonRes.member)
            }
        }

        const getEmail = async () => {
            let token = await SecureStore.getItemAsync('user_token')
            let url = 'https://api.betaseries.com/members/email'
            url += '?token=' + token

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "X-BetaSeries-Key": "55ddcaa1bdf7",
                    "X-BetaSeries-Version": "3.0",
                }
            })
            if (response.ok) {
                const jsonRes = await response.json()
                setEmailUser(jsonRes.email)
            }
        }
        getInfos()
        getEmail()
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView>
                <Header />
                <StatusBar barStyle='auto' />
                <View style={styles.banner}>
                    <Image source={{ uri: `${infosUser.profile_banner}` }} style={styles.banner} />
                </View>
                <View style={styles.center}>
                    {infosUser.avatar != null ?
                        <Image source={{ uri: `${infosUser.avatar}` }} style={styles.profile} />
                        :
                        <Image source={require('../assets/user_default.png')} style={styles.profile} />
                    }
                </View>
                <View style={styles.infosCentered}>
                    <View style={styles.centerInfos}>
                        <Text style={styles.name}>{infosUser.login}</Text>
                        <Text style={styles.email}>{userEmail}</Text>
                    </View>
                    <View style={styles.centeredView}>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                Alert.alert("Modal has been closed.");
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={styles.centeredModalView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>Êtes vous sur de vouloir vous déconnecter ?</Text>
                                    <Pressable
                                        style={[styles.button, styles.buttonDisconnect]}
                                        onPress={() => Logout()}
                                    >
                                        <Text style={styles.textStyle}>Déconnexion</Text>
                                    </Pressable>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => setModalVisible(!modalVisible)}
                                    >
                                        <Text style={styles.textStyle}>Continuer sur l'application</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                        <Pressable
                            style={styles.button}
                            onPress={() => setModalVisible(true)}
                        >
                            <Icon style={styles.textStyle} name='power-outline' type='ionicon' size={20} reverse color={"rgba(187, 11, 11, 0.6)"} />
                        </Pressable>
                    </View>
                </View>
                <View>
                    <Button title='Modifier mon profil' color="#ff6f00" onPress={UpdateProfile}/>
                </View>
                <View style={styles.center}>
                    <Button
                        title="Liste d'amis"
                        color="#ff6f00"
                        onPress={() => navigation.navigate('FriendsPage')}
                    />
                </View>
                <View style={styles.favoriteContainer}>
                    <Pressable onPress={() => navigation.navigate('ViewSeries')}>
                        <View style={styles.iconView}>
                            <Icon style={styles.iconStyle} name='tv-outline' type='ionicon' size={30} color='#ff6f00' />
                            <Text style={styles.text}>Séries Vus</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('ViewMovies')}>
                        <View style={styles.iconView}>
                            <Icon style={styles.iconStyle} name='film-outline' type='ionicon' size={30} color='#ff6f00' />
                            <Text style={styles.text}>Films Vus</Text>
                        </View>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#212121',
    },
    banner: {
        width: '100%',
        backgroundColor: '#000',
        height: 200,
    },
    image: {
        width: 30,
        height: 30,
    },
    profile: {
        width: 140,
        height: 140,
        borderRadius: 100,
        marginTop: -70,
    },
    center: {
        alignItems: 'center',
    },
    name: {
        fontSize: 25,
        fontWeight: 'bold',
        padding: 10,
        color: '#fff',
    },
    email: {
        fontSize: 14,
        padding: 10,
        color: '#808080',
    },
    iconView: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    iconStyle: {
        width: 50,
        height: 50,
    },
    text: {
        color: '#808080',
        margin: 8,
    },
    infosCentered: {
        display: "flex",
        justifyContent: "space-between",
        margin: 0,
    },
    centeredView: {
        alignItems: "center",
    },
    centerInfos: {
        alignItems: "center",
    },
    centeredModalView: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    modalView: {
        margin: 20,
        backgroundColor: "black",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#ff6f00",
        shadowOpacity: 0.6,
        shadowRadius: 15,
        elevation: 5,
        backgroundColor: "#212121"
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: "#808080",
        color: "#fff",
    },
    buttonDisconnect: {
        backgroundColor: "rgba(220, 11, 11, 0.6)",
        color: "#fff",
        marginBottom: 15,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: "#fff"
    },
    textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
    favoriteContainer: {
        marginTop: 30
    }
})

export default ProfileScreen;
