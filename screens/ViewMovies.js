import React, {useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Pressable, ScrollView } from "react-native";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import Header from "../components/Header";
import { StatusBar } from "expo-status-bar";

const ViewMovies = () => {
    const [movies, setMovies] = useState([]);

    const navigation = useNavigation('');

    function goBack() {
        navigation.goBack();
    }

    useEffect(() => {
        const ViewMovie = async () => {
            let token = await SecureStore.getItemAsync('user_token');
            let id = await SecureStore.getItemAsync('user_id');
            let url = 'https://api.betaseries.com/movies/member'
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
                setMovies(jsonRes.movies)
            })
        }
        ViewMovie()
    }, [])
    // console.log(movies)
    return (
        <ScrollView style={styles.container}>
            <Header />
            <StatusBar style="auto" />
            <Pressable style={styles.goBack} onPress={goBack}>
                <Icon name='arrow-back-outline' type='ionicon' size={20} reverse color={"rgba(140, 140, 140, 0.2)"} />
            </Pressable>
                <Text style={styles.title}>Films Vus</Text>
            <View style={styles.moviesListContainer}>
                {movies.map((movie, index) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', { id: movie.id })}>
                            <View style={styles.containerItem} key={index}>
                                {movie.poster != null ?
                                    <Image source={{ uri: `${movie.poster}` }} style={styles.poster} />
                                    :
                                    <Image style={styles.poster} source={require('../assets/image-not-found.png')} />
                                }
                                <Text style={styles.itemTitle}>{movie.title}</Text>
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
    moviesListContainer: {
        width: '90%',
        alignSelf: 'center',
        marginBottom: 30,
        backgroundColor: '#3d3d3d',
        borderRadius: 4,
    },
    containerItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#808080',
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
        color: '#ff6f00',
        fontSize: 18,
        fontWeight: 'bold',
    },
})

export default ViewMovies;