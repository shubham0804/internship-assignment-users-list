import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { COLORS } from "../assets/theme";

const ListUser = ({ user }) => {
    return (
        <View style={styles.container}>
            {/* Avatar */}
            <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
            {/* Info */}
            <View style={{ flexDirection: "column", marginLeft: 25, flex: 3 }}>
                {/* ID */}
                <View style={styles.userInfo}>
                    <Text style={styles.userTag}>ID: </Text>
                    <Text style={styles.userText}>{user.id}</Text>
                </View>
                {/* Name */}
                <View style={styles.userInfo}>
                    <Text style={[styles.userTag]}>Name: </Text>
                    <Text styles={styles.userText}>{`${user.first_name} ${user.last_name}`}</Text>
                </View>
                {/* Email */}
                <View style={styles.userInfo}>
                    <Text style={[styles.userTag]}>Email: </Text>
                    <Text styles={styles.userText}>{user.email}</Text>
                </View>
            </View>
        </View>
    );
};

export default ListUser;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        width: "90%",
        height: 100,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: COLORS.lightBlue,
        alignSelf: "center",
    },
    userTag: { fontWeight: "bold", fontSize: 16 },
    userText: { fontSize: 16 },
    userAvatar: {
        width: "20%",
        height: "80%",
        borderRadius: 15,
        flex: 1,
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
        // marginTop: "10%",
    },
});
