import {StyleSheet, View} from "react-native";

export function VerticalSeparator(props : {height: number, width: number}) {
    const {height, width} = props;

    const styles = StyleSheet.create({
        line: {
            height: height,
            width: width,
            borderWidth: width / 2,
            borderColor: "black",
            borderRadius: 10
        }
    })

    return (
        <View style={styles.line}/>
    )
}