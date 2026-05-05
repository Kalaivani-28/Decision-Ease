import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function App() {
  const [page, setPage] = useState("landing");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState(3);
  const [mood, setMood] = useState("neutral");

  const [theme, setTheme] = useState("light");
  const [result, setResult] = useState(null);

  const isDark = theme === "dark";

  // LOGIN
  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) setPage("home");
    else alert("Enter username and password");
  };

  // ADD TASK
  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, { name: task, priority: Number(priority) }]);
    setTask("");
  };

  // DECISION ENGINE
  const decide = () => {
    if (!tasks.length) return;

    const moodFactor =
      mood === "happy" ? 1.2 : mood === "stressed" ? 0.8 : 1;

    const scored = tasks
      .map((t) => ({
        ...t,
        score: t.priority * moodFactor * Math.random(),
      }))
      .sort((a, b) => b.score - a.score);

    setResult(scored[0]);
  };

  const chartData = tasks.map((t) => ({
    name: t.name,
    priority: t.priority,
  }));

  // 🌸 LANDING PAGE (UNCHANGED STYLE)
  if (page === "landing") {
    return (
      <div style={styles.landing}>
        <h1 style={styles.title}>Decision Ease</h1>

        <p style={styles.quote}>
          “Transforming confusion into clarity,<br />
          one decision at a time.”
        </p>

        <button onClick={() => setPage("login")} style={styles.startBtn}>
          Start Journey
        </button>
      </div>
    );
  }

  // 🎀 LOGIN PAGE (UNCHANGED STYLE)
 if (page === "login") {
  return (
    <div style={styles.ultraLoginWrapper}>
      {/* floating shapes */}
      <div style={styles.shape1}></div>
      <div style={styles.shape2}></div>
      <div style={styles.shape3}></div>

      <div style={styles.ultraCard}>
        <h1 style={styles.logo}>Decision Ease</h1>
        <p style={styles.subText}>
          Welcome back — make smarter decisions
        </p>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.ultraInput}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.ultraInput}
        />

        <button onClick={handleLogin} style={styles.ultraButton}>
          Sign In
        </button>

        <p style={styles.forgotText}>Forgot password?</p>
      </div>
    </div>
  );
}

  // ⚙ SETTINGS PAGE
 if (page === "settings") {
  return (
    <div style={styles.settingsPage}>
      
      {/* HEADER */}
      <h2 style={styles.settingsTitle}>Settings</h2>

      {/* PROFILE SECTION */}
      <div style={styles.settingsCard}>
        <div style={styles.profileRow}>
          <div style={styles.avatar}>👤</div>
          <div>
            <h3 style={{ margin: 0 }}>{username || "User"}</h3>
            <p style={styles.smallText}>Manage your account</p>
          </div>
        </div>
      </div>

      {/* APP SETTINGS */}
      <div style={styles.settingsCard}>
        <h4>App Preferences</h4>

        <button style={styles.settingsItem} onClick={() => setTheme("light")}>
          🌞 Light Mode
        </button>

        <button style={styles.settingsItem} onClick={() => setTheme("dark")}>
          🌙 Dark Mode
        </button>

        <button style={styles.settingsItem}>
          🔔 Notifications
        </button>

        <button style={styles.settingsItem}>
          🌐 Language
        </button>
      </div>

      {/* PRIVACY */}
      <div style={styles.settingsCard}>
        <h4>Privacy & Security</h4>

        <button style={styles.settingsItem}>
          🔒 Change Password
        </button>

        <button style={styles.settingsItem}>
          👁️ Privacy Settings
        </button>
      </div>

      {/* LOGOUT */}
      <button onClick={() => setPage("login")} style={styles.logoutBtn}>
        Log Out
      </button>

      {/* BACK */}
      <button onClick={() => setPage("home")} style={styles.backBtn}>
        Back
      </button>
    </div>
  );
}

  // 🏠 PREMIUM HOME DASHBOARD (UPGRADED)
  return (
    <div style={{ ...styles.premiumApp, background: isDark ? "#0b1220" : "#f5f3ff" }}>
      
      {/* TOP BAR */}
     <div style={styles.premiumTopBar}>

  {/* EMPTY LEFT (for balance) */}
  <div style={{ width: 60 }} />

  {/* CENTER BRAND */}
  <h2 style={styles.brandCenter}>DecisionEase</h2>

  {/* RIGHT ICONS */}
  <div style={styles.topActions}>
    <button onClick={() => setPage("settings")} style={styles.iconBtn}>
      ⚙
    </button>

    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      style={styles.iconBtn}
    >
      {isDark ? "🌞" : "🌙"}
    </button>
  </div>
</div>

      {/* TASK CARD */}
      <div style={styles.centerWrap}>
        <div style={styles.premiumCard}>
          <h3>Create Smart Task</h3>

          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter task..."
            style={styles.premiumInput}
          />

          <div style={styles.row}>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              style={styles.premiumInput}
            >
              <option value={1}>Low</option>
              <option value={2}>Medium</option>
              <option value={3}>High</option>
              <option value={4}>Very High</option>
            </select>

            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              style={styles.premiumInput}
            >
              <option>happy</option>
              <option>neutral</option>
              <option>stressed</option>
            </select>
          </div>

          <button onClick={addTask} style={styles.addBtn}>
            + Add Task
          </button>
        </div>
      </div>

      {/* CHART */}
      {tasks.length > 0 && (
        <div style={styles.chartCard}>
          <h3>Priority Insights</h3>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="priority" fill="#a855f7" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* DECISION */}
      <div style={styles.bottomWrap}>
        <button onClick={decide} style={styles.mainBtn}>
          Make Smart Decision
        </button>

        {result && (
          <div style={styles.resultBox}>
            ✔ Best Choice: <b>{result.name}</b>
          </div>
        )}
      </div>
    </div>
  );
}

