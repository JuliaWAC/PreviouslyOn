import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, ScrollView } from "react-native";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import Header from "../components/Header";
import { StatusBar } from "expo-status-bar";

const ViewSeries = () => {

    const [series, setSeries] = useState([]);

    const navigation = useNavigation('');

    function goBack() {
        navigation.goBack();
    }

    useEffect(() => {
        const ViewSerie = async () => {
            let token = await SecureStore.getItemAsync('user_token');
            let id = await SecureStore.getItemAsync('user_id');
            let url = 'https://api.betaseries.com/shows/member'
            url += '?token=' + token + '&id=' + id
            fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-BetaSeries-Key" : "55ddcaa1bdf7",
                "X-BetaSeries-Version" : "3.0",
            },
            }).then(async (response) => {
                let jsonRes = await response.json()
                // console.log(jsonRes)
                setSeries(jsonRes.shows)
            })
        }
        ViewSerie()
       
    }, [])
    // console.log(series)
    return (
        <ScrollView style={styles.container}>
            <Header />
            <StatusBar barStyle='auto' />
            <Pressable style={styles.btn} onPress={goBack}>
                <Icon name='arrow-back-outline' type='ionicon' size={20} reverse color={"rgba(140, 140, 140, 0.2)"} />
            </Pressable>
                <Text style={styles.title}>Séries Vues</Text>
            <View style={styles.seriesListContainer}>
                {series.map((serie, index) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('SerieDetails', { id: serie.id })}>
                            <View style={styles.containerItem} key={index}>
                                {serie.images.poster != null ?
                                    <Image source={{ uri: `${serie.images.poster}` }} style={styles.poster} />
                                    :
                                    <Image style={styles.poster} source={require('../assets/image-not-found.png')} />
                                }
                                <Text style={styles.itemTitle}>{serie.title}</Text>
                            </View>
                        </TouchableOpacity>
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
    title: {
        color: '#ff6f00',
        fontSize: 21,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 50,
        textDecorationLine: 'underline',
    },
    seriesListContainer: {
        width: '90%',
        alignSelf: 'center',
        marginBottom: 30,
        backgroundColor: '#3d3d3d',
        borderRadius: 4,
    },
    containerItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#808080",
        alignSelf: 'center',
        alignItems: 'center',
        padding: 10,
        width: '90%',
    },
    poster: {
        width: 100,
        height: 150,
        borderRadius: 4,
        marginBottom: 10,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#ff6f00",
    },

})

export default ViewSeries;