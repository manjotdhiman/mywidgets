
import { StyleSheet } from "react-native";
import { colors } from "../../../Constants/theme";
export default StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "#999",
        backgroundColor: "#fff",
        height: 40,
        margin: 5,
        borderRadius: 10
    },
    label: {
        marginLeft: 5,
        fontSize: 16, fontWeight: "bold",
        marginTop: 15,
        marginLeft: 5,
    },
    error: {
        color: colors.textColorError
    },
    emptyText: { color: "#000", alignSelf: "center", justifyContent: "center", fontSize: 16 },
    inputPicker: {
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: "#fff"
    },
    itemContainer: { flex: 1, alignItems: 'stretch', justifyContent: 'space-between' },
    name: {
        color: colors.textColorPrimary,
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 15
    },
    color: {
        color: colors.textColorSecondary

    },
    rightContainer:
    {
        flexDirection: "row"
    },
    detail: {
        padding: 10, borderBottomWidth: 1, borderColor: colors.secondaryColor,
        flexDirection: "row", flex: 1, justifyContent: "space-between"
    },
    right: { width: 70, alignItems: "center", justifyContent: "center", backgroundColor: colors.textColorError, justifyContent: 'center' },
    rightEdit: { width: 70, alignItems: "center", justifyContent: "center", backgroundColor: "green", justifyContent: 'center' }
})