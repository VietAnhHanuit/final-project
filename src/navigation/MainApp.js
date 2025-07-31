import React, { useEffect } from "react";
import { ActivityIndicator, StatusBar } from "react-native";
import { Overlay, ThemeProvider } from "react-native-elements";
// import SplashScreen from "react-native-splash-screen";
import { AuthenticationRoute, HomeRoute } from ".";
import { useAppInIt } from "../helpers/features/appInit";
import { useAppSelector } from "../helpers/hookHelper";
import { useLoadingContext } from "../helpers/loadingHelper";
import { ServerDown } from "../screens/ServerDown";
import { theme } from "../utils/styles/theme";

export const MainApp = () => {
  const authenticationReducer = useAppSelector((state) => state.AuthenticationReducer);
  const appReducer = useAppSelector((state) => state.AppReducer);

  const { loading, hideLoading } = useLoadingContext();
  // const {showNotification} = useNotification();
  const { isDone, remoteFetch } = useAppInIt();
  // const {fetchOnly} = useRemoteConfig();
  const deviceId = useAppSelector((state) => state.AppReducer.deviceId);

  // useEffect(() => {
  //   if (deviceId) {
  //     remoteFetch();
  //     SplashScreen.hide();
  //     if (isDone) {
  //       SplashScreen.hide();
  //     }
  //   }
  // }, [deviceId]);

  useEffect(() => {
    hideLoading();
  }, [authenticationReducer.accessToken]);
  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     showNotification(
  //       `${remoteMessage.notification?.title}`,
  //       `${remoteMessage.notification?.body}`,
  //     );
  //   });

  //   return unsubscribe;
  // }, []);

  const renderMainApp = () =>
    authenticationReducer.accessToken ? <HomeRoute /> : <AuthenticationRoute />;
  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors?.primary} />
      {appReducer.appConfig.is_server_down ? <ServerDown /> : renderMainApp()}
      <Overlay
        overlayStyle={{ backgroundColor: "transparent", elevation: 0 }}
        style={{ backgroundColor: "transparent" }}
        isVisible={loading}>
        <ActivityIndicator
          size={"large"}
          color={theme.colors?.primary}
          style={{ backgroundColor: "transparent" }} />
      </Overlay>
    </ThemeProvider>
  );
};
