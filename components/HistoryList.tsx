import {baseStyles} from "./BaseStyles";
import {
    Animated,
    Text,
    View,
    StyleSheet,
    VirtualizedList,
    FlatList,
    Image,
    ImageSourcePropType,
    TouchableOpacity
} from "react-native";
import {useEffect, useRef, useState} from "react";
import {HistoryElement} from "../core/HistoryElement";
import {prettyName} from "../core/nameUtils";
import {useHistory} from "./HistoryContext";

export function HistoryList() {
    const history = useHistory();

    const onReset = () => {
        history.reset()
            .then(() => console.log("Successfully reset cache"));
    }

    return (
        <View style={baseStyles.container}>
            <Text style={styles.header}>Picture History</Text>
            <View style={styles.list}>
                {
                    history.data.map((el, i) => <HistoryListItem even={Boolean(i % 2)} item={el} key={el.date.toString()}/>)
                }
            </View>
            <TouchableOpacity style={styles.clearBtn} onPress={onReset}>
                <Text style={styles.clearBtnText}>Clear History</Text>
            </TouchableOpacity>
        </View>
    )
}

function HistoryListItem(props : {even: boolean, item: HistoryElement}) {
    const {even, item} = props;
    const slideAnim = useRef(new Animated.Value(even ? -200 : 200)).current;

    useEffect(() => {
        Animated.spring(slideAnim,
            {
                toValue: 0,
                useNativeDriver: true
            }).start();
    }, []);

    return (
        <Animated.View style={{...styles.elContainer, transform: [{translateX: slideAnim}]}}>
            <Image style={styles.image} source={{uri: "data:image/jpeg;base64," + item.image}} />
            <Text style={styles.elText}>{prettyName(item.name)}</Text>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 30,
        marginBottom: "auto",
        marginRight: "auto"
    },
    image : {
        width: 100,
        height: 100,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        resizeMode: 'contain',
    },
    elContainer: {
        flexDirection: "row",
        backgroundColor: "silver",
        alignItems: "center",
        width: "75%",
        margin: 10,
        borderRadius: 10,
        borderColor: "#534582",
        borderWidth: 2,
        borderStyle: "dashed"
    },
    elText: {
        fontSize: 25,
        marginLeft: "auto",
        marginRight: "auto",
        fontFamily: "Inter_400Regular",
        textShadowOffset: {width: 2, height: 1},
        textShadowColor: "white",
        textShadowRadius: 3
    },
    clearBtn: {
        backgroundColor: "#FEDC56",
        width: "50%",
        borderRadius: 10,
        margin: 10,
        padding: 10,
        borderColor: "silver",
        borderStyle: "dashed",
        borderWidth: 1
    },
    clearBtnText: {
        textAlign: "center",
        fontFamily: "Inter_400Regular"
    },
    list: {
        flexDirection: "column",
        justifyContent: "flex-start",
        flex: 1
    }
});