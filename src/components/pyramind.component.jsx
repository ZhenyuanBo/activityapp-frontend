import React, { useState } from "react";
import {
  Dimensions,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useColors } from "../util/hooks";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const Report = (props) => {
    const { colors, dark } = useColors();
    const { percentage } = props;
    const styles = StyleSheet.create({
      triangleContainer: {
        width: width + height / 5,
        height: width + height / 5,
        backgroundColor: "#FFF1F6",
        transform: [{ rotate: "45deg" }],
        marginTop: height / 5,
        borderRadius: 10,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 1,
        borderColor: "#ccc",
      },
      triangleParent: {
        transform: [{ rotate: "-45deg" }],
        width: width + height / 5,
        height: width + height / 5,
        marginTop: -width / 8,
        marginLeft: -(width / 8),
        backgroundColor: colors.background,
        //borderBottomWidth: 1,
      },
    });
    return (
      <View
        style={{
          //justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          height: height / 1.5,
          backgroundColor: colors.background
        }}
      >
        <View style={styles.triangleContainer}>
          <View style={styles.triangleParent}>
            {/* Patch #1 */}
            <LinearGradient
              colors={["#FFF1F6", "#FFF"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              locations={percentage ? [percentage[0], percentage[0]]: [0,0]}
              style={{
                paddingVertical: 9,
                borderBottomWidth: 1,
                borderColor: "#ccc",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  textTransform: "uppercase",
                  color: "#F07973",
                }}
              >
                Self-{"\n"}Actualization{"\n"}
                <Text
                  style={{
                    color: "#848484",
                    textTransform: "lowercase",
                    lineHeight: 20,
                  }}
                >
                  realization of full{"\n"}potential, personal{"\n"}growth &
                  fullfillment
                </Text>
              </Text>
            </LinearGradient>
            {/* Patch #2 */}
            <LinearGradient
              colors={["#FFE8FD", "#FFF"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              locations={percentage ? [percentage[1], percentage[1]] : [0, 0]}
              style={{
                paddingVertical: 9,
                borderBottomWidth: 1,
                borderColor: "#ccc",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  textTransform: "uppercase",
                  color: "#D7A5D2",
                }}
              >
                ESTEEM {"\n"}
                <Text
                  style={{
                    color: "#848484",
                    textTransform: "lowercase",
                    lineHeight: 20,
                  }}
                >
                  esteem for oneself; achievement, status,{"\n"} respect, self
                  worth
                </Text>
              </Text>
            </LinearGradient>
            {/* Patch #3 */}
            <LinearGradient
              colors={["#FFF7E9", "#FFF"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              locations={percentage ? [percentage[2], percentage[2]] : [0, 0]}
              style={{
                paddingVertical: 9,
                borderBottomWidth: 1,
                borderColor: "#ccc",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  textTransform: "uppercase",
                  color: "#FFAF2F",
                }}
              >
                love and belonging {"\n"}
                <Text
                  style={{
                    color: "#848484",
                    textTransform: "lowercase",
                    lineHeight: 20,
                  }}
                >
                  human connection, intimate relationships, {"\n"}affection,
                  community
                </Text>
              </Text>
            </LinearGradient>
            {/* Patch #4 */}
            <LinearGradient
              colors={["#E7F6F5", "#FFF"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              locations={percentage ? [percentage[3], percentage[3]] : [0, 0]}
              style={{
                paddingVertical: 9,
                borderBottomWidth: 1,
                borderColor: "#ccc",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  textTransform: "uppercase",
                  color: "#55C2BB",
                }}
              >
                safety {"\n"}
                <Text
                  style={{
                    color: "#848484",
                    textTransform: "lowercase",
                    lineHeight: 20,
                  }}
                >
                  security, safety, protection, order, stability, law
                </Text>
              </Text>
            </LinearGradient>
            {/* Patch #5 */}
            <LinearGradient
              colors={["#EDF6FF", "#FFF"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              locations={percentage ? [percentage[4], percentage[4]] : [0, 0]}
              style={{
                paddingVertical: 9,
                borderBottomWidth: 1,
                borderColor: "#ccc",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  textTransform: "uppercase",
                  color: "#5DAEFF",
                }}
              >
                physiological {"\n"}
                <Text
                  style={{
                    color: "#848484",
                    textTransform: "lowercase",
                    lineHeight: 20,
                  }}
                >
                  basic life needs: food, water, warmth, rest, shelter, etc
                </Text>
              </Text>
            </LinearGradient>
          </View>
        </View>
      </View>
    )
}
export default Report;