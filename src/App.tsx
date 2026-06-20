import React, { useState, useEffect } from "react";
import {
  Rocket,
  Plus,
  Trash2,
  FolderMinus,
  Save,
  Download,
  Smartphone,
  Users,
  Settings,
  FolderOpen,
  FileSpreadsheet,
  CheckCircle,
  QrCode,
  Share2,
  FilePlus,
  AlertCircle,
  Eye,
  BookOpen,
  Folder,
  ChevronRight,
  FileText,
  BadgeAlert,
  Sliders,
  Calendar,
  DollarSign,
  ArrowUp,
  ArrowDown,
  LineChart,
  History,
  Database,
  Megaphone,
  Menu,
  X,
  Ticket
} from "lucide-react";
import { AppConfig, CategoryNode, SubCategoryNode, TopicNode, StudentUser, NotificationItem, SliderItem, TestMeta, PDFMeta } from "./types";
import { parseTestText } from "./utils/parser";
import { generateStudentHTML } from "./utils/studentTemplate";
import JSZip from "jszip";
import { encodeObfuscatedDatabase, decodeObfuscatedDatabase } from "./utils/obfuscation";

const DEFAULT_LOGO_URL = "https://iili.io/CKMOrGI.md.png";

const cleanExpiredCoupons = (cats: CategoryNode[]): CategoryNode[] => {
  const now = Date.now();
  return (cats || []).map(cat => {
    let catCoupon = cat.coupon;
    if (catCoupon && catCoupon.endDate && new Date(catCoupon.endDate).getTime() < now) {
      catCoupon = null;
    }
    let catTest = cat.test;
    if (catTest && catTest.coupon && catTest.coupon.endDate && new Date(catTest.coupon.endDate).getTime() < now) {
      catTest = { ...catTest, coupon: null };
    }

    const subCategories = (cat.subCategories || []).map(sub => {
      let subCoupon = sub.coupon;
      if (subCoupon && subCoupon.endDate && new Date(subCoupon.endDate).getTime() < now) {
        subCoupon = null;
      }
      let subTest = sub.test;
      if (subTest && subTest.coupon && subTest.coupon.endDate && new Date(subTest.coupon.endDate).getTime() < now) {
        subTest = { ...subTest, coupon: null };
      }

      const topics = (sub.topics || []).map(top => {
        let topCoupon = top.coupon;
        if (topCoupon && topCoupon.endDate && new Date(topCoupon.endDate).getTime() < now) {
          topCoupon = null;
        }
        let topTest = top.test;
        if (topTest && topTest.coupon && topTest.coupon.endDate && new Date(topTest.coupon.endDate).getTime() < now) {
          topTest = { ...topTest, coupon: null };
        }
        return { ...top, coupon: topCoupon, test: topTest };
      });

      return { ...sub, coupon: subCoupon, test: subTest, topics };
    });

    return { ...cat, coupon: catCoupon, test: catTest, subCategories };
  });
};

const normalizeConfig = (config: any): AppConfig => {
  if (!config) return INITIAL_STATE;
  
  const testCategories = Array.isArray(config.testCategories) ? config.testCategories : [];
  const pdfCategories = Array.isArray(config.pdfCategories) ? config.pdfCategories : [];

  const normalizeTestMeta = (test: any): TestMeta | null => {
    if (!test) return null;
    return {
      id: test.id || "test_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now(),
      title: test.title || "Untitled Test",
      questionsEn: Array.isArray(test.questionsEn) ? test.questionsEn : [],
      questionsHi: Array.isArray(test.questionsHi) ? test.questionsHi : [],
      questionsOther: test.questionsOther || {},
      duration: typeof test.duration === "number" ? test.duration : (parseInt(test.duration) || 20),
      freeAttempts: typeof test.freeAttempts === "number" ? test.freeAttempts : (parseInt(test.freeAttempts) || 2),
      unlimitedAttempts: !!test.unlimitedAttempts,
      onlyUsers: test.onlyUsers || "",
      coupon: test.coupon || null,
      posMarks: typeof test.posMarks === "number" ? test.posMarks : (parseFloat(test.posMarks) || 2),
      negMarks: typeof test.negMarks === "number" ? test.negMarks : (parseFloat(test.negMarks) || 0),
      instructions: test.instructions || "",
      isPaid: !!test.isPaid,
      scheduledAt: test.scheduledAt || undefined,
    };
  };

  const normalizePDFMeta = (pdf: any): PDFMeta | null => {
    if (!pdf) return null;
    return {
      id: pdf.id || "pdf_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now(),
      title: pdf.title || "Untitled PDF",
      url: pdf.url || "",
      isPaid: !!pdf.isPaid,
      scheduledAt: pdf.scheduledAt || undefined,
    };
  };

  const normalizeTopicNode = (top: any): TopicNode => {
    return {
      id: top.id || "topic_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now(),
      name: top.name || "Untitled Topic",
      test: top.test ? normalizeTestMeta(top.test) : null,
      pdf: top.pdf ? normalizePDFMeta(top.pdf) : null,
      scheduledAt: top.scheduledAt || undefined,
      couponCode: top.couponCode || undefined,
      coupon: top.coupon || null,
    };
  };

  const normalizeSubCategoryNode = (sub: any): SubCategoryNode => {
    return {
      id: sub.id || "sub_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now(),
      name: sub.name || "Untitled Sub-Category",
      image: sub.image || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=200",
      topics: Array.isArray(sub.topics) ? sub.topics.map(normalizeTopicNode) : [],
      test: sub.test ? normalizeTestMeta(sub.test) : null,
      pdf: sub.pdf ? normalizePDFMeta(sub.pdf) : null,
      scheduledAt: sub.scheduledAt || undefined,
      couponCode: sub.couponCode || undefined,
      coupon: sub.coupon || null,
    };
  };

  const normalizeCategoryNode = (cat: any): CategoryNode => {
    return {
      id: cat.id || "cat_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now(),
      name: cat.name || "Untitled Category",
      image: cat.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=200",
      subCategories: Array.isArray(cat.subCategories) ? cat.subCategories.map(normalizeSubCategoryNode) : [],
      test: cat.test ? normalizeTestMeta(cat.test) : null,
      pdf: cat.pdf ? normalizePDFMeta(cat.pdf) : null,
      scheduledAt: cat.scheduledAt || undefined,
      couponCode: cat.couponCode || undefined,
      coupon: cat.coupon || null,
    };
  };

  return {
    ...INITIAL_STATE,
    ...config,
    testCategories: testCategories.map(normalizeCategoryNode),
    pdfCategories: pdfCategories.map(normalizeCategoryNode),
    sliders: Array.isArray(config.sliders) ? config.sliders : (INITIAL_STATE.sliders || []),
    notifications: Array.isArray(config.notifications) ? config.notifications : (INITIAL_STATE.notifications || []),
    students: Array.isArray(config.students) ? config.students : [],
    popups: Array.isArray(config.popups) ? config.popups : (INITIAL_STATE.popups || []),
  };
};

