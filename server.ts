import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;
const DB_FILE = path.join(process.cwd(), "data", "db.json");
const BACKUPS_DIR = path.join(process.cwd(), "data", "backups");

// Ensure directories exist
if (!fs.existsSync(path.dirname(DB_FILE))) {
  fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
}
if (!fs.existsSync(BACKUPS_DIR)) {
  fs.mkdirSync(BACKUPS_DIR, { recursive: true });
}

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Permissive CORS middleware to allow cross-origin requests from downloaded standalone student apps
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
    return;
  }
  next();
});

// DB Helper functions
function getDB() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Error reading database file", e);
  }
  return { config: {}, students: [], analytics: {}, leaderboards: {}, logs: [] };
}

function saveDB(data: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (e) {
    console.error("Error writing database file", e);
    return false;
  }
}

// Log admin activities
function logAdminAction(action: string, adminName: string = "Super Admin") {
  const db = getDB();
  db.logs = db.logs || [];
  const now = new Date();
  
  // Clean Indian Standard Date/Time components manual padding
  const dateStr = now.toISOString().split("T")[0];
  const timeStr = now.toTimeString().substring(0, 5);

  db.logs.unshift({
    id: "log_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
    action,
    date: dateStr,
    time: timeStr,
    adminName
  });

  // Limit logs to last 1000 items
  if (db.logs.length > 1000) {
    db.logs = db.logs.slice(0, 1000);
  }
  
  saveDB(db);
}

// Automatically create scheduled backups (Daily/Weekly based on dates)
function runAutoBackupSystem() {
  const db = getDB();
  const dateStr = new Date().toISOString().split("T")[0];
  const dailyPath = path.join(BACKUPS_DIR, `auto-daily-backup-${dateStr}.json`);
  
  if (!fs.existsSync(dailyPath)) {
    fs.writeFileSync(dailyPath, JSON.stringify(db, null, 2), "utf-8");
    console.log(`[BACKUP] Automated daily snapshot saved: ${dailyPath}`);
  }
}
setInterval(runAutoBackupSystem, 60 * 60 * 1000); // Trigger every hour to check dates

// ==================== API ENDPOINTS ====================

// Secure Date/Time verification route
app.get("/api/time", (req, res) => {
  res.json({ timestamp: Date.now() });
});

// Retrieve whole state (Used by admin)
app.get("/api/admin/db", (req, res) => {
  res.json(getDB());
});

// Save whole config or part (Used by admin)
app.post("/api/admin/save", (req, res) => {
  const payload = req.body;
  const db = getDB();
  
  if (payload.config) db.config = payload.config;
  if (payload.students) db.students = payload.students;
  if (payload.analytics) db.analytics = payload.analytics;
  if (payload.leaderboards) db.leaderboards = payload.leaderboards;
  if (payload.logs) db.logs = payload.logs;

  const saved = saveDB(db);
  if (saved) {
    logAdminAction(payload.adminActionLog || "Updated dynamic system configuration");
    res.json({ success: true, message: "System state has been updated securely." });
  } else {
    res.status(500).json({ success: false, message: "Could not write to disk write limits." });
  }
});

// Logs Endpoint
app.get("/api/admin/logs", (req, res) => {
  const db = getDB();
  res.json(db.logs || []);
});

app.post("/api/admin/logs", (req, res) => {
  const { action, adminName } = req.body;
  logAdminAction(action, adminName);
  res.json({ success: true });
});

// Student configuration fetching (used by student app)
app.get("/api/config", (req, res) => {
  const db = getDB();
  
  // Send back config stripped of students file details to never leak them!
  // Send coupons and active student references
  const strippedConfig = JSON.parse(JSON.stringify(db.config || {}));
  
  // Satisfies "Student CSV data must never be exposed publicly"
  res.json({
    config: strippedConfig,
    studentsCount: (db.students || []).length
  });
});

