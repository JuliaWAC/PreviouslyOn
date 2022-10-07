import { StyleSheet, Text, View, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SerieScreen from './SerieScreen';
import MovieScreen from './MovieScreen';
import SearchScreen from './SearchScreen';
import ProfileScreen from './ProfileScreen';

const tab = createBottomTabNavigator();

export default function HomeScreen() {
    return (
        <tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#484848',
                    height: 90,
                    paddingHorizontal: 5,
                    position: 'absolute',
                },
                tabBarIcon: () => {
                    let iconName;

                    if (route.name == 'Series') {
                        iconName = 'tv-outline'
                    } else if (route.name == 'Movies') {
                        iconName = 'film-outline'
                    } else if (route.name == 'Search') {
                        iconName = 'search-outline'
                    } else if (route.name == 'Profil') {
                        iconName = 'person-outline'
                    }
                    return <Ionicons name={iconName} size={30} color={'#ff6f00'} />
                },
                tabBarActiveTintColor: '#ff6f00',
                tabBarInactiveTintColor: '#fff',
            })}
        >
            <tab.Screen name="Series" component={SerieScreen} />
            <tab.Screen name="Movies" component={MovieScreen} />
            <tab.Screen name="Search" component={SearchScreen} />
            <tab.Screen name="Profil" component={ProfileScreen} />
        </tab.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
