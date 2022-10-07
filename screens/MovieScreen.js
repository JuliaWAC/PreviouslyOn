import React, {useState, useEffect} from 'react'
import { StyleSheet, ScrollView, StatusBar } from 'react-native'
import Header from '../components/Header'
import CardMovies from '../components/CardMovies'

const MovieScreen = () => {

  const [movie, setMovie] = useState([])

  useEffect(() => {
    const getMovie = async () => {
      let url = "https://api.betaseries.com/movies/discover"
      url += "?type=popular"
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
        console.log(jsonResponse.movies)
        setMovie(jsonResponse.movies)
      }
    }
    getMovie()
  }, [])
  
    return (
        <ScrollView style={styles.container}>
            <Header />
            <StatusBar  barStyle="auto" />
              <CardMovies data={movie} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#212121',
    },
  })

export default MovieScreen;