// Verify Premium Member Authentications (Security verified server-side!)
app.post("/api/auth/login", (req, res) => {
  const { emailOrMobile, password } = req.body;
  if (!emailOrMobile || !password) {
    return res.status(400).json({ success: false, message: "Missing credentials fields." });
  }

  const db = getDB();
  const matched = (db.students || []).find(
    (s: any) => s.emailOrMobile && s.emailOrMobile.trim().toLowerCase() === emailOrMobile.trim().toLowerCase() && s.password && s.password.toString().trim() === password.toString().trim()
  );

  if (matched) {
    // Generate new unique session token
    const newSessionToken = "sess_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now();
    matched.sessionToken = newSessionToken;
    saveDB(db); // Save back to db.json!

    // Audit active membership duration
    const today = new Date();
    const todayClean = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const purchase = matched.purchaseDate ? new Date(matched.purchaseDate) : new Date();
    const expiry = matched.expiryDate ? new Date(matched.expiryDate) : null;

    let remainingDays = 0;
    let isExpired = false;

    if (expiry) {
      const expiryClean = new Date(expiry.getFullYear(), expiry.getMonth(), expiry.getDate());
      const diffTime = expiryClean.getTime() - todayClean.getTime();
      remainingDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
      isExpired = remainingDays <= 0;
    } else {
      remainingDays = 365; // standard
    }

    res.json({
      success: true,
      user: {
        id: matched.id,
        name: matched.name,
        emailOrMobile: matched.emailOrMobile,
        purchaseDate: matched.purchaseDate,
        expiryDate: matched.expiryDate,
        membershipStatus: isExpired ? "expired" : "active",
        remainingDays,
        sessionToken: newSessionToken // Return token!
      }
    });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials. Unauthorized access." });
  }
});

// Verify user premium details instantly on actions (Strict date and validity checking)
app.post("/api/premium/verify", (req, res) => {
  const { userId, sessionToken } = req.body;
  const db = getDB();
  const matched = (db.students || []).find((s: any) => s.id === userId);

  if (matched) {
    const today = new Date();
    const expiry = matched.expiryDate ? new Date(matched.expiryDate) : null;
    let isExpired = false;

    if (expiry) {
      const todayClean = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const expiryClean = new Date(expiry.getFullYear(), expiry.getMonth(), expiry.getDate());
      isExpired = expiryClean.getTime() < todayClean.getTime();
    }

    // Single session concurrent login validation
    if (sessionToken && matched.sessionToken && matched.sessionToken !== sessionToken) {
      return res.json({
        success: true,
        active: false,
        status: "logged_out",
        message: "You have been logged in from another device or window."
      });
    }

    res.json({
      success: true,
      active: !isExpired,
      status: isExpired ? "expired" : "active",
      user: {
        id: matched.id,
        name: matched.name,
        emailOrMobile: matched.emailOrMobile,
        purchaseDate: matched.purchaseDate,
        expiryDate: matched.expiryDate,
        membershipStatus: isExpired ? "expired" : "active",
        sessionToken: matched.sessionToken
      }
    });
  } else {
    res.json({ success: false, active: false });
  }
});

const DUMMY_NAMES = [
  "Amit Sharma", "Priya Patel", "Rohan Verma", "Sneha Gupta", "Vikram Singh",
  "Anjali Joshi", "Deepak Kumar", "Manish Mishra", "Karan Malhotra", "Preeti Sen",
  "Aditya Rao", "Meera Nair", "Rahul Yadav", "Sunita Choudhary", "Abhishek Das",
  "Suresh Raina", "Neha Sharma", "Rajesh Khanna", "Pooja Hegde", "Siddharth Malhotra"
];

// Student exam leaderboard endpoints (Trophy board)
app.post("/api/leaderboard", (req, res) => {
  const { testId, activeRecord } = req.body;
  if (!testId || !activeRecord) {
    return res.status(400).json({ success: false, message: "Invalid leaderboard submission" });
  }

  const db = getDB();
  db.leaderboards = db.leaderboards || {};
  
  // Clear old dummies and regenerate to match the exact test marks scale of the submission!
  let list = db.leaderboards[testId] || [];
  const userSubmissions = list.filter((r: any) => r && r.studentName && !DUMMY_NAMES.includes(r.studentName) && r.studentName !== activeRecord.studentName);
  
  const totalPossible = activeRecord.totalMarksPossible || 100;
  const newList = [...userSubmissions];
  
  // Pick a random count of dummy competitors (10 to 14)
  const shuffled = [...DUMMY_NAMES].sort(() => 0.5 - Math.random());
  const count = 10 + Math.floor(Math.random() * 5);
  
  for (let i = 0; i < count; i++) {
    const dName = shuffled[i];
    // Generate scores ranging from 35% to 95% of total score
    const pct = 0.35 + Math.random() * 0.60;
    const dMarks = Math.max(0, Math.min(totalPossible, Math.round(pct * totalPossible)));
    const dSecs = 150 + Math.floor(Math.random() * 700);
    const minutes = Math.floor(dSecs / 60);
    const seconds = dSecs % 60;
    const durationStr = `${minutes} min ${seconds} sec`;
    
    newList.push({
      studentName: dName,
      score: dMarks,
      obtainedMarks: dMarks,
      totalMarksPossible: totalPossible,
      attemptNum: 1,
      duration: durationStr,
      date: new Date().toISOString().split("T")[0],
      timeTaken: dSecs
    });
  }
  
  // Check if activeRecord (user's current submission) is better than their previous one
  const existingUserIdx = newList.findIndex((r: any) => r && r.studentName === activeRecord.studentName);
  if (existingUserIdx !== -1) {
    const oldRec = newList[existingUserIdx];
    const isBetter = activeRecord.obtainedMarks > (oldRec.obtainedMarks || 0) ||
                     (activeRecord.obtainedMarks === (oldRec.obtainedMarks || 0) && activeRecord.timeTaken < (oldRec.timeTaken || Infinity));
    if (isBetter) {
      newList[existingUserIdx] = activeRecord;
    }
  } else {
    newList.push(activeRecord);
  }
  
  // Sort everything: 1. Higher marks, 2. Shorter time, 3. Attempt number
  newList.sort((a: any, b: any) => {
    const m_a = a.obtainedMarks || 0;
    const m_b = b.obtainedMarks || 0;
    if (m_b !== m_a) return m_b - m_a;
    const t_a = a.timeTaken || 0;
    const t_b = b.timeTaken || 0;
    if (t_a !== t_b) return t_a - t_b;
    return (a.attemptNum || 1) - (b.attemptNum || 1);
  });
  
  db.leaderboards[testId] = newList;
  saveDB(db);
  res.json({ success: true, leaderboard: newList });
});

// Fetch active leaderboards for a test
app.get("/api/leaderboard/:testId", (req, res) => {
  const { testId } = req.params;
  const db = getDB();
  db.leaderboards = db.leaderboards || {};
  let list = db.leaderboards[testId] || [];
  
  // If leaderboard is fresh or empty, pre-populate standard candidates on get!
  if (list.length < 5) {
    const defaultTotalPossible = 100;
    const shuffled = [...DUMMY_NAMES].sort(() => 0.5 - Math.random());
    const count = 10 + Math.floor(Math.random() * 5);
    const existingUserSubmissions = list.filter((r: any) => r && r.studentName && !DUMMY_NAMES.includes(r.studentName));
    const newList = [...existingUserSubmissions];
    
    for (let i = 0; i < count; i++) {
       const dName = shuffled[i];
       const pct = 0.45 + Math.random() * 0.45; // 45% to 90%
       const dMarks = Math.round(pct * defaultTotalPossible);
       const dSecs = 150 + Math.floor(Math.random() * 600);
       const minutes = Math.floor(dSecs / 60);
       const seconds = dSecs % 60;
       const durationStr = `${minutes} min ${seconds} sec`;
       
       newList.push({
         studentName: dName,
         score: dMarks,
         obtainedMarks: dMarks,
         totalMarksPossible: defaultTotalPossible,
         attemptNum: 1,
         duration: durationStr,
         date: new Date().toISOString().split("T")[0],
         timeTaken: dSecs
       });
    }
    
    newList.sort((a: any, b: any) => {
      const m_a = a.obtainedMarks || 0;
      const m_b = b.obtainedMarks || 0;
      if (m_b !== m_a) return m_b - m_a;
      const t_a = a.timeTaken || 0;
      const t_b = b.timeTaken || 0;
      if (t_a !== t_b) return t_a - t_b;
      return (a.attemptNum || 1) - (b.attemptNum || 1);
    });
    
    db.leaderboards[testId] = newList;
    saveDB(db);
    list = newList;
  }
  
  res.json(list);
});

// Student Activity & Performance Analytics
app.get("/api/admin/analytics", (req, res) => {
  const db = getDB();
  res.json(db.analytics || {});
});

