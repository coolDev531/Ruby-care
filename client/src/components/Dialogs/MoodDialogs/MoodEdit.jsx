import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import "moment-timezone";
import {
  PoorRadio,
  OkayRadio,
  GoodRadio,
  GreatRadio,
} from "../../Form/RadioButtons";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
} from "../../Form/DialogComponents";
import { compareDateWithCurrentTime } from "../../../utils/compareDateWithCurrentTime";

export default function MoodEdit(props) {
  const [formData, setFormData] = useState({
    status: "",
    time: "",
    reason: "",
  });
  const { id } = useParams();

  useEffect(() => {
    const prefillForm = () => {
      const moodItem = props.moods?.find((mood) => mood?.id === Number(id));
      setFormData({
        status: moodItem?.status,
        time: moodItem?.time,
      });
    };
    if (props.moods?.length) {
      prefillForm();
    }
  }, [props.moods, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSave(id, formData);
  };

  const handleStatus = (e) => {
    const { name } = e.target;
    setFormData((prevState) => ({
      // spreading through previous state so date doesn't give "invalid date on submission"
      ...prevState,
      status: name,
    }));
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "time" && value) {
      let date = new Date(value);
      value = date.toISOString();
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Dialog onClose={props.handleClose} open={props.handleOpen}>
      <form onSubmit={handleSubmit}>
        <DialogTitle onClose={props.handleClose}>
          <Typography>Edit Mood</Typography>
        </DialogTitle>
        <DialogContent dividers>
          {formData.time && (
            <Typography>
              <Moment format="dddd, MMMM Do yyyy: hh:mm A">
                {formData.time}
              </Moment>
            </Typography>
          )}
          <div>
            <FormLabel>
              Poor
              <PoorRadio
                type="radio"
                name="Poor"
                checked={formData.status === "Poor"}
                onChange={handleStatus}
              />
            </FormLabel>
            <FormLabel>
              Okay
              <OkayRadio
                type="radio"
                name="Okay"
                checked={formData.status === "Okay"}
                onChange={handleStatus}
              />
            </FormLabel>

            <FormLabel>
              Good
              <GoodRadio
                type="radio"
                name="Good"
                checked={formData.status === "Good"}
                onChange={handleStatus}
              />
            </FormLabel>
            <FormLabel>
              Great
              <GreatRadio
                type="radio"
                name="Great"
                checked={formData.status === "Great"}
                onChange={handleStatus}
              />
            </FormLabel>
          </div>

          <div className="input-container">
            <TextField
              name="time"
              required
              id="datetime-local"
              label={`Please choose a time`}
              type="datetime-local"
              style={{ width: "300px", margin: "10px" }}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className="input-container">
            <TextField
              className="select-css"
              name="reason"
              type="text"
              required
              label={
                compareDateWithCurrentTime(formData.time) === 1 && formData.time
                  ? `why did you feel this way?`
                  : `why do you feel this way?`
              }
              style={{ display: "flex", width: "300px", margin: "10px" }}
              value={formData.reason}
              onChange={handleChange}
            />
          </div>
        </DialogContent>

        <DialogActions>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
          <Button
            to="/"
            component={Link}
            variant="contained"
            color="secondary"
            onClick={props.handleClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
