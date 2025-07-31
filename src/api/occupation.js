import firestore from "@react-native-firebase/firestore";
import { useAppSelector, useBaseHook } from "../helpers/hookHelper";

const JobList = [
  {
    id: 1,
    title: "Senior IOS Developer",
    description: "Full-time",
    paidPerYear: 90240,
    company: "Apple",
    companySize: "10000+ employees",
    CEO: "Tim Cook",
    requirement: [
      {
        title: "Swift",
        level: 5,
      },
    ],
    degree: "Information Technology",
  },
  {
    id: 2,
    title: "Data Scientist",
    description: "Full-time",
    paidPerYear: 60000,
    company: "Facebook",
    companySize: "10000+ employees",
    CEO: "Mark Zuckerberg",
    requirement: [
      {
        title: "Python",
        level: 5,
      },
    ],
    degree: "Computer Science",
  },
  {
    id: 3,
    title: "Backend Engineer",
    description: "Full-time",
    paidPerYear: 80000,
    company: "Google",
    companySize: "10000+ employees",
    CEO: "Sundar Pichai",
    requirement: [
      {
        title: "JavaScript",
        level: 5,
      },
      {
        title: "SQL",
        level: 5,
      },
    ],
    degree: "Information Technology",
  },
  {
    id: 4,
    title: "IOT Engineer",
    description: "Full-time",
    paidPerYear: 100000,
    company: "Google",
    companySize: "10000+ employees",
    CEO: "Sundar Pichai",
    requirement: [
      {
        title: "Linux",
        level: 8,
      },
    ],
    degree: "Information Technology",
  },
  {
    id: 5,
    title: "Truck driver",
    description: "Part-time",
    paidPerYear: 35000,
    company: "Grab Taxi",
    companySize: "500+ employees",
    CEO: "Jonny",
    cost: {
      Health: 10,
      Look: 10,
    },
    degree: "None",
  },
];

export const useOccupation = () => {
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );
  const { showLoading, hideLoading } = useBaseHook();

  const onUploadJobs = async () => {
    showLoading();
    try {
      for (let i = 0; i < JobList.length; i++) {
        await firestore()
          .collection("Jobs")
          .doc(`${i + 1}`)
          .set(JobList[i]);
      }

      hideLoading();
      return {
        isSuccessful: true,
      };
    } catch (error) {
      hideLoading();
      return {
        error: error,
        isSuccessful: false,
      };
    }
  };

  const onGetJobs = async () => {
    showLoading();
    try {
      const snapshot = await firestore().collection("Jobs").get();
      hideLoading();
      const jobs = snapshot.docs.map((doc) => ({ ...doc.data() }));

      return {
        jobs: jobs,
        isSuccessful: true,
      };
    } catch (error) {
      hideLoading();
      return {
        error: error,
        isSuccessful: false,
      };
    }
  };

  const onSelectJob = async (job) => {
    showLoading();
    try {
      const response = await firestore()
        .collection("Users")
        .doc(authenticationReducer.accessToken)
        .update({
          job: job,
        });
      hideLoading();
      return {
        isSuccessful: true,
      };
    } catch (error) {
      hideLoading();
      return {
        error: error,
        isSuccessful: false,
      };
    }
  };

  const onRemoveJob = async () => {
    showLoading();
    try {
      const response = await firestore()
        .collection("Users")
        .doc(authenticationReducer.accessToken)
        .update({
          job: firestore.FieldValue.delete(),
        });
      hideLoading();
      return {
        isSuccessful: true,
      };
    } catch (error) {
      hideLoading();
      return {
        error: error,
        isSuccessful: false,
      };
    }
  };

  return {
    onUploadJobs,
    onGetJobs,
    onSelectJob,
    onRemoveJob,
  };
};
