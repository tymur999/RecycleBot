import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useRef, useState} from "react";
import {Camera, CameraPictureOptions, CameraType} from "expo-camera";
import {navigate} from "../core/rootNavigation";
import {pageNames} from "../core/pageNames";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faSyncAlt} from "@fortawesome/free-solid-svg-icons/faSyncAlt";
import {ScanModal} from "./ScanModal";

export function ScanPage() {
    const [cameraPerms, setCameraPerms] = useState<boolean | null>(null);
    const [type, setType] = useState(CameraType.back);
    const cameraRef = useRef<Camera>(null);

    const [visible, setVisible] = useState(false);
    const [item, setItem] = useState<string | null>(null);

    useEffect(() => {
        Camera
            .requestCameraPermissionsAsync()
            .then(res => {
                setCameraPerms(res.status == 'granted');
            });
    }, []);

    useEffect(() => {
        if(!visible)
            setItem(null);
    }, [visible]);

    if (cameraPerms === null) {
        return <View />;
    }
    if (!cameraPerms) {
        navigate(pageNames.home);
        return <></>
    }

    function takePicture() {
        const cam = cameraRef.current;
        if(!cam)
            return;
        const options: CameraPictureOptions = {quality: 1, base64: true};
        setVisible(true);
        cam.takePictureAsync(options)
            .then(data => {
                const body = {image: data.base64};
                return fetch("http://10.0.0.96:3000", {
                    body: JSON.stringify(body),
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            })
            .then(res => res.json())
            .then(function(r: Map<string, number>) {
                const entries = Object.entries(r);
                let maxEntry: [string, number] = entries[0];
                for(let entry of entries) {
                    if(entry[1] > maxEntry[1]) {
                        maxEntry = entry;
                    }
                }
                setItem(maxEntry[0]);
                console.log(maxEntry);
            });
    }

    return (
        <>
            <ScanModal visible={visible} item={item} setVisible={setVisible}/>
            <Camera type={type} style={styles.camera} ratio="16:9" ref={cameraRef}>
                <TouchableOpacity style={styles.rotate} onPress={() => setType(type === CameraType.front ? CameraType.back : CameraType.front)}>
                    <FontAwesomeIcon icon={faSyncAlt} color="silver" size={40} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
                    <Text style={styles.cameraButtonText}>Take a picture</Text>
                </TouchableOpacity>
            </Camera>
        </>
    )
}

const styles = StyleSheet.create({
    camera: {
        flex: 1,
    },
    cameraButton : {
        flex: 0.1,
        backgroundColor: "#4ae333",
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
        fontSize: 25
    },

    rotate : {
        marginLeft: 15,
        marginTop: 15
    }
});
