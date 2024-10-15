import { useState } from "react";
import ErrorMessage from "../common/ErrorMessage";
import FormInput from "../common/FormInput";
import { postRequest } from "../../utils/api";

function LoginPage() {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    event.preventDefault();

    const data = { username, password };

    try {
      const responseData = await postRequest(
        "http://localhost:3000/auth/login",
        data
      );

      setResponseData(responseData);
      setError(null);
      setUsername("");
      setPassword("");

      localStorage.setItem("token", responseData.token);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
        />
        <FormInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
        />
        <button type="submit">Submit</button>
      </form>
      <ErrorMessage message={error} />
      {responseData && (
        <div>
          <h2>Response Data:</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
