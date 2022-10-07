import React, { useState, useEffect } from "react";
import { View, Text, StatusBar, ScrollView, StyleSheet, Pressable, Image, Dimensions } from "react-native";
import Header from "../components/Header";
import { Icon } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native'

const SeasonDetails = (props) => {
    const navigation = useNavigation('')
    // console.log(props);

    function BackBtn() {
        navigation.goBack()
    }

    const [episodes, setEpisodes] = useState([])

    useEffect(() => {
        const getEpisodes = async () => {
            let url = 'https://api.betaseries.com/shows/episodes'
            url += '?id=' + props.route.params.serie_id
            // console.log (props.route.params.serie_id);
            url += '&season=' + props.route.params.season
            // console.log(url);
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
                setEpisodes(jsonResponse.episodes)
            }
        }
        getEpisodes()
        // console.log(episodes);
    }, [])


    return (
        <ScrollView style={styles.container}>
            <Header />
            <StatusBar barStyle="auto" />
                <View>
                    <Pressable style={styles.btn} onPress={BackBtn}>
                        <Icon name='arrow-back-outline' type='ionicon' size={20} reverse color={"rgba(140, 140, 140, 0.2)"} />
                    </Pressable>
                    <Text style={styles.title}>Saison {props.route.params.season}</Text>
                    <Text style={styles.subtitle}>Nombre d'épisodes : {episodes.length}</Text>
                    {episodes.map((episode, index) => {
                        return (
                            <View style={styles.view} key={index}>
                                <Text style={styles.code}>{episode.code} </Text>
                                {episode.title != 'TBA' ? 
                                    <Text style={styles.etitle}> {episode.title} </Text>
                                    :
                                    <></>
                                }
                                {episode.description != '' ?
                                    <Text style={styles.description}> {episode.description} </Text>
                                    :
                                    <Text style={styles.description}>Prochainement disponible</Text>
                                }
                            </View>
                        )
                    })}
                </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#212121',
    },
    btn: {
        flex: 1,
        margin: 5,
        top: 0,
        left: 0,
        width: 25,
        height: 25,
    },
    title: {
        fontSize: 40,
        fontWeight: '800',
        textAlign: 'center',
        margin: 10,
        color: '#ff6f00',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '400',
        textAlign: 'center',
        margin: 10,
        color: '#ff6f00',
    },
    view: {
        borderWidth: 1,
        borderColor: '#3d3d3d',
        marginHorizontal: 15,
        marginVertical: 10,
        padding: 10,
        borderRadius: 5,
        borderStyle: 'solid',
        marginBottom: 50,
    },
    code: {
        fontSize: 20,
        fontWeight: '400',
        textAlign: 'center',
        color: '#ff6f00',
    },
    etitle: {
        fontSize: 20,
        fontWeight: '400',
        textAlign: 'center',
        color: '#ff6f00',
        marginVertical: 5,
    },
    description: {
        fontSize: 15,
        fontWeight: '400',
        textAlign: 'center',
        color: '#fff',
        marginVertical: 15,
    }
})
export default SeasonDetails