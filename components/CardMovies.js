import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Pressable } from "react-native";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';

const CardMovies = (props) => {
    const navigation = useNavigation('');
    const addMovie = async (id) => {
        let token = await SecureStore.getItemAsync('user_token');
        let url = 'https://api.betaseries.com/movies/movie'
        url += '?token=' + token + '&id=' + id
        fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-BetaSeries-Key" : "55ddcaa1bdf7",
            "X-BetaSeries-Version" : "3.0",
        },
        }).then(async (response) => {
            let jsonRes = await response.json()
            console.log(jsonRes)
        })
    }
    return (
        <View>
            {props.data.map((item) => {
                return (
                    <View style={styles.cardContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', {id: item.id})}>
                            {item.poster != '' ? 
                                <Image style={styles.imageStyle} source={{ uri: `${item.poster}`}} />
                                :
                                <Image style={styles.imageStyle} source={require('../assets/image-not-found.png')} />
                            }
                        </TouchableOpacity>
                        <View style={styles.infoStyle}>
                            <Text style={styles.titleStyle}>{item.title}</Text>
                            <Text style={styles.prod}>{item.production_year}</Text>
                        <View style={styles.addContainer}>
                            <TouchableOpacity style={styles.addBtn} onPress={() => addMovie(item.id)}>
                                <Icon style={styles.add} name='add-circle-outline' type='ionicon' size={25} reverse color={"#ff6f00"} />
                            </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )
            })}
        </View>
    )
}

const deviceWidth = Math.round(Dimensions.get('window').width)
const styles = StyleSheet.create({
    cardContainer: {
        width: deviceWidth - 25,
        backgroundColor: '#484848',
        height: 'auto',
        borderRadius: 10,

        shadowColor: '#000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 9,
        marginTop: 20,
        margin: 10,
    },
    imageStyle: {
        height: 500,
        width: deviceWidth - 25,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        opacity: 0.9,
        alignContent: 'center',
        alignSelf: 'center',
    },
    titleStyle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#ff6f00',
        alignSelf: 'center',
    },
    prod: {
        fontSize: 15,
        fontWeight: '400',
        color: '#fff',
        alignSelf: 'center',
    },
    infoStyle: {
        padding: 10,
    },
    addContainer: {
        alignItems: 'center',
    },
    addBtn: {
        backgroundColor: '#484848',
        borderRadius: 50,
        padding: 5,
    },
})
export default CardMovies;