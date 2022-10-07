import React, { useEffect, useState } from "react";
import md5 from 'md5';
import Header from '../components/Header'
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from 'expo-image-picker';

import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    Image,
    Button,
    Modal,
    Pressable,
    TextInput,
} from 'react-native'

export default function UpDateProfile() {
    const navigation = useNavigation("")
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState("")
    const [banner, setBanner] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [newAvatar, setNewAvatar] = useState(null)
    const [newBanner, setNewBanner] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);

    function BackBtn() {
        navigation.goBack()
    }

    useEffect(() => {
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
                setEmail(jsonRes.email)
            }
        }

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
                setAvatar(jsonRes.member.avatar)
                setBanner(jsonRes.member.profile_banner)
            }
        }
        getEmail()
        getInfos()
    }, [])

    const handleUploadAvatar = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Il faut une autorisation pour accéder à votre galerie !")
            return
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync()

        if (pickerResult.cancelled === true) {
            return
        }

        setNewAvatar({ localUri: pickerResult.uri })
    }

    const handleUploadBanner = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required !")
            return
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync()

        if (pickerResult.cancelled === true) {
            return
        }

        setSelectedImage({ localUri: pickerResult.uri })
    }

    function handleSubmit() {
        let token = SecureStore.getItemAsync('user_token')

        useEffect(() => {
            const upDateEmail = async () => {
                let url = "https://api.betaseries.com/members/email"
                url += '?token=' + token

                fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "X-BetaSeries-Key": "55ddcaa1bdf7",
                        "X-BetaSeries-Version": "3.0",
                    },
                    body: {
                        email: newEmail
                    }
                }).then(async (response) => {
                    if (response.ok) {
                        alert("Modifications réussis !")
                        navigation.goBack()
                    } else if (!response.ok) {
                        alert(response.errors[0].text)
                    }
                })
            }

            const upDatePassword = async () => {
                let url = "https://api.betaseries.com/members/password"
                url += '?token=' + token

                fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "X-BetaSeries-Key": "55ddcaa1bdf7",
                        "X-BetaSeries-Version": "3.0",
                    },
                    body: {
                        current_password: md5(oldPassword),
                        new_password: md5(newPassword),
                        confirmed_password: md5(confirmPassword),
                    }
                }).then(async (response) => {
                    if (response.ok) {
                        alert("Modifications réussis !")
                        navigation.goBack()
                    } else if (!response.ok) {
                        alert(response.errors[0].text)
                    }
                })
            }

            const upDateAvatar = async () => {
                let url = "https://api.betaseries.com/members/avatar"
                url += '?token=' + token

                fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "X-BetaSeries-Key": "55ddcaa1bdf7",
                        "X-BetaSeries-Version": "3.0",
                    },
                    body: {
                        avatar: newAvatar,
                    }
                }).then(async (response) => {
                    if (response.ok) {
                        alert("Modifications réussis !")
                        navigation.goBack()
                    } else if (!response.ok) {
                        alert(response.errors[0].text)
                    }
                })
            }

            const upDateBanner = async () => {
                let url = "https://api.betaseries.com/members/banner"
                url += '?token=' + token

                fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "X-BetaSeries-Key": "55ddcaa1bdf7",
                        "X-BetaSeries-Version": "3.0",
                    },
                    body: {
                        banner: newBanner,
                    }
                }).then(async (response) => {
                    if (response.ok) {
                        alert("Modifications réussis !")
                        navigation.goBack()
                    } else if (!response.ok) {
                        alert(response.errors[0].text)
                    }
                })
            }
            upDateEmail()
            upDatePassword()
            upDateAvatar()
            upDateBanner()
        }, [])
    }

    function handleDelete() {
        useEffect(() => {
            const deleteAccount = async () => {
                let token = SecureStore.getItemAsync('user_token')
                let url = 'https://api.betaseries.com/members/delete'
                url += '?token=' + token

                fetch(url, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                        "X-BetaSeries-Key": "55ddcaa1bdf7",
                        "X-BetaSeries-Version": "3.0",
                    },
                }).then(async (response) => {
                    if (response.ok) {
                        alert("Procédure de suppression du compte réussie !")
                        navigation.goBack()
                    } else if (!response.ok) {
                        alert(response.errors[0].text)
                    }
                })
            }
            deleteAccount()
        }, [])
    }

    return (
        <View style={styles.updatePage}>
            <ScrollView>
                <Header />
                <Pressable style={styles.backBtn} onPress={BackBtn}>
                    <Icon name='arrow-back-outline' type='ionicon' style={styles.backBtn} size={20} reverse color={"rgba(140, 140, 140, 0.2)"} />
                </Pressable>
                <Text style={styles.titleUpdate}>
                    Modification Profil
                </Text>
                <View style={styles.formContainer}>
                    <View style={styles.dataForm}>
                        <Text style={styles.titleInput}>Email</Text>
                        <TextInput
                            style={styles.textInput}
                            name="Email"
                            placeholder={email}
                            onChangeText={setNewEmail}
                            value={newEmail}
                            selectionColor="#ff6f00"
                            color="#ff6f00"
                            placeholderTextColor="#808080"
                        />
                    </View>
                    <View style={styles.dataForm}>
                        <Text style={styles.titleInput}>Ancien Mot de Passe</Text>
                        <TextInput
                            style={styles.textInput}
                            name="Old Password"
                            placeholder="*******"
                            onChangeText={setOldPassword}
                            value={oldPassword}
                            secureTextEntry={true}
                            selectionColor="#ff6f00"
                            color="#ff6f00"
                            placeholderTextColor="#808080"
                        />
                    </View>
                    <View style={styles.dataForm}>
                        <Text style={styles.titleInput}>Nouveau Mot de Passe</Text>
                        <TextInput
                            style={styles.textInput}
                            name="New Password"
                            placeholder="*******"
                            onChangeText={setNewPassword}
                            value={newPassword}
                            secureTextEntry={true}
                            selectionColor="#ff6f00"
                            color="#ff6f00"
                            placeholderTextColor="#808080"
                        />
                    </View>
                    <View style={styles.dataForm}>
                        <Text style={styles.titleInput}>Confirmation du Mot de Passe</Text>
                        <TextInput
                            style={styles.textInput}
                            name="Confirm Password"
                            placeholder="*******"
                            onChangeText={setConfirmPassword}
                            value={confirmPassword}
                            secureTextEntry={true}
                            selectionColor="#ff6f00"
                            color="#ff6f00"
                            placeholderTextColor="#808080"
                        />
                    </View>
                    <View style={[styles.dataForm, styles.imgForm]}>
                        <Text style={styles.txtInputImg}>Avatar</Text>
                        {avatar != "" ?
                            <Image source={{ uri: `${avatar}` }} style={styles.profile} />
                            :
                            <Image source={require('../assets/user_default.png')} style={styles.profile} />
                        }
                        <Pressable style={styles.btnImg} onPress={handleUploadAvatar}>
                            <Text style={styles.txtImg}>Modifier l'avatar</Text>
                        </Pressable>
                    </View>
                    <View style={[styles.dataForm, styles.imgForm]}>
                        <Text style={styles.txtInputImg}>Banniere</Text>
                        {banner != "" ?
                            <Image source={{ uri: `${banner}` }} style={styles.banner} />
                            :
                            <Image source={require('../assets/black_banner.jpg')} style={styles.banner} />
                        }
                        <Pressable style={styles.btnImg} onPress={handleUploadBanner}>
                            <Text style={styles.txtImg}>Modifier la banniere</Text>
                        </Pressable>
                    </View>
                    <Button title="Envoyer" onPress={handleSubmit} color={"#ff6f00"} />
                </View>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            alert("Heureux que vous restiez :)");
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredModalView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Êtes vous sur de vouloir supprimer votre compte ?</Text>
                                <Pressable
                                    style={[styles.button, styles.buttonDelete]}
                                    onPress={() => handleDelete()}
                                >
                                    <Text style={styles.textStyle}>Supprimer</Text>
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
                        <Text style={styles.showDeleteModal}>Supprimer mon compte</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    updatePage: {
        flex: 1,
        backgroundColor: '#212121',
        justifyContent: "center",
    },
    backBtn: {
        position: "fixed"
    },
    titleUpdate: {
        color: '#ff6f00',
        fontSize: 21,
        fontWeight: "bold",
        textAlign: "center",
    },
    formContainer: {

    },
    titleInput: {
        marginTop: 20,
        marginLeft: 15,
        color: "#fff"
    },
    textInput: {
        padding: 15,
        marginTop: 5,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: "#3d3d3d",
        borderRadius: 5,
    },
    imgForm: {
        marginVertical: 10,
        marginHorizontal: 15,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#3d3d3d",
        borderRadius: 5,
        padding: 10,
    },
    btnImg: {
        justifyContent: "center",
        alignSelf: "center",
        backgroundColor: "#3d3d3d",
        width: 200,
        height: 30,
        borderRadius: 5,
        marginTop: 10,
    },
    txtImg: {
        color: "#fff",
        textAlign: "center",
        alignItems: "center",
    },
    txtInputImg: {
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        margin: 10,
    },
    profile: {
        borderRadius: 50,
        height: 100,
        width: 100,
        alignSelf: "center"
    },
    banner: {
        height: 100,
        width: 300,
        alignSelf: "center"
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
    buttonDelete: {
        backgroundColor: "rgba(220, 11, 11, 0.6)",
        color: "#fff",
        marginBottom: 10,
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
    showDeleteModal: {
        color: "rgb(255, 0, 0)",
        fontSize: 20,
        marginBottom: 50,
    }
})
