import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, StatusBar, ScrollView } from 'react-native'
import Card from '../components/Card'
import Header from '../components/Header'

const SerieScreen = () => {

  const [season, setSeason] = useState([])

  useEffect(() => {
    const getSeason = async () => {
      let url = "https://api.betaseries.com/shows/discover"
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
        // console.log(jsonResponse.shows)
        setSeason(jsonResponse.shows)
      }
    }
    getSeason()
  }, [])

  return (
    <ScrollView style={styles.container}>
      <Header />
      <StatusBar  barStyle="auto" />
        <Card data={season} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#212121',
    },
  })

export default SerieScreen;