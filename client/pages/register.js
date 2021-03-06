import { useState } from "react";
import { useRouter } from "next/router";
import auth from "../lib/auth";
import api from "../lib/apiClient";
import styles from "../styles/Form.module.css";

const initialState = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  city: "",
  state: "",
};

function Register(props) {
  const [state, setState] = useState(initialState);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    return (
      !state.email || !state.password || !state.firstName || !state.lastName
    );
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const user = state;
    const res = await api.register(user);

    if (res.error) {
      alert(`${res.message}`);
      setState(initialState);
    } else {
      const { accessToken } = res;
      localStorage.setItem("accessToken", accessToken);
      auth.login(() => router.push("/profile"));
    }
  }

  return (
    <form
      style={{ "max-width": "40rem", height: "35rem" }}
      className={styles["form"]}
      onSubmit={handleSubmit}
    >
      <h3>Create an account</h3>

      <div className={styles["form-input"]}>
        <label htmlFor="email">email:</label>
        <input
          name="email"
          type="text"
          required
          onChange={handleChange}
        ></input>
      </div>

      <div className={styles["form-input"]}>
        <label htmlFor="password">password:</label>
        <input
          name="password"
          type="password"
          required
          onChange={handleChange}
        ></input>
      </div>

      <div className={styles["form-input"]}>
        <label htmlFor="firstName">first name:</label>
        <input
          name="firstName"
          type="text"
          required
          onChange={handleChange}
        ></input>
      </div>

      <div className={styles["form-input"]}>
        <label htmlFor="lastName">last name:</label>
        <input
          name="lastName"
          type="text"
          required
          onChange={handleChange}
        ></input>
      </div>

      <div className={styles["form-input"]}>
        <label htmlFor="city">city (optional):</label>
        <input name="city" type="text" onChange={handleChange}></input>
      </div>

      <div className={styles["form-input"]}>
        <label htmlFor="state">state (optional):</label>
        <input name="state" type="text" onChange={handleChange}></input>
      </div>

      <button
        id={styles["submit-form"]}
        type="submit"
        disabled={validateForm()}
      >
        Register
      </button>
    </form>
  );
}

export default Register;
