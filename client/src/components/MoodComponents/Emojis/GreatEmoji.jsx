import React from "react";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";

function GreatEmoji({ darkMode }) {
  return (
    <>
      <InsertEmoticonIcon
        style={
          !darkMode
            ? {
                border: "1px solid black",
                background: "#00FF00",
                fontSize: "36px",
              }
            : {
                border: "1px solid black",
                color: "black",
                background: "#00FF00",
                fontSize: "36px",
              }
        }
      />
    </>
  );
}

export default GreatEmoji;
