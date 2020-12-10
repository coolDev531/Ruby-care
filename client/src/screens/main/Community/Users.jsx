import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Search from "../../../components/Search/Search";
import LinearProgress from "@material-ui/core/LinearProgress";
import Layout from "../../../layouts/Layout/Layout";
import { checkUserLength } from "../../../utils/checkUserLength";
import { DarkModeContext } from "../../../components/Context/DarkModeContext";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ScrollToTopOnMount from "../../../components/Helpers/ScrollToTopOnMount";
import Div from "./styledUsers";

const Users = ({ allUsers, loaded }) => {
  const [darkMode] = useContext(DarkModeContext);
  const [search, setSearch] = useState("");

  const getUsers = () =>
    allUsers.filter((user) =>
      user.name.toLowerCase().includes(`${search}`.toLowerCase())
    );

  const queriedUsers = React.Children.toArray(
    getUsers().map((user) => (
      <Link darkMode={darkMode} to={`/users/${user.id}`} className="link">
        <AccountCircleIcon className="user-icon" /> <h1>{user.name}</h1>
      </Link>
    ))
  );

  return (
    <Layout title="Community">
      <Div darkMode={{ darkMode }}>
        <ScrollToTopOnMount />
        <div className="title-container">
          <p> Search for a user!</p>
        </div>
        <Search setSearch={setSearch} />
        <div className="users-container">
          <>
            <p className="users-title">
              {checkUserLength(queriedUsers, loaded)}
            </p>
            {!loaded ? (
              <LinearProgress style={{ margin: "50px auto", width: "30vw" }} />
            ) : (
              queriedUsers
            )}
          </>
        </div>
      </Div>
    </Layout>
  );
};

export default Users;