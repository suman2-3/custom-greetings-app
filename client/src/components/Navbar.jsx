import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Navbar() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-600">
          Custom Greetings
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3">
          Your personalized greeting studio.
        </h1>
      </div>

      <div className="flex items-center gap-3 rounded-3xl bg-white p-4 shadow-sm">
        <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-green-500">
          <img
            src={
              user?.photo ??
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
            }
            alt={user?.name || "Profile"}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="min-w-[140px]">
          <p className="font-semibold text-slate-900">
            {user?.name || "Guest"}
          </p>
          <p className="text-sm text-slate-500">
            Signed in via {user?.authMethod || "Email"}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
