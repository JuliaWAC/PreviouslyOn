import React, {useState} from 'react';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const IconLabel = () => {
    const [icon, setIcon] = useState(false)

    const addfav = () => {
        setIcon(!icon)
    }

    console.log(icon)

    return (
        <View>
            <TouchableOpacity onPress={() => addfav()}>
                <Ionicons 
                name={icon ? 'eye' : 'add-circle' }
                size={50}
                color='#ff6f00'
                />
            </TouchableOpacity>
        </View>
    )
}
export default IconLabel;


// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, Text, StatusBar, ScrollView } from 'react-native';
// import Card from '../components/Card';
// import * as SecureStore from 'expo-secure-store';

// const IconLabel = () => {
//     const [seen, setSeen] = useState([])

//     useEffect(() => {
//         const getSeen = async () => {
//             let token = await SecureStore.getItemAsync('user_token')
//             let url = 'https://api.betaseries.com/episodes/unrated'
//             url += '?token=' + token
//             const response = await fetch(url, {
//                 method: 'GET',
//                 headers: {
//                     "Content-Type": "application/json",
//                     "X-BetaSeries-Key": "55ddcaa1bdf7",
//                     "X-BetaSeries-Version": "3.0",
//                 }
//             })
//             if (response.ok) {
//                 const jsonResponse = await response.json()
//                     console.log(jsonResponse.episodes)
//                 // setSeen(jsonResponse)
//             }
//         }
//         getSeen()
//     }, [])

//     return (
//         <ScrollView>
//             <StatusBar barStyle="auto" />
//             {/* <Card data={seen} /> */}
//         </ScrollView>
//     )
// }

// export default IconLabel;