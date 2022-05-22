import {Text, View, Image, StyleSheet, ImageBackground, ScrollView, Animated} from "react-native";
import {HomeImage} from "../HomeImage";
import {HistoryList} from "../HistoryList";

export function HomePage() {
    return (
        <ScrollView contentContainerStyle={styles.homeContainer}>
            <HomeImage/>
            <View style={styles.jumbotron}>
                <Text style={styles.motto}>RecycleBot is the revolutionary new tool that determines if an object is recyclable -- and if so, what kind of recyclable it is.
                    A snap of a camera is all it takes to save the world with RecycleBot.</Text>
                <HistoryList/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    homeContainer : {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        flexGrow: 1
    },
    imageText : {
        fontSize: 45,
        marginLeft: 20,
        marginTop: 15,
        fontFamily: "Inter_400Regular",
        textShadowOffset: {width: 2, height: 1},
        textShadowColor: "#579d1b",
        textShadowRadius: 3
    },
    jumbotron: {
        backgroundColor: "#579d1b",
        width: "100%",
        flexGrow: 0.5
    },
    motto: {
        textAlign: "center",
        margin: 15,
        fontSize: 20,
        fontFamily: "Inter_400Regular",
        textShadowColor: "silver",
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1,
        borderColor: "silver",
        borderWidth: 2,
        borderStyle: "dashed"
    }
});