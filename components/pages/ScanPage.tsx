import {Animated, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useRef, useState} from "react";
import {Camera, CameraPictureOptions, CameraType} from "expo-camera";
import {navigate} from "../../core/rootNavigation";
import {pageNames} from "../../core/pageNames";
import {ScanModal} from "../ScanModal";
import {PictureButton} from "../PictureButton";
import {RotateButton} from "../RotateButton";
import {ImageResult, manipulateAsync, SaveFormat} from "expo-image-manipulator";
import {HistoryElement} from "../../core/HistoryElement";
import {useHistory} from "../HistoryContext";

export function ScanPage() {
    const [cameraPerms, setCameraPerms] = useState<boolean | null>(null);
    const [type, setType] = useState(CameraType.back);
    const cameraRef = useRef<Camera>(null);
    const [base64Img, setBase64Img] = useState<string | null>(null);

    const [visible, setVisible] = useState(false);
    const [item, setItem] = useState<string | null>(null);
    const history = useHistory();

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

    useEffect(() => {
        if(!base64Img)
            return;
        const body = {image: base64Img};
        let addition: HistoryElement;

        const manipulateTask = manipulateAsync("data:image/jpeg;base64," + base64Img, [
            {
                resize: {
                    height: 200,
                    width: 200
                }
            }
        ], {
            compress: 1,
            base64: true,
            format: SaveFormat.JPEG
        });

        fetch("http://10.0.0.96:3000", {
            body: JSON.stringify(body),
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res?.json())
            .then(async function(r: Map<string, number>) {
                if(!r) {
                    setVisible(false);
                    return;
                }

                const entries = Object.entries(r);
                let maxEntry: [string, number] = entries[0];
                for(let entry of entries) {
                    if(entry[1] > maxEntry[1]) {
                        maxEntry = entry;
                    }
                }
                const item = maxEntry[0];
                setItem(item);

                const imgData = await manipulateTask;
                if(!imgData.base64) {
                    setVisible(false);
                    return;
                }
                addition = {image: imgData.base64, date: new Date(), name: item};

                const arr = history.get();
                if(!arr) {
                    return history.set([addition]);
                }
                else {
                    const newData: HistoryElement[] = arr.concat();
                    newData.push(addition);
                    return history.set(newData);
                }
            })
            .then(() => {
                console.log("Pushed image to history");
            });
    }, [base64Img]);

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
                if(!data.base64) {
                    setVisible(false);
                    return;
                }
                setBase64Img(data.base64);
            })

    }

    return (
        <>
            <ScanModal visible={visible} item={item} setVisible={setVisible}/>
            <Camera type={type} style={styles.camera} ratio="16:9" ref={cameraRef}>
                <RotateButton type={type} setType={setType}/>
                <PictureButton onPress={takePicture}/>
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
    }
});
