import React, { useEffect, useState } from "react";
import { FlatList, Switch, TouchableOpacity, View } from "react-native";

import { Image } from "react-native-elements";
import { images } from "../../../assets";
import AppText from "../../components/atoms/AppText";
import { ErrorModal } from "../../components/atoms/ErrorModal";
import { HookHelper } from "../../helpers";
import { useAppSelector, useGetNavigation } from "../../helpers/hookHelper";
import useStyles from "./styles";
import { useEducation } from "../../api/education";
import { UserActions } from "../../stores/actions";

const SchoolComponent = ({
  title,
  years,
  completedYear,
  containerStyles,
  degree,
  enrollUniversity,
}) => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);

  const bottomComponent = () => {
    if (completedYear <= years) {
      return (
        <View style={styles.completed}>
          <AppText style={styles.completedText}>Completed</AppText>
        </View>
      );
    } else if (title != "ELEMENTARY" && title != "HIGH SCHOOL") {
      if (degree == "") {
        return (
          <TouchableOpacity
            style={styles.enrollBtn}
            onPress={() => enrollUniversity && enrollUniversity(title)}
          >
            <AppText style={styles.completedText} white>
              Enroll
            </AppText>
          </TouchableOpacity>
        );
      } else {
        return <View></View>;
      }
    } else {
      if (years != 0) {
        return (
          <View style={styles.dropOutBtn}>
            <AppText style={styles.dropOutText}>In Progress</AppText>
          </View>
        );
      } else {
        return (
          <View style={styles.dropOutBtn}>
            <AppText style={styles.dropOutText}>Under Age</AppText>
          </View>
        );
      }
    }
  };

  return (
    <View
      style={[
        styles.schoolContainer,
        {
          backgroundColor:
            completedYear == years
              ? theme.colors?.grey2
              : theme.colors?.secondary,
        },
        containerStyles,
      ]}
    >
      <AppText style={{ textAlign: "center" }}>{title}</AppText>
      <Image source={images.school} style={styles.icon} />
      <AppText italic>
        {years}/{completedYear} YEARS
      </AppText>
      {bottomComponent()}
    </View>
  );
};

export const EducationScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const { navigation } = useGetNavigation();
  const styles = useStyles(theme);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState();
  const [isEnabled, setIsEnabled] = useState(false);
  const userReducer = useAppSelector((state) => state.UserReducer);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const { onGetSpecialize, onEnrollUniversity } = useEducation();
  const [specialize, setSpecialize] = useState([]);
  const tryAgain = () => {
    setShowError(false);
    setError(undefined);
  };

  const getSpecialize = async () => {
    const response = await onGetSpecialize();
    if (response.isSuccessful) {
      setSpecialize(response.specialize);
    } else {
      setShowError(true);
      setError({
        title: "Error",
        description: response.error.message,
      });
    }
  };

  const enrollUniversity = async (degree) => {
    const response = await onEnrollUniversity(degree);
    if (response.isSuccessful) {
      dispatch(UserActions.setDegree.request(degree));
    } else {
      setShowError(true);
      setError({
        title: "Error",
        description: response.error.message,
      });
    }
  };

  useEffect(() => {
    getSpecialize();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.studyEnable}>
        <Image source={images.book} style={styles.book} />
        <AppText h4>Study Hard</AppText>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <View style={styles.line} />
      <AppText style={styles.title}>GENERAL</AppText>

      {userReducer.age >= 6 ? (
        <View style={styles.rowContainer}>
          <SchoolComponent
            title={"ELEMENTARY"}
            completedYear={8}
            years={userReducer.elementary}
            degree={userReducer.degree}
          />
          <SchoolComponent
            title={"HIGH SCHOOL"}
            completedYear={4}
            years={userReducer.highSchool}
            degree={userReducer.degree}
          />
        </View>
      ) : (
        <View style={styles.specialityContainer}>
          <Image source={images.lock} style={styles.book} />
          <AppText style={{ marginVertical: 5 }}>Unlocks at</AppText>
          <AppText subtitle2>Age 6</AppText>
        </View>
      )}
      <View style={styles.line} />
      <AppText style={styles.title}>SPECIALIZATION</AppText>

      {userReducer.age >= 18 ? (
        userReducer.degree == "" ? (
          <View style={styles.rowContainer}>
            <FlatList
              horizontal
              data={specialize}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => <View style={{ width: 40 }} />}
              renderItem={({ item }) => (
                <SchoolComponent
                  title={item.title}
                  years={userReducer.university}
                  completedYear={4}
                  degree={userReducer.degree}
                  enrollUniversity={enrollUniversity}
                />
              )}
            />
          </View>
        ) : (
          <View style={styles.rowContainer}>
            <SchoolComponent
              title={userReducer.degree}
              years={userReducer.university}
              completedYear={4}
              degree={userReducer.degree}
              enrollUniversity={enrollUniversity}
            />
          </View>
        )
      ) : (
        <View style={styles.specialityContainer}>
          <Image source={images.lock} style={styles.book} />
          <AppText style={{ marginVertical: 5 }}>Unlocks at</AppText>
          <AppText subtitle2>Age 18</AppText>
        </View>
      )}

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
