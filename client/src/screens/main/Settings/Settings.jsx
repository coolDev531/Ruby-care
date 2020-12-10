import { makeStyles } from "@material-ui/core/styles";
import Layout from "../../../layouts/Layout/Layout";
import Switch from "@material-ui/core/Switch";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../../../components/Context/CurrentUserContext";
import { DarkModeContext } from "../../../components/Context/DarkModeContext";
import Moment from "react-moment";
import "moment-timezone";
import ScrollToTopOnMount from "../../../components/Helpers/ScrollToTopOnMount";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import { getAge } from "../../../utils/getAge";
import { getAllUsers, putUser } from "../../../services/users";
import UserEdit from "../../../components/Dialogs/UserDialogs/UserEdit";
import Button from "@material-ui/core/Button";
import { useStyles } from "./settingStyles";

export default function Settings() {
  const [currentUser] = useContext(CurrentUserContext);
  const [darkMode, setDarkMode] = useContext(DarkModeContext);
  const [openEdit, setOpenEdit] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const userData = await getAllUsers();
      setAllUsers(userData);
    };
    fetchUsers();
  }, []);

  const handleUpdate = async (id, userData) => {
    userData.email = userData.email.toLowerCase();
    const updatedUser = await putUser(id, userData);
    setAllUsers((prevState) =>
      prevState.map((user) => {
        return user.id === Number(id) ? updatedUser : user;
      })
    );
  };

  const onSave = (formData, id) => {
    handleUpdate(formData, id);
    setAllUsers(allUsers);
    setOpenEdit(false);
    window.location.reload();
  };

  const handleOpen = () => {
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpenEdit(false);
  };

  const classes = useStyles({ darkMode });

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
      <ScrollToTopOnMount />
      <div className={classes.userContainer}>
        <Typography className={classes.accountTitle}>Your Account</Typography>
        <Typography className={classes.userText}>
          <strong>Name:</strong>&nbsp;{currentUser?.name}
        </Typography>
        <Typography className="age">
          <strong>Age:</strong>&nbsp;
          {getAge(currentUser?.birthday)} years old
        </Typography>
        <Typography className={classes.userText}>
          <strong>Gender:</strong>&nbsp;{currentUser?.gender}
        </Typography>
        <Typography className={classes.userText}>
          <strong>Email:</strong>&nbsp;{currentUser?.email}
        </Typography>
        <Typography>
          <strong>Joined:</strong>&nbsp;
          <Moment format="dddd, MMMM Do yyyy">{userDate}</Moment>
        </Typography>
      </div>

      <Button
        className={classes.manage}
        onClick={handleOpen}
        variant="contained"
        color="primary"
      >
        Edit Account
      </Button>
      <hr />
      <br />
      <div className={classes.root}>
        <Typography className={classes.categories}>Preferences</Typography>
        <div className="card-actions">
          <Card className={classes.card}>
            <CardActions className={classes.actionsContainer}>
              <Typography className={classes.darkModeContainer}>
                <Brightness4Icon className={classes.darkModeIcon} />
                &nbsp;Dark mode
              </Typography>
              <Switch
                className={classes.darkModeSwitch}
                checked={switchState}
                onChange={handleThemeChange}
              />
            </CardActions>
          </Card>
        </div>
      </div>
      {openEdit && (
        <UserEdit
          onSave={onSave}
          currentUser={currentUser}
          handleOpen={handleOpen}
          handleUpdate={handleUpdate}
          handleClose={handleClose}
        />
      )}
    </Layout>
  );
}