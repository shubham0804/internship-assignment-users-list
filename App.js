import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import Constants from "expo-constants";
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Pressable } from "react-native";
import { COLORS } from "./assets/theme";
import ListUser from "./components/ListUser";

const statusBarHeight = Constants.statusBarHeight;

export default function App() {
    const [noOfPages, setNoOfPages] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getData = async (pageNo) => {
        const url = `https://reqres.in/api/users?page=${pageNo}`;
        const response = await fetch(url);
        const data = await response.json();
        const pagesArray = [...Array.from({ length: data.total_pages }).keys()];
        setNoOfPages(pagesArray);
        setUsersList(data.data);
        setIsLoading(false);
    };

    useEffect(() => {
        getData(1);
    }, []);

    const renderUser = ({ item, index }) => {
        return (
            <View>
                <ListUser user={item} />
                {/* <ListUser user={item} /> */}
            </View>
        );
    };

    const pageNoButtons = () => {
        return (
            <View style={styles.pageButtonsContainer}>
                {noOfPages.map((x) => (
                    <Pressable
                        style={styles.pageButton}
                        key={x.toString()}
                        onPress={() => getData(x + 1)}
                        android_ripple={{
                            rippleColor: "black",
                            radius: 22,
                        }}
                    >
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{x + 1}</Text>
                    </Pressable>
                ))}
            </View>
        );
    };

    const header = () => {
        return (
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Users</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor={COLORS.secondary} />
            {isLoading && <ActivityIndicator size="large" color={COLORS.primary} />}
            {!isLoading && (
                <View style={{ flex: 1, width: "100%" }}>
                    <FlatList
                        data={usersList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderUser}
                        contentContainerStyle={{
                            marginTop: statusBarHeight + 30,
                            paddingBottom: statusBarHeight * 3,
                            width: "100%",
                        }}
                        ListHeaderComponent={header}
                        ListFooterComponent={pageNoButtons}
                        // ListFooterComponentStyle={styles.pageButtonsContainer}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    headerContainer: {
        alignItems: "center",
        marginBottom: 15,
    },
    headerText: {
        fontSize: 35,
        fontWeight: "bold",
        color: COLORS.secondary,
    },
    pageButton: {
        width: 40,
        height: 40,
        backgroundColor: COLORS.lightSecondary,
        marginHorizontal: 5,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
    },
    pageButtonsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
    },
});
