import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {baseStyles} from "./BaseStyles";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faRobot} from "@fortawesome/free-solid-svg-icons/faRobot";
import {VerticalSeparator} from "./VerticalSeparator";
import {faHome} from "@fortawesome/free-solid-svg-icons/faHome";
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";
import {navigate} from "../core/rootNavigation";
import {pageNames} from "../core/pageNames";

const height = 30;
const width = 3;
const size = 30;
const iconColor = "#009637";

export function Navigation() {
    return (
        <View style={styles.nav}>
            <View style={styles.inner}>
                <TouchableOpacity onPress={() => navigate(pageNames.home)}>
                    <FontAwesomeIcon color={iconColor} icon={faHome} size={size} />
                </TouchableOpacity>
                <VerticalSeparator height={height} width={width} />
                <View>
                    <FontAwesomeIcon color="silver" icon={faRobot} size={size * 1.75} />
                </View>
                <VerticalSeparator height={height} width={width} />
                <TouchableOpacity onPress={() => navigate(pageNames.scan)}>
                    <FontAwesomeIcon color={iconColor} icon={faSearch} size={size} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    nav: {
        backgroundColor: "#4ae333",
        alignItems: "center",
        borderTopColor: "silver",
        borderTopWidth: 3
    },
    inner: {
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 5,
        marginBottom: 5,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    }
});