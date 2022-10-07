import React, { useState } from "react";
import md5 from 'md5';
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Button,

} from "react-native";

function Signup() {
    const [login, setLogin] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [successMsg, setSuccessMsg] = useState("")
    const navigation = useNavigation("")

    const handleClick = () => {

        let hashPassword = md5(password)
        let bodyParams = {
            login: login,
            email: email,
            password: hashPassword
        }

        let url = "https://api.betaseries.com/members/signup"
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-BetaSeries-Key": "55ddcaa1bdf7",
                "X-BetaSeries-Version": "3.0"
            },
            body: JSON.stringify(bodyParams)
        }).then(async function (response) {
            let jsonRes = await response.json()
            if (jsonRes.errors.length > 0) {

                setErrorMsg(jsonRes.errors[0].text)

            } else if (jsonRes.errors.length <= 0) {

                let data_id = jsonRes.user.id
                let user_id = data_id.toString()

                await SecureStore.setItemAsync("user_id", user_id)
                await SecureStore.setItemAsync("user_token", jsonRes.token)
                
                setSuccessMsg('Inscription effectuée !')
                setTimeout(() => {
                    navigation.navigate('HomeScreen')
                }, "1000")
            }
        })
    }

    return (
        <View style={styles.container}>
            {successMsg != "" ? (
                <View style={styles.successMessageContainer}>
                    <Text style={styles.successMessage}>
                        {successMsg}
                    </Text>
                </View>
            ) : errorMsg != "" ? (
                <View style={styles.errorMessageContainer}>
                    <Text style={styles.errorMessage}>
                        {errorMsg}
                    </Text>
                </View>
            ) : (
                <></>
            )}
            <View style={styles.Middle}>
                <Text style={styles.LoginText}>Inscription</Text>
            </View>
            <View style={styles.text2}>
                <Text style={styles.signupTextMsg}>Vous avez deja un compte ? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.signupText}>Connexion</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.textInput}>
                <TextInput
                    onChangeText={setLogin}
                    value={login}
                    name='login'
                    placeholder="Login"
                    placeholderTextColor="#808080"
                    selectionColor="#ff6f00"
                    color="#ff6f00"
                />
            </View>
            <View style={styles.textInput}>
                <TextInput
                    onChangeText={setEmail}
                    value={email}
                    name='email'
                    placeholder="Email"
                    placeholderTextColor="#808080"
                    selectionColor="#ff6f00"
                    color="#ff6f00"
                />
            </View>
            <View style={styles.textInput}>
                <TextInput
                    name='password'
                    placeholder="Mot de passe"
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={true}
                    placeholderTextColor="#808080"
                    selectionColor="#ff6f00"
                    color="#ff6f00"
                />
            </View>
            <View style={styles.buttonStyle}>
                <Button onPress={handleClick} title="M'inscrire" color="#ff6f00" />
            </View>
        </View>
    )
}

export default () => {
    return (
        <Signup />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#212121',
        justifyContent: "center",
    },
    LoginText: {
        fontSize: 30,
        color: "#ff6f00"
    },
    Middle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text2: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 5,
    },
    signupText: {
        fontWeight: 'bold',
        textDecorationLine: 1,
        color: "#ff6f00"
    },
    signupTextMsg: {
        color: "#fff"
    },
    textInput: {
        padding: 15,
        marginTop: 20,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: "#3d3d3d",
        borderRadius: 5,
    },
    buttonStyle: {
        marginTop: 50,
        marginLeft: 100,
        marginRight: 100,
        backgroundColor: "#3d3d3d",
        borderRadius: 5,
    },
    errorMessageContainer: {
        marginLeft: 80,
        marginRight: 80,
        marginBottom: 10,
        padding: 10,
        backgroundColor: "rgba(187, 11, 11, 0.6)",
        borderRadius: 5,
    },
    errorMessage: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },
    successMessageContainer: {
        marginLeft: 80,
        marginRight: 80,
        marginBottom: 10,
        padding: 10,
        backgroundColor: "rgba(11, 250, 11, 0.6)",
        borderRadius: 5,
    },
    successMessage: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    }
})