/* 🎨 STYLES */
const styles = {
  /* LANDING */
  landing: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#7c3aed,#4c1d95,#a855f7)",
    color: "white",
    textAlign: "center",
  },

  title: { fontSize: 40, fontWeight: "bold" },

  quote: { marginTop: 10, color: "#e9d5ff" },

  startBtn: {
    marginTop: 20,
    padding: "12px 25px",
    background: "white",
    color: "#7c3aed",
    border: "none",
    borderRadius: 30,
    fontWeight: "bold",
    cursor: "pointer",
  },

  /* LOGIN */
 ultraLoginWrapper: {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  overflow: "hidden",
  background:
    "linear-gradient(-45deg,#7c3aed,#ec4899,#3b82f6,#a855f7)",
  backgroundSize: "400% 400%",
  animation: "gradientMove 8s ease infinite",
},

ultraCard: {
  width: 360,
  padding: 35,
  borderRadius: 20,
  textAlign: "center",
  background: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
  zIndex: 2,
},

logo: {
  margin: 0,
  fontSize: 28,
  fontWeight: "bold",
  color: "white",
},

subText: {
  fontSize: 13,
  color: "#f3e8ff",
  marginBottom: 20,
},

ultraInput: {
  width: "100%",
  padding: 12,
  marginBottom: 12,
  borderRadius: 12,
  border: "none",
  outline: "none",
  fontSize: 14,
},

ultraButton: {
  width: "100%",
  padding: 12,
  borderRadius: 12,
  border: "none",
  background: "linear-gradient(135deg,#ffffff,#e9d5ff)",
  color: "#4c1d95",
  fontWeight: "bold",
  cursor: "pointer",
},

forgotText: {
  marginTop: 12,
  fontSize: 12,
  color: "#e0e7ff",
  cursor: "pointer",
},

// floating shapes
shape1: {
  position: "absolute",
  width: 120,
  height: 120,
  background: "rgba(255,255,255,0.15)",
  borderRadius: "50%",
  top: "10%",
  left: "15%",
  filter: "blur(2px)",
},

shape2: {
  position: "absolute",
  width: 180,
  height: 180,
  background: "rgba(255,255,255,0.1)",
  borderRadius: "50%",
  bottom: "10%",
  right: "10%",
  filter: "blur(2px)",
},

shape3: {
  position: "absolute",
  width: 90,
  height: 90,
  background: "rgba(255,255,255,0.2)",
  borderRadius: "50%",
  top: "60%",
  left: "5%",
  filter: "blur(2px)",
},

  /* SETTINGS */
  settingsPage: {
  padding: 20,
  minHeight: "100vh",
  background: "#f8fafc",
  fontFamily: "Arial",
},

settingsTitle: {
  fontSize: 24,
  fontWeight: "bold",
  marginBottom: 15,
},

settingsCard: {
  background: "white",
  padding: 15,
  borderRadius: 12,
  marginBottom: 12,
  boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
},

profileRow: {
  display: "flex",
  alignItems: "center",
  gap: 10,
},

avatar: {
  width: 45,
  height: 45,
  borderRadius: "50%",
  background: "linear-gradient(135deg,#7c3aed,#ec4899)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontSize: 20,
},

smallText: {
  fontSize: 12,
  color: "gray",
},

settingsItem: {
  width: "100%",
  padding: 12,
  marginTop: 8,
  borderRadius: 10,
  border: "1px solid #eee",
  background: "white",
  textAlign: "left",
  cursor: "pointer",
},

logoutBtn: {
  width: "100%",
  padding: 12,
  marginTop: 10,
  borderRadius: 10,
  border: "none",
  background: "#ef4444",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
},

backBtn: {
  width: "100%",
  padding: 12,
  marginTop: 10,
  borderRadius: 10,
  border: "none",
  background: "#7c3aed",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
},

  /* PREMIUM HOME */
  premiumApp: {
    minHeight: "100vh",
    padding: 20,
    fontFamily: "Arial",
  },

  premiumTopBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  brand: {
    fontSize: 22,
    fontWeight: "bold",
    background: "linear-gradient(135deg,#7c3aed,#ec4899)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  topActions: { display: "flex", gap: 10 },

  iconBtn: {
    padding: 8,
    borderRadius: 10,
    border: "none",
  },

  centerWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
  },

  premiumCard: {
    width: 380,
    padding: 25,
    background: "white",
    borderRadius: 18,
    boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
  },

  premiumInput: {
    width: "100%",
    padding: 12,
    marginBottom: 10,
    borderRadius: 12,
    border: "1px solid #ddd",
  },

  row: { display: "flex", gap: 10 },

  addBtn: {
    width: "100%",
    padding: 12,
    background: "linear-gradient(135deg,#7c3aed,#ec4899)",
    color: "white",
    border: "none",
    borderRadius: 12,
  },
  brandCenter: {
  fontSize: 22,
  fontWeight: "bold",
  textAlign: "center",
  background: "linear-gradient(135deg,#7c3aed,#ec4899)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  flex: 1,
},

  chartCard: {
    marginTop: 20,
    padding: 20,
    background: "white",
    borderRadius: 16,
  },

  bottomWrap: {
    marginTop: 20,
    textAlign: "center",
  },

  mainBtn: {
    padding: "12px 30px",
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(135deg,#7c3aed,#4c1d95)",
    color: "white",
    fontWeight: "bold",
  },

  resultBox: {
    marginTop: 10,
    fontSize: 18,
  },
};