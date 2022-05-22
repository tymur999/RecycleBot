import {Animated, Easing, StyleSheet, Text, TouchableOpacity} from "react-native";
import {useEffect, useRef} from "react";

export function PictureButton(props : {onPress: () => void}) {
    const {onPress} = props;

    const slideAnim =  useRef(new Animated.Value(500)).current;

    useEffect(() => {
        Animated.spring(
            slideAnim,
            {
                toValue: 0,
                useNativeDriver: true
            }
        ).start();
    }, [slideAnim]);

    return (
        <Animated.View style={{transform: [{translateY: slideAnim}], ...styles.cameraButton}}>
            <TouchableOpacity onPress={onPress} style={styles.touch}>
                <Text style={styles.cameraButtonText}>Take a picture</Text>
            </TouchableOpacity>
        </Animated.View>
    );

}

const styles = StyleSheet.create({
    cameraButton : {
        flex: 0.1,
        backgroundColor: "#579d1b",
        margin: 15,
        alignItems: "center",
        justifyContent: "center",
        marginTop: "auto",
        borderRadius: 20,
        borderColor: "silver",
        borderWidth: 2
    },
    cameraButtonText: {
        fontFamily: "Inter_400Regular",
        fontSize: 25,
        textAlign: "center",
        textShadowOffset: {width: 2, height: 1},
        textShadowColor: "silver",
        textShadowRadius: 3
    },
    touch : {
        width: "100%"
    }
});