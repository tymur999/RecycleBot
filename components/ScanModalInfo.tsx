import {baseStyles} from "./BaseStyles";
import {Animated, Image, ImageSourcePropType, StyleSheet, Text, View} from "react-native";
import {useEffect, useRef} from "react";
import {prettyName} from "../core/nameUtils";

export function ScanModalInfo(props : {text: string, item: string, img: ImageSourcePropType}) {
    const {text, item, img} = props;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                useNativeDriver: true
            }
        ).start();
    }, [fadeAnim]);


    return (
        <Animated.View style={{...baseStyles.container, opacity: fadeAnim}}>
            <Image source={img} style={styles.image} width={10} height={10} />
            <Text style={styles.infoHeader}>{prettyName(item)}</Text>
            <Text style={styles.infoText}>{text}</Text>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    infoHeader: {
        fontSize: 20,
        textAlign: "center",
        fontFamily: "Inter_400Regular"
    },
    infoText: {
        fontSize: 15,
        marginTop: 20,
        fontFamily: "Inter_400Regular"
    },
    image : {
        flex: 0.4,
        resizeMode: 'contain',
    }
});