const INITIAL_STATE: AppConfig = {
  appName: "Prayas One Professional Hub",
  logoUrl: DEFAULT_LOGO_URL,
  studentGreeting: "Hi, Aspirant!",
  studentSubGreeting: "PRAYAS ONE PROFESSIONAL HUB",
  sliders: [
    {
      id: "slide1",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1200",
      title: "Elevate your Preparations",
      link: "#"
    },
    {
      id: "slide2",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200",
      title: "Real-time Mock Examinations",
      link: "#"
    }
  ],
  notifications: [
    {
      id: "notif1",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400",
      title: "\ud83d\udd25 Daily Practice Series Live",
      message: "Check out the newly uploaded mock exams to refine your concept formulas today! Unlock with voucher code series.",
      buttonName: "EXPLORE",
      link: "#"
    }
  ],
  testCategories: [
    {
      id: "cat_mech",
      name: "Competitive Sciences",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=200",
      subCategories: [
        {
          id: "sub_phys",
          name: "Physics Physics Unit",
          image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=200",
          test: null,
          pdf: null,
          topics: [
            {
              id: "top_force",
              name: "Centrifugal Force Mechanics",
              test: {
                id: "test_force_mcq",
                title: "Centrifugal Force Standard Test",
                questionsEn: [
                  {
                    q: "What is the standard unit of force in SI units?",
                    o: ["Joule", "Pascal", "Newton", "Watt"],
                    c: 3,
                    s: "F = ma, which is calculated in Newtons in international systems."
                  },
                  {
                    q: "Centrifugal force is mathematically described as...",
                    o: ["mv^2/r", "mvr", "1/2 mv^2", "mgh"],
                    c: 1,
                    s: "Expression for centrifugal force is Fc = mv^2 / r."
                  }
                ],
                questionsHi: [],
                duration: 20,
                freeAttempts: 2,
                unlimitedAttempts: false,
                onlyUsers: "",
                coupon: {
                  code: "VIPCOUPON",
                  startDate: "2026-06-01",
                  endDate: "2026-12-31",
                  maxAttempts: "unlimited"
                },
                posMarks: 2,
                negMarks: 0.5,
                instructions: "Attempt all questions. Watch negative points."
              },
              pdf: null
            }
          ]
        }
      ],
      test: null,
      pdf: null
    }
  ],
  pdfCategories: [
    {
      id: "cat_pdf_1",
      name: "Daily General Knowledge Catalogs",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=200",
      subCategories: [
        {
          id: "sub_pdf_sub1",
          name: "Current Affairs 2026",
          image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=200",
          test: null,
          pdf: null,
          topics: [
            {
              id: "top_pdf_doc1",
              name: "Economic Policy Highlights (PDF)",
              test: null,
              pdf: {
                id: "pdf_doc_eco",
                title: "Economic Policy Highlights",
                url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
              }
            }
          ]
        }
      ],
      test: null,
      pdf: null
    }
  ],
  students: [
    {
      id: "stu1",
      name: "Saurabh Mishra",
      emailOrMobile: "good4xo@gmail.com",
      password: "admin"
    }
  ],
  social: {
    whatsapp: "https://wa.me/910000000000",
    telegram: "https://t.me/prayasone",
    paymentQr: "https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=UPI_PAYMENT_PAY@okaxis",
    paymentAmount: "₹499",
    premiumPrice: "₹45",
    premiumDurationText: "3 Months",
    premiumValidityText: "VALID FOR 90 DAYS",
    premiumBenefitsText: "Access to Past Tests, Access to Present Tests, Access to Future Tests, Unlimited Test Attempts",
    hideSourceOnStudent: false,
    qrDownloadText: "Download QR Code",
    qrDownloadLink: ""
  },
  popups: []
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("general");
  const [appConfig, setAppConfig] = useState<AppConfig>(INITIAL_STATE);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
  // Interactive trees expanded state maps
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({});
  const [expandedSubs, setExpandedSubs] = useState<Record<string, boolean>>({});

  // Node editing state overlays
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [editingNodeType, setEditingNodeType] = useState<"category" | "subcategory" | "topic" | null>(null);
  const [editNodeCategoryContext, setEditNodeCategoryContext] = useState<"test" | "pdf">("test");
  const [qEditLang, setQEditLang] = useState<string>("en");
  const [customLangText, setCustomLangText] = useState<string>("");
  const [showAddLangInput, setShowAddLangInput] = useState<boolean>(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [uploadAppendMode, setUploadAppendMode] = useState<boolean>(true);

  // Auto-scroll on mobile when node is selected
  useEffect(() => {
    if (editingNodeId) {
      setTimeout(() => {
        const panel = document.getElementById("node-settings-panel");
        if (panel) {
          panel.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 120);
    }
  }, [editingNodeId]);

  // Analytics, Logs, and Backups states (Features 26, 27, 28)
  const [studentAnalytics, setStudentAnalytics] = useState<Record<string, any>>({});
  const [activityLogs, setActivityLogs] = useState<any[]>([]);
  const [backupsList, setBackupsList] = useState<any[]>([]);
  const [backupNameInput, setBackupNameInput] = useState<string>("");
  const [restoringBackup, setRestoringBackup] = useState<string | null>(null);
  const [isBackupLoading, setIsBackupLoading] = useState<boolean>(false);

  // Synchronize dynamic dynamic data on tab activation
  useEffect(() => {
    if (activeTab === "analytics") {
      fetch("/api/admin/analytics")
        .then((res) => res.json())
        .then((data) => setStudentAnalytics(data))
        .catch((err) => console.error("Error reading admin student analytics", err));
    } else if (activeTab === "logs") {
      fetch("/api/admin/logs")
        .then((res) => res.json())
        .then((data) => setActivityLogs(data))
        .catch((err) => console.error("Error reading action logs", err));
    } else if (activeTab === "backups") {
      fetch("/api/admin/backups")
        .then((res) => res.json())
        .then((data) => setBackupsList(data))
        .catch((err) => console.error("Error listing backups", err));
    }
  }, [activeTab]);

  const handleCreateBackup = () => {
    if (!backupNameInput.trim()) {
      alert("Provide a valid snapshot label name.");
      return;
    }
    setIsBackupLoading(true);
    fetch("/api/admin/backup/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customName: backupNameInput.trim() })
    })
    .then((res) => res.json())
    .then((data) => {
      setIsBackupLoading(false);
      setBackupNameInput("");
      if (data.success) {
        alert("Success! Created backup snapshot: " + data.filename);
        // Refresh backups list
        fetch("/api/admin/backups")
          .then((res) => res.json())
          .then((list) => setBackupsList(list));
      } else {
        alert("Backup registration failed.");
      }
    })
    .catch((err) => {
      setIsBackupLoading(false);
      console.error(err);
      alert("Error occurred generating backup.");
    });
  };

  const handleRestoreBackup = (filename: string) => {
    if (!confirm(`WARNING: Are you absolutely confident about RESTORING database from ${filename}?\nThis will revert all questions, student registers, sliders, and active payments configurations across the system.`)) {
      return;
    }
    setRestoringBackup(filename);
    fetch("/api/admin/backup/restore", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename })
    })
    .then((res) => res.json())
    .then((data) => {
      setRestoringBackup(null);
      if (data.success) {
        alert("APPROVED: System database state restored successfully. Page will reload.");
        window.location.reload();
      } else {
        alert("Restoration failed structure verification.");
      }
    })
    .catch((err) => {
      setRestoringBackup(null);
      console.error(err);
      alert("Restore operation failed.");
    });
  };

  // Load from full-stack master server DB with local storage fallback on mount
  useEffect(() => {
    fetch("/api/admin/db")
      .then((res) => {
        if (!res.ok) throw new Error("Server responded with error status");
        return res.json();
      })
      .then((data) => {
        if (data && data.config && Object.keys(data.config).length > 0) {
          const loadedConfig: AppConfig = {
            ...INITIAL_STATE,
            ...data.config,
            students: data.students || INITIAL_STATE.students || []
          };
          const normalized = normalizeConfig(loadedConfig);
          const cleaned = {
            ...normalized,
            testCategories: cleanExpiredCoupons(normalized.testCategories || []),
            pdfCategories: cleanExpiredCoupons(normalized.pdfCategories || [])
          };
          setAppConfig(cleaned);
          localStorage.setItem("prayas_one_coach_state", JSON.stringify(cleaned));
          console.log("[SYNC] Application synchronized successfully with Cloud database.");
        } else {
          loadFromLocalStorage();
        }
      })
      .catch((err) => {
        console.warn("Server DB sync failed on mount, checking fallback cached local storage:", err);
        loadFromLocalStorage();
      });

    function loadFromLocalStorage() {
      const saved = localStorage.getItem("prayas_one_coach_state");
      if (saved) {
        try {
          const loaded = JSON.parse(saved);
          if (loaded) {
            const normalized = normalizeConfig(loaded);
            const cleaned = {
              ...normalized,
              testCategories: cleanExpiredCoupons(normalized.testCategories || []),
              pdfCategories: cleanExpiredCoupons(normalized.pdfCategories || [])
            };
            setAppConfig(cleaned);
            localStorage.setItem("prayas_one_coach_state", JSON.stringify(cleaned));
          }
        } catch (err) {
          console.error("Failed loading cached state", err);
        }
      }
    }
  }, []);

  // Sync state to local storage and securely write to full-stack server-side database
  const saveState = (updated: AppConfig, actionLog?: string) => {
    setAppConfig(updated);
    localStorage.setItem("prayas_one_coach_state", JSON.stringify(updated));

    fetch("/api/admin/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        config: updated,
        students: updated.students || [],
        adminActionLog: actionLog || `Modified dynamic system configuration: ${updated.appName}`
      })
    })
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) {
        console.error("Database cloud write returned success: false", data.message);
      } else {
        console.log("[SYNC] Cloud database persistent sync completed successfully.");
      }
    })
    .catch((err) => {
      console.error("Network failure occurred during backend save state propagation:", err);
    });
  };

  const handleResetDefaults = () => {
    if (confirm("Reset configuration settings back to pristine Prayas One defaults?")) {
      saveState(INITIAL_STATE);
    }
  };

  const handleImportSplitZIP = async (file: File) => {
    try {
      const zip = await JSZip.loadAsync(file);
      const partFiles: { name: string; index: number; file: any }[] = [];
      const examQuestionsMap: Record<string, any> = {};

      for (const relativePath of Object.keys(zip.files)) {
        const fileEntry = zip.files[relativePath];
        const match = relativePath.match(/config_part_(\d+)\.txt$/);
        if (match) {
          partFiles.push({
            name: relativePath,
            index: parseInt(match[1], 10),
            file: fileEntry
          });
        }

        const qMatch = relativePath.match(/test_questions_([a-zA-Z0-9_-]+)\.txt$/);
        if (qMatch) {
          const testId = qMatch[1];
          try {
            const rawText = await fileEntry.async("text");
            const decodedQObj = JSON.parse(decodeObfuscatedDatabase(rawText.trim()));
            examQuestionsMap[testId] = decodedQObj;
          } catch (e) {
            console.warn(`Failed parsing split questions for: ${relativePath}`, e);
          }
        }
      }

      if (partFiles.length === 0) {
        alert("⚠️ No database chunk txt files (config_part_*.txt) found inside this ZIP archive. Make sure it is the Split ZIP exported package.");
        return;
      }

      // Sort by the part number index ascendingly
      partFiles.sort((a, b) => a.index - b.index);

      // Extract all file texts in order
      const chunks: string[] = [];
      for (const part of partFiles) {
        const text = await part.file.async("text");
        chunks.push(text.trim());
      }

      const mergedBase64 = chunks.join("");
      const decodedJSON = decodeObfuscatedDatabase(mergedBase64);
      const parsedConfig = JSON.parse(decodedJSON);

      if (parsedConfig && (parsedConfig.appName || parsedConfig.students || parsedConfig.testCategories)) {
        // Re-inject split questions back into the matching test structures
        const reInjectQuestions = (node: any) => {
          if (!node) return;
          if (node.test) {
            const test = node.test;
            const testId = test.id;
            if (testId && examQuestionsMap[testId]) {
              const qObj = examQuestionsMap[testId];
              test.questionsEn = qObj.questionsEn || [];
              test.questionsHi = qObj.questionsHi || [];
              test.questionsOther = qObj.questionsOther || {};
              // Clean lightweight flags
              delete test.hasSplitQuestions;
              delete test.questionsCount;
            }
          }
          if (node.subCategories && Array.isArray(node.subCategories)) {
            node.subCategories.forEach((sub: any) => reInjectQuestions(sub));
          }
        };

        if (parsedConfig.testCategories && Array.isArray(parsedConfig.testCategories)) {
          parsedConfig.testCategories.forEach((cat: any) => reInjectQuestions(cat));
        }

        const merged = normalizeConfig(parsedConfig);
        saveState(merged);
        alert(`🎉 App Database reconstructed successfully with ${partFiles.length} config fragments and ${Object.keys(examQuestionsMap).length} split question files! Preview and state fully recovered.`);
      } else {
        alert("⚠️ Invalid application data structure inside reconstructed ZIP database.");
      }
    } catch (err: any) {
      console.error("ZIP restore error", err);
      alert("Failed recovering data from ZIP archive: " + err.message);
    }
  };

  const handleImportCompiledHTML = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        let base64Str = "";
        
        // 1. Try matching the newer single file fallback syntax: const embeddedB64 = "..."
        const embeddedMatch = content.match(/const embeddedB64\s*=\s*(['"`])(.*?)\1\s*;?/);
        if (embeddedMatch && embeddedMatch[2]) {
          base64Str = embeddedMatch[2];
        } else {
          // 2. Fallback to searching for direct atob("...") expression
          const atobMatch = content.match(/atob\((['"`])(.*?)\1\)/);
          if (atobMatch && atobMatch[2]) {
            base64Str = atobMatch[2];
          }
        }

        if (base64Str) {
          const decodedJSON = decodeObfuscatedDatabase(base64Str);
          const parsedConfig = JSON.parse(decodedJSON);
          
          if (parsedConfig && (parsedConfig.appName || parsedConfig.students || parsedConfig.testCategories)) {
            const merged = normalizeConfig(parsedConfig);
            saveState(merged);
            alert("🎉 App Configuration and Student Database retrieved successfully! The preview is updated.");
          } else {
            alert("Invalid application structure inside the HTML file.");
          }
        } else {
          alert("Could NOT retrieve database from this HTML file. Make sure this is a student app compiled by this builder.");
        }
      } catch (err) {
        console.error("Retrieve error", err);
        alert("Failed importing state from HTML file. Check format.");
      }
    };
    reader.readAsText(file);
  };

  const handleImportFile = async (file: File) => {
    if (file.name.endsWith(".zip") || file.type === "application/zip" || file.type === "application/x-zip-compressed") {
      await handleImportSplitZIP(file);
    } else {
      handleImportCompiledHTML(file);
    }
  };

  const handleImportMultipleFiles = async (files: File[]) => {
    if (files.length === 1) {
      const file = files[0];
      if (file.name.endsWith(".zip") || file.type === "application/zip" || file.type === "application/x-zip-compressed") {
        await handleImportSplitZIP(file);
      } else {
        handleImportCompiledHTML(file);
      }
      return;
    }

    try {
      const partFiles: { name: string; index: number; content: string }[] = [];
      const examQuestionsMap: Record<string, any> = {};
      let htmlFileContent = "";
      let configParsed = false;
      let parsedConfig: any = null;

      const readAsText = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string || "");
          reader.onerror = (err) => reject(err);
          reader.readAsText(file);
        });
      };

      // Read all files in parallel
      await Promise.all(
        files.map(async (file) => {
          const name = file.name.toLowerCase();
          const text = await readAsText(file);

          if (name.endsWith(".json")) {
            try {
              const parsed = JSON.parse(text);
              if (parsed && (parsed.appName || parsed.students || parsed.testCategories || parsed.pdfCategories)) {
                parsedConfig = parsed;
                configParsed = true;
              }
            } catch (e) {
              console.warn("JSON file parse error:", e);
            }
            return;
          }

          const match = file.name.match(/config_part_(\d+)\.txt$/i);
          if (match) {
            partFiles.push({
              name: file.name,
              index: parseInt(match[1], 10),
              content: text.trim()
            });
            return;
          }

          const qMatch = file.name.match(/test_questions_([a-zA-Z0-9_-]+)\.txt$/i);
          if (qMatch) {
            const testId = qMatch[1];
            try {
              const decodedQObj = JSON.parse(decodeObfuscatedDatabase(text.trim()));
              examQuestionsMap[testId] = decodedQObj;
            } catch (e) {
              console.warn(`Failed parsing question file: ${file.name}`, e);
            }
            return;
          }

          if (name.endsWith(".html") || name === "index.html") {
            htmlFileContent = text;
          }
        })
      );

      // Check if we retrieved config from individual parts
      if (partFiles.length > 0) {
        // Sort by the part number index ascendingly
        partFiles.sort((a, b) => a.index - b.index);

        // Join chunks
        const chunks = partFiles.map(p => p.content);
        const mergedBase64 = chunks.join("");
        const decodedJSON = decodeObfuscatedDatabase(mergedBase64);
        parsedConfig = JSON.parse(decodedJSON);
        configParsed = true;
      } else if (htmlFileContent) {
        // Check if index.html contains the database
        let base64Str = "";
        const embeddedMatch = htmlFileContent.match(/const embeddedB64\s*=\s*(['"`])(.*?)\1\s*;?/);
        if (embeddedMatch && embeddedMatch[2]) {
          base64Str = embeddedMatch[2];
        } else {
          const atobMatch = htmlFileContent.match(/atob\((['"`])(.*?)\1\)/);
          if (atobMatch && atobMatch[2]) {
            base64Str = atobMatch[2];
          }
        }

        if (base64Str) {
          const decodedJSON = decodeObfuscatedDatabase(base64Str);
          parsedConfig = JSON.parse(decodedJSON);
          configParsed = true;
        }
      }

      if (configParsed && parsedConfig && (parsedConfig.appName || parsedConfig.students || parsedConfig.testCategories)) {
        // Re-inject split questions back into the matching test structures
        const reInjectQuestions = (node: any) => {
          if (!node) return;
          if (node.test) {
            const test = node.test;
            const testId = test.id;
            if (testId && examQuestionsMap[testId]) {
              const qObj = examQuestionsMap[testId];
              test.questionsEn = qObj.questionsEn || [];
              test.questionsHi = qObj.questionsHi || [];
              test.questionsOther = qObj.questionsOther || {};
              // Clean lightweight flags
              delete test.hasSplitQuestions;
              delete test.questionsCount;
            }
          }
          if (node.subCategories && Array.isArray(node.subCategories)) {
            node.subCategories.forEach((sub: any) => reInjectQuestions(sub));
          }
        };

        if (parsedConfig.testCategories && Array.isArray(parsedConfig.testCategories)) {
          parsedConfig.testCategories.forEach((cat: any) => reInjectQuestions(cat));
        }

        const merged = normalizeConfig(parsedConfig);
        saveState(merged);
        alert(`🎉 Reconstructed successfully from ${partFiles.length} config parts, HTML files and ${Object.keys(examQuestionsMap).length} separate question files! All tables restored for editing/modification.`);
      } else {
        alert("⚠️ Could not reconstruct application database. Please make sure you have selected correct config_part_*.txt files plus test_questions_*.txt or index.html.");
      }
    } catch (err: any) {
      console.error("Multiple files restore error", err);
      alert("Failed recovering data from multiple files: " + err.message);
    }
  };

  const toggleCatExpanded = (id: string) => {
    setExpandedCats(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSubExpanded = (id: string) => {
    setExpandedSubs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // GENERAL APP IDENTIFIERS
  const handleUpdateGeneralFields = (field: keyof AppConfig, value: any) => {
    saveState({
      ...appConfig,
      [field]: value
    });
  };

  // DYNAMIC IMAGE SLIDERS SETUP
  const handleAddSlider = () => {
    const newSlide: SliderItem = {
      id: "slide_" + Date.now(),
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200",
      title: "Custom Slider Highlight",
      link: "#"
    };
    saveState({
      ...appConfig,
      sliders: [...appConfig.sliders, newSlide]
    });
  };

  const handleUpdateSliderItem = (id: string, updatedField: keyof SliderItem, val: string) => {
    const updated = appConfig.sliders.map(s => {
      if (s.id === id) {
        return { ...s, [updatedField]: val };
      }
      return s;
    });
    saveState({ ...appConfig, sliders: updated });
  };

  const handleDeleteSliderItem = (id: string) => {
    saveState({
      ...appConfig,
      sliders: appConfig.sliders.filter(s => s.id !== id)
    });
  };

  // NOTIFICATION BANNER CARD BUILDER
  const handleAddNotification = () => {
    const newNotif: NotificationItem = {
      id: "notif_" + Date.now(),
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=400",
      title: "\ud83c\udf81 New Material Unlocked",
      message: "We have released premium worksheets and assessments.",
      buttonName: "CHECK",
      link: "#"
    };
    saveState({
      ...appConfig,
      notifications: [...appConfig.notifications, newNotif]
    });
  };

  const handleUpdateNotificationItem = (id: string, updatedField: keyof NotificationItem, val: string) => {
    const updated = appConfig.notifications.map(n => {
      if (n.id === id) {
        return { ...n, [updatedField]: val };
      }
      return n;
    });
    saveState({ ...appConfig, notifications: updated });
  };

  const handleDeleteNotificationItem = (id: string) => {
    saveState({
      ...appConfig,
      notifications: appConfig.notifications.filter(n => n.id !== id)
    });
  };

  // WEBSITE PROMOTIONAL POP-UPS MANAGER
  const handleAddWebsitePopup = () => {
    const newPopup = {
      id: "popup_" + Date.now(),
      title: "\ud83c\udf81 Special Topper Offer",
      text: "Get unlimited mock tests with comprehensive explanations, detailed performance logs, and rank trophies! Limited period 50% flat discount on sub. Use promo code: TOPPER50",
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400",
      redirectUrl: "#premium",
      startTime: new Date().toISOString().slice(0, 16),
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000 * 7).toISOString().slice(0, 16), // 7 days active
      order: (appConfig.popups?.length || 0) + 1,
      isActive: true
    };
    saveState({
      ...appConfig,
      popups: [...(appConfig.popups || []), newPopup]
    });
  };

  const handleUpdateWebsitePopup = (id: string, field: string, value: any) => {
    const updated = (appConfig.popups || []).map(p => {
      if (p.id === id) {
        return { ...p, [field]: value };
      }
      return p;
    });
    saveState({ ...appConfig, popups: updated });
  };

  const handleDeleteWebsitePopup = (id: string) => {
    saveState({
      ...appConfig,
      popups: (appConfig.popups || []).filter(p => p.id !== id)
    });
  };

  // Reorder operations
  const handleMoveSlider = (id: string, direction: "up" | "down") => {
    const list = [...appConfig.sliders];
    const index = list.findIndex(s => s.id === id);
    if (index === -1) return;
    
    if (direction === "up" && index > 0) {
      const temp = list[index];
      list[index] = list[index - 1];
      list[index - 1] = temp;
    } else if (direction === "down" && index < list.length - 1) {
      const temp = list[index];
      list[index] = list[index + 1];
      list[index + 1] = temp;
    }
    saveState({ ...appConfig, sliders: list });
  };

  const handleMoveNotification = (id: string, direction: "up" | "down") => {
    const list = [...appConfig.notifications];
    const index = list.findIndex(n => n.id === id);
    if (index === -1) return;
    
    if (direction === "up" && index > 0) {
      const temp = list[index];
      list[index] = list[index - 1];
      list[index - 1] = temp;
    } else if (direction === "down" && index < list.length - 1) {
      const temp = list[index];
      list[index] = list[index + 1];
      list[index + 1] = temp;
    }
    saveState({ ...appConfig, notifications: list });
  };

  const handleMoveCategory = (id: string, treeType: "test" | "pdf", direction: "up" | "down") => {
    const list = treeType === "test" ? [...appConfig.testCategories] : [...appConfig.pdfCategories];
    const index = list.findIndex(c => c.id === id);
    if (index === -1) return;
    
    if (direction === "up" && index > 0) {
      const temp = list[index];
      list[index] = list[index - 1];
      list[index - 1] = temp;
    } else if (direction === "down" && index < list.length - 1) {
      const temp = list[index];
      list[index] = list[index + 1];
      list[index + 1] = temp;
    }
    
    if (treeType === "test") saveState({ ...appConfig, testCategories: list });
    else saveState({ ...appConfig, pdfCategories: list });
  };

  const handleMoveSubCategory = (catId: string, subId: string, treeType: "test" | "pdf", direction: "up" | "down") => {
    const categories = treeType === "test" ? [...appConfig.testCategories] : [...appConfig.pdfCategories];
    const updated = categories.map(cat => {
      if (cat.id !== catId) return cat;
      const list = [...cat.subCategories];
      const index = list.findIndex(s => s.id === subId);
      if (index === -1) return cat;

      if (direction === "up" && index > 0) {
        const temp = list[index];
        list[index] = list[index - 1];
        list[index - 1] = temp;
      } else if (direction === "down" && index < list.length - 1) {
        const temp = list[index];
        list[index] = list[index + 1];
        list[index + 1] = temp;
      }
      return { ...cat, subCategories: list };
    });

    if (treeType === "test") saveState({ ...appConfig, testCategories: updated });
    else saveState({ ...appConfig, pdfCategories: updated });
  };

  const handleMoveTopic = (catId: string, subId: string, topicId: string, treeType: "test" | "pdf", direction: "up" | "down") => {
    const categories = treeType === "test" ? [...appConfig.testCategories] : [...appConfig.pdfCategories];
    const updated = categories.map(cat => {
      if (cat.id !== catId) return cat;
      const subs = cat.subCategories.map(sub => {
        if (sub.id !== subId) return sub;
        const list = [...sub.topics];
        const index = list.findIndex(t => t.id === topicId);
        if (index === -1) return sub;

        if (direction === "up" && index > 0) {
          const temp = list[index];
          list[index] = list[index - 1];
          list[index - 1] = temp;
        } else if (direction === "down" && index < list.length - 1) {
          const temp = list[index];
          list[index] = list[index + 1];
          list[index + 1] = temp;
        }
        return { ...sub, topics: list };
      });
      return { ...cat, subCategories: subs };
    });

    if (treeType === "test") saveState({ ...appConfig, testCategories: updated });
    else saveState({ ...appConfig, pdfCategories: updated });
  };

  // UNIVERSAL HIERARCHY TREE LOGICS (CATEGORIES > SUBS > TOPICS)
  const handleAddRootCategoryNode = (treeType: "test" | "pdf") => {
    const newCat: CategoryNode = {
      id: "cat_" + Date.now(),
      name: "New Category Catalog",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=200",
      subCategories: [],
      test: null,
      pdf: null
    };

    if (treeType === "test") {
      saveState({
        ...appConfig,
        testCategories: [...appConfig.testCategories, newCat]
      });
    } else {
      saveState({
        ...appConfig,
        pdfCategories: [...appConfig.pdfCategories, newCat]
      });
    }
  };

  const handleAddSubCategoryNode = (catId: string, treeType: "test" | "pdf") => {
    const newSub: SubCategoryNode = {
      id: "sub_" + Date.now(),
      name: "New Sub-Category Section",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=200",
      topics: [],
      test: null,
      pdf: null
    };

    const targetCats = treeType === "test" ? appConfig.testCategories : appConfig.pdfCategories;

    const updated = targetCats.map(cat => {
      if (cat.id === catId) {
        return {
          ...cat,
          subCategories: [...cat.subCategories, newSub]
        };
      }
      return cat;
    });

    if (treeType === "test") {
      saveState({ ...appConfig, testCategories: updated });
    } else {
      saveState({ ...appConfig, pdfCategories: updated });
    }

    // Auto expand
    setExpandedCats(prev => ({ ...prev, [catId]: true }));
  };

  const handleAddTopicNode = (catId: string, subId: string, treeType: "test" | "pdf") => {
    const newTopic: TopicNode = {
      id: "topic_" + Date.now(),
      name: "New Topic / Lesson File",
      test: null,
      pdf: null
    };

    const targetCats = treeType === "test" ? appConfig.testCategories : appConfig.pdfCategories;

    const updated = targetCats.map(cat => {
      if (cat.id === catId) {
        const updatedSubs = cat.subCategories.map(sub => {
          if (sub.id === subId) {
            return {
              ...sub,
              topics: [...sub.topics, newTopic]
            };
          }
          return sub;
        });
        return { ...cat, subCategories: updatedSubs };
      }
      return cat;
    });

    if (treeType === "test") {
      saveState({ ...appConfig, testCategories: updated });
    } else {
      saveState({ ...appConfig, pdfCategories: updated });
    }

    // Auto expand
    setExpandedSubs(prev => ({ ...prev, [subId]: true }));
  };

  // Node editing state modifications inside nested loops
  const handleUpdateNodeNameAndImage = (
    nodeId: string,
    type: "category" | "subcategory" | "topic",
    treeType: "test" | "pdf",
    fields: { name?: string; image?: string; scheduledAt?: string; onlyUsers?: string; couponCode?: string }
  ) => {
    const targetCats = treeType === "test" ? appConfig.testCategories : appConfig.pdfCategories;

    const updated = targetCats.map(cat => {
      if (type === "category" && cat.id === nodeId) {
        return {
          ...cat,
          name: fields.name !== undefined ? fields.name : cat.name,
          image: fields.image !== undefined ? fields.image : cat.image,
          scheduledAt: fields.scheduledAt !== undefined ? fields.scheduledAt : cat.scheduledAt,
          onlyUsers: fields.onlyUsers !== undefined ? fields.onlyUsers : (cat as any).onlyUsers,
          couponCode: fields.couponCode !== undefined ? fields.couponCode : (cat as any).couponCode
        };
      }

      const updatedSubs = cat.subCategories.map(sub => {
        if (type === "subcategory" && sub.id === nodeId) {
          return {
            ...sub,
            name: fields.name !== undefined ? fields.name : sub.name,
            image: fields.image !== undefined ? fields.image : sub.image,
            scheduledAt: fields.scheduledAt !== undefined ? fields.scheduledAt : sub.scheduledAt,
            onlyUsers: fields.onlyUsers !== undefined ? fields.onlyUsers : (sub as any).onlyUsers,
            couponCode: fields.couponCode !== undefined ? fields.couponCode : (sub as any).couponCode
          };
        }

        const updatedTopics = sub.topics.map(top => {
          if (type === "topic" && top.id === nodeId) {
            return {
              ...top,
              name: fields.name !== undefined ? fields.name : top.name,
              scheduledAt: fields.scheduledAt !== undefined ? fields.scheduledAt : top.scheduledAt,
              onlyUsers: fields.onlyUsers !== undefined ? fields.onlyUsers : (top as any).onlyUsers,
              couponCode: fields.couponCode !== undefined ? fields.couponCode : (top as any).couponCode
            };
          }
          return top;
        });

        return { ...sub, topics: updatedTopics };
      });

      return { ...cat, subCategories: updatedSubs };
    });

    if (treeType === "test") {
      saveState({ ...appConfig, testCategories: updated });
    } else {
      saveState({ ...appConfig, pdfCategories: updated });
    }
  };

  // Test and PDF Resource setups at any hierarchy level
  const handleToggleTestSettingsOnNode = (
    nodeId: string,
    type: "category" | "subcategory" | "topic",
    treeType: "test" | "pdf",
    enable: boolean
  ) => {
    const targetCats = treeType === "test" ? appConfig.testCategories : appConfig.pdfCategories;

    const defaultTest: TestMeta = {
      id: "test_" + Date.now(),
      title: "Quick Unit Test Assessment",
      questionsEn: [],
      questionsHi: [],
      duration: 60,
      freeAttempts: 1,
      unlimitedAttempts: false,
      onlyUsers: "",
      coupon: null,
      posMarks: 1,
      negMarks: 0,
      instructions: "Follow standard academic conduct regulations."
    };

    const updated = targetCats.map(cat => {
      if (type === "category" && cat.id === nodeId) {
        return { ...cat, test: enable ? defaultTest : null };
      }

      const updatedSubs = cat.subCategories.map(sub => {
        if (type === "subcategory" && sub.id === nodeId) {
          return { ...sub, test: enable ? defaultTest : null };
        }

        const updatedTopics = sub.topics.map(top => {
          if (type === "topic" && top.id === nodeId) {
            return { ...top, test: enable ? defaultTest : null };
          }
          return top;
        });

        return { ...sub, topics: updatedTopics };
      });

      return { ...cat, subCategories: updatedSubs };
    });

    if (treeType === "test") {
      saveState({ ...appConfig, testCategories: updated });
    } else {
      saveState({ ...appConfig, pdfCategories: updated });
    }
  };

  const handleTogglePDFSettingsOnNode = (
    nodeId: string,
    type: "category" | "subcategory" | "topic",
    treeType: "test" | "pdf",
    enable: boolean
  ) => {
    const targetCats = treeType === "test" ? appConfig.testCategories : appConfig.pdfCategories;

    const defaultPDF: PDFMeta = {
      id: "pdf_" + Date.now(),
      title: "Important Study Document File",
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    };

    const updated = targetCats.map(cat => {
      if (type === "category" && cat.id === nodeId) {
        return { ...cat, pdf: enable ? defaultPDF : null };
      }

      const updatedSubs = cat.subCategories.map(sub => {
        if (type === "subcategory" && sub.id === nodeId) {
          return { ...sub, pdf: enable ? defaultPDF : null };
        }

        const updatedTopics = sub.topics.map(top => {
          if (type === "topic" && top.id === nodeId) {
            return { ...top, pdf: enable ? defaultPDF : null };
          }
          return top;
        });

        return { ...sub, topics: updatedTopics };
      });

      return { ...cat, subCategories: updatedSubs };
    });

    if (treeType === "test") {
      saveState({ ...appConfig, testCategories: updated });
    } else {
      saveState({ ...appConfig, pdfCategories: updated });
    }
  };

  const handleUpdateNodeTestProperty = (
    nodeId: string,
    type: "category" | "subcategory" | "topic",
    treeType: "test" | "pdf",
    key: keyof TestMeta,
    value: any
  ) => {
    const targetCats = treeType === "test" ? appConfig.testCategories : appConfig.pdfCategories;

    const updated = targetCats.map(cat => {
      if (type === "category" && cat.id === nodeId && cat.test) {
        return { ...cat, test: { ...cat.test, [key]: value } };
      }

      const updatedSubs = cat.subCategories.map(sub => {
        if (type === "subcategory" && sub.id === nodeId && sub.test) {
          return { ...sub, test: { ...sub.test, [key]: value } };
        }

        const updatedTopics = sub.topics.map(top => {
          if (type === "topic" && top.id === nodeId && top.test) {
            return { ...top, test: { ...top.test, [key]: value } };
          }
          return top;
        });

        return { ...sub, topics: updatedTopics };
      });

      return { ...cat, subCategories: updatedSubs };
    });

    if (treeType === "test") {
      saveState({ ...appConfig, testCategories: updated });
    } else {
      saveState({ ...appConfig, pdfCategories: updated });
    }
  };

  const handleUpdateNodePDFProperty = (
    nodeId: string,
    type: "category" | "subcategory" | "topic",
    treeType: "test" | "pdf",
    key: keyof PDFMeta,
    value: any
  ) => {
    const targetCats = treeType === "test" ? appConfig.testCategories : appConfig.pdfCategories;

    const updated = targetCats.map(cat => {
      if (type === "category" && cat.id === nodeId && cat.pdf) {
        return { ...cat, pdf: { ...cat.pdf, [key]: value } };
      }

      const updatedSubs = cat.subCategories.map(sub => {
        if (type === "subcategory" && sub.id === nodeId && sub.pdf) {
          return { ...sub, pdf: { ...sub.pdf, [key]: value } };
        }

        const updatedTopics = sub.topics.map(top => {
          if (type === "topic" && top.id === nodeId && top.pdf) {
            return { ...top, pdf: { ...top.pdf, [key]: value } };
          }
          return top;
        });

        return { ...sub, topics: updatedTopics };
      });

      return { ...cat, subCategories: updatedSubs };
    });

    if (treeType === "test") {
      saveState({ ...appConfig, testCategories: updated });
    } else {
      saveState({ ...appConfig, pdfCategories: updated });
    }
  };

  const handleDeleteNodeItem = (
    nodeId: string,
    type: "category" | "subcategory" | "topic",
    treeType: "test" | "pdf",
    bypassConfirm = false
  ) => {
    if (!bypassConfirm) {
      if (!confirm("Are you sure you want to remove this node and all of its resources?")) return;
    }

    // 1. Process test categories
    let updatedTestCats = [...(appConfig.testCategories || [])];
    if (type === "category") {
      updatedTestCats = updatedTestCats.filter(cat => cat.id !== nodeId);
    } else if (type === "subcategory") {
      updatedTestCats = updatedTestCats.map(cat => {
        const filteredSubs = (cat.subCategories || []).filter(sub => sub.id !== nodeId);
        return { ...cat, subCategories: filteredSubs };
      });
    } else if (type === "topic") {
      updatedTestCats = updatedTestCats.map(cat => {
        const updatedSubs = (cat.subCategories || []).map(sub => {
          const filteredTopics = (sub.topics || []).filter(tp => tp.id !== nodeId);
          return { ...sub, topics: filteredTopics };
        });
        return { ...cat, subCategories: updatedSubs };
      });
    }

    // 2. Process pdf categories
    let updatedPdfCats = [...(appConfig.pdfCategories || [])];
    if (type === "category") {
      updatedPdfCats = updatedPdfCats.filter(cat => cat.id !== nodeId);
    } else if (type === "subcategory") {
      updatedPdfCats = updatedPdfCats.map(cat => {
        const filteredSubs = (cat.subCategories || []).filter(sub => sub.id !== nodeId);
        return { ...cat, subCategories: filteredSubs };
      });
    } else if (type === "topic") {
      updatedPdfCats = updatedPdfCats.map(cat => {
        const updatedSubs = (cat.subCategories || []).map(sub => {
          const filteredTopics = (sub.topics || []).filter(tp => tp.id !== nodeId);
          return { ...sub, topics: filteredTopics };
        });
        return { ...cat, subCategories: updatedSubs };
      });
    }

    saveState({
      ...appConfig,
      testCategories: updatedTestCats,
      pdfCategories: updatedPdfCats
    });

    if (editingNodeId === nodeId) setEditingNodeId(null);
    setDeleteConfirmId(null);
  };

  // TXT/HTML Question Files Parser triggers supporting multi-files list and append mode
  const handleParserFileAttachment = async (
    e: React.ChangeEvent<HTMLInputElement>,
    nodeId: string,
    type: "category" | "subcategory" | "topic",
    lang: string,
    treeType: "test" | "pdf"
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Locate current node check for test
    const targetCats = treeType === "test" ? appConfig.testCategories : appConfig.pdfCategories;
    let foundNodeTest: any = null;
    for (const cat of targetCats) {
      if (type === "category" && cat.id === nodeId && cat.test) {
        foundNodeTest = cat.test;
        break;
      }
      for (const sub of cat.subCategories) {
        if (type === "subcategory" && sub.id === nodeId && sub.test) {
          foundNodeTest = sub.test;
          break;
        }
        for (const top of sub.topics) {
          if (type === "topic" && top.id === nodeId && top.test) {
            foundNodeTest = top.test;
            break;
          }
        }
        if (foundNodeTest) break;
      }
      if (foundNodeTest) break;
    }

    let combinedParsed: any[] = [];
    const fileLoadPromises = Array.from(files).map((file) => {
      return new Promise<void>((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const text = event.target?.result as string;
          const parsed = parseTestText(text);
          if (parsed && parsed.length > 0) {
            combinedParsed = [...combinedParsed, ...parsed];
          }
          resolve();
        };
        reader.readAsText(file as File);
      });
    });

    await Promise.all(fileLoadPromises);

    if (combinedParsed.length > 0) {
      // Find current questions depending on lang
      let currentQuestions: any[] = [];
      if (foundNodeTest) {
        if (lang === "en") {
          currentQuestions = foundNodeTest.questionsEn || [];
        } else if (lang === "hi") {
          currentQuestions = foundNodeTest.questionsHi || [];
        } else {
          currentQuestions = foundNodeTest.questionsOther?.[lang] || [];
        }
      }

      const finalQuestions = uploadAppendMode 
        ? [...currentQuestions, ...combinedParsed] 
        : combinedParsed;

      if (lang === "en") {
        handleUpdateNodeTestProperty(nodeId, type, treeType, "questionsEn", finalQuestions);
      } else if (lang === "hi") {
        handleUpdateNodeTestProperty(nodeId, type, treeType, "questionsHi", finalQuestions);
      } else {
        const currentOthers = foundNodeTest ? (foundNodeTest.questionsOther || {}) : {};
        const updatedOthers = {
          ...currentOthers,
          [lang]: finalQuestions
        };
        handleUpdateNodeTestProperty(nodeId, type, treeType, "questionsOther", updatedOthers);
      }
      alert(`🎉 Successfully ${uploadAppendMode ? "added (appended)" : "replaced"} ${combinedParsed.length} questions in ${lang.toUpperCase()}! Total questions list is now ${finalQuestions.length}.`);
    } else {
      alert("Found no matched questions format in your uploaded file(s). Format expected: '1. Question Text' then option rows starting with 'A) Option' and 'Ex: Explanation text'. Mark correct option with a checkmark symbol '✅'");
    }
  };

  // NOUN VOUCHER / COUPON RE-CONFIGS BINDERS
  const handleUpdateNodeTestCoupon = (
    nodeId: string,
    type: "category" | "subcategory" | "topic",
    treeType: "test" | "pdf",
    couponField: "code" | "startDate" | "endDate" | "maxAttempts",
    val: string
  ) => {
    const targetCats = treeType === "test" ? appConfig.testCategories : appConfig.pdfCategories;

    const updated = targetCats.map(cat => {
      const assignCoupon = (testObj: TestMeta | null) => {
        if (!testObj) return null;
        const currentCoupon = testObj.coupon || { code: "SERIES88", startDate: "2026-06-01", endDate: "2026-12-31", maxAttempts: "unlimited" };
        return {
          ...testObj,
          coupon: {
            ...currentCoupon,
            [couponField]: val
          }
        };
      };

      if (type === "category" && cat.id === nodeId) {
        return { ...cat, test: assignCoupon(cat.test) };
      }

      const updatedSubs = cat.subCategories.map(sub => {
        if (type === "subcategory" && sub.id === nodeId) {
          return { ...sub, test: assignCoupon(sub.test) };
        }

        const updatedTopics = sub.topics.map(top => {
          if (type === "topic" && top.id === nodeId) {
            return { ...top, test: assignCoupon(top.test) };
          }
          return top;
        });

        return { ...sub, topics: updatedTopics };
      });

      return { ...cat, subCategories: updatedSubs };
    });

    if (treeType === "test") {
      saveState({ ...appConfig, testCategories: updated });
    } else {
      saveState({ ...appConfig, pdfCategories: updated });
    }
  };

  const handleRemoveNodeTestCoupon = (
    nodeId: string,
    type: "category" | "subcategory" | "topic",
    treeType: "test" | "pdf"
  ) => {
    const targetCats = treeType === "test" ? appConfig.testCategories : appConfig.pdfCategories;

    const updated = targetCats.map(cat => {
      if (type === "category" && cat.id === nodeId && cat.test) {
        return { ...cat, test: { ...cat.test, coupon: null } };
      }

      const updatedSubs = cat.subCategories.map(sub => {
        if (type === "subcategory" && sub.id === nodeId && sub.test) {
          return { ...sub, test: { ...sub.test, coupon: null } };
        }

        const updatedTopics = sub.topics.map(top => {
          if (type === "topic" && top.id === nodeId && top.test) {
            return { ...top, test: { ...top.test, coupon: null } };
          }
          return top;
        });

        return { ...sub, topics: updatedTopics };
      });

      return { ...cat, subCategories: updatedSubs };
    });

    if (treeType === "test") {
      saveState({ ...appConfig, testCategories: updated });
    } else {
      saveState({ ...appConfig, pdfCategories: updated });
    }
  };

  const handleAddNodeTestCoupon = (
    nodeId: string,
    type: "category" | "subcategory" | "topic",
    treeType: "test" | "pdf"
  ) => {
    const defaultCoupon = {
      code: "MYCOUPON",
      startDate: "2026-06-01",
      endDate: "2026-12-31",
      maxAttempts: "unlimited"
    };

    const targetCats = treeType === "test" ? appConfig.testCategories : appConfig.pdfCategories;

    const updated = targetCats.map(cat => {
      if (type === "category" && cat.id === nodeId && cat.test) {
        return { ...cat, test: { ...cat.test, coupon: defaultCoupon } };
      }

      const updatedSubs = cat.subCategories.map(sub => {
        if (type === "subcategory" && sub.id === nodeId && sub.test) {
          return { ...sub, test: { ...sub.test, coupon: defaultCoupon } };
        }

        const updatedTopics = sub.topics.map(top => {
          if (type === "topic" && top.id === nodeId && top.test) {
            return { ...top, test: { ...top.test, coupon: defaultCoupon } };
          }
          return top;
        });

        return { ...sub, topics: updatedTopics };
      });

      return { ...cat, subCategories: updatedSubs };
    });

    if (treeType === "test") {
      saveState({ ...appConfig, testCategories: updated });
    } else {
      saveState({ ...appConfig, pdfCategories: updated });
    }
  };

  const handleUpdateNodeCoupon = (
    nodeId: string,
    type: "category" | "subcategory" | "topic",
    treeType: "test" | "pdf",
    couponField: "code" | "startDate" | "endDate" | "maxAttempts",
    val: string
  ) => {
    const targetCats = treeType === "test" ? appConfig.testCategories : appConfig.pdfCategories;

    const updated = targetCats.map(cat => {
      const assignCoupon = (nodeObj: any) => {
        const currentCoupon = nodeObj.coupon || { code: "SERIES88", startDate: "2026-06-01", endDate: "2026-12-31", maxAttempts: "unlimited" };
        return {
          ...nodeObj,
          coupon: {
            ...currentCoupon,
            [couponField]: val
          }
        };
      };

      if (type === "category" && cat.id === nodeId) {
        return assignCoupon(cat);
      }

      const updatedSubs = cat.subCategories.map(sub => {
        if (type === "subcategory" && sub.id === nodeId) {
          return assignCoupon(sub);
        }

        const updatedTopics = sub.topics.map(top => {
          if (type === "topic" && top.id === nodeId) {
            return assignCoupon(top);
          }
          return top;
        });

        return { ...sub, topics: updatedTopics };
      });

      return { ...cat, subCategories: updatedSubs };
    });

    if (treeType === "test") {
      saveState({ ...appConfig, testCategories: updated });
    } else {
      saveState({ ...appConfig, pdfCategories: updated });
    }
  };

  const handleAddNodeCoupon = (
    nodeId: string,
    type: "category" | "subcategory" | "topic",
    treeType: "test" | "pdf"
  ) => {
    const defaultCoupon = {
      code: "MYCOUPON",
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      maxAttempts: "unlimited"
    };

    const targetCats = treeType === "test" ? appConfig.testCategories : appConfig.pdfCategories;

    const updated = targetCats.map(cat => {
      if (type === "category" && cat.id === nodeId) {
        return { ...cat, coupon: defaultCoupon };
      }

      const updatedSubs = cat.subCategories.map(sub => {
        if (type === "subcategory" && sub.id === nodeId) {
          return { ...sub, coupon: defaultCoupon };
        }

        const updatedTopics = sub.topics.map(top => {
          if (type === "topic" && top.id === nodeId) {
            return { ...top, coupon: defaultCoupon };
          }
          return top;
        });

        return { ...sub, topics: updatedTopics };
      });

      return { ...cat, subCategories: updatedSubs };
    });

    if (treeType === "test") {
      saveState({ ...appConfig, testCategories: updated });
    } else {
      saveState({ ...appConfig, pdfCategories: updated });
    }
  };

  const handleRemoveNodeCoupon = (
    nodeId: string,
    type: "category" | "subcategory" | "topic",
    treeType: "test" | "pdf"
  ) => {
    const targetCats = treeType === "test" ? appConfig.testCategories : appConfig.pdfCategories;

    const updated = targetCats.map(cat => {
      if (type === "category" && cat.id === nodeId) {
        return { ...cat, coupon: null };
      }

      const updatedSubs = cat.subCategories.map(sub => {
        if (type === "subcategory" && sub.id === nodeId) {
          return { ...sub, coupon: null };
        }

        const updatedTopics = sub.topics.map(top => {
          if (type === "topic" && top.id === nodeId) {
            return { ...top, coupon: null };
          }
          return top;
        });

        return { ...sub, topics: updatedTopics };
      });

      return { ...cat, subCategories: updatedSubs };
    });

    if (treeType === "test") {
      saveState({ ...appConfig, testCategories: updated });
    } else {
      saveState({ ...appConfig, pdfCategories: updated });
    }
  };

  // STUDENT ACCOUNTS CREDENTIAL DATABASE MANAGER
  const handleAddStudentAccount = () => {
    const newStudent: StudentUser = {
      id: "stu_" + Date.now(),
      name: "Smart Aspirant",
      emailOrMobile: "aspirant" + Math.floor(Math.random() * 1000) + "@example.com",
      phoneNo: "",
      password: "pass" + Math.floor(1000 + Math.random() * 9000),
      purchaseDate: new Date().toISOString().split("T")[0],
      expiryDate: new Date(Date.now() + 90 * 24 * 3600 * 1000).toISOString().split("T")[0] // 90 days
    };
    saveState({
      ...appConfig,
      students: [...appConfig.students, newStudent]
    });
  };

  const handleUpdateStudentAccount = (id: string, field: keyof StudentUser, val: string) => {
    const updated = appConfig.students.map(s => {
      if (s.id === id) {
        return { ...s, [field]: val };
      }
      return s;
    });
    saveState({ ...appConfig, students: updated });
  };

  const handleDeleteStudentAccount = (id: string) => {
    saveState({
      ...appConfig,
      students: appConfig.students.filter(s => s.id !== id)
    });
  };

  const handleUploadLocalImage = (onSuccess: (base64: string) => void) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          const b64 = event.target.result;
          onSuccess(b64);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleBulkUploadCSV = (csvText: string) => {
    if (!csvText || !csvText.trim()) return;
    const lines = csvText.split(/\r?\n/);
    const parsedStudents: StudentUser[] = [];
    
    let startIndex = 0;
    if (lines[0] && (lines[0].toLowerCase().includes("name") || lines[0].toLowerCase().includes("mail") || lines[0].toLowerCase().includes("phone"))) {
      startIndex = 1;
    }

    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i];
      if (!line || !line.trim()) continue;
      
      const parts = line.split(",").map(item => item.trim().replace(/^["']|["']$/g, ""));
      if (parts.length >= 3) {
        const name = parts[0];
        const email = parts[1];
        const phone = parts[2];
        const password = parts[3] || "123456";
        const purchaseDate = parts[4] || "";
        const expiryDate = parts[5] || "";
        
        parsedStudents.push({
          id: "stu_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
          name: name || "Student",
          emailOrMobile: email || phone || "",
          phoneNo: phone || "",
          password: password,
          purchaseDate: purchaseDate,
          expiryDate: expiryDate
        });
      }
    }
    
    if (parsedStudents.length > 0) {
      saveState({
        ...appConfig,
        students: [...appConfig.students, ...parsedStudents]
      });
      alert(`Successfully registered ${parsedStudents.length} student records from CSV bulk upload!`);
    } else {
      alert("No valid CSV rows parsed. Format must be: Name, E-mail ID, Phone No, Password, Date of Purchase, Date Of Expiry");
    }
  };

  // SOCIALS & PAYMENTS CONFIGURATION
  const handleUpdateSocialPaymentGroup = (groupKey: keyof AppConfig["social"], value: any) => {
    saveState({
      ...appConfig,
      social: {
        ...appConfig.social,
        [groupKey]: value
      }
    });
  };

  const handleAddCustomSocialLink = () => {
    const list = appConfig.social.customLinks || [];
    const newLink = {
      id: "soc_" + Date.now(),
      name: "Facebook",
      url: "https://facebook.com/prayasone",
      color: "#1877f2",
      icon: "ph-fill ph-facebook-logo"
    };
    saveState({
      ...appConfig,
      social: {
        ...appConfig.social,
        customLinks: [...list, newLink]
      }
    });
  };

  const handleUpdateCustomSocialLink = (id: string, property: "name" | "url" | "color" | "icon", value: string) => {
    const list = appConfig.social.customLinks || [];
    const updated = list.map(l => l.id === id ? { ...l, [property]: value } : l);
    saveState({
      ...appConfig,
      social: {
        ...appConfig.social,
        customLinks: updated
      }
    });
  };

  const handleRemoveCustomSocialLink = (id: string) => {
    const list = appConfig.social.customLinks || [];
    const filtered = list.filter(l => l.id !== id);
    saveState({
      ...appConfig,
      social: {
        ...appConfig.social,
        customLinks: filtered
      }
    });
  };

  // THE ULTIMATE STANDALONE HTML PACK COMPILER DISK DRIVE ACTION
  const handleTriggerFinalCompilationAndDownload = () => {
    try {
      // Keep students database in the compiled package as requested by user
      // Prepare a fully safe and robust configuration to prevent any undefined/null crashes
      // Deep clone to prevent mutating UI state
      const clonedConfig = JSON.parse(JSON.stringify(appConfig));

      const safeConfig = {
        ...clonedConfig,
        appName: clonedConfig.appName || "Prayas One Hub",
        logoUrl: clonedConfig.logoUrl || DEFAULT_LOGO_URL,
        studentGreeting: clonedConfig.studentGreeting || "Hi, Aspirant!",
        studentSubGreeting: clonedConfig.studentSubGreeting || "PRAYAS ONE PROFESSIONAL HUB",
        sliders: clonedConfig.sliders || [],
        notifications: clonedConfig.notifications || [],
        popups: clonedConfig.popups || [],
        students: clonedConfig.students || [],
        testCategories: clonedConfig.testCategories || [],
        pdfCategories: clonedConfig.pdfCategories || [],
        social: {
          whatsapp: "",
          telegram: "",
          instagram: "",
          youtube: "",
          paymentQr: "https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=UPI_PAYMENT_PAY@okaxis",
          paymentAmount: "₹499",
          premiumPrice: "₹45",
          premiumDurationText: "3 Months",
          premiumValidityText: "VALID FOR 90 DAYS",
          premiumBenefitsText: "Access to Past Tests, Access to Present Tests, Access to Future Tests, Unlimited Test Attempts",
          hideSourceOnStudent: false,
          qrDownloadText: "Download QR Code",
          qrDownloadLink: "",
          customLinks: [],
          ...(clonedConfig.social || {})
        }
      };

      // Maintain a fully-populated version of safeConfig for standalone offline execution (preserving all questions!)
      const standaloneConfig = JSON.parse(JSON.stringify(safeConfig));
      const populateQuestionsCount = (node: any) => {
        if (!node) return;
        if (node.test) {
          const test = node.test;
          test.questionsCount = Math.max(
            (test.questionsEn || []).length,
            (test.questionsHi || []).length
          );
          Object.values(test.questionsOther || {}).forEach((arr: any) => {
            if (arr && arr.length > test.questionsCount) {
              test.questionsCount = arr.length;
            }
          });
        }
        if (node.subCategories && Array.isArray(node.subCategories)) {
          node.subCategories.forEach((sub: any) => populateQuestionsCount(sub));
        }
      };
      if (standaloneConfig.testCategories && Array.isArray(standaloneConfig.testCategories)) {
        standaloneConfig.testCategories.forEach((cat: any) => populateQuestionsCount(cat));
      }

      // Encode the fully populated standalone configuration (with all MCQ questions intact!)
      const standaloneJsonString = JSON.stringify(standaloneConfig);
      const standaloneBase64 = encodeObfuscatedDatabase(standaloneJsonString);

      // Traverse and extract exam questions to separate txt array files
      const examQuestionsFiles: { filename: string; content: string }[] = [];
      const traverseAndExtractQuestions = (node: any) => {
        if (!node) return;
        if (node.test) {
          const test = node.test;
          const testId = test.id;
          if (testId) {
            const questionsSubset = {
              questionsEn: test.questionsEn || [],
              questionsHi: test.questionsHi || [],
              questionsOther: test.questionsOther || {}
            };
            const questionsJsonString = JSON.stringify(questionsSubset);
            const scrambledQuestions = encodeObfuscatedDatabase(questionsJsonString);
            examQuestionsFiles.push({
              filename: `test_questions_${testId}.txt`,
              content: scrambledQuestions
            });

            // Put lightweight indicators
            test.hasSplitQuestions = true;
            test.questionsCount = Math.max(test.questionsEn.length, test.questionsHi.length);
            Object.values(test.questionsOther || {}).forEach((arr: any) => {
              if (arr && arr.length > test.questionsCount) {
                test.questionsCount = arr.length;
              }
            });

            // Null out heavy payloads
            test.questionsEn = [];
            test.questionsHi = [];
            test.questionsOther = {};
          }
        }
        if (node.subCategories && Array.isArray(node.subCategories)) {
          node.subCategories.forEach((sub: any) => traverseAndExtractQuestions(sub));
        }
      };

      if (safeConfig.testCategories && Array.isArray(safeConfig.testCategories)) {
        safeConfig.testCategories.forEach((cat: any) => traverseAndExtractQuestions(cat));
      }

      // Separate student login accounts database into a dedicated, obfuscated file!
      const studentsList = safeConfig.students || [];
      const studentsJsonString = JSON.stringify(studentsList);
      const scrambledStudents = encodeObfuscatedDatabase(studentsJsonString);

      // Clear students array in the main config chunks so student accounts are decoupled completely!
      safeConfig.students = [];

      // Scramble config data with Devanagari translation to seamlessly split and embed R2 fetch
      const jsonString = JSON.stringify(safeConfig);
      const base64String = encodeObfuscatedDatabase(jsonString);
      
      const chunkSize = 5000000;
      const chunks: string[] = [];
      for (let i = 0; i < base64String.length; i += chunkSize) {
        chunks.push(base64String.substring(i, i + chunkSize));
      }

      // Generate HTML with embedded base64 config, making it truly standalone and easily retrievable
      let htmlContent = generateStudentHTML(standaloneConfig, standaloneBase64, window.location.origin);
      const buildId = "prayas_build_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9);
      const loaderScript = `<script>\n        window.__studentAppChunkCount = ${chunks.length};\n        window.__studentAppBuildId = "${buildId}";\n        window.__studentAppStudentsUrl = "https://pub-dc360536e4fb46baa3e3e8719d01793e.r2.dev/students_db.txt";\n    </script>`;
      htmlContent = htmlContent.replace("<!-- __CHUNK_SCRIPTS_PLACEHOLDER__ -->", loaderScript);

      const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
      const dlLink = document.createElement("a");
      dlLink.href = URL.createObjectURL(blob);
      dlLink.download = `${safeConfig.appName.replace(/\s+/g, "_")}_StudentApp.html`;
      document.body.appendChild(dlLink);
      dlLink.click();
      document.body.removeChild(dlLink);

      // Programmatically trigger download of students_db.txt containing separate login registers!
      const studentsBlob = new Blob([scrambledStudents], { type: "text/plain;charset=utf-8" });
      const studentsLink = document.createElement("a");
      studentsLink.href = URL.createObjectURL(studentsBlob);
      studentsLink.download = "students_db.txt";
      document.body.appendChild(studentsLink);
      studentsLink.click();
      document.body.removeChild(studentsLink);

      // Programmatically trigger download of all config_part_*.txt files for easy upload to Cloudflare R2!
      chunks.forEach((chunk, index) => {
        const chunkBlob = new Blob([chunk], { type: "text/plain;charset=utf-8" });
        const chunkLink = document.createElement("a");
        chunkLink.href = URL.createObjectURL(chunkBlob);
        chunkLink.download = `config_part_${index + 1}.txt`;
        document.body.appendChild(chunkLink);
        chunkLink.click();
        document.body.removeChild(chunkLink);
      });

      // Also trigger programmatic download of each split exam questions txt file!
      examQuestionsFiles.forEach((f) => {
        const qBlob = new Blob([f.content], { type: "text/plain;charset=utf-8" });
        const qLink = document.createElement("a");
        qLink.href = URL.createObjectURL(qBlob);
        qLink.download = f.filename;
        document.body.appendChild(qLink);
        qLink.click();
        document.body.removeChild(qLink);
      });
    } catch (err) {
      console.error("Compilation error", err);
      alert("Failed packing components. Verify correct properties entries.");
    }
  };

  // THE ULTRA SPLIT STACK DIGITAL ENGINE COMPILER FOR GITHUB SAFE UPLOADS
  const handleTriggerSplitCompilationAndDownload = async () => {
    try {
      // Keep students database in the compiled split stack ZIP packages as requested by user
      // Prepare a fully safe and robust configuration to prevent any undefined/null crashes
      // Deep clone to prevent mutating UI state
      const clonedConfig = JSON.parse(JSON.stringify(appConfig));

      const safeConfig = {
        ...clonedConfig,
        appName: clonedConfig.appName || "Prayas One Hub",
        logoUrl: clonedConfig.logoUrl || DEFAULT_LOGO_URL,
        studentGreeting: clonedConfig.studentGreeting || "Hi, Aspirant!",
        studentSubGreeting: clonedConfig.studentSubGreeting || "PRAYAS ONE PROFESSIONAL HUB",
        sliders: clonedConfig.sliders || [],
        notifications: clonedConfig.notifications || [],
        popups: clonedConfig.popups || [],
        students: clonedConfig.students || [],
        testCategories: clonedConfig.testCategories || [],
        pdfCategories: clonedConfig.pdfCategories || [],
        social: {
          whatsapp: "",
          telegram: "",
          instagram: "",
          youtube: "",
          paymentQr: "https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=UPI_PAYMENT_PAY@okaxis",
          paymentAmount: "₹499",
          premiumPrice: "₹45",
          premiumDurationText: "3 Months",
          premiumValidityText: "VALID FOR 90 DAYS",
          premiumBenefitsText: "Access to Past Tests, Access to Present Tests, Access to Future Tests, Unlimited Test Attempts",
          hideSourceOnStudent: false,
          qrDownloadText: "Download QR Code",
          qrDownloadLink: "",
          customLinks: [],
          ...(clonedConfig.social || {})
        }
      };

      // Traverse and extract exam questions to separate txt array files
      const examQuestionsFiles: { filename: string; content: string }[] = [];
      const traverseAndExtractQuestions = (node: any) => {
        if (!node) return;
        if (node.test) {
          const test = node.test;
          const testId = test.id;
          if (testId) {
            const questionsSubset = {
              questionsEn: test.questionsEn || [],
              questionsHi: test.questionsHi || [],
              questionsOther: test.questionsOther || {}
            };
            const questionsJsonString = JSON.stringify(questionsSubset);
            const scrambledQuestions = encodeObfuscatedDatabase(questionsJsonString);
            examQuestionsFiles.push({
              filename: `test_questions_${testId}.txt`,
              content: scrambledQuestions
            });

            // Put lightweight indicators
            test.hasSplitQuestions = true;
            test.questionsCount = Math.max(test.questionsEn.length, test.questionsHi.length);
            Object.values(test.questionsOther || {}).forEach((arr: any) => {
              if (arr && arr.length > test.questionsCount) {
                test.questionsCount = arr.length;
              }
            });

            // Null out heavy payloads
            test.questionsEn = [];
            test.questionsHi = [];
            test.questionsOther = {};
          }
        }
        if (node.subCategories && Array.isArray(node.subCategories)) {
          node.subCategories.forEach((sub: any) => traverseAndExtractQuestions(sub));
        }
      };

      if (safeConfig.testCategories && Array.isArray(safeConfig.testCategories)) {
        safeConfig.testCategories.forEach((cat: any) => traverseAndExtractQuestions(cat));
      }

      // Separate student login accounts database into a dedicated, obfuscated file!
      const studentsList = safeConfig.students || [];
      const studentsJsonString = JSON.stringify(studentsList);
      const scrambledStudents = encodeObfuscatedDatabase(studentsJsonString);

      // Clear students array so student accounts are decoupled completely!
      safeConfig.students = [];

      const jsonString = JSON.stringify(safeConfig);
      const base64String = encodeObfuscatedDatabase(jsonString);
      
      // Split into chunks of ~5MB (5,000,000 characters is extremely safe and well below the 20MB limit)
      const chunkSize = 5000000;
      const chunks: string[] = [];
      for (let i = 0; i < base64String.length; i += chunkSize) {
        chunks.push(base64String.substring(i, i + chunkSize));
      }

      // Generate HTML with empty base64 string, as it will be loaded from external files
      let htmlContent = generateStudentHTML(safeConfig, "", window.location.origin);
      
      // Inject chunk count variable & unique build ID into index.html
      const buildId = "prayas_build_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9);
      const loaderScript = `<script>\n        window.__studentAppChunkCount = ${chunks.length};\n        window.__studentAppBuildId = "${buildId}";\n        window.__studentAppStudentsUrl = "https://pub-dc360536e4fb46baa3e3e8719d01793e.r2.dev/students_db.txt";\n    </script>`;
      htmlContent = htmlContent.replace("<!-- __CHUNK_SCRIPTS_PLACEHOLDER__ -->", loaderScript);

      // Create ZIP using JSZip
      const zip = new JSZip();
      zip.file("index.html", htmlContent);
      zip.file("students_db.txt", scrambledStudents);

      // Add database txt fragments to ZIP so user can extract and upload them to Cloudflare R2!
      chunks.forEach((chunk, index) => {
        zip.file(`config_part_${index + 1}.txt`, chunk);
      });

      // Add split questions files to the ZIP
      examQuestionsFiles.forEach((f) => {
        zip.file(f.filename, f.content);
      });

      // Include 404.html to handle clean-path URL SPA refresh deep-links on custom domains (prayasone.in)
      const redirect404 = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Parsing Route...</title>
    <script type="text/javascript">
        // Single Page Apps for GitHub Pages
        // MIT License
        // https://github.com/rafgraph/spa-github-pages
        var pathSegmentsToKeep = 0;
        var l = window.location;
        l.replace(
            l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
            l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') +
            '/?/' +
            l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
            (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
            l.hash
        );
    </script>
</head>
<body>
    <p style="font-family: sans-serif; text-align: center; margin-top: 40px; color: #7f8c8d;">Syncing student portal route, please wait...</p>
</body>
</html>`;
      zip.file("404.html", redirect404);

      // DYNAMIC GOOGLE-FRIENDLY SITEMAP AND ROBOTS ENGINE
      const generateSitemapXmlContent = (config: any): string => {
        const baseUrl = "https://prayasone.in";
        
        function toUrlSegment(str: string): string {
          if (!str) return "";
          return str.toString().trim()
            .replace(/[^a-zA-Z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");
        }

        const urls: string[] = [];
        urls.push(baseUrl + "/");

        const allTestCats = config.testCategories || [];
        allTestCats.forEach((cat: any) => {
          const catPath = `${baseUrl}/${toUrlSegment(cat.name)}`;
          urls.push(catPath);
          if (cat.subCategories) {
            cat.subCategories.forEach((sub: any) => {
              const subPath = `${catPath}/${toUrlSegment(sub.name)}`;
              urls.push(subPath);
              if (sub.topics) {
                sub.topics.forEach((topic: any) => {
                  urls.push(`${subPath}/${toUrlSegment(topic.name)}`);
                });
              }
            });
          }
        });

        const allPdfCats = config.pdfCategories || [];
        allPdfCats.forEach((cat: any) => {
          const catPath = `${baseUrl}/${toUrlSegment(cat.name)}`;
          urls.push(catPath);
          if (cat.subCategories) {
            cat.subCategories.forEach((sub: any) => {
              const subPath = `${catPath}/${toUrlSegment(sub.name)}`;
              urls.push(subPath);
              if (sub.topics) {
                sub.topics.forEach((topic: any) => {
                  urls.push(`${subPath}/${toUrlSegment(topic.name)}`);
                });
              }
            });
          }
        });

        const uniqueUrls = Array.from(new Set(urls.filter(Boolean)));
        const urlNodes = uniqueUrls.map(url => {
          const escapedUrl = url.replace(/&/g, "&amp;").replace(/'/g, "&apos;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
          return `  <url>\n    <loc>${escapedUrl}</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.8</priority>\n  </url>`;
        }).join("\n");

        return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlNodes}\n</urlset>`;
      };

      const sitemapXml = generateSitemapXmlContent(safeConfig);
      zip.file("sitemap.xml", sitemapXml);

      const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: https://prayasone.in/sitemap.xml\n`;
      zip.file("robots.txt", robotsTxt);

      const readmeText = `Prayas One Student App - Split Files Exporter (Cloudflare R2 Storage Edition)
========================================================================

FILES LIST IN THIS BUNDLE:
1. index.html                   - Main student testing portal (configured to dynamically fetch DB chunks from R2 Storage).
2. 404.html                     - SPA clean-path router fallback redirect (with prayasone.in/Blackbook/A-Word-Test support!).
3. sitemap.xml                  - Automatically compiled XML Sitemap listing all deep URLs for high SEO rank!
4. robots.txt                   - Robots file explicitly linking the Sitemap location to Google crawler bots.
5. config_part_1.txt, _2.txt... - Database fragment plain text files (to be uploaded to Cloudflare R2).
6. students_db.txt              - Decoupled, dedicated Student Login accounts database!
7. test_questions_*.txt         - Individual exam questions split files (to be uploaded to Cloudflare R2).
8. README.txt                   - This instruction file.

Note: All database fragments, students database, and questions must be uploaded to Cloudflare R2 Storage so they are accessible at:
https://pub-dc360536e4fb46baa3e3e8719d01793e.r2.dev/config_part_*.txt
and
https://pub-dc360536e4fb46baa3e3e8719d01793e.r2.dev/students_db.txt
and
https://pub-dc360536e4fb46baa3e3e8719d01793e.r2.dev/test_questions_*.txt

HOW TO DEPLOY:
1. Extract/Unzip all files in this ZIP archive.
2. Upload the HTML & XML/TXT files (index.html, 404.html, sitemap.xml, robots.txt) directly into your GitHub repository root.
3. Upload all 'config_part_*.txt', 'students_db.txt', AND 'test_questions_*.txt' files directly into your Cloudflare R2 bucket: 'mocktest-data' (making them public).
4. Enable GitHub Pages in your Repository Settings pointing to the main root folder.

HOW TO USE CLEAN DYNAMIC TEST URLs (prayasone.in/Blackbook/A-Word-Test):
Since GitHub Pages is a static site host, direct refreshes on routes like /Blackbook/A-Word-Test normally throw a 404. 
But thanks to the included '404.html' file, it automatically redirects requests back to index.html with query parameters, which then reinstates the pristine URL in the student's address bar without any error! 
Just make sure '404.html' is uploaded next to 'index.html'!

GOOGLE SITE RANKING & SITEMAP:
The 'sitemap.xml' dynamically indexes all your exams, categories, subcategories, and topics.
When uploaded, submit 'https://prayasone.in/sitemap.xml' in Google Search Console to successfully crawl and index all your testing pages!

The application dynamically fetches and reassembles all segments into memory upon startup via Cloudflare R2 Storage fetches!
`;
      zip.file("README.txt", readmeText);

      // Generate ZIP blob and trigger download
      const content = await zip.generateAsync({ type: "blob" });
      const dlLink = document.createElement("a");
      dlLink.href = URL.createObjectURL(content);
      dlLink.download = `${clonedConfig.appName.replace(/\s+/g, "_")}_SplitApp_GitHubSafe.zip`;
      document.body.appendChild(dlLink);
      dlLink.click();
      document.body.removeChild(dlLink);
    } catch (err) {
      console.error("ZIP Packaging error", err);
      alert("Failed packing split archive component.");
    }
  };

  const handleTriggerEncryptedDBOnlyDownload = async () => {
    try {
      // Deep clone to prevent mutating UI state
      const clonedConfig = JSON.parse(JSON.stringify(appConfig));

      const examQuestionsFiles: { filename: string; content: string }[] = [];
      const traverseAndExtractQuestions = (node: any) => {
        if (!node) return;
        if (node.test) {
          const test = node.test;
          const testId = test.id;
          if (testId) {
            const questionsSubset = {
              questionsEn: test.questionsEn || [],
              questionsHi: test.questionsHi || [],
              questionsOther: test.questionsOther || {}
            };
            const questionsJsonString = JSON.stringify(questionsSubset);
            const scrambledQuestions = encodeObfuscatedDatabase(questionsJsonString);
            examQuestionsFiles.push({
              filename: `test_questions_${testId}.txt`,
              content: scrambledQuestions
            });

            // Put lightweight indicators
            test.hasSplitQuestions = true;
            test.questionsCount = Math.max(test.questionsEn.length, test.questionsHi.length);
            Object.values(test.questionsOther || {}).forEach((arr: any) => {
              if (arr && arr.length > test.questionsCount) {
                test.questionsCount = arr.length;
              }
            });

            // Null out heavy payloads
            test.questionsEn = [];
            test.questionsHi = [];
            test.questionsOther = {};
          }
        }
        if (node.subCategories && Array.isArray(node.subCategories)) {
          node.subCategories.forEach((sub: any) => traverseAndExtractQuestions(sub));
        }
      };

      if (clonedConfig.testCategories && Array.isArray(clonedConfig.testCategories)) {
        clonedConfig.testCategories.forEach((cat: any) => traverseAndExtractQuestions(cat));
      }

      const jsonString = JSON.stringify(clonedConfig);
      const base64String = encodeObfuscatedDatabase(jsonString);
      
      // Split into chunks of ~5MB (5,000,000 characters is extremely safe and well below the 20MB limit)
      const chunkSize = 5000000;
      const chunks: string[] = [];
      for (let i = 0; i < base64String.length; i += chunkSize) {
        chunks.push(base64String.substring(i, i + chunkSize));
      }

      // Create ZIP using JSZip containing ONLY config_part_*.txt files!
      const zip = new JSZip();
      chunks.forEach((chunk, index) => {
        zip.file(`config_part_${index + 1}.txt`, chunk);
      });

      // Add split questions files to the ZIP
      examQuestionsFiles.forEach((f) => {
        zip.file(f.filename, f.content);
      });

      const readmeText = `Prayas One Student App - Encrypted Database Only Backup ZIP
========================================================================

This ZIP file contains the encrypted plain-text Database chunks of your application config, along with separate split test questions list.
You can import this ZIP back into the administrator dashboard to restore your exact states.

FILES LIST IN THIS BUNDLE:
1. config_part_1.txt, _2.txt... - Encrypted database fragments (scrambled Devanagari format, under 5MB).
2. test_questions_*.txt         - Encrypted split exam questions list files.
`;
      zip.file("README_Backup_Instructions.txt", readmeText);

      // Generate ZIP blob and trigger download
      const content = await zip.generateAsync({ type: "blob" });
      const dlLink = document.createElement("a");
      dlLink.href = URL.createObjectURL(content);
      dlLink.download = `${clonedConfig.appName.replace(/\s+/g, "_")}_Encrypted_DB_Only.zip`;
      document.body.appendChild(dlLink);
      dlLink.click();
      document.body.removeChild(dlLink);
    } catch (err) {
      console.error("ZIP DB Packaging error", err);
      alert("Failed packing database only zip.");
    }
  };

  // Fetching target node's test/pdf configurations for side settings drawer
  const findActiveNodeData = () => {
    if (!editingNodeId || !editingNodeType) return null;
    const targetCats = editNodeCategoryContext === "test" ? appConfig.testCategories : appConfig.pdfCategories;

    for (const cat of targetCats) {
      if (editingNodeType === "category" && cat.id === editingNodeId) return cat;
      for (const sub of cat.subCategories) {
        if (editingNodeType === "subcategory" && sub.id === editingNodeId) return sub;
        for (const top of sub.topics) {
          if (editingNodeType === "topic" && top.id === editingNodeId) return top;
        }
      }
    }
    return null;
  };

  const activeNodeData = findActiveNodeData();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F4F7FA] text-slate-800 font-sans antialiased relative">
      
      {/* MOBILE HEADER BAR */}
      <div className="md:hidden flex items-center justify-between bg-white px-5 py-4 border-b border-gray-200 shadow-xs shrink-0 sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#FF6B35] rounded-lg flex items-center justify-center text-white font-bold text-base">P1</div>
          <div>
            <span className="font-extrabold text-sm uppercase tracking-tight text-gray-800 block">Prayas One</span>
            <span className="text-[8px] text-gray-400 font-mono tracking-wider -mt-1 block">STUDIO ADMIN</span>
          </div>
        </div>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-gray-600 hover:text-gray-900 bg-slate-50 rounded-lg border border-gray-200 outline-none flex items-center justify-center"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* MOBILE QUICK BOTTOM/TOP NAV RIBBON */}
      <div className="md:hidden flex items-center gap-1.5 overflow-x-auto px-4 py-2 bg-white border-b border-gray-150 sticky top-[68px] z-30 shadow-xs no-scrollbar">
        {[
          { id: "general", label: "General", icon: Smartphone },
          { id: "sliders", label: "Sliders", icon: Sliders },
          { id: "notifications", label: "Notices", icon: BadgeAlert },
          { id: "popups", label: "Popups", icon: Megaphone },
          { id: "tests", label: "Tests Library", icon: FolderOpen, context: "test" },
          { id: "pdfs", label: "PDFs Library", icon: FileSpreadsheet, context: "pdf" },
          { id: "students", label: "Students", icon: Users },
          { id: "payment", label: "Payments", icon: QrCode }
        ].map(t => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => {
                setActiveTab(t.id);
                if (t.context) setEditNodeCategoryContext(t.context as any);
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider whitespace-nowrap transition-all border outline-none cursor-pointer ${
                isActive 
                  ? "bg-[#FF6B35] text-white border-[#FF6B35] shadow-xs scale-102" 
                  : "bg-slate-50 text-gray-500 border-gray-200 hover:bg-slate-100"
              }`}
            >
              <t.icon className="w-3.5 h-3.5 shrink-0" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* BACKDROP BLUR OVERLAY ON MOBILE */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* LEFT PRIMARY STUDIO SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 flex flex-col shrink-0 text-slate-800 shadow-lg md:shadow-sm transition-transform duration-300 md:static md:translate-x-0 ${
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:flex"
      }`}>
        <div className="p-6 mb-4 border-b border-gray-150 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FF6B35] rounded-xl flex items-center justify-center text-white font-bold text-xl shrink-0">P1</div>
            <div>
              <h1 className="font-extrabold text-base tracking-tight text-gray-800 uppercase">Prayas One</h1>
              <p className="text-[10px] text-gray-400 font-medium font-mono uppercase tracking-widest">Ultimate Builder</p>
            </div>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="p-1 px-2 md:hidden text-gray-400 hover:text-gray-650 bg-gray-50 rounded-lg border border-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
          <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-4 px-2">Admin Dashboard</div>
          
          <button
            onClick={() => { setActiveTab("general"); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              activeTab === "general" ? "bg-[#F4F7FA] text-[#FF6B35]" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Smartphone className="w-4.5 h-4.5" />
            <span>General Identity</span>
          </button>

          <button
            onClick={() => { setActiveTab("sliders"); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              activeTab === "sliders" ? "bg-[#F4F7FA] text-[#FF6B35]" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Sliders className="w-4.5 h-4.5" />
            <span>Image Carousel</span>
          </button>

          <button
            onClick={() => { setActiveTab("notifications"); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              activeTab === "notifications" ? "bg-[#F4F7FA] text-[#FF6B35]" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <BadgeAlert className="w-4.5 h-4.5" />
            <span>Notice Broadcast</span>
          </button>

          <button
            onClick={() => { setActiveTab("popups"); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              activeTab === "popups" ? "bg-[#F4F7FA] text-[#FF6B35]" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Megaphone className="w-4.5 h-4.5" />
            <span>Website Pop-ups</span>
          </button>

          <button
            onClick={() => { setActiveTab("tests"); setEditNodeCategoryContext("test"); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              activeTab === "tests" ? "bg-[#F4F7FA] text-[#FF6B35]" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <FolderOpen className="w-4.5 h-4.5" />
            <span>Tests Catalog Library</span>
          </button>

          <button
            onClick={() => { setActiveTab("pdfs"); setEditNodeCategoryContext("pdf"); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              activeTab === "pdfs" ? "bg-[#F4F7FA] text-[#FF6B35]" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <FileSpreadsheet className="w-4.5 h-4.5" />
            <span>PDFs Catalog Library</span>
          </button>

          <button
            onClick={() => { setActiveTab("students"); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              activeTab === "students" ? "bg-[#F4F7FA] text-[#FF6B35]" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Users className="w-4.5 h-4.5" />
            <span>Students Database</span>
          </button>

          <button
            onClick={() => { setActiveTab("payment"); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              activeTab === "payment" ? "bg-[#F4F7FA] text-[#FF6B35]" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <QrCode className="w-4.5 h-4.5" />
            <span>Social & Payments</span>
          </button>

          <button
            onClick={() => { setActiveTab("logs"); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              activeTab === "logs" ? "bg-[#F4F7FA] text-[#FF6B35]" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <History className="w-4.5 h-4.5" />
            <span>Activity Logs</span>
          </button>

          <button
            onClick={() => { setActiveTab("backups"); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              activeTab === "backups" ? "bg-[#F4F7FA] text-[#FF6B35]" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Database className="w-4.5 h-4.5" />
            <span>Database Backups</span>
          </button>
        </nav>

        <div className="p-3 border-t border-gray-150 space-y-2.5 bg-slate-50 rounded-xl mx-2 my-3 border border-slate-200">
          <span className="text-[9px] font-extrabold uppercase text-gray-500 tracking-wider block text-center">
            {"\ud83d\udee0\ufe0f"} Student Portal Compiler
          </span>
          
          <div className="space-y-1.5">
            <button
              onClick={handleTriggerFinalCompilationAndDownload}
              className="w-full bg-slate-800 hover:bg-slate-900 text-white py-2.5 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              title="Download as a single self-contained offline HTML file (Best for <20MB apps)"
            >
              <Download className="w-4 h-4" />
              <span>1. Single HTML (Offline)</span>
            </button>

            <button
              onClick={handleTriggerSplitCompilationAndDownload}
              className="w-full bg-[#FF6B35] hover:bg-[#e05621] text-white py-2.5 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              title="Download split files in a ZIP (index.html + smaller config fragments under 5MB). Prevents GitHub upload limits!"
            >
              <Database className="w-4 h-4" />
              <span>2. Split ZIP (GitHub Safe)</span>
            </button>

            <button
              onClick={handleTriggerEncryptedDBOnlyDownload}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-2.5 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              title="Download only the database text files in encrypted Devanagari format inside a ZIP"
            >
              <FileText className="w-4 h-4" />
              <span>3. Encrypted DB Only (Zip)</span>
            </button>
          </div>
          
          <p className="text-[9px] text-gray-400 text-center leading-normal px-1">
            Choose <strong>Split ZIP</strong> if you have massive text logs or questions to instantly bypass GitHub's 20MB file upload limits.
          </p>
          
          <div className="pt-2 border-t border-gray-1.50">
            <button
              onClick={handleResetDefaults}
              className="w-full bg-white hover:bg-gray-100 text-gray-500 py-1.5 px-2 rounded-lg font-semibold text-[9px] uppercase tracking-wide transition-all border border-gray-200 cursor-pointer text-center block"
            >
              Reset Settings
            </button>
          </div>

          <div className="pt-2 border-t border-gray-150 space-y-1">
            <span className="text-[8px] font-black uppercase text-gray-400 tracking-wider block text-center">
              {"\ud83d\udd04"} RETRIEVE & UPDATE APP
            </span>
            <div className="relative border border-dashed border-gray-300 rounded-xl p-3 bg-white hover:bg-slate-50 transition-all text-center cursor-pointer">
              <input
                type="file"
                accept=".html,.zip,.txt"
                multiple={true}
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    handleImportMultipleFiles(Array.from(files));
                  }
                }}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <span className="text-[10px] font-extrabold text-[#FF6B35] block">
                Upload HTML, Zip or Multiple Parts
              </span>
              <span className="text-[8px] text-gray-400 block mt-0.5 leading-snug">
                Supports single HTML, Split ZIP, or multiple "config_part_*.txt" + "test_questions_*.txt" files together to fully reconstruct state
              </span>
            </div>
          </div>
        </div>
      </aside>


      {/* MAIN STUDIO WORKSPACE */}
      <main className="flex-grow p-4 md:p-8 overflow-y-auto w-full max-w-full min-w-0">
        
        {/* HEADER BRANDING BANNER */}
        <header className="flex justify-between items-center mb-8 border-b border-gray-150 pb-5">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">App Builder Preview</h2>
            <p className="text-sm text-gray-500 font-medium">Real-time student application mockup builder</p>
          </div>
          <div className="flex gap-2">
            <span className="bg-emerald-50 text-emerald-700 text-xs font-extrabold uppercase px-3 py-1.5 rounded-xl border border-emerald-100 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> STATUS: ACTIVE
            </span>
          </div>
        </header>


        {/* ROUTING CORRESPONDING BLOCKS VIEW */}

        {/* 1. GENERAL APP IDENTITIES */}
        {activeTab === "general" && (
          <section className="space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">Header & Logo Identifiers</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-2">Application Header Logo (URL)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={appConfig.logoUrl}
                      onChange={(e) => handleUpdateGeneralFields("logoUrl", e.target.value)}
                      className="flex-grow bg-slate-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:bg-white transition-all outline-none text-slate-800 font-semibold"
                    />
                    <button
                      type="button"
                      onClick={() => handleUploadLocalImage((b64) => handleUpdateGeneralFields("logoUrl", b64))}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 border border-gray-200 text-slate-700 text-xs font-bold rounded-xl active:scale-95 transition cursor-pointer shrink-0 flex items-center gap-1"
                      title="Upload custom logo image from local files"
                    >
                      📁 Upload
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">Provide absolute URL keys or upload local logo file.</p>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-2">Aspirant Panel Welcome Greeting</label>
                  <input
                    type="text"
                    value={appConfig.studentGreeting}
                    onChange={(e) => handleUpdateGeneralFields("studentGreeting", e.target.value)}
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:bg-white transition-all outline-none text-slate-800 font-semibold"
                  />
                  <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">Custom welcome text displayed prominently on landing dashboards.</p>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-2">Aspirant Panel Sub Greeting</label>
                  <input
                    type="text"
                    value={appConfig.studentSubGreeting || ""}
                    onChange={(e) => handleUpdateGeneralFields("studentSubGreeting", e.target.value)}
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:bg-white transition-all outline-none text-slate-800 font-semibold"
                    placeholder="PRAYAS ONE PROFESSIONAL HUB"
                  />
                  <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">Displays right below the welcome greeting heading.</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-5 border border-gray-100 flex items-center gap-4">
                <img src={appConfig.logoUrl} alt="Preview Logo" className="w-16 h-16 object-cover rounded-xl border border-gray-200 bg-white" onError={(e) => { (e.target as any).src = DEFAULT_LOGO_URL; }} />
                <div>
                  <h4 className="font-bold text-sm text-slate-800">Visual Identification Profile</h4>
                  <p className="text-xs text-gray-500 leading-normal mt-0.5">This symbol repeats on locked watermarks, exam grids, and student certificates inside generated apps.</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 2. IMAGE SLIDERS SETUP */}
        {activeTab === "sliders" && (
          <section className="space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Dynamic 21:9 Landing Sliders</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Add promotional banners with auto-scroll and customizable touch action redirection links.</p>
                </div>
                <button
                  onClick={handleAddSlider}
                  className="bg-[#111827] hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 cursor-pointer transition-all shadow-md"
                >
                  <Plus className="w-4 h-4" /> Add Banner
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {appConfig.sliders.map((slide, index) => (
                  <div key={slide.id} className="border border-gray-150 rounded-2xl p-5 hover:border-[#FF6B35] transition-all bg-slate-50 flex flex-col md:flex-row gap-5 relative">
                    <div className="absolute top-4 right-14 flex items-center gap-1">
                      <button
                        onClick={() => handleMoveSlider(slide.id, "up")}
                        disabled={index === 0}
                        className="text-gray-400 hover:text-[#FF6B35] disabled:opacity-30 p-1 bg-white hover:bg-slate-50 border border-gray-100 rounded-full cursor-pointer"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveSlider(slide.id, "down")}
                        disabled={index === appConfig.sliders.length - 1}
                        className="text-gray-400 hover:text-[#FF6B35] disabled:opacity-30 p-1 bg-white hover:bg-slate-50 border border-gray-100 rounded-full cursor-pointer"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleDeleteSliderItem(slide.id)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-red-500 p-1 bg-white hover:bg-red-50 rounded-full border border-gray-100 placeholder-hide cursor-pointer"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>

                    <div className="w-full md:w-56 shrink-0 aspect-[21/9] rounded-xl overflow-hidden border border-gray-200 bg-white shadow-xs">
                      <img src={slide.image} alt="Slider" className="w-full h-full object-cover" onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600"; }} />
                    </div>

                    <div className="flex-grow space-y-3">
                      <div>
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Slide Image (URL)</label>
                        <div className="flex gap-2 mt-1">
                          <input
                            type="text"
                            value={slide.image}
                            onChange={(e) => handleUpdateSliderItem(slide.id, "image", e.target.value)}
                            className="flex-grow bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleUploadLocalImage((b64) => handleUpdateSliderItem(slide.id, "image", b64))}
                            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 border border-gray-205 text-slate-700 text-xs font-bold rounded-xl active:scale-95 transition cursor-pointer flex items-center justify-center shrink-0"
                            title="Upload banner image file"
                          >
                            📁 Upload
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Alt Overlay Title</label>
                          <input
                            type="text"
                            value={slide.title}
                            onChange={(e) => handleUpdateSliderItem(slide.id, "title", e.target.value)}
                            className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Redirect URL (opens on hover selection)</label>
                          <input
                            type="text"
                            value={slide.link}
                            onChange={(e) => handleUpdateSliderItem(slide.id, "link", e.target.value)}
                            className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black uppercase text-[#FF6B35] tracking-wider font-bold">Schedule Availability (Optional)</label>
                          <input
                            type="datetime-local"
                            value={slide.scheduledAt || ""}
                            onChange={(e) => handleUpdateSliderItem(slide.id, "scheduledAt", e.target.value)}
                            className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {appConfig.sliders.length === 0 && (
                  <div className="py-12 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-slate-50 text-gray-400 font-bold">
                    No banners configured. App will fall-back to defaults.
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 3. NOTICE BROADCAST LISTS */}
        {activeTab === "notifications" && (
          <section className="space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Notice Alerts Feed Broadcast</h3>
                  <p className="text-xs text-gray-500 mt-0.5 font-medium">Post gorgeous alert notifications featuring imagery banners, custom action buttons, and redirect link cards.</p>
                </div>
                <button
                  onClick={handleAddNotification}
                  className="bg-[#111827] hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 cursor-pointer transition-all shadow-md"
                >
                  <Plus className="w-4 h-4" /> Add Notice Card
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {appConfig.notifications.map((notif, index) => (
                  <div key={notif.id} className="border border-gray-150 rounded-2xl p-5 hover:border-[#FF6B35] transition-all bg-slate-50 flex flex-col md:flex-row gap-5 relative">
                    <div className="absolute top-4 right-14 flex items-center gap-1">
                      <button
                        onClick={() => handleMoveNotification(notif.id, "up")}
                        disabled={index === 0}
                        className="text-gray-400 hover:text-[#FF6B35] disabled:opacity-30 p-1 bg-white hover:bg-slate-50 border border-gray-100 rounded-full cursor-pointer"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveNotification(notif.id, "down")}
                        disabled={index === appConfig.notifications.length - 1}
                        className="text-gray-400 hover:text-[#FF6B35] disabled:opacity-30 p-1 bg-white hover:bg-slate-50 border border-gray-100 rounded-full cursor-pointer"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleDeleteNotificationItem(notif.id)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-red-500 p-1 bg-white hover:bg-red-50 rounded-full border border-gray-100 cursor-pointer"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>

                    <div className="w-full md:w-44 shrink-0 aspect-video rounded-xl overflow-hidden border border-gray-200 bg-white">
                      <img src={notif.image} alt="Alert banner" className="w-full h-full object-cover" onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400"; }} />
                    </div>

                    <div className="flex-grow space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Alert Heading Title</label>
                          <input
                            type="text"
                            value={notif.title}
                            onChange={(e) => handleUpdateNotificationItem(notif.id, "title", e.target.value)}
                            className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Alert Image (URL)</label>
                          <div className="flex gap-2 mt-1">
                            <input
                              type="text"
                              value={notif.image}
                              onChange={(e) => handleUpdateNotificationItem(notif.id, "image", e.target.value)}
                              className="flex-grow bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => handleUploadLocalImage((b64) => handleUpdateNotificationItem(notif.id, "image", b64))}
                              className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 border border-gray-205 text-slate-700 text-xs font-bold rounded-xl active:scale-95 transition cursor-pointer flex items-center justify-center shrink-0"
                              title="Upload notification image"
                            >
                              📁 Upload
                            </button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Message Description Content</label>
                        <textarea
                          rows={2}
                          value={notif.message}
                          onChange={(e) => handleUpdateNotificationItem(notif.id, "message", e.target.value)}
                          className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Action Button Label</label>
                          <input
                            type="text"
                            value={notif.buttonName}
                            onChange={(e) => handleUpdateNotificationItem(notif.id, "buttonName", e.target.value)}
                            className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Action Link Redirect Address</label>
                          <input
                            type="text"
                            value={notif.link}
                            onChange={(e) => handleUpdateNotificationItem(notif.id, "link", e.target.value)}
                            className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black uppercase text-[#FF6B35] tracking-wider font-bold">Schedule Notices (Optional)</label>
                          <input
                            type="datetime-local"
                            value={notif.scheduledAt || ""}
                            onChange={(e) => handleUpdateNotificationItem(notif.id, "scheduledAt", e.target.value)}
                            className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {appConfig.notifications.length === 0 && (
                   <div className="py-12 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-slate-50 text-gray-400 font-bold">
                    No active notices created. App alert feeds will download empty.
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* WEBSITE ANNOUNCEMENT POPUPS MANAGEMENT PANEL */}
        {activeTab === "popups" && (
          <section className="space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Website Announcement Pop-ups</h3>
                  <p className="text-xs text-gray-500 mt-0.5 font-medium">Create unlimited, highly converting 1:1 image action pop-ups that load immediately when students boot the app. Schedule active timing windows, specify priority sequence orders, and redirect actions.</p>
                </div>
                <button
                  onClick={handleAddWebsitePopup}
                  className="bg-[#111827] hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 cursor-pointer transition-all shadow-md animate-fade-in"
                >
                  <Megaphone className="w-4 h-4" />
                  <span>Create Popup Card</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {(appConfig.popups || []).map((popup) => (
                  <div key={popup.id} className="bg-slate-50 border border-gray-200 rounded-3xl p-5 relative flex flex-col justify-between hover:border-gray-300 transition-all duration-300 shadow-xs">
                    <button
                      onClick={() => handleDeleteWebsitePopup(popup.id)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all"
                      title="Delete popup option"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="space-y-4">
                      {/* Live Demo Preview of the Pop-up with a 1:1 Aspect Ratio Banners */}
                      <div>
                        <div className="text-[10px] font-black uppercase text-indigo-600 mb-2 flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" /> Live 1:1 Simulated View
                        </div>
                        <div className="border border-gray-200 bg-white rounded-2xl overflow-hidden shadow-xs max-w-[210px] mx-auto p-3">
                          {/* 1:1 Aspect Ratio image container */}
                          <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center relative">
                            {popup.imageUrl ? (
                              <img
                                src={popup.imageUrl}
                                alt="preview"
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <span className="text-[10px] text-gray-400 font-bold">1:1 Image Ratio</span>
                            )}
                            <div className="absolute top-1 right-1 bg-black/60 backdrop-blur-xs text-white rounded-full p-1 leading-none text-[8px] font-bold">
                              &times;
                            </div>
                          </div>
                          <div className="p-2 text-center text-gray-800">
                            <h4 className="font-extrabold text-[11px] truncate">{popup.title || "Untitled Announcement"}</h4>
                            <p className="text-[9px] text-gray-500 line-clamp-2 mt-0.5 leading-snug">{popup.text || "Your promotional subtitle description content here..."}</p>
                            {popup.redirectUrl && (
                              <div className="mt-1.5 inline-block text-[8px] bg-[#FF6B35] text-white font-bold px-2 py-0.5 rounded uppercase font-mono tracking-wider">
                                {popup.buttonName || "Explore Details"} &rarr;
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Inputs controls */}
                      <div className="grid grid-cols-1 gap-3 pt-3 border-t border-gray-200">
                        <div>
                          <label className="text-[9px] font-black uppercase text-gray-400 tracking-wider">Card Title</label>
                          <input
                            type="text"
                            value={popup.title || ""}
                            onChange={(e) => handleUpdateWebsitePopup(popup.id, "title", e.target.value)}
                            className="w-full mt-1 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-bold outline-none"
                            placeholder="Offer Header text..."
                          />
                        </div>

                        <div>
                          <label className="text-[9px] font-black uppercase text-gray-400 tracking-wider">Description Submessage Text</label>
                          <textarea
                            value={popup.text || ""}
                            onChange={(e) => handleUpdateWebsitePopup(popup.id, "text", e.target.value)}
                            className="w-full mt-1 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold outline-none h-16 resize-none"
                            placeholder="Write message copy detailing offer perks..."
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[9px] font-black uppercase text-gray-400 tracking-wider">Image (1:1 Ratio Url)</label>
                            <div className="flex gap-1 mt-1">
                              <input
                                type="text"
                                value={popup.imageUrl || ""}
                                onChange={(e) => handleUpdateWebsitePopup(popup.id, "imageUrl", e.target.value)}
                                className="flex-grow bg-white border border-gray-200 rounded-lg px-2 py-1 text-[10px] outline-none font-mono"
                                placeholder="Image Link..."
                              />
                              <button
                                type="button"
                                onClick={() => handleUploadLocalImage((b64) => handleUpdateWebsitePopup(popup.id, "imageUrl", b64))}
                                className="px-1.5 py-1 bg-slate-100 hover:bg-slate-200 border border-gray-205 text-slate-700 text-[10px] font-bold rounded-lg active:scale-95 transition cursor-pointer flex items-center justify-center shrink-0"
                                title="Upload popup graphic"
                              >
                                📁 Up
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="text-[9px] font-black uppercase text-gray-400 tracking-wider">Action CTA Redirect URL</label>
                            <input
                              type="text"
                              value={popup.redirectUrl || ""}
                              onChange={(e) => handleUpdateWebsitePopup(popup.id, "redirectUrl", e.target.value)}
                              className="w-full mt-1 bg-white border border-gray-200 rounded-lg px-2 py-1 text-[10px] outline-none font-mono"
                              placeholder="#premium or website links..."
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 bg-slate-100/40 p-2 text-[10px] rounded-xl border border-gray-150">
                          <div>
                            <label className="text-[9px] font-black uppercase text-gray-400 tracking-wider block">Button CTA Name</label>
                            <input
                              type="text"
                              value={popup.buttonName || ""}
                              onChange={(e) => handleUpdateWebsitePopup(popup.id, "buttonName", e.target.value)}
                              className="w-full mt-1 bg-white border border-gray-200 rounded px-1.5 py-1 text-[10px] outline-none"
                              placeholder="Explore Details..."
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-black uppercase text-gray-400 tracking-wider block">Show To Audience</label>
                            <select
                              value={popup.showTo || "all"}
                              onChange={(e) => handleUpdateWebsitePopup(popup.id, "showTo", e.target.value)}
                              className="w-full mt-1 bg-white border border-gray-200 rounded px-1.5 py-1 text-[10px] outline-none font-bold"
                            >
                              <option value="all">All Users</option>
                              <option value="paid">Only Paid Users</option>
                              <option value="free">Only Free Users</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 bg-white/60 p-2 text-[10px] rounded-xl border border-gray-150">
                          <div>
                            <label className="text-[9px] font-black uppercase text-gray-500 tracking-wider block">Start Active Schedule</label>
                            <input
                              type="datetime-local"
                              value={popup.startTime || ""}
                              onChange={(e) => handleUpdateWebsitePopup(popup.id, "startTime", e.target.value)}
                              className="w-full mt-1 bg-white border border-gray-200 rounded px-1.5 py-1 text-[10px] outline-none font-bold"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-black uppercase text-gray-500 tracking-wider block">End Expire Schedule</label>
                            <input
                              type="datetime-local"
                              value={popup.endTime || ""}
                              onChange={(e) => handleUpdateWebsitePopup(popup.id, "endTime", e.target.value)}
                              className="w-full mt-1 bg-white border border-gray-200 rounded px-1.5 py-1 text-[10px] outline-none font-bold"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={popup.isActive ?? true}
                              onChange={(e) => handleUpdateWebsitePopup(popup.id, "isActive", e.target.checked)}
                              className="rounded text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">Status Active</span>
                          </label>

                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] font-bold uppercase text-gray-400">Sequence Order:</span>
                            <input
                              type="number"
                              value={popup.order || 0}
                              onChange={(e) => handleUpdateWebsitePopup(popup.id, "order", parseInt(e.target.value) || 0)}
                              className="w-12 bg-white border border-gray-200 rounded text-center py-0.5 text-xs font-black outline-none"
                              min="1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {(appConfig.popups || []).length === 0 && (
                  <div className="col-span-2 py-16 text-center border-2 border-dashed border-gray-200 rounded-3xl bg-slate-50 text-gray-400 font-bold">
                    No website active popups configured yet. Click "Create Popup Card" above to bootstrap one!
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 4. EXAM TESTS AND PDFS HIERARCHICAL TREES CATALOG BUILDERS */}
        {(activeTab === "tests" || activeTab === "pdfs") && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
               {/* TREE DIAGRAM SELECTORS */}
            <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-base font-bold text-gray-900 uppercase tracking-wider">
                    {editNodeCategoryContext === "test" ? "Mock Exams Tree Hierarchy" : "PDF Resources Tree"}
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-0.5 font-medium">Click node elements layout to configure questions parsed tests or PDF keys on panel.</p>
                </div>
                <button
                  onClick={() => handleAddRootCategoryNode(editNodeCategoryContext)}
                  className="bg-[#111827] hover:bg-black text-white text-[10px] font-bold px-3 py-2 rounded-xl uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" /> Category
                </button>
              </div>

              {/* TREE STRUCTURE IMPLEMENTATION */}
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                {(editNodeCategoryContext === "test" ? appConfig.testCategories : appConfig.pdfCategories).map((cat) => (
                  <div key={cat.id} className="border border-gray-200 rounded-2xl overflow-hidden bg-slate-50 shadow-xs">
                    
                    {/* Category root bar banner */}
                    <div className={`px-4 py-3.5 flex items-center justify-between border-b border-gray-100 transition-all ${editingNodeId === cat.id ? "bg-[#FF6B35]/5 border-l-4 border-l-[#FF6B35]" : "bg-white"}`}>
                      <div 
                        onClick={() => { setEditingNodeId(cat.id); setEditingNodeType("category"); }}
                        className="flex items-center gap-3 cursor-pointer flex-grow select-none"
                      >
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleCatExpanded(cat.id); }}
                          className="text-gray-400 hover:text-[#FF6B35] font-bold text-sm transition-all p-1 hover:bg-slate-100 rounded-lg outline-none cursor-pointer"
                        >
                          <FolderOpen className={`w-4.5 h-4.5 text-amber-500 transition-transform ${expandedCats[cat.id] ? "scale-115" : ""}`} />
                        </button>
                        <span
                          className={`font-bold text-sm text-slate-850 hover:text-[#FF6B35] transition-all ${editingNodeId === cat.id ? "text-[#FF6B35] font-extrabold text-[15px]" : ""}`}
                        >
                          {cat.name}
                        </span>

                        {/* Badges indicators */}
                        {cat.test && <span className="text-[9px] bg-[#FF6B35]/15 text-[#FF6B35] px-2 py-0.5 rounded-full font-extrabold uppercase">Exam Loaded</span>}
                        {cat.pdf && <span className="text-[9px] bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full font-extrabold uppercase border border-sky-100">PDF Attached</span>}
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleMoveCategory(cat.id, editNodeCategoryContext, "up")}
                          className="text-gray-400 hover:text-[#FF6B35] p-1 bg-white hover:bg-slate-50 border border-gray-100 rounded-full cursor-pointer"
                          title="Move Cat Up"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleMoveCategory(cat.id, editNodeCategoryContext, "down")}
                          className="text-gray-400 hover:text-[#FF6B35] p-1 bg-white hover:bg-slate-50 border border-gray-100 rounded-full cursor-pointer"
                          title="Move Cat Down"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleAddSubCategoryNode(cat.id, editNodeCategoryContext)}
                          title="Add Sub-category here"
                          className="text-emerald-600 hover:bg-emerald-50 p-1.5 rounded-lg border border-gray-100 bg-white shadow-sm cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        {deleteConfirmId === cat.id ? (
                          <div className="flex items-center gap-1 bg-red-50 border border-red-200 px-2 py-1 rounded-lg">
                            <span className="text-[10px] font-bold text-red-600 uppercase tracking-wide">Delete?</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteNodeItem(cat.id, "category", editNodeCategoryContext, true);
                              }}
                              className="text-[9px] bg-red-600 text-white px-1.5 py-0.5 rounded font-extrabold cursor-pointer"
                            >
                              Yes
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteConfirmId(null);
                              }}
                              className="text-[9px] bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded font-bold cursor-pointer"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteConfirmId(cat.id);
                            }}
                            className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg border border-transparent hover:bg-red-50 cursor-pointer"
                            title="Remove category"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Subcategories sections nested container */}
                    {expandedCats[cat.id] && (
                      <div className="p-4 space-y-3 bg-slate-50/50 border-b border-gray-100">
                        {cat.subCategories.map((sub) => (
                          <div key={sub.id} className="bg-white border border-gray-150 rounded-xl overflow-hidden pl-4 pr-3 py-3 shadow-xs">
                            <div className={`flex items-center justify-between p-1 rounded-xl transition-all ${editingNodeId === sub.id ? "bg-[#FF6B35]/5 border-l-4 border-l-[#FF6B35] pl-2.5" : ""}`}>
                              <div 
                                onClick={() => { setEditingNodeId(sub.id); setEditingNodeType("subcategory"); }}
                                className="flex items-center gap-2 cursor-pointer flex-grow select-none"
                              >
                                <button
                                  onClick={(e) => { e.stopPropagation(); toggleSubExpanded(sub.id); }}
                                  className="text-gray-400 hover:text-[#FF6B35] font-bold text-sm p-1 hover:bg-slate-100 rounded-md outline-none cursor-pointer"
                                >
                                  <Folder className={`w-4 h-4 text-amber-500 transition-transform ${expandedSubs[sub.id] ? "scale-110" : ""}`} />
                                </button>
                                <span
                                  className={`text-xs font-bold text-slate-750 hover:text-[#FF6B35] transition-all ${editingNodeId === sub.id ? "text-[#FF6B35] font-extrabold text-[13px]" : ""}`}
                                >
                                  {sub.name}
                                </span>

                                {sub.test && <span className="text-[8px] bg-[#FF6B35]/15 text-[#FF6B35] px-1.5 py-0.25 rounded-full font-bold uppercase border border-transparent shadow-none">Exam</span>}
                                {sub.pdf && <span className="text-[8px] bg-sky-50 text-sky-700 px-1.5 py-0.25 rounded-full font-bold border border-sky-100 uppercase">PDF</span>}
                              </div>

                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleMoveSubCategory(cat.id, sub.id, editNodeCategoryContext, "up")}
                                  className="text-gray-400 hover:text-[#FF6B35] p-1 bg-white hover:bg-slate-50 border border-gray-100 rounded-full cursor-pointer"
                                  title="Move Sub Up"
                                >
                                  <ArrowUp className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => handleMoveSubCategory(cat.id, sub.id, editNodeCategoryContext, "down")}
                                  className="text-gray-400 hover:text-[#FF6B35] p-1 bg-white hover:bg-slate-50 border border-gray-100 rounded-full cursor-pointer"
                                  title="Move Sub Down"
                                >
                                  <ArrowDown className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => handleAddTopicNode(cat.id, sub.id, editNodeCategoryContext)}
                                  title="Add Topic file under subcategory"
                                  className="text-emerald-600 hover:bg-emerald-50 p-1.5 rounded-lg cursor-pointer"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                                {deleteConfirmId === sub.id ? (
                                  <div className="flex items-center gap-1 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded-lg shrink-0">
                                    <span className="text-[9px] font-bold text-red-600 uppercase">Delete?</span>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteNodeItem(sub.id, "subcategory", editNodeCategoryContext, true);
                                      }}
                                      className="text-[8px] bg-red-600 text-white px-1 py-0.25 rounded font-extrabold cursor-pointer"
                                    >
                                      Yes
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setDeleteConfirmId(null);
                                      }}
                                      className="text-[8px] bg-gray-200 text-gray-700 px-1 py-0.25 rounded font-bold cursor-pointer"
                                    >
                                      No
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setDeleteConfirmId(sub.id);
                                    }}
                                    className="text-gray-400 hover:text-red-500 p-1 rounded-lg cursor-pointer"
                                    title="Remove subcategory"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Topics lists rendered inside */}
                            {expandedSubs[sub.id] && (
                              <div className="mt-2.5 ml-4 border-l-2 border-gray-100 pl-3.5 py-1 space-y-2">
                                {sub.topics.map((top) => (
                                  <div key={top.id} className={`flex items-center justify-between pl-3 pr-2 py-2 rounded-xl border transition-all ${editingNodeId === top.id ? "bg-[#FF6B35]/5 border-[#FF6B35] shadow-xs" : "bg-slate-50 hover:bg-slate-100 border-gray-100"}`}>
                                    <div 
                                      onClick={() => { setEditingNodeId(top.id); setEditingNodeType("topic"); }}
                                      className="flex items-center gap-2 cursor-pointer flex-grow select-none"
                                    >
                                      <FileText className={`w-3.5 h-3.5 text-gray-400 shrink-0 transition-colors ${editingNodeId === top.id ? "text-[#FF6B35]" : ""}`} />
                                      <span
                                        className={`text-[11px] font-semibold text-slate-600 hover:text-[#FF6B35] transition-all ${editingNodeId === top.id ? "text-[#FF6B35] font-extrabold text-[11.5px]" : ""}`}
                                      >
                                        {top.name}
                                      </span>

                                      {top.test && <span className="text-[8px] bg-[#FF6B35]/15 text-[#FF6B35] px-1.25 py-0.15 rounded-full font-bold border border-transparent shadow-none">Exam</span>}
                                      {top.pdf && <span className="text-[8px] bg-sky-50 text-sky-700 px-1.25 py-0.15 rounded-full font-bold border border-sky-100">PDF</span>}
                                    </div>

                                    <div className="flex items-center gap-1 shrink-0">
                                      <button
                                        onClick={() => handleMoveTopic(cat.id, sub.id, top.id, editNodeCategoryContext, "up")}
                                        className="text-gray-400 hover:text-[#FF6B35] p-1 bg-white hover:bg-slate-50 border border-gray-100 rounded-full cursor-pointer"
                                        title="Move Topic Up"
                                      >
                                        <ArrowUp className="w-2.5 h-2.5" />
                                      </button>
                                      <button
                                        onClick={() => handleMoveTopic(cat.id, sub.id, top.id, editNodeCategoryContext, "down")}
                                        className="text-gray-400 hover:text-[#FF6B35] p-1 bg-white hover:bg-slate-50 border border-gray-100 rounded-full cursor-pointer"
                                        title="Move Topic Down"
                                      >
                                        <ArrowDown className="w-2.5 h-2.5" />
                                      </button>
                                      {deleteConfirmId === top.id ? (
                                        <div className="flex items-center gap-1 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded-lg shrink-0">
                                          <span className="text-[8px] font-bold text-red-600">Delete?</span>
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleDeleteNodeItem(top.id, "topic", editNodeCategoryContext, true);
                                            }}
                                            className="text-[8px] bg-red-600 text-white px-1 py-0.25 rounded font-extrabold cursor-pointer"
                                          >
                                            Yes
                                          </button>
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setDeleteConfirmId(null);
                                            }}
                                            className="text-[8px] bg-gray-200 text-gray-700 px-1 py-0.25 rounded font-bold cursor-pointer"
                                            title="Cancel"
                                          >
                                            No
                                          </button>
                                        </div>
                                      ) : (
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setDeleteConfirmId(top.id);
                                          }}
                                          className="text-gray-400 hover:text-red-500 p-1 rounded-lg cursor-pointer"
                                          title="Remove topic"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                ))}

                                {sub.topics.length === 0 && (
                                  <div className="text-[10px] text-gray-400 italic py-1 pl-2 font-medium">Topic shelf is empty.</div>
                                )}
                              </div>
                            )}

                          </div>
                        ))}

                        {cat.subCategories.length === 0 && (
                          <div className="text-[11px] text-gray-400 italic text-center py-4 font-semibold">Sub-categories index is empty. Click + to add nested categories.</div>
                        )}
                      </div>
                    )}

                  </div>
                ))}

                {(editNodeCategoryContext === "test" ? appConfig.testCategories : appConfig.pdfCategories).length === 0 && (
                  <div className="text-center py-16 border-2 border-dashed border-gray-200 bg-slate-50 text-gray-400 rounded-2xl font-black text-sm uppercase tracking-wide">
                    Create your Course Categories. Get started.
                  </div>
                )}
              </div>
            </div>


            {/* SECONDARY SIDE SETTINGS CONFIGURATION PANEL */}
            <div id="node-settings-panel" className="lg:col-span-5 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm min-h-[500px]">
              {editingNodeId && activeNodeData ? (
                <div className="space-y-6">
                  
                  {/* Title identity block */}
                  <div className="border-b border-gray-100 pb-3">
                    <span className="text-[10px] font-black uppercase text-[#FF6B35] tracking-wider">Configure Node Selected</span>
                    <h4 className="text-base font-extrabold text-slate-850">{activeNodeData.name}</h4>
                  </div>

                  {/* 1. Basic node edit inputs */}
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Node Name Title</label>
                      <input
                        type="text"
                        value={activeNodeData.name}
                        onChange={(e) => handleUpdateNodeNameAndImage(editingNodeId, editingNodeType!, editNodeCategoryContext, { name: e.target.value })}
                        className="w-full mt-1 bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:bg-white outline-none"
                      />
                    </div>

                    {editingNodeType !== "topic" && (
                      <div>
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Node Picture Thumbnail URL</label>
                        <div className="flex gap-2 mt-1">
                          <input
                            type="text"
                            value={(activeNodeData as any).image || ""}
                            onChange={(e) => handleUpdateNodeNameAndImage(editingNodeId, editingNodeType!, editNodeCategoryContext, { image: e.target.value })}
                            className="flex-grow bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:bg-white outline-none"
                            placeholder="Image URL"
                          />
                          <button
                            type="button"
                            onClick={() => handleUploadLocalImage((b64) => handleUpdateNodeNameAndImage(editingNodeId, editingNodeType!, editNodeCategoryContext, { image: b64 }))}
                            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 border border-gray-200 text-slate-700 text-xs font-bold rounded-xl active:scale-95 transition cursor-pointer flex items-center justify-center shrink-0"
                            title="Upload category/subcategory image"
                          >
                            📁 Upload
                          </button>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="text-[10px] font-black uppercase text-[#FF6B35] tracking-wider font-bold">Node General Schedule Availability (Optional)</label>
                      <input
                        type="datetime-local"
                        value={(activeNodeData as any).scheduledAt || ""}
                        onChange={(e) => handleUpdateNodeNameAndImage(editingNodeId, editingNodeType!, editNodeCategoryContext, { scheduledAt: e.target.value })}
                        className="w-full mt-1 bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:bg-white outline-none"
                      />
                      <p className="text-[9px] text-gray-400 mt-1 leading-normal">Hides this whole category, subcategory, or topic until the scheduled local date-time.</p>
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase text-[#FF6B35] tracking-wider font-bold">Node Access Restrict Emails (Optional)</label>
                      <textarea
                        value={(activeNodeData as any).onlyUsers || ""}
                        onChange={(e) => handleUpdateNodeNameAndImage(editingNodeId, editingNodeType!, editNodeCategoryContext, { onlyUsers: e.target.value })}
                        className="w-full mt-1 bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:bg-white outline-none resize-none"
                        rows={2}
                        placeholder="e.g. resident1@gmail.com, resident2@gmail.com"
                      />
                      <p className="text-[9px] text-gray-400 mt-1 leading-normal">If populated, this category, subcategory, or topic (and all its tests/PDFs) will only show to aspirants logged in with these email addresses.</p>
                    </div>

                    <div className="border border-indigo-100 p-3 rounded-xl bg-indigo-50/50 mt-2 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase text-[#FF6B35] tracking-wider font-bold block flex items-center gap-1">
                          <Ticket className="w-3.5 h-3.5 text-indigo-650" /> NODE ADVANCED COUPONS
                        </span>
                        {(activeNodeData as any).coupon ? (
                          <button
                            type="button"
                            onClick={() => handleRemoveNodeCoupon(editingNodeId, editingNodeType!, editNodeCategoryContext)}
                            className="text-[8px] uppercase tracking-wider text-red-600 font-extrabold cursor-pointer hover:underline"
                          >
                            Remove
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleAddNodeCoupon(editingNodeId, editingNodeType!, editNodeCategoryContext)}
                            className="text-[8px] uppercase tracking-wider text-indigo-700 font-extrabold cursor-pointer hover:underline"
                          >
                            Add Promo
                          </button>
                        )}
                      </div>

                      {!(activeNodeData as any).coupon ? (
                        <div>
                          <input
                            type="text"
                            placeholder="e.g. FLAT30 (Basic unlock without start/expiry dates)"
                            value={(activeNodeData as any).couponCode || ""}
                            onChange={(e) => handleUpdateNodeNameAndImage(editingNodeId, editingNodeType!, editNodeCategoryContext, { couponCode: e.target.value.toUpperCase() })}
                            className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold uppercase focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none"
                          />
                          <p className="text-[8px] text-gray-400 mt-1">Saves basic coupon string without constraints. Click "Add Promo" for advanced validity validation.</p>
                        </div>
                      ) : (
                        <div className="space-y-2 mt-2 bg-white p-2.5 rounded-lg border border-indigo-100">
                          <div>
                            <label className="text-[8px] font-bold text-indigo-800 block">Promo Code Name</label>
                            <input
                              type="text"
                              value={(activeNodeData as any).coupon.code}
                              onChange={(e) => handleUpdateNodeCoupon(editingNodeId, editingNodeType!, editNodeCategoryContext, "code", e.target.value.toUpperCase())}
                              className="w-full mt-1 bg-slate-50 border border-gray-150 rounded px-2 py-1 text-[10px] font-mono font-bold"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[8px] font-bold text-indigo-800 block">Start Date</label>
                              <input
                                type="date"
                                value={(activeNodeData as any).coupon.startDate}
                                onChange={(e) => handleUpdateNodeCoupon(editingNodeId, editingNodeType!, editNodeCategoryContext, "startDate", e.target.value)}
                                className="w-full mt-1 bg-slate-50 border border-gray-150 rounded px-2 py-1 text-[10px]"
                              />
                            </div>
                            <div>
                              <label className="text-[8px] font-bold text-indigo-800 block">End Expiry Date</label>
                              <input
                                type="date"
                                value={(activeNodeData as any).coupon.endDate}
                                onChange={(e) => handleUpdateNodeCoupon(editingNodeId, editingNodeType!, editNodeCategoryContext, "endDate", e.target.value)}
                                className="w-full mt-1 bg-slate-50 border border-gray-150 rounded px-2 py-1 text-[10px]"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-[8px] font-bold text-indigo-800 block">Attempts Limit (unlimited / integer)</label>
                            <input
                              type="text"
                              value={(activeNodeData as any).coupon.maxAttempts}
                              onChange={(e) => handleUpdateNodeCoupon(editingNodeId, editingNodeType!, editNodeCategoryContext, "maxAttempts", e.target.value)}
                              className="w-full mt-1 bg-slate-50 border border-gray-150 rounded px-2 py-1 text-[10px]"
                            />
                          </div>
                          <p className="text-[8px] text-indigo-500 mt-1">This promo coupon is bound to this node's structure & its tests inside.</p>
                        </div>
                      )}
                    </div>
                  </div>


                  {/* 2. Attach resources toggles */}
                  <div className="border-t border-gray-100 pt-5 space-y-4">
                    <h5 className="text-[11px] font-black uppercase text-gray-400 tracking-wider">Link Applet Resources</h5>
                    
                    <div className="flex flex-col gap-3">
                      
                      {/* MCQ EXAM SETTINGS */}
                      <div className="border border-gray-150 rounded-xl p-4 bg-slate-50 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                            <BookOpen className="w-4 h-4 text-emerald-500" /> Embedded MCQ Exam Test
                          </span>
                          <input
                            type="checkbox"
                            checked={activeNodeData.test !== null}
                            onChange={(e) => handleToggleTestSettingsOnNode(editingNodeId, editingNodeType!, editNodeCategoryContext, e.target.checked)}
                            className="w-4 h-4 rounded text-[#FF6B35] accent-[#FF6B35] cursor-pointer focus:ring-[#FF6B35]"
                          />
                        </div>

                        {activeNodeData.test && (
                          <div className="pt-3 border-t border-gray-200 space-y-4">
                            
                            <div>
                              <label className="text-[9px] font-black uppercase text-gray-400 tracking-wider">Test Display Name Title</label>
                              <input
                                type="text"
                                value={activeNodeData.test.title || ""}
                                onChange={(e) => handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "title", e.target.value)}
                                className="w-full mt-1 bg-white border border-gray-200 rounded-lg px-2.5 py-2 text-[11px] font-bold outline-none"
                              />
                            </div>

                            {/* Parsing MCQ File Upload inputs */}
                            <div className="bg-slate-50 p-4 rounded-xl border border-gray-200 mt-2 space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black uppercase text-gray-500 tracking-wider">{"\ud83d\udce6"} MCQ MULTI-LANGUAGE FILES UPLOADS</span>
                                <div className="flex items-center gap-1.5 mt-2 sm:mt-0">
                                  <input
                                    type="text"
                                    placeholder="e.g. gujarati, marathi"
                                    value={customLangText}
                                    onChange={(e) => setCustomLangText(e.target.value)}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        e.preventDefault();
                                        const langVal = customLangText.trim();
                                        if (!langVal) return;
                                        const normalized = langVal.toLowerCase();
                                        if (normalized === "en" || normalized === "hi") {
                                          alert("Standard English (en) and Hindi (hi) language keys are already active.");
                                          return;
                                        }
                                        const others = activeNodeData.test.questionsOther || {};
                                        if (others[normalized]) {
                                          alert("This language tab already exists.");
                                          setQEditLang(normalized);
                                          return;
                                        }
                                        const updated = {
                                          ...others,
                                          [normalized]: []
                                        };
                                        handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsOther", updated);
                                        setQEditLang(normalized);
                                        setCustomLangText("");
                                      }
                                    }}
                                    className="bg-white border border-gray-300 rounded px-2 py-0.5 text-[11px] outline-none w-28 font-semibold text-gray-800 placeholder-gray-400 focus:border-[#FF6B35] transition-all"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const langVal = customLangText.trim();
                                      if (!langVal) {
                                        alert("Please type a language name first! (e.g. gujarati, marathi)");
                                        return;
                                      }
                                      const normalized = langVal.toLowerCase();
                                      if (normalized === "en" || normalized === "hi") {
                                        alert("Standard English (en) and Hindi (hi) language keys are already active.");
                                        return;
                                      }
                                      const others = activeNodeData.test.questionsOther || {};
                                      if (others[normalized]) {
                                        alert("This language tab already exists.");
                                        setQEditLang(normalized);
                                        return;
                                      }
                                      const updated = {
                                        ...others,
                                        [normalized]: []
                                      };
                                      handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsOther", updated);
                                      setQEditLang(normalized);
                                      setCustomLangText("");
                                    }}
                                    className="bg-[#FF6B35] hover:bg-[#e05621] text-white font-bold text-[9px] px-2.5 py-1 rounded-md uppercase transition-all tracking-wider cursor-pointer"
                                  >
                                    {"\u2795"} Add Language
                                  </button>
                                </div>
                              </div>
                              
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 mt-2 bg-amber-50/50 p-2.5 rounded-xl border border-amber-200/40 select-none">
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={uploadAppendMode}
                                    onChange={(e) => setUploadAppendMode(e.target.checked)}
                                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-gray-300 cursor-pointer"
                                  />
                                  <span className="text-[10px] font-black uppercase text-slate-700 tracking-wider">
                                    {uploadAppendMode ? "➕ Append (Add On) Mode Active" : "🔄 Overwrite (Replace) Mode Active"}
                                  </span>
                                </label>
                                <span className="text-[8px] font-bold text-amber-700">
                                  {uploadAppendMode ? "Selecting multiple files will ADD onto current questions!" : "Warning: New files will DELETE existing questions!"}
                                </span>
                              </div>

                              <p className="text-[9px] text-gray-500 mt-1 leading-snug">
                                Select and upload single or multiple plain text (.txt) or (.html) files. The parser loads items instantly.
                              </p>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                                {/* English */}
                                <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-xs">
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-[9px] font-black uppercase text-[#FF6B35]">ENGLISH (en)</span>
                                    {activeNodeData.test.questionsEn && activeNodeData.test.questionsEn.length > 0 ? (
                                      <span className="text-[9px] text-emerald-600 font-bold font-mono">{"\u2714"} {activeNodeData.test.questionsEn.length} Qs</span>
                                    ) : (
                                      <span className="text-[9px] text-red-500 font-semibold font-mono">Empty</span>
                                    )}
                                  </div>
                                  <input
                                    type="file"
                                    accept=".txt,.html"
                                    multiple={true}
                                    onChange={(e) => handleParserFileAttachment(e, editingNodeId, editingNodeType!, "en", editNodeCategoryContext)}
                                    className="w-full text-[9px] text-gray-500 file:bg-slate-100 file:border-0 file:rounded file:px-2 file:py-1 file:font-semibold cursor-pointer"
                                  />
                                </div>

                                {/* Hindi */}
                                <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-xs">
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-[9px] font-black uppercase text-[#FF6B35]">HINDI (hi)</span>
                                    {activeNodeData.test.questionsHi && activeNodeData.test.questionsHi.length > 0 ? (
                                      <span className="text-[9px] text-emerald-600 font-bold font-mono">{"\u2714"} {activeNodeData.test.questionsHi.length} Qs</span>
                                    ) : (
                                      <span className="text-[9px] text-red-500 font-semibold font-mono">Empty</span>
                                    )}
                                  </div>
                                  <input
                                    type="file"
                                    accept=".txt,.html"
                                    multiple={true}
                                    onChange={(e) => handleParserFileAttachment(e, editingNodeId, editingNodeType!, "hi", editNodeCategoryContext)}
                                    className="w-full text-[9px] text-gray-500 file:bg-slate-100 file:border-0 file:rounded file:px-2 file:py-1 file:font-semibold cursor-pointer"
                                  />
                                </div>

                                {/* Custom Others */}
                                {Object.keys(activeNodeData.test.questionsOther || {}).map((langKey) => {
                                  const count = (activeNodeData.test.questionsOther?.[langKey] || []).length;
                                  return (
                                    <div key={langKey} className="bg-white p-3 rounded-lg border border-gray-200 shadow-xs relative">
                                      <div className="flex justify-between items-center mb-1 pr-6">
                                        <span className="text-[9px] font-black uppercase text-indigo-600">{langKey.toUpperCase()}</span>
                                        {count > 0 ? (
                                          <span className="text-[9px] text-emerald-600 font-bold font-mono">{"\u2714"} {count} Qs</span>
                                        ) : (
                                          <span className="text-[9px] text-red-500 font-semibold font-mono">Empty</span>
                                        )}
                                      </div>
                                      <input
                                        type="file"
                                        accept=".txt,.html"
                                        multiple={true}
                                        onChange={(e) => handleParserFileAttachment(e, editingNodeId, editingNodeType!, langKey, editNodeCategoryContext)}
                                        className="w-full text-[9px] text-gray-500 file:bg-gray-100 file:border-0 file:rounded file:px-2 file:py-1 file:font-semibold cursor-pointer"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => {
                                          if (confirm(`Remove ${langKey.toUpperCase()} questions entirely?`)) {
                                            const updated = { ...(activeNodeData.test.questionsOther || {}) };
                                            delete updated[langKey];
                                            handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsOther", updated);
                                          }
                                        }}
                                        className="absolute top-2 right-2 text-red-400 hover:text-red-600 font-bold text-base cursor-pointer px-1 outline-none"
                                        title={`Delete ${langKey}`}
                                      >
                                        &times;
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            <p className="text-[8px] text-amber-600 font-extrabold leading-relaxed text-center block mt-1">
                              * Format support: splitting on digit indexes blocks. Include ✅ symbol inside the correct answer row. Ex: for explanation text.
                            </p>

                            <div className="flex items-center gap-2 bg-amber-50/70 p-3 rounded-xl border border-amber-200 mt-1 mb-2">
                              <input
                                type="checkbox"
                                id="showSourceOnStudentNode"
                                checked={!appConfig.social.hideSourceOnStudent}
                                onChange={(e) => handleUpdateSocialPaymentGroup("hideSourceOnStudent", !e.target.checked)}
                                className="w-4.5 h-4.5 rounded border-gray-300 text-[#FF6B35] focus:ring-[#FF6B35] cursor-pointer"
                              />
                              <div>
                                <label htmlFor="showSourceOnStudentNode" className="block text-[10px] font-extrabold text-slate-800 uppercase tracking-wider cursor-pointer">{"\u2714\ufe0f"} Show Source: Display Question Source/Reference to Students</label>
                                <p className="text-[9px] text-gray-500 mt-0.5 leading-tight">If ticked/checked, question source links and references will be visible on the student's test engine analysis screen.</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-[9px] font-black uppercase text-gray-400 tracking-wider">Exam Period (Min)</label>
                                <input
                                  type="number"
                                  value={activeNodeData.test.duration}
                                  onChange={(e) => handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "duration", parseInt(e.target.value) || 60)}
                                  className="w-full mt-1 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs outline-none"
                                />
                              </div>
                              <div>
                                <label className="text-[9px] font-black uppercase text-gray-400 tracking-wider">Free Tries Limit</label>
                                <input
                                  type="number"
                                  value={activeNodeData.test.freeAttempts}
                                  onChange={(e) => handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "freeAttempts", parseInt(e.target.value) || 1)}
                                  className="w-full mt-1 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs outline-none"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-[9px] font-black uppercase text-gray-400 tracking-wider">Positive Marks (+)</label>
                                <input
                                  type="number"
                                  value={activeNodeData.test.posMarks}
                                  onChange={(e) => handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "posMarks", parseFloat(e.target.value) || 1)}
                                  className="w-full mt-1 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs outline-none"
                                />
                              </div>
                              <div>
                                <label className="text-[9px] font-black uppercase text-gray-400 tracking-wider">Negative Penalty (-)</label>
                                <input
                                  type="number"
                                  value={activeNodeData.test.negMarks}
                                  onChange={(e) => handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "negMarks", parseFloat(e.target.value) || 0)}
                                  className="w-full mt-1 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs outline-none"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="text-[9px] font-black uppercase text-gray-400 tracking-wider">Restrict Student Access Emails (Optional)</label>
                              <textarea
                                value={activeNodeData.test.onlyUsers || ""}
                                onChange={(e) => handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "onlyUsers", e.target.value)}
                                className="w-full mt-1 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs outline-none resize-none"
                                rows={2}
                                placeholder="student1@gmail.com, student2@gmail.com"
                              />
                              <p className="text-[8px] text-gray-400 mt-1">Leave blank for unrestricted catalog view logs.</p>
                            </div>

                            {/* EXAM COUPON MANAGEMENT */}
                            <div className="border border-amber-200 p-3 rounded-lg bg-amber-50">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-[9px] font-bold text-amber-800 flex items-center gap-1">
                                  <Calendar className="w-3.5 h-3.5" /> COUPONS VALIDATION
                                </span>
                                {activeNodeData.test.coupon ? (
                                  <button
                                    onClick={() => handleRemoveNodeTestCoupon(editingNodeId, editingNodeType!, editNodeCategoryContext)}
                                    className="text-[8px] uppercase tracking-wider text-red-600 font-extrabold"
                                  >
                                    Remove Coupon
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleAddNodeTestCoupon(editingNodeId, editingNodeType!, editNodeCategoryContext)}
                                    className="text-[8px] uppercase tracking-wider text-emerald-700 font-extrabold"
                                  >
                                    Add Coupon
                                  </button>
                                )}
                              </div>

                              {activeNodeData.test.coupon && (
                                <div className="space-y-2 mt-2">
                                  <div>
                                    <label className="text-[8px] font-bold text-amber-700 block">Promo Code Name</label>
                                    <input
                                      type="text"
                                      value={activeNodeData.test.coupon.code}
                                      onChange={(e) => handleUpdateNodeTestCoupon(editingNodeId, editingNodeType!, editNodeCategoryContext, "code", e.target.value.toUpperCase())}
                                      className="w-full mt-1 bg-white border border-gray-200 rounded px-2 py-1 text-[10px]"
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <label className="text-[8px] font-bold text-amber-700 block">Start Date</label>
                                      <input
                                        type="date"
                                        value={activeNodeData.test.coupon.startDate}
                                        onChange={(e) => handleUpdateNodeTestCoupon(editingNodeId, editingNodeType!, editNodeCategoryContext, "startDate", e.target.value)}
                                        className="w-full mt-1 bg-white border border-gray-200 rounded px-2 py-1 text-[10px]"
                                      />
                                    </div>
                                    <div>
                                      <label className="text-[8px] font-bold text-amber-700 block">End Date</label>
                                      <input
                                        type="date"
                                        value={activeNodeData.test.coupon.endDate}
                                        onChange={(e) => handleUpdateNodeTestCoupon(editingNodeId, editingNodeType!, editNodeCategoryContext, "endDate", e.target.value)}
                                        className="w-full mt-1 bg-white border border-gray-200 rounded px-2 py-1 text-[10px]"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-[8px] font-bold text-amber-700 block">Attempts Granted (e.g., unlimited or integer)</label>
                                    <input
                                      type="text"
                                      value={activeNodeData.test.coupon.maxAttempts}
                                      onChange={(e) => handleUpdateNodeTestCoupon(editingNodeId, editingNodeType!, editNodeCategoryContext, "maxAttempts", e.target.value)}
                                      className="w-full mt-1 bg-white border border-gray-200 rounded px-2 py-1 text-[10px]"
                                      placeholder="unlimited or number index"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>

                            <div>
                              <label className="text-[9px] font-black uppercase text-gray-400 tracking-wider">Test Instructions Sheet</label>
                              <textarea
                                value={activeNodeData.test.instructions}
                                onChange={(e) => handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "instructions", e.target.value)}
                                className="w-full mt-1 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs outline-none resize-none"
                                rows={2.5}
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-3 bg-[#FF6B35]/5 p-3 rounded-lg border border-[#FF6B35]/10">
                              <div>
                                <label className="text-[9px] font-black uppercase text-[#FF6B35] tracking-wider block">Access Mode</label>
                                <select
                                  value={activeNodeData.test.isPaid ? "paid" : "free"}
                                  onChange={(e) => handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "isPaid", e.target.value === "paid")}
                                  className="w-full mt-1 bg-white border border-gray-200 rounded px-2.5 py-1.5 text-xs outline-none font-bold"
                                >
                                  <option value="free">{"\ud83d\udd13"} FREE</option>
                                  <option value="paid">{"\ud83d\udd12"} Paid Membership</option>
                                </select>
                              </div>
                              <div>
                                <label className="text-[9px] font-black uppercase text-gray-400 tracking-wider block">Schedule Availability</label>
                                <input
                                  type="datetime-local"
                                  value={activeNodeData.test.scheduledAt || ""}
                                  onChange={(e) => handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "scheduledAt", e.target.value)}
                                  className="w-full mt-1 bg-white border border-gray-200 rounded px-2 py-1 text-xs outline-none"
                                />
                              </div>
                            </div>

                            {/* QUESTIONS LIST MANAGER */}
                            <div className="bg-slate-50 border border-gray-200 rounded-xl p-3 space-y-3">
                              <div className="flex flex-col gap-2 border-b border-gray-150 pb-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-extrabold text-slate-800 uppercase tracking-wider block">{"\ud83d\udcdd"} Questions ({activeNodeData.test.questionsEn?.length || 0} EN, {activeNodeData.test.questionsHi?.length || 0} HI)</span>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const langName = qEditLang;
                                      const newQ = { 
                                        q: langName === "hi" ? "नया प्रश्न?" : `New ${langName.toUpperCase()} Question?`, 
                                        o: langName === "hi" ? ["विकल्प A", "विकल्प B", "विकल्प C", "विकल्प D"] : ["Option A", "Option B", "Option C", "Option D"], 
                                        c: 1, 
                                        s: langName === "hi" ? "व्याख्या यहाँ है" : "Explanation here", 
                                        source: langName === "hi" ? "संदर्भ स्रोत" : "Reference Source" 
                                      };
                                      
                                      if (langName === "en") {
                                        const currentEN = activeNodeData.test.questionsEn || [];
                                        handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsEn", [...currentEN, newQ]);
                                      } else if (langName === "hi") {
                                        const currentHI = activeNodeData.test.questionsHi || [];
                                        handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsHi", [...currentHI, newQ]);
                                      } else {
                                        const currentOther = activeNodeData.test.questionsOther?.[langName] || [];
                                        const updatedOthers = {
                                          ...(activeNodeData.test.questionsOther || {}),
                                          [langName]: [...currentOther, newQ]
                                        };
                                        handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsOther", updatedOthers);
                                      }
                                    }}
                                    className="flex items-center justify-center gap-1 text-[9px] font-black uppercase text-indigo-600 bg-white border border-indigo-200 rounded px-1.5 py-1 cursor-pointer hover:bg-indigo-50 transition-all shadow-sm"
                                  >
                                    {"\u2795"} Standard Q
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => {
                                      const langName = qEditLang;
                                      const newQ = { 
                                        q: langName === "hi" 
                                          ? "निम्नलिखित कथनों पर विचार कीजिए:\n1. प्रकाश ध्वनि की तुलना में तेजी से यात्रा करता है।\n2. ध्वनि को यात्रा करने के लिए एक माध्यम की आवश्यकता होती है।\n\nउपरोक्त कथनों में से कौन सा/से सही है/हैं?" 
                                          : "Consider the following statements:\n1. Light travels faster than sound.\n2. Sound requires a medium to travel.\n\nWhich of the statements given above is/are correct?", 
                                        o: langName === "hi" 
                                          ? ["केवल 1", "केवल 2", "1 और 2 दोनों", "न तो 1 और न ही 2"] 
                                          : ["1 only", "2 only", "Both 1 and 2", "Neither 1 nor 2"], 
                                        c: 3, 
                                        s: langName === "hi" 
                                          ? "दोनों कथन सही हैं। प्रकाश तरंगें बिना किसी माध्यम के अंतरिक्ष में यात्रा कर सकती हैं, जबकि ध्वनि तरंगें यांत्रिक तरंगें हैं जिन्हें माध्यम की आवश्यकता होती है।" 
                                          : "Both statements are factually correct. Light waves travel through space without needing any medium at a speed of approx 3x10^8 m/s, whereas sound waves are mechanical waves requiring a material medium.", 
                                        source: langName === "hi" ? "भौतिक विज्ञान संदर्भ" : "Physics Referrals" 
                                      };
                                      
                                      if (langName === "en") {
                                        const currentEN = activeNodeData.test.questionsEn || [];
                                        handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsEn", [...currentEN, newQ]);
                                      } else if (langName === "hi") {
                                        const currentHI = activeNodeData.test.questionsHi || [];
                                        handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsHi", [...currentHI, newQ]);
                                      } else {
                                        const currentOther = activeNodeData.test.questionsOther?.[langName] || [];
                                        const updatedOthers = {
                                          ...(activeNodeData.test.questionsOther || {}),
                                          [langName]: [...currentOther, newQ]
                                        };
                                        handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsOther", updatedOthers);
                                      }
                                    }}
                                    className="flex items-center justify-center gap-1 text-[9px] font-black uppercase text-indigo-600 bg-white border border-indigo-200 rounded px-1.5 py-1 cursor-pointer hover:bg-indigo-50 transition-all shadow-sm"
                                  >
                                    {"\ud83d\udccb"} Statement Q
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => {
                                      const langName = qEditLang;
                                      const newQ = { 
                                        q: langName === "hi" 
                                          ? "निम्नलिखित साम्राज्यों को उनकी स्थापना के कालानुक्रमिक क्रम में व्यवस्थित करें (शुरुआत से अंत तक):\n1. रोमन साम्राज्य\n2. गुप्त साम्राज्य\n3. मौर्य साम्राज्य\n4. मुगल साम्राज्य" 
                                          : "Arrange the following historical empires in chronological order of their establishment (from earliest to latest):\n1. Roman Empire\n2. Gupta Empire\n3. Maurya Empire\n4. Mughal Empire", 
                                        o: langName === "hi" 
                                          ? ["1 - 3 - 2 - 4", "3 - 1 - 2 - 4", "2 - 1 - 3 - 4", "3 - 2 - 1 - 4"] 
                                          : ["1 - 3 - 2 - 4", "3 - 1 - 2 - 4", "2 - 1 - 3 - 4", "3 - 2 - 1 - 4"], 
                                        c: 2, 
                                        s: langName === "hi" 
                                          ? "सही क्रम है: मौर्य साम्राज्य (322 ईसा पूर्व) -> रोमन साम्राज्य (27 ईसा पूर्व) -> गुप्त साम्राज्य (319 ईस्वी) -> मुगल साम्राज्य (1526 ईस्वी)।" 
                                          : "The correct sequence is: Maurya Empire (322 BCE) -> Roman Empire (27 BCE) -> Gupta Empire (319 CE) -> Mughal Empire (1526 CE).", 
                                        source: langName === "hi" ? "इतिहास संदर्भ" : "World History" 
                                      };
                                      
                                      if (langName === "en") {
                                        const currentEN = activeNodeData.test.questionsEn || [];
                                        handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsEn", [...currentEN, newQ]);
                                      } else if (langName === "hi") {
                                        const currentHI = activeNodeData.test.questionsHi || [];
                                        handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsHi", [...currentHI, newQ]);
                                      } else {
                                        const currentOther = activeNodeData.test.questionsOther?.[langName] || [];
                                        const updatedOthers = {
                                          ...(activeNodeData.test.questionsOther || {}),
                                          [langName]: [...currentOther, newQ]
                                        };
                                        handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsOther", updatedOthers);
                                      }
                                    }}
                                    className="flex items-center justify-center gap-1 text-[9px] font-black uppercase text-indigo-600 bg-white border border-indigo-200 rounded px-1.5 py-1 cursor-pointer hover:bg-indigo-50 transition-all shadow-sm"
                                  >
                                    {"\ud83d\udd22"} Arrangement
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => {
                                      const langName = qEditLang;
                                      const newQ = { 
                                        q: langName === "hi" 
                                          ? "नीचे दो कथन दिए गए हैं, एक को अभिकथन (A) और दूसरे को कारण (R) के रूप में लेबल किया गया है:\n\nअभिकथन (A): मानव रक्त थोड़ा क्षारीय होता है।\nकारण (R): स्वस्थ मानव रक्त का pH 7.35 और 7.45 के बीच बना रहता है।\n\nनिम्नलिखित में से सही विकल्प चुनें:" 
                                          : "Given below are two statements, one is labelled as Assertion (A) and the other is labelled as Reason (R):\n\nAssertion (A): Human blood is slightly alkaline.\nReason (R): The pH of healthy human blood is maintained between 7.35 and 7.45.\n\nChoose the correct option from the following:", 
                                        o: langName === "hi" 
                                          ? [
                                              "(A) और (R) दोनों सही हैं और (R), (A) की सही व्याख्या है",
                                              "(A) और (R) दोनों सही हैं लेकिन (R), (A) की सही व्याख्या नहीं है",
                                              "(A) सही है लेकिन (R) गलत है",
                                              "(A) गलत है लेकिन (R) सही है"
                                            ] 
                                          : [
                                              "Both (A) and (R) are true and (R) is the correct explanation of (A)",
                                              "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)",
                                              "(A) is true but (R) is false",
                                              "(A) is false but (R) is true"
                                            ], 
                                        c: 1, 
                                        s: langName === "hi" 
                                          ? "अभिकथन और कारण दोनों सही हैं। रक्त का pH 7.40 के आसपास होता है, जिससे यह थोड़ा क्षारीय बनता है, और ऐसा इसलिए है क्योंकि आंतरिक तंत्र रक्त के स्तर को सख्ती से 7.35 और 7.45 के बीच रखते हैं।" 
                                          : "Both Assertion and Reason are true. Blood has a pH around 7.40, which is greater than neutral 7.0, making it slightly alkaline, and this is because internal homeostatic mechanisms keep the level strictly between 7.35 and 7.45.", 
                                        source: langName === "hi" ? "जीव विज्ञान" : "Biology Guide" 
                                      };
                                      
                                      if (langName === "en") {
                                        const currentEN = activeNodeData.test.questionsEn || [];
                                        handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsEn", [...currentEN, newQ]);
                                      } else if (langName === "hi") {
                                        const currentHI = activeNodeData.test.questionsHi || [];
                                        handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsHi", [...currentHI, newQ]);
                                      } else {
                                        const currentOther = activeNodeData.test.questionsOther?.[langName] || [];
                                        const updatedOthers = {
                                          ...(activeNodeData.test.questionsOther || {}),
                                          [langName]: [...currentOther, newQ]
                                        };
                                        handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsOther", updatedOthers);
                                      }
                                    }}
                                    className="flex items-center justify-center gap-1 text-[9px] font-black uppercase text-indigo-600 bg-white border border-indigo-200 rounded px-1.5 py-1 cursor-pointer hover:bg-indigo-50 transition-all shadow-sm"
                                  >
                                    {"\u2696"} Assertion
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => {
                                      const langName = qEditLang;
                                      const newQ = { 
                                        q: langName === "hi" 
                                          ? "सूची-I को सूची-II से सुमेलित कीजिए और नीचे दिए गए कोड का उपयोग करके सही विकल्प का चयन कीजिए:\n\nसूची-I (भौतिक राशि) | सूची-II (SI मात्रक)\n-------------------|-----------------\n1. बल (Force)       | A. पास्कल (Pascal)\n2. दाब (Pressure)   | B. वाट (Watt)\n3. शक्ति (Power)     | C. न्यूटन (Newton)" 
                                          : "Match List-I with List-II and select the correct option using the codes given below:\n\nList-I (Physical Quantity)  |  List-II (SI Unit)\n------------------------|-------------------\n1. Force               | A. Pascal\n2. Pressure            | B. Watt\n3. Power               | C. Newton", 
                                        o: langName === "hi" 
                                          ? ["1-C, 2-A, 3-B", "1-A, 2-C, 3-B", "1-C, 2-B, 3-A", "1-B, 2-A, 3-C"] 
                                          : ["1-C, 2-B, 3-A", "1-B, 2-A, 3-C", "1-C, 2-A, 3-B", "1-A, 2-C, 3-B"], 
                                        c: 1, 
                                        s: langName === "hi" 
                                          ? "बल का SI मात्रक न्यूटन (1-C), दाब का SI मात्रक पास्कल (2-A), और शक्ति का SI मात्रक वाट (3-B) है। इसलिए सही कोड 1-C, 2-A, 3-B है।" 
                                          : "Force SI unit is Newton (1-C), Pressure SI unit is Pascal (2-A), and Power SI unit is Watt (3-B). Hence the correct code is 1-C, 2-A, 3-B.", 
                                        source: langName === "hi" ? "SI मात्रक" : "SI Units" 
                                      };
                                      
                                      if (langName === "en") {
                                        const currentEN = activeNodeData.test.questionsEn || [];
                                        handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsEn", [...currentEN, newQ]);
                                      } else if (langName === "hi") {
                                        const currentHI = activeNodeData.test.questionsHi || [];
                                        handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsHi", [...currentHI, newQ]);
                                      } else {
                                        const currentOther = activeNodeData.test.questionsOther?.[langName] || [];
                                        const updatedOthers = {
                                          ...(activeNodeData.test.questionsOther || {}),
                                          [langName]: [...currentOther, newQ]
                                        };
                                        handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsOther", updatedOthers);
                                      }
                                    }}
                                    className="flex items-center justify-center gap-1 text-[9px] font-black uppercase text-indigo-600 bg-white border border-indigo-200 rounded px-1.5 py-1 cursor-pointer hover:bg-indigo-50 transition-all shadow-sm"
                                  >
                                    {"\ud83d\udd17"} Matching
                                  </button>
                                </div>
                              </div>

                              {/* Tabs */}
                              <div className="flex gap-1.5 items-center overflow-x-auto pb-1.5 border-b border-gray-150">
                                <button
                                  type="button"
                                  onClick={() => setQEditLang("en")}
                                  className={`text-[9px] font-bold px-2.5 py-0.5 rounded ${qEditLang === "en" ? "bg-[#FF6B35] text-white" : "bg-white text-gray-500 border border-gray-150"}`}
                                >
                                  en ({activeNodeData.test.questionsEn?.length || 0})
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setQEditLang("hi")}
                                  className={`text-[9px] font-bold px-2.5 py-0.5 rounded ${qEditLang === "hi" ? "bg-[#FF6B35] text-white" : "bg-white text-gray-500 border border-gray-150"}`}
                                >
                                  hi ({activeNodeData.test.questionsHi?.length || 0})
                                </button>

                                {Object.keys(activeNodeData.test.questionsOther || {}).map((langKey) => (
                                  <div key={langKey} className="flex items-center gap-1 bg-white border border-gray-150 rounded pl-1.5 pr-0.5 py-0.5">
                                    <button
                                      type="button"
                                      onClick={() => setQEditLang(langKey)}
                                      className={`text-[9px] font-bold px-1 py-0.5 rounded ${qEditLang === langKey ? "bg-indigo-600 text-white" : "text-gray-500"}`}
                                    >
                                      {langKey} ({(activeNodeData.test.questionsOther?.[langKey] || []).length})
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const proceed = confirm(`Remove ${langKey.toUpperCase()} questions tab?`);
                                        if (proceed) {
                                          const updated = { ...(activeNodeData.test.questionsOther || {}) };
                                          delete updated[langKey];
                                          handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsOther", updated);
                                          if (qEditLang === langKey) setQEditLang("en");
                                        }
                                      }}
                                      className="text-red-500 hover:text-red-700 font-bold text-[10px] px-1"
                                    >
                                      ×
                                    </button>
                                  </div>
                                ))}

                                {showAddLangInput ? (
                                  <div className="flex items-center gap-1.5 bg-white border border-gray-300 rounded px-1.5 py-0.5 shadow-sm">
                                    <input
                                      type="text"
                                      placeholder="marathi, odia..."
                                      autoFocus
                                      onBlur={() => {
                                        setTimeout(() => setShowAddLangInput(false), 250);
                                      }}
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                          e.preventDefault();
                                          const val = (e.target as HTMLInputElement).value.trim().toLowerCase();
                                          if (val) {
                                            if (val === "en" || val === "hi") {
                                              alert("This language is integrated by default.");
                                              return;
                                            }
                                            const existingOthers = activeNodeData.test.questionsOther || {};
                                            if (existingOthers[val]) {
                                              alert("This language already exists.");
                                              setQEditLang(val);
                                              setShowAddLangInput(false);
                                              return;
                                            }
                                            const updatedOthers = {
                                              ...existingOthers,
                                              [val]: []
                                            };
                                            handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsOther", updatedOthers);
                                            setQEditLang(val);
                                          }
                                          setShowAddLangInput(false);
                                        } else if (e.key === "Escape") {
                                          setShowAddLangInput(false);
                                        }
                                      }}
                                      className="text-[10px] w-20 outline-none font-bold text-gray-850"
                                    />
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => setShowAddLangInput(true)}
                                    className="text-[10px] font-bold text-gray-500 hover:text-indigo-600 bg-white border border-gray-300 rounded px-2 py-0.5 flex items-center gap-1 cursor-pointer"
                                    title="Add language"
                                  >
                                    <span>{"\u2795"} Lang</span>
                                  </button>
                                )}
                              </div>

                              {/* TXT/HTML file upload specifically for selected language! */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="bg-white p-2.5 rounded-lg border border-gray-200">
                                  <label className="text-[9px] font-bold uppercase text-gray-500 block mb-1">
                                    Upload {qEditLang.toUpperCase()} Questions File(s) (.txt, .html)
                                  </label>
                                  <input
                                    type="file"
                                    accept=".txt,.html"
                                    multiple={true}
                                    key={qEditLang}  // reset input on lang change
                                    onChange={(e) => handleParserFileAttachment(e, editingNodeId, editingNodeType!, qEditLang, editNodeCategoryContext)}
                                    className="w-full text-[9px] text-gray-500 file:bg-gray-100 file:border-0 file:rounded file:px-2 file:py-1 file:font-semibold cursor-pointer"
                                  />
                                  {((qEditLang === "en" ? activeNodeData.test.questionsEn : (qEditLang === "hi" ? activeNodeData.test.questionsHi : activeNodeData.test.questionsOther?.[qEditLang])) || []).length > 0 && (
                                    <span className="text-[8px] text-emerald-600 font-bold block mt-1">
                                      {"\u2714"} {((qEditLang === "en" ? activeNodeData.test.questionsEn : (qEditLang === "hi" ? activeNodeData.test.questionsHi : activeNodeData.test.questionsOther?.[qEditLang])) || []).length} questions loaded
                                    </span>
                                  )}
                                </div>

                                <div className="bg-white p-2.5 rounded-lg border border-gray-200 space-y-1">
                                  <label className="text-[9px] font-bold uppercase text-gray-500 block">
                                    {"\ud83d\udccb"} Paste {qEditLang.toUpperCase()} Questions Raw Text:
                                  </label>
                                  <div className="flex gap-2">
                                    <textarea
                                      id={`raw_paste_${qEditLang}`}
                                      placeholder="1. Question text here  A) Option 1  B) Option 2  Ex: Explanation..."
                                      rows={1}
                                      className="flex-grow bg-slate-50 text-[10px] p-1 border border-gray-200 rounded outline-none resize-none"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const area = document.getElementById(`raw_paste_${qEditLang}`) as HTMLTextAreaElement;
                                        const text = area?.value || "";
                                        if (!text.trim()) {
                                          alert("Please paste some text before clicking import!");
                                          return;
                                        }
                                        const parsed = parseTestText(text);
                                        if (parsed.length > 0) {
                                          if (qEditLang === "en") {
                                            handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsEn", parsed);
                                          } else if (qEditLang === "hi") {
                                            handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsHi", parsed);
                                          } else {
                                            const updated = { ...(activeNodeData.test.questionsOther || {}), [qEditLang]: parsed };
                                            handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsOther", updated);
                                          }
                                          alert(`Imported ${parsed.length} questions successfully!`);
                                          area.value = "";
                                        } else {
                                          alert("Format error. Make sure questions have digits (1.) or option prefixes (A.).");
                                        }
                                      }}
                                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[9px] px-2.5 rounded justify-center items-center flex cursor-pointer shrink-0 transition-colors"
                                    >
                                      Import
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {/* Questions scrollarea */}
                              <div className="max-h-[220px] overflow-y-auto space-y-2 pr-1 text-[11px]">
                                {((qEditLang === "en" ? activeNodeData.test.questionsEn : (qEditLang === "hi" ? activeNodeData.test.questionsHi : activeNodeData.test.questionsOther?.[qEditLang])) || []).map((q: any, qIdx: number) => (
                                  <div key={qIdx} className="bg-white border border-gray-150 rounded-lg p-2.5 space-y-2">
                                    <div className="flex justify-between items-center text-[9px] text-gray-400 font-bold">
                                      <span>QUESTION #{qIdx + 1} ({qEditLang.toUpperCase()})</span>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          let currentList;
                                          if (qEditLang === "en") currentList = [...activeNodeData.test.questionsEn];
                                          else if (qEditLang === "hi") currentList = [...activeNodeData.test.questionsHi];
                                          else currentList = [...(activeNodeData.test.questionsOther?.[qEditLang] || [])];
                                          
                                          currentList.splice(qIdx, 1);
                                          
                                          if (qEditLang === "en") {
                                            handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsEn", currentList);
                                          } else if (qEditLang === "hi") {
                                            handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsHi", currentList);
                                          } else {
                                            const updated = { ...(activeNodeData.test.questionsOther || {}), [qEditLang]: currentList };
                                            handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsOther", updated);
                                          }
                                        }}
                                        className="text-red-500 hover:text-red-700 font-bold"
                                      >
                                        DELETE
                                      </button>
                                    </div>
                                    <div className="space-y-1.5">
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                                        <div>
                                          <label className="text-[8px] font-bold text-gray-400 block mb-0.5">QUESTION TEXT</label>
                                          <input
                                            type="text"
                                            value={q.q}
                                            onChange={(e) => {
                                              let currentList;
                                              if (qEditLang === "en") currentList = [...activeNodeData.test.questionsEn];
                                              else if (qEditLang === "hi") currentList = [...activeNodeData.test.questionsHi];
                                              else currentList = [...(activeNodeData.test.questionsOther?.[qEditLang] || [])];
                                              
                                              currentList[qIdx] = { ...currentList[qIdx], q: e.target.value };
                                              
                                              if (qEditLang === "en") {
                                                handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsEn", currentList);
                                              } else if (qEditLang === "hi") {
                                                handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsHi", currentList);
                                              } else {
                                                const updated = { ...(activeNodeData.test.questionsOther || {}), [qEditLang]: currentList };
                                                handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsOther", updated);
                                              }
                                            }}
                                            className="w-full bg-slate-50 border border-gray-200 rounded px-2 py-1 text-xs outline-none"
                                          />
                                        </div>
                                        <div>
                                          <label className="text-[8px] font-bold text-gray-400 block mb-0.5">QUESTION IMAGE / FORMULA GRAPHIC (OPTIONAL)</label>
                                          <div className="flex gap-1.5 items-center">
                                            <input
                                              type="text"
                                              placeholder="URL or Auto-Base64 Data URI"
                                              value={q.image || ""}
                                              onChange={(e) => {
                                                let currentList;
                                                if (qEditLang === "en") currentList = [...activeNodeData.test.questionsEn];
                                                else if (qEditLang === "hi") currentList = [...activeNodeData.test.questionsHi];
                                                else currentList = [...(activeNodeData.test.questionsOther?.[qEditLang] || [])];
                                                
                                                currentList[qIdx] = { ...currentList[qIdx], image: e.target.value };
                                                
                                                if (qEditLang === "en") {
                                                  handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsEn", currentList);
                                                } else if (qEditLang === "hi") {
                                                  handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsHi", currentList);
                                                } else {
                                                  const updated = { ...(activeNodeData.test.questionsOther || {}), [qEditLang]: currentList };
                                                  handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsOther", updated);
                                                }
                                              }}
                                              className="flex-grow bg-slate-50 border border-gray-200 rounded px-2 py-1 text-xs outline-none"
                                            />
                                            <div className="relative shrink-0">
                                              <input 
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                  const file = e.target.files?.[0];
                                                  if (!file) return;
                                                  const reader = new FileReader();
                                                  reader.onload = (event) => {
                                                    const base64 = event.target?.result as string;
                                                    let currentList;
                                                    if (qEditLang === "en") currentList = [...activeNodeData.test.questionsEn];
                                                    else if (qEditLang === "hi") currentList = [...activeNodeData.test.questionsHi];
                                                    else currentList = [...(activeNodeData.test.questionsOther?.[qEditLang] || [])];
                                                    
                                                    currentList[qIdx] = { ...currentList[qIdx], image: base64 };
                                                    
                                                    if (qEditLang === "en") {
                                                      handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsEn", currentList);
                                                    } else if (qEditLang === "hi") {
                                                      handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsHi", currentList);
                                                    } else {
                                                      const updated = { ...(activeNodeData.test.questionsOther || {}), [qEditLang]: currentList };
                                                      handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsOther", updated);
                                                    }
                                                  };
                                                  reader.readAsDataURL(file);
                                                }}
                                                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                                              />
                                              <button type="button" className="text-[10px] font-bold text-[#FF6B35] bg-[#FF6B35]/10 hover:bg-[#FF6B35]/15 px-2 py-1 rounded border border-[#FF6B35]/20 cursor-pointer">
                                                {"\ud83d\udce4"} Upload File
                                              </button>
                                            </div>
                                          </div>
                                          {q.image && (
                                            <div className="mt-1.5 flex items-center justify-between bg-slate-50 border border-gray-150 p-1.5 rounded-md">
                                              <div className="flex items-center gap-2">
                                                <img src={q.image} className="w-8 h-8 rounded border border-gray-200 object-contain bg-white" referrerPolicy="no-referrer" />
                                                <span className="text-[9px] text-gray-500 font-semibold truncate max-w-[124px]">
                                                  {q.image.startsWith("data:") ? "Local Loaded Graphic" : q.image}
                                                </span>
                                              </div>
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  let currentList;
                                                  if (qEditLang === "en") currentList = [...activeNodeData.test.questionsEn];
                                                  else if (qEditLang === "hi") currentList = [...activeNodeData.test.questionsHi];
                                                  else currentList = [...(activeNodeData.test.questionsOther?.[qEditLang] || [])];
                                                  
                                                  currentList[qIdx] = { ...currentList[qIdx], image: "" };
                                                  
                                                  if (qEditLang === "en") {
                                                    handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsEn", currentList);
                                                  } else if (qEditLang === "hi") {
                                                    handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsHi", currentList);
                                                  } else {
                                                    const updated = { ...(activeNodeData.test.questionsOther || {}), [qEditLang]: currentList };
                                                    handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsOther", updated);
                                                  }
                                                }}
                                                className="text-red-500 hover:text-red-700 font-bold text-[8px] px-1.5 py-0.5 rounded bg-red-50 hover:bg-red-100 transition-colors"
                                              >
                                                Remove
                                              </button>
                                            </div>
                                          )}
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-2 gap-1.5">
                                        {(q.o || []).map((opt: string, oIdx: number) => (
                                          <div key={oIdx} className="space-y-0.5">
                                            <div className="flex items-center justify-between">
                                              <span className="text-[8px] font-bold text-gray-400">({String.fromCharCode(65 + oIdx)})</span>
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  let currentList;
                                                  if (qEditLang === "en") currentList = [...activeNodeData.test.questionsEn];
                                                  else if (qEditLang === "hi") currentList = [...activeNodeData.test.questionsHi];
                                                  else currentList = [...(activeNodeData.test.questionsOther?.[qEditLang] || [])];
                                                  
                                                  currentList[qIdx] = { ...currentList[qIdx], c: oIdx + 1 };
                                                  
                                                  if (qEditLang === "en") {
                                                    handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsEn", currentList);
                                                  } else if (qEditLang === "hi") {
                                                    handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsHi", currentList);
                                                  } else {
                                                    const updated = { ...(activeNodeData.test.questionsOther || {}), [qEditLang]: currentList };
                                                    handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsOther", updated);
                                                  }
                                                }}
                                                className={`text-[8px] font-black uppercase rounded px-1 ${q.c === (oIdx + 1) ? "bg-emerald-100 text-emerald-800" : "text-gray-400"}`}
                                              >
                                                {q.c === (oIdx + 1) ? "\u2705" : "Correct"}
                                              </button>
                                            </div>
                                            <input
                                              type="text"
                                              value={opt}
                                              onChange={(e) => {
                                                let currentList;
                                                if (qEditLang === "en") currentList = [...activeNodeData.test.questionsEn];
                                                else if (qEditLang === "hi") currentList = [...activeNodeData.test.questionsHi];
                                                else currentList = [...(activeNodeData.test.questionsOther?.[qEditLang] || [])];
                                                
                                                const copyOpts = [...currentList[qIdx].o];
                                                copyOpts[oIdx] = e.target.value;
                                                currentList[qIdx] = { ...currentList[qIdx], o: copyOpts };
                                                
                                                if (qEditLang === "en") {
                                                  handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsEn", currentList);
                                                } else if (qEditLang === "hi") {
                                                  handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsHi", currentList);
                                                } else {
                                                  const updated = { ...(activeNodeData.test.questionsOther || {}), [qEditLang]: currentList };
                                                  handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsOther", updated);
                                                }
                                              }}
                                              className="w-full bg-slate-50 border border-gray-200 rounded px-1.5 py-0.5 text-[11px] outline-none"
                                            />
                                          </div>
                                        ))}
                                      </div>

                                      <div className="grid grid-cols-2 gap-2 pt-1 border-t border-gray-100">
                                        <div>
                                          <label className="text-[8px] font-bold text-gray-400 block mb-0.5">EXPLANATION</label>
                                          <input
                                            type="text"
                                            value={q.s || ""}
                                            onChange={(e) => {
                                              let currentList;
                                              if (qEditLang === "en") currentList = [...activeNodeData.test.questionsEn];
                                              else if (qEditLang === "hi") currentList = [...activeNodeData.test.questionsHi];
                                              else currentList = [...(activeNodeData.test.questionsOther?.[qEditLang] || [])];
                                              
                                              currentList[qIdx] = { ...currentList[qIdx], s: e.target.value };
                                              
                                              if (qEditLang === "en") {
                                                handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsEn", currentList);
                                              } else if (qEditLang === "hi") {
                                                handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsHi", currentList);
                                              } else {
                                                const updated = { ...(activeNodeData.test.questionsOther || {}), [qEditLang]: currentList };
                                                handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsOther", updated);
                                              }
                                            }}
                                            className="w-full bg-slate-50 border border-gray-200 rounded px-2 py-0.5 text-xs outline-none"
                                          />
                                        </div>
                                        <div>
                                          <label className="text-[8px] font-bold text-gray-400 block mb-0.5">SOURCE</label>
                                          <input
                                            type="text"
                                            value={q.source || ""}
                                            onChange={(e) => {
                                              let currentList;
                                              if (qEditLang === "en") currentList = [...activeNodeData.test.questionsEn];
                                              else if (qEditLang === "hi") currentList = [...activeNodeData.test.questionsHi];
                                              else currentList = [...(activeNodeData.test.questionsOther?.[qEditLang] || [])];
                                              
                                              currentList[qIdx] = { ...currentList[qIdx], source: e.target.value };
                                              
                                              if (qEditLang === "en") {
                                                handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsEn", currentList);
                                              } else if (qEditLang === "hi") {
                                                handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsHi", currentList);
                                              } else {
                                                const updated = { ...(activeNodeData.test.questionsOther || {}), [qEditLang]: currentList };
                                                handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsOther", updated);
                                              }
                                            }}
                                            className="w-full bg-slate-50 border border-gray-200 rounded px-2 py-0.5 text-xs outline-none"
                                          />
                                        </div>
                                      </div>

                                      <div className="pt-2 mt-2 border-t border-dotted border-gray-200">
                                        <label className="text-[8px] font-bold text-gray-400 block mb-0.5">QUESTION DIAGRAM / IMAGE ATTACHMENT (OPTIONAL)</label>
                                        <div className="flex gap-2">
                                          <input
                                            type="text"
                                            placeholder="Absolute Link or upload image file..."
                                            value={q.image || ""}
                                            onChange={(e) => {
                                              let currentList;
                                              if (qEditLang === "en") currentList = [...activeNodeData.test.questionsEn];
                                              else if (qEditLang === "hi") currentList = [...activeNodeData.test.questionsHi];
                                              else currentList = [...(activeNodeData.test.questionsOther?.[qEditLang] || [])];
                                              
                                              currentList[qIdx] = { ...currentList[qIdx], image: e.target.value };
                                              
                                              if (qEditLang === "en") {
                                                handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsEn", currentList);
                                              } else if (qEditLang === "hi") {
                                                handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsHi", currentList);
                                              } else {
                                                const updated = { ...(activeNodeData.test.questionsOther || {}), [qEditLang]: currentList };
                                                handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsOther", updated);
                                              }
                                            }}
                                            className="flex-grow bg-slate-50 border border-gray-200 rounded px-2 py-1 text-xs outline-none font-mono"
                                          />
                                          <button
                                            type="button"
                                            onClick={() => handleUploadLocalImage((b64) => {
                                              let currentList;
                                              if (qEditLang === "en") currentList = [...activeNodeData.test.questionsEn];
                                              else if (qEditLang === "hi") currentList = [...activeNodeData.test.questionsHi];
                                              else currentList = [...(activeNodeData.test.questionsOther?.[qEditLang] || [])];
                                              
                                              currentList[qIdx] = { ...currentList[qIdx], image: b64 };
                                              
                                              if (qEditLang === "en") {
                                                handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsEn", currentList);
                                              } else if (qEditLang === "hi") {
                                                handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsHi", currentList);
                                              } else {
                                                const updated = { ...(activeNodeData.test.questionsOther || {}), [qEditLang]: currentList };
                                                handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsOther", updated);
                                              }
                                            })}
                                            className="px-2 py-1 bg-slate-100 hover:bg-slate-200 border border-gray-250 text-slate-700 text-[10px] font-bold rounded cursor-pointer transition active:scale-95 shrink-0 flex items-center justify-center gap-1"
                                            title="Upload diagram image for question"
                                          >
                                            📁 Upload
                                          </button>
                                          {q.image && (
                                            <button
                                              type="button"
                                              onClick={() => {
                                                let currentList;
                                                if (qEditLang === "en") currentList = [...activeNodeData.test.questionsEn];
                                                else if (qEditLang === "hi") currentList = [...activeNodeData.test.questionsHi];
                                                else currentList = [...(activeNodeData.test.questionsOther?.[qEditLang] || [])];
                                                
                                                const copyNode = { ...currentList[qIdx] };
                                                delete copyNode.image;
                                                currentList[qIdx] = copyNode;
                                                
                                                if (qEditLang === "en") {
                                                  handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsEn", currentList);
                                                } else if (qEditLang === "hi") {
                                                  handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsHi", currentList);
                                                } else {
                                                  const updated = { ...(activeNodeData.test.questionsOther || {}), [qEditLang]: currentList };
                                                  handleUpdateNodeTestProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "questionsOther", updated);
                                                }
                                              }}
                                              className="px-2 py-1 bg-red-50 hover:bg-red-100 border border-red-200 text-red-650 text-[10px] font-extrabold rounded cursor-pointer shrink-0"
                                            >
                                              Clear
                                            </button>
                                          )}
                                        </div>
                                        {q.image && (
                                          <div className="mt-1.5 max-w-[150px] border border-gray-200 rounded-lg p-1.5 bg-white">
                                            <img src={q.image} alt="Diagram preview" className="max-h-20 object-contain mx-auto" onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=150"; }} />
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                                {((qEditLang === "en" ? activeNodeData.test.questionsEn : (qEditLang === "hi" ? activeNodeData.test.questionsHi : activeNodeData.test.questionsOther?.[qEditLang])) || []).length === 0 && (
                                  <p className="text-[10px] text-gray-400 text-center py-4 bg-white border border-gray-150 rounded-xl font-bold">No questions configured. Click "+" to add!</p>
                                )}
                              </div>
                            </div>

                          </div>
                        )}
                      </div>


                      {/* PDF DOCUMENT SETTINGS */}
                      <div className="border border-gray-150 rounded-xl p-4 bg-slate-50 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                            <FileSpreadsheet className="w-4 h-4 text-sky-500" /> Linked PDF Material File
                          </span>
                          <input
                            type="checkbox"
                            checked={activeNodeData.pdf !== null}
                            onChange={(e) => handleTogglePDFSettingsOnNode(editingNodeId, editingNodeType!, editNodeCategoryContext, e.target.checked)}
                            className="w-4 h-4 rounded text-[#FF6B35] accent-[#FF6B35] cursor-pointer focus:ring-[#FF6B35]"
                          />
                        </div>

                        {activeNodeData.pdf && (
                          <div className="pt-3 border-t border-gray-200 space-y-3">
                            <div>
                              <label className="text-[9px] font-black uppercase text-gray-400 tracking-wider">PDF Resource Name</label>
                              <input
                                type="text"
                                value={activeNodeData.pdf.title}
                                onChange={(e) => handleUpdateNodePDFProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "title", e.target.value)}
                                className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none font-semibold text-slate-800"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] font-black uppercase text-gray-400 tracking-wider">Document Drive / CDN Link Address (URL)</label>
                              <input
                                type="text"
                                value={activeNodeData.pdf.url}
                                onChange={(e) => handleUpdateNodePDFProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "url", e.target.value)}
                                className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none font-semibold text-slate-800"
                              />
                              <p className="text-[8px] text-gray-400 mt-1">Embed absolute link targets (google drives or pdf static locations).</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 bg-[#FF6B35]/5 p-3 rounded-lg border border-[#FF6B35]/10">
                              <div>
                                <label className="text-[9px] font-black uppercase text-[#FF6B35] tracking-wider block font-semibold">Access Mode</label>
                                <select
                                  value={activeNodeData.pdf.isPaid ? "paid" : "free"}
                                  onChange={(e) => handleUpdateNodePDFProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "isPaid", e.target.value === "paid")}
                                  className="w-full mt-1 bg-white border border-gray-200 rounded px-2.5 py-1.5 text-xs outline-none font-bold"
                                >
                                  <option value="free">{"\ud83d\udd13"} FREE</option>
                                  <option value="paid">{"\ud83d\udd12"} Paid Membership</option>
                                </select>
                              </div>
                              <div>
                                <label className="text-[9px] font-black uppercase text-gray-400 tracking-wider block font-semibold">Schedule Availability</label>
                                <input
                                  type="datetime-local"
                                  value={activeNodeData.pdf.scheduledAt || ""}
                                  onChange={(e) => handleUpdateNodePDFProperty(editingNodeId, editingNodeType!, editNodeCategoryContext, "scheduledAt", e.target.value)}
                                  className="w-full mt-1 bg-white border border-gray-200 rounded px-2 py-1 text-xs outline-none"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>

                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center h-full text-slate-400 space-y-3 py-16">
                  <Eye className="w-12 h-12 stroke-[1.2] text-slate-300" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-700">Configuration Inspector</h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-[240px] leading-relaxed mx-auto">Select any item tree node in the left layout catalog menu to inspect or attach tests.</p>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

        {/* 5. STUDENTS ACCOUNTS REGISTER LISTS */}
        {activeTab === "students" && (
          <section className="space-y-6">
            {/* CSV Import */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">CSV Bulk Import Portal</h3>
                <p className="text-xs text-gray-500 mt-1 font-medium">Register multiple premium students instantly. Enter a line for each student.</p>
              </div>
              <div className="bg-slate-50 border border-gray-150 rounded-2xl p-5 space-y-3">
                <div className="text-xs text-slate-600 font-semibold">
                  Required Format: <span className="font-mono text-[#FF6B35] bg-white px-2 py-1 rounded border border-gray-100">Name, E-mail ID, Phone No, Password, Date of Purchase, Date Of Expiry</span>
                </div>
                <textarea
                  id="bulkStudentsCsvArea"
                  placeholder="Guddu Sharma, guddu@gmail.com, 919999999999, secretpass, 2026-06-04, 2026-09-04"
                  rows={3}
                  className="w-full bg-white border border-gray-200 rounded-xl p-3.5 text-xs font-mono outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] resize-none"
                />
                <button
                  onClick={() => {
                    const el = document.getElementById("bulkStudentsCsvArea") as HTMLTextAreaElement;
                    if (el && el.value.trim()) {
                      handleBulkUploadCSV(el.value);
                      el.value = "";
                    } else {
                      alert("Please paste formatted CSV lines first.");
                    }
                  }}
                  className="bg-[#111827] hover:bg-black text-white px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase cursor-pointer transition-all shadow-md inline-flex items-center gap-1.5"
                >
                  <FileSpreadsheet className="w-4 h-4" /> Import CSV Lines
                </button>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-905">Aspirants Database Logs</h3>
                  <p className="text-xs text-gray-500 mt-0.5 font-medium font-semibold text-slate-400">Total Registered Subscribers: {appConfig.students.length}</p>
                </div>
                <button
                  onClick={handleAddStudentAccount}
                  className="bg-[#111827] hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 cursor-pointer transition-all shadow-md"
                >
                  <Plus className="w-4 h-4" /> Add Student
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-150 shadow-xs">
                <table className="w-full border-collapse bg-white text-left text-xs font-semibold text-slate-700">
                  <thead className="bg-slate-50 text-gray-500 border-b border-gray-150 text-[10px] font-black uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-4">Aspirant Name</th>
                      <th className="px-4 py-4">Email ID/Username</th>
                      <th className="px-4 py-4">Phone No</th>
                      <th className="px-4 py-4">Access Password</th>
                      <th className="px-4 py-4">Purchase Date</th>
                      <th className="px-4 py-4">Expiry Date</th>
                      <th className="px-4 py-4 text-right">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {appConfig.students.map((stu) => (
                      <tr key={stu.id} className="hover:bg-slate-50/50 transition-all font-semibold text-xs">
                        <td className="px-2 py-3">
                          <input
                            type="text"
                            value={stu.name}
                            onChange={(e) => handleUpdateStudentAccount(stu.id, "name", e.target.value)}
                            className="bg-transparent hover:bg-white focus:bg-white border border-transparent focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] rounded-lg px-2 py-1.5 w-full font-bold text-slate-800 outline-none transition-all"
                          />
                        </td>
                        <td className="px-2 py-3">
                          <input
                            type="text"
                            value={stu.emailOrMobile}
                            onChange={(e) => handleUpdateStudentAccount(stu.id, "emailOrMobile", e.target.value)}
                            className="bg-transparent hover:bg-white focus:bg-white border border-transparent focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] rounded-lg px-2 py-1.5 w-full outline-none transition-all"
                          />
                        </td>
                        <td className="px-2 py-3">
                          <input
                            type="text"
                            value={stu.phoneNo || ""}
                            onChange={(e) => handleUpdateStudentAccount(stu.id, "phoneNo", e.target.value)}
                            className="bg-transparent hover:bg-white focus:bg-white border border-transparent focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] rounded-lg px-2 py-1.5 w-full outline-none transition-all"
                            placeholder="Not linked"
                          />
                        </td>
                        <td className="px-2 py-3">
                          <input
                            type="text"
                            value={stu.password}
                            onChange={(e) => handleUpdateStudentAccount(stu.id, "password", e.target.value)}
                            className="bg-transparent hover:bg-white focus:bg-white border border-transparent focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] rounded-lg px-2 py-1.5 w-full font-mono outline-none transition-all"
                          />
                        </td>
                        <td className="px-2 py-3">
                          <input
                            type="date"
                            value={stu.purchaseDate || ""}
                            onChange={(e) => handleUpdateStudentAccount(stu.id, "purchaseDate", e.target.value)}
                            className="bg-transparent hover:bg-white focus:bg-white border border-transparent focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] rounded-lg px-2 py-1 select-none outline-none transition-all"
                          />
                        </td>
                        <td className="px-2 py-3">
                          <input
                            type="date"
                            value={stu.expiryDate || ""}
                            onChange={(e) => handleUpdateStudentAccount(stu.id, "expiryDate", e.target.value)}
                            className="bg-transparent hover:bg-white focus:bg-white border border-transparent focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] rounded-lg px-2 py-1 select-none outline-none transition-all"
                          />
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => handleDeleteStudentAccount(stu.id)}
                            className="text-gray-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                          >
                            <Trash2 className="w-4.5 h-4.5" />
                          </button>
                        </td>
                      </tr>
                    ))}

                    {appConfig.students.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center text-gray-400 font-bold">No standard student accounts registered. Compiled app will let anonymous guests.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* 6. SOCIAL PORTS AND PAYMENT GATEWAYS */}
        {activeTab === "payment" && (
          <section className="space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-gray-900">Support Handles & UPI Gateways</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-2">WhatsApp Direct Link</label>
                  <input
                    type="text"
                    value={appConfig.social.whatsapp}
                    onChange={(e) => handleUpdateSocialPaymentGroup("whatsapp", e.target.value)}
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:bg-white transition-all outline-none font-semibold text-slate-800"
                  />
                  <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">Direct WhatsApp API chat address format: https://wa.me/91XXXXXXXXXX.</p>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-2">Telegram Screen-share Handler</label>
                  <input
                    type="text"
                    value={appConfig.social.telegram}
                    onChange={(e) => handleUpdateSocialPaymentGroup("telegram", e.target.value)}
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:bg-white transition-all outline-none font-semibold text-slate-800"
                  />
                  <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">Telegram path for receipt screenshots check. Usually: https://t.me/your_telegram_channel.</p>
                </div>

                 <div>
                  <label className="block text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-2">Instagram Handler (URL)</label>
                  <input
                    type="text"
                    value={appConfig.social.instagram || ""}
                    onChange={(e) => handleUpdateSocialPaymentGroup("instagram", e.target.value)}
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:bg-white transition-all outline-none font-semibold text-slate-800"
                    placeholder="https://instagram.com/prayasone"
                  />
                  <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">Optional Instagram profile link for direct live access.</p>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-2">YouTube Channel (URL)</label>
                  <input
                    type="text"
                    value={appConfig.social.youtube || ""}
                    onChange={(e) => handleUpdateSocialPaymentGroup("youtube", e.target.value)}
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:bg-white transition-all outline-none font-semibold text-slate-800"
                    placeholder="https://youtube.com/@prayasone"
                  />
                  <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">Optional YouTube link for live tutoring channels.</p>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-2">Other Live Portal Title</label>
                  <input
                    type="text"
                    value={appConfig.social.otherName || ""}
                    onChange={(e) => handleUpdateSocialPaymentGroup("otherName", e.target.value)}
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:bg-white transition-all outline-none font-semibold text-slate-800"
                    placeholder="Twitter, Website"
                  />
                  <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">Name displayed on custom support tab link.</p>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-2">Other Live Portal (URL)</label>
                  <input
                    type="text"
                    value={appConfig.social.other || ""}
                    onChange={(e) => handleUpdateSocialPaymentGroup("other", e.target.value)}
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:bg-white transition-all outline-none font-semibold text-slate-800"
                    placeholder="https://twitter.com/prayasone"
                  />
                  <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">Redirect link for custom support tab link.</p>
                </div>

                <div className="md:col-span-2 bg-indigo-50/50 p-4 rounded-2xl border border-indigo-150 mt-2 mb-2">
                  <label className="block text-xs font-black text-indigo-950 uppercase tracking-wider mb-2">🔍 Google Search Console Verification Meta Key (Content ID)</label>
                  <input
                    type="text"
                    value={appConfig.social.googleVerificationId || "k7WEweulUiwAmqV3D5oVNzLu528Ib-B5VT4s4F2f4"}
                    onChange={(e) => handleUpdateSocialPaymentGroup("googleVerificationId", e.target.value)}
                    className="w-full bg-white border border-indigo-200 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all outline-none font-bold text-indigo-950"
                    placeholder="Enter your google-site-verification token hex key"
                  />
                  <p className="text-[11px] text-indigo-700/80 mt-1.5 leading-relaxed font-semibold">
                    This dynamically injects a &lt;meta name="google-site-verification" content="..."&gt; tag into your exported student portal's head element for quick Google verification. Your current token from the screenshot has been prefilled automatically!
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-2">Payment Amount License (INR)</label>
                  <input
                    type="text"
                    value={appConfig.social.paymentAmount}
                    onChange={(e) => handleUpdateSocialPaymentGroup("paymentAmount", e.target.value)}
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:bg-white transition-all outline-none font-semibold text-slate-800"
                  />
                  <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">Specify full cost amount text showing on lock-screens.</p>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-2">Premium Price Text</label>
                  <input
                    type="text"
                    value={appConfig.social.premiumPrice || "₹45"}
                    onChange={(e) => handleUpdateSocialPaymentGroup("premiumPrice", e.target.value)}
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:bg-white transition-all outline-none font-semibold text-slate-800"
                  />
                  <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">e.g. ₹45</p>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-2">Premium Duration Text</label>
                  <input
                    type="text"
                    value={appConfig.social.premiumDurationText || "3 Months"}
                    onChange={(e) => handleUpdateSocialPaymentGroup("premiumDurationText", e.target.value)}
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:bg-white transition-all outline-none font-semibold text-slate-800"
                  />
                  <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">e.g. / 3 Months</p>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-2">Premium Validity Badge</label>
                  <input
                    type="text"
                    value={appConfig.social.premiumValidityText || "VALID FOR 90 DAYS"}
                    onChange={(e) => handleUpdateSocialPaymentGroup("premiumValidityText", e.target.value)}
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:bg-white transition-all outline-none font-semibold text-slate-800"
                  />
                  <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">e.g. VALID FOR 90 DAYS</p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-2">Premium Membership Benefits (Comma Separated)</label>
                  <textarea
                    rows={3}
                    value={appConfig.social.premiumBenefitsText || "Access to Past Tests, Access to Present Tests, Access to Future Tests, Unlimited Test Attempts"}
                    onChange={(e) => handleUpdateSocialPaymentGroup("premiumBenefitsText", e.target.value)}
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:bg-white transition-all outline-none font-semibold text-slate-800"
                  />
                  <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">List of benefits showing on VIP card, separated by commas.</p>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-2">UPI QR Code Image (URL)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={appConfig.social.paymentQr}
                      onChange={(e) => handleUpdateSocialPaymentGroup("paymentQr", e.target.value)}
                      className="flex-grow bg-slate-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:bg-white transition-all outline-none font-semibold text-slate-800"
                    />
                    <button
                      type="button"
                      onClick={() => handleUploadLocalImage((b64) => handleUpdateSocialPaymentGroup("paymentQr", b64))}
                      className="px-4 py-3.5 bg-slate-100 hover:bg-slate-200 border border-gray-200 text-slate-700 text-xs font-bold rounded-xl active:scale-95 transition cursor-pointer flex items-center justify-center shrink-0"
                      title="Upload UPI QR image file"
                    >
                      📁 Upload
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">Absolute URL pointing to hosted payment QR code images, or upload local image file.</p>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-2">QR Action / Download Button Text</label>
                  <input
                    type="text"
                    value={appConfig.social.qrDownloadText || "Download QR Code"}
                    onChange={(e) => handleUpdateSocialPaymentGroup("qrDownloadText", e.target.value)}
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:bg-white transition-all outline-none font-semibold text-slate-800"
                    placeholder="Download QR Code"
                  />
                  <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">Customize the label for the download / action link button under QR code.</p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-2">QR Custom Redirect Link (URL)</label>
                  <input
                    type="text"
                    value={appConfig.social.qrDownloadLink || ""}
                    onChange={(e) => handleUpdateSocialPaymentGroup("qrDownloadLink", e.target.value)}
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:bg-white transition-all outline-none font-semibold text-slate-800"
                    placeholder="e.g. Telegram channel link or alternative download link"
                  />
                  <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">Optional. If set, clicking the action button will open this link in a new tab instead of downloading the QR code directly.</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-5 border border-gray-100 flex items-center gap-5 justify-start">
                <div className="bg-white p-2.5 rounded-lg border border-gray-200">
                  <img src={appConfig.social.paymentQr} alt="QR Code" className="w-24 h-24 object-contain" onError={(e) => { (e.target as any).src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=UPI_PAY"; }} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-[#FF6B35]" /> Transaction Gateway Mockup
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed mt-1 max-w-md">When free assessment attempts dry up, unauthenticated student users see this QR. Entering a Transaction Ref forwarding takes screenshots to prompt activation.</p>
                </div>
              </div>

              {/* Unlimited Custom Social Links */}
              <div className="border-t border-gray-150 pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-800 flex items-center gap-2">
                      <Share2 className="w-4 h-4 text-[#FF6B35]" /> Unlimited Custom Social Links
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">Admin can add extra social platforms (such as Facebook, Twitter, LinkedIn etc.) as live contact portals.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddCustomSocialLink}
                    className="flex items-center gap-1.5 bg-[#FF6B35] text-white hover:bg-[#e05626] font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer shadow-sm shadow-[#FF6B35]/25 transition-all active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Custom Link
                  </button>
                </div>

                <div className="space-y-3">
                  {(appConfig.social.customLinks || []).map((link) => (
                    <div key={link.id} className="bg-slate-50 border border-gray-200 rounded-2xl p-4 flex flex-col md:flex-row md:items-center gap-4 transition-all hover:bg-slate-100">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <label className="block text:[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">Platform Name</label>
                          <input
                            type="text"
                            value={link.name}
                            onChange={(e) => handleUpdateCustomSocialLink(link.id, "name", e.target.value)}
                            placeholder="e.g. Facebook"
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800"
                          />
                        </div>
                        <div>
                          <label className="block text:[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">Redirect URL</label>
                          <input
                            type="text"
                            value={link.url}
                            onChange={(e) => handleUpdateCustomSocialLink(link.id, "url", e.target.value)}
                            placeholder="https://facebook.com/..."
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800"
                          />
                        </div>
                        <div>
                          <label className="block text:[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">Brand Color Code</label>
                          <div className="flex gap-2">
                            <input
                              type="color"
                              value={link.color || "#1e272e"}
                              onChange={(e) => handleUpdateCustomSocialLink(link.id, "color", e.target.value)}
                              className="w-8 h-8 rounded-lg border border-gray-200 cursor-pointer p-0 overflow-hidden shrink-0"
                            />
                            <input
                              type="text"
                              value={link.color || "#1e272e"}
                              onChange={(e) => handleUpdateCustomSocialLink(link.id, "color", e.target.value)}
                              className="w-full bg-white border border-gray-200 rounded-lg px-2 py-2 text-xs font-semibold text-slate-800 uppercase"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text:[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">Phosphor Icon Class</label>
                          <input
                            type="text"
                            value={link.icon || "ph-fill ph-link"}
                            onChange={(e) => handleUpdateCustomSocialLink(link.id, "icon", e.target.value)}
                            placeholder="e.g. ph-fill ph-facebook-logo"
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 justify-end md:self-end md:pb-1 shrink-0">
                        <div
                          className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-lg text-slate-800"
                          title="Icon Preview"
                        >
                          <span className={link.icon || "ph-fill ph-link"} style={{ color: link.color || "#1e272e" }}></span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveCustomSocialLink(link.id)}
                          className="bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 p-2 rounded-xl transition-all border border-transparent cursor-pointer"
                          title="Delete Custom Social Link"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {(appConfig.social.customLinks || []).length === 0 && (
                    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center text-gray-400 text-xs font-semibold">
                      No custom social links defined. Add custom links using the button above.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}



        {/* 8. AUDIT TRAILS & ADMIN ACTIVITY LOGS (Feature 27) */}
        {activeTab === "logs" && (
          <section className="space-y-6 animate-fadeIn">
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-150 pb-5">
                <div>
                  <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                    <History className="w-5 h-5 text-[#FF6B35]" /> Operator Security Activity Logs
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 font-medium">Audit trails detailing system manipulations, category additions, mock compiles, and backups restores.</p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm max-h-[500px] overflow-y-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-gray-150 text-gray-500 font-extrabold uppercase tracking-widest text-[9px]">
                      <th className="p-4 w-48">Registered Timestamp</th>
                      <th className="p-4">Action Summary / Security Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activityLogs.map((log, idx) => (
                      <tr key={idx} className="border-b border-gray-100 hover:bg-slate-50/50 transition-all font-semibold text-slate-800">
                        <td className="p-4 font-mono text-gray-400 text-[10px]">
                          {log.timestamp ? log.timestamp.replace("T", " ").substring(0, 19) : "N/A"}
                        </td>
                        <td className="p-4 text-slate-900">{log.action || "Manipulated dynamic configuration values"}</td>
                      </tr>
                    ))}
                    {activityLogs.length === 0 && (
                      <tr>
                        <td colSpan={2} className="p-8 text-center text-gray-400 font-semibold">
                          No logging items recorded yet. Change or update items to trigger writes.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* 9. SECURE CLOUD DATABASE BACKUP & RESTORE CENTER (Feature 28) */}
        {activeTab === "backups" && (
          <section className="space-y-6 animate-fadeIn">
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-150 pb-5">
                <div>
                  <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                    <Database className="w-5 h-5 text-[#FF6B35]" /> Database Snapshot & Recovery Center
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 font-medium">Create, download, and restore manual backups of configuration matrices, custom student logins records, and syllabus contents trees.</p>
                </div>
              </div>

              <div className="bg-slate-50 border border-gray-200/80 rounded-2xl p-6 space-y-4">
                <h4 className="font-extrabold text-sm text-slate-800">Take New Database Backup Snapshot</h4>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={backupNameInput}
                    onChange={(e) => setBackupNameInput(e.target.value)}
                    placeholder="Enter short custom name, e.g. post_reorg"
                    className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none font-semibold text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={handleCreateBackup}
                    disabled={isBackupLoading}
                    className="bg-[#FF6B35] hover:bg-[#e05626] text-white disabled:bg-gray-300 font-bold text-xs px-6 py-3.5 rounded-xl transition-all shadow-md shadow-[#FF6B35]/25 cursor-pointer active:scale-95"
                  >
                    {isBackupLoading ? "Generating..." : "Generate Cloud Backup"}
                  </button>
                </div>
              </div>

              <div className="overflow-hidden border border-gray-200 rounded-2xl bg-white shadow-sm overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs min-w-[650px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-gray-150 text-gray-500 font-extrabold uppercase tracking-widest text-[9px]">
                      <th className="p-4">Backup Filename</th>
                      <th className="p-4 text-center">Filesize</th>
                      <th className="p-4 text-center">Created At Date</th>
                      <th className="p-4 text-right">Standard Administration Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {backupsList.map((bk) => (
                      <tr key={bk.filename} className="border-b border-gray-100 hover:bg-slate-50/50 transition-all font-semibold text-slate-800">
                        <td className="p-4 text-slate-900 font-bold flex items-center gap-2">
                          <Database className="w-4 h-4 text-gray-400" />
                          <span>{bk.filename}</span>
                        </td>
                        <td className="p-4 text-center text-gray-500 font-mono text-[11px]">{bk.size || "0 KB"}</td>
                        <td className="p-4 text-center text-gray-400 font-mono text-[11px]">{bk.createdAt || "N/A"}</td>
                        <td className="p-4 text-right space-x-2">
                          <a
                            href={`/api/admin/backup/download/${bk.filename}`}
                            className="bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-gray-250 font-bold text-[10px] px-3.5 py-2.5 rounded-xl transition-all inline-block uppercase tracking-wider text-center"
                            title="Download backup file to local machine"
                          >
                            Download
                          </a>
                          <button
                            type="button"
                            onClick={() => handleRestoreBackup(bk.filename)}
                            disabled={restoringBackup !== null}
                            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-600 hover:text-emerald-800 border border-emerald-250 font-black text-[10px] px-3.5 py-2 rounded-xl transition-all uppercase tracking-wider cursor-pointer"
                          >
                            {restoringBackup === bk.filename ? "RESTORING..." : "RESTORE DB"}
                          </button>
                        </td>
                      </tr>
                    ))}
                    {backupsList.length === 0 && (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-gray-400 font-bold">
                          No custom backups catalog found on server. Produce a snapshot using the form above!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

      </main>

    </div>
  );
}
