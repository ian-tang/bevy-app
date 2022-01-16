import moment from "moment";

import api from "../lib/apiClient";

export default function CreateEventForm(props) {
  const today = moment().format("YYYY-MM-DDTHH:mm");

  return (
    <form className="create-event" onSubmit={props.handleSubmit}>
      <h3>Plan a new activity</h3>

      <div className="form-input">
        <label htmlFor="title">title:</label>
        <input name="title" type="text" required></input>
      </div>

      <div className="form-input">
        <label htmlFor="date">date:</label>
        <input name="date" type="datetime-local" min={today} required></input>
      </div>

      <div className="form-input">
        <label htmlFor="location">start location:</label>
        <input name="location" type="text" required></input>
      </div>

      <div className="form-input">
        <label htmlFor="description">description (optional):</label>
        <input name="description" type="text"></input>
      </div>

      <button id="submit-form" type="submit">
        Create
      </button>
    </form>
  );
}
