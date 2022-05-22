import {CameraType} from "expo-camera";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faSyncAlt} from "@fortawesome/free-solid-svg-icons/faSyncAlt";
import {Animated, Easing, StyleSheet, TouchableOpacity} from "react-native";
import {useEffect, useRef} from "react";

export function RotateButton(props : {setType: (type: CameraType) => void, type: CameraType}) {
    const {type, setType} = props;
    const springAnim =  useRef(new Animated.Value(-500)).current;

    useEffect(() => {
        Animated.spring(
            springAnim,
            {
                toValue: 0,
                useNativeDriver: true
            }
        ).start();
    }, [springAnim]);

    return (
        <Animated.View style={{transform: [{translateY: springAnim}]}}>
            <TouchableOpacity style={styles.rotate} onPress={() => setType(type === CameraType.front ? CameraType.back : CameraType.front)}>
                <FontAwesomeIcon icon={faSyncAlt} color="silver" size={40} />
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    rotate : {
        marginLeft: 15,
        marginTop: 15
    }
})