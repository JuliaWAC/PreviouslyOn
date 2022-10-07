import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Pressable } from 'react-native'
import { Icon } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store';


const Card = (props) => {
    const navigation = useNavigation('')
        const addSerie = async (id) => {
            // console.log(id)
            let token = await SecureStore.getItemAsync('user_token');
            let url = 'https://api.betaseries.com/shows/show'
            url += '?token=' + token + '&id=' + id
            // console.log(url)
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
                        <TouchableOpacity onPress={() => navigation.navigate('SerieDetails', {id: item.id})}>
                        {item.images.banner != null ?
                            <Image style={styles.imageStyle} source={{ uri: `${item.images.banner}` }} />
                            :
                            <Image style={styles.imageStyle} source={require('../assets/image-not-found.png')} />
                        }
                        </TouchableOpacity>
                        {/* <IconLabel /> */}
                        <View style={styles.infoStyle}>
                            <View style={styles.textContainer}>
                                <Text style={styles.titleStyle}>{item.title}</Text>
                                {/* ({item.genres} != null ?
                                    <Text style={styles.genreStyle}>{item.genres}</Text>
                                    :
                                    <></>
                                ) */}
                                {/* <Text style={styles.genreStyle}>{item.platforms}</Text> */}
                                <Text style={styles.genreStyle}>Status: {item.status}</Text>
                                <Text style={styles.genreStyle}>Nombre de saisons: {item.seasons}</Text>
                                {/* <Text style={styles.genreStyle}>Nombre d'épisodes: {item.episodes}</Text> */}
                                <Text style={styles.genreStyle}>Date de création: {item.creation}</Text>
                                {/* <Text style={styles.genreStyle}>Note moyenne: {item.rating}</Text>
                                <Text style={styles.genreStyle}>Synopsis: {item.description}</Text> */}
                            <View style={styles.addContainer}>
                                    <TouchableOpacity style={styles.addBtn} onPress={() => addSerie(item.id)}>
                                        <Icon style={styles.add} name='add-circle-outline' type='ionicon' size={25} reverse color={"#ff6f00"} />
                                    </TouchableOpacity>
                            </View>
                            </View>
                        </View>
                    </View>
                )
            })}
        </View>
    )
}

const deviceWidth = Math.round(Dimensions.get('window').width)
const radius = 10

const styles = StyleSheet.create({
    cardContainer: {
        width: deviceWidth - 25,
        backgroundColor: '#484848',
        height: 380,
        borderRadius: radius,

        shadowColor: '#000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 9,
        marginTop: 20,
        margin: 10,
    },
    imageStyle: {
        height: 200,
        width: deviceWidth - 25,
        borderTopLeftRadius: radius,
        borderTopRightRadius: radius,
        opacity: 0.9,
        alignContent: 'center',
        alignSelf: 'center',
    },
    titleStyle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#fff',
    },
    genreStyle: {
        fontWeight: '200',
        color: '#fff',
    },
    infoStyle: {
        marginHorizontal: 10,
        marginVertical: 5,
    },
    add: {
        flex: 1,
        width: 25,
        height: 25,
    },
    addContainer: {
        width: '100%',
        alignItems: 'center',
        paddingRight: 10,
        paddingTop: 10,
    },
})

export default Card;