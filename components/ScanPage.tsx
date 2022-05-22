import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useRef, useState} from "react";
import {Camera, CameraPictureOptions, CameraType} from "expo-camera";
import {navigate} from "../core/rootNavigation";
import {pageNames} from "../core/pageNames";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faSyncAlt} from "@fortawesome/free-solid-svg-icons/faSyncAlt";
import { Alert, Modal } from 'react-native';
import {faSpinner} from "@fortawesome/free-solid-svg-icons/faSpinner";
import {baseStyles} from "./BaseStyles";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";
import * as tf from '@tensorflow/tfjs';
import {LayersModel} from "@tensorflow/tfjs";
import {asyncStorageIO, bundleResourceIO} from "@tensorflow/tfjs-react-native";

export function ScanPage() {
    const [cameraPerms, setCameraPerms] = useState<boolean | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [type, setType] = useState(CameraType.back);
    const [processing, setProcessing] = useState(false);
    const [spin, setSpin] = useState(0);
    const cameraRef = useRef<Camera>(null);

    const [model, setModel] = useState<LayersModel | null>(null);

    useEffect(() => {
        Camera
            .requestCameraPermissionsAsync()
            .then(res => {
                setCameraPerms(res.status == 'granted');
            });
            const modelJson = require("../assets/model.json");
            const modelWeights = require("../assets/group1-shard1of1.bin");

            tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights))
            .then(r => {
                setModel(r);
            });

    }, []);

    useEffect(() => {
        setTimeout(setSpinner, 10);
    }, [spin]);

    useEffect(() => {
        console.log("processing");
    }, [processing]);

    if (cameraPerms === null) {
        return <View />;
    }
    if (!cameraPerms) {
        navigate(pageNames.home);
        return <></>
    }

    async function takePicture() {
        const cam = cameraRef.current;
        if(!cam)
            return;
        const options: CameraPictureOptions = {quality: 1, base64: true};
        await cam.takePictureAsync(options);
        setModalVisible(true);
        setProcessing(true);
    }

    function setSpinner() {
        setSpin(spin + 2 % 360);
    }

    function onClose() {
        setProcessing(false);
        setModalVisible(!modalVisible);
    }

    return (
        <>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={onClose}
                transparent
            >
                <View style={styles.modal}>
                    <View style={styles.modalInfo}>
                        <TouchableOpacity style={styles.modalExit} onPress={onClose}>
                            <FontAwesomeIcon icon={faTimes} color="maroon" />
                        </TouchableOpacity>
                        <View style={baseStyles.row}>
                            {
                                processing &&
                                <>
                                    <Text style={styles.modalHeader}>Processing</Text>
                                    <FontAwesomeIcon icon={faSpinner} style={{transform: [{rotate: spin + 'deg'}]}} size={30} />
                                </>
                            }

                        </View>
                    </View>
                </View>
            </Modal>
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
    },
    modal: {
        margin: 20,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalInfo : {
        backgroundColor: "silver",
        flexGrow: 0.5,
        width: "100%",
        borderRadius: 20
    },
    modalHeader: {
        fontSize: 30,
        textAlign: "center",
        marginRight: 15
    },
    modalExit : {
        marginBottom: "auto",
        marginLeft: "auto",
        marginTop: 10,
        marginRight: 10
    }
});
