import { makeStyles } from "@material-ui/core/styles";
import Layout from "../../layouts/Layout/Layout";
import Switch from "@material-ui/core/Switch";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import { useContext, useState } from "react";
import { indigo } from "@material-ui/core/colors";
import { CurrentUserContext } from "../../components/Context/CurrentUserContext";
import { DarkModeContext } from "../../components/Context/DarkModeContext";
import Moment from "react-moment";
import "moment-timezone";

export default function Settings() {
  const [currentUser] = useContext(CurrentUserContext);
  const [darkMode, setDarkMode] = useContext(DarkModeContext);
  const useStyles = makeStyles((theme) => ({
    root: {
      margin: "0 auto",
      [theme.breakpoints.down("xs")]: {
        maxWidth: "90vw",
      },
      [theme.breakpoints.up("sm")]: {
        maxWidth: "90vw",
      },
      [theme.breakpoints.up("md")]: {
        maxWidth: "900px",
      },
      [theme.breakpoints.up("lg")]: {
        maxWidth: "1000px",
      },
      [theme.breakpoints.up("xl")]: {
        maxWidth: "60vw",
      },
    },
    card: {
      display: "flex",
      boxShadow:
        darkMode === "light" ? "default" : `0px 0px 4px 1.2px ${indigo[50]}`,
      marginTop: "20px",
      marginBottom: "30px",
    },
    actionsContainer: {
      display: "flex",
    },
    userContainer: {
      display: "flex",
      alignSelf: "center",
      justifyContent: "center",
      flexDirection: "column",
      margin: "0 auto",
      width: "200px",
    },
  }));

  const classes = useStyles();
  const [switchState, setSwitchState] = useState(() => {
    let state = localStorage.getItem("switchState");
    if (state !== null) {
      return state === "true" ? true : false;
    }
    return false;
  });

  const handleThemeChange = () => {
    setSwitchState(switchState === true ? false : true);
    if (darkMode === "light") {
      setDarkMode("dark");
      localStorage.setItem("darkMode", "dark");
      localStorage.setItem("switchState", true);
    } else {
      setDarkMode("light");
      localStorage.setItem("darkMode", "light");
      localStorage.setItem("switchState", false);
    }
  };

  const userDate = currentUser?.created_at?.toLocaleString();
  return (
    <Layout title="Settings">
      <div className={classes.userContainer}>
        <Typography className={classes.title}>{currentUser?.name}</Typography>
        <Typography className={classes.title}>{currentUser?.email}</Typography>
        <Typography>
          Joined&nbsp;
          <Moment format="MM/DD/yyyy">{userDate}</Moment>
        </Typography>
      </div>
      <div className={classes.root}>
        <Typography>Preferences</Typography>
        <div className="card-actions">
          <Card className={classes.card}>
            <CardActions className={classes.actionsContainer}>
              <Typography className={classes.typography}>Dark mode</Typography>
              <Switch
                className={classes.darkModeSwitch}
                checked={switchState}
                onChange={handleThemeChange}
              />
            </CardActions>
          </Card>
        </div>
      </div>
    </Layout>
  );
}