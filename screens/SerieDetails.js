import React, { useState, useEffect } from "react";
import { View, Text, StatusBar, ScrollView, StyleSheet, Pressable, Image } from "react-native";
import Header from "../components/Header";
import { Icon } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native'

const SerieDetails = (props) => {
    const navigation = useNavigation('')

    function BackBtn() {
        navigation.goBack()
    }

    const [Sdetails, setSdetails] = useState([])
    const [infoseries, setInfoseries] = useState({})

    useEffect(() => {
        const getSdetails = async () => {
            let url = 'https://api.betaseries.com/shows/display'
            url += '?id=' + props.route.params.id
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "X-BetaSeries-Key" : "55ddcaa1bdf7",
                    "X-BetaSeries-Version" : "3.0",
                }
            })
            if (response.ok) {
                const jsonResponse = await response.json()
                setSdetails(jsonResponse.show.seasons_details)
                setInfoseries(jsonResponse.show)
            }
        }
        getSdetails()
    }, [])
    return (
        <ScrollView style={styles.container}>
            <Header />
            <StatusBar barStyle="auto" />
                <View>
                    {infoseries.images != null ?
                        <Image  style={styles.poster} source={{ uri: `${infoseries.images.poster}` }} />
                        :
                        <Image  style={styles.poster} source={require('../assets/image-not-found.png')} />
                    }
                    <Pressable style={styles.btn} onPress={BackBtn}>
                        <Icon name='arrow-back-outline' type='ionicon' size={20} reverse color={"rgba(140, 140, 140, 0.2)"} />
                    </Pressable>
                    <Text style={styles.title}>{infoseries.title}</Text>
                    <Text style={styles.desc}>{infoseries.description}</Text>
                    <Text style={styles.text}>{infoseries.status}</Text>
                    <Text style={styles.text}>Crée en : {infoseries.creation}</Text>
                    <Text style={styles.text}>Nombre de saisons :{infoseries.seasons}</Text>
                    <Text style={styles.text}>Nombre d'épisodes : {infoseries.episodes}</Text>
                    {/* <Text style={styles.note}>Note Moyenne : {infoseries.notes.mean}/5</Text>
                    <Text style={styles.note}>{infoseries.notes.total} Avis</Text> */}

                    {
                        infoseries.genres != null && (
                            Object.keys(infoseries.genres).map(genre => {
                                return (
                                    <Text key={genre} style={styles.genre}>{infoseries.genres[genre]}</Text>
                                )
                            })
                        )
                    }
                    <View style={styles.seasonlist}>
                        {Sdetails.map((season) => {
                            return (
                                <View style={styles.seasonContainer}>
                                    <Pressable onPress={() => navigation.navigate('SeasonDetails', {season: season.number, serie_id: props.route.params.id })}>
                                        <View style={styles.pressable}>
                                            <View style={styles.containerText}>
                                                <Text style={styles.seasonTitle}>Saison {season.number}</Text>
                                                <Text style={styles.seasonEpisode}>Nombre d'épisodes : {season.episodes}</Text>
                                            </View>
                                            <View style={styles.arrowContainer}>
                                                <Icon style={styles.arrow} name='chevron-forward-outline' type='ionicon' size={15} reverse color={"#ff6f00"} />
                                            </View>
                                        </View>
                                    </Pressable>
                                </View>
                            )
                        }
                            )
                        }
                    </View>
                </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#212121',
    },
    title: {
        fontSize: 40,
        fontWeight: '800',
        textAlign: 'center',
        margin: 10,
        color: '#ff6f00',

    },
    text: {
        fontWeight: '400',
        color: '#fff',
        alignSelf: 'center',
        color: '#ff6f00',
        margin: 5,
    },
    btn: {
        margin: 5,
        position: "absolute",
        top: 0,
        left: 0,
        width: 25,
        height: 25,
    },
    poster: {
        flex: 1,
        height: 200,
        width: '100%',
        opacity: 0.9,
        alignContent: 'center',
        alignSelf: 'center',
    },
    desc: {
        fontWeight: '500',
        color: '#fff',
        alignSelf: 'center',
        margin: 10,
    },
    genre: {
        fontWeight: '400',
        color: '#fff',
        alignSelf: 'center',
        margin: 3,
    },
    seasonlist: {
        borderWidth: 1,
        borderColor: '#3d3d3d',
        marginHorizontal: 15,
        marginVertical: 10,
        borderRadius: 5,
        borderStyle: 'solid',
        marginBottom: 50,
    },
    seasonTitle: {
        color: '#fff',
    },
    seasonEpisode:{
        color: '#fff',
        borderBottomWidth: 10,
        borderBottomStyle: 'solid',
    },
    pressable: {
        color: '#fff',
        borderColor: '#ff6f00',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        borderStyle: 'solid',   
        margin: 5,    
        display: 'flex', 
        flexDirection: 'row',
    },
    arrowContainer: {
        width: 250,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    containerText: {
        display: 'flex',
    },
    note: {
        fontWeight: '400',
        color: '#808080',
        alignSelf: 'center',    
        margin: 10,
    },
})

export default SerieDetails;