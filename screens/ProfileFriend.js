import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { StatusBar } from 'expo-status-bar';
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    Image,
    Pressable,
    Alert,
    TouchableOpacity,
} from 'react-native'

const ProfileFriend = (props) => {
    const [infosUser, setInfosUser] = useState([])
    const [seriesUser, setSeriesUser] = useState([])
    const navigation = useNavigation("")
    const isFriend = props.route.params.isFriend

    useEffect(() => {
        const getInfos = async () => {
            let id = props.route.params.id
            let url = "https://api.betaseries.com/members/infos"
            url += '?id=' + id

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

        const getSeries = async () => {
            let id = props.route.params.id
            let url = "https://api.betaseries.com/shows/member"
            url += '?id=' + id

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
                setSeriesUser(jsonRes.shows)
            }
        }
        getInfos()
        getSeries()
    }, [])

    function handleAddFriend() {
        Alert.alert(
            'Ajouter un ami',
            'Voulez-vous ajouter ' + infosUser.login + ' à vos amis ?',
            [
                { text: 'Non', onPress: () => console.log('Non') },
                { text: 'Oui', onPress: () => addFriend() },
            ],
            { cancelable: false }
        )
    }

    const addFriend = async () => {
        let token = await SecureStore.getItemAsync('user_token')
        let id = props.route.params.id
        let url = "https://api.betaseries.com/friends/friend"
        url += '?token=' + token + '&id=' + id

        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "X-BetaSeries-Key": "55ddcaa1bdf7",
                "X-BetaSeries-Version": "3.0",
            }
        }).then(response => response.json())
            .then(json => {
                if (json.status === "success") {
                    Alert.alert(
                        'Ajout d\'un ami',
                        'Vous avez ajouté ' + infosUser.login + ' à vos amis !',
                        [
                            { text: 'OK', onPress: () => console.log('OK') },
                        ],
                        { cancelable: false }
                    )
                }
            }
        )
    }

    function handleRemoveFriend() {
        Alert.alert(
            'Retirer un ami',
            'Voulez-vous retirer ' + infosUser.login + ' de vos amis ?',
            [
                { text: 'Non', onPress: () => console.log('Non') },
                { text: 'Oui', onPress: () => removeFriend() },
            ],
            { cancelable: false }
        )
    }

    const removeFriend = async () => {
        let token = await SecureStore.getItemAsync('user_token')
        let id = props.route.params.id
        let url = "https://api.betaseries.com/friends/friend"
        url += '?token=' + token + '&id=' + id

        fetch(url, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "X-BetaSeries-Key": "55ddcaa1bdf7",
                "X-BetaSeries-Version": "3.0",
            }
        }).then(response => response.json())
            .then(json => {
                if (json.status === "success") {
                    Alert.alert(
                        'Retrait d\'un ami',
                        'Vous avez retiré ' + infosUser.login + ' de vos amis !',
                        [
                            { text: 'OK', onPress: () => console.log('OK') },
                        ],
                        { cancelable: false }
                    )
                }
            }
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Header />
                <StatusBar barStyle='auto' />
                <View style={styles.banner}>
                    <Image source={{ uri: `${infosUser.profile_banner}` }} style={styles.banner} />
                    <Pressable style={styles.btn} onPress={() => navigation.goBack()}>
                        <Icon name='arrow-back-outline' type='ionicon' size={20} reverse color={"rgba(140, 140, 140, 0.4)"} />
                    </Pressable>
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
                    </View>
                </View>
                
                {isFriend != true ?
                    <Pressable style={styles.addFriendBtn} onPress={() => handleAddFriend()}>
                        <Text style={styles.addFriendTxt}>Ajouter en ami</Text>
                    </Pressable>
                    :
                    <Pressable style={styles.removeFriendBtn} onPress={() => handleRemoveFriend()}>
                        <Text style={styles.removeFriendTxt}>Supprimer de mes amis</Text>
                    </Pressable>
                }
                <View>
                    <Text style={styles.seriesListTitle}>Sa liste de séries</Text>
                    {/* <ScrollView
                        horizontal={true}
                        style={styles.seriesListScroll}
                    > */}
                    <View style={styles.listSeriesContainer}>
                        {seriesUser.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => navigation.navigate('SerieDetails', { id: item.id })}>
                                    <View style={styles.listSeriesItem} key={index}>
                                        {item.images.poster != null ?
                                            <Image source={{ uri: `${item.images.poster}` }} style={styles.poster} />
                                            :
                                            <Image style={styles.poster} source={require('../assets/image-not-found.png')} />
                                        }
                                        <Text style={styles.serieTitle}>{item.title}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    {/* </ScrollView> */}
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
    btn: {
        margin: 5,
        position: "absolute",
        top: 0,
        left: 0,
        width: 25,
        height: 25,
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
    text: {
        color: '#808080',
        margin: 8,
    },
    centerInfos: {
        alignItems: "center",
    },
    addFriendBtn: {
        backgroundColor: '#3d3d3d',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        width: '50%',
        alignSelf: 'center',
    },
    addFriendTxt: {
        color: '#ff6f00',
        fontSize: 20,
        fontWeight: 'bold',
        borderRadius: 10,
        textAlign: 'center',
    },
    removeFriendBtn: {
        backgroundColor: '#3d3d3d',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        width: '70%',
        alignSelf: 'center',
    },
    removeFriendTxt: {
        color: '#c0001a',
        fontSize: 20,
        fontWeight: 'bold',
        borderRadius: 10,
        textAlign: 'center',
    },
    seriesListTitle: {
        color: '#ff6f00',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 10,
        alignSelf: 'center',
    },
    listSeriesContainer: {
        marginTop: 5,
        marginBottom: 115,
        backgroundColor: '#3d3d3d',
        width: '80%',
        alignSelf: 'center',
        borderRadius: 4,
        padding: 10,
    },
    listSeriesItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#808080",
        alignItems: 'center',
        padding: 10,
    },
    poster: {
        width: 100,
        height: 150,
        borderRadius: 4,
        marginBottom: 10,
    },
    serieTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
    },
    // seriesListScroll: {
    //     maxHeight: 600,
    //     alignSelf: 'center',
    // },
})

export default ProfileFriend;
