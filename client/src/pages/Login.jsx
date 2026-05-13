import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/UserContext";

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80";

function Login() {
  const { setUser } = useContext(UserContext);
  const [method, setMethod] = useState("email");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const handleUser = (userData) => {
    setUser(userData);
    navigate("/home");
  };

  const handleSubmit = () => {
    setError("");

    if (method === "guest") {
      handleUser({
        name: "Guest",
        photo: photo || DEFAULT_AVATAR,
        authMethod: "Guest",
      });
      return;
    }

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (method === "email" && !email.trim()) {
      setError("Please enter your email.");
      return;
    }

    handleUser({
      name: name.trim(),
      email: email.trim(),
      photo: photo || DEFAULT_AVATAR,
      authMethod: method === "google" ? "Google" : "Email",
    });
  };

  const handleGoogleLogin = () => {
    handleUser({
      name: "Google User",
      email: "google.user@example.com",
      photo: DEFAULT_AVATAR,
      authMethod: "Google",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-8">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-2 text-center">Welcome</h1>
        <p className="text-sm text-slate-500 mb-6 text-center">
          Create personalized cards with your name and photo.
        </p>

        <div className="grid grid-cols-3 gap-2 mb-5">
          {[
            { key: "email", label: "Email" },
            { key: "google", label: "Google" },
            { key: "guest", label: "Guest" },
          ].map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => setMethod(option.key)}
              className={`rounded-full px-3 py-2 text-sm font-medium border transition ${
                method === option.key
                  ? "bg-green-500 text-white border-green-500"
                  : "bg-white text-slate-700 border-slate-200"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {method === "google" && (
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-gradient-to-r from-slate-900 to-slate-700 text-white py-3 rounded-2xl mb-5"
          >
            Continue with Google
          </button>
        )}

        {(method === "email" || method === "guest") && (
          <>
            {method === "email" && (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 mb-4 focus:border-green-400 focus:outline-none"
              />
            )}

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
              className="w-full border border-slate-200 rounded-2xl px-4 py-3 mb-4 focus:border-green-400 focus:outline-none"
            />

            <label className="block text-sm mb-2 text-slate-600">
              Profile photo (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full text-slate-700 mb-5"
            />
          </>
        )}

        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white rounded-2xl py-3 text-sm font-semibold hover:bg-green-700 transition"
        >
          {method === "guest" ? "Continue as Guest" : "Continue"}
        </button>
      </div>
    </div>
  );
}

export default Login;
