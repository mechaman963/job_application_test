import { useState } from "react";

const App = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  // handle submitting data:
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const verificationErrors = handleVerificaion(data);
    setErrors(verificationErrors);
    if (verificationErrors.length === 0) {
      console.log(data);
      console.log("Data was sent successfully!!");
    } else {
      console.log(verificationErrors);
    }
    setIsLoading(false);
  };

  // handle verification:
  const handleVerificaion = (data) => {
    const errorsArray = [];
    if (data.name === "" || !data.name) {
      errorsArray.push("Name is required.");
    } else if (data.name.length < 2) {
      errorsArray.push("Name must be at least 2 characters.");
    }
    if (data.email === "") {
      errorsArray.push("Email is required.");
    } else if (!validateEmailFormat(data.email)) {
      errorsArray.push("Email is in invalid format.");
    }
    if (data.password === "") {
      errorsArray.push("Password is required.");
    } else if (data.password.length < 8) {
      errorsArray.push("Password must be at least 8 characters.");
    } else if (data.password !== data.passwordConfirm) {
      errorsArray.push("Password confirmation does not match.");
    }
    return errorsArray;
  };

  // validate email format:
  const validateEmailFormat = (email) => {
    const emailRegEx = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
    return emailRegEx.test(email);
  };
  return (
    <form onSubmit={handleSubmit} className="container">
      <div className="title">
        <h2>Registeration</h2>
      </div>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Name..."
          id="name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email..."
          id="email"
          value={data.email}
          onChange={(e) => {
            setData({ ...data, email: e.target.value });
          }}
        />
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password..."
          id="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Your Password..."
          id="confirm-password"
          value={data.passwordConfirm}
          onChange={(e) =>
            setData({ ...data, passwordConfirm: e.target.value })
          }
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? <div className="loader"></div> : <span>Submit</span>}
      </button>

      {/* === ERRORS === */}

      {errors.length > 0 && (
        <ul className="errors">
          {errors.map((error, index) => (
            <li key={index} className="error">
              *{error}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default App;
