import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    ScrollView,
    StatusBar,
    View,
    Button,
    Image,
    TouchableOpacity,
} from 'react-native'
import { SearchBar } from '@rneui/themed'
import Header from '../components/Header'
import { useNavigation } from '@react-navigation/native'

function SearchScreen() {
    const [itemList, setItemList] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [sectionSelected, setSectionSelected] = useState('')
    const navigation = useNavigation('')

    const updatedSearch = (searchValue) => {
        setSearchValue(searchValue)
    }

    const handleSearchSerie = () => {
        let url = "https://api.betaseries.com/shows/search"
        url += "?title=" + searchValue + '&summary=true&nbpp=10'

        fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "X-BetaSeries-Key": "55ddcaa1bdf7",
                "X-BetaSeries-Version": "3.0",
            }
        }).then(async (response) => {
            let jsonResponse = await response.json()
            if (jsonResponse.shows.length <= 0) {
                alert('Le titre de la série recherchée n\'existe pas')
            } else if (response.ok) {
                setItemList(jsonResponse.shows)
                setSectionSelected('series')
            }
        })
    }

    const handleSearchMovie = () => {
        let url = "https://api.betaseries.com/movies/search"
        url += "?title=" + searchValue + "&nbpp=10"

        fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "X-BetaSeries-Key": "55ddcaa1bdf7",
                "X-BetaSeries-Version": "3.0",
            }
        }).then(async (response) => {
            let jsonResponse = await response.json()
            if (jsonResponse.movies.length <= 0) {
                alert('Le titre du film recherché n\'existe pas')
            } else if (response.ok) {
                setItemList(jsonResponse.movies)
                setSectionSelected('movies')
            }
        })
    }

    return (
        <ScrollView style={styles.container}>
            <Header />
            <StatusBar barStyle="auto" />
            <Text style={styles.titlePage}>Recherche de Série ou Film</Text>
            <View style={styles.containerSearchBar}>
                <SearchBar
                    placeholder="Entrez le titre recherché ..."
                    onChangeText={updatedSearch}
                    value={searchValue}
                />
                <Button title='Rechercher une Série' onPress={handleSearchSerie} color={"#ff6f00"} />
                <Button title='Rechercher un Film' onPress={handleSearchMovie} color={"#ff6f00"} />
            </View>
            {sectionSelected === 'series' ? (
                <View style={styles.containerList}>
                    {itemList.map((item, index) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('SerieDetails', { id: item.id })}>
                                <View style={styles.containerItem} key={index}>
                                    {item.poster != null ?
                                        <Image source={{ uri: `${item.poster}` }} style={styles.poster} />
                                        :
                                        <Image style={styles.poster} source={require('../assets/image-not-found.png')} />
                                    }
                                    <Text style={styles.itemTitle}>{item.title}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            ) : sectionSelected === 'movies' ? (
                    <View style={styles.containerList}>
                        {itemList.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', { id: item.id })}>
                                    <View style={styles.containerItem} key={index}>
                                        {item.poster != null ?
                                            <Image source={{ uri: `${item.poster}` }} style={styles.poster} />
                                            :
                                            <Image style={styles.poster} source={require('../assets/image-not-found.png')} />
                                        }
                                        <Text style={styles.itemTitle}>{item.title}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>   
                ) : (
                    <></>
            )}
        </ScrollView>
    )
}

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
        marginTop: 40,
    },
    containerSearchBar: {
        marginTop: 20,
    },
    containerList: {
        marginTop: 5,
        marginBottom: 115,
        backgroundColor: '#3d3d3d',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 4,
        padding: 10,
    },
    containerItem: {
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
    itemTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#ff6f00",
    },
})

export default SearchScreen;
