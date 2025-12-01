import { useState } from "react";

const Field = ({ key }) => {
  const [data, setData] = useState();
  return (
    <div className="field">
      <label htmlFor={key} className="label">
        {key}
      </label>
      <input
        type={
          key === "email"
            ? "email"
            : key === "password" || key === "confirm-password"
            ? "password"
            : "text"
        }
        placeholder={key.toUpperCase()}
        value={data.key}
      />
    </div>
  );
};
