import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Mixin } from "../../helpers";
import { Image, Overlay } from "react-native-elements";
import AppText from "../atoms/AppText";
import { images } from "../../../assets";
import { theme } from "../../utils/styles/theme";
import React, { useState } from "react";

export const DailyReward = ({ isVisible, setIsVisible }) => {
 
  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)}
      overlayStyle={styles.modalContent}
    >
      <View>
        <View style={styles.titleContainer}>
          <AppText style={styles.title}>Daily Reward</AppText>
        </View>
        <View style={styles.container}>
          <Image source={images.reward} style={styles.icon} />
          <AppText body1 style={styles.textAlign}>
            Daily reward is here! You got{" "}
            <AppText style={{ fontWeight: "bold" }}>$1000</AppText>
          </AppText>
        </View>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: theme.colors?.primary,
    borderRadius: Mixin.moderateSize(10),
    width: "85%",
  },
  container: {
    backgroundColor: theme.colors?.white,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Mixin.moderateSize(10),
    paddingHorizontal: Mixin.moderateSize(20),
    paddingBottom: Mixin.moderateSize(10),
  },
  titleContainer: {
    backgroundColor: theme.colors?.white,
    borderRadius: Mixin.moderateSize(10),
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    height: Mixin.moderateSize(40),
    bottom: Mixin.moderateSize(30),
    alignSelf: "center",
  },
  title: {
    fontSize: Mixin.moderateSize(20),
    fontWeight: "500",
  },
  icon: {
    width: Mixin.moderateSize(50),
    height: Mixin.moderateSize(50),
    alignSelf: "center",
    margin: Mixin.moderateSize(20),
  },
  textAlign: {
    textAlign: "center",
    marginBottom: Mixin.moderateSize(10),
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Mixin.moderateSize(10),
  },
  btnContainer: {
    backgroundColor: theme.colors?.white,
    borderRadius: Mixin.moderateSize(10),
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    height: Mixin.moderateSize(35),
    width: "45%",
  },
});
