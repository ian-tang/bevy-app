import { useState } from "react";
import { useRouter } from "next/router";
import auth from "../lib/auth";
import api from "../lib/apiClient";
import styles from "../styles/Form.module.css";

const initialState = {
  email: "",
  password: "",
};

export default function Login(props) {
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
    return !state.email || !state.password;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const user = state;
    const res = await api.login(user);

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
      style={{ maxWidth: "40rem", height: "20rem" }}
      className={styles["form"]}
      onSubmit={handleSubmit}
    >
      <h3>Log In</h3>

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

      <button
        id={styles["submit-form"]}
        type="submit"
        disabled={validateForm()}
      >
        Log In
      </button>
    </form>
  );
}
