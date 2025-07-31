import React, { useEffect } from "react";

import { Provider } from "react-redux";
import configureStore from "./src/stores/configurations/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { MainApp } from "./src/navigation/MainApp";
import { setJSExceptionHandler } from "react-native-exception-handler";
import { LoadingProvider } from "./src/helpers/loadingHelper";
import { Alert } from "react-native";
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

const errorHandler = (e, isFatal) => {
  if (isFatal) {
    Alert.alert(
      "Error",
      "There is a problem with Natcash app, please contact us for more information",
      [{ text: "Close" }]
    );
  } else {
  }
};

setJSExceptionHandler(errorHandler, true);
// configureStore().persistor.purge();
//try git commit Locnm_mascom
const App = () => {
  return (
    // <GestureHandlerRootView style={{flex: 1}}>
    <Provider store={configureStore().store}>
      <PersistGate loading={null} persistor={configureStore().persistor}>
        <LoadingProvider>
          <MainApp />
        </LoadingProvider>
      </PersistGate>
    </Provider>
    // </GestureHandlerRootView>
  );
};
export default App;