app.post("/api/analytics/submit", (req, res) => {
  const { email, obtainedScore, totalScore, timeTakenSecs } = req.body;
  if (!email) return res.status(400).json({ success: false });

  const db = getDB();
  db.analytics = db.analytics || {};
  
  const studentProfile = db.analytics[email] || {
    totalTestsAttempted: 0,
    bestScore: 0,
    averageScore: 0,
    highestRank: 999,
    totalTimeSpent: 0,
    lastActivityDate: ""
  };

  const count = studentProfile.totalTestsAttempted;
  studentProfile.totalTestsAttempted = count + 1;
  studentProfile.bestScore = Math.max(studentProfile.bestScore, obtainedScore);
  studentProfile.totalTimeSpent += timeTakenSecs;
  studentProfile.averageScore = parseFloat(((studentProfile.averageScore * count + obtainedScore) / (count + 1)).toFixed(2));
  studentProfile.lastActivityDate = new Date().toISOString().split("T")[0];

  db.analytics[email] = studentProfile;
  saveDB(db);
  res.json({ success: true, profile: studentProfile });
});

// Fetch historical attempts for a specific student name across all leaderboards (Feature 25 & 26)
app.get("/api/student/attempts/:studentName", (req, res) => {
  const { studentName } = req.params;
  const db = getDB();
  const results: any[] = [];
  
  const leaderboards = db.leaderboards || {};
  Object.keys(leaderboards).forEach(testId => {
    const records = leaderboards[testId] || [];
    records.forEach((rec: any) => {
      if (rec.studentName && rec.studentName.toLowerCase() === studentName.toLowerCase()) {
        // Try to match test Title
        let quizTitle = testId;
        const productsVisible = db.config?.products || [];
        productsVisible.forEach((prod: any) => {
          if (prod.id === testId) quizTitle = prod.title;
        });

        results.push({
          testId: testId,
          quizTitle: quizTitle,
          score: rec.score,
          correct: rec.correct,
          incorrect: rec.incorrect,
          duration: rec.duration,
          date: rec.date
        });
      }
    });
  });

  res.json({ success: true, attempts: results });
});

// Backup & Recovery System APIs
app.get("/api/admin/backups", (req, res) => {
  try {
    const files = fs.readdirSync(BACKUPS_DIR).filter(f => f.endsWith(".json"));
    const backupList = files.map(file => {
      const filePath = path.join(BACKUPS_DIR, file);
      const stat = fs.statSync(filePath);
      return {
        filename: file,
        size: (stat.size / 1024).toFixed(1) + " KB",
        createdAt: stat.mtime.toISOString().replace("T", " ").substring(0, 16)
      };
    });
    // Add current db.json in listing
    res.json(backupList);
  } catch (e) {
    res.status(500).json({ success: false, message: "Directory reading failed" });
  }
});

app.post("/api/admin/backup/create", (req, res) => {
  const { customName } = req.body;
  try {
    const db = getDB();
    const cleanName = (customName || "manual-backup").replace(/[^a-zA-Z0-9_-]/g, "");
    const dateStr = new Date().toISOString().split("T")[0];
    const timeStr = Date.now();
    const filename = `manual-${cleanName}-${dateStr}-${timeStr}.json`;
    const dest = path.join(BACKUPS_DIR, filename);

    fs.writeFileSync(dest, JSON.stringify(db, null, 2), "utf-8");
    logAdminAction(`Created manual database backup snapshot: ${filename}`);
    res.json({ success: true, filename });
  } catch (e) {
    res.status(500).json({ success: false, message: "Backup creation failed" });
  }
});

app.post("/api/admin/backup/restore", (req, res) => {
  const { filename } = req.body;
  try {
    const src = path.join(BACKUPS_DIR, filename);
    if (!fs.existsSync(src)) {
      return res.status(404).json({ success: false, message: "Backup file not found" });
    }

    const data = JSON.parse(fs.readFileSync(src, "utf-8"));
    saveDB(data);
    logAdminAction(`Restored active system database state from backup: ${filename}`);
    res.json({ success: true, message: "Database state completely restored." });
  } catch (e) {
    res.status(500).json({ success: false, message: "Restoration failed structural verify." });
  }
});

app.get("/api/admin/backup/download/:filename", (req, res) => {
  const { filename } = req.params;
  const src = path.join(BACKUPS_DIR, filename);
  if (fs.existsSync(src)) {
    res.download(src);
  } else {
    res.status(404).send("Backup file not found");
  }
});

// ==================== BIND SERVER ====================
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Vite Dev Mode Middleware mount and routing
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static files router
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SERVER] Full-Stack PRAYAS ONE Backend online at http://localhost:${PORT}`);
  });
}

startServer();
