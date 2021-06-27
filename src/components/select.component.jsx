import React, { useState, useEffect } from "react";
import {
    Dimensions,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Service_Activity } from "../services/activity.service";
import { useColors } from '../util/hooks';
import { AntDesign } from '@expo/vector-icons';
import { Shades_Class } from "../screens/Shades/shades.function";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const Selection = (props) => {
    const { type, onAddFunction, showLoading, lastActivity } = props;
    const [categories, setCategories] = useState([]);
    const { colors, dark } = useColors();
    const [showCount, setShowCount] = useState(false);
    
    function SelectCategory(title, category){
        const modifiedCategories = [...categories].map((Category, index)=>{
            if (Category.title === title) {
                const subs = Category.subCategories;
                for (let sub of subs) {
                    if (sub.title === category) {
                        sub.selected = sub.selected ? false : true;
                    }
                }
            }
            return Category;
        });
        setCategories(Service_Activity.setOpacityForSubs(modifiedCategories));
    }

    async function resetCategories(){
        await Service_Activity.loadCategories().then(response=>{
            if (!response) {}
            else {
                setCategories([...response]);
            }
        })
    }
    useEffect(() => {
        resetCategories();
    }, []);

    return (
        <View
            style={{
                marginTop: height / 10,
            }}
        >
            <ImageBackground
                source={require("../../assets/images/bg.png")}
                style={{
                    width: "100%",
                    height: "100%",
                }}
            >
                <View
                    style={{
                        paddingTop: 100,
                        paddingHorizontal: 10,
                    }}
                >
                    {(type === "VIEW" && lastActivity ? [...lastActivity.category] : [...categories]).map((item, j) => (
                        <View style={styles.container} key={j}>
                            <Text style={[styles.title, { color: item.color }]}>
                                {item.title}
                            </Text>
                            <View style={styles.tabsParent}>
                                {(item.subCategories ? [...item.subCategories] : []).map((button, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => {
                                            if (type === "VIEW") {
                                                setShowCount(!showCount);
                                            }
                                            else {
                                                SelectCategory(item.title, button.title)
                                            }
                                        }}
                                    >
                                        <View
                                            style={[
                                                styles.tabsView,
                                                { 
                                                    backgroundColor: button.selected ? Shades_Class.hexToRGB(item.color, button.opacity) : "#FFF", 
                                                },
                                            ]}
                                        >
                                            <Text
                                                style={[styles.tabsText, { color: button.selected ? "#FFF" : "black" }]}
                                            >
                                                {showCount ? (button.count ? button.count + (button.count == 1 ? " activity" : " activities") : button.title) : button.title}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>

                <View style={{
                    height: 4,
                    width: '50%',
                    alignSelf: "center",
                    borderRadius: 20,
                    backgroundColor: colors.card
                }}>

                </View>
                {type === "ADD" && (
                    <TouchableOpacity onPress={async()=>{
                        const modifiedCategories = [...categories];
                        const subSelected = [];
                        for(let cats of modifiedCategories){
                            for (let sub of cats.subCategories){
                                if (sub.selected){
                                    subSelected.push(sub._id);
                                }
                            }
                        }
                        const response = await onAddFunction(subSelected);
                        if (response) resetCategories();
                    }} style={{
                        backgroundColor: colors.card,
                        borderRadius: 20,
                        width: '40%',
                        marginTop: '5%',
                        marginRight: '5%',
                        alignSelf: 'flex-end',
                        marginBottom: '10%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            fontFamily: 'FiraSans-Medium',
                            fontSize: 17,
                            color: colors.background,
                            padding: 10,
                            paddingVertical: 20,
                            textAlign: 'center'
                        }}>Complete</Text>
                        <AntDesign name="arrowright" size={20} color={colors.background}/>
                    </TouchableOpacity>
                )}
                {type === "VIEW" && (
                    <TouchableOpacity style={{
                        backgroundColor: colors.card,
                        borderRadius: 20,
                        width: '40%',
                        marginTop: '5%',
                        marginRight: '5%',
                        alignSelf: 'flex-end',
                        marginBottom: '10%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            fontFamily: 'FiraSans-Medium',
                            fontSize: 17,
                            color: colors.background,
                            padding: 10,
                            paddingVertical: 20,
                            textAlign: 'center'
                        }}>Edit Activities</Text>

                        <AntDesign name="arrowright" size={20} color={colors.background}/>
                    </TouchableOpacity>
                )}
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        padding: 10,
        justifyContent: "center",
    },
    title: {
        textAlign: "center",
        fontFamily: "FiraSans-Bold",
        fontSize: 18
    },
    tabsParent: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginVertical: 10,
    },
    tabsText: {
        fontFamily: "FiraSans-Medium",
        fontSize: 14,
    },
    tabsView: {
        borderRadius: 15,
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginVertical: 5,
        marginHorizontal: 5,
    },
})
export default Selection;