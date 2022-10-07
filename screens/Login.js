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
    Button
} from "react-native";

function Login() {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [successMsg, setSuccessMsg] = useState("")
    const navigation = useNavigation("")

    const handleClick = async () => {

        let passwordEncrypt = md5(password)
        let bodyParams = {
            login: login,
            password: passwordEncrypt
        }

        let url = "https://api.betaseries.com/members/auth"
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
                
                setSuccessMsg('Connexion effectuée !')
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
                <Text style={styles.LoginText}>Connexion</Text>
            </View>
            <View style={styles.text2}>
                <Text style={styles.loginMsg}>Vous n'avez pas de compte ? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                    <Text style={styles.signupText}>Inscription</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.textInput}>
                <TextInput
                    name="email"
                    placeholder="Email ou Login"
                    onChangeText={setLogin}
                    value={login}
                    placeholderTextColor="#808080"
                    selectionColor="#ff6f00"
                    color="#ff6f00"
                />
            </View>
            <View style={styles.textInput}>
                <TextInput
                    name="password"
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
                <Button style={styles.buttonDesign} onPress={handleClick} title="Se connecter" color="#ff6f00" />
            </View>
        </View>
    )
}

export default () => {
    return (
        <Login />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#212121",
        justifyContent: "center",
    },
    LoginText: {
        fontSize: 30,
        color: "#ff6f00"
    },
    Middle: {
        alignItems: "center",
        justifyContent: "center",
    },
    text2: {
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 5,
    },
    signupText: {
        fontWeight: "bold",
        textDecorationLine: 1,
        color: "#ff6f00"
    },
    loginMsg: {
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
