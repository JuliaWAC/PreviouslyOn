import React from 'react'
import { View, Text, StyleSheet  } from 'react-native'

const Header = ({label}) => {
    return (
    <View style={styles.container}>
        <Text style={styles.labelStyle}>{label}</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 500,
        height: 40,
        backgroundColor: '#212121',
        justifyContent: 'center',
        alignItems: 'center',
    },
    labelStyle: {
        fontSize: 25,
        fontWeight: '700',
        color: '#ff6f00',
    }
})
export default Header;