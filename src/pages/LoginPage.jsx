import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { loginAdmin, getLoginHint } from "../data/authStore";
import "./LoginPage.css";

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hint = getLoginHint();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const isValid = loginAdmin({ username, password });
    if (!isValid) {
      setError("Invalid username or password.");
      setIsSubmitting(false);
      return;
    }

    onLogin();
  };

  return (
    <section className="login-page" aria-label="Login page">
      <div className="login-card">
        <span className="login-card__brand" aria-hidden="true">
          <ShieldCheck size={24} />
        </span>
        <h1>Admin Login</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form__field">
            <label htmlFor="login-username">Username</label>
            <input
              id="login-username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="login-form__field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          {error && <p className="login-form__error">{error}</p>}

          <button className="login-form__submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="login-card__hint">
          Demo credentials: username <strong>{hint.username}</strong> / password <strong>{hint.password}</strong>
        </p>
      </div>
    </section>
  );
}
