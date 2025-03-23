import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthModal({ isOpen, setIsOpen }) {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setError("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const url = isSignup ? "http://localhost:5000/api/auth/signup" : "http://localhost:5000/api/auth/login";
    const payload = isSignup ? formData : { email: formData.email, password: formData.password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      localStorage.setItem("token", data.token); 
      setIsOpen(false); 

      navigate("/dashboard"); 
    } catch (err) {
      setError(err.message); 
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 auth-modal">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        
        <div className="flex justify-center items-center mb-4">
          <div className="w-10 h-10 flex items-center justify-center border-2 border-black rounded-full">
            <span className="text-black text-lg font-semibold">◎</span>
          </div>
        </div>
        <h2 className="text-center text-2xl font-semibold mb-2">
          {isSignup ? "Sign up" : "Log in"} Origin UI
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          We just need a few details to get you started.
        </p>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignup && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Full name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Matt Welsh"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="hi@yourcompany.com"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full py-2 rounded-lg text-lg hover:bg-gray-900"
          >
            {isSignup ? "Sign up" : "Log in"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-4">
          {isSignup ? "Already have an account?" : "New here?"}
          <button onClick={toggleMode} className="text-black font-medium ml-1">
            {isSignup ? "Log in" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthModal;
