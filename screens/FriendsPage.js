import React, { useState, useEffect } from 'react'
import * as SecureStore from "expo-secure-store";
import Header from '../components/Header'
import { StatusBar } from 'expo-status-bar';
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { SearchBar } from '@rneui/themed'
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    Button,
    Pressable,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

const FriendsPage = () => {
    const [friends, setFriends] = useState([])
    const [searchFriend, setSearchFriend] = useState('')
    const [resultFriend, setResultFriend] = useState([])
    const [isFriend, setIsFriend] = useState(false)
    const navigation = useNavigation('')

    const updatedSearch = (searchFriend) => {
        setSearchFriend(searchFriend)
    }

    const handleSearchFriend = async () => {
        let token = await SecureStore.getItemAsync('user_token')
        let url = "https://api.betaseries.com/friends/find"
        url += "?token=" + token + '&type=emails' + '&emails=' + searchFriend

        fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "X-BetaSeries-Key": "55ddcaa1bdf7",
                "X-BetaSeries-Version": "3.0",
            }
        }).then(async (response) => {
            let jsonResponse = await response.json()
            if (jsonResponse.users.length <= 0) {
                alert('Cette personne n\'existe pas')
            } else if (response.ok) {
                setResultFriend(jsonResponse.users)
            }
        })
    }

    useEffect(() => {
        const getFriends = async () => {
            let token = await SecureStore.getItemAsync('user_token')
            let id = await SecureStore.getItemAsync('user_id')
            let url = 'https://api.betaseries.com/friends/list'
            url += '?token=' + token + '&id=' + id

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
                console.log(jsonRes)
                setFriends(jsonRes.users)
            }
        }
        getFriends()
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView>
                <Header />
                <StatusBar barStyle='auto' />
                <Pressable style={styles.btn} onPress={() => navigation.goBack()}>
                    <Icon name='arrow-back-outline' type='ionicon' size={20} reverse color={"rgba(140, 140, 140, 0.2)"} />
                </Pressable>
                <View style={styles.containerFriend}>
                    <Text style={styles.titlePage}>Liste de vos amis</Text>
                    <View style={styles.searchFriend}>
                        <SearchBar
                            placeholder="Email de la personne recherchée ..."
                            onChangeText={updatedSearch}
                            value={searchFriend}
                        />
                        <Button title='Rechercher' onPress={handleSearchFriend} color={"#ff6f00"} />
                    </View>
                    <View style={styles.friendsList}>
                        {resultFriend.map((people, index) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    setIsFriend(false)
                                    navigation.navigate('ProfileFriend', { id: people.id, isFriend: isFriend })
                                }}>
                                    <View style={styles.friendItem} key={index}>
                                        <Text style={styles.friendLogin}>{people.login}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    <Text style={styles.titlePage}>Mes Amis</Text>
                    <ScrollView>
                        <View style={styles.friendsList}>
                            {friends.map((friend, index) => {
                                return (
                                    <TouchableOpacity onPress={() => {
                                        setIsFriend(true)
                                        navigation.navigate('ProfileFriend', { id: friend.id, isFriend: isFriend })
                                    }}>
                                        <View style={styles.friendItem} key={index}>
                                            <Text style={styles.friendLogin}>{friend.login}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    )
}

export default FriendsPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#212121',
    },
    titlePage: {
        color: '#ff6f00',
        fontSize: 21,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 30,
    },
    friendsList: {
        width: '80%',
        alignSelf: 'center',
        alignItems: "center",
        backgroundColor: "#3d3d3d",
        borderRadius: 5,
        marginBottom: 20,
    },
    friendItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#808080",
        padding: 10,
        marginBottom: 10,
    },
    friendLogin: {
        color: "#fff",
        fontWeight: 'bold',
        fontSize: 18,
    },
    searchFriend: {
        marginBottom: 10,
    }
})
