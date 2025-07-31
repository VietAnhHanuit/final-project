import { makeStyles } from "react-native-elements";
import { Mixin } from "../../helpers";

export default makeStyles((theme) => ({
  viewContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors?.backgroundItem,
    padding: Mixin.moderateSize(10),
  },
  container: {
    paddingHorizontal: Mixin.moderateSize(16),
    width: "100%",
    marginTop: Mixin.moderateSize(20),
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: Mixin.moderateSize(16),
    marginStart: Mixin.moderateSize(16),
    marginBottom: Mixin.moderateSize(32),
  },
  inputStyle: {
    marginTop: Mixin.moderateSize(16),
  },
  forgotText: {
    fontSize: Mixin.moderateSize(14),
    fontWeight: "600",
    color: theme.colors?.primary,
    marginTop: Mixin.moderateSize(10),
    textAlign: "center",
    alignSelf: "center",
  },
}));
