import {StyleSheet} from "react-native";

export const baseStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "column",
        marginLeft: 15,
        marginRight: 15
    },
    textCenter: {
        textAlign: "center"
    },
    row : {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
});
