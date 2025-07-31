import React, { useEffect, useState } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";

import * as Progress from "react-native-progress";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useSkill } from "../../api/skill";
import AppText from "../../components/atoms/AppText";
import { ErrorModal } from "../../components/atoms/ErrorModal";
import { HookHelper } from "../../helpers";
import { useAppSelector, useGetNavigation } from "../../helpers/hookHelper";
import useStyles from "./styles";
import { AppDialog } from "../../components/atoms/AppDialog";
import { useUser } from "../../api/user";
import { UserActions } from "../../stores/actions";

const SkillItem = ({ item, upgradeSkill }) => {
  const { id, title, icon, moneyCost, energyCost, level } = item;
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);
  const [showDialog, setShowDialog] = useState(false);

  return (
    <View style={styles.itemContainer}>
      <View style={{ top: 8 }}>
        <View style={styles.skillImage}>
          <Image source={{ uri: icon }} style={styles.avatar} />
        </View>
        <View style={styles.ageContainer}>
          <AppText body3 white>
            Lvl {level}
          </AppText>
        </View>
      </View>
      <View>
        <AppText subtitle1>{title}</AppText>
        <Progress.Bar
          style={{ marginVertical: 2 }}
          width={160}
          height={12}
          progress={level / 10}
          color="#53b3ff"
        />
        <AppText>{level}/10</AppText>
      </View>
      <TouchableOpacity
        style={styles.learningContainer}
        onPress={() => setShowDialog(true)}
      >
        <Icon name="keyboard-double-arrow-up" size={20} color={"white"} />
        <AppText white>Upgrade</AppText>
      </TouchableOpacity>
      <AppDialog
        isVisible={showDialog}
        onClose={() => setShowDialog(false)}
        title={title}
        uri={icon}
        content={"Are you sure you want to upgrade this skill?"}
        description={`This will cost you $${moneyCost} and ${energyCost} energy`}
        okeBtn={"Upgrade"}
        cancelBtn={"Cancel"}
        positiveAction={() => {
          setShowDialog(false);
          upgradeSkill(item, level + 1);
        }}
      />
    </View>
  );
};
export const SkillScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const { navigation } = useGetNavigation();
  const styles = useStyles(theme);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState();
  const [skillList, setSkillList] = useState([]);
  const userReducer = useAppSelector((state) => state.UserReducer);

  const { onGetUserSkill, onUpgradeSkill } = useSkill();
  const { onUpgradeMoney, onUpgradeEnergy } = useUser();

  const upgradeSkill = async (skill, level) => {
    if (
      userReducer.money < skill.moneyCost ||
      userReducer.energy < skill.energyCost
    ) {
      setShowError(true);
      setError({
        title: "Error",
        description: "Not enough money or energy",
      });
      return;
    }
    const response = await onUpgradeSkill(skill, level);
    if (response.isSuccessful) {
      getSkill();
      upgradeEnergy(userReducer.energy - skill.energyCost);
      upgradeMoney(userReducer.money - skill.moneyCost);
    } else {
      setShowError(true);
      setError({
        title: "Error",
        description: response.error.message,
      });
    }
  };

  const upgradeEnergy = async (energy) => {
    const response = await onUpgradeEnergy(energy);
    if (response.isSuccessful) {
      dispatch(UserActions.setEnergy.request(energy));
    } else {
      setShowError(true);
      setError({
        title: "Error",
        description: response.error.message,
      });
    }
  };

  const upgradeMoney = async (money) => {
    const response = await onUpgradeMoney(money);
    if (response.isSuccessful) {
      dispatch(UserActions.setMoney.request(money));
    } else {
      setShowError(true);
      setError({
        title: "Error",
        description: response.error.message,
      });
    }
  };

  const tryAgain = () => {
    setShowError(false);
    setError(undefined);
  };

  const getSkill = async () => {
    const response = await onGetUserSkill();
    if (response.isSuccessful) {
      setSkillList(response.skills);
    } else {
      setShowError(true);
      setError({
        title: "Error",
        description: response.error.message,
      });
    }
  };

  useEffect(() => {
    getSkill();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.energyContainer}>
        <View style={styles.energyText}>
          <AppText subtitle2 white>
            Energy
          </AppText>
          <AppText subtitle2 white>
            {userReducer.energy}/100
          </AppText>
        </View>

        <Progress.Bar
          width={230}
          height={12}
          progress={userReducer.energy / 100}
          color="orange"
          unfilledColor={theme.colors?.secondary}
        />
      </View>
      <View style={styles.line} />
      <AppText style={styles.title}>Skill</AppText>
      <FlatList
        data={skillList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <SkillItem item={item} upgradeSkill={upgradeSkill} />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      />

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
