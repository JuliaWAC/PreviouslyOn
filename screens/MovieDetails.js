import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView, StatusBar, Pressable } from "react-native";
import Header from "../components/Header";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const MovieDetails = (props) => {
    const navigation = useNavigation('');

    function goBack() {
        navigation.goBack();
    }

    const [mdetails, setMdetails] = useState([]);

    useEffect(() => {
        const getMdetails = async () => {
            let url = "https://api.betaseries.com/movies/movie"
            url += "?id=" + props.route.params.id
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-BetaSeries-Key" : "55ddcaa1bdf7",
                    "X-BetaSeries-Version" : "3.0",
                }
            })
            if (response.ok) {
                const jsonResponse = await response.json()
                setMdetails(jsonResponse.movie)
                // console.log(jsonResponse.movie);
            }
        }
        getMdetails()
    }, [])

    return (
        <ScrollView style={styles.container}>
            <Header />
            <StatusBar barStyle='auto' />
            <View>
                {mdetails.poster != null ?
                    <Image style={styles.poster} source={{ uri: `${mdetails.poster}` }} />
                    :
                    <Image style={styles.poster} source={require('../assets/image-not-found.png')} />
                }
                <Pressable style={styles.btn} onPress={goBack}>
                    <Icon name='arrow-back-outline' type='ionicon' size={20} reverse color={"rgba(140, 140, 140, 0.2)"} />
                </Pressable>
                <View style={styles.back}>
                    <Text style={styles.title}>{mdetails.title}</Text>
                    <Text style={styles.tag}>{mdetails.tagline}</Text>
                    <Text style={styles.desc}>{mdetails.synopsis}</Text>
                    <Text style={styles.prod}> Année de sortie : {mdetails.production_year}</Text>
                    <Text style={styles.prod}> Producteur : {mdetails.director}</Text>
                    {
                        mdetails.genres != null && (
                            Object.keys(mdetails.genres).map(genre => {
                                return (
                                    <Text style={styles.text}>{mdetails.genres[genre]}</Text>
                                )
                            })
                        )
                    }
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#212121',
    },
    poster: {
        flex: 1,
        height: 530,
        width: '100%',
        opacity: 0.9,
        alignContent: 'center',
        alignSelf: 'center',
    },
    btn: {
        margin: 5,
        position: "absolute",
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
    tag: {
        fontSize: 20,
        fontWeight: '400',
        alignSelf: 'center',
        color: '#ff6f00',
        margin: 5,
    },
    desc: {
        fontWeight: '400',
        fontSize: 15,
        alignSelf: 'center',
        color: '#fff',
        margin: 10,
        padding: 10,
    },
    prod: {
        fontWeight: '400',
        fontSize: 15,
        alignSelf: 'center',
        color: '#ff6f00',
        margin: 2,
        marginBottom: 5,
    },
    text: {
        fontWeight: '400',
        color: '#fff',
        alignSelf: 'center',
        marginTop: 5,
    },
    back: {
        marginBottom: 25,
    },
})
export default MovieDetails;