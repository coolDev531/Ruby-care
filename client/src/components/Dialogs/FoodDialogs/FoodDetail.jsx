import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Moment from "react-moment";
import "moment-timezone";
import getRating from "../../../utils/getRating";
import { foodNameJSX } from "../../../utils/foodUtils";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
} from "../../Form/DialogComponents";

export default function FoodDetail({
  food,
  openDetail,
  onDelete,
  setOpenDetail,
}) {
  return (
    <Dialog onClose={() => setOpenDetail(false)} open={openDetail}>
      <DialogTitle onClose={() => setOpenDetail(false)}>
        {foodNameJSX(food)}
      </DialogTitle>
      <DialogContent
        dividers
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          overflowWrap: "break-word",
        }}
      >
        <Typography> Rating:&nbsp;{getRating(food?.rating, "⭐")}</Typography>
      </DialogContent>
      <DialogContent
        dividers
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          overflowWrap: "break-word",
        }}
      >
        <Typography>Factors:</Typography>
        <Typography style={{ marginTop: "2px" }}>
          <small>{food?.factors}</small>
        </Typography>
      </DialogContent>
      <DialogTitle>
        <Typography>
          <Moment format="dddd, MMMM Do yyyy: hh:mm A">
            {food?.time?.toLocaleString()}
          </Moment>
        </Typography>
      </DialogTitle>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenDetail(false)}
        >
          Exit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className="delete-button"
          onClick={() => onDelete(food.id)}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
