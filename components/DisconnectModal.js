import React, { useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { Icon } from "@rneui/themed";

const DiscModal = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation("")

    function Logout() {
        SecureStore.deleteItemAsync('user_token')
        console.log('Déco');
        navigation.navigate('LogPage')
    }

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Êtes vous sur de vouloir vous déconnecter ?</Text>
                        <Pressable
                            style={[styles.button, styles.buttonDisconnect]}
                            onPress={Logout}
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
    );
};

const styles = StyleSheet.create({
    centeredView: {
        alignItems: "flex-end",
        backgroundColor: "pink"
    },
    modalView: {
        margin: 20,
        backgroundColor: "black",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    buttonDisconnect: {
        backgroundColor: "rgba(187, 11, 11, 0.6)",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
});

export default DiscModal;