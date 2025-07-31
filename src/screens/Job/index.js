import React, { useEffect, useState } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";

import AppText from "../../components/atoms/AppText";
import { ErrorModal } from "../../components/atoms/ErrorModal";
import { HookHelper } from "../../helpers";
import { useAppSelector, useGetNavigation } from "../../helpers/hookHelper";
import useStyles from "./styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import { images } from "../../../assets";
import { JobOfferDialog } from "../../components/modules/JobOfferDialog";
import { useOccupation } from "../../api/occupation";
import { UserActions } from "../../stores/actions";
import { JobLeavingDialog } from "../../components/modules/JobLeavingDialog";
import { useSkill } from "../../api/skill";
import firestore from "@react-native-firebase/firestore";

const JobItem = ({ item, selectJob }) => {
  const {
    id,
    title,
    description,
    paidPerYear,
    company,
    companySize,
    CEO,
    requirement,
    cost,
    degree,
  } = item;
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);
  const [expanded, setExpanded] = useState(false);
  const [jobOffer, setJobOffer] = useState(false);

  return (
    <TouchableOpacity
      style={{ backgroundColor: "black", borderRadius: 10 }}
      onPress={() => setJobOffer(true)}
    >
      <View style={styles.itemContainer}>
        <Image source={images.job} style={styles.avatar} />
        <View style={styles.jobInfo}>
          <AppText style={styles.jobName}>{title}</AppText>
          <AppText style={styles.descriptionText}>{description}</AppText>
          <AppText style={styles.paidText}>${paidPerYear}/yr</AppText>
        </View>
        <TouchableOpacity
          style={styles.moreContainer}
          onPress={() => setExpanded(!expanded)}
        >
          <Icon
            name={expanded ? "arrow-drop-up" : "arrow-drop-down"}
            size={20}
            color={"white"}
          />
        </TouchableOpacity>
      </View>
      {expanded && (
        <View style={styles.moreView}>
          <View style={styles.infoJobRow}>
            <AppText subtitle2>Company:</AppText>
            <AppText>{company}</AppText>
            <AppText subtitle2>Company Size:</AppText>
            <AppText>{companySize}</AppText>
            <AppText subtitle2>CEO:</AppText>
            <AppText>{CEO}</AppText>
          </View>

          {requirement?.length > 0 && (
            <View style={styles.infoJobRow}>
              <AppText subtitle2>Requirement</AppText>
              <View style={styles.infoJobRow}>
                {requirement.map((req) => (
                  <AppText key={req.id}>
                    {req.title}: Lvl {req.level}
                  </AppText>
                ))}
              </View>
              <AppText>{degree}</AppText>
            </View>
          )}

          {cost && (
            <View style={styles.infoJobRow}>
              <AppText subtitle2>Cost</AppText>
              {Object.keys(cost).map((key) => (
                <AppText key={key}>
                  {key}: -{cost[key]}
                </AppText>
              ))}
            </View>
          )}
        </View>
      )}
      <JobOfferDialog
        isVisible={jobOffer}
        onClose={() => setJobOffer(false)}
        job={item}
        accept={() => {
          setJobOffer(false);
          selectJob(item);
        }}
      />
    </TouchableOpacity>
  );
};

const CurrentJob = ({ job, removeJob }) => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);
  const [jobLeaving, setjobLeaving] = useState(false);

  return (
    <View style={{ width: "100%", flex: 1 }}>
      <View style={styles.jobOfferContainer}>
        <View style={styles.jobCurrent}>
          <Image source={images.job} style={styles.avatar} />
          <View style={styles.jobCurrentInfo}>
            <AppText style={styles.jobName}>{job.title}</AppText>
            <AppText style={styles.descriptionText}>{job.description}</AppText>
            <AppText style={styles.paidText}>${job.paidPerYear}/yr</AppText>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.companyInfo}>
          <Image source={images.company} style={styles.companyImage} />
          <AppText style={styles.companyName}>{job.company}</AppText>
          <AppText>{job.CEO}, CEO</AppText>
          <AppText>{job.companySize}</AppText>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          onPress={() => setjobLeaving(true)}
          style={styles.findJob}
        >
          <Image source={images.findjob} style={styles.avatar} />
          <AppText white h6 style={{ marginTop: 5 }}>
            Find Job
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setjobLeaving(true)}
          style={[styles.findJob, { backgroundColor: "#b21b1c" }]}
        >
          <Image source={images.leavejob} style={styles.avatar} />
          <AppText white h6 style={{ marginTop: 5 }}>
            Leave Job
          </AppText>
        </TouchableOpacity>
      </View>
      <JobLeavingDialog
        isVisible={jobLeaving}
        onClose={() => setjobLeaving(false)}
        job={job}
        accept={() => {
          setjobLeaving(false);
          removeJob();
        }}
      />
    </View>
  );
};

export const OccupationScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const { navigation } = useGetNavigation();
  const styles = useStyles(theme);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState();
  const { onUploadJobs, onGetJobs, onSelectJob, onRemoveJob } = useOccupation();
  const [jobList, setJobList] = useState([]);
  const [skillList, setSkillList] = useState([]);
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );

  const userReducer = useAppSelector((state) => state.UserReducer);
  const tryAgain = () => {
    setShowError(false);
    setError(undefined);
  };
  const getJobs = async () => {
    const response = await onGetJobs();
    if (response.isSuccessful) {
      setJobList(response.jobs);
    } else {
      setShowError(true);
      setError({
        title: "Error",
        description: response.error.message,
      });
    }
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection("Users")
      .doc(authenticationReducer.accessToken)
      .collection("Skills")
      .onSnapshot((snapshot) => {
        const skills = snapshot.docs.map((doc) => doc.data());
        setSkillList(skills);
      });
    return () => subscriber();
  }, []);

  const isSkillFit = (requirement) => {
    const userSkill = skillList.find(
      (skill) => skill.title == requirement.title
    );
    if (userSkill && userSkill.level >= requirement.level) {
      return true;
    }
    return false;
  };

  const selectJob = async (job) => {
    if (userReducer.age < 16) {
      setShowError(true);
      setError({
        title: "Error",
        description: "You're too young to work",
      });
      return;
    }
    
    for (let i = 0; i < job.requirement.length; i++) {
      if (!isSkillFit(job.requirement[i])) {
        setShowError(true);
        setError({
          title: "Error",
          description: "You don't have the required skill for this job",
        });
        return;
      }
    }

    if (job.degree != "None" || job.degree != userReducer.degree) {
      setShowError(true);
      setError({
        title: "Error",
        description: "You don't have the required degree for this job",
      });
      return;
    }

    const response = await onSelectJob(job);
    if (response.isSuccessful) {
      dispatch(UserActions.setJob.request(job));
    } else {
      setShowError(true);
      setError({
        title: "Error",
        description: response.error.message,
      });
    }
  };

  const removeJob = async () => {
    const response = await onRemoveJob();
    if (response.isSuccessful) {
      dispatch(UserActions.setJob.request(undefined));
    } else {
      setShowError(true);
      setError({
        title: "Error",
        description: response.error.message,
      });
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <AppText style={styles.header}>
          {userReducer.job ? "Employment" : "Unemployed"}
        </AppText>
      </View>

      <View style={styles.line} />
      <AppText style={styles.title}>
        {userReducer.job ? "Current Job" : "Job Listings"}
      </AppText>
      {userReducer.job ? (
        <CurrentJob job={userReducer.job} removeJob={removeJob} />
      ) : (
        <FlatList
          data={jobList}
          renderItem={({ item }) => (
            <JobItem item={item} selectJob={selectJob} />
          )}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        />
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
