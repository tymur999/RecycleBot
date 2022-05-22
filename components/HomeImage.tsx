import {useEffect, useRef} from "react";
import {Animated, ImageBackground, Text, StyleSheet} from "react-native";
const garbage = require("../assets/flowers.png");

export function HomeImage() {
    const slideAnim = useRef(new Animated.Value(-200)).current;

    useEffect(() => {
        Animated.spring(slideAnim,
            {
                toValue: 0,
                useNativeDriver: true
            }).start();
    }, []);

    return (
        <ImageBackground style={styles.image} source={garbage}>
            <Animated.View style={{transform: [{translateX: slideAnim}]}}>
                <Text style={{...styles.imageText}}>Welcome to RecycleBot</Text>
            </Animated.View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 0.5,
        width: "100%",
        backgroundColor : "skyblue"
    },
    imageText : {
        fontSize: 45,
        marginLeft: 20,
        marginTop: 15,
        fontFamily: "Inter_400Regular",
        textShadowOffset: {width: 2, height: 1},
        textShadowColor: "#579d1b",
        textShadowRadius: 3
    }
});