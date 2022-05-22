import {Image, ImageSourcePropType, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";
import {baseStyles} from "./BaseStyles";
import {faSpinner} from "@fortawesome/free-solid-svg-icons/faSpinner";
import {useCallback, useEffect, useMemo, useState} from "react";

const images:Map<string, ImageSourcePropType> = new Map<string, ImageSourcePropType>();

images.set("battery", require("../assets/battery.png"));
images.set("biological", require("../assets/biological.png"));
images.set("brown-glass", require("../assets/brown-glass.png"));
images.set("cardboard", require("../assets/cardboard.png"));
images.set("clothes", require("../assets/clothes.png"));
images.set("green-glass", require("../assets/green-glass.png"));
images.set("metal", require("../assets/metal.png"));
images.set("paper", require("../assets/paper.png"));
images.set("plastic", require("../assets/plastic.jpg"));
images.set("shoes", require("../assets/shoes.png"));
images.set("trash", require("../assets/trash.png"));
images.set("white-glass", require("../assets/white-glass.png"));

export function ScanModal(props : {item: string | null, visible: boolean, setVisible: (v: boolean) => void}) {
    const {item, visible, setVisible} = props;
    const img = images.get(item ?? "");

    const [spin, setSpin] = useState(0);

    useEffect(() => {
        setTimeout(setSpinner, 10);
    }, [spin]);

    const text = useMemo(() => {
        switch(item) {
            case "battery":
                return "A battery should not be recycled or thrown in the trash. Most hardware stores have specialized recyclers for them.";
            case "biological":
                return "Biological matter cannot be recycled. Either throw it out, eat it, or compost it.";
            case "brown-glass":
                return "Brown glass can absolutely be recycled, and it should be!";
            case "cardboard":
                return "Cardboard should be recycled. Trample it or fold it down so it takes up the least space.";
            case "clothes":
                return "Clothes should be donated to a nearby Goodwill or similar entity. Worst case, they can be recycled.";
            case "green-glass":
                return "Yes, green glass can be recycled. Just make sure not to break it on its way down.";
            case "metal":
                return "Have a lot of metal? It can be sold for scrap. Otherwise, recycling works just as well.";
            case "paper":
                return "The Old faithful of recycling bins! Yes, paper can be recycled, just make sure no food waste is on it.";
            case "plastic":
                return "Most plastic can be recycled. However, flimsy plastic like plastic bags can be recycled in specialized centers like WalMart.";
            case "shoes":
                return "Donate shoes to a thrift shop or Goodwill. Otherwise, recycling works too.";
            case "trash":
                return "Not recyclable, unfortunately. I know how much you want to save the planet.";
            case "white-glass":
                return "White glass is recyclable. Just make sure it doesn't break on the way down.";
        }
    }, [item]);

    function setSpinner() {
        setSpin(spin + 2 % 360);
    }

    function onClose() {
        setVisible(!visible);
    }

    function prettyName(name: string) {
        return name.substring(0,1).toUpperCase() + name.substring(1);
    }

    return (
        <Modal
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
            transparent
        >
            <View style={styles.modal}>
                <View style={styles.modalInfo}>
                    <TouchableOpacity style={styles.modalExit} onPress={onClose}>
                        <FontAwesomeIcon icon={faTimes} color="maroon" />
                    </TouchableOpacity>

                    {
                        item && img ?
                            <View style={baseStyles.container}>
                                <Image source={img} style={styles.image} width={10} height={10} />
                                <Text style={styles.infoHeader}>{prettyName(item)}</Text>
                                <Text style={styles.infoText}>{text}</Text>
                            </View>
                            :
                            <View style={baseStyles.row}>
                                <>
                                    <Text style={styles.modalHeader}>Processing</Text>
                                    <FontAwesomeIcon icon={faSpinner} style={{transform: [{rotate: spin + 'deg'}]}} size={30} />
                                </>
                            </View>
                    }
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
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
        borderRadius: 20,
        borderColor: "#534582",
        borderWidth: 3,
        borderStyle: "dashed"
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
    },
    image : {
        flex: 0.4,
        resizeMode: 'contain',
    },
    infoHeader: {
        fontSize: 20,
        textAlign: "center",
        fontFamily: "Inter_400Regular"
    },
    infoText: {
        fontSize: 15,
        marginTop: 20,
        fontFamily: "Inter_400Regular"
    }
});