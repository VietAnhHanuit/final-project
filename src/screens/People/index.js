import React, { useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";

import { ErrorModal } from "../../components/atoms/ErrorModal";
import { HookHelper } from "../../helpers";
import { useAppSelector, useGetNavigation } from "../../helpers/hookHelper";
import useStyles from "./styles";
import AppHeader from "../../components/atoms/Header";
import { RelationItem } from "../../components/modules/RelationItem";
import AppText from "../../components/atoms/AppText";
import { images } from "../../../assets";
import { usePeople } from "../../api/people";
import { UserActions } from "../../stores/actions";
import { AppDialog } from "../../components/atoms/AppDialog";

const ActivityItem = ({
  title,
  description,
  image,
  money,
  happiness,
  health,
  intelligence,
  appearance,
  peopleHappiness,
  energy,
  peopleId,
  onPress,
}) => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const [showDialog, setShowDialog] = useState(false);
  const styles = useStyles(theme);
  const renderDisctiption = () => {
    let description = "";
    if (money != 0) {
      description += `Money: ${money}\n`;
    }
    if (happiness != 0) {
      description += `Happiness: ${happiness}\n`;
    }
    if (health != 0) {
      description += `Health: ${health}\n`;
    }
    if (intelligence != 0) {
      description += `Intelligence: ${intelligence}\n`;
    }
    if (appearance != 0) {
      description += `Appearance: ${appearance}\n`;
    }
    if (peopleHappiness != 0) {
      description += `People Happiness: ${peopleHappiness}\n`;
    }
    if (energy != 0) {
      description += `Energy: ${energy}\n`;
    }

    return description;
  };
  return (
    <>
      <TouchableOpacity
        style={styles.activityItem}
        onPress={() => {
          setShowDialog(true);
        }}
      >
        <Image source={image} style={styles.icon} />
        <View style={{ flex: 1 }}>
          <AppText style={styles.activityTitle}>{title}</AppText>
          <AppText style={styles.activityDescription}>{description}</AppText>
        </View>
        <View style={styles.energyContainer}>
          <Image source={images.lighting} style={styles.energyIcon} />
          <AppText style={styles.energyText}>{energy}</AppText>
        </View>
      </TouchableOpacity>
      <AppDialog
        isVisible={showDialog}
        onClose={() => setShowDialog(false)}
        title={title}
        icon={image}
        content={description}
        description={renderDisctiption()}
        okeBtn={"Okay"}
        cancelBtn={"Cancel"}
        positiveAction={() => {
          onPress(
            money,
            happiness,
            health,
            intelligence,
            appearance,
            peopleHappiness,
            energy,
            peopleId
          );
          setShowDialog(false);
        }}
      />
    </>
  );
};

export const PeopleScreen = () => {
  const userReducer = useAppSelector((state) => state.UserReducer);
  const { theme, dispatch } = HookHelper.useBaseHook();
  const { navigation, route } = useGetNavigation();
  const peopleInfo = route.params.peopleInfo;
  const styles = useStyles(theme);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState();
  const { onRelationAction, onRelationUserAction } = usePeople();
  const tryAgain = () => {
    setShowError(false);
    setError(undefined);
  };

  const acitityAction = async (
    money,
    happiness,
    health,
    intelligence,
    appearance,
    peopleHappiness,
    energy,
    peopleId
  ) => {
    if (peopleId != "Father" && peopleId != "Mother") {
      const response = await onRelationUserAction(
        money,
        happiness,
        health,
        intelligence,
        appearance,
        peopleInfo.happiness + peopleHappiness,
        energy,
        peopleId
      );

      if (!response.isSuccessful) {
        setShowError(true);
        setError({
          title: "Error",
          description: response.error.message,
        });
      } else {
        dispatch(UserActions.setEnergy.request(userReducer.energy + energy));
        dispatch(UserActions.setMoney.request(userReducer.money + money));
        dispatch(
          UserActions.updateStatus.request({
            happiness: userReducer.happiness + happiness,
            health: userReducer.health + health,
            intelligence: userReducer.intelligence + intelligence,
            appearance: userReducer.appearance + appearance,
          })
        );
      }
    } else {
      const response = await onRelationAction(
        money,
        happiness,
        health,
        intelligence,
        appearance,
        peopleInfo.happiness + peopleHappiness,
        energy,
        peopleId
      );
      if (!response.isSuccessful) {
        setShowError(true);
        setError({
          title: "Error",
          description: response.error.message,
        });
      } else {
        dispatch(UserActions.setEnergy.request(userReducer.energy + energy));
        dispatch(UserActions.setMoney.request(userReducer.money + money));
        dispatch(
          UserActions.updateStatus.request({
            happiness: userReducer.happiness + happiness,
            health: userReducer.health + health,
            intelligence: userReducer.intelligence + intelligence,
            appearance: userReducer.appearance + appearance,
          })
        );
      }
    }
  };

  const gender = peopleInfo.gender == 1 ? "him" : "her";
  return (
    <View style={styles.container}>
      <AppHeader title={peopleInfo.position} filled />
      <ScrollView style={styles.containerView}>
        <RelationItem {...peopleInfo} />
        <View>
          <View style={styles.line} />
          <AppText style={styles.title}>Activities</AppText>
        </View>
        {peopleInfo.position == "Father" || peopleInfo.position == "Mother" ? (
          <ActivityItem
            title={"Ask for money"}
            description={`Ask ${gender} for money`}
            image={images.askMoney}
            money={500}
            happiness={0}
            health={0}
            intelligence={0}
            appearance={0}
            peopleHappiness={0}
            energy={-5}
            peopleId={peopleInfo.position}
            onPress={acitityAction}
          />
        ) : (
          <ActivityItem
            title={"Dating"}
            description={`Dating with ${gender}`}
            image={images.dating}
            money={-500}
            happiness={20}
            health={10}
            intelligence={0}
            appearance={10}
            peopleHappiness={20}
            energy={-20}
            peopleId={peopleInfo.position ?? peopleInfo.id}
            onPress={acitityAction}
          />
        )}
        <ActivityItem
          title={"Compliment"}
          description={`Pay ${gender} a compliment`}
          image={images.compliment}
          money={0}
          happiness={10}
          health={0}
          intelligence={0}
          appearance={0}
          peopleHappiness={10}
          energy={-5}
          peopleId={peopleInfo.position ?? peopleInfo.id}
          onPress={acitityAction}
        />
        <ActivityItem
          title={"Gift"}
          description={`Give ${gender} a gift`}
          image={images.gift}
          money={-400}
          happiness={10}
          health={0}
          intelligence={0}
          appearance={0}
          peopleHappiness={20}
          energy={-10}
          peopleId={peopleInfo.position ?? peopleInfo.id}
          onPress={acitityAction}
        />
        <ActivityItem
          title={"Insult"}
          description={`Insult ${gender}`}
          image={images.insult}
          money={0}
          happiness={-10}
          health={0}
          intelligence={0}
          appearance={0}
          peopleHappiness={-10}
          energy={-5}
          peopleId={peopleInfo.position ?? peopleInfo.id}
          onPress={acitityAction}
        />
        <ActivityItem
          title={"Spend Time"}
          description={`Spend time with ${gender}`}
          image={images.spendtime}
          money={0}
          happiness={10}
          health={0}
          intelligence={0}
          appearance={0}
          peopleHappiness={10}
          energy={-10}
          peopleId={peopleInfo.position ?? peopleInfo.id}
          onPress={acitityAction}
        />
        <ActivityItem
          title={"Fight"}
          description={`Fighting with ${gender}`}
          image={images.fight}
          money={0}
          happiness={-10}
          health={-10}
          intelligence={0}
          appearance={-5}
          peopleHappiness={-20}
          energy={-10}
          peopleId={peopleInfo.position ?? peopleInfo.id}
          onPress={acitityAction}
        />
      </ScrollView>

      <ErrorModal
        confirmTitle={"Try again"}
        onConfirm={() => tryAgain()}
        isVisible={showError}
        title={error?.title || ""}
        description={error?.description}
      />
    </View>
  );
};
