import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LogPage from "./LogPage";
import HomeScreen from "./HomeScreen";
import UpDateProfile from "./UpDateProfile";
import SerieDetails from "./SerieDetails";
import SeasonDetails from "./SeasonDetails";
import MovieDetails from "./MovieDetails";
import ViewSeries from "./ViewSeries";
import ViewMovies from "./ViewMovies";
import FriendsPage from './FriendsPage';
import ProfileFriend from './ProfileFriend';

const Stack = createStackNavigator();

export default function MainPage() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LogPage" component={LogPage} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="UpDateProfile" component={UpDateProfile} />
            <Stack.Screen name="SerieDetails" component={SerieDetails} />
            <Stack.Screen name="SeasonDetails" component={SeasonDetails} />
            <Stack.Screen name="MovieDetails" component={MovieDetails} />
            <Stack.Screen name="ViewSeries" component={ViewSeries} />
            <Stack.Screen name="ViewMovies" component={ViewMovies} />
            <Stack.Screen name="FriendsPage" component={FriendsPage} />
            <Stack.Screen name="ProfileFriend" component={ProfileFriend} />
        </Stack.Navigator>
    )
}