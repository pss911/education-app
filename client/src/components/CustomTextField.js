import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

import { accentColor, backgroundColor } from "../colors.json";

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
