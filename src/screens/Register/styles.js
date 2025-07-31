import { makeStyles } from "react-native-elements";
import { Mixin } from "../../helpers";

export default makeStyles((theme) => ({
  viewContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors?.backgroundItem,
    padding: Mixin.moderateSize(10),
  },
  loginRight: {
    width: Mixin.moderateSize(100),
    justifyContent: "center",
    // top: Mixin.moderateSize(8),
  },
  loginRightText: {
    color: theme.colors?.primary,
    fontSize: Mixin.moderateSize(16),
    textAlign: "right",
  },
  container: {
    width: Mixin.device_width,
    paddingHorizontal: Mixin.moderateSize(16),
  },
  inputStyle: {
    marginTop: Mixin.moderateSize(16),
  },
  buttonContainer: {
    paddingHorizontal: Mixin.moderateSize(16),
    width: "100%",
    position: "absolute",
    bottom: Mixin.moderateSize(30),
  },
  refreshIcon: {
    width: Mixin.moderateSize(20),
    height: Mixin.moderateSize(20),
  },
}));
