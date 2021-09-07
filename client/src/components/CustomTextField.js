import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const accentColor = "#4C8BF4";
const backgroundColor = "#e7e7e8";

const CustonTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: accentColor,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: accentColor,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: backgroundColor,
      },
      "&:hover fieldset": {
        borderColor: accentColor,
      },
      "&.Mui-focused fieldset": {
        borderColor: accentColor,
      },
    },
  },
})(TextField);

export default CustonTextField;
