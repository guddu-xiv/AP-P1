import { AppConfig } from "../types";

export function generateStudentHTML(config: AppConfig, base64Config: string, serverOrigin: string = ""): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>${config.appName || "Prayas One Professional Hub"} - Elite MCQ Practice & Mock Test Portal</title>
    
    <meta name="description" content="Welcome to ${config.appName || 'Prayas One Professional Hub'}. India's leading digital education center for bilingual MCQ practice, simulated online CBT exam portals, offline Blackbooks, study material PDFs, and deep learning analytics.">
    <meta name="keywords" content="Prayas One, Prayas One Professional Hub, prayasone, prayasone.in, prayasone.in student, Prayas One App, Blackbook, ssc mock series, cgl cbt mockup, previous worksheets pdf, online exam testing, learn, test series">
    <meta name="author" content="${config.appName || 'Prayas One Professional Hub'}">
    <meta name="robots" content="index, follow">
    <meta name="google-site-verification" content="${config.social.googleVerificationId || 'k7WEweulUiwAmqV3D5oVNzLu528Ib-B5VT4s4F2f4'}">
    <link rel="canonical" href="https://prayasone.in/">

    <!-- Open Graph (Facebook / WhatsApp / Telegram) -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="${config.appName || 'Prayas One Professional Hub'} - Practise & Succeed">
    <meta property="og:description" content="Access offline-ready mock series, bilingual CBT tests, Blackbook PDF notes, worksheets and statistics tracker.">
    <meta property="og:image" content="${config.logoUrl || 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=300'}">
    <meta property="og:site_name" content="${config.appName || 'Prayas One Professional Hub'}">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:title" content="${config.appName || 'Prayas One Professional Hub'} - Premium Exam Portal">
    <meta property="twitter:description" content="Access high-yield offline practice tests, bilingual CBT collections, and key analysis instantly.">
    <meta property="twitter:image" content="${config.logoUrl || 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=300'}">

    <!-- Schema.org JSON-LD Structured Data for Rich Snippet & Google Sitelinks -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "${config.appName || 'Prayas One Professional Hub'}",
      "alternateName": "Prayas One",
      "url": "https://prayasone.in/",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://prayasone.in/?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Portal Navigation Channels",
      "itemListElement": [
        {
          "@type": "SiteNavigationElement",
          "position": 1,
          "name": "Home",
          "description": "Primary student dashboard highlighting notifications, saved exam prep booklets, and latest board notices.",
          "url": "https://prayasone.in/home"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 2,
          "name": "Tests",
          "description": "Simulate real computer based mock examinations, previous year papers, and performance card analytics.",
          "url": "https://prayasone.in/test"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 3,
          "name": "PDFs",
          "description": "Read official lesson books, dynamic worksheets, solutions manuals, and complete reference PDF blackbooks offline.",
          "url": "https://prayasone.in/pdf"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 4,
          "name": "Account",
          "description": "View student profile subscription license, payment transaction receipts, and solved exams history.",
          "url": "https://prayasone.in/account"
        }
      ]
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "${config.appName || 'Prayas One Professional Hub'}",
      "description": "Premium bilingual practice exams, CBT testing solutions and educational material provider.",
      "logo": "${config.logoUrl || 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=300'}",
      "url": "https://prayasone.in/",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "lowPrice": "0",
        "highPrice": "499"
      }
    }
    </script>
    
    <!-- Google Fonts Imports -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Simonetta:ital,wght@0,400;0,900;1,400;1,900&family=Sahitya:wght@400;700&display=swap" rel="stylesheet">
    
    <!-- Phosphor Icons -->
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/css/style.css">
    <script src="https://unpkg.com/@phosphor-icons/web"></script>

    <style>
        :root {
            --primary: #ff4757;
            --primary-light: #fff5f6;
            --dark: #1e272e;
            --light-grey: #f8f9fa;
            --border-color: #ededed;
            --green: #2ecc71;
            --blue: #3498db;
            --grey-text: #7f8c8d;
        }

        /* Responsive Tap Feedback Effect for all buttons, cards and selections */
        button:active, .category-card:active, .accordion-header:active, .opt-box:active, .back-nav-btn:active, .nav-item:active, .notif-card:active, .notif-banner:active, .auth-btn:active, .bottom-item:active, .analysis-opt-box:active, #themeToggleBtn:active, #bellIconBtn:active {
            transform: scale(0.96) !important;
            opacity: 0.82 !important;
            transition: transform 0.08s ease, opacity 0.08s ease !important;
        }

        /* Dark Mode Theme Overrides */
        body.dark-mode {
            background-color: #121212 !important;
            color: #f1f2f6 !important;
        }
        
        .dark-mode {
            --dark: #f1f2f6;
            --light-grey: #1c1c1e;
            --border-color: #2c2c2e;
            --grey-text: #a4b0be;
            background-color: #121212 !important;
            color: #f1f2f6 !important;
        }
        
        .dark-mode .header, .dark-mode .mainHeader {
            background: rgba(28, 28, 30, 0.85) !important;
            border: 1.5px solid rgba(255, 255, 255, 0.08) !important;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3) !important;
        }

        .dark-mode .greet-title, .dark-mode .greet-sub {
            color: #ffffff !important;
        }

        .dark-mode .back-nav-bar {
            background: rgba(28, 28, 30, 0.85) !important;
            border: 1.5px solid rgba(255, 255, 255, 0.08) !important;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3) !important;
        }

        .dark-mode .category-card, .dark-mode .accordion-item, .dark-mode .faq-item, .dark-mode .block-card, .dark-mode .notif-card {
            background-color: #1c1c1e !important;
            border: 1px solid #2c2c2e !important;
            color: #ffffff !important;
        }

        .dark-mode .section-header h3, .dark-mode .section-header p, .dark-mode .section-title, .dark-mode .category-title {
            color: #ffffff !important;
        }

        .dark-mode select, .dark-mode input, .dark-mode textarea {
            background-color: #1c1c1e !important;
            border: 1px solid #3a3a3c !important;
            color: #ffffff !important;
        }

        .dark-mode td, .dark-mode th {
            border-bottom: 1px solid #2c2c2e !important;
            color: #ffffff !important;
        }

        .dark-mode tr {
            background-color: transparent !important;
        }

        .dark-mode #mainFooter, .dark-mode .footer {
            background-color: #1c1c1e !important;
            border-top: 1px solid #2c2c2e !important;
        }

        .dark-mode .app-logo {
            background-color: #ffffff !important;
            background: #ffffff !important;
            border-color: #ededed !important;
        }

        .dark-mode .qr-image-frame,
        .dark-mode #displayPayQrImage {
            background-color: #ffffff !important;
            background: #ffffff !important;
            border-color: #ededed !important;
            padding: 5px !important;
        }

        .dark-mode .bottom-nav-bar {
            background: rgba(28, 28, 30, 0.85) !important;
            border: 1.5px solid rgba(255, 255, 255, 0.08) !important;
            box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4), 0 4px 12px rgba(0, 0, 0, 0.2) !important;
        }

        .dark-mode .bottom-nav-item {
            color: #8e8e93;
        }

        .dark-mode .bottom-nav-item.active {
            background: rgba(255, 71, 87, 0.18) !important;
            color: #ff6b81 !important;
        }

        .dark-mode .info-bullets {
            background: #1c1c1e !important;
            border-color: #2c2c2e !important;
            color: #f1f2f6 !important;
        }

        .dark-mode #couponEntrySection {
            background: #1c1505 !important;
            border-color: #5d3f04 !important;
            color: #fbbf24 !important;
        }

        .dark-mode .btn-fill-prime,
        .dark-mode button[style*="background: var(--dark)"],
        .dark-mode button[style*="background:var(--dark)"] {
            background-color: #ffffff !important;
            background: #ffffff !important;
            color: #121212 !important;
        }

        .dark-mode .scorecard-block {
            background: linear-gradient(135deg, #1e272e 0%, #0f172a 100%) !important;
            border: 1px solid #2c2c2e !important;
            color: #ffffff !important;
        }

        .dark-mode #scr-pay div[style*="linear-gradient"] {
            background: linear-gradient(135deg, #1e272e 0%, #0f172a 100%) !important;
        }

        .dark-mode div[style*="background: #fef2f2"] {
            background: #4c1d1d !important;
            border-color: #ef4444 !important;
            color: #fca5a5 !important;
        }
        .dark-mode div[style*="background: #fef2f2"] p {
            color: #fca5a5 !important;
        }

        .dark-mode .outline-item-card,
        .dark-mode .library-card,
        .dark-mode .social-link-btn,
        .dark-mode .review-badge-btn,
        .dark-mode .bookmark-group-card,
        .dark-mode .palette-cell,
        .dark-mode .drawer-sheet,
        .dark-mode #analysisDetailViewerCard,
        .dark-mode .analysis-detail-modal {
            background-color: #1c1c1e !important;
            background: #1c1c1e !important;
            color: #f1f2f6 !important;
            border-color: #2c2c2e !important;
        }

        .dark-mode #test-engine-panel {
            background-color: #121212 !important;
            color: #ffffff !important;
        }

        .dark-mode .engine-header, 
        .dark-mode .engine-footer {
            background: rgba(28, 28, 30, 0.85) !important;
            border: 1.5px solid rgba(255, 255, 255, 0.08) !important;
            box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4), 0 4px 12px rgba(0, 0, 0, 0.2) !important;
            color: #ffffff !important;
        }

        .dark-mode #testEngineName,
        .dark-mode .engine-title-group,
        .dark-mode .engine-title-group h5,
        .dark-mode .engine-title-group div {
            color: #ffffff !important;
        }

        .dark-mode #test-engine-panel h1,
        .dark-mode #test-engine-panel h2,
        .dark-mode #test-engine-panel h3,
        .dark-mode #test-engine-panel h4,
        .dark-mode #test-engine-panel h5,
        .dark-mode #test-engine-panel h6,
        .dark-mode #test-engine-panel p,
        .dark-mode #test-engine-panel div,
        .dark-mode #test-engine-panel span,
        .dark-mode #test-engine-panel label {
            color: #ffffff !important;
        }

        /* Instructions Screen and Bullet items styling in dark mode */
        .dark-mode #scr-instructions,
        .dark-mode #scr-instructions h2,
        .dark-mode #scr-instructions .info-bullets,
        .dark-mode #scr-instructions .inst-item,
        .dark-mode #scr-instructions .inst-item div,
        .dark-mode #scr-instructions .inst-item strong,
        .dark-mode #scr-instructions .inst-item span {
            color: #ffffff !important;
        }

        .dark-mode #scr-instructions .inst-item p {
            color: #a4b0be !important;
        }

        .dark-mode #test-engine-panel #testTimerText {
            color: var(--primary) !important;
        }

        .dark-mode .engine-btn-nav {
            background-color: #1c1c1e !important;
            background: #1c1c1e !important;
            color: #ffffff !important;
            border-color: #2c2c2e !important;
        }

        .dark-mode .review-badge-btn {
            background-color: #1c1c1e !important;
            background: #1c1c1e !important;
            color: #ffffff !important;
            border-color: #2c2c2e !important;
        }

        .dark-mode .option-button {
            background: #1c1c1e !important;
            border-color: #2c2c2e !important;
            color: #f1f2f6 !important;
        }

        .dark-mode .option-button:hover {
            background: #2a2a2d !important;
        }

        .dark-mode .option-button.selected {
            background: rgba(255, 107, 53, 0.15) !important;
            border-color: var(--primary) !important;
        }

        .dark-mode .analysis-explanation-box {
            background: #111e2e !important;
            border: 1px solid #1e3a5f !important;
            color: #93c5fd !important;
        }

        .dark-mode .analysis-question-box {
            background: #1c1c1e !important;
            border: 1px solid #2c2c2e !important;
            color: #ffffff !important;
        }

        .dark-mode .analysis-opt-box {
            background: #1c1c1e !important;
            border-color: #2c2c2e !important;
            color: #ffffff !important;
        }

        .dark-mode .analysis-opt-box.correct {
            border-color: #2ed573 !important;
            background: rgba(46, 213, 115, 0.15) !important;
            color: #2ed573 !important;
        }

        .dark-mode .analysis-opt-box.wrong {
            border-color: #ff6b35 !important;
            background: rgba(255, 107, 53, 0.15) !important;
            color: #ff6b35 !important;
        }

        .dark-mode .engine-question-source {
            background: #1c1505 !important;
            border-left: 4px solid #b45309 !important;
            color: #fbbf24 !important;
        }

        .dark-mode [style*="background: white"]:not(img),
        .dark-mode [style*="background:white"]:not(img),
        .dark-mode [style*="background: #ffffff"]:not(img),
        .dark-mode [style*="background:#ffffff"]:not(img),
        .dark-mode [style*="background: #fff"]:not(img),
        .dark-mode [style*="background:#fff"]:not(img),
        .dark-mode [style*="background-color: white"]:not(img),
        .dark-mode [style*="background-color:white"]:not(img),
        .dark-mode [style*="background-color: #ffffff"]:not(img),
        .dark-mode [style*="background-color:#ffffff"]:not(img),
        .dark-mode [style*="background-color: #fff"]:not(img),
        .dark-mode [style*="background-color:#fff"]:not(img),
        .dark-mode [style*="background: rgb(255, 255, 255)"]:not(img),
        .dark-mode [style*="background:rgb(255, 255, 255)"]:not(img),
        .dark-mode [style*="background-color: rgb(255, 255, 255)"]:not(img),
        .dark-mode [style*="background-color:rgb(255, 255, 255)"]:not(img) {
            background-color: #1c1c1e !important;
            background: #1c1c1e !important;
            color: #f1f2f6 !important;
            border-color: #2c2c2e !important;
        }

        .dark-mode img#displayPayQrImage {
            background: #ffffff !important;
            border-color: #ffffff !important;
            padding: 5px !important;
        }

        .dark-mode div[style*="background: rgb(0, 0, 0)"],
        .dark-mode div[style*="background:rgb(0, 0, 0)"],
        .dark-mode div[style*="background: black"],
        .dark-mode div[style*="background:black"] {
            background-color: #000000 !important;
        }

        .dark-mode #websitePopupOverlayModal > div,
        .dark-mode #paymentSuccessPopupModal > div,
        .dark-mode #premiumBlockerModal > div,
        .dark-mode #testPauseResumeModal > div,
        .dark-mode #submitConfirmModal > div,
        .dark-mode #reportQuestionModal > div,
        .dark-mode #paymentSuccessModal > div,
        .dark-mode #scr-pay > div {
            background-color: #1c1c1e !important;
            background: #1c1c1e !important;
            color: #f1f2f6 !important;
            border: 1px solid #2c2c2e !important;
        }

        .dark-mode div[style*="background: #fffbeb"],
        .dark-mode div[style*="background:#fffbeb"] {
            background: #201a12 !important;
            color: #fbbf24 !important;
            border-color: #b45309 !important;
        }

        .dark-mode #leaderboardRankAlertBar,
        .dark-mode div[style*="background: #fef3c7"],
        .dark-mode div[style*="background:#fef3c7"] {
            background: #2d1c0c !important;
            color: #fbbf24 !important;
            border-color: #d97706 !important;
        }

        /* Generic custom language font support */
        [class^="lang-"], [class^="lang-"] *, [class^="lang-"] button, [class^="lang-"] span, [class^="lang-"] div {
            font-family: 'Outfit', 'Inter', system-ui, -apple-system, sans-serif !important;
        }
        
        .lang-hi, .lang-hi *, .lang-hi button, .lang-hi span, .lang-hi div {
            font-family: 'Sahitya', 'Noto Sans Devanagari', serif !important;
        }

        /* Anti-Piracy styles */
        @media print {
            body { display: none !important; }
        }
        * {
            box-sizing: border-box;
            -webkit-tap-highlight-color: transparent;
            outline: none;
            user-select: none;
            -webkit-user-select: none;
        }

        button, input, textarea, select {
            font-family: inherit;
        }

        body {
            margin: 0;
            background-color: #ffffff;
            color: var(--dark);
            font-family: 'Simonetta', serif;
            overflow-x: hidden;
            position: relative;
        }

        /* Font switching helpers */
        .lang-en, .lang-en *, .lang-en button, .lang-en span, .lang-en div {
            font-family: 'Outfit', 'Inter', system-ui, -apple-system, sans-serif !important;
        }
        
        .lang-hi, .lang-hi *, .lang-hi button, .lang-hi span, .lang-hi div {
            font-family: 'Sahitya', 'Noto Sans Devanagari', serif !important;
        }

        /* Screen state controls */
        .screen {
            display: none;
            padding: 20px;
            padding-bottom: 100px;
            max-width: 768px;
            margin: 0 auto;
            animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .screen.active {
            display: block;
        }

        @keyframes slideUp {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Fixed Navigation Stack Back Button Header */
        .back-nav-bar {
            position: sticky;
            top: 12px;
            background: rgba(255, 255, 255, 0.88);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            z-index: 999;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 12px;
            padding: 12px 18px !important;
            max-width: calc(100% - 24px);
            margin: 12px auto;
            border: 1.5px solid rgba(0, 0, 0, 0.05);
            border-radius: 20px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .back-nav-btn {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 20px;
            display: flex;
            align-items: center;
            color: var(--primary);
            font-weight: bold;
        }

        /* Headers & Branding styling */
        .header {
            position: sticky;
            top: 12px;
            background: rgba(255, 255, 255, 0.88);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            z-index: 999;
            padding: 12px 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border: 1.5px solid rgba(0, 0, 0, 0.05);
            border-radius: 20px;
            max-width: calc(100% - 24px);
            margin: 12px auto;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .app-branding {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .app-logo {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            object-fit: contain;
            border: 1px solid var(--border-color);
            background: #ffffff !important;
            padding: 4px;
        }

        .greetings-box {
            display: flex;
            flex-direction: column;
        }

        .greet-title {
            margin: 0;
            font-weight: 900;
            font-size: 16px;
        }

        .greet-sub {
            margin: 0;
            font-size: 10px;
            color: var(--primary);
            font-weight: bold;
            letter-spacing: 1px;
        }

        /* Notifications style (Zomato/Swiggy style cards) */
        .scrolling-notifications {
            display: flex;
            gap: 15px;
            overflow-x: auto;
            padding: 10px 5px 20px;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
        }
        .scrolling-notifications::-webkit-scrollbar {
            display: none;
        }

        .notif-card {
            min-width: 280px;
            max-width: 320px;
            background: #ffffff;
            border: 1px solid var(--border-color);
            border-radius: 16px;
            overflow: hidden;
            scroll-snap-align: start;
            box-shadow: 0 4px 12px rgba(0,0,0,0.03);
            display: flex;
            flex-direction: column;
        }

        .notif-banner {
            width: 100%;
            aspect-ratio: 21/9;
            height: auto;
            object-fit: contain;
            background: #ffffff;
        }

        .notif-content {
            padding: 15px;
            display: flex;
            flex-direction: column;
            gap: 6px;
            flex-grow: 1;
        }

        .notif-title {
            margin: 0;
            font-size: 15px;
            font-weight: bold;
        }

        .notif-desc {
            margin: 0;
            font-size: 12px;
            color: var(--grey-text);
            line-height: 1.4;
        }

        .notif-action-btn {
            align-self: flex-start;
            margin-top: 8px;
            padding: 6px 14px;
            background: var(--primary);
            color: white;
            border-radius: 8px;
            text-decoration: none;
            font-size: 11px;
            font-weight: bold;
            transition: opacity 0.2s;
        }

        /* 21:9 Dynamic Sliding Banners */
        .slider-container {
            width: 100%;
            aspect-ratio: 21/9;
            border-radius: 16px;
            overflow: hidden;
            margin-bottom: 25px;
            position: relative;
            background: var(--light-grey);
            border: 1px solid var(--border-color);
        }

        .slides-wrapper {
            display: flex;
            height: 100%;
            transition: transform 0.5s ease-in-out;
        }

        .slide-img {
            width: 100%;
            min-width: 100%;
            flex-shrink: 0;
            height: 100%;
            object-fit: cover !important;
            cursor: pointer;
        }

        .slider-dots {
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            max-width: 90%;
            gap: 6px;
        }

        .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            transition: background 0.3s;
        }

        .dot.active {
            background: #ffffff;
            width: 18px;
            border-radius: 10px;
        }

        /* Layout Cards */
        .grid-blocks {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 25px;
        }

        .library-card {
            background: #ffffff;
            border-radius: 16px;
            border: 1px solid var(--border-color);
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 14px;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0,0,0,0.02);
            transition: transform 0.2s, border-color 0.2s;
        }

        .library-card:active {
            transform: scale(0.97);
            border-color: var(--primary);
        }

        .library-icon {
            font-size: 32px;
            color: var(--primary);
        }

        .library-info {
            display: flex;
            flex-direction: column;
        }

        .library-info h3 {
            margin: 0;
            font-size: 16px;
            font-weight: bold;
        }

        .library-info p {
            margin: 2px 0 0;
            font-size: 11px;
            color: var(--grey-text);
        }

        /* Pure White design items list style */
        .outline-item-card {
            background: white;
            border-radius: 12px;
            border: 1px solid var(--border-color);
            margin-bottom: 12px;
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 15px;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.01);
            transition: border-color 0.2s, box-shadow 0.2s;
            word-break: break-word;
            overflow-wrap: break-word;
        }

        .outline-item-card:active {
            border-color: var(--primary);
            box-shadow: 0 4px 12px rgba(255, 71, 87, 0.08);
        }

        .outline-item-img {
            width: 44px;
            height: 44px;
            border-radius: 10px;
            object-fit: cover;
            background: var(--light-grey);
            border: 1px solid var(--border-color);
            flex-shrink: 0;
        }

        .outline-item-details {
            flex-grow: 1;
            min-width: 0;
            word-break: break-word;
            overflow-wrap: break-word;
        }

        .outline-item-title {
            margin: 0;
            font-size: 15px;
            font-weight: bold;
            word-break: break-word;
            overflow-wrap: break-word;
        }

        .outline-item-subtitle {
            margin: 2px 0 0;
            font-size: 11px;
            color: var(--grey-text);
            word-break: break-word;
            overflow-wrap: break-word;
        }

        /* Screen Header block */
        .section-header-title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 18px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        /* Coming soon visual block styling */
        .coming-soon-box {
            border: 2px dashed #dedede;
            border-radius: 16px;
            padding: 30px;
            text-align: center;
            color: #b2bec3;
            font-weight: 900;
            text-transform: uppercase;
            font-size: 13px;
            letter-spacing: 1px;
            margin-top: 15px;
        }

        /* Social Media Connected block */
        .social-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            margin-top: 10px;
            margin-bottom: 25px;
        }

        .social-link-btn {
            background: white;
            border: 1px solid var(--border-color);
            border-radius: 12px;
            aspect-ratio: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            text-decoration: none;
            color: var(--dark);
            font-size: 24px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.01);
            transition: all 0.2s;
        }

        .social-link-btn:active {
            transform: scale(0.95);
            border-color: var(--primary);
        }

        /* Buttons & Forms styling */
        .btn-fill-prime {
            width: 100%;
            background: var(--dark);
            color: white;
            border: none;
            padding: 16px;
            border-radius: 12px;
            font-size: 15px;
            font-weight: 900;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            transition: opacity 0.2s;
        }

        .btn-fill-prime:active {
            opacity: 0.9;
        }

        .form-input {
            width: 100%;
            background: #ffffff;
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 14px 16px;
            font-size: 14px;
            color: var(--dark);
            margin-bottom: 12px;
            transition: border-color 0.2s;
        }

        .form-input:focus {
            border-color: var(--primary);
        }

        /* Instructions list formatting */
        .info-bullets {
            display: flex;
            flex-direction: column;
            gap: 10px;
            background: #ffffff;
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 20px;
            margin: 20px 0;
            font-size: 13px;
            line-height: 1.5;
        }

        .inst-item {
            display: flex;
            gap: 8px;
            align-items: flex-start;
        }

        .inst-item i {
            color: var(--primary);
            font-size: 16px;
            margin-top: 2px;
        }

        /* Locked Premium screen styles */
        .lock-container {
            text-align: center;
            padding: 40px 15px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
        }

        .qr-image-frame {
            width: 220px;
            height: 220px;
            border-radius: 16px;
            border: 4px solid var(--border-color);
            padding: 10px;
            background: white;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            object-fit: contain;
            margin: 15px 0;
        }

        /* Test Engine Fullscreen Mode */
        #test-engine-panel {
            position: fixed;
            inset: 0;
            background-color: var(--light-grey);
            z-index: 9999;
            display: none;
            flex-direction: column;
            overflow: hidden;
        }

        #test-engine-panel *:not(i):not([class^="ph"]):not([class*=" ph"]) {
            font-family: 'Sahitya', 'Noto Sans Devanagari', serif !important;
        }

        .engine-header {
            margin: 12px 12px 6px 12px;
            min-height: 65px;
            height: auto;
            border: 1.5px solid rgba(0, 0, 0, 0.05);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 18px;
            background: rgba(255, 255, 255, 0.88);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            box-shadow: 0 8px 24px rgba(0,0,0,0.04);
            position: relative;
            z-index: 10;
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Standard CSS Classes for Modals Cancel/Close Elements - Perfect in both Day & Night modes */
        .modal-cancel-btn {
            background: #f1f2f6; 
            color: #2f3542; 
            border: 1px solid #dfe4ea; 
            border-radius: 12px; 
            padding: 12px 18px; 
            font-weight: bold; 
            font-size: 13px; 
            cursor: pointer; 
            font-family: inherit;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
        }
        .modal-cancel-btn:hover {
            background: #e4e7eb;
        }

        .dark-mode .modal-cancel-btn {
            background: rgba(255, 255, 255, 0.08) !important;
            color: #ffffff !important;
            border: 1.5px solid rgba(255, 255, 255, 0.15) !important;
        }
        .dark-mode .modal-cancel-btn:hover {
            background: rgba(255, 255, 255, 0.15) !important;
        }

        .drawer-close-btn {
            background: #f1f2f6;
            color: #1e272e;
            padding: 8px;
            border-radius: 10px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #dfe4ea;
            transition: all 0.2s ease;
        }
        .drawer-close-btn:hover {
            background: #e4e7eb;
        }

        .dark-mode .drawer-close-btn {
            background: rgba(255, 255, 255, 0.08) !important;
            color: #ffffff !important;
            border: 1.5px solid rgba(255, 255, 255, 0.15) !important;
        }
        .dark-mode .drawer-close-btn:hover {
            background: rgba(255, 255, 255, 0.15) !important;
        }

        .circle-close-btn {
            cursor: pointer; 
            padding: 6px; 
            background: #f1f2f6; 
            border: 1px solid #dfe4ea;
            color: #1e272e;
            border-radius: 50%; 
            width: 28px; 
            height: 28px; 
            display: flex; 
            align-items: center; 
            justify-content: center;
            transition: all 0.2s ease;
        }
        .circle-close-btn:hover {
            background: #e4e7eb;
        }
        .dark-mode .circle-close-btn {
            background: rgba(255, 255, 255, 0.08) !important;
            color: #ffffff !important;
            border: 1.5px solid rgba(255, 255, 255, 0.15) !important;
        }
        .dark-mode .circle-close-btn:hover {
            background: rgba(255, 255, 255, 0.15) !important;
        }

        .close-floating-btn {
            position: absolute; 
            top: 15px; 
            right: 15px; 
            width: 32px; 
            height: 32px; 
            border-radius: 50%; 
            border: none; 
            background: #f1f2f6; 
            color: #1e272e; 
            font-size: 20px; 
            font-weight: bold; 
            cursor: pointer; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            transition: all 0.2s;
        }
        .close-floating-btn:hover {
            background: #e4e7eb;
        }
        .dark-mode .close-floating-btn {
            background: rgba(255, 255, 255, 0.08) !important;
            color: #ffffff !important;
        }
        .dark-mode .close-floating-btn:hover {
            background: rgba(255, 255, 255, 0.15) !important;
        }

        /* Elegant container shape for header action buttons (Theme and Profile) in both Light and Dark mode */
        .header-action-btn {
            background: var(--light-grey) !important;
            border: 1.5px solid var(--border-color) !important;
            width: 38px;
            height: 38px;
            padding: 0px;
            border-radius: 12px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--dark) !important;
            transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
        }
        
        .header-action-btn:hover {
            background: #eef1f6 !important;
            border-color: #cbd5e1 !important;
            transform: translateY(-1px);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }

        .dark-mode .header-action-btn {
            background: rgba(255, 255, 255, 0.08) !important;
            border: 1.5px solid rgba(255, 255, 255, 0.14) !important;
            color: #ffffff !important;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }

        .dark-mode .header-action-btn:hover {
            background: rgba(255, 255, 255, 0.15) !important;
            border-color: rgba(255, 255, 255, 0.22) !important;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        /* Styling for the detailed analysis previous/next buttons */
        .analysis-nav-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            padding: 9px 15px;
            border-radius: 12px;
            font-size: 12.5px;
            font-weight: 700;
            background: var(--light-grey) !important;
            color: var(--dark) !important;
            border: 1.5px solid var(--border-color) !important;
            cursor: pointer;
            transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
            user-select: none;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
        }

        .analysis-nav-btn:hover:not(:disabled) {
            background: #eef1f6 !important;
            border-color: #cbd5e1 !important;
            transform: translateY(-1px);
            box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        .analysis-nav-btn:disabled {
            opacity: 0.35 !important;
            cursor: not-allowed !important;
            background: var(--light-grey) !important;
            border-color: var(--border-color) !important;
            color: var(--grey-text) !important;
        }

        .dark-mode .analysis-nav-btn {
            background: rgba(255, 255, 255, 0.08) !important;
            border: 1.5px solid rgba(255, 255, 255, 0.14) !important;
            color: #ffffff !important;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }

        .dark-mode .analysis-nav-btn:hover:not(:disabled) {
            background: rgba(255, 255, 255, 0.15) !important;
            border-color: rgba(255, 255, 255, 0.22) !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }

        .engine-title-group {
            display: flex;
            align-items: center;
            gap: 10px;
            overflow: hidden;
            flex: 1;
            min-width: 0;
        }

        #testEngineName {
            margin: 0;
            font-size: 11.5px;
            font-weight: 850;
            letter-spacing: -0.2px;
            color: var(--dark);
            line-height: 1.35;
            word-break: break-word;
            overflow-wrap: anywhere;
        }
        @media (min-width: 480px) {
            #testEngineName {
                font-size: 12px;
            }
        }
        @media (min-width: 768px) {
            #testEngineName {
                font-size: 13.5px;
            }
        }

        .guidelines-card {
            background: linear-gradient(to bottom, #fafafa, #ffffff);
            border: 1.5px solid var(--border-color);
            border-radius: 20px;
            padding: 20px;
            margin-bottom: 24px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.02);
            text-align: left;
        }

        .dark-mode .guidelines-card {
            background: linear-gradient(to bottom, #1c1c1e, #121212) !important;
            border-color: #2c2c2e !important;
        }

        .engine-submit-btn {
            background: var(--primary);
            color: white;
            font-weight: 900;
            border: none;
            border-radius: 8px;
            padding: 8px 16px;
            cursor: pointer;
            font-size: 12px;
        }

        .engine-tools-badge {
            background: var(--light-grey);
            border: 1px solid var(--border-color);
            padding: 6px 12px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 6px;
            cursor: pointer;
            font-weight: 800;
            font-size: 12px;
        }

        /* Professional fixed background watermark */
        .watermark-container {
            display: none !important;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            pointer-events: none;
            opacity: 0.05;
            z-index: 1;
            width: 100%;
            text-align: center;
        }

        .watermark-img {
            width: 160px;
            height: 160px;
            object-fit: cover;
            border-radius: 20px;
            margin-bottom: 12px;
        }

        .watermark-text {
            font-size: 32px;
            font-weight: 950;
            letter-spacing: 4px;
            color: var(--dark);
        }

        /* Exam questions container */
        .engine-content {
            flex-grow: 1;
            padding: 24px;
            overflow-y: auto;
            position: relative;
            z-index: 5;
        }

        .engine-question-num {
            font-size: 11px;
            font-weight: 900;
            color: var(--primary);
            letter-spacing: 1px;
            margin-bottom: 8px;
        }

        .engine-question-text {
            font-size: 18px;
            font-weight: bold;
            line-height: 1.5;
            margin-bottom: 25px;
            word-break: break-word;
            overflow-wrap: break-word;
        }

        .option-button {
            width: 100%;
            background: white;
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 16px;
            text-align: left;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 12px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 12px;
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            word-break: break-word;
            overflow-wrap: break-word;
        }

        .option-button span {
            flex: 1;
            min-width: 0;
            word-break: break-word;
            overflow-wrap: break-word;
        }

        .option-button:active {
            transform: scale(0.99);
        }

        .option-button.selected {
            border-color: var(--primary);
            background: var(--primary-light);
            box-shadow: 0 4px 12px rgba(255, 71, 87, 0.05);
        }

        .option-badge {
            width: 24px;
            height: 24px;
            border-radius: 6px;
            border: 1.5px solid var(--border-color);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            font-weight: 900;
            color: var(--grey-text);
            background: transparent;
        }

        .option-button.selected .option-badge {
            background: var(--primary);
            border-color: var(--primary);
            color: white;
        }

        .engine-footer {
            margin: 6px 12px 16px 12px;
            height: 66px;
            border: 1.5px solid rgba(0, 0, 0, 0.05);
            border-radius: 40px; /* Highly curved capsule style requested by the user */
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.05);
            position: relative;
            z-index: 10;
            transition: all 0.3s;
        }

        @media (max-width: 480px) {
            .engine-footer {
                padding: 0 12px;
                height: 60px;
                margin: 6px 8px 12px 8px;
            }
            .engine-btn-nav {
                width: 40px;
                height: 40px;
                font-size: 16px;
            }
            .review-badge-btn {
                padding: 8px 12px;
                font-size: 10px;
                gap: 4px;
            }
        }

        .engine-btn-nav {
            background: var(--light-grey);
            border: 1px solid var(--border-color);
            border-radius: 10px;
            width: 44px;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 18px;
            color: var(--dark);
        }

        .engine-btn-nav:disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }

        .review-badge-btn {
            background: #ffffff;
            border: 1px solid var(--border-color);
            padding: 10px 18px;
            font-size: 11px;
            color: var(--dark);
            border-radius: 20px;
            font-weight: 900;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .review-badge-btn.active {
            background: var(--blue);
            color: white;
            border-color: var(--blue);
        }

        /* Sliding Bottom Drawers / Modals */
        .drawer-sheet-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.4);
            z-index: 10000;
            display: none;
            backdrop-filter: blur(2px);
        }

        .drawer-sheet {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: white;
            border-radius: 24px 24px 0 0;
            z-index: 10001;
            padding: 25px;
            max-height: 75vh;
            display: none;
            flex-direction: column;
            box-shadow: 0 -10px 30px rgba(0,0,0,0.15);
            animation: drawUpDown 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes drawUpDown {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
        }

        .palette-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 10px;
            overflow-y: auto;
            padding: 15px 0;
            max-height: 40vh;
        }

        .palette-cell {
            aspect-ratio: 1;
            border-radius: 12px;
            border: 2px solid var(--border-color);
            background: white;
            font-size: 14px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s;
        }

        .palette-cell.answered {
            background: var(--green);
            color: white;
            border-color: var(--green);
        }

        .palette-cell.review-marked {
            background: var(--blue);
            color: white;
            border-color: var(--blue);
        }

        .palette-cell.not-visited {
            background: var(--light-grey);
            color: var(--grey-text);
            border-color: var(--border-color);
        }

        .palette-legend {
            display: flex;
            justify-content: space-around;
            padding: 10px 0;
            font-size: 10px;
            border-top: 1px solid var(--border-color);
            margin-top: 10px;
        }

        .legend-item {
            display: flex;
            align-items: center;
            gap: 4px;
            font-weight: bold;
        }

        /* Scorecard visual block styles */
        .scorecard-block {
            background: var(--dark);
            color: white;
            padding: 30px;
            border-radius: 20px;
            text-align: center;
            margin-bottom: 25px;
        }

        .stats-summary-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-top: 20px;
        }

        .stat-badge-cube {
            background: rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 15px;
            text-align: center;
        }

        .stat-badge-cube p {
            margin: 0;
            font-size: 10px;
            text-transform: uppercase;
            opacity: 0.6;
            letter-spacing: 1px;
            font-weight: bold;
        }

        .stat-badge-cube h4 {
            margin: 5px 0 0;
            font-size: 18px;
            font-weight: bold;
        }

        /* Analysis Question Detail Modals */
        .analysis-detail-modal {
            position: fixed;
            inset: 0;
            background: white;
            z-index: 50000;
            display: none;
            flex-direction: column;
            padding: 24px;
        }

        .analysis-question-box {
            background: var(--light-grey);
            padding: 16px;
            border-radius: 12px;
            border: 1px solid var(--border-color);
            margin-bottom: 20px;
        }

        .analysis-opt-box {
            padding: 14px;
            border-radius: 10px;
            border: 1.5px solid var(--border-color);
            margin-bottom: 8px;
            font-weight: bold;
        }

        .analysis-opt-box.correct {
            border-color: var(--green);
            background: #e8f8f0;
        }

        .analysis-opt-box.wrong {
            border-color: var(--primary);
            background: var(--primary-light);
        }

        .analysis-explanation-box {
            background: #e1f5fe;
            border: 1px solid #b3e5fc;
            padding: 16px;
            border-radius: 12px;
            font-size: 13px;
            color: #0277bd;
            margin-top: 15px;
        }

        /* Bottom Sticky tab bar navigation */
        .bottom-nav-bar {
            position: fixed;
            bottom: 16px;
            left: 50%;
            transform: translateX(-50%);
            width: calc(100% - 32px);
            max-width: 480px;
            height: 66px;
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1.5px solid rgba(0, 0, 0, 0.05);
            border-radius: 40px; /* Highly curved "curved mast sa lage" like the screenshot */
            display: flex;
            justify-content: space-around;
            align-items: center;
            z-index: 1000;
            box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.05);
            padding: 0 8px;
            transition: all 0.3s;
        }

        .bottom-nav-item {
            text-decoration: none;
            color: #8f9ca2;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            font-weight: 800;
            gap: 2px;
            cursor: pointer;
            height: 52px;
            min-width: 72px;
            border-radius: 26px; /* Pill/capsule background shape */
            transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .bottom-nav-item.active {
            color: var(--primary) !important;
            background: rgba(255, 71, 87, 0.1); /* Very crisp soft glow of the coral primary color */
            box-shadow: inset 0 1px 2px rgba(255, 71, 87, 0.08);
        }

        .bottom-nav-item i {
            font-size: 20px;
            transition: transform 0.2s ease;
        }

        .bottom-nav-item.active i {
            transform: translateY(-1px) scale(1.05);
        }

        @media (hover: hover) {
            .bottom-nav-item:hover:not(.active) {
                color: var(--primary);
                background: rgba(255, 71, 87, 0.04);
            }
        }

        /* Account profiles page visual elements */
        .profile-hero {
            background: var(--light-grey);
            border: 1px solid var(--border-color);
            border-radius: 20px;
            padding: 30px;
            text-align: center;
            margin-bottom: 20px;
        }

        .premium-unlocked-badge {
            background: var(--green);
            color: white;
            font-size: 11px;
            font-weight: 900;
            border-radius: 20px;
            padding: 5px 14px;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            margin-top: 10px;
        }

        /* Continuous Dynamic Screen watermark for anti-screenshot */
        .screen-anti-leak-layer {
            display: none !important;
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 999999;
            opacity: 0.025;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(4, 1fr);
            padding: 30px;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            color: var(--dark);
            font-weight: bold;
        }

        .leak-label {
            transform: rotate(-35deg);
            white-space: nowrap;
        }
    </style>
    <!-- __CHUNK_SCRIPTS_PLACEHOLDER__ -->
</head>
<body>
    <script>
        try {
            if (localStorage.getItem("_preemptive_theme_mode") === "dark") {
                document.body.classList.add("dark-mode");
            }
        } catch(e){}
    </script>

    <!-- Continuous Floating Security Watermark Grid -->
    <div class="screen-anti-leak-layer" id="securityOverlay"></div>

    <!-- MAIN EXAM ENGINE MODULE -->
    <div id="test-engine-panel">
        <div class="engine-header" style="justify-content: space-between; gap: 8px; padding: 8px 14px; min-height: 65px; height: auto;">
            <div style="display: flex; align-items: center; gap: 6px; min-width: 0; flex: 1; justify-content: flex-start;">
                <div class="engine-title-group" onclick="triggerTestInterruptionPause()" style="cursor: pointer; display: flex; align-items: center; gap: 8px; min-width: 0;" title="Pause / Exit Test">
                    <img id="testEngineLogo" class="app-logo" src="${config.logoUrl}" style="flex-shrink: 0; width: 34px; height: 34px; border-radius: 8px; padding: 2px;">
                    <div style="min-width: 0; display: flex; flex-direction: column; flex: 1;">
                        <span id="testEngineName" style="margin: 0; font-weight: 850; display: block; line-height: 1.35;">--</span>
                        <button class="engine-tools-badge" onclick="event.stopPropagation(); handleToggleLanguage()" id="translateBtn" style="margin-top: 1px; height: 18px; padding: 0 5px; font-size: 8px; border-radius: 4px; background: var(--light-grey); border: 1px solid var(--border-color); display: flex; align-items: center; gap: 3px; cursor: pointer;">
                            <i class="ph ph-translate" style="font-size: 9px;"></i> <span id="translateLabel" style="font-size: 8px;">TRANSLATE</span>
                        </button>
                    </div>
                </div>
            </div>
            
            <div style="font-weight: 900; color: var(--primary); font-size: 13.5px; font-family: monospace; background: rgba(255,107,53,0.08); padding: 5px 10px; border-radius: 8px; border: 1px solid rgba(255,107,53,0.15); display: flex; align-items: center; gap: 4px; white-space: nowrap; flex-shrink: 0;" id="testTimerTextContainer">
                <i class="ph ph-clock" style="font-size: 12px; font-weight: bold; color: var(--primary);"></i>
                <span id="testTimerText" style="font-family: monospace !important; font-weight: 950;">00:00</span>
            </div>

            <div style="display: flex; align-items: center; gap: 6px; flex-shrink: 0; justify-content: flex-end;">
                <button class="engine-tools-badge" onclick="handleTogglePalette(true)" style="height: 34px; width: 34px; padding: 0; display: flex; align-items: center; justify-content: center; border-radius: 50%;" title="Questions Palette">
                    <i class="ph-bold ph-squares-four" style="font-size: 14px;"></i>
                </button>
                <button class="engine-submit-btn" onclick="handlePromptSubmitTest()" style="height: 34px; padding: 0 12px; font-size: 11px; border-radius: 8px; font-weight: bold; margin: 0; display: flex; align-items: center; justify-content: center;">SUBMIT</button>
            </div>
        </div>

        <div class="watermark-container">
            <img class="watermark-img" src="${config.logoUrl}">
            <div class="watermark-text">PRAYAS ONE</div>
        </div>

        <div class="engine-content" id="engineQsContent">
            <!-- Questions rendered here -->
        </div>

        <div class="engine-footer">
            <button class="engine-btn-nav" id="btnPrevQ" onclick="handlePrevQuestion()">
                <i class="ph-bold ph-caret-left"></i>
            </button>
            <button class="review-badge-btn" id="btnMarkReview" onclick="handleToggleMarkReview()">
                <i class="ph-bold ph-bookmark-simple"></i> MARK FOR REVIEW
            </button>
            <button class="engine-btn-nav" id="btnNextQ" onclick="handleNextQuestion()">
                <i class="ph-bold ph-caret-right"></i>
            </button>
        </div>
    </div>


    <!-- APP CORE NAVIGATION VISUAL HEADERS -->
    <div class="header" id="mainHeader">
        <div class="app-branding">
            <img class="app-logo" src="${config.logoUrl}">
            <div class="greetings-box">
                <h4 class="greet-title" id="displayGreetText">${config.studentGreeting}</h4>
                <p class="greet-sub" id="displayGreetSubtitle">${config.studentSubGreeting || 'PRAYAS ONE PROFESSIONAL HUB'}</p>
            </div>
        </div>
        <div style="display: flex; gap: 6px; align-items: center;">
            <div class="header-action-btn" id="themeToggleBtn" onclick="handleToggleThemeMode()">
                <i class="ph ph-sun" id="themeSunIcon" style="font-size: 20px; display: none;"></i>
                <i class="ph ph-moon" id="themeMoonIcon" style="font-size: 20px;"></i>
            </div>
            <div class="header-action-btn" onclick="handleTabNavigation('acc')">
                <i class="ph ph-user" style="font-size: 20px;"></i>
            </div>
        </div>
    </div>

    <!-- BACK STACK PERSISTENT BAR FOR NESTED LIBS -->
    <div class="back-nav-bar" id="backNavigationHeader" style="display: none; padding: 12px 20px;">
        <button class="back-nav-btn" onclick="handleHistoryBack()">
            <i class="ph ph-arrow-left"></i>
            <span style="font-size: 13px; margin-left: 6px; font-weight: 800;">BACK</span>
        </button>
        <span style="font-size: 13px; font-weight: 900; color: var(--dark); margin-left: auto;" id="navHeaderBreadcrumb">--</span>
    </div>


    <!-- SCREENS CONTAINER -->

    <!-- Home screen -->
    <div id="scr-home" class="screen active">
        <!-- 21:9 Slider carousel -->
        <div class="slider-container" id="studentSliderBlock">
            <div class="slides-wrapper" id="studentSlidesWrapper">
                <!-- Javascript slides injected here -->
            </div>
            <div class="slider-dots" id="studentSliderDots"></div>
        </div>

        <!-- Zomato style Notification Carousel -->
        <div class="section-header-title" id="notifScrollAnchor" style="font-size: 16px; margin-bottom: 6px;">
            <i class="ph-fill ph-bell-ringing" style="color: var(--primary);"></i> Important Notices
        </div>
        <div class="scrolling-notifications" id="studentNoticeBoard">
            <!-- Notices injected -->
        </div>

        <div class="section-header-title">
            <i class="ph-fill ph-grid-four" style="color: var(--primary)"></i> Quick Access Library
        </div>

        <div class="grid-blocks" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
            <div class="library-card" onclick="handleOpenCategoryLibrary('test')" style="background: white; border: 1.5px solid var(--border-color); border-radius: 18px; padding: 12px 14px; display: flex; align-items: center; gap: 10px; cursor: pointer; transition: all 0.2s ease;">
                <div style="background: rgba(255, 107, 53, 0.1); width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; shrink-0;">
                    <i class="ph ph-exam" style="font-size: 22px; color: var(--primary);"></i>
                </div>
                <div class="library-info">
                    <h3 style="margin: 0; font-size: 13px; font-weight: 900; color: var(--dark);">Exam Centre</h3>
                    <p style="margin: 2px 0 0; font-size: 10px; color: var(--grey-text); font-weight: bold;">Practice Desk</p>
                </div>
            </div>
            
            <div class="library-card" onclick="handleOpenCategoryLibrary('pdf')" style="background: white; border: 1.5px solid var(--border-color); border-radius: 18px; padding: 12px 14px; display: flex; align-items: center; gap: 10px; cursor: pointer; transition: all 0.2s ease;">
                <div style="background: rgba(34, 197, 94, 0.1); width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; shrink-0;">
                    <i class="ph ph-file-pdf" style="font-size: 22px; color: #22c55e;"></i>
                </div>
                <div class="library-info">
                    <h3 style="margin: 0; font-size: 13px; font-weight: 900; color: var(--dark);">PDF Books</h3>
                    <p style="margin: 2px 0 0; font-size: 10px; color: var(--grey-text); font-weight: bold;">E-Resource Books</p>
                </div>
            </div>
        </div>

        <div class="section-header-title">
            <i class="ph-fill ph-chats" style="color: var(--primary)"></i> Connect Live With Me
        </div>
        
        <div class="social-grid">
            ${config.social.whatsapp ? `
            <a href="${config.social.whatsapp}" target="_blank" class="social-link-btn" style="color: #25d366;">
                <i class="ph-fill ph-whatsapp-logo"></i>
            </a>` : ''}
            ${config.social.telegram ? `
            <a href="${config.social.telegram}" target="_blank" class="social-link-btn" style="color: #0088cc;">
                <i class="ph-fill ph-telegram-logo"></i>
            </a>` : ''}
            ${config.social.instagram ? `
            <a href="${config.social.instagram}" target="_blank" class="social-link-btn" style="color: #c13584;">
                <i class="ph-fill ph-instagram-logo"></i>
            </a>` : ''}
            ${config.social.youtube ? `
            <a href="${config.social.youtube}" target="_blank" class="social-link-btn" style="color: #ff0000;">
                <i class="ph-fill ph-youtube-logo"></i>
            </a>` : ''}
            ${(config.social.customLinks || []).map((link: any) => `
            <a href="${link.url}" target="_blank" class="social-link-btn" style="color: ${link.color || '#1e272e'};">
                <i class="${link.icon || 'ph-fill ph-link'}"></i>
            </a>`).join('')}
        </div>

        <!-- Saved Questions Hub dashboard segment -->
        <div id="savedQuestionsSection"></div>
    </div>

    <!-- Category screen -->
    <div id="scr-category" class="screen">
        <h3 class="section-header-title" id="categorySelectionTitle">--</h3>
        <div id="categoryGridArea"></div>
    </div>

    <!-- Sub-category screen -->
    <div id="scr-subcat" class="screen">
        <h3 class="section-header-title" id="subcategorySelectionTitle">--</h3>
        <div id="subcategoryGridArea"></div>
    </div>

    <!-- Topics/Contents lists -->
    <div id="scr-topics" class="screen">
        <h3 class="section-header-title" id="topicSelectionTitle">--</h3>
        <div id="topicsGridArea"></div>
    </div>


    <!-- Instructions / Preparation Screen -->
    <div id="scr-instructions" class="screen">
        <div style="text-align: center; margin-bottom: 24px; position: relative;">
            <div style="width: 72px; height: 72px; background: rgba(255,107,53,0.07); border: 2px solid rgba(255,107,53,0.15); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 14px;">
                <i class="ph ph-exam" style="font-size: 38px; color: var(--primary);"></i>
            </div>
            <h2 id="instExTitle" style="font-weight: 900; margin: 0 0 6px; font-size: 21px; color: var(--dark); letter-spacing: -0.3px;">--</h2>
            <span style="font-size: 11px; text-transform: uppercase; color: var(--grey-text); font-weight: bold; letter-spacing: 1px; background: var(--light-grey); padding: 4px 10px; border-radius: 20px; border: 1px solid var(--border-color);">Online Test Portal</span>
        </div>

        <!-- Professional Styled Meta Information Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
            <div style="background: var(--light-grey); border: 1.5px solid var(--border-color); border-radius: 16px; padding: 14px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;">
                <i class="ph ph-clock" style="font-size: 20px; color: var(--primary);"></i>
                <span style="font-size: 10px; text-transform: uppercase; font-weight: 800; color: var(--grey-text); letter-spacing: 0.5px;">Duration Limit</span>
                <span id="instExDuration" style="font-size: 15px; font-weight: 900; color: var(--dark);">--</span>
            </div>
            <div style="background: var(--light-grey); border: 1.5px solid var(--border-color); border-radius: 16px; padding: 14px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;">
                <i class="ph ph-question" style="font-size: 20px; color: var(--primary);"></i>
                <span style="font-size: 10px; text-transform: uppercase; font-weight: 800; color: var(--grey-text); letter-spacing: 0.5px;">Total Questions</span>
                <span id="instExCount" style="font-size: 15px; font-weight: 900; color: var(--dark);">--</span>
            </div>
        </div>

        <!-- Marking Scheme Panels -->
        <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
            <div style="background: white; border: 1.5px solid var(--border-color); border-radius: 16px; padding: 14px; display: flex; align-items: center; justify-content: space-between; gap: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.015);">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <i class="ph ph-checks" style="font-size: 22px; color: #22c55e;"></i>
                    <div style="text-align: left;">
                        <h4 style="margin: 0; font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--grey-text); letter-spacing: 0.3px;">Standard Marking Scheme</h4>
                        <span style="font-size: 12px; font-weight: 700; color: var(--dark);">Correct response gains positive weight.</span>
                    </div>
                </div>
                <div style="background: rgba(34,197,94,0.08); color: #22c55e; border: 1px solid rgba(34,197,94,0.15); font-size: 10.5px; font-weight: 900; padding: 4px 8px; border-radius: 8px; white-space: nowrap; text-transform: uppercase;" id="instExPositiveLabel">
                    Correct: +<span id="instExPositive">-</span>
                </div>
            </div>

            <div style="background: white; border: 1.5px solid var(--border-color); border-radius: 16px; padding: 14px; display: flex; align-items: center; justify-content: space-between; gap: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.015);">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <i class="ph ph-x-circle" style="font-size: 22px; color: #ef4444;"></i>
                    <div style="text-align: left;">
                        <h4 style="margin: 0; font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--grey-text); letter-spacing: 0.3px;">Penalty (Negative Mark)</h4>
                        <span style="font-size: 12px; font-weight: 700; color: var(--dark);">Incorrect response results in reductions.</span>
                    </div>
                </div>
                <div style="background: rgba(239,68,68,0.08); color: #ef4444; border: 1px solid rgba(239,68,68,0.15); font-size: 10.5px; font-weight: 900; padding: 4px 8px; border-radius: 8px; white-space: nowrap; text-transform: uppercase;" id="instExNegativeLabel">
                    Wrong: -<span id="instExNegative">-</span>
                </div>
            </div>
        </div>

        <!-- Beautifully Formatted Guidelines Board -->
        <div class="guidelines-card">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; border-bottom: 1.5px solid var(--border-color); padding-bottom: 12px;">
                <i class="ph-bold ph-shield-check" style="color: var(--primary); font-size: 22px;"></i>
                <h3 style="margin: 0; font-size: 13px; font-weight: 900; letter-spacing: -0.2px; text-transform: uppercase; color: var(--dark);">MOCK TEST GUIDELINES</h3>
            </div>
            
            <div style="color: var(--dark); font-size: 12.5px; line-height: 1.6; display: flex; flex-direction: column; gap: 14px;">
                <div style="display: flex; gap: 10px; align-items: flex-start;">
                    <span style="width: 20px; height: 20px; background: rgba(255,107,53,0.1); color: var(--primary); font-size: 11px; font-weight: 900; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">1</span>
                    <div>
                        <strong>Secure Lockdown Mode:</strong>
                        <p style="margin: 2px 0 0 0; font-size: 11.5px; color: var(--grey-text);">Do not minimize the screen or change tabs. Loss of focus will instantaneously trigger safety pause state.</p>
                    </div>
                </div>

                <div style="display: flex; gap: 10px; align-items: flex-start;">
                    <span style="width: 20px; height: 20px; background: rgba(255,107,53,0.1); color: var(--primary); font-size: 11px; font-weight: 900; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">2</span>
                    <div>
                        <strong>Bilingual Evaluation Options:</strong>
                        <p style="margin: 2px 0 0 0; font-size: 11.5px; color: var(--grey-text);">Toggle assessment languages anytime using the <strong>TRANSLATE</strong> option provided in header bar during interactive play.</p>
                    </div>
                </div>

                <div style="display: flex; gap: 10px; align-items: flex-start;">
                    <span style="width: 20px; height: 20px; background: rgba(255,107,53,0.1); color: var(--primary); font-size: 11px; font-weight: 900; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">3</span>
                    <div>
                        <strong>Self-Saving & Bookmarking:</strong>
                        <p style="margin: 2px 0 0 0; font-size: 11.5px; color: var(--grey-text);">Bookmark hard or important questions during practice. Access them conveniently anytime directly from home workspace.</p>
                    </div>
                </div>

                <div style="display: flex; gap: 10px; align-items: flex-start; border-top: 1px dashed var(--border-color); padding-top: 14px;">
                    <span style="width: 20px; height: 20px; background: rgba(255,107,53,0.08); color: var(--primary); font-size: 11px; font-weight: 900; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; border: 1px solid rgba(255,107,53,0.18);"><i class="ph ph-article" style="font-size: 11px;"></i></span>
                    <div>
                        <strong>Guidelines:</strong>
                        <p id="instExDesc" style="margin: 4px 0 0; font-size: 11.5px; color: var(--grey-text); line-height: 1.5; font-weight: 600;">--</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Voucher Activation fields config -->
        <div id="couponEntrySection" style="display: none; background: #fffde7; border: 1px solid #fff59d; border-radius: 16px; padding: 20px; margin-bottom: 20px; text-align: left;">
            <div style="font-weight: bold; font-size: 13px; color: #f57f17; margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
                <i class="ph-fill ph-ticket"></i> DO YOU HAVE A COUPON CODE?
            </div>
            <div style="display: flex; gap: 8px;">
                <input type="text" id="couponCodeInput" class="form-input" style="margin-bottom:0;" placeholder="Enter promo code">
                <button onclick="handleVerifyCouponSubmit()" style="background:var(--dark); color:white; border:none; border-radius:12px; padding: 12px 20px; font-weight:bold; font-size:12px; cursor:pointer;">APPLY</button>
            </div>
            <p id="couponFeedbackMsg" style="margin:6px 0 0; font-size:11px; font-weight:bold;"></p>
        </div>

        <button class="btn-fill-prime" onclick="handleBeginTestInitiation()">
            <i class="ph ph-play-circle" style="font-size: 20px;"></i> START TEST
        </button>
    </div>


    <!-- Locked Payment Premium Screen (Redesigned) -->
    <div id="scr-pay" class="screen">
        <div style="background: white; border-radius: 24px; border: 1px solid var(--border-color); padding: 25px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); max-width: 500px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 20px;">
                <i class="ph-fill ph-crown" style="font-size: 54px; color: var(--primary);"></i>
                <h2 style="font-weight: 900; margin: 8px 0 2px 0; font-size: 22px;">Upgrade to Premium</h2>
                <p style="font-size: 13px; color: var(--grey-text); line-height: 1.4; margin: 0 auto; max-width: 340px;">
                    Gain full access to all Mock Exams, past papers, future series and worksheets today!
                </p>
            </div>

            <!-- Pricing Box -->
            <div style="background: linear-gradient(135deg, var(--dark) 0%, #1e293b 100%); color: white; border-radius: 16px; padding: 20px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between;">
                <div>
                    <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; opacity: 0.7; font-weight: bold;">PREMIUM SUBSCRIPTION</span>
                    <h3 style="margin: 4px 0 0 0; font-size: 24px; font-weight: 950; color: var(--primary);">${config.social.premiumPrice || "₹45"} <span style="font-size: 13px; opacity: 0.8; font-weight: normal; color: white;">/ ${config.social.premiumDurationText || "3 Months"}</span></h3>
                </div>
                <div style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15); border-radius: 10px; padding: 6px 12px; font-size: 11px; font-weight: bold; letter-spacing: 0.5px;">
                    ${config.social.premiumValidityText || "VALID FOR 90 DAYS"}
                </div>
            </div>

            <!-- Benefits Checklist -->
            <div style="background: var(--light-grey); border-radius: 16px; padding: 18px; margin-bottom: 20px;">
                <h4 style="margin: 0 0 12px 0; font-size: 13px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px;">Membership Benefits Include:</h4>
                <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px;">
                    ${(config.social.premiumBenefitsText || "Access to Past Tests, Access to Present Tests, Access to Future Tests, Unlimited Test Attempts")
                        .split(",")
                        .map(b => b.trim())
                        .filter(Boolean)
                        .map(b => `
                            <li style="display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: bold;">
                                <i class="ph-bold ph-check" style="color: #22c55e;"></i> ${b}
                            </li>
                        `).join("")}
                </ul>
            </div>

            <!-- QR Payment Section -->
            <div style="text-align: center; border: 1.5px dashed var(--border-color); border-radius: 16px; padding: 20px; margin-bottom: 20px;">
                <span style="font-size: 11px; font-weight: bold; color: var(--grey-text); text-transform: uppercase;">Scan QR Code to Pay ${config.social.premiumPrice || "₹45"}</span>
                <div style="margin: 12px 0;">
                    <img style="width: 160px; height: 160px; border-radius: 12px; border: 1px solid var(--border-color); padding: 5px; background: white;" src="${config.social.paymentQr || 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=payee_prayas'}" id="displayPayQrImage">
                    <br/>
                    <button onclick="handleDownloadMerchantPaymentQRCode()" style="display: inline-flex; align-items: center; justify-content: center; gap: 4px; margin-top: 8px; background: white; border: 1.5px solid var(--border-color); color: var(--dark); padding: 6px 14px; border-radius: 10px; font-size: 11px; font-weight: bold; cursor: pointer;">
                        <i class="ph-bold ph-qr-code" style="font-size: 14px;"></i> ${config.social.qrDownloadText || "Download QR Code"}
                    </button>
                </div>
                <p style="font-size: 11px; color: var(--grey-text); line-height: 1.4; margin: 0;">
                    Scan with BHIM, GPay, PhonePe, Paytm, or any UPI App.
                </p>
            </div>

            <!-- Form Inputs -->
            <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 20px;">
                <h4 style="margin: 0; font-size: 13px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px;">Submit Payment Details:</h4>
                
                <div>
                    <label style="font-size: 11px; font-weight: bold; color: var(--grey-text); text-transform: uppercase;">Aspirant Full Name</label>
                    <input type="text" id="payFormName" class="form-input" style="margin-bottom:0;" placeholder="Enter your full name">
                </div>
                <div>
                    <label style="font-size: 11px; font-weight: bold; color: var(--grey-text); text-transform: uppercase;">Email ID</label>
                    <input type="email" id="payFormEmail" class="form-input" style="margin-bottom:0;" placeholder="student@example.com">
                </div>
                <div>
                    <label style="font-size: 11px; font-weight: bold; color: var(--grey-text); text-transform: uppercase;">Phone Number</label>
                    <input type="tel" id="payFormPhone" class="form-input" style="margin-bottom:0;" placeholder="Enter mobile number">
                </div>
                <div>
                    <label style="font-size: 11px; font-weight: bold; color: var(--grey-text); text-transform: uppercase;">UPI UTR / Transaction ID (12 Digits)</label>
                    <input type="text" id="payFormUTR" class="form-input" style="margin-bottom:0;" placeholder="e.g. 129038475812">
                </div>
                <div>
                    <label style="font-size: 11px; font-weight: bold; color: var(--grey-text); text-transform: uppercase; display: block; margin-bottom: 4px;">Payment Screenshot Upload</label>
                    <div style="background: var(--light-grey); border: 1.5px dashed var(--border-color); border-radius: 12px; padding: 15px; text-align: center; cursor: pointer; position: relative;">
                        <input type="file" id="payFormScreenshot" accept="image/*" style="opacity: 0; position: absolute; inset:0; cursor:pointer;" onchange="handlePayScreenshotChange(this)">
                        <i class="ph ph-upload-simple" style="font-size: 24px; color: var(--grey-text);" id="paySSIcon"></i>
                        <p style="margin: 5px 0 0 0; font-size: 12px; font-weight: bold; color: var(--grey-text);" id="paySSLabel">Choose or Drag Screenshot Image</p>
                    </div>
                </div>
            </div>

            <!-- Refund Policy -->
            <div style="background: #fef2f2; border: 1px solid #fca5a5; border-radius: 12px; padding: 12px; margin-bottom: 25px;">
                <p style="margin:0; font-size: 11px; color: #b91c1c; font-weight: bold; line-height: 1.4;">
                    &#9888;&#65039; Refund Policy: "Once payment is completed, no refund will be provided. Please try the free tests first and then purchase Premium Membership."
                </p>
            </div>

            <button class="btn-fill-prime" onclick="handleSendPaymentDetailsEmail()" style="background: var(--primary); margin:0; width:100%; border-radius: 12px;">
                <i class="ph ph-envelope-simple" style="font-size: 18px;"></i> SEND EMAIL & ACQUIRE ACCESS
            </button>
        </div>
    </div>


    <!-- Account Portal screen (Redesigned) -->
    <div id="scr-acc" class="screen">
        <h3 class="section-header-title">My Personal Profile</h3>

        <div id="studentAuthFormPanel">
            <div style="background: var(--light-grey); border: 1px solid var(--border-color); padding: 25px; border-radius: 20px; text-align: center; margin-bottom: 20px;">
                <i class="ph ph-user-circle" style="font-size: 60px; color: var(--grey-text);"></i>
                <h3 style="margin: 10px 0 0 0; font-weight: 900;">Aspirant Log-In Gateway</h3>
                <p style="font-size: 12px; color: var(--grey-text); margin: 4px 0 0;">Verify your registered student logs to access unlocked materials</p>
            </div>

            <label style="font-weight: bold; font-size: 11px; color: var(--grey-text);">STUDENT REGISTERED EMAIL / PHONE</label>
            <input type="text" id="inputStudentCredMail" class="form-input" placeholder="student@example.com">

            <label style="font-weight: bold; font-size: 11px; color: var(--grey-text);">SECURE ACCESS PASSWORD</label>
            <input type="password" id="inputStudentCredPass" class="form-input" placeholder="••••••••">

            <button class="btn-fill-prime" onclick="handleStudentAuthenticationProcess()">
                <i class="ph ph-sign-in"></i> SIGN-IN SECURELY
            </button>
        </div>

        <div id="studentAuthenticatedProfileArea" style="display: none;">
            <div class="profile-hero" style="text-align: center; border-bottom: 1.5px dashed var(--border-color); padding-bottom: 20px; margin-bottom: 20px;">
                <div style="width: 80px; height: 80px; border-radius: 50%; background: rgba(255, 107, 53, 0.1); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px; border: 2px solid var(--primary);">
                    <i class="ph-fill ph-student" style="font-size: 40px; color: var(--primary);"></i>
                </div>
                <h2 id="studentUserHeaderName" style="margin: 0; font-weight: 950; font-size: 22px; color: var(--dark);">Student Name</h2>
                
                <div style="margin-top: 15px; font-size: 15px; font-weight: 700; color: var(--dark);">
                    Expiry Date: <span id="profileRemainingDays" style="color: var(--primary); font-weight: 800;">--</span>
                </div>
            </div>

            <!-- Keep background DOM structures hidden elements to satisfy dynamic script queries & prevent runtime crashes -->
            <div style="display: none;">
                <p id="studentUserHeaderMail">student@domain.com</p>
                <div id="premiumBadgeEl"><span id="premiumStatusText"></span></div>
                <span id="profileAcctType"></span>
                <span id="profileExpiryDate"></span>
                <span id="panelTotalAttempts"></span>
                <span id="panelHighestScore"></span>
                <span id="panelAverageScore"></span>
                <span id="panelTotalStudyTime"></span>
                <div id="personalAttemptsTableArea">
                    <tbody id="personalAttemptsListBody"></tbody>
                </div>
            </div>

            <button class="btn-fill-prime" style="background: var(--light-grey); color: var(--dark); border: 1px solid var(--border-color); border-radius: 14px; margin-bottom: 10px;" onclick="handleStudentSignOutProcess()">
                <i class="ph ph-sign-out"></i> REVOKE ACCESS / SIGN-OUT
            </button>
        </div>
    </div>


    <!-- Interactive Results and Analyses Dashboard (Redesigned) -->
    <div id="scr-results" class="screen">
        <div class="scorecard-block" style="background: linear-gradient(135deg, var(--dark) 0%, #1e293b 100%); color: white; border-radius: 24px; padding: 25px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); margin-bottom: 25px; position: relative; overflow: hidden;">
            <div style="position: absolute; top: -50px; right: -50px; width: 150px; height: 150px; background: rgba(255,107,53,0.1); border-radius: 50%; pointer-events: none;"></div>
            
            <h2 style="margin: 0 0 5px 0; font-size: 20px; font-weight: 900; letter-spacing: 0.5px; text-align: center;">MOCK TEST SCORECARD</h2>
            <p id="resultsTopicHeader" style="margin: 0 0 20px 0; font-size: 11px; text-transform: uppercase; color: var(--primary); font-weight: bold; text-align: center; letter-spacing: 1px;">GENERAL TEST</p>
            
            <!-- Main Score Big Banner -->
            <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 20px; text-align: center; margin-bottom: 20px;">
                <span style="font-size: 10px; color: rgba(255,255,255,0.6); text-transform: uppercase; font-weight: 800; letter-spacing: 1.5px;">Obtained Score / Marks</span>
                <div style="display: flex; align-items: baseline; justify-content: center; gap: 8px; margin-top: 5px;">
                    <h1 id="statTotalScoreCalcText" style="margin: 0; color: #22c55e; font-size: 40px; font-weight: 950; line-height: 1;">0.00</h1>
                    <span id="statTotalPossibleMarks" style="font-size: 16px; color: rgba(255,255,255,0.4); font-weight: bold;">/ 100.00</span>
                </div>
            </div>

            <!-- Dashboard Stats Grid -->
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 10px 12px; display: flex; align-items: center; gap: 10px;">
                    <i class="ph ph-list-numbers" style="font-size: 18px; color: var(--primary);"></i>
                    <div>
                        <p style="margin: 0; font-size: 9px; color: rgba(255,255,255,0.5); font-weight: bold; text-transform: uppercase;">Total Items</p>
                        <h4 id="statTotalItemsText" style="margin: 2px 0 0; font-size: 14px; font-weight: bold;">0</h4>
                    </div>
                </div>
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 10px 12px; display: flex; align-items: center; gap: 10px;">
                    <i class="ph ph-check-circle" style="font-size: 18px; color: #22c55e;"></i>
                    <div>
                        <p style="margin: 0; font-size: 9px; color: rgba(255,255,255,0.5); font-weight: bold; text-transform: uppercase;">Correct Choice</p>
                        <h4 id="statCorrectCountText" style="margin: 2px 0 0; font-size: 14px; font-weight: bold; color: #22c55e;">0</h4>
                    </div>
                </div>
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 10px 12px; display: flex; align-items: center; gap: 10px;">
                    <i class="ph ph-x-circle" style="font-size: 18px; color: #ef4444;"></i>
                    <div>
                        <p style="margin: 0; font-size: 9px; color: rgba(255,255,255,0.5); font-weight: bold; text-transform: uppercase;">Incorrect Choice</p>
                        <h4 id="statIncorrectCountText" style="margin: 2px 0 0; font-size: 14px; font-weight: bold; color: #ef4444;">0</h4>
                    </div>
                </div>
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 10px 12px; display: flex; align-items: center; gap: 10px;">
                    <i class="ph ph-minus-circle" style="font-size: 18px; color: #3b82f6;"></i>
                    <div>
                        <p style="margin: 0; font-size: 9px; color: rgba(255,255,255,0.5); font-weight: bold; text-transform: uppercase;">Unanswered</p>
                        <h4 id="statUnansweredCountText" style="margin: 2px 0 0; font-size: 14px; font-weight: bold; color: #3b82f6;">0</h4>
                    </div>
                </div>
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 10px 12px; display: flex; align-items: center; gap: 10px;">
                    <i class="ph ph-percent" style="font-size: 18px; color: #eab308;"></i>
                    <div>
                        <p style="margin: 0; font-size: 9px; color: rgba(255,255,255,0.5); font-weight: bold; text-transform: uppercase;">Accuracy Ratio</p>
                        <h4 id="statAccuracyPercent" style="margin: 2px 0 0; font-size: 14px; font-weight: bold; color: #eab308;">0%</h4>
                    </div>
                </div>
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 10px 12px; display: flex; align-items: center; gap: 10px;">
                    <i class="ph ph-clock" style="font-size: 18px; color: #a855f7;"></i>
                    <div>
                        <p style="margin: 0; font-size: 9px; color: rgba(255,255,255,0.5); font-weight: bold; text-transform: uppercase;">Duration Taken</p>
                        <h4 id="statDurationSpent" style="margin: 2px 0 0; font-size: 14px; font-weight: bold; color: #a855f7;">--</h4>
                    </div>
                </div>
            </div>
        </div>

        <!-- Live Test Leaderboard Board is removed -->
        <div id="resultsLeaderboardBlock" style="display: none !important;"></div>

        <h3 class="section-header-title" style="margin-top: 25px; margin-bottom: 8px;">
            <i class="ph ph-chart-bar"></i> Interactive Paper Analysis
        </h3>
        <p style="font-size: 12px; color: var(--grey-text); margin-top: 0; margin-bottom: 15px;">
            Tap on any question block below to instantly inspect correct answer choice, comprehensive evaluations, explanations, and direct references.
        </p>

        <!-- Horizontal Scrollable Selector Row -->
        <div id="analysisQuestionSelectorRow" style="display: flex; gap: 8px; overflow-x: auto; padding: 12px 6px; margin-bottom: 20px; background: var(--light-grey); border: 1px solid var(--border-color); border-radius: 16px; -webkit-overflow-scrolling: touch; scrollbar-width: none;">
            <!-- Rendered horizontally -->
        </div>

        <!-- Inline Detailed Analysis Card Container -->
        <div id="analysisDetailViewerCard" style="background: white; border: 1px solid var(--border-color); border-radius: 20px; padding: 20px; margin-bottom: 25px; min-height: 200px; box-shadow: 0 4px 15px rgba(0,0,0,0.01);">
            <!-- Active Selected Question render here -->
        </div>

        <button class="btn-fill-prime" onclick="handleTriggerRefreshReboot()" style="background: var(--dark); border-radius: 14px; padding: 14px; font-size: 14px; width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s; margin-top: 20px;">
            <i class="ph ph-squares-four" style="font-size: 18px;"></i> Back To Dashboard
        </button>
    </div>


    <!-- Website Popup General Purpose Custom Modal -->
    <div id="websitePopupOverlayModal" class="analysis-detail-modal" style="display: none; align-items: center; justify-content: center; background: rgba(0,0,0,0.7); z-index: 30000; position: fixed; top: 0; left: 0; right: 0; bottom: 0; padding: 20px; backdrop-filter: blur(3px);">
        <div style="background: white; border-radius: 24px; padding: 30px; width: 100%; max-width: 400px; text-align: center; box-shadow: 0 15px 40px rgba(0,0,0,0.3); animation: zoomIn 0.3s ease; position: relative;">
            
            <!-- Close CUT icon -->
            <button onclick="handleCloseWebsiteActivePopup()" class="close-floating-btn" title="Close">
                &times;
            </button>

            <h2 id="p_modal_title" style="font-weight: 900; font-size: 19px; margin: 5px 0 15px; color: var(--dark); font-family: 'Simonetta', serif; padding-right: 25px; text-align: left;">
                Notice
            </h2>
            
            <!-- 1:1 image layout -->
            <div style="margin-bottom: 20px; overflow: hidden; border-radius: 16px; border: 1px solid var(--border-color); width: 100%; aspect-ratio: 1/1; background: #fafafa; display: flex; align-items: center; justify-content: center;">
                <img id="p_modal_image" src="" referrerPolicy="no-referrer" style="width: 100%; height: 100%; object-fit: cover; display: none;" alt="Popup Media" />
            </div>

            <p id="p_modal_text" style="font-size: 13.5px; line-height: 1.6; color: #57606f; margin: 0 0 24px; text-align: left; font-family: 'Simonetta', serif; white-space: pre-wrap; word-break: break-word;">
            </p>
            
            <a id="p_modal_link" href="#" target="_blank" class="btn-fill-prime" style="display: none; background: var(--primary); text-align: center; padding: 14px; border-radius: 12px; font-weight: bold; text-decoration: none; color: white;">
                Explore Details &rarr;
            </a>
        </div>
    </div>


    <!-- Payment Success Custom Modal Popup -->
    <div id="paymentSuccessPopupModal" class="analysis-detail-modal" style="display: none; align-items: center; justify-content: center; background: rgba(0,0,0,0.6); z-index: 10000; position: fixed; top: 0; left: 0; right: 0; bottom: 0; padding: 20px;">
        <div style="background: white; border-radius: 24px; padding: 30px; width: 100%; max-width: 440px; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.15); animation: zoomIn 0.3s ease;">
            <i class="ph-fill ph-check-circle" style="font-size: 64px; color: #22c55e; margin-bottom: 15px; display: inline-block;"></i>
            <h2 style="font-weight: 900; font-size: 20px; margin: 0 0 10px; color: var(--dark); font-family: 'Simonetta', serif;">Submitted Successfully.</h2>
            <p style="font-size: 13.5px; line-height: 1.5; color: var(--grey-text); margin: 0 0 20px; font-family: 'Simonetta', serif;">Access will be granted within 4–24 hours.</p>
            
            <div style="background: var(--light-grey); border-radius: 12px; padding: 15px; text-align: left; margin-bottom: 20px; font-size: 12px; line-height: 1.5; border: 1px solid var(--border-color); font-family: 'Simonetta', serif;">
                <strong style="color: var(--dark); display: block; margin-bottom: 4px;">Support Desk:</strong>
                If you face any issue or do not receive access, please contact: <br>
                <a href="http://t.me/PrayasOneSupportBot" target="_blank" style="color: var(--primary); font-weight: bold; text-decoration: underline;">http://t.me/PrayasOneSupportBot</a>
                <p style="margin: 8px 0 0 0; font-size: 11px; color: var(--grey-text); font-style: italic;">
                    *Please attach your payment screenshot while contacting support.
                </p>
            </div>
            
            <button onclick="handleClosePaymentSuccessModal()" class="btn-fill-prime" style="margin: 0; width: 100%; background: var(--dark); padding: 12px; border-radius: 10px;">
                Done & Return Home
            </button>
        </div>
    </div>


    <!-- Gated Content Premium Blocker Custom Modal -->
    <div id="premiumBlockerModal" class="analysis-detail-modal" style="display: none; align-items: center; justify-content: center; background: rgba(0,0,0,0.6); z-index: 10000; position: fixed; top: 0; left: 0; right: 0; bottom: 0; padding: 20px;">
        <div style="background: white; border-radius: 24px; padding: 30px; width: 100%; max-width: 400px; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.15); animation: zoomIn 0.3s ease;">
            <i class="ph-fill ph-lock-key" style="font-size: 64px; color: var(--primary); margin-bottom: 15px; display: inline-block;"></i>
            <h2 style="font-weight: 900; font-size: 20px; margin: 0 0 10px; color: var(--dark); font-family: 'Simonetta', serif;">Premium Membership Required</h2>
            <p style="font-size: 13px; line-height: 1.5; color: var(--grey-text); margin: 0 0 24px; font-family: 'Simonetta', serif;">This content is reserved for Premium Members. Gain access to all mock exams, manuals, and future worksheets instantly.</p>
            
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <button onclick="handleClosePremiumBlocker(); handleTabNavigation('acc')" class="btn-fill-prime" style="background: var(--primary); margin: 0; font-size: 13px; border-radius: 10px;">
                    <i class="ph ph-user"></i> Login to Premium Account
                </button>
                <button onclick="handleClosePremiumBlocker(); navigateToScreen('scr-pay', 'Unlock Premium Plan')" class="btn-fill-prime" style="background: var(--dark); margin: 0; font-size: 13px; border-radius: 10px;">
                    <i class="ph ph-crown"></i> Unlock Premium (${config.social.premiumPrice || "₹45"})
                </button>
                <button onclick="handleClosePremiumBlocker()" class="modal-cancel-btn">
                    Cancel
                </button>
            </div>
        </div>
    </div>


    <!-- Test Protection & Pause Resume Modal -->
    <div id="testPauseResumeModal" class="analysis-detail-modal" style="display: none; align-items: center; justify-content: center; background: rgba(0,0,0,0.8); z-index: 20000; position: fixed; top: 0; left: 0; right: 0; bottom: 0; padding: 20px; backdrop-filter: blur(5px);">
        <div style="background: white; border-radius: 24px; padding: 30px; width: 100%; max-width: 400px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.2); animation: zoomIn 0.3s ease;">
            <i class="ph-bold ph-warning-octagon" style="font-size: 64px; color: var(--primary); margin-bottom: 15px; display: inline-block;"></i>
            <h2 style="font-weight: 950; font-size: 20px; margin: 0 0 10px; color: var(--dark);">Assessment Paused</h2>
            <p style="font-size: 13px; line-height: 1.5; color: var(--grey-text); margin: 0 0 24px;">The test was auto-paused due to window context switching, loss of focus, application lock, or clicking the Back button. Your progress is completely protected.</p>
            
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <button onclick="handleResumeActiveTest()" class="btn-fill-prime" style="background: #22c55e; color: white; width: 100%; padding: 12px; border-radius: 12px; font-weight: bold; font-size: 13.5px; margin: 0; border: none; cursor: pointer;">
                    Resume Test
                </button>
                <button onclick="handleExitActiveTest()" class="modal-cancel-btn" style="width: 100%; border-radius: 12px; padding: 12px; font-size: 13.5px;">
                    Exit Test
                </button>
            </div>
        </div>
    </div>


    <!-- Submit Test Progress Stats Redesigned Custom Modal -->
    <div id="submitConfirmModal" class="analysis-detail-modal" style="display: none; align-items: center; justify-content: center; background: rgba(0,0,0,0.6); z-index: 10010; position: fixed; top: 0; left: 0; right: 0; bottom: 0; padding: 20px;">
        <div style="background: white; border-radius: 24px; padding: 30px; width: 100%; max-width: 420px; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.15); animation: zoomIn 0.3s ease;">
            <i class="ph-bold ph-question" style="font-size: 54px; color: var(--primary); margin-bottom: 15px; display: inline-block;"></i>
            <h2 style="font-weight: 900; font-size: 20px; margin: 0 0 8px; color: var(--dark); font-family: 'Simonetta', serif;">Submit Your Mock Test?</h2>
            <p style="font-size: 13px; color: var(--grey-text); margin-bottom: 24px; font-family: 'Simonetta', serif;">Please review your progress before final evaluation. Once submitted, answers cannot be modified.</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 24px;">
                <div style="background: rgba(34, 197, 94, 0.08); border: 1.5px solid rgba(34, 197, 94, 0.2); border-radius: 16px; padding: 12px; text-align: center;">
                    <p style="margin: 0; font-size: 10px; font-weight: bold; color: rgb(21, 128, 61); text-transform: uppercase;">Attempted</p>
                    <h3 id="confirmAttemptedCount" style="margin: 4px 0 0; font-size: 24px; font-weight: 900; color: rgb(21, 128, 61);">0</h3>
                </div>
                <div style="background: rgba(239, 68, 68, 0.08); border: 1.5px solid rgba(239, 68, 68, 0.2); border-radius: 16px; padding: 12px; text-align: center;">
                    <p style="margin: 0; font-size: 10px; font-weight: bold; color: rgb(185, 28, 28); text-transform: uppercase;">Unattempted</p>
                    <h3 id="confirmUnattemptedCount" style="margin: 4px 0 0; font-size: 24px; font-weight: 900; color: rgb(185, 28, 28);">0</h3>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <button onclick="handleCloseSubmitConfirmModal()" class="modal-cancel-btn" style="padding: 14px; font-size: 13px;">
                    Cancel
                </button>
                <button onclick="handleConfirmSubmitTest()" class="btn-fill-prime" style="margin: 0; padding: 14px; font-size: 13px; background: var(--primary); border-radius: 12px;">
                    Submit Test
                </button>
            </div>
        </div>
    </div>


    <!-- Report Active Question Complaint Drawer-Modal Overlay -->
    <div id="reportQuestionModal" class="analysis-detail-modal" style="display: none; align-items: center; justify-content: center; background: rgba(0,0,0,0.6); z-index: 10020; position: fixed; top: 0; left: 0; right: 0; bottom: 0; padding: 20px;">
        <div style="background: white; border-radius: 24px; padding: 25px; width: 100%; max-width: 450px; text-align: left; box-shadow: 0 10px 25px rgba(0,0,0,0.15); animation: zoomIn 0.3s ease; display: flex; flex-direction: column; gap: 15px;">
            <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 10px;">
                <h3 style="margin: 0; font-weight: 950; font-size: 17px; color: var(--dark); font-family: 'Simonetta', serif;">Report Question Discrepancy</h3>
                <div class="circle-close-btn" onclick="handleCloseReportModal()">
                    <i class="ph ph-x" style="font-size: 16px;"></i>
                </div>
            </div>
            
            <div>
                <label style="font-size: 11px; font-weight: bold; color: var(--grey-text); display: block; margin-bottom: 6px; text-transform: uppercase;">What is wrong with this question? (Optional)</label>
                <textarea id="reportComplaintTextArea" class="form-input" style="height: 110px; resize: none; margin-bottom: 0; font-family: inherit; font-size: 13px; border-radius: 12px; padding: 12px;" placeholder="Describe typo inaccuracies, incorrect correct options keys, solution explanations, or translation bugs..."></textarea>
            </div>
            
            <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 5px;">
                <button onclick="handleCloseReportModal()" class="modal-cancel-btn" style="padding: 12px 18px; font-size: 12px;">
                    Cancel
                </button>
                <button onclick="handleSendReportEmail()" class="btn-fill-prime" style="margin: 0; padding: 12px 20px; font-size: 12px; background: var(--primary); border-radius: 10px;">
                    <i class="ph ph-paper-plane"></i> Send Report Email
                </button>
            </div>
        </div>
    </div>


    <!-- Question Palette Drawer -->
    <div class="drawer-sheet-overlay" id="paletteDrawerOverlay" onclick="handleTogglePalette(false)"></div>
    <div class="drawer-sheet" id="paletteDrawerContainer">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 12px;">
            <h3 style="margin: 0; font-weight: 900;">Mock Exam Palette</h3>
            <div class="drawer-close-btn" onclick="handleTogglePalette(false)">
                <i class="ph ph-x" style="font-size: 18px;"></i>
            </div>
        </div>

        <div class="palette-grid" id="paletteGridContent"></div>

        <div class="palette-legend">
            <div class="legend-item"><div class="palette-cell answered" style="width:16px; height:16px; aspect-ratio:1;"></div> Answered</div>
            <div class="legend-item"><div class="palette-cell review-marked" style="width:16px; height:16px; aspect-ratio:1;"></div> Marked</div>
            <div class="legend-item"><div class="palette-cell not-visited" style="width:16px; height:16px; aspect-ratio:1;"></div> Not Visited</div>
        </div>

        <button class="btn-fill-prime" onclick="handleTogglePalette(false)" style="margin-top: 15px; padding: 12px;">
            CONTINUE TEST
        </button>
    </div>


    <!-- BOTTOM NAVIGATION TABS -->
    <div class="bottom-nav-bar" id="studentMainTabsPanel">
        <div class="bottom-nav-item active" id="tab-home" onclick="handleTabNavigation('home')">
            <i class="ph ph-house"></i>
            <span>Home</span>
        </div>
        <div class="bottom-nav-item" id="tab-tests" onclick="handleTabNavigation('tests')">
            <i class="ph ph-exam"></i>
            <span>Tests</span>
        </div>
        <div class="bottom-nav-item" id="tab-pdfs" onclick="handleTabNavigation('pdfs')">
            <i class="ph ph-file-pdf"></i>
            <span>PDFs</span>
        </div>
        <div class="bottom-nav-item" id="tab-acc" onclick="handleTabNavigation('acc')">
            <i class="ph ph-user"></i>
            <span>Account</span>
        </div>
    </div>


    <!-- Beautiful Custom Dialog Modal (Alert/Confirm) -->
    <div id="customDialogOverlay" style="display: none; align-items: center; justify-content: center; background: rgba(0,0,0,0.65); z-index: 999999; position: fixed; top: 0; left: 0; right: 0; bottom: 0; padding: 20px; backdrop-filter: blur(4px); transition: all 0.2s ease;">
        <div style="background: var(--light-grey, white); border: 2px solid var(--border-color); border-radius: 20px; padding: 25px; width: 100%; max-width: 380px; text-align: center; box-shadow: 0 15px 35px rgba(0,0,0,0.25); animation: customZoomIn 0.22s cubic-bezier(0.16, 1, 0.3, 1);">
            <div id="customDialogIconContainer" style="margin-bottom: 12px; display: flex; align-items: center; justify-content: center;">
                <i class="ph-fill ph-warning-circle" style="font-size: 50px; color: var(--primary);"></i>
            </div>
            <h3 id="customDialogTitle" style="margin: 0 0 8px 0; font-size: 18px; font-weight: 800; color: var(--dark); font-family: 'Outfit', sans-serif;">Alert</h3>
            <p id="customDialogMessage" style="margin: 0 0 20px 0; font-size: 13px; color: var(--grey-text); line-height: 1.5; font-weight: 605; font-family: 'Outfit', sans-serif; white-space: pre-line;">Something happened.</p>
            <div style="display: flex; gap: 10px; justify-content: center;">
                <button id="customDialogCancelBtn" class="modal-cancel-btn" style="flex: 1; padding: 12px; border-radius: 12px; font-weight: bold; cursor: pointer; display: none; font-size: 11px; justify-content: center; margin: 0; height: auto;">CANCEL</button>
                <button id="customDialogOkBtn" class="btn-fill-prime" style="flex: 1; margin: 0; padding: 12px; border-radius: 12px; font-weight: bold; font-size: 12px; cursor: pointer; height: auto;">OK</button>
            </div>
        </div>
    </div>

    <!-- Copyright DISCLAIMER PDF Safe Gate Modal (Popup) -->
    <div id="copyrightPdfOverlay" style="display: none; align-items: center; justify-content: center; background: rgba(15,23,42,0.85); z-index: 1000000; position: fixed; top: 0; left: 0; right: 0; bottom: 0; padding: 20px; backdrop-filter: blur(8px); transition: all 0.25s ease;">
        <div style="background: white; border: 1px solid rgba(0,0,0,0.08); border-radius: 24px; padding: 32px 24px; width: 100%; max-width: 420px; text-align: center; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.4); animation: customZoomIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);">
            <div style="margin-bottom: 18px; display: flex; align-items: center; justify-content: center;">
                <div style="background: #fffbeb; width: 68px; height: 68px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid #fef3c7;">
                    <i class="ph-fill ph-warning" style="font-size: 34px; color: #d97706;"></i>
                </div>
            </div>
            
            <h3 style="margin: 0 0 10px 0; font-size: 22px; font-weight: 850; color: #0f172a; font-family: 'Outfit', sans-serif; letter-spacing: -0.02em;">Notice</h3>
            <p id="copyrightPdfBookTitle" style="margin: 0 0 20px 0; font-size: 13.5px; color: var(--primary); font-family: 'Outfit', sans-serif; font-weight: 750; word-break: break-all; opacity: 0.95; line-height: 1.4;"></p>
            
            <div style="text-align: left; font-family: 'Outfit', sans-serif; font-size: 13.5px; line-height: 1.6; color: #334155;">
                
                <!-- For Educational Purpose Only (Badged layout) -->
                <div style="background: rgba(255,107,53,0.08); border-left: 4px solid var(--primary); border-radius: 12px; padding: 12px 16px; margin-bottom: 14px; display: flex; gap: 10px; align-items: flex-start;">
                    <i class="ph-fill ph-graduation-cap" style="color: var(--primary); font-size: 18px; margin-top: 2px; flex-shrink: 0;"></i>
                    <div>
                        <strong style="color: #c2410c; font-weight: 800; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 2px;">For Educational Purpose Only</strong>
                        <span style="color: #7c2d12; font-size: 12.5px; font-weight: 500;">This material is distributed strictly for guidance, study aids, and educational purposes.</span>
                    </div>
                </div>

                <!-- All Rights Block -->
                <div style="background: #f8fafc; border: 1.5px solid #f1f5f9; border-radius: 12px; padding: 12px 14px; margin-bottom: 20px; display: flex; gap: 10px; align-items: flex-start;">
                    <i class="ph-fill ph-info" style="color: #64748b; font-size: 18px; margin-top: 2px; flex-shrink: 0;"></i>
                    <div>
                        <strong style="color: #475569; font-weight: 800; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 2px;">All Rights Reserved</strong>
                        <span style="color: #475569; font-size: 12.5px; font-weight: 500;">All copyrights, trademarks, and intellectual merits belong to their respective publishers & creators. We do not claim ownership of this content.</span>
                    </div>
                </div>

                <!-- Contact section -->
                <div style="border-top: 1.5px dashed #e2e8f0; padding-top: 16px; margin-bottom: 24px;">
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <span style="font-weight: 700; color: #1e293b; font-size: 13px;">Concerned or want it removed? Email us:</span>
                        <a id="copyrightEmailBtn" href="#" style="background: #fee2e2; color: #991b1b; display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-weight: 800; text-decoration: none; padding: 12px 16px; border-radius: 14px; border: 1.5px solid #fecaca; transition: all 0.2s; font-size: 13px; font-mono; letter-spacing: -0.01em;">
                            <i class="ph-fill ph-envelope-simple" style="font-size: 18px;"></i> good4xo@gmail.com
                        </a>
                    </div>
                </div>
            </div>

            <div style="display: flex; gap: 12px; justify-content: center;">
                <button id="copyrightPdfCancelBtn" class="modal-cancel-btn" style="flex: 1; padding: 14px; border-radius: 14px; font-weight: 800; cursor: pointer; font-size: 13px; margin: 0; height: auto;">CLOSE</button>
                <button id="copyrightPdfDownloadBtn" class="btn-fill-prime" style="flex: 1; margin: 0; padding: 14px; border-radius: 14px; font-weight: 800; font-size: 13px; cursor: pointer; height: auto; text-transform: uppercase; white-space: nowrap;">PROCEED DOWNLOAD</button>
            </div>
        </div>
    </div>
    <style>
        @keyframes customZoomIn {
            from { opacity: 0; transform: scale(0.92); }
            to { opacity: 1; transform: scale(1); }
        }
    </style>

    <!-- APP LOGICAL INTEGRATION SCRIPTS -->
    <script>
        // Global error logging for debugging
        window.onerror = function(msg, url, line, col, error) {
            console.error(msg, url, line, col, error);
            alert("Student App Error: " + msg + "\\nLine: " + line + ", Column: " + col);
            return false;
        };

        function showCustomAlert(title, message, onOk) {
            document.getElementById("customDialogTitle").innerText = title;
            document.getElementById("customDialogMessage").innerText = message;
            
            var iconContainer = document.getElementById("customDialogIconContainer");
            var cleanTitle = (title || "").toLowerCase();
            if (cleanTitle.includes("success") || cleanTitle.includes("done") || cleanTitle.includes("complete") || cleanTitle.includes("saved")) {
                iconContainer.innerHTML = '<i class="ph-fill ph-check-circle" style="font-size: 50px; color: #22c55e;"></i>';
            } else if (cleanTitle.includes("error") || cleanTitle.includes("fail") || cleanTitle.includes("expired") || cleanTitle.includes("denied") || cleanTitle.includes("wrong")) {
                iconContainer.innerHTML = '<i class="ph-fill ph-x-circle" style="font-size: 50px; color: #ef4444;"></i>';
            } else {
                iconContainer.innerHTML = '<i class="ph-fill ph-warning-circle" style="font-size: 50px; color: #FF6B35;"></i>';
            }

            var cancelBtn = document.getElementById("customDialogCancelBtn");
            cancelBtn.style.display = "none";
            
            var okBtn = document.getElementById("customDialogOkBtn");
            okBtn.innerText = "OK";
            okBtn.onclick = function() {
                document.getElementById("customDialogOverlay").style.display = "none";
                if (typeof onOk === "function") {
                    onOk();
                }
            };
            
            document.getElementById("customDialogOverlay").style.display = "flex";
        }

        function showCustomConfirm(title, message, onConfirm, onCancel) {
            document.getElementById("customDialogTitle").innerText = title;
            document.getElementById("customDialogMessage").innerText = message;
            
            document.getElementById("customDialogIconContainer").innerHTML = '<i class="ph-fill ph-question" style="font-size: 50px; color: #3498db;"></i>';
            
            var cancelBtn = document.getElementById("customDialogCancelBtn");
            cancelBtn.style.display = "inline-flex";
            cancelBtn.onclick = function() {
                document.getElementById("customDialogOverlay").style.display = "none";
                if (typeof onCancel === "function") {
                    onCancel();
                }
            };
            
            var okBtn = document.getElementById("customDialogOkBtn");
            okBtn.innerText = "YES, CONFIRM";
            okBtn.onclick = function() {
                document.getElementById("customDialogOverlay").style.display = "none";
                if (typeof onConfirm === "function") {
                    onConfirm();
                }
            };
            
            document.getElementById("customDialogOverlay").style.display = "flex";
        }

        window.showCustomAlert = showCustomAlert;
        window.showCustomConfirm = showCustomConfirm;

        function showCopyrightPdfModal(bookTitle, pdfUrl, onConfirm) {
            document.getElementById("copyrightPdfBookTitle").innerText = "Book/PDFs: " + bookTitle;
            
            // Format nice dynamic report subject and body for email
            var emailSubject = encodeURIComponent("[Copyright Takedown] Prayas One Hub - PDF Resource Request");
            var emailBody = encodeURIComponent(
                "Hello Prayas One Administration,\\n\\n" +
                "I am writing regarding the following PDF study resource listed on the Portal:\\n\\n" +
                "📘 Title: " + bookTitle + "\\n" +
                "🔗 Link: " + pdfUrl + "\\n\\n" +
                "Message: \\n" +
                "⚠️ For educational purposes only.\\n\\n" +
                "All rights belong to the respective owners.\\n\\n" +
                "I kindly request the removal of this link because: "
            );
            
            var emailBtn = document.getElementById("copyrightEmailBtn");
            if (emailBtn) {
                emailBtn.href = "mailto:good4xo@gmail.com?subject=" + emailSubject + "&body=" + emailBody;
            }
            
            var cancelBtn = document.getElementById("copyrightPdfCancelBtn");
            if (cancelBtn) {
                cancelBtn.onclick = function() {
                    document.getElementById("copyrightPdfOverlay").style.display = "none";
                };
            }
            
            var downloadBtn = document.getElementById("copyrightPdfDownloadBtn");
            if (downloadBtn) {
                downloadBtn.onclick = function() {
                    document.getElementById("copyrightPdfOverlay").style.display = "none";
                    if (typeof onConfirm === "function") {
                        onConfirm();
                    }
                };
            }
            
            document.getElementById("copyrightPdfOverlay").style.display = "flex";
        }
        window.showCopyrightPdfModal = showCopyrightPdfModal;
        
        // Override standard window.alert
        window.alert = function(msg) {
            showCustomAlert("System Alert", msg);
        };

        // Decoded Embedded Coach Data
        var DB = {};
        var _appliedCoupons = [];
        try {
            var stored = localStorage.getItem("_student_applied_coupons");
            if (stored) {
                _appliedCoupons = JSON.parse(stored);
            }
        } catch(e) {
            _appliedCoupons = [];
        }
        var _sliderIntervalId = null;
        var _noticeIntervalId = null;

        function decodeObfuscatedPayload(scrambledStr) {
            if (!scrambledStr) return "";
            // Strip all whitespaces (spaces, newlines, carriage returns, tabs, BOMs, zero-width spaces etc.)
            // which might be introduced by web uploads, network transfer, or Git.
            scrambledStr = scrambledStr.replace(/[ \r\n\t\xA0\u200B\uFEFF]/g, "");
            if (!scrambledStr) return "";
            
            try {
                var isScrambled = false;
                var len = scrambledStr.length;
                for (var i = 0; i < Math.min(len, 100); i++) {
                    if (scrambledStr.charCodeAt(i) >= 0x0900) {
                        isScrambled = true;
                        break;
                    }
                }
                if (isScrambled) {
                    var out = new Array(len);
                    for (var r = 0; r < len; r++) {
                        var code = scrambledStr.charCodeAt(len - 1 - r);
                        out[r] = String.fromCharCode(code >= 0x0900 ? code - 0x0900 : code);
                    }
                    var b64 = out.join("");
                    return decodeURIComponent(escape(atob(b64)));
                } else {
                    return decodeURIComponent(escape(atob(scrambledStr)));
                }
            } catch (err) {
                try {
                    return decodeURIComponent(escape(atob(scrambledStr)));
                } catch (e2) {
                    return scrambledStr;
                }
            }
        }

        function showToast(message) {
            var existing = document.getElementById("studentActionToastBox");
            if (existing) {
                existing.parentNode.removeChild(existing);
            }
            var toast = document.createElement("div");
            toast.id = "studentActionToastBox";
            toast.style = "position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%); background: #111827; color: white; padding: 10px 20px; border-radius: 12px; font-size: 12px; font-weight: bold; font-family: 'Outfit', sans-serif; z-index: 999999; box-shadow: 0 10px 25px rgba(0,0,0,0.2); pointer-events: none; opacity: 1; transition: opacity 0.3s ease;";
            toast.innerText = message;
            document.body.appendChild(toast);
            setTimeout(function() {
                toast.style.opacity = "0";
                setTimeout(function() {
                    if (toast.parentNode) toast.parentNode.removeChild(toast);
                }, 300);
            }, 1800);
        }

        function getSavedQuestionsKey() {
            var suffix = "";
            if (_studentLoggedInUser && _studentLoggedInUser.emailOrMobile) {
                suffix = "_" + encodeURIComponent(_studentLoggedInUser.emailOrMobile).replace(/[^a-zA-Z0-9]/g, "");
            }
            return "prayas_one_saved_questions" + suffix;
        }

        function getSavedQuestions() {
            try {
                var key = getSavedQuestionsKey();
                var saved = localStorage.getItem(key);
                return saved ? JSON.parse(saved) : [];
            } catch(e) {
                return [];
            }
        }

        function getQuestionText(qBlock) {
            if (!qBlock) return { textHi: "", textEn: "" };
            var textHi = "";
            var textEn = "";
            if (qBlock.hi && qBlock.hi.q) {
                textHi = qBlock.hi.q;
            }
            if (qBlock.en && qBlock.en.q) {
                textEn = qBlock.en.q;
            }
            if (!textHi && !textEn && qBlock.q) {
                textEn = qBlock.q;
            }
            return { textHi: textHi, textEn: textEn };
        }

        function isQuestionSaved(index) {
            var qBlock = _activeQuestions[index];
            if (!qBlock) return false;
            var saved = getSavedQuestions();
            var texts = getQuestionText(qBlock);
            return saved.some(function(item) {
                if (texts.textHi && item.textHi === texts.textHi) return true;
                if (texts.textEn && item.textEn === texts.textEn) return true;
                return false;
            });
        }

        function handleToggleSaveActiveQuestion(index) {
            var qBlock = _activeQuestions[index];
            if (!qBlock) return;
            var texts = getQuestionText(qBlock);
            var textHi = texts.textHi;
            var textEn = texts.textEn;
            var saved = getSavedQuestions();
            var isAlreadySaved = isQuestionSaved(index);
            var updated = [];
            if (isAlreadySaved) {
                updated = saved.filter(function(item) {
                    if (textHi && item.textHi === textHi) return false;
                    if (textEn && item.textEn === textEn) return false;
                    return true;
                });
                showToast("Question removed from saved bookmarks.");
            } else {
                var newItem = {
                    categoryName: _activeCategoryName || "General Exam Centre",
                    subCategoryName: _activeSubCategoryName || "General Practice Desk",
                    topicName: _activeTopicName || "General Practice",
                    textHi: textHi,
                    textEn: textEn,
                    questionBlock: qBlock
                };
                updated = saved.concat(newItem);
                showToast("Question saved to bookmarks!");
            }
            try {
                var key = getSavedQuestionsKey();
                localStorage.setItem(key, JSON.stringify(updated));
                renderSavedQuestionsBox();
            } catch(e) {
                console.error("Failed saving", e);
            }
        }

        function handleToggleSaveFromEngine(index) {
            handleToggleSaveActiveQuestion(index);
            renderEngineQuestionItem();
        }

        function handleToggleSaveFromAnalysis(index) {
            handleToggleSaveActiveQuestion(index);
            handleOpenDetailedAnalysisItem(index);
        }

        function handleRemoveSavedGroup(catEncoded, subEncoded, topEncoded) {
            var cat = decodeURIComponent(catEncoded);
            var sub = decodeURIComponent(subEncoded);
            var top = decodeURIComponent(topEncoded);
            
            showCustomConfirm('Delete Bookmarks', 'Are you sure you want to remove all bookmarked questions from "' + top + '" under "' + sub + '"?', function() {
                var saved = getSavedQuestions();
                var updated = saved.filter(function(item) {
                    var matchCat = (item.categoryName || "General Category") === cat;
                    var matchSub = (item.subCategoryName || "General Subcategory") === sub;
                    var matchTop = (item.topicName || "General Topic") === top;
                    return !(matchCat && matchSub && matchTop);
                });
                var key = getSavedQuestionsKey();
                localStorage.setItem(key, JSON.stringify(updated));
                renderSavedQuestionsBox();
                showToast("Bookmarks deleted successfully.");
            });
        }
        window.handleRemoveSavedGroup = handleRemoveSavedGroup;

        window.handleRemoveSavedTopicGroup = function(topicKeyEncoded) {
            var topicKey = decodeURIComponent(topicKeyEncoded);
            showCustomConfirm('Delete Bookmarks', 'Are you sure you want to remove all bookmarked questions from "' + topicKey + '"?', function() {
                var saved = getSavedQuestions();
                var updated = saved.filter(function(item) {
                    return item.topicName !== topicKey;
                });
                var key = getSavedQuestionsKey();
                localStorage.setItem(key, JSON.stringify(updated));
                renderSavedQuestionsBox();
                showToast("Topic bookmarks deleted.");
            });
        };

        window.handleRemoveSavedSubcategoryGroup = function(subKeyEncoded) {
            var subKey = decodeURIComponent(subKeyEncoded);
            showCustomConfirm('Delete Bookmarks', 'Are you sure you want to remove all bookmarked questions from "' + subKey + '"?', function() {
                var saved = getSavedQuestions();
                var updated = saved.filter(function(item) {
                    return item.subCategoryName !== subKey;
                });
                var key = getSavedQuestionsKey();
                localStorage.setItem(key, JSON.stringify(updated));
                renderSavedQuestionsBox();
                showToast("Subcategory bookmarks deleted.");
            });
        };

        function renderSavedQuestionsBox() {
            var container = document.getElementById("savedQuestionsSection");
            if (!container) return;
            var savedQs = getSavedQuestions();
            if (savedQs.length === 0) {
                container.innerHTML = 
                    '<div style="margin-top: 30px; margin-bottom: 25px;">' +
                    '    <div class="section-header-title">' +
                    '        <i class="ph-fill ph-bookmark-simple" style="color: var(--primary);"></i> Saved Questions' +
                    '    </div>' +
                    '    <div style="background: var(--light-grey); border: 1.5px dashed var(--border-color); border-radius: 16px; padding: 24px; text-align: center; color: var(--grey-text); font-size: 13px; font-weight: 600;">' +
                    '        No saved questions yet. Tap the bookmark icon on any question to save here!' +
                    '    </div>' +
                    '</div>';
                return;
            }

            var groups = {};
            savedQs.forEach(function(item) {
                var cat = item.categoryName || "General Category";
                var sub = item.subCategoryName || "General Subcategory";
                var top = item.topicName || "General Topic";
                var key = cat + "|||" + sub + "|||" + top;
                if (!groups[key]) {
                    groups[key] = [];
                }
                groups[key].push(item);
            });

            var html = 
                '<div style="margin-top: 30px; margin-bottom: 25px;">' +
                '    <div class="section-header-title" style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">' +
                '        <div style="display: flex; align-items: center; gap: 8px;">' +
                '            <i class="ph-fill ph-bookmark-simple" style="color: var(--primary);"></i> Saved Questions' +
                '        </div>' +
                '        <span style="font-size: 11px; font-weight: 850; color: var(--primary); background: rgba(255,107,53,0.1); padding: 4px 8px; border-radius: 8px; font-family: inherit;">TOTAL: ' + savedQs.length + '</span>' +
                '    </div>' +
                '    ' +
                '    <!-- Scrollable container for curved cards -->' +
                '    <div style="display: flex; gap: 16px; overflow-x: auto; padding: 4px 4px 16px 4px; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; scrollbar-width: thin; scrollbar-color: var(--primary) transparent;">';

            Object.keys(groups).forEach(function(key) {
                var list = groups[key];
                var parts = key.split("|||");
                var cat = parts[0];
                var sub = parts[1];
                var top = parts[2];

                var catClean = cat.replace("Direct Category Level", "Category Level");
                var subClean = sub.replace("Direct Subcategory Level", "Subcategory Level");
                var topClean = top.replace("Direct Subcategory Level", "General Topic");

                html += 
                    '        <div class="bookmark-group-card" style="background: white; border: 1.5px solid var(--border-color); border-radius: 18px; padding: 18px; width: 290px; min-width: 290px; display: flex; flex-direction: column; justify-content: space-between; gap: 14px; scroll-snap-align: start; box-shadow: 0 4px 12px rgba(0,0,0,0.02); transition: all 0.2s ease;">' +
                    '            <div>' +
                    '                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; gap: 8px;">' +
                    '                    <span style="background: rgba(255, 107, 53, 0.08); color: var(--primary); font-size: 9.5px; font-weight: 800; padding: 3px 6px; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.5px; border: 1px solid rgba(255,107,53,0.12); white-space: nowrap;">' +
                    '                        ' + catClean + '' +
                    '                    </span>' +
                    '                    <span style="font-size: 11px; font-weight: 800; color: var(--grey-text); display: flex; align-items: center; gap: 4px; background: var(--light-grey); padding: 3.5px 7px; border-radius: 6px; border: 1px solid var(--border-color); white-space: nowrap; flex-shrink: 0;">' +
                    '                        <i class="ph ph-file-text" style="color: var(--primary);"></i> ' + list.length + ' Qs' +
                    '                    </span>' +
                    '                </div>' +
                    '                ' +
                    '                <div style="font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.3px; color: var(--grey-text); font-weight: 700; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;">' +
                    '                    <i class="ph ph-folder-open"></i> ' + subClean + '' +
                    '                </div>' +
                    '                ' +
                    '                <h4 style="margin: 6px 0 0; font-size: 14.5px; font-weight: 800; color: var(--dark); line-height: 1.35; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; min-height: 38px;">' +
                    '                    ' + topClean + '' +
                    '                </h4>' +
                    '            </div>' +
                    '            ' +
                    '            <div style="display: flex; align-items: center; gap: 8px; width: 100%; margin-top: 4px;">' +
                    '                <button onclick="handleRemoveSavedGroup(\\\'' + encodeURIComponent(cat) + '\\\', \\\'' + encodeURIComponent(sub) + '\\\', \\\'' + encodeURIComponent(top) + '\\\')" ' +
                    '                        style="background: transparent; border: 1.5px solid #fee2e2; color: #ef4444; width: 40px; height: 40px; border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; flex-shrink: 0;"' +
                    '                        title="Remove All Bookmarks"' +
                    '                        onmouseover="this.style.background=\\\'#fef2f2\\\'; this.style.borderColor=\\\'#fca5a5\\\'"' +
                    '                        onmouseout="this.style.background=\\\'transparent\\\'; this.style.borderColor=\\\'#fee2e2\\\'">' +
                    '                    <i class="ph-bold ph-trash" style="font-size: 16px;"></i>' +
                    '                </button>' +
                    '                ' +
                    '                <button onclick="handleLaunchGroupSavedTest(\\\'' + encodeURIComponent(cat) + '\\\', \\\'' + encodeURIComponent(sub) + '\\\', \\\'' + encodeURIComponent(top) + '\\\')" ' +
                    '                        class="btn-fill-prime" ' +
                    '                        style="margin: 0; flex-grow: 1; height: 40px; border-radius: 10px; font-weight: 800; font-size: 12px; letter-spacing: 0.3px; text-transform: uppercase; display: flex; align-items: center; justify-content: center; gap: 6px; background: var(--primary); border: none; color: white; cursor: pointer; transition: opacity 0.2s;"' +
                    '                        onmouseover="this.style.opacity=\\\'0.9\\\'"' +
                    '                        onmouseout="this.style.opacity=\\\'1\\\'">' +
                    '                    <i class="ph-bold ph-play" style="font-size: 12px;"></i> START TEST' +
                    '                </button>' +
                    '            </div>' +
                    '        </div>';
            });

            html += 
                '    </div>' +
                '</div>';
            container.innerHTML = html;
        }

        window.handleRemoveSavedGroup = handleRemoveSavedGroup;
        window.handleLaunchGroupSavedTest = handleLaunchGroupSavedTest;

        function handleLaunchGroupSavedTest(catEncoded, subEncoded, topEncoded) {
            if (!isCurrentStudentPaid()) {
                showCustomAlert("Premium Benefit", "This Bookmarks practice feature is exclusive to Premium membership holders. Unlock and get total benefits today!", function() {
                    navigateToScreen("scr-pay", "Gated License");
                });
                return;
            }

            var cat = decodeURIComponent(catEncoded);
            var sub = decodeURIComponent(subEncoded);
            var top = decodeURIComponent(topEncoded);

            var savedQs = getSavedQuestions();
            var filtered = savedQs.filter(function(item) {
                var matchCat = (item.categoryName || "General Category") === cat;
                var matchSub = (item.subCategoryName || "General Subcategory") === sub;
                var matchTop = (item.topicName || "General Topic") === top;
                return matchCat && matchSub && matchTop;
            });

            if (filtered.length === 0) {
                alert("No saved questions found in this folder.");
                return;
            }

            var nameLabel = top.replace("Direct Subcategory Level", "General").replace("Direct Category Level", "Category Level");
            _activeTest = {
                id: "custom_saved_group_" + Math.random().toString(36).substr(2, 9),
                title: "Bookmarks Test: " + nameLabel,
                duration: (filtered.length * 18) / 60,
                posMarks: 2,
                negMarks: 0.5,
                instructions: "Review practice assessment centering only your bookmarked items from: " + nameLabel + ".",
                unlimitedAttempts: true,
                isPaid: false
            };
            _activeQuestions = filtered.map(function(item) {
                var block = item.questionBlock ? JSON.parse(JSON.stringify(item.questionBlock)) : null;
                if (!block) {
                    block = {
                        en: { q: item.textEn || "Practice item text", o: ["Option A", "Option B", "Option C", "Option D"], c: 1, s: "Answer details" },
                        hi: { q: item.textHi || "अभ्यास प्रश्न पाठ", o: ["विकल्प ए", "विकल्प बी", "विकल्प सी", "विकल्प डी"], c: 1, s: "उत्तर विवरण" }
                    };
                }
                if (!block.originalCorrect) {
                    block.originalCorrect = block.en ? block.en.c : (block.hi ? block.hi.c : 1);
                }
                return block;
            });
            _availableLanguages = [];
            if (_activeQuestions.some(function(q) { return q.en; })) _availableLanguages.push('en');
            if (_activeQuestions.some(function(q) { return q.hi; })) _availableLanguages.push('hi');
            if (_availableLanguages.length === 0) _availableLanguages.push('en');
            _currentLanguage = _availableLanguages[0];
            var translateBtn = document.getElementById("translateBtn");
            var label = document.getElementById("translateLabel");
            if (_availableLanguages.length > 1) {
                translateBtn.style.display = "flex";
                label.innerText = _currentLanguage.toUpperCase();
            } else {
                translateBtn.style.display = "none";
            }
            _activeQIndex = 0;
            _answersMap = {};
            _markedReviewMap = {};
            document.getElementById("testEngineName").innerText = _activeTest.title;
            _timeRemainingSecs = _activeQuestions.length * 18;
            updateTestEngineTimerClockDisplay();
            if (_timeIntervalId) clearInterval(_timeIntervalId);
            _timeIntervalId = setInterval(function() {
                _timeRemainingSecs--;
                if (_timeRemainingSecs <= 0) {
                    clearInterval(_timeIntervalId);
                    handleEvaluateExamAnswersPaper();
                } else {
                    updateTestEngineTimerClockDisplay();
                }
            }, 1000);
            document.getElementById("test-engine-panel").style.display = "flex";
            document.getElementById("mainHeader").style.display = "none";
            renderEngineQuestionItem();
        }
        window.handleLaunchGroupSavedTest = handleLaunchGroupSavedTest;

        window.handleLaunchCustomSavedQuestionsTest = function(groupType, groupKeyEncoded) {
            var groupKey = decodeURIComponent(groupKeyEncoded);
            if (groupType === 'topic') {
                handleLaunchGroupSavedTest(encodeURIComponent(""), encodeURIComponent(""), encodeURIComponent(groupKey));
            } else if (groupType === 'subcategory') {
                handleLaunchGroupSavedTest(encodeURIComponent(""), encodeURIComponent(groupKey), encodeURIComponent(""));
            }
        };

        function isCurrentStudentPaid() {
            if (!_studentLoggedInUser) return false;
            if (_studentLoggedInUser.expiryDate) {
                var exp = new Date(_studentLoggedInUser.expiryDate);
                if (exp.getTime() < Date.now()) {
                    return false;
                }
            }
            return true;
        }

        function handleDownloadMerchantPaymentQRCode() {
            var customLink = "${config.social.qrDownloadLink || ''}";
            if (customLink && customLink.trim() !== "") {
                var dl = document.createElement("a");
                dl.href = customLink;
                dl.target = "_blank";
                document.body.appendChild(dl);
                dl.click();
                document.body.removeChild(dl);
                showToast("Redirecting...");
                return;
            }
            var qrImg = document.getElementById("displayPayQrImage");
            if (!qrImg || !qrImg.src) {
                alert("QR Image not loaded.");
                return;
            }
            var dl = document.createElement("a");
            dl.href = qrImg.src;
            dl.download = "Prayas_One_Payment_Merchant_QR.png";
            dl.target = "_blank";
            document.body.appendChild(dl);
            dl.click();
            document.body.removeChild(dl);
            showToast("QR layout downloaded!");
        }

        function getFontForText(textContent, defaultFontName) {
            return "'Sahitya', serif";
        }
        
        // Define builder API server origin fallback for cross-origin local files
        const _serverOrigin = "${serverOrigin}";
        function getApiUrl(route) {
            if (!_serverOrigin) return route;
            if (window.location.protocol === 'file:' || !window.location.host) {
                return _serverOrigin + route;
            }
            if (window.location.origin !== _serverOrigin) {
                return _serverOrigin + route;
            }
            return route;
        }

        function checkActiveWebsitePopups() {
             try {
                 const popups = DB.popups || [];
                 if (popups.length === 0) return;
                 
                 const now = Date.now();
                 const studentIsPaid = isCurrentStudentPaid();
                 const activePopups = popups.filter(p => {
                     if (!p.isActive) return false;
                     
                     // Filter based on student audience targeting
                     const targeting = p.showTo || "all";
                     if (targeting === "paid" && !studentIsPaid) return false;
                     if (targeting === "free" && studentIsPaid) return false;
                     
                     if (p.startTime) {
                         try {
                             const startEpoch = Date.parse(p.startTime);
                             if (!isNaN(startEpoch) && now < startEpoch) return false;
                         } catch(e) {}
                     }
                     if (p.endTime) {
                         try {
                             const endEpoch = Date.parse(p.endTime);
                             if (!isNaN(endEpoch) && now > endEpoch) return false;
                         } catch(e) {}
                     }
                     return true;
                 });
                 
                 if (activePopups.length === 0) return;
                 
                 // Sort by sequence (order) ascending
                 activePopups.sort((a, b) => {
                     const orderA = parseInt(a.order) || 0;
                     const orderB = parseInt(b.order) || 0;
                     return orderA - orderB;
                 });
                 
                 // Find first non-dismissed popup
                 const target = activePopups.find(p => {
                     return localStorage.getItem("_dismissed_popup_" + p.id) !== "true";
                 });
                 
                 if (target) {
                     const titleEl = document.getElementById("p_modal_title");
                     const textEl = document.getElementById("p_modal_text");
                     const imgEl = document.getElementById("p_modal_image");
                     const linkEl = document.getElementById("p_modal_link");
                     const outerModal = document.getElementById("websitePopupOverlayModal");
                     
                     if (outerModal) {
                         if (titleEl) titleEl.innerText = target.title || "Announcement";
                         if (textEl) textEl.innerText = target.text || "";
                         if (imgEl) {
                             if (target.imageUrl) {
                                 imgEl.src = target.imageUrl;
                                 imgEl.style.display = "block";
                                 if (imgEl.parentNode) imgEl.parentNode.style.display = "flex";
                             } else {
                                 imgEl.style.display = "none";
                                 if (imgEl.parentNode) imgEl.parentNode.style.display = "none";
                             }
                         }
                         if (linkEl) {
                             if (target.redirectUrl) {
                                 linkEl.href = target.redirectUrl;
                                 linkEl.innerHTML = (target.buttonName || "Explore Details") + ' <i class="ph ph-arrow-right"></i>';
                                 linkEl.style.display = "block";
                             } else {
                                 linkEl.style.display = "none";
                             }
                         }
                         outerModal.setAttribute("data-active-popup-id", target.id);
                         outerModal.style.display = "flex";
                     }
                 }
             } catch(err) {
                 console.error("Popup check error:", err);
             }
         }

        function handleCloseWebsiteActivePopup() {
            try {
                const outerModal = document.getElementById("websitePopupOverlayModal");
                if (outerModal) {
                    const popupId = outerModal.getAttribute("data-active-popup-id");
                    if (popupId) {
                        localStorage.setItem("_dismissed_popup_" + popupId, "true");
                    }
                    outerModal.style.display = "none";
                }
            } catch(e) {
                console.error(e);
            }
        }
        
        // Navigation Stack Architecture
        let _navHistory = ['home'];
        
        // Active test parameters
        let _activeTest = null;
        let _activeQuestions = [];
        let _currentLanguage = 'en'; // 'en' or 'hi'
        let _availableLanguages = ['en'];
        let _activeQIndex = 0;
        let _answersMap = {}; // index: option_1_indexed
        let _markedReviewMap = {}; // index: boolean
        let _timeIntervalId = null;
        let _timeRemainingSecs = 0;

        // Test protection & pause states
        let _testStateActiveNow = false;
        let _testIsPaused = false;
        let _serverTimeOffset = 0;
        let _studentLoggedInUser = null;
        let _hasActiveCouponGrant = null; // Stored voucher config
        let _activeCategoryName = "N/A";
        let _activeSubCategoryName = "N/A";
        let _activeTopicName = "N/A";
        const _hideSourceOnStudent = ${!!config.social.hideSourceOnStudent};

        // Custom URL Path Routing & Deep Linking Subsystem
        let _activeCategoryNodeForUrl = null;
        let _activeSubcategoryNodeForUrl = null;
        let _activeTopicNodeForUrl = null;
        let _isHandlingPopState = false;

        function toSlug(str) {
            if (!str) return "";
            return str.toString().toLowerCase().trim()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-');
        }

        function toUrlPathSegment(str) {
            if (!str) return "";
            // Maintain uppercase characters, lowercase characters, and convert spaces to hyphens. Strip other URL unsafe structures.
            return str.toString().trim()
                .replace(/[^a-zA-Z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-');
        }

        function updateHistoryAndUrl(categoryNode, subcategoryNode, topicNode, tabIdOrType) {
            if (_isHandlingPopState) return;
            try {
                if (window.location.protocol === 'file:') return;
                var path = '/';
                if (categoryNode) {
                    path += toUrlPathSegment(categoryNode.name);
                    if (subcategoryNode) {
                        path += '/' + toUrlPathSegment(subcategoryNode.name);
                        if (topicNode) {
                            path += '/' + toUrlPathSegment(topicNode.name);
                        }
                    }
                } else if (tabIdOrType) {
                    var t = tabIdOrType.toLowerCase();
                    if (t === 'home') {
                        path = '/home';
                    } else if (t === 'tests' || t === 'test') {
                        path = '/test';
                    } else if (t === 'pdfs' || t === 'pdf') {
                        path = '/pdf';
                    } else if (t === 'acc' || t === 'account' || t === 'my-account') {
                        path = '/account';
                    } else {
                        path = '/' + t;
                    }
                } else {
                    path = '/home';
                }
                history.pushState({ page: 'internal' }, null, path);
            } catch (e) {
                console.error("Failed to update URL history:", e);
            }
        }
        
        // Dynamic watermarks
        function buildSecurityAntiLeakOverlay(userEmail = "aspirant_guest") {
            const overlay = document.getElementById("securityOverlay");
            overlay.innerHTML = "";
            for (let i = 0; i < 12; i++) {
                const span = document.createElement("div");
                span.className = "leak-label";
                span.innerText = "PRAYAS ONE - " + userEmail;
                overlay.appendChild(span);
            }
        }

        // Setup Right Click and Keyboard security locks
        function setupAntiPiracyBlockers() {
            // Disable context menu
            document.addEventListener('contextmenu', e => e.preventDefault());
            
            // Disable selection, copy, paste, cut, dragging
            document.addEventListener('copy', e => e.preventDefault());
            document.addEventListener('paste', e => e.preventDefault());
            document.addEventListener('cut', e => e.preventDefault());
            document.addEventListener('selectstart', e => e.preventDefault());
            document.addEventListener('dragstart', e => e.preventDefault());

            // Keyboard blockers for Inspect / Save / Print / Copy / Selection
            document.addEventListener('keydown', e => {
                // Prevent Ctrl+C / Cmd+C
                if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C')) {
                    e.preventDefault();
                    return false;
                }
                // Prevent Ctrl+A / Cmd+A
                if ((e.ctrlKey || e.metaKey) && (e.key === 'a' || e.key === 'A')) {
                    e.preventDefault();
                    return false;
                }
                // Prevent Ctrl+S / Cmd+S (Save)
                if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
                    e.preventDefault();
                    return false;
                }
                // Prevent Ctrl+U / Cmd+U (View Source)
                if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
                    e.preventDefault();
                    return false;
                }
                // Prevent Ctrl+P / Cmd+P (Print)
                if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
                    e.preventDefault();
                    return false;
                }
                // Prevent F12
                if (e.keyCode === 123 || e.key === 'F12') {
                    e.preventDefault();
                    return false;
                }
                // Prevent Shift+F10 (Context Menu)
                if (e.shiftKey && e.keyCode === 121) {
                    e.preventDefault();
                    return false;
                }
                // Prevent Ctrl+Shift+I / Cmd+Alt+I (Inspect)
                if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'i' || e.key === 'I')) {
                    e.preventDefault();
                    return false;
                }
                // Prevent Ctrl+Shift+J / Cmd+Alt+J (Console)
                if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'j' || e.key === 'J')) {
                    e.preventDefault();
                    return false;
                }
                // Prevent Ctrl+Shift+C / Cmd+Alt+C (Inspect Element)
                if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'c' || e.key === 'C')) {
                    e.preventDefault();
                    return false;
                }

                // Keyboard Navigation for Active Test (Laptops/Desktops)
                if (typeof _testStateActiveNow !== 'undefined' && _testStateActiveNow) {
                    var isPaused = typeof _testIsPaused !== 'undefined' && _testIsPaused;
                    if (!isPaused) {
                        if (e.key === "ArrowLeft") {
                            if (typeof handlePrevQuestion === "function") handlePrevQuestion();
                        } else if (e.key === "ArrowRight") {
                            if (typeof handleNextQuestion === "function") handleNextQuestion();
                        } else if (e.key === "Escape") {
                            if (typeof triggerTestInterruptionPause === "function") triggerTestInterruptionPause();
                        }
                    }
                }
            });

            // Prevent Print Screen key (clears clipboard)
            document.addEventListener('keyup', e => {
                if (e.key === 'PrintScreen' || e.keyCode === 44) {
                    try {
                        navigator.clipboard.writeText("");
                    } catch(err) {}
                    alert("Screenshots are strictly prohibited!");
                }
            });

            // Infinite debugger loop to render inspector tools completely unusable
            setInterval(function() {
                try {
                    (function() {
                        const check = function() {
                            if (function() {}.constructor("debugger") !== undefined) {
                                (function() {}).constructor("debugger")();
                            }
                        };
                        check();
                    })();
                } catch (e) {}
            }, 500);
        }

        // Utility to check if a scheduled content is visible
        function isItemScheduledVisible(item) {
            if (!item) return false;
            if (!item.scheduledAt) return true;
            try {
                const schedTime = new Date(item.scheduledAt).getTime();
                if (isNaN(schedTime)) return true;
                const secureCurrentTime = Date.now() + _serverTimeOffset;
                return schedTime <= secureCurrentTime;
            } catch (e) {
                return true;
            }
        }

        // Custom visibility filter checking both schedule AND student email-restrict permissions
        function isItemVisibleToStudent(item) {
            if (!item) return false;
            
            // 1. Time / Scheduling check
            if (!isItemScheduledVisible(item)) {
                return false;
            }
            
            // 2. Email restriction check
            if (item.onlyUsers && item.onlyUsers.trim() !== "") {
                if (!_studentLoggedInUser) {
                    return false;
                }
                const email = (_studentLoggedInUser.emailOrMobile || "").trim().toLowerCase();
                if (!email) return false;
                
                const allowedUsers = item.onlyUsers.split(/[\\n,]+/).map(s => s.trim().toLowerCase()).filter(s => s);
                if (allowedUsers.length > 0 && !allowedUsers.includes(email)) {
                    return false;
                }
            }
            
            return true;
        }

        // Initialize Carousel
        function launchSlidersCarousel() {
            const wrapper = document.getElementById("studentSlidesWrapper");
            const dots = document.getElementById("studentSliderDots");
            wrapper.innerHTML = "";
            dots.innerHTML = "";

            const activeSliders = (DB.sliders || []).filter(isItemVisibleToStudent);

            if (activeSliders.length === 0) {
                // Show default placeholders if blank
                wrapper.innerHTML = '<img class="slide-img" src="https://iili.io/CKMOrGI.md.png" onclick="location.reload()">';
                return;
            }

            activeSliders.forEach((slide, idx) => {
                const img = document.createElement("img");
                img.className = "slide-img";
                var initSrc = (window.__imgCache && window.__imgCache[slide.image]) || slide.image;
                img.src = initSrc;
                img.setAttribute("data-original-src", slide.image);
                if (slide.image && !(window.__imgCache && window.__imgCache[slide.image]) && typeof getCachedImageUrl === "function") {
                    getCachedImageUrl(slide.image).then(function(src) {
                        if (src && src !== slide.image) {
                            img.src = src;
                        }
                    });
                }
                img.onclick = () => {
                    if (slide.link) window.open(slide.link, '_blank');
                };
                wrapper.appendChild(img);

                const dot = document.createElement("div");
                dot.className = "dot" + (idx === 0 ? " active" : "");
                dots.appendChild(dot);
            });

            let currentSlideIdx = 0;
            if (_sliderIntervalId) clearInterval(_sliderIntervalId);
            _sliderIntervalId = setInterval(() => {
                if (activeSliders.length > 1) {
                    currentSlideIdx = (currentSlideIdx + 1) % activeSliders.length;
                    wrapper.style.transform = "translateX(-" + (currentSlideIdx * 100) + "%)";
                    
                    const dotElements = dots.querySelectorAll(".dot");
                    dotElements.forEach((d, id) => {
                        if (id === currentSlideIdx) d.classList.add("active");
                        else d.classList.remove("active");
                    });
                }
            }, 3000);
        }

        // Setup Notices scrolling board
        function renderNoticesScrollingBoard() {
            const noticesArea = document.getElementById("studentNoticeBoard");
            noticesArea.innerHTML = "";

            const activeNotifs = (DB.notifications || []).filter(isItemVisibleToStudent);

            if (activeNotifs.length === 0) {
                noticesArea.innerHTML = '<p style="font-size:12px; color:var(--grey-text); font-weight:800; padding:10px;">No new alerts today.</p>';
                return;
            }

            activeNotifs.forEach(notif => {
                const card = document.createElement("div");
                card.className = "notif-card";
                var initSrc = (window.__imgCache && window.__imgCache[notif.image]) || notif.image || "";
                
                var htmlStr = "";
                if (notif.image) {
                    htmlStr += '<img class="notif-banner" src="' + initSrc + '" data-original-src="' + notif.image + '">';
                }
                htmlStr += '<div class="notif-content">';
                htmlStr += '    <h4 class="notif-title">' + notif.title + '</h4>';
                htmlStr += '    <p class="notif-desc">' + notif.message + '</p>';
                if (notif.link) {
                    htmlStr += '<a class="notif-action-btn" target="_blank" href="' + notif.link + '">' + (notif.buttonName || "CHECK") + '</a>';
                }
                htmlStr += '</div>';
                
                card.innerHTML = htmlStr;
                noticesArea.appendChild(card);
                if (notif.image && !(window.__imgCache && window.__imgCache[notif.image]) && typeof getCachedImageUrl === "function") {
                    const imgEl = card.querySelector(".notif-banner");
                    if (imgEl) {
                        getCachedImageUrl(notif.image).then(function(src) {
                            if (src && src !== notif.image) {
                                imgEl.src = src;
                            }
                        });
                    }
                }
            });

            // Notice auto slider every 5 seconds
            let noticeScrollIdx = 0;
            if (_noticeIntervalId) clearInterval(_noticeIntervalId);
            _noticeIntervalId = setInterval(() => {
                const cards = noticesArea.querySelectorAll(".notif-card");
                if (cards.length > 1) {
                    noticeScrollIdx = (noticeScrollIdx + 1) % cards.length;
                    const targetCard = cards[noticeScrollIdx];
                    if (targetCard) {
                        noticesArea.scrollTo({
                            left: targetCard.offsetLeft - 15,
                            behavior: 'smooth'
                        });
                    }
                }
            }, 5000);
        }

        function handleScrollToNotifications() {
            handleTabNavigation('home');
            setTimeout(() => {
                const target = document.getElementById("notifScrollAnchor");
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }

        // Tab Navigation Central Routing
        function handleTabNavigation(tabId) {
            try {
                if (typeof checkConcurrentUserSession === "function") {
                    checkConcurrentUserSession();
                }
            } catch(e) {}

            try {
                localStorage.setItem("_student_active_tab_id", tabId);
            } catch(e) {}

            // Cancel navigation stack history because tab click resets to root views
            _navHistory = [tabId === 'home' ? 'home' : 'tab-' + tabId];
            
            // Toggle highlight tabs
            document.querySelectorAll(".bottom-nav-item").forEach(el => el.classList.remove("active"));
            const currentTabBtn = document.getElementById("tab-" + tabId);
            if (currentTabBtn) currentTabBtn.classList.add("active");

            // Display Screens
            document.querySelectorAll(".screen").forEach(sc => sc.classList.remove("active"));
            
            // Reset navigations bar
            const header = document.getElementById("mainHeader");
            const backHeader = document.getElementById("backNavigationHeader");

            header.style.display = 'flex';
            backHeader.style.display = 'none';

            if (tabId === 'home') {
                document.getElementById("scr-home").classList.add("active");
                renderSavedQuestionsBox();
                updateHistoryAndUrl(null, null, null, 'home');
            } else if (tabId === 'tests') {
                document.getElementById("scr-category").classList.add("active");
                renderCategorySelectionScreen('test');
                updateHistoryAndUrl(null, null, null, 'tests');
            } else if (tabId === 'pdfs') {
                document.getElementById("scr-category").classList.add("active");
                renderCategorySelectionScreen('pdf');
                updateHistoryAndUrl(null, null, null, 'pdfs');
            } else if (tabId === 'acc') {
                document.getElementById("scr-acc").classList.add("active");
                refreshStudentAccountProfileGate();
                updateHistoryAndUrl(null, null, null, 'acc');
            }
        }

        // Navigation Stack pushes
        function navigateToScreen(screenElementId, screenTitle) {
            document.querySelectorAll(".screen").forEach(sc => sc.classList.remove("active"));
            document.getElementById(screenElementId).classList.add("active");

            // Stack tracking
            _navHistory.push(screenElementId);

            // Display navigation back row
            document.getElementById("mainHeader").style.display = 'none';
            const backHeader = document.getElementById("backNavigationHeader");
            backHeader.style.display = 'flex';
            document.getElementById("navHeaderBreadcrumb").innerText = screenTitle.toUpperCase();

            if (screenElementId === 'scr-pay') {
                try { ensurePaymentQrCached(); } catch(e){}
            }
        }

        // Nav stack back trace
        function handleHistoryBack() {
            if (_testStateActiveNow) {
                triggerTestInterruptionPause();
                return;
            }

            const currentActiveScreen = document.querySelector(".screen.active");
            const currentScreenId = currentActiveScreen ? currentActiveScreen.id : "scr-home";

            if (currentScreenId === 'scr-home') {
                showCustomConfirm("Exit Application", "Do you want to exit Prayas Study Desk?", function() {
                    history.back();
                });
                return;
            }

            if (_navHistory.length <= 1) {
                handleTabNavigation('home');
                return;
            }

            // Pop active
            _navHistory.pop();
            const prevScreenId = _navHistory[_navHistory.length - 1];

            document.querySelectorAll(".screen").forEach(sc => sc.classList.remove("active"));
            
            if (prevScreenId === 'home') {
                document.getElementById("mainHeader").style.display = 'flex';
                document.getElementById("backNavigationHeader").style.display = 'none';
                document.getElementById("scr-home").classList.add("active");
                _navHistory = ['home'];

                _activeCategoryNodeForUrl = null;
                _activeSubcategoryNodeForUrl = null;
                _activeTopicNodeForUrl = null;
                updateHistoryAndUrl(null, null, null);
            } else if (prevScreenId.startsWith('tab-')) {
                const tabId = prevScreenId.replace('tab-', '');
                handleTabNavigation(tabId);
            } else {
                document.getElementById(prevScreenId).classList.add("active");
                document.getElementById("mainHeader").style.display = 'none';
                document.getElementById("backNavigationHeader").style.display = 'flex';

                if (prevScreenId === 'scr-category') {
                    _activeCategoryNodeForUrl = null;
                    _activeSubcategoryNodeForUrl = null;
                    _activeTopicNodeForUrl = null;
                    updateHistoryAndUrl(null, null, null);
                } else if (prevScreenId === 'scr-subcat') {
                    _activeSubcategoryNodeForUrl = null;
                    _activeTopicNodeForUrl = null;
                    updateHistoryAndUrl(_activeCategoryNodeForUrl, null, null);
                } else if (prevScreenId === 'scr-topics') {
                    _activeTopicNodeForUrl = null;
                    updateHistoryAndUrl(_activeCategoryNodeForUrl, _activeSubcategoryNodeForUrl, null);
                }
            }
        }

        // Quick Access Navigation System
        function handleOpenCategoryLibrary(type) {
            handleTabNavigation(type === 'test' ? 'tests' : 'pdfs');
        }

        // Test Interruption, Blur, and Resume System mechanics
        function triggerTestInterruptionPause() {
            if (!_testStateActiveNow || _testIsPaused) return;

            _testIsPaused = true;
            
            // 1. Pause active timer loop
            if (_timeIntervalId) {
                clearInterval(_timeIntervalId);
                _timeIntervalId = null;
            }

            // 2. Blur Exam Paper content area
            const qsContent = document.getElementById("engineQsContent");
            if (qsContent) {
                qsContent.style.filter = "blur(8px)";
                qsContent.style.pointerEvents = "none";
            }

            // 3. Mount resume prompt modal over screen
            document.getElementById("testPauseResumeModal").style.display = "flex";
        }

        function handleResumeActiveTest() {
            _testIsPaused = false;

            // 1. Unblur exam papers
            const qsContent = document.getElementById("engineQsContent");
            if (qsContent) {
                qsContent.style.filter = "none";
                qsContent.style.pointerEvents = "auto";
            }

            // 2. Hide modal overlay
            document.getElementById("testPauseResumeModal").style.display = "none";

            // 3. Restart ticking loop
            if (_timeIntervalId) clearInterval(_timeIntervalId);
            _timeIntervalId = setInterval(() => {
                _timeRemainingSecs--;
                updateTestEngineTimerClockDisplay();

                if (_timeRemainingSecs <= 0) {
                    clearInterval(_timeIntervalId);
                    handleForceAutoSubmitTest();
                }
            }, 1000);
        }

        function handleExitActiveTest() {
            _testIsPaused = false;
            _testStateActiveNow = false;

            // Unblur and clean
            const qsContent = document.getElementById("engineQsContent");
            if (qsContent) {
                qsContent.style.filter = "none";
                qsContent.style.pointerEvents = "auto";
            }

            document.getElementById("testPauseResumeModal").style.display = "none";
            document.getElementById("test-engine-panel").style.display = "none";

            // Reset answers (User must start test again)
            _answersMap = {};
            _markedReviewMap = {};

            // Roll back view to selection
            handleHistoryBack();
        }

        // Browser level state listeners (loss of focus, locks, minimized states)
        document.addEventListener("visibilitychange", () => {
            if (document.hidden && _testStateActiveNow) {
                triggerTestInterruptionPause();
            }
        });

        window.addEventListener("blur", () => {
            if (_testStateActiveNow) {
                triggerTestInterruptionPause();
            }
        });

        // Sync date offsets with backend
        function syncServerTimeOffset() {
            fetch(getApiUrl('/api/time'))
                .then(r => r.json())
                .then(data => {
                    if (data && data.timestamp) {
                        _serverTimeOffset = data.timestamp - Date.now();
                        console.log("[CLOCK] Sync complete. Server offset: " + _serverTimeOffset + "ms");
                    }
                })
                .catch(() => {
                    fetch('https://worldtimeapi.org/api/timezone/Etc/UTC')
                        .then(r => r.json())
                        .then(data => {
                            if (data && data.unixtime) {
                                _serverTimeOffset = (data.unixtime * 1000) - Date.now();
                            }
                        })
                        .catch(() => {});
                });
        }
        syncServerTimeOffset();

        // Capture physical keyboard, context popping and browser-back button behaviors
        function initHistoryStatePush() {
            window.addEventListener('popstate', (e) => {
                if (_testStateActiveNow) {
                    history.pushState({ page: 'test' }, null, window.location.href);
                    triggerTestInterruptionPause();
                    return;
                }

                _isHandlingPopState = true;
                try {
                    const parsed = handleDeepLinking();
                    if (!parsed) {
                        handleTabNavigation('home');
                    }
                } catch (err) {
                    console.error("Deep link parse error on popstate:", err);
                } finally {
                    _isHandlingPopState = false;
                }
            });
        }
        // Delayed initialization to clear startup stacks
        setTimeout(initHistoryStatePush, 1000);

        // Catalog Selection Display
        function renderCategorySelectionScreen(type) {
            _activeCategoryName = "N/A";
            _activeSubCategoryName = "N/A";
            _activeTopicName = "N/A";

            const container = document.getElementById("categoryGridArea");
            container.innerHTML = "";
            
            var titleIcon = (type === 'test' ? 'exam' : 'file-pdf');
            document.getElementById("categorySelectionTitle").innerHTML = '<i class="ph ph-' + titleIcon + '"></i> Select Category';

            // List elements from configuration and filter by scheduling and email permissions
            const targetCategories = (type === 'test' ? DB.testCategories : DB.pdfCategories) || [];
            const visibleCategories = targetCategories.filter(isItemVisibleToStudent);

            if (visibleCategories.length === 0) {
                container.innerHTML = '<div class="coming-soon-box">No resource catalogs configured.</div>';
                return;
            }

            visibleCategories.forEach((cat) => {
                const card = document.createElement("div");
                card.className = "outline-item-card";
                card.onclick = () => handleSelectCategoryNode(cat, type);
                var initSrc = (window.__imgCache && window.__imgCache[cat.image]) || cat.image || "";
                
                var catHtml = "";
                if (cat.image) {
                    catHtml += '<img class="outline-item-img" src="' + initSrc + '" data-original-src="' + cat.image + '">';
                } else {
                    catHtml += '<div class="outline-item-img" style="display:flex;align-items:center;justify-content:center;"><i class="ph ph-folder" style="font-size:24px;"></i></div>';
                }
                catHtml += '<div class="outline-item-details">';
                catHtml += '    <h4 class="outline-item-title">' + cat.name + '</h4>';
                catHtml += '    <p class="outline-item-subtitle">Explore courses & materials</p>';
                catHtml += '</div>';
                catHtml += '<i class="ph ph-caret-right" style="color: var(--primary);"></i>';
                
                card.innerHTML = catHtml;
                container.appendChild(card);
                if (cat.image && !(window.__imgCache && window.__imgCache[cat.image]) && typeof getCachedImageUrl === "function") {
                    const imgEl = card.querySelector(".outline-item-img");
                    if (imgEl) {
                        getCachedImageUrl(cat.image).then(function(src) {
                            if (src && src !== cat.image) {
                                imgEl.src = src;
                            }
                        });
                    }
                }
            });
        }

        function handleSelectCategoryNode(cat, type) {
            _activeCategoryName = cat.name;
            _activeSubCategoryName = cat.name;
            _activeTopicName = (cat.test && cat.test.title) || (cat.pdf && cat.pdf.title) || cat.name;

            _activeCategoryNodeForUrl = cat;
            _activeSubcategoryNodeForUrl = null;
            _activeTopicNodeForUrl = null;
            updateHistoryAndUrl(cat, null, null);

            const hasSubcategories = cat.subCategories && cat.subCategories.length > 0;
            const hasResource = (type === 'test' && cat.test) || (type === 'pdf' && cat.pdf);

            if (hasResource && !hasSubcategories) {
                // If it is scheduled in the future, don't let it open
                if (cat.test && !isItemScheduledVisible(cat.test)) {
                    alert("This test is scheduled to start at: " + new Date(cat.test.scheduledAt).toLocaleString());
                    return;
                }
                if (cat.pdf && !isItemScheduledVisible(cat.pdf)) {
                    alert("This PDF is scheduled to release at: " + new Date(cat.pdf.scheduledAt).toLocaleString());
                    return;
                }
                handleVerifyDirectMeta(cat, type);
                return;
            }

            // Else open nested subcategories screen
            const container = document.getElementById("subcategoryGridArea");
            container.innerHTML = "";
            document.getElementById("subcategorySelectionTitle").innerText = cat.name;

            navigateToScreen("scr-subcat", cat.name);

            // Prepend a special direct launch card if direct content is attached
            if (hasResource) {
                const directCard = document.createElement("div");
                directCard.className = "outline-item-card";
                directCard.style.border = "2px dashed var(--primary)";
                directCard.style.background = "rgba(255, 107, 53, 0.05)";
                directCard.onclick = () => {
                    if (cat.test && !isItemScheduledVisible(cat.test)) {
                        alert("This test is scheduled to start at: " + new Date(cat.test.scheduledAt).toLocaleString());
                        return;
                    }
                    if (cat.pdf && !isItemScheduledVisible(cat.pdf)) {
                        alert("This PDF is scheduled to release at: " + new Date(cat.pdf.scheduledAt).toLocaleString());
                        return;
                    }
                    handleVerifyDirectMeta(cat, type);
                };
                
                const label = type === 'test' ? "\ud83c\udfc6 Launch Category Exam" : "\ud83d\udcc1 View Category PDF Document";
                const desc = type === 'test' ? "Primary category-level test assessment" : "Primary category-level study manual";
                const icon = type === 'test' ? "ph ph-sparkle" : "ph ph-file-pdf";
                
                directCard.innerHTML = 
                    '<div class="outline-item-img" style="display:flex;align-items:center;justify-content:center; background: var(--primary); color: white;">' +
                    '    <i class="' + icon + '" style="font-size:24px;"></i>' +
                    '</div>' +
                    '<div class="outline-item-details">' +
                    '    <h4 class="outline-item-title" style="color: var(--primary); font-weight:800;">' + label + '</h4>' +
                    '    <p class="outline-item-subtitle">' + desc + '</p>' +
                    '</div>' +
                    '<i class="ph ph-play" style="color: var(--primary);"></i>';
                container.appendChild(directCard);
            }

            if (!cat.subCategories || cat.subCategories.length === 0) {
                if (!hasResource) {
                    container.innerHTML = '<div class="coming-soon-box">No topics configured in this library.</div>';
                }
                return;
            }

            const visibleSubs = cat.subCategories.filter(isItemVisibleToStudent);
            if (visibleSubs.length === 0) {
                if (!hasResource) {
                    container.innerHTML = '<div class="coming-soon-box">No topics currently available/scheduled in this library.</div>';
                }
                return;
            }

            visibleSubs.forEach((sub) => {
                const card = document.createElement("div");
                card.className = "outline-item-card";
                card.onclick = () => handleSelectSubcategoryNode(sub, type);
                var initSrc = (window.__imgCache && window.__imgCache[sub.image]) || sub.image || "";
                
                var subHtml = "";
                if (sub.image) {
                    subHtml += '<img class="outline-item-img" src="' + initSrc + '" data-original-src="' + sub.image + '">';
                } else {
                    subHtml += '<div class="outline-item-img" style="display:flex;align-items:center;justify-content:center;"><i class="ph ph-folder-simple" style="font-size:24px;"></i></div>';
                }
                subHtml += '<div class="outline-item-details">';
                subHtml += '    <h4 class="outline-item-title">' + sub.name + '</h4>';
                subHtml += '    <p class="outline-item-subtitle">Access learning files</p>';
                subHtml += '</div>';
                subHtml += '<i class="ph ph-caret-right" style="color: var(--primary);"></i>';
                
                card.innerHTML = subHtml;
                container.appendChild(card);
                if (sub.image && !(window.__imgCache && window.__imgCache[sub.image]) && typeof getCachedImageUrl === "function") {
                    const imgEl = card.querySelector(".outline-item-img");
                    if (imgEl) {
                        getCachedImageUrl(sub.image).then(function(src) {
                            if (src && src !== sub.image) {
                                imgEl.src = src;
                            }
                        });
                    }
                }
            });
        }

        function handleSelectSubcategoryNode(sub, type) {
            if (_activeCategoryNodeForUrl) {
                _activeCategoryName = _activeCategoryNodeForUrl.name;
            }
            _activeSubCategoryName = sub.name;
            _activeTopicName = (sub.test && sub.test.title) || (sub.pdf && sub.pdf.title) || sub.name;

            _activeSubcategoryNodeForUrl = sub;
            _activeTopicNodeForUrl = null;
            updateHistoryAndUrl(_activeCategoryNodeForUrl, sub, null);

            const hasTopics = sub.topics && sub.topics.length > 0;
            const hasResource = (type === 'test' && sub.test) || (type === 'pdf' && sub.pdf);

            if (hasResource && !hasTopics) {
                if (sub.test && !isItemScheduledVisible(sub.test)) {
                    alert("This test is scheduled to start at: " + new Date(sub.test.scheduledAt).toLocaleString());
                    return;
                }
                if (sub.pdf && !isItemScheduledVisible(sub.pdf)) {
                    alert("This PDF is scheduled to release at: " + new Date(sub.pdf.scheduledAt).toLocaleString());
                    return;
                }
                handleVerifyDirectMeta(sub, type);
                return;
            }

            // Open Topics screen
            const container = document.getElementById("topicsGridArea");
            container.innerHTML = "";
            document.getElementById("topicSelectionTitle").innerText = sub.name;

            navigateToScreen("scr-topics", sub.name);

            // Prepend a special direct launch card if direct content is attached at subarray
            if (hasResource) {
                const directCard = document.createElement("div");
                directCard.className = "outline-item-card";
                directCard.style.border = "2px dashed var(--primary)";
                directCard.style.background = "rgba(255, 107, 53, 0.05)";
                directCard.onclick = () => {
                    if (sub.test && !isItemScheduledVisible(sub.test)) {
                        alert("This test is scheduled to start at: " + new Date(sub.test.scheduledAt).toLocaleString());
                        return;
                    }
                    if (sub.pdf && !isItemScheduledVisible(sub.pdf)) {
                        alert("This PDF is scheduled to release at: " + new Date(sub.pdf.scheduledAt).toLocaleString());
                        return;
                    }
                    handleVerifyDirectMeta(sub, type);
                };
                
                const label = type === 'test' ? "\ud83c\udfc6 Launch Sub-category Exam" : "\ud83d\udcc1 View Sub-category PDF Document";
                const desc = type === 'test' ? "Primary subcategory-level test assessment" : "Primary subcategory-level study manual";
                const icon = type === 'test' ? "ph ph-sparkle" : "ph ph-file-pdf";
                
                directCard.innerHTML = 
                    '<div class="outline-item-img" style="display:flex;align-items:center;justify-content:center; background: var(--primary); color: white;">' +
                    '    <i class="' + icon + '" style="font-size:24px;"></i>' +
                    '</div>' +
                    '<div class="outline-item-details">' +
                    '    <h4 class="outline-item-title" style="color: var(--primary); font-weight:800;">' + label + '</h4>' +
                    '    <p class="outline-item-subtitle">' + desc + '</p>' +
                    '</div>' +
                    '<i class="ph ph-play" style="color: var(--primary);"></i>';
                container.appendChild(directCard);
            }

            if (!sub.topics || sub.topics.length === 0) {
                if (!hasResource) {
                    container.innerHTML = \`<div class="coming-soon-box">No active items located here.</div>\`;
                }
                return;
            }

            const visibleTopics = sub.topics.filter(isItemVisibleToStudent);
            if (visibleTopics.length === 0) {
                if (!hasResource) {
                    container.innerHTML = \`<div class="coming-soon-box">No scheduled items located here currently.</div>\`;
                }
                return;
            }

            visibleTopics.forEach((topic) => {
                const card = document.createElement("div");
                card.className = "outline-item-card";
                card.onclick = () => handleSelectTopicNode(topic, type);

                let subText = "Open MCQ Examination";
                let iconClass = "ph ph-exam";
                if (type === 'pdf') {
                    subText = "Download PDF documents";
                    iconClass = "ph ph-file-pdf";
                }

                card.innerHTML = \`
                    <div class="outline-item-img" style="display:flex;align-items:center;justify-content:center;">
                        <i class="\${iconClass}" style="font-size:24px; color: var(--primary);"></i>
                    </div>
                    <div class="outline-item-details">
                        <h4 class="outline-item-title">\${topic.name}</h4>
                        <p class="outline-item-subtitle">\${subText}</p>
                    </div>
                    <i class="ph ph-caret-right" style="color: var(--primary);"></i>
                \`;
                container.appendChild(card);
            });
        }

        function handleSelectTopicNode(topic, type) {
            if (_activeCategoryNodeForUrl) {
                _activeCategoryName = _activeCategoryNodeForUrl.name;
            }
            if (_activeSubcategoryNodeForUrl) {
                _activeSubCategoryName = _activeSubcategoryNodeForUrl.name;
            }
            _activeTopicName = topic.name;

            _activeTopicNodeForUrl = topic;
            updateHistoryAndUrl(_activeCategoryNodeForUrl, _activeSubcategoryNodeForUrl, topic);

            if (topic.test && !isItemScheduledVisible(topic.test)) {
                alert("This test is scheduled to start at: " + new Date(topic.test.scheduledAt).toLocaleString());
                return;
            }
            if (topic.pdf && !isItemScheduledVisible(topic.pdf)) {
                alert("This PDF is scheduled to release at: " + new Date(topic.pdf.scheduledAt).toLocaleString());
                return;
            }

            handleVerifyDirectMeta(topic, type);
        }

        // Checking tests or PDFs direct launch
        function handleVerifyDirectMeta(node, type) {
            if (!isItemVisibleToStudent(node)) {
                alert("This resource is restricted or not currently available for your account.");
                return;
            }
            if (type === 'pdf') {
                const pdfData = node.pdf;
                if (!pdfData || !pdfData.url) {
                    alert("No PDF resources linked here yet.");
                    return;
                }
                
                // If it is a Paid PDF, gate with premium checking rules
                if (pdfData.isPaid) {
                    if (!_studentLoggedInUser) {
                        alert("Premium PDF Document. Aspirant authorization is required. Redirecting to sign-in portal.");
                        handleTabNavigation('acc');
                        return;
                    }
                    
                    // Verify if premium account exists and is not expired
                    if (_studentLoggedInUser.expiryDate) {
                        const exp = new Date(_studentLoggedInUser.expiryDate);
                        if (exp.getTime() < Date.now()) {
                            alert("Your premium membership package has expired. Access denied. Redirecting to Payment pane.");
                            navigateToScreen("scr-pay", "Gated License");
                            return;
                        }
                    }
                }

                // Let them access URL after showing the copyright gate modal
                showCopyrightPdfModal(node.name || "Study Material PDF", pdfData.url, function() {
                    window.open(pdfData.url, '_blank');
                });
            } else {
                const testData = node.test;
                const othersCount = Object.values((testData && testData.questionsOther) || {}).reduce((sum, arr) => sum + (arr ? arr.length : 0), 0);
                const isConfigured = testData && (testData.hasSplitQuestions || testData.questionsEn.length > 0 || testData.questionsHi.length > 0 || othersCount > 0);
                if (!testData || !isConfigured) {
                    alert("No questions configured inside this Mock Test yet.");
                    return;
                }

                _activeTest = testData;
                
                // Setup pre-instructions screen
                navigateToScreen("scr-instructions", testData.title || node.name);
                document.getElementById("instExTitle").innerText = testData.title || node.name;
                document.getElementById("instExDuration").innerText = testData.duration;
                
                let qCount = testData.questionsCount || Math.max(testData.questionsEn.length, testData.questionsHi.length);
                Object.values(testData.questionsOther || {}).forEach(arr => {
                    if (arr && arr.length > qCount) {
                        qCount = arr.length;
                    }
                });
                document.getElementById("instExCount").innerText = qCount;
                document.getElementById("instExPositive").innerText = testData.posMarks;
                document.getElementById("instExNegative").innerText = testData.negMarks;
                document.getElementById("instExDesc").innerText = testData.instructions || "Conduct assessment systematically. Refrain from screenshot actions.";

                // Coupon panel display and state restoration
                var hasCoupon = false;
                var availableCoupons = [];
                if (testData.coupon && testData.coupon.code) {
                    hasCoupon = true;
                    availableCoupons.push({ id: testData.id, coupon: testData.coupon, type: "test" });
                }
                if (_activeTopicNodeForUrl) {
                    if (_activeTopicNodeForUrl.coupon && _activeTopicNodeForUrl.coupon.code) {
                        hasCoupon = true;
                        availableCoupons.push({ id: _activeTopicNodeForUrl.id, coupon: _activeTopicNodeForUrl.coupon, type: "topic" });
                    } else if (_activeTopicNodeForUrl.couponCode) {
                        hasCoupon = true;
                        availableCoupons.push({ id: _activeTopicNodeForUrl.id, coupon: { code: _activeTopicNodeForUrl.couponCode, maxAttempts: "unlimited" }, type: "topic" });
                    }
                }
                if (_activeSubcategoryNodeForUrl) {
                    if (_activeSubcategoryNodeForUrl.coupon && _activeSubcategoryNodeForUrl.coupon.code) {
                        hasCoupon = true;
                        availableCoupons.push({ id: _activeSubcategoryNodeForUrl.id, coupon: _activeSubcategoryNodeForUrl.coupon, type: "subcategory" });
                    } else if (_activeSubcategoryNodeForUrl.couponCode) {
                        hasCoupon = true;
                        availableCoupons.push({ id: _activeSubcategoryNodeForUrl.id, coupon: { code: _activeSubcategoryNodeForUrl.couponCode, maxAttempts: "unlimited" }, type: "subcategory" });
                    }
                }
                if (_activeCategoryNodeForUrl) {
                    if (_activeCategoryNodeForUrl.coupon && _activeCategoryNodeForUrl.coupon.code) {
                        hasCoupon = true;
                        availableCoupons.push({ id: _activeCategoryNodeForUrl.id, coupon: _activeCategoryNodeForUrl.coupon, type: "category" });
                    } else if (_activeCategoryNodeForUrl.couponCode) {
                        hasCoupon = true;
                        availableCoupons.push({ id: _activeCategoryNodeForUrl.id, coupon: { code: _activeCategoryNodeForUrl.couponCode, maxAttempts: "unlimited" }, type: "category" });
                    }
                }

                const couponPanel = document.getElementById("couponEntrySection");
                const couponInput = document.getElementById("couponCodeInput");
                const couponFeedback = document.getElementById("couponFeedbackMsg");
                const couponActionBtn = document.getElementById("couponActionBtn");
                
                var persistentlyApplied = null;
                for (var i = 0; i < availableCoupons.length; i++) {
                    var item = availableCoupons[i];
                    var match = _appliedCoupons.find(function(c) {
                        return c.id === item.id && c.code.toUpperCase() === item.coupon.code.toUpperCase();
                    });
                    if (match) {
                        persistentlyApplied = item;
                        break;
                    }
                }

                if (hasCoupon) {
                    couponPanel.style.display = "block";
                    if (persistentlyApplied) {
                        couponInput.value = persistentlyApplied.coupon.code;
                        couponInput.disabled = true;
                        couponFeedback.style.color = "green";
                        couponFeedback.innerHTML = "<strong>✓ Applied Persistent Promo:</strong> " + persistentlyApplied.coupon.code + " (Extra attempts granted. Will remain active across refreshes until removed).";
                        _hasActiveCouponGrant = persistentlyApplied.coupon;
                        if (couponActionBtn) {
                            couponActionBtn.innerText = "Remove";
                            couponActionBtn.className = "px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-black tracking-wider uppercase rounded-xl shadow-lg shadow-red-600/20 active:scale-95 transition cursor-pointer";
                        }
                    } else {
                        couponInput.value = "";
                        couponInput.disabled = false;
                        couponFeedback.innerHTML = "";
                        _hasActiveCouponGrant = null;
                        if (couponActionBtn) {
                            couponActionBtn.innerText = "Apply";
                            couponActionBtn.className = "px-6 py-2 bg-[#FF6B35] hover:bg-[#E0531F] text-white text-xs font-black tracking-wider uppercase rounded-xl shadow-lg shadow-[#FF6B35]/20 active:scale-95 transition cursor-pointer";
                        }
                    }
                } else {
                    couponPanel.style.display = "none";
                    _hasActiveCouponGrant = null;
                }
            }
        }

        // Voucher/Coupon submission validation
        function handleVerifyCouponSubmit() {
            const inputVal = document.getElementById("couponCodeInput").value.trim().toUpperCase();
            const feedback = document.getElementById("couponFeedbackMsg");
            const couponInput = document.getElementById("couponCodeInput");
            const couponActionBtn = document.getElementById("couponActionBtn");

            var availableCoupons = [];
            if (_activeTest.coupon && _activeTest.coupon.code) {
                availableCoupons.push({ id: _activeTest.id, coupon: _activeTest.coupon, type: "test" });
            }
            if (_activeTopicNodeForUrl) {
                if (_activeTopicNodeForUrl.coupon && _activeTopicNodeForUrl.coupon.code) {
                    availableCoupons.push({ id: _activeTopicNodeForUrl.id, coupon: _activeTopicNodeForUrl.coupon, type: "topic" });
                } else if (_activeTopicNodeForUrl.couponCode) {
                    availableCoupons.push({ id: _activeTopicNodeForUrl.id, coupon: { code: _activeTopicNodeForUrl.couponCode, maxAttempts: "unlimited" }, type: "topic" });
                }
            }
            if (_activeSubcategoryNodeForUrl) {
                if (_activeSubcategoryNodeForUrl.coupon && _activeSubcategoryNodeForUrl.coupon.code) {
                    availableCoupons.push({ id: _activeSubcategoryNodeForUrl.id, coupon: _activeSubcategoryNodeForUrl.coupon, type: "subcategory" });
                } else if (_activeSubcategoryNodeForUrl.couponCode) {
                    availableCoupons.push({ id: _activeSubcategoryNodeForUrl.id, coupon: { code: _activeSubcategoryNodeForUrl.couponCode, maxAttempts: "unlimited" }, type: "subcategory" });
                }
            }
            if (_activeCategoryNodeForUrl) {
                if (_activeCategoryNodeForUrl.coupon && _activeCategoryNodeForUrl.coupon.code) {
                    availableCoupons.push({ id: _activeCategoryNodeForUrl.id, coupon: _activeCategoryNodeForUrl.coupon, type: "category" });
                } else if (_activeCategoryNodeForUrl.couponCode) {
                    availableCoupons.push({ id: _activeCategoryNodeForUrl.id, coupon: { code: _activeCategoryNodeForUrl.couponCode, maxAttempts: "unlimited" }, type: "category" });
                }
            }

            var persistentlyAppliedIndex = -1;
            for (var i = 0; i < availableCoupons.length; i++) {
                var item = availableCoupons[i];
                var matchIdx = _appliedCoupons.findIndex(function(c) {
                    return c.id === item.id && c.code.toUpperCase() === item.coupon.code.toUpperCase();
                });
                if (matchIdx > -1) {
                    persistentlyAppliedIndex = matchIdx;
                    break;
                }
            }

            if (persistentlyAppliedIndex > -1) {
                _appliedCoupons.splice(persistentlyAppliedIndex, 1);
                try {
                    localStorage.setItem("_student_applied_coupons", JSON.stringify(_appliedCoupons));
                } catch(e){}
                
                feedback.style.color = "blue";
                feedback.innerText = "Promo Coupon removed successfully.";
                couponInput.value = "";
                couponInput.disabled = false;
                _hasActiveCouponGrant = null;
                if (couponActionBtn) {
                    couponActionBtn.innerText = "Apply";
                    couponActionBtn.className = "px-6 py-2 bg-[#FF6B35] hover:bg-[#E0531F] text-white text-xs font-black tracking-wider uppercase rounded-xl shadow-lg shadow-[#FF6B35]/20 active:scale-95 transition cursor-pointer";
                }
                return;
            }

            if (!inputVal) {
                feedback.style.color = "red";
                feedback.innerText = "Please enter promo code.";
                return;
            }

            var matchingCouponObj = availableCoupons.find(function(item) {
                return item.coupon.code.toUpperCase() === inputVal;
            });

            if (!matchingCouponObj) {
                feedback.style.color = "red";
                feedback.innerText = "Invalid verification promo code.";
                return;
            }

            var configCoupon = matchingCouponObj.coupon;

            const currentDateVal = new Date().getTime();
            const startDate = configCoupon.startDate ? new Date(configCoupon.startDate).getTime() : 0;
            const endDate = configCoupon.endDate ? new Date(configCoupon.endDate).getTime() : Infinity;

            if (currentDateVal < startDate) {
                feedback.style.color = "orange";
                feedback.innerText = "Promo code is not active yet.";
                return;
            }

            if (currentDateVal > endDate) {
                feedback.style.color = "red";
                feedback.innerText = "Promo code has expired.";
                return;
            }

            if (configCoupon.maxAttempts && configCoupon.maxAttempts !== "unlimited") {
                var limitNum = parseInt(configCoupon.maxAttempts);
                if (!isNaN(limitNum)) {
                    var attemptedCount = 0;
                    try {
                        var localKey = "_secured_test_history_" + _activeTest.id;
                        var historyStr = localStorage.getItem(localKey);
                        if (historyStr) {
                            var historyList = JSON.parse(historyStr);
                            if (Array.isArray(historyList)) {
                                attemptedCount = historyList.filter(function(h) { return h.usedCoupon === configCoupon.code; }).length;
                            }
                        }
                    } catch(e){}

                    if (attemptedCount >= limitNum) {
                        feedback.style.color = "red";
                        feedback.innerText = "Promo code usage limit exceeded (Max " + limitNum + " allowed).";
                        return;
                    }
                }
            }

            _appliedCoupons.push({
                id: matchingCouponObj.id,
                code: configCoupon.code,
                coupon: configCoupon,
                appliedAt: Date.now()
            });

            try {
                localStorage.setItem("_student_applied_coupons", JSON.stringify(_appliedCoupons));
            } catch(e){}

            _hasActiveCouponGrant = configCoupon;
            feedback.style.color = "green";
            feedback.innerHTML = "<strong>✓ Applied Persistent Promo:</strong> " + configCoupon.code + " (Extra attempts granted. Will remain active across refreshes until removed).";
            
            couponInput.disabled = true;
            if (couponActionBtn) {
                couponActionBtn.innerText = "Remove";
                couponActionBtn.className = "px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-black tracking-wider uppercase rounded-xl shadow-lg shadow-red-600/20 active:scale-95 transition cursor-pointer";
            }
        }

        // Test Ignition & Locking checks
        async function handleBeginTestInitiation() {
            // If the test has split questions, make sure they are fetched and populated first!
            if (_activeTest && _activeTest.hasSplitQuestions && (!_activeTest.questionsEn || _activeTest.questionsEn.length === 0) && (!_activeTest.questionsHi || _activeTest.questionsHi.length === 0)) {
                
                // Show clean loading spinner / disable button of the instruction page
                var startButton = document.querySelector("#scr-instructions button.btn-fill-prime");
                var originalText = startButton ? startButton.innerHTML : "Start Exam";
                if (startButton) {
                    startButton.disabled = true;
                    startButton.innerHTML = '<i class="ph ph-spinner-gap" style="animation: db-spin 1s linear infinite; display: inline-block; margin-right: 8px;"></i> Loading Exam Questions...';
                }
                
                var examId = _activeTest.id;
                var fetchedQuestions = null;
                
                // 1. Try to load from IndexedDB questions cache
                try {
                    fetchedQuestions = await getCachedExamQuestions(examId);
                } catch(e) {
                    console.warn("Error reading exam questions cache", e);
                }
                
                if (fetchedQuestions) {
                    console.log("Exam questions loaded instantly from local cache!");
                    _activeTest.questionsEn = fetchedQuestions.questionsEn || [];
                    _activeTest.questionsHi = fetchedQuestions.questionsHi || [];
                    _activeTest.questionsOther = fetchedQuestions.questionsOther || {};
                } else {
                    // 2. Fetch from Cloudflare R2 securely
                    var r2Url = "https://pub-dc360536e4fb46baa3e3e8719d01793e.r2.dev/test_questions_" + examId + ".txt";
                    try {
                        console.log("Fetching fresh exam questions from Cloudflare R2:", r2Url);
                        const res = await fetch(r2Url);
                        if (!res.ok) {
                            throw new Error("HTTP Status " + res.status);
                        }
                        const text = await res.text();
                        const decodedPayload = JSON.parse(decodeObfuscatedPayload(text.trim()));
                        
                        _activeTest.questionsEn = decodedPayload.questionsEn || [];
                        _activeTest.questionsHi = decodedPayload.questionsHi || [];
                        _activeTest.questionsOther = decodedPayload.questionsOther || {};
                        
                        // Save to IndexedDB questions cache so they never have to download again!
                        saveExamQuestionsToCache(examId, {
                            questionsEn: _activeTest.questionsEn,
                            questionsHi: _activeTest.questionsHi,
                            questionsOther: _activeTest.questionsOther
                        });
                        
                        console.log("Exam questions downloaded and cached successfully!");
                    } catch(err) {
                        console.error("Failed downloading exam questions", err);
                        alert("⚠️ Connection Failed: Host/Network error downloading questions. Please check internet connection.");
                        if (startButton) {
                            startButton.disabled = false;
                            startButton.innerHTML = originalText;
                        }
                        return;
                    }
                }
                
                if (startButton) {
                    startButton.disabled = false;
                    startButton.innerHTML = originalText;
                }
            }

            // Verify access rules
            // 0. Premium Gated rules if the test is marked Paid/Premium
            if (_activeTest.isPaid) {
                if (!_studentLoggedInUser) {
                    alert("This is a Paid / Premium Mock Test. Student authorization is required. Redirecting to portal.");
                    handleTabNavigation('acc');
                    return;
                }
                if (_studentLoggedInUser.expiryDate) {
                    const exp = new Date(_studentLoggedInUser.expiryDate);
                    if (exp.getTime() < Date.now()) {
                        alert("Your premium membership package has expired. Access Denied. Redirecting to Payment pane.");
                        navigateToScreen("scr-pay", "Gated License");
                        return;
                    }
                }
            }

            // 1. Specific User Emails restriction check
            if (_activeTest.onlyUsers && _activeTest.onlyUsers.trim()) {
                const allowedUsers = _activeTest.onlyUsers.split(/[\\n,]+/).map(s => s.trim().toLowerCase()).filter(s => s);
                if (allowedUsers.length > 0) {
                    if (!_studentLoggedInUser) {
                        alert("Secure examination. You must log-in to continue.");
                        handleTabNavigation('acc');
                        return;
                    }
                    const isAllowed = allowedUsers.includes(_studentLoggedInUser.emailOrMobile.toLowerCase());
                    if (!isAllowed) {
                        alert("Access Denied! Your student credentials are not approved for this premium exam. Contact Prayas One.");
                        return;
                    }
                }
            }

            // 2. Premium Locking Check via Attempt depletion
            // Coupon grants bypass
            const attemptCountKey = "attempts_test_" + _activeTest.id;
            let currentAttempts = parseInt(localStorage.getItem(attemptCountKey) || "0");

            // Look up applied coupon
            let activeAttemptsAllowed = _studentLoggedInUser ? Infinity : (_activeTest.freeAttempts || 1);
            
            if (_hasActiveCouponGrant) {
                if (_hasActiveCouponGrant.maxAttempts === 'unlimited' || !_hasActiveCouponGrant.maxAttempts) {
                    activeAttemptsAllowed = Infinity;
                } else {
                    const count = parseInt(_hasActiveCouponGrant.maxAttempts);
                    if (!isNaN(count)) {
                        // Count how many times this coupon has been used
                        let couponUsedCount = 0;
                        try {
                            const localKey = "_secured_test_history_" + _activeTest.id;
                            const historyStr = localStorage.getItem(localKey);
                            if (historyStr) {
                                const historyList = JSON.parse(historyStr);
                                if (Array.isArray(historyList)) {
                                    couponUsedCount = historyList.filter(function(h) { return h.usedCoupon === _hasActiveCouponGrant.code; }).length;
                                }
                            }
                        } catch(e){}
                        
                        if (couponUsedCount >= count) {
                            alert("This coupon limit of " + count + " attempts has been reached. Please contact admin.");
                            return;
                        }
                        // Bypasses the attempt block because coupon is valid!
                        activeAttemptsAllowed = Infinity; 
                    }
                }
            }

            if (!_studentLoggedInUser && currentAttempts >= activeAttemptsAllowed) {
                // Block and push payment
                navigateToScreen("scr-pay", "Gated License");
                return;
            }

            // Setup questions pool based on translations
            _activeQuestions = [];
            
            const langMapping = {
                en: _activeTest.questionsEn || [],
                hi: _activeTest.questionsHi || [],
                ...(_activeTest.questionsOther || {})
            };

            // Get list of all languages that actually have questions!
            _availableLanguages = Object.keys(langMapping).filter(l => langMapping[l] && langMapping[l].length > 0);
            if (_availableLanguages.length === 0) {
                _availableLanguages = ['en'];
            }
            
            _currentLanguage = _availableLanguages[0] || 'en';

            let maxLen = 0;
            _availableLanguages.forEach(l => {
                if (langMapping[l].length > maxLen) {
                    maxLen = langMapping[l].length;
                }
            });

            for (let idx = 0; idx < maxLen; idx++) {
                const questionBag = {};
                _availableLanguages.forEach(l => {
                    questionBag[l] = langMapping[l][idx] || null;
                });
                
                let fallbackCorrect = 1;
                for (let l of _availableLanguages) {
                    if (questionBag[l] && questionBag[l].c) {
                        fallbackCorrect = questionBag[l].c;
                        break;
                    }
                }
                
                questionBag.originalCorrect = fallbackCorrect;
                _activeQuestions.push(questionBag);
            }

            // Render translation toggle action dynamically
            const translateBtn = document.getElementById("translateBtn");
            const label = document.getElementById("translateLabel");

            if (_availableLanguages.length > 1) {
                translateBtn.style.display = "flex";
                label.innerText = _currentLanguage.toUpperCase();
            } else {
                translateBtn.style.display = "none";
            }

            // Increment local registered attempts counter
            localStorage.setItem(attemptCountKey, (currentAttempts + 1).toString());

            // Log attempt metadata for persistent coupon usage tracking!
            try {
                var localHistoryKey = "_secured_test_history_" + _activeTest.id;
                var historyStr = localStorage.getItem(localHistoryKey) || "[]";
                var historyList = JSON.parse(historyStr);
                if (!Array.isArray(historyList)) historyList = [];
                historyList.push({
                    attemptedAt: Date.now(),
                    usedCoupon: _hasActiveCouponGrant ? _hasActiveCouponGrant.code : null
                });
                localStorage.setItem(localHistoryKey, JSON.stringify(historyList));
            } catch(e){}

            // Bootstrap exam environment
            _testStateActiveNow = true;
            _testIsPaused = false;
            document.getElementById("testEngineName").innerText = _activeTest.title || "Examination Desk";
            _answersMap = {};
            _markedReviewMap = {};
            _activeQIndex = 0;

            // Launch timers
            document.getElementById("test-engine-panel").style.display = "flex";
            renderEngineQuestionItem();
            
            _timeRemainingSecs = (_activeTest.duration || 60) * 60;
            updateTestEngineTimerClockDisplay();

            if (_timeIntervalId) clearInterval(_timeIntervalId);
            _timeIntervalId = setInterval(() => {
                _timeRemainingSecs--;
                updateTestEngineTimerClockDisplay();

                if (_timeRemainingSecs <= 0) {
                    clearInterval(_timeIntervalId);
                    handleForceAutoSubmitTest();
                }
            }, 1000);
        }

        // Test Language Translation Toggle
        function handleToggleLanguage() {
            const idx = _availableLanguages.indexOf(_currentLanguage);
            const nextIdx = (idx + 1) % _availableLanguages.length;
            _currentLanguage = _availableLanguages[nextIdx];
            
            const label = document.getElementById("translateLabel");
            label.innerText = _currentLanguage.toUpperCase();
            renderEngineQuestionItem();
        }

        // Timer Clock Displays
        function updateTestEngineTimerClockDisplay() {
            const minutes = Math.floor(_timeRemainingSecs / 60);
            const seconds = _timeRemainingSecs % 60;
            const formatMin = minutes < 10 ? "0" + minutes : minutes;
            const formatSec = seconds < 10 ? "0" + seconds : seconds;
            document.getElementById("testTimerText").innerText = formatMin + ":" + formatSec;
        }

        // Rendering exam sheet items
        function renderEngineQuestionItem() {
            const container = document.getElementById("engineQsContent");
            container.innerHTML = "";

            const questionBlock = _activeQuestions[_activeQIndex];
            if (!questionBlock) return;

            // Pick standard translation node
            let qNode = questionBlock[_currentLanguage];
            if (!qNode) {
                for (let l of _availableLanguages) {
                    if (questionBlock[l]) {
                        qNode = questionBlock[l];
                        break;
                    }
                }
            }
            const fontClass = 'lang-' + _currentLanguage;

            if (!qNode) {
                container.innerHTML = "<p>Error rendering item structure.</p>";
                return;
            }

            const isMarkedReview = _markedReviewMap[_activeQIndex] === true;
            const reviewBtn = document.getElementById("btnMarkReview");
            if (isMarkedReview) {
                reviewBtn.classList.add("active");
                reviewBtn.innerHTML = '<i class="ph-fill ph-bookmark-simple"></i> BOOKMARKED';
            } else {
                reviewBtn.classList.remove("active");
                reviewBtn.innerHTML = '<i class="ph-bold ph-bookmark-simple"></i> MARK FOR REVIEW';
            }

            // Create Visual Q block
            let sourceText = questionBlock.source || qNode.source || "";
            if (!sourceText) {
                for (let l of _availableLanguages) {
                    if (questionBlock[l] && questionBlock[l].source) {
                        sourceText = questionBlock[l].source;
                        break;
                    }
                }
            }
            let sourceHtml = "";
            if (sourceText && !_hideSourceOnStudent) {
                sourceHtml = '<div style="margin: 8px 0 15px; padding: 8px 12px; background: #fffbeb; border-left: 4px solid #d97706; border-radius: 6px; font-size: 11px; font-weight: bold; color: #b45309;" class="engine-question-source">&#128214; <strong>Source / Reference:</strong> ' + sourceText + '</div>';
            }

            var isSaved = isQuestionSaved(_activeQIndex);
            var saveBtnHtml = '<button onclick="handleToggleSaveFromEngine(' + _activeQIndex + ')" style="background: none; border: none; color: ' + (isSaved ? '#22c55e' : '#FF6B35') + '; font-size: 11px; font-weight: bold; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; margin-right: 12px;">' +
                '<i class="' + (isSaved ? 'ph-fill ph-bookmark-simple' : 'ph-bold ph-bookmark-simple') + '" style="font-size: 14px;"></i> ' + (isSaved ? 'Saved' : 'Save') +
                '</button>';

            const card = document.createElement("div");
            card.className = fontClass;
            card.innerHTML = 
                '<div class="engine-question-num" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">' +
                '  <span>QUESTION ' + (_activeQIndex + 1) + ' OF ' + _activeQuestions.length + '</span>' +
                '  <div style="display: flex; align-items: center;">' +
                '    ' + saveBtnHtml +
                '    <button class="report-q-btn" onclick="handleReportActiveQuestionIssue()" style="background: none; border: none; color: #ef4444; font-size: 11px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 4px;">' +
                '      <i class="ph-bold ph-warning-circle" style="font-size: 14px;"></i> Report' +
                '    </button>' +
                '  </div>' +
                '</div>' +
                '<div class="engine-question-text">' + qNode.q + '</div>' +
                (qNode.image ? '<div class="engine-question-image-box" style="margin: 12px 0; text-align: center;"><img src="' + qNode.image + '" style="max-width: 100%; max-height: 280px; border-radius: 12px; border: 1.5px solid var(--border-color); box-shadow: 0 4px 15px rgba(0,0,0,0.05); object-fit: contain; background: white;" referrerPolicy="no-referrer"></div>' : '') +
                sourceHtml +
                '<div style="margin-top: 15px;" id="optionsRadioGroup"></div>';

            container.appendChild(card);

            // Populate options block with selection tracking
            const radioGroup = document.getElementById("optionsRadioGroup");
            const activeSel = _answersMap[_activeQIndex];

            qNode.o.forEach((optContent, idx) => {
                const optIdxVal = idx + 1;
                const isSelected = activeSel === optIdxVal;
                
                const btn = document.createElement("button");
                btn.className = "option-button" + (isSelected ? " selected" : "");
                btn.onclick = () => handleSelectOptionChoice(optIdxVal);
                
                btn.innerHTML = 
                    '<div class="option-badge">' + String.fromCharCode(65 + idx) + '</div>' +
                    '<span>' + optContent + '</span>';
                radioGroup.appendChild(btn);
            });

            // Disabled states control
            document.getElementById("btnPrevQ").disabled = _activeQIndex === 0;
            document.getElementById("btnNextQ").disabled = _activeQIndex === _activeQuestions.length - 1;
        }

        // Generate pre-filled defect email with structured metadata
        function handleReportActiveQuestionIssue(index) {
            const targetIdx = (typeof index === 'number') ? index : _activeQIndex;
            window._activeQIndexReported = targetIdx;
            document.getElementById("reportComplaintTextArea").value = "";
            document.getElementById("reportQuestionModal").style.display = "flex";
        }

        function handleCloseReportModal() {
            document.getElementById("reportQuestionModal").style.display = "none";
        }

        window.handleReportActiveQuestionIssue = handleReportActiveQuestionIssue;
        window.handleCloseReportModal = handleCloseReportModal;

        // Handle direct MCQ selections
        function handleSelectOptionChoice(optIndexVal) {
            const currentSelVal = _answersMap[_activeQIndex];
            
            // Toggle selection logic: if selected again, deselect option
            if (currentSelVal === optIndexVal) {
                _answersMap[_activeQIndex] = null;
            } else {
                _answersMap[_activeQIndex] = optIndexVal;
            }
            renderEngineQuestionItem();
        }

        // Palette Toggle Drawer Controllers
        function handleTogglePalette(isOpened) {
            const sheet = document.getElementById("paletteDrawerContainer");
            const overlay = document.getElementById("paletteDrawerOverlay");

            if (isOpened) {
                renderPaletteGridCells();
                sheet.style.display = "flex";
                overlay.style.display = "block";
            } else {
                sheet.style.display = "none";
                overlay.style.display = "none";
            }
        }

        function renderPaletteGridCells() {
            const target = document.getElementById("paletteGridContent");
            target.innerHTML = "";

            _activeQuestions.forEach((_, idx) => {
                const isSaved = _answersMap[idx] !== undefined && _answersMap[idx] !== null;
                const isMarked = _markedReviewMap[idx] === true;

                let cellClass = "not-visited";
                if (isSaved) cellClass = "answered";
                else if (isMarked) cellClass = "review-marked";

                const btn = document.createElement("button");
                btn.className = "palette-cell " + cellClass;
                btn.innerText = (idx + 1).toString();
                btn.onclick = () => {
                    _activeQIndex = idx;
                    handleTogglePalette(false);
                    renderEngineQuestionItem();
                };

                target.appendChild(btn);
            });
        }

        // Review markers and index shifting
        function handleToggleMarkReview() {
            _markedReviewMap[_activeQIndex] = !_markedReviewMap[_activeQIndex];
            renderEngineQuestionItem();
        }

        function handleNextQuestion() {
            if (_activeQIndex < _activeQuestions.length - 1) {
                _activeQIndex++;
                renderEngineQuestionItem();
            }
        }

        function handlePrevQuestion() {
            if (_activeQIndex > 0) {
                _activeQIndex--;
                renderEngineQuestionItem();
            }
        }

        // Submission score computations
        function handleForceAutoSubmitTest() {
            try {
                const qsContent = document.getElementById("engineQsContent");
                if (qsContent) {
                    qsContent.style.filter = "none";
                    qsContent.style.pointerEvents = "auto";
                }
                const pauseModal = document.getElementById("testPauseResumeModal");
                if (pauseModal) pauseModal.style.display = "none";
            } catch (e) {}

            // Finalize immediately so no progress is ever lost!
            finalizeSubmissionAndShowAnalysis(true);

            // Show non-blocking feedback
            showToast("⏳ Time's Up! Test submitted automatically.");
            showCustomAlert("Time Expired", "Times Up! Your mock examination paper has been automatically submitted and evaluated successfully.");
        }

        function handlePromptSubmitTest() {
            const answeredCount = Object.values(_answersMap).filter(val => val !== null && val !== undefined).length;
            const confirmMsg = "Are you absolutely confident about submitting your assessment? \\u2714\\n\\nAnswered: " + answeredCount + " of " + _activeQuestions.length + " questions.";
            
            showCustomConfirm("Submit Assessment", confirmMsg, function() {
                finalizeSubmissionAndShowAnalysis(false);
            });
        }

        function finalizeSubmissionAndShowAnalysis(isForced) {
            _testStateActiveNow = false;
            _testIsPaused = false;
            if (_timeIntervalId) clearInterval(_timeIntervalId);
            document.getElementById("test-engine-panel").style.display = "none";

            // Score evaluation
            let correctCount = 0;
            let incorrectCount = 0;
            let unansweredCount = 0;

            _activeQuestions.forEach((qBlock, idx) => {
                const selectAns = _answersMap[idx];
                if (selectAns === undefined || selectAns === null) {
                    unansweredCount++;
                } else if (selectAns === qBlock.originalCorrect) {
                    correctCount++;
                } else {
                    incorrectCount++;
                }
            });

            const positiveMarks = _activeTest.posMarks || 1;
            const negativeMarks = _activeTest.negMarks || 0;
            const calculatedTotalScoreValue = (correctCount * positiveMarks) - (incorrectCount * negativeMarks);

            // Display scorecard stats values
            document.getElementById("statCorrectCountText").innerText = correctCount;
            document.getElementById("statIncorrectCountText").innerText = incorrectCount;
            document.getElementById("statUnansweredCountText").innerText = unansweredCount;
            document.getElementById("statTotalItemsText").innerText = _activeQuestions.length;
            document.getElementById("statTotalScoreCalcText").innerText = calculatedTotalScoreValue.toFixed(2);

            const totalScorePossibleValue = _activeQuestions.length * positiveMarks;
            document.getElementById("statTotalPossibleMarks").innerText = "/ " + totalScorePossibleValue.toFixed(2);

            const accuracyVal = _activeQuestions.length > 0 ? Math.round((correctCount / _activeQuestions.length) * 100) : 0;
            document.getElementById("statAccuracyPercent").innerText = accuracyVal + "%";

            const totalSecsTaken = (_activeTest.duration * 60) - _timeRemainingSecs;
            const durationMinutesText = Math.floor(totalSecsTaken / 60) + "m " + (totalSecsTaken % 60) + "s";
            document.getElementById("statDurationSpent").innerText = durationMinutesText;

            const resultsTopicHeaderEl = document.getElementById("resultsTopicHeader");
            if (resultsTopicHeaderEl) {
                resultsTopicHeaderEl.innerText = _activeTest.title || "MOCK ASSESSMENT";
            }

            // Populate Results Question inline horizontal scrollable palette
            const resGrid = document.getElementById("analysisQuestionSelectorRow");
            if (resGrid) {
                resGrid.innerHTML = "";

                _activeQuestions.forEach((qBlock, idx) => {
                    const selectAns = _answersMap[idx];
                    const btn = document.createElement("button");
                    
                    let btnColorLabel = "#808080"; // Grey unvisited standard
                    let btnTextColor = "#ffffff";

                    if (selectAns === undefined || selectAns === null) {
                        btnColorLabel = "#a4b0be";
                    } else if (selectAns === qBlock.originalCorrect) {
                        btnColorLabel = "var(--green)";
                    } else {
                        btnColorLabel = "var(--primary)";
                    }

                    btn.className = "palette-cell";
                    btn.style.backgroundColor = btnColorLabel;
                    btn.style.color = btnTextColor;
                    btn.style.borderColor = btnColorLabel;
                    btn.style.width = "40px";
                    btn.style.height = "40px";
                    btn.style.borderRadius = "10px";
                    btn.style.flexShrink = "0";
                    btn.style.fontFamily = "sans-serif";
                    btn.innerText = (idx + 1).toString();
                    btn.onclick = () => handleOpenDetailedAnalysisItem(idx);

                    resGrid.appendChild(btn);
                });

                // Auto view first question analysis
                if (_activeQuestions.length > 0) {
                    handleOpenDetailedAnalysisItem(0);
                }
            }

            // Live Leaderboards & Analytics submissions (Features 21 & 26)
            let candidateName = "";
            if (_studentLoggedInUser) {
                candidateName = _studentLoggedInUser.name || _studentLoggedInUser.emailOrMobile || "Logged-in Aspirant";
            } else {
                const storedName = localStorage.getItem("_last_aspirant_name");
                if (storedName && storedName.trim()) {
                    candidateName = storedName.trim();
                } else if (isForced) {
                    candidateName = "Aspirant " + Math.floor(100 + Math.random() * 900);
                    localStorage.setItem("_last_aspirant_name", candidateName);
                } else {
                    try {
                        const promptVal = prompt("Enter your Name to show on the Leaderboard (Optional):", "Aspirant " + Math.floor(100 + Math.random() * 900));
                        candidateName = (promptVal && promptVal.trim()) ? promptVal.trim() : ("Aspirant " + Math.floor(100 + Math.random() * 900));
                        localStorage.setItem("_last_aspirant_name", candidateName);
                    } catch(e) {
                        candidateName = "Guest Aspirant";
                    }
                }
            }

            const attemptCountKey = "attempts_test_" + _activeTest.id;
            const currentAttempts = parseInt(localStorage.getItem(attemptCountKey) || "1");

            const activeRecord = {
                studentName: candidateName,
                score: calculatedTotalScoreValue,
                obtainedMarks: calculatedTotalScoreValue,
                totalMarksPossible: totalScorePossibleValue,
                attemptNum: currentAttempts,
                correct: correctCount,
                incorrect: incorrectCount,
                duration: durationMinutesText,
                date: new Date().toISOString().split("T")[0],
                timeTaken: totalSecsTaken
            };

            // 1. Submit attempt to current test leaderboard
            fetch(getApiUrl("/api/leaderboard"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    testId: _activeTest.id,
                    activeRecord: activeRecord
                })
            })
            .then(r => r.json())
            .then(ldata => {
                if (ldata.success) {
                    renderTestLeaderboardTable(ldata.leaderboard);
                } else {
                    // Fallback to fetch existing leaderboard
                    fetch(getApiUrl("/api/leaderboard/" + _activeTest.id))
                    .then(res => res.json())
                    .then(ld => renderTestLeaderboardTable(ld))
                    .catch(e => console.error(e));
                }
            })
            .catch(err => {
                console.error("Leaderboard submission error", err);
                fetch(getApiUrl("/api/leaderboard/" + _activeTest.id))
                .then(r => r.json())
                .then(ldata => {
                    renderTestLeaderboardTable(ldata);
                })
                .catch(err2 => console.error("Leaderboard fallback query error", err2));
            });

            // 2. Register attempt specs in global student analytics profile
            if (_studentLoggedInUser) {
                fetch(getApiUrl("/api/analytics/submit"), {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: _studentLoggedInUser.emailOrMobile,
                        obtainedScore: calculatedTotalScoreValue,
                        totalScore: totalScorePossibleValue,
                        timeTakenSecs: totalSecsTaken
                    })
                })
                .catch(err => console.error("Student analytics logging error", err));
            }

            const leadBlock = document.getElementById("resultsLeaderboardBlock");
            if (leadBlock) {
                leadBlock.style.display = "block";
            }
            navigateToScreen("scr-results", "Analyses Hub");
        }

        function renderTestLeaderboardTable(rows) {
            const tbody = document.getElementById("leaderboardTBodyContent");
            if (!tbody) return;
            tbody.innerHTML = "";

            let rowList = [];
            if (Array.isArray(rows)) {
                rowList = rows;
            } else if (rows && Array.isArray(rows.leaderboard)) {
                rowList = rows.leaderboard;
            } else if (rows && Array.isArray(rows.rows)) {
                rowList = rows.rows;
            }

            if (!rowList || rowList.length === 0) {
                tbody.innerHTML = "<tr><td colspan='5' style='padding: 18px; text-align: center; color: var(--grey-text);'>Be the first to submit a mock test attempt!</td></tr>";
                return;
            }

            const loggedInName = _studentLoggedInUser ? (_studentLoggedInUser.name || _studentLoggedInUser.emailOrMobile || "") : "";
            const lastSubmittedName = localStorage.getItem("_last_aspirant_name") || "";

            // Find best attempt index
            let myRowIndex = -1;
            rowList.forEach((row, idx) => {
                const name = (row.studentName || "").toLowerCase();
                const matchesLoggedIn = loggedInName && name === loggedInName.toLowerCase();
                const matchesLastSub = lastSubmittedName && name === lastSubmittedName.toLowerCase();
                if ((matchesLoggedIn || matchesLastSub) && myRowIndex === -1) {
                    myRowIndex = idx;
                }
            });

            // Create or update a celebration Standing Alert Badge at the top of results
            let alertBar = document.getElementById("leaderboardRankAlertBar");
            if (!alertBar) {
                alertBar = document.createElement("div");
                alertBar.id = "leaderboardRankAlertBar";
                // Insert it right above the first panel in results screen
                const leaderboardBlock = document.getElementById("resultsLeaderboardBlock");
                if (leaderboardBlock) {
                    leaderboardBlock.insertBefore(alertBar, leaderboardBlock.firstChild);
                }
            }

            if (myRowIndex !== -1) {
                const rank = myRowIndex + 1;
                let prize = "&#127942;";
                if (rank === 1) prize = "&#129351;";
                else if (rank === 2) prize = "&#129352;";
                else if (rank === 3) prize = "&#129353;";

                alertBar.className = "you-rank-alert";
                alertBar.style.cssText = "background: #fef3c7; border: 1.5px solid #f59e0b; padding: 14px; border-radius: 12px; margin-bottom: 16px; font-weight: 800; color: #b45309; text-align: center; font-size: 14px; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 12px rgba(245,158,11,0.15); display: flex !important;";
                alertBar.innerHTML = "<span>" + prize + "</span> Your Standing: <strong>Rank #" + rank + "</strong> out of " + rowList.length + " Candidates!";
            } else {
                alertBar.style.display = "none";
            }

            rowList.forEach((row, idx) => {
                const rank = idx + 1;
                let rankLabel = rank.toString();
                if (rank === 1) rankLabel = "&#129351; 1";
                else if (rank === 2) rankLabel = "&#129352; 2";
                else if (rank === 3) rankLabel = "&#129353; 3";

                const obMarks = parseFloat(row.obtainedMarks !== undefined ? row.obtainedMarks : row.score || 0).toFixed(2);
                const totPossible = parseFloat(row.totalMarksPossible || row.totalScore || 0).toFixed(2);
                const attemptLabel = "Attempt " + (row.attemptNum || 1);

                const name = (row.studentName || "").toLowerCase();
                const isYou = (loggedInName && name === loggedInName.toLowerCase()) || 
                              (lastSubmittedName && name === lastSubmittedName.toLowerCase());

                const tr = document.createElement("tr");
                tr.style.borderBottom = "1px solid var(--border-color)";
                
                if (isYou) {
                    tr.style.backgroundColor = "rgba(245, 158, 11, 0.12)";
                    tr.style.fontWeight = "bold";
                    tr.style.borderLeft = "4px solid #f59e0b";
                }

                const youBadge = isYou ? " <span style='background:#f59e0b; color:#ffffff; font-size:9.5px; padding:2px 6px; border-radius:8px; margin-left:6px; font-weight:bold;'>YOU</span>" : "";

                tr.innerHTML = "<td style='padding: 12px 14px; font-weight: bold; color: var(--dark);'>" + rankLabel + "</td>" +
                    "<td style='padding: 12px 14px; font-weight: 600;'>" + row.studentName + youBadge + "</td>" +
                    "<td style='padding: 12px 14px; text-align: center; font-weight: bold; color: #22c55e;'>" + obMarks + " <span style='font-size:10px; color:var(--grey-text); font-weight:normal;'>/ " + totPossible + "</span></td>" +
                    "<td style='padding: 12px 14px; text-align: center; font-weight: bold; color: var(--grey-text); font-size: 11.5px;'>" + attemptLabel + "</td>" +
                    "<td style='padding: 12px 14px; text-align: right; font-family: monospace; color: var(--grey-text); font-size: 11.5px;'>" + (row.duration || "N/A") + "</td>";
                tbody.appendChild(tr);
            });
        }

        // Open detailed explanation analysis popups
        function handleOpenDetailedAnalysisItem_old(index) {
            const modal = document.getElementById("itemDetailedAnalysisModal");
            const scrollArea = document.getElementById("itemAnalysisScrollViewArea");
            document.getElementById("analysisItemIndexHeader").innerText = "Question " + (index + 1);

            scrollArea.innerHTML = "";
            const qBlock = _activeQuestions[index];
            if (!qBlock) return;

            // Match translations if available
            const excludeKeys = ['originalCorrect', 'source', 'id'];
            const blockEl = document.createElement("div");
            blockEl.innerHTML = "";

            Object.keys(qBlock).forEach(langKey => {
                const excludeKeys = ['originalCorrect', 'source', 'id'];
                if (excludeKeys.indexOf(langKey) !== -1 || !qBlock[langKey]) return;
                
                const qNode = qBlock[langKey];
                if (typeof qNode !== 'object' || !qNode || !Array.isArray(qNode.o)) return;

                const isHi = langKey === 'hi';
                const fontName = isHi ? "'Sahitya', serif" : "'Outfit', sans-serif";

                const optSelectionsHtml = qNode.o.map((oVal, idx) => {
                    const optIdx = idx + 1;
                    const isCorrect = optIdx === qNode.c;
                    const isSelected = _answersMap[index] === optIdx;

                    let classes = "analysis-opt-box";
                    let style = "margin-bottom:8px; padding:12px; border-radius:10px; border:1.5px solid var(--border-color); font-weight:bold; font-family: " + fontName + " !important;";

                    if (isCorrect) {
                        classes += " correct";
                        style += " background-color: #f0fdf4; border-color: #22c55e; color: #15803d;";
                    } else if (isSelected) {
                        classes += " wrong";
                        style += " background-color: #fef2f2; border-color: #ef4444; color: #b91c1c;";
                    }

                    return '<div class="' + classes + '" style="' + style + '">' + String.fromCharCode(65 + idx) + ') ' + oVal + '</div>';
                }).join('');

                const isStandardEn = langKey === 'en';
                const isStandardHi = langKey === 'hi';
                const langTitle = isStandardEn ? 'ENGLISH VERSION' : (isStandardHi ? 'HINDI VERSION (हिंदी)' : \`\${langKey.toUpperCase()} VERSION\`);

                const finalExpFont = getFontForText(qNode.s, fontName);
                blockEl.innerHTML += \`
                    <div class="lang-\${langKey}" style="border-bottom:1px dashed var(--border-color); padding-bottom:15px; margin-bottom:15px; font-family: \${fontName} !important;">
                        <span style="font-size:10px; font-weight:bold; color:var(--primary); font-family: \${fontName} !important;">\${langTitle}</span>
                        <div class="analysis-question-box" style="font-family: \${fontName} !important;"><strong>Q:</strong> \${qNode.q}</div>
                        \${qNode.image ? '<div style="text-align:center; padding:10px 0;"><img src="' + qNode.image + '" style="max-width:100%; max-height:240px; border-radius:10px; border:1px solid var(--border-color); background:white;" referrerPolicy="no-referrer"></div>' : ''}
                        \${optSelectionsHtml}
                        \${qNode.s ? '<div class="analysis-explanation-box" style="font-family: ' + finalExpFont + ' !important;"><strong>Explanation / Solution (Ex):</strong> ' + qNode.s + '</div>' : ''}
                    </div>
                \`;
            });

            // Extract source reference attributes
            let sourceText = qBlock.source || "";
            if (!sourceText) {
                // look in any of the language nodes
                for (let l of Object.keys(qBlock)) {
                    if (excludeKeys.indexOf(l) === -1 && qBlock[l] && qBlock[l].source) {
                        sourceText = qBlock[l].source;
                        break;
                    }
                }
            }
            const _hideSourceOnStudent = ${!!config.social.hideSourceOnStudent};
            if (sourceText && !_hideSourceOnStudent) {
                const srcEl = document.createElement("div");
                srcEl.style.marginTop = "15px";
                srcEl.style.padding = "8px 12px";
                srcEl.style.background = "#fffbeb";
                srcEl.style.borderLeft = "4px solid #d97706";
                srcEl.style.borderRadius = "4px";
                srcEl.style.fontSize = "11px";
                srcEl.style.fontWeight = "bold";
                srcEl.style.color = "#b45309";
                srcEl.innerHTML = "<strong>&#128214; Question Source / References:</strong> " + sourceText;
                blockEl.appendChild(srcEl);
            }

            scrollArea.appendChild(blockEl);
            modal.style.display = "flex";
        }

        function handleCloseAnalysisModal_old() {
            document.getElementById("itemDetailedAnalysisModal").style.display = "none";
        }

        function updateDynamicDashboardGreeting() {
            const greetTitleEl = document.getElementById("displayGreetText");
            const greetSubEl = document.getElementById("displayGreetSubtitle");
            if (!greetTitleEl || !greetSubEl) return;

            if (_studentLoggedInUser) {
                // Dynamic premium greet details
                greetTitleEl.innerText = "Hi " + _studentLoggedInUser.name + "!";
                
                // Calculate remaining days
                if (_studentLoggedInUser.expiryDate) {
                    const exp = new Date(_studentLoggedInUser.expiryDate);
                    const diffMs = exp.getTime() - Date.now();
                    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
                    const remains = diffDays > 0 ? diffDays : 0;
                    greetSubEl.innerText = "Premium Unlocked | Remaining Days: " + remains;
                } else {
                    greetSubEl.innerText = "Premium Active | Lifetime Access";
                }
            } else {
                // Fallback to defaults
                greetTitleEl.innerText = DB.studentGreeting || "Hi, Aspirant!";
                greetSubEl.innerText = DB.studentSubGreeting || "PRAYAS ONE PROFESSIONAL HUB";
            }
        }

        // Student Account Gateway Authorization
        function loadStudentAnalyticsDashboard() {
            if (!_studentLoggedInUser) return;
            const email = _studentLoggedInUser.emailOrMobile;
            const name = _studentLoggedInUser.name;

            // Fetch overall analytics summary
            fetch(getApiUrl("/api/admin/analytics"))
                .then(r => r.json())
                .then(analytics => {
                    const studentProfile = analytics[email] || {
                        totalTestsAttempted: 0,
                        bestScore: 0,
                        averageScore: 0,
                        totalTimeSpent: 0
                    };

                    document.getElementById("panelTotalAttempts").innerText = studentProfile.totalTestsAttempted + " Tests";
                    document.getElementById("panelHighestScore").innerText = parseFloat(studentProfile.bestScore || 0).toFixed(2);
                    document.getElementById("panelAverageScore").innerText = parseFloat(studentProfile.averageScore || 0).toFixed(2) + "%";
                    
                    const totalMins = Math.round((studentProfile.totalTimeSpent || 0) / 60);
                    document.getElementById("panelTotalStudyTime").innerText = totalMins + "m Spent";
                })
                .catch(err => console.error("Error loading user profile analytics", err));

            // Fetch previous completed examination attempts (Feature 26 Integration)
            fetch(getApiUrl("/api/student/attempts/" + encodeURIComponent(name)))
                .then(r => r.json())
                .then(ldata => {
                    const tbody = document.getElementById("personalAttemptsListBody");
                    if (!tbody) return;
                    tbody.innerHTML = "";

                    if (!ldata.attempts || ldata.attempts.length === 0) {
                        tbody.innerHTML = "<tr><td colspan='3' style='padding: 20px; text-align: center; color: var(--grey-text);'>No assessments recorded yet. Start practicing!</td></tr>";
                        return;
                    }

                    // Sort attempts newest-first
                    const sorted = ldata.attempts.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

                    sorted.forEach(attempt => {
                        const tr = document.createElement("tr");
                        tr.style.borderBottom = "1px solid var(--border-color)";
                        tr.innerHTML = "<td style='padding: 10px 12px; font-weight: 600;'>" +
                            "<div style='color: var(--dark);'>" + (attempt.quizTitle || "Mock Test") + "</div>" +
                            "<div style='font-size: 9.5px; color: var(--grey-text); margin-top: 2px;'>" + (attempt.date || "") + "</div>" +
                            "</td>" +
                            "<td style='padding: 10px 12px; text-align: center; font-weight: bold; color: #22c55e;'>" + parseFloat(attempt.score).toFixed(2) + "</td>" +
                            "<td style='padding: 10px 12px; text-align: right; color: var(--grey-text); font-size: 11px;'>" + (attempt.duration || "N/A") + "</td>";
                        tbody.appendChild(tr);
                    });
                })
                .catch(err => console.error("Error loading historical attempts", err));
        }

        function refreshStudentAccountProfileGate() {
            const studentAuthFormPanel = document.getElementById("studentAuthFormPanel");
            const studentAuthenticatedProfileArea = document.getElementById("studentAuthenticatedProfileArea");

            if (_studentLoggedInUser) {
                studentAuthFormPanel.style.display = "none";
                studentAuthenticatedProfileArea.style.display = "block";
                document.getElementById("studentUserHeaderName").innerText = _studentLoggedInUser.name;
                document.getElementById("studentUserHeaderMail").innerText = _studentLoggedInUser.emailOrMobile;
                buildSecurityAntiLeakOverlay(_studentLoggedInUser.emailOrMobile);
                
                // Expiry and Remaining duration metrics computations (Feature 25)
                if (_studentLoggedInUser.expiryDate) {
                    document.getElementById("profileRemainingDays").innerText = _studentLoggedInUser.expiryDate;
                    document.getElementById("profileExpiryDate").innerText = _studentLoggedInUser.expiryDate;
                } else if (_studentLoggedInUser.premiumExpiryDate) {
                    document.getElementById("profileRemainingDays").innerText = _studentLoggedInUser.premiumExpiryDate;
                    document.getElementById("profileExpiryDate").innerText = _studentLoggedInUser.premiumExpiryDate;
                } else {
                    document.getElementById("profileRemainingDays").innerText = "Lifetime Access";
                    document.getElementById("profileExpiryDate").innerText = "Never Expires";
                }

                loadStudentAnalyticsDashboard();
            } else {
                studentAuthFormPanel.style.display = "block";
                studentAuthenticatedProfileArea.style.display = "none";
                buildSecurityAntiLeakOverlay("aspirant_guest");
            }
            updateDynamicDashboardGreeting();
        }

        function checkConcurrentUserSession() {
            if (!_studentLoggedInUser || !_studentLoggedInUser.id) return;
            var userIdVal = _studentLoggedInUser.id;
            var tokenVal = _studentLoggedInUser.sessionToken || "";

            fetch(getApiUrl("/api/premium/verify"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: userIdVal, sessionToken: tokenVal })
            })
            .then(function(r) { return r.json(); })
            .then(function(resData) {
                if (resData.success) {
                    if (resData.status === "logged_out" || !resData.active) {
                        localStorage.removeItem("_secured_active_aspirant");
                        _studentLoggedInUser = null;
                        refreshStudentAccountProfileGate();
                        showCustomAlert(
                            "Session Terminated", 
                            "This account has been logged in from another device or window. Only one concurrent session is permitted per aspirant.", 
                            function() {
                                handleTabNavigation('home');
                            }
                        );
                    }
                }
            })
            .catch(function(err) {
                console.warn("Session check offline fallback:", err);
            });
        }
        window.checkConcurrentUserSession = checkConcurrentUserSession;

        function handleStudentAuthenticationProcess() {
            const credMail = document.getElementById("inputStudentCredMail").value.trim().toLowerCase();
            const credPass = document.getElementById("inputStudentCredPass").value.trim();

            if (!credMail || !credPass) {
                alert("Provide valid account login keys.");
                return;
            }

            // Attempt online server verification first
            fetch(getApiUrl("/api/auth/login"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ emailOrMobile: credMail, password: credPass })
            })
            .then(res => {
                if (res.ok) return res.json();
                throw new Error("Local fallback required");
            })
            .then(resData => {
                if (resData.success && resData.user) {
                    _studentLoggedInUser = resData.user;
                    localStorage.setItem("_secured_active_aspirant", JSON.stringify(resData.user));
                    refreshStudentAccountProfileGate();
                    alert("Login Approved! Premium materials are unlocked.");
                    handleTabNavigation('home');
                } else {
                    alert("Invalid student credentials key pair. Try again or notify Prayas One operator.");
                }
            })
            .catch(err => {
                const studentsList = DB.students || [];
                const matchedStudent = studentsList.find(s => {
                    var matchMail = s.emailOrMobile && s.emailOrMobile.trim().toLowerCase() === credMail;
                    var matchPass = s.password && s.password.toString().trim() === credPass;
                    return matchMail && matchPass;
                });

                if (matchedStudent) {
                    _studentLoggedInUser = matchedStudent;
                    localStorage.setItem("_secured_active_aspirant", JSON.stringify(matchedStudent));
                    refreshStudentAccountProfileGate();
                    alert("Login Approved! Premium materials are unlocked.");
                    handleTabNavigation('home');
                } else {
                    alert("Invalid student credentials key pair. Try again or notify Prayas One operator.");
                }
            });
        }

        function handleStudentSignOutProcess() {
            localStorage.removeItem("_secured_active_aspirant");
            _studentLoggedInUser = null;
            refreshStudentAccountProfileGate();
            alert("Secure session revoked. Standard premium limitations are re-locked.");
            handleTabNavigation('home');
        }

        // Shared Telegram screenshot link
        function handleTelegramPaymentScreenshotSubmit() {
            const utrInput = document.getElementById("txnUtrRefNumberInput").value.trim() || "N/A";

            const telegramUrlBase = "${config.social.telegram}";
            const formattedMessage = encodeURIComponent(
                "PRAYAS ONE REGISTRATION LICENSE PAYMENT CHECKED\\n" +
                "UTR TRANSACTION REF: " + utrInput + "\\n" +
                "Email or Mobile user: " + (_studentLoggedInUser ? _studentLoggedInUser.emailOrMobile : "Anonymous Aspirant")
            );

            // Direct forward screenshot on telegram link
            const urlToOpen = telegramUrlBase + "?text=" + formattedMessage;
            window.open(urlToOpen, '_blank');
        }

        let _uploadedScreenshotBase64 = "";

        function handlePayScreenshotChange(inputEl) {
            if (inputEl.files && inputEl.files[0]) {
                const file = inputEl.files[0];
                document.getElementById("paySSLabel").innerText = file.name + " (" + Math.round(file.size / 1024) + " KB)";
                document.getElementById("paySSIcon").className = "ph ph-check-circle";
                document.getElementById("paySSIcon").style.color = "var(--green)";

                const reader = new FileReader();
                reader.onload = function(e) {
                    _uploadedScreenshotBase64 = e?.target?.result ? String(e.target.result) : "";
                };
                reader.readAsDataURL(file);
            }
        }

        function handleSendPaymentDetailsEmail() {
            const name = document.getElementById("payFormName").value.trim();
            const email = document.getElementById("payFormEmail").value.trim();
            const phone = document.getElementById("payFormPhone").value.trim();
            const utr = document.getElementById("payFormUTR").value.trim();

            if (!name || !email || !phone) {
                alert("Please fill in Name, Email and Phone details before acquiring premium access.");
                return;
            }

            if (utr && utr.length < 6) {
                alert("Please provide a valid UPI Transaction Ref / UTR number (minimum 6 digits) if filling the UTR field.");
                return;
            }

            const subject = "PRAYAS ONE - PREMIUM ACCESS REQUEST: " + name;
            const body = 
                "--- PREMIUM ACCESS VERIFICATION SYSTEM ---\\n\\n" +
                "Dear Admin,\\n" +
                "I have completed my premium payment. Below are my registration credentials for access activation:\\n\\n" +
                "Student Name: " + name + "\\n" +
                "Email Address: " + email + "\\n" +
                "Phone Number: " + phone + "\\n" +
                "UTR / UPI ID (12 Digits): " + utr + "\\n\\n" +
                "Note to Aspirant: Please attach the copy/screenshot of payment details screen to this email while sending!\\n\\n" +
                "Thank You,\\n" +
                name;

            window.location.href = "mailto:good4xo@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
        }

        function handleSendReportEmail() {
            const complaint = document.getElementById("reportComplaintTextArea").value.trim();
            if (!complaint) {
                alert("Please describe the issue or discrepancy before sending.");
                return;
            }

            const targetIdx = (typeof window._activeQIndexReported === 'number') ? window._activeQIndexReported : _activeQIndex;
            const questionBlock = _activeQuestions[targetIdx];
            if (!questionBlock) return;
            let qNode = questionBlock[_currentLanguage];
            if (!qNode) {
                for (let l of _availableLanguages) {
                    if (questionBlock[l]) {
                        qNode = questionBlock[l];
                        break;
                    }
                }
            }
            if (!qNode) return;

            const categoryName = _activeCategoryName || "N/A";
            const subCategoryName = _activeSubCategoryName || "N/A";
            const topicName = _activeTopicName || "N/A";
            const qNum = targetIdx + 1;
            const qText = qNode.q || "";
            const qOpts = (qNode.o || []).map((o, idx) => String.fromCharCode(65 + idx) + ") " + o).join("\\n");
            
            const subject = "PRAYAS ONE QUESTION DISCREPANCY REPORT: " + (_activeTest ? _activeTest.title : "Mock Test");
            const body = 
                "--- ASPECT DISCREPANCY COMPLAINT ---\\n\\n" +
                "Operator/Aspirant Report:\\n" + complaint + "\\n\\n" +
                "--- QUESTION REFERENCE ---\\n" +
                "Category: " + categoryName + "\\n" +
                "Sub-Category: " + subCategoryName + "\\n" +
                "Topic: " + topicName + "\\n" +
                "Question Index: " + qNum + "\\n\\n" +
                "Text:\\n" + qText + "\\n\\n" +
                "Options:\\n" + qOpts + "\\n";

            window.location.href = "mailto:good4xo@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
            handleCloseReportModal();
        }

        function handleTriggerRefreshReboot() {
            handleTabNavigation('home');
        }

        // Open detailed inline explanation analysis
        function handleOpenDetailedAnalysisItem(index) {
            const detailCard = document.getElementById("analysisDetailViewerCard");
            if (!detailCard) return;

            // Highlight horizontal selector button
            const rowSelector = document.getElementById("analysisQuestionSelectorRow");
            if (rowSelector) {
                const buttons = rowSelector.querySelectorAll("button");
                buttons.forEach((btn, idx) => {
                    if (idx === index) {
                        btn.style.outline = "3px solid var(--primary)";
                        btn.style.outlineOffset = "1.5px";
                        try {
                            btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                        } catch (e) {}
                    } else {
                        btn.style.outline = "none";
                    }
                });
            }

            const qBlock = _activeQuestions[index];
            if (!qBlock) return;

            // Pick standard translation node matching currently active language
            let qNode = qBlock[_currentLanguage];
            if (!qNode) {
                for (let l of _availableLanguages) {
                    if (qBlock[l]) {
                        qNode = qBlock[l];
                        break;
                    }
                }
            }

            if (!qNode) {
                detailCard.innerHTML = "<p>Error loading item structure.</p>";
                return;
            }

            const isHi = _currentLanguage === 'hi';
            const fontName = isHi ? "'Sahitya', serif" : "'Outfit', sans-serif";
            const fontStyle = "font-family: " + fontName + " !important;";

            const qFontName = getFontForText(qNode.q, fontName);
            const qFontStyle = "font-family: " + qFontName + " !important;";

            const optSelectionsHtml = qNode.o.map((oVal, idx) => {
                const optIdx = idx + 1;
                const isCorrect = optIdx === qNode.c;
                const isSelected = _answersMap[index] === optIdx;

                const oFontName = getFontForText(oVal, fontName);
                const oFontStyle = "font-family: " + oFontName + " !important;";

                let classes = "analysis-opt-box";
                let style = "margin-bottom:8px; padding:12px; border-radius:10px; border:1.5px solid var(--border-color); font-weight:bold; " + oFontStyle;

                if (isCorrect) {
                     classes += " correct";
                     style += " background-color: #f0fdf4; border-color: #22c55e; color: #15803d;";
                } else if (isSelected) {
                     classes += " wrong";
                     style += " background-color: #fef2f2; border-color: #ef4444; color: #b91c1c;";
                }

                return '<div class="' + classes + '" style="' + style + '">' + 
                    String.fromCharCode(65 + idx) + ') ' + oVal + 
                    '</div>';
            }).join('');

            const _hideSourceOnStudent = ${!!config.social.hideSourceOnStudent};
            let sourceText = qBlock.source || qNode.source || "";
            let sourceHtml = "";
            
            const srcFontName = getFontForText(sourceText, fontName);
            const srcFontStyle = "font-family: " + srcFontName + " !important;";
            
            if (sourceText && !_hideSourceOnStudent) {
                sourceHtml = '<div style="margin-top: 15px; padding: 10px 12px; background: #fffbeb; border-left: 4px solid #d97706; border-radius: 6px; font-size: 11px; font-weight: bold; color: #b45309; ' + srcFontStyle + '">' +
                    '&#128214; <strong>Source / Reference:</strong> ' + sourceText +
                    '</div>';
            }

            const expFontName = getFontForText(qNode.s, fontName);
            const expFontStyle = "font-family: " + expFontName + " !important;";

            var analysisIsSaved = isQuestionSaved(index);
            var analysisSaveBtnHtml = '<button onclick="handleToggleSaveFromAnalysis(' + index + ')" style="background: none; border: none; color: ' + (analysisIsSaved ? '#22c55e' : '#FF6B35') + '; font-size: 11px; font-weight: bold; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">' +
                '<i class="' + (analysisIsSaved ? 'ph-fill ph-bookmark-simple' : 'ph-bold ph-bookmark-simple') + '" style="font-size: 14px;"></i> ' + (analysisIsSaved ? 'Saved' : 'Save') +
                '</button>';

            var analysisReportBtnHtml = '<button onclick="handleReportActiveQuestionIssue(' + index + ')" style="background: none; border: none; color: #ef4444; font-size: 11px; font-weight: bold; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">' +
                '<i class="ph-bold ph-warning-circle" style="font-size: 14px;"></i> Report' +
                '</button>';

            const prevDisabled = index === 0;
            const nextDisabled = index === _activeQuestions.length - 1;

            const navigationHtml = 
                '<div style="display: flex; justify-content: space-between; align-items: center; margin-top: 25px; padding-top: 18px; border-top: 1.5px solid var(--border-color); gap: 12px;">' +
                '  <button class="analysis-nav-btn" ' + (prevDisabled ? 'disabled' : 'onclick="handleOpenDetailedAnalysisItem(' + (index - 1) + ')"') + ' style="flex: 1; max-width: 150px;">' +
                '    <i class="ph-bold ph-caret-left" style="font-size: 14px;"></i> Previous' +
                '  </button>' +
                '  <div style="font-size: 12.5px; font-weight: 800; color: var(--grey-text); font-family: Outfit, sans-serif; letter-spacing: 0.5px; opacity: 0.9;">' +
                '    Q. ' + (index + 1) + ' / ' + _activeQuestions.length +
                '  </div>' +
                '  <button class="analysis-nav-btn" ' + (nextDisabled ? 'disabled' : 'onclick="handleOpenDetailedAnalysisItem(' + (index + 1) + ')"') + ' style="flex: 1; max-width: 150px;">' +
                '    Next <i class="ph-bold ph-caret-right" style="font-size: 14px;"></i>' +
                '  </button>' +
                '</div>';

            detailCard.innerHTML = 
                '<div class="lang-' + _currentLanguage + '" style="' + fontStyle + '">' +
                '  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom:8px;">' +
                '    <div style="font-size:11px; font-weight:bold; color:var(--primary); ' + fontStyle + '">QUESTION ' + (index + 1) + ' ANALYSIS (' + _currentLanguage.toUpperCase() + ')</div>' +
                '    <div style="display: flex; align-items: center; gap: 15px;">' +
                '       ' + analysisSaveBtnHtml +
                '       ' + analysisReportBtnHtml +
                '    </div>' +
                '  </div>' +
                '  <div class="analysis-question-box" style="background:var(--light-grey); padding:16px; border-radius:12px; border:1px solid var(--border-color); margin-bottom:20px; font-size:15px; line-height:1.5; font-weight:bold; ' + qFontStyle + '"><strong>Q:</strong> ' + qNode.q + '</div>' +
                (qNode.image ? '<div class="analysis-question-image-box" style="margin: -10px 0 15px; text-align: center;"><img src="' + qNode.image + '" style="max-width: 100%; max-height: 250px; border-radius: 12px; border: 1.5px solid var(--border-color); box-shadow: 0 4px 12px rgba(0,0,0,0.05); object-fit: contain; background: white;" referrerPolicy="no-referrer"></div>' : '') +
                '  <div style="margin-top:10px;">' + optSelectionsHtml + '</div>' +
                '  ' + (qNode.s ? '<div class="analysis-explanation-box" style="background:#e1f5fe; border:1px solid #b3e5fc; padding:16px; border-radius:12px; font-size:14px; line-height:1.5; color:#0277bd; margin-top:15px; ' + expFontStyle + '"><strong>Explanation / Solution (Ex):</strong> ' + qNode.s + '</div>' : '<div class="analysis-explanation-box" style="background:#f1f2f6; border:1px solid var(--border-color); padding:16px; border-radius:12px; font-size:13px; color:#57606f; margin-top:15px; ' + fontStyle + '"><strong>Explanation:</strong> No explanation provided.</div>') +
                '  ' + sourceHtml +
                '  ' + navigationHtml +
                '</div>';
        }

        function handleClosePaymentSuccessModal() {
            document.getElementById("paymentSuccessPopupModal").style.display = "none";
            handleTabNavigation('home');
        }

        // IndexedDB Cache Storage helper to make the page load instantly on subsequent opens
        var CACHE_DB_NAME = "PrayasOneCachedDB";
        var CACHE_STORE_NAME = "DatabaseStore";
        var QUESTIONS_CACHE_STORE = "ExamQuestionsStore";
        var CACHE_KEY = "assembled_config";

        function upgradeDBSchema(e) {
            var db = e.target.result;
            if (!db.objectStoreNames.contains(CACHE_STORE_NAME)) {
                db.createObjectStore(CACHE_STORE_NAME);
            }
            if (!db.objectStoreNames.contains(QUESTIONS_CACHE_STORE)) {
                db.createObjectStore(QUESTIONS_CACHE_STORE);
            }
        }

        var _dbInstance = null;
        var _dbOpeningPromise = null;

        function getDB() {
            if (_dbInstance) {
                return Promise.resolve(_dbInstance);
            }
            if (_dbOpeningPromise) {
                return _dbOpeningPromise;
            }

            _dbOpeningPromise = new Promise(function(resolve, reject) {
                var isResolved = false;
                
                // Add a smart safety fallback timeout of 450ms! If IndexedDB doesn't open
                // within 450ms, we assume it is blocked/locked and reject the promise immediately.
                // This allows the app to load instantly from R2 immediately without any loader hang!
                var timeoutId = setTimeout(function() {
                    if (!isResolved) {
                        isResolved = true;
                        console.warn("IndexedDB connection timed out (450ms). Bypassing cache to avoid any loader hang.");
                        reject(new Error("Timeout"));
                        _dbOpeningPromise = null;
                    }
                }, 450);

                try {
                    var req = indexedDB.open(CACHE_DB_NAME, 2);
                    
                    req.onupgradeneeded = upgradeDBSchema;
                    
                    req.onsuccess = function(e) {
                        if (isResolved) {
                            try { e.target.result.close(); } catch(err){}
                            return;
                        }
                        clearTimeout(timeoutId);
                        isResolved = true;
                        _dbInstance = e.target.result;
                        
                        // Close if database shifts (e.g., version changes)
                        _dbInstance.onversionchange = function() {
                            try { _dbInstance.close(); } catch(err){}
                            _dbInstance = null;
                        };
                        
                        resolve(_dbInstance);
                        _dbOpeningPromise = null;
                    };
                    
                    req.onerror = function() {
                        if (isResolved) return;
                        clearTimeout(timeoutId);
                        isResolved = true;
                        reject(new Error("IndexedDB Open Error"));
                        _dbOpeningPromise = null;
                    };
                    
                    req.onblocked = function() {
                        if (isResolved) return;
                        clearTimeout(timeoutId);
                        isResolved = true;
                        console.warn("IndexedDB upgrade blocked! Rejecting immediately.");
                        reject(new Error("IndexedDB Blocked"));
                        _dbOpeningPromise = null;
                    };
                } catch(err) {
                    if (isResolved) return;
                    clearTimeout(timeoutId);
                    isResolved = true;
                    reject(err);
                    _dbOpeningPromise = null;
                }
            });

            return _dbOpeningPromise;
        }

        function getCachedPayload() {
            return new Promise(function(resolve) {
                getDB().then(function(db) {
                    try {
                        var tx = db.transaction(CACHE_STORE_NAME, "readonly");
                        var store = tx.objectStore(CACHE_STORE_NAME);
                        var getReq = store.get(CACHE_KEY);
                        getReq.onsuccess = function() {
                            var data = getReq.result;
                            if (data && typeof data === "object" && data.payload) {
                                resolve(data);
                            } else if (typeof data === "string") {
                                resolve({ payload: data, buildId: "" });
                            } else {
                                resolve(null);
                            }
                        };
                        getReq.onerror = function() {
                            resolve(null);
                        };
                    } catch(txErr) {
                        resolve(null);
                    }
                }).catch(function(err) {
                    console.warn("Skipping getCachedPayload due to DB mismatch/timeout", err);
                    resolve(null);
                });
            });
        }

        function savePayloadToCache(payload, buildId) {
            getDB().then(function(db) {
                try {
                    var tx = db.transaction(CACHE_STORE_NAME, "readwrite");
                    var store = tx.objectStore(CACHE_STORE_NAME);
                    store.put({ payload: payload, buildId: buildId || "" }, CACHE_KEY);
                } catch(e) {
                    console.error("IndexedDB cache save failed:", e);
                }
            }).catch(function(err) {
                console.warn("Skip savePayloadToCache, db locked:", err);
            });
        }

        function getCachedExamQuestions(examId) {
            return new Promise(function(resolve) {
                getDB().then(function(db) {
                    try {
                        var tx = db.transaction(QUESTIONS_CACHE_STORE, "readonly");
                        var store = tx.objectStore(QUESTIONS_CACHE_STORE);
                        var getReq = store.get(examId);
                        getReq.onsuccess = function() {
                            resolve(getReq.result || null);
                        };
                        getReq.onerror = function() {
                            resolve(null);
                        };
                    } catch(txErr) {
                        resolve(null);
                    }
                }).catch(function() {
                    resolve(null);
                });
            });
        }

        function saveExamQuestionsToCache(examId, questionsPayload) {
            getDB().then(function(db) {
                try {
                    var tx = db.transaction(QUESTIONS_CACHE_STORE, "readwrite");
                    var store = tx.objectStore(QUESTIONS_CACHE_STORE);
                    store.put(questionsPayload, examId);
                } catch(txErr) {
                    console.warn("Could not save questions in transaction", txErr);
                }
            }).catch(function(err) {
                console.warn("Skip saveExamQuestionsToCache, db locked:", err);
            });
        }

        // Image memory caching & preheating for zero-latency page loading on mobile and desktop
        window.__imgCache = window.__imgCache || {};
        window.__imgCacheLoaded = false;

        function initImageCache() {
            return new Promise(function(resolve) {
                getDB().then(function(db) {
                    try {
                        var tx = db.transaction(CACHE_STORE_NAME, "readonly");
                        var store = tx.objectStore(CACHE_STORE_NAME);
                        var reqCursor = store.openCursor();
                        
                        // We process up to 35 items at a time to keep thread completely responsive and prevent heavy garbage collection lock!
                        var itemsLoaded = 0;
                        reqCursor.onsuccess = function(event) {
                            var cursor = event.target.result;
                            if (cursor) {
                                var key = cursor.key;
                                if (typeof key === "string" && key.indexOf("img_") === 0) {
                                    var originalUrl = key.substring(4);
                                    window.__imgCache[originalUrl] = cursor.value;
                                }
                                itemsLoaded++;
                                if (itemsLoaded % 35 === 0) {
                                    // Yield control to the browser event loop for 1 tick to prevent any loader lag!
                                    setTimeout(function() {
                                        try { cursor.continue(); } catch(e) { resolve(); }
                                    }, 0);
                                } else {
                                    cursor.continue();
                                }
                            } else {
                                window.__imgCacheLoaded = true;
                                console.log("Memory image cache preheated successfully with " + Object.keys(window.__imgCache).length + " images.");
                                resolve();
                            }
                        };
                        reqCursor.onerror = function() {
                            window.__imgCacheLoaded = true;
                            resolve();
                        };
                    } catch (err) {
                        window.__imgCacheLoaded = true;
                        resolve();
                    }
                }).catch(function() {
                    window.__imgCacheLoaded = true;
                    resolve();
                });
            });
        }

        // Image caching with super-fast RAM lookup and background updates
        function getCachedImageUrl(url) {
            return new Promise(function(resolve) {
                if (!url || url.indexOf("data:") === 0) {
                    resolve(url);
                    return;
                }

                // 1. Extreme Fast Synchronous RAM check: instantly return cached version!
                if (window.__imgCache && window.__imgCache[url]) {
                    resolve(window.__imgCache[url]);
                    triggerBackgroundRefresh(url, window.__imgCache[url]);
                    return;
                }

                // 2. Query IndexedDB as fallback
                getDB().then(function(db) {
                    try {
                        var tx = db.transaction(CACHE_STORE_NAME, "readonly");
                        var store = tx.objectStore(CACHE_STORE_NAME);
                        var key = "img_" + url;
                        var getReq = store.get(key);
                        getReq.onsuccess = function() {
                            var cachedVal = getReq.result || null;
                            if (cachedVal) {
                                if (window.__imgCache) {
                                    window.__imgCache[url] = cachedVal;
                                }
                                resolve(cachedVal);
                                triggerBackgroundRefresh(url, cachedVal);
                            } else {
                                resolve(url);
                                triggerBackgroundRefresh(url, null);
                            }
                        };
                        getReq.onerror = function() {
                            resolve(url);
                        };
                    } catch(e) {
                        resolve(url);
                    }
                }).catch(function() {
                    resolve(url);
                });
            });
        }

        var _bgRefreshQueue = [];
        var _bgRefreshProcessing = false;

        function processNextBgRefresh() {
            if (_bgRefreshQueue.length === 0) {
                _bgRefreshProcessing = false;
                return;
            }
            _bgRefreshProcessing = true;
            
            var item = _bgRefreshQueue.shift();
            var url = item.url;
            var existingValue = item.existingValue;

            fetch(url)
                .then(function(response) {
                    if (!response.ok) throw new Error("HTTP " + response.status);
                    return response.blob();
                })
                .then(function(blob) {
                    var reader = new FileReader();
                    reader.onloadend = function() {
                        var newValue = reader.result;
                        if (newValue !== existingValue) {
                            if (window.__imgCache) {
                                window.__imgCache[url] = newValue;
                            }
                            getDB().then(function(db) {
                                try {
                                    var txWrite = db.transaction(CACHE_STORE_NAME, "readwrite");
                                    var storeWrite = txWrite.objectStore(CACHE_STORE_NAME);
                                    storeWrite.put(newValue, "img_" + url);
                                } catch(err) {
                                    console.error("Failed to write to database image store value", err);
                                }
                            }).catch(function() {});

                            // Live seamless transition: find any matching img tags currently visible and update their src
                            var images = document.getElementsByTagName("img");
                            for (var i = 0; i < images.length; i++) {
                                var img = images[i];
                                if (img.src === url || img.src === newValue || img.getAttribute("data-original-src") === url) {
                                    img.src = newValue;
                                }
                            }
                        }
                        // Delay 200ms before processing next image to keep the interface absolutely silky smooth at 60 FPS
                        setTimeout(processNextBgRefresh, 200);
                    };
                    reader.readAsDataURL(blob);
                })
                .catch(function() {
                    // Suppress and continue gently
                    setTimeout(processNextBgRefresh, 150);
                });
        }

        // Silent background fetch, cache save, and live update of matching images on-screen
        function triggerBackgroundRefresh(url, existingValue) {
            if (existingValue) {
                return;
            }
            if (!url || url.indexOf("data:") === 0 || url.indexOf("blob:") === 0) return;
            
            // Avoid duplicate queueing
            for (var i = 0; i < _bgRefreshQueue.length; i++) {
                if (_bgRefreshQueue[i].url === url) return;
            }

            _bgRefreshQueue.push({ url: url, existingValue: existingValue });
            
            if (!_bgRefreshProcessing) {
                // Wait 1.5 seconds after portal loading before executing background network operations
                // to make sure user scrolling on sliders/category grid/alerts doesn't lag!
                setTimeout(processNextBgRefresh, 1500);
            }
        }

        function ensurePaymentQrCached() {
            try {
                var qrUrl = (DB && DB.social && DB.social.paymentQr) || "";
                if (qrUrl) {
                    var img = document.getElementById("displayPayQrImage");
                    if (img) {
                        img.setAttribute("data-original-src", qrUrl);
                        if (window.__imgCache && window.__imgCache[qrUrl]) {
                            img.src = window.__imgCache[qrUrl];
                        } else {
                            img.src = qrUrl;
                            if (typeof getCachedImageUrl === "function") {
                                getCachedImageUrl(qrUrl).then(function(cachedUrl) {
                                    if (cachedUrl && cachedUrl !== qrUrl && img) {
                                        img.src = cachedUrl;
                                    }
                                });
                            }
                        }
                    }
                }
            } catch(e) {
                console.warn("Could not cache payment QR:", e);
            }
        }

        var _portalInitialized = false;
        function finishPortalInitialization() {
            if (_portalInitialized) return;
            _portalInitialized = true;

            try {
                setupAntiPiracyBlockers();
            } catch(e) {
                console.error("error setting up blockers:", e);
            }
            try {
                launchSlidersCarousel();
            } catch(e) {
                console.error("error loading carousel:", e);
            }
            try {
                renderNoticesScrollingBoard();
            } catch(e) {
                console.error("error rendering notices:", e);
            }

            // Load saved user session
            try {
                const cachedUser = localStorage.getItem("_secured_active_aspirant");
                if (cachedUser) {
                    try {
                        _studentLoggedInUser = JSON.parse(cachedUser);
                    } catch(e) {
                        _studentLoggedInUser = null;
                    }
                }
            } catch(e) {
                console.error("error loading cached session:", e);
            }

            // Periodically check live concurrent session statuses
            try {
                if (_studentLoggedInUser) {
                    checkConcurrentUserSession();
                }
                setInterval(function() {
                    if (_studentLoggedInUser) {
                        checkConcurrentUserSession();
                    }
                }, 15000);
            } catch(e) {
                console.error("error starting concurrent session checks", e);
            }

            try {
                refreshStudentAccountProfileGate();
            } catch(e) {
                console.error("error refreshing profile gate:", e);
            }
            try {
                renderSavedQuestionsBox();
            } catch(e) {
                console.error("error rendering saved questions:", e);
            }
            try {
                checkActiveWebsitePopups();
            } catch(e) {
                console.error("error launching popup active:", e);
            }

            // Restore Dark mode preference on init
            try {
                const isDark = localStorage.getItem("_preemptive_theme_mode") === "dark";
                if (isDark) {
                    document.body.classList.add("dark-mode");
                    const sun = document.getElementById("themeSunIcon");
                    const moon = document.getElementById("themeMoonIcon");
                    if (sun) sun.style.display = "block";
                    if (moon) moon.style.display = "none";
                }
            } catch(e) {}

            // Try deep linking / SPA routing parsing without pushing new history entry
            let deepLinkClicked = false;
            _isHandlingPopState = true;
            try {
                deepLinkClicked = handleDeepLinking();
            } catch (e) {
                console.error("Deep link trigger error:", e);
            } finally {
                _isHandlingPopState = false;
            }

            if (!deepLinkClicked) {
                // Always start on the Home tab on startup if no deep links match
                _isHandlingPopState = true;
                try {
                    handleTabNavigation("home");
                } catch(e) {
                    handleTabNavigation("home");
                } finally {
                    _isHandlingPopState = false;
                }
            }
        }

        function cleanExpiredCoupons(cats) {
            var now = Date.now();
            if (!cats || !Array.isArray(cats)) return cats || [];
            return cats.map(function(cat) {
                var c = JSON.parse(JSON.stringify(cat)); // shallow clone to be safe
                if (c.coupon && c.coupon.endDate && new Date(c.coupon.endDate).getTime() < now) {
                    c.coupon = null;
                }
                if (c.test && c.test.coupon && c.test.coupon.endDate && new Date(c.test.coupon.endDate).getTime() < now) {
                    c.test.coupon = null;
                }
                if (c.subCategories && Array.isArray(c.subCategories)) {
                    c.subCategories = c.subCategories.map(function(sub) {
                        if (sub.coupon && sub.coupon.endDate && new Date(sub.coupon.endDate).getTime() < now) {
                            sub.coupon = null;
                        }
                        if (sub.test && sub.test.coupon && sub.test.coupon.endDate && new Date(sub.test.coupon.endDate).getTime() < now) {
                            sub.test.coupon = null;
                        }
                        if (sub.topics && Array.isArray(sub.topics)) {
                            sub.topics = sub.topics.map(function(top) {
                                if (top.coupon && top.coupon.endDate && new Date(top.coupon.endDate).getTime() < now) {
                                    top.coupon = null;
                                }
                                if (top.test && top.test.coupon && top.test.coupon.endDate && new Date(top.test.coupon.endDate).getTime() < now) {
                                    top.test.coupon = null;
                                }
                                return top;
                            });
                        }
                        return sub;
                    });
                }
                return c;
            });
        }

        function setAndCleanDb(dbParsed) {
            if (dbParsed) {
                dbParsed.testCategories = cleanExpiredCoupons(dbParsed.testCategories);
                dbParsed.pdfCategories = cleanExpiredCoupons(dbParsed.pdfCategories);
            }
            DB = dbParsed || {};
        }

        async function fetchStudentsDb() {
            var url = window.__studentAppStudentsUrl || "https://pub-dc360536e4fb46baa3e3e8719d01793e.r2.dev/students_db.txt";
            try {
                var res = await fetch(url);
                if (res.ok) {
                    var text = await res.text();
                    var decoded = JSON.parse(decodeObfuscatedPayload(text.trim()));
                    if (Array.isArray(decoded)) {
                        DB.students = decoded;
                        console.log("Loaded separate students database from Cloudflare R2: " + DB.students.length + " students active.");
                        try { refreshStudentAccountProfileGate(); } catch(e){}
                    }
                }
            } catch(err) {
                console.warn("Could not load fresh students database from: " + url, err);
            }
        }

        // Load Persistent Sessions on Start
        async function startStudentPortal() {
            try { initImageCache(); } catch(e){}
            
            // Concurrently fetch students database from Cloudflare R2 bucket!
            try { fetchStudentsDb(); } catch(e){}

            var loadedSuccessfully = true;
            var loadedFromCache = false;
            var cachedData = null;

            if (window.__studentAppChunkCount && window.__studentAppChunkCount > 0) {
                // Try to load from IndexedDB cache immediately to achieve instant startup
                try {
                    cachedData = await getCachedPayload();
                    if (cachedData && cachedData.payload && cachedData.payload.trim() !== "") {
                        var currentBuildId = window.__studentAppBuildId || "";
                        var cachedBuildId = cachedData.buildId || "";
                        
                        setAndCleanDb(JSON.parse(decodeObfuscatedPayload(cachedData.payload)));
                        loadedFromCache = true;
                        console.log("Database loaded features instantly from local cache!");
                        try { ensurePaymentQrCached(); } catch(e){}
                        
                        // IF BUILD ID MATCHES, we do NOT fetch anything from R2 at all. Fatak se load ho gaya completely!
                        if (currentBuildId && cachedBuildId && currentBuildId === cachedBuildId) {
                            console.log("Cache matches current build (" + currentBuildId + "). Skipping Cloudflare R2 fetch completely!");
                            finishPortalInitialization();
                            return;
                        } else {
                            console.log("Cache build ID mismatch ('" + cachedBuildId + "' !== '" + currentBuildId + "'). Background downloading update from R2...");
                            // Launch hot startup right away so there is zero bottleneck for the student!
                            try {
                                finishPortalInitialization();
                            } catch(err_init) {
                                console.error("Error doing hot start:", err_init);
                            }
                        }
                    }
                } catch (cacheErr) {
                    console.warn("Could not load from local database cache, fetching fresh...", cacheErr);
                }

                // If NOT loaded from cache, we must show the loader overlay immediately
                var loaderOverlay = null;
                if (!loadedFromCache) {
                    loaderOverlay = document.createElement("div");
                    loaderOverlay.id = "db-loader-overlay";
                    loaderOverlay.style = "position:fixed; top:0; left:0; width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; z-index:99999; font-family:\'Outfit\', sans-serif; transition: background 0.3s ease;";
                    loaderOverlay.innerHTML = '<style>' +
                        '@keyframes db-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }' +
                        '#db-loader-overlay { background: #FFFFFF; }' +
                        '#db-loading-spinner { width:45px; height:45px; border:4.5px solid rgba(0,0,0,0.06); border-top:4.5px solid #FF6B35; border-radius:50%; animation: db-spin 1.1s cubic-bezier(0.4, 0, 0.2, 1) infinite; }' +
                        '@media (prefers-color-scheme: dark) {' +
                        '  #db-loader-overlay { background: #000000; }' +
                        '  #db-loading-spinner { border: 4.5px solid rgba(255,107,53,0.15); border-top: 4.5px solid #FF6B35; }' +
                        '}' +
                        '</style>' +
                        '<div id="db-loading-spinner"></div>' +
                        '<div id="db-loader-error" style="display:none; margin-top:20px; color:#EF4444; font-size:12px; text-align:left; max-width:80%; line-height:1.6; padding:20px; background:#1F2937; border-radius:10px; border:1px solid #374151; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);"></div>';
                    document.body.appendChild(loaderOverlay);
                }

                // Prepare parallel fetch parameters
                var loadedChunks = new Array(window.__studentAppChunkCount);
                var fetchedCount = 0;
                var promises = [];

                for (var i = 0; i < window.__studentAppChunkCount; i++) {
                    (function(index) {
                        var filename = "config_part_" + (index + 1) + ".txt";
                        var r2Url = "https://pub-dc360536e4fb46baa3e3e8719d01793e.r2.dev/" + filename;
                        var fetchPromise = fetch(r2Url)
                            .then(function(res) {
                                if (!res.ok) {
                                    throw new Error("HTTP " + res.status + " retrieving " + filename + " from R2");
                                }
                                return res.text();
                            })
                            .then(function(text) {
                                loadedChunks[index] = text.trim();
                                fetchedCount++;
                            })
                            .catch(function(e) {
                                if (!loadedFromCache) {
                                    throw e;
                                } else {
                                    console.warn("Background fetch failed for segment " + filename, e);
                                }
                            });
                        promises.push(fetchPromise);
                    })(i);
                }

                try {
                    // Load ALL segments concurrently! This uses maximum internet speed to download chunks in parallel.
                    await Promise.all(promises);

                    var base64ConfigJoined = loadedChunks.join("");
                    
                    // Save compiled config in storage with current build ID
                    var currentBuildId = window.__studentAppBuildId || "";
                    savePayloadToCache(base64ConfigJoined, currentBuildId);
                    console.log("Database cache successfully saved / refreshed.");
                    
                    // Parse & display
                    if (loadedFromCache) {
                        try {
                            setAndCleanDb(JSON.parse(decodeObfuscatedPayload(base64ConfigJoined)));
                            console.log("Seamlesly synchronized memory database with freshly downloaded copy.");
                            try { ensurePaymentQrCached(); } catch(e){}
                            
                            // Silent live updates of view tabs when user is not taking an exam
                            var inActiveAttempt = (typeof _activeAttemptState !== 'undefined' && _activeAttemptState) || 
                                                    (document.getElementById("activeQuizTimer") && document.getElementById("activeQuizTimer").style.display !== "none");
                            if (!inActiveAttempt) {
                                try { launchSlidersCarousel(); } catch(e){}
                                try { renderNoticesScrollingBoard(); } catch(e){}
                                try { refreshStudentAccountProfileGate(); } catch(e){}
                            }
                        } catch (e) {
                            console.error("Could not parse freshly compiled background copy:", e);
                        }
                    } else {
                        try {
                            setAndCleanDb(JSON.parse(decodeObfuscatedPayload(base64ConfigJoined)));
                            try { ensurePaymentQrCached(); } catch(e){}
                            if (loaderOverlay && loaderOverlay.parentNode) {
                                loaderOverlay.parentNode.removeChild(loaderOverlay);
                            }
                            finishPortalInitialization();
                        } catch (parseErr) {
                            throw parseErr;
                        }
                    }
                } catch (e) {
                    console.error("Split chunk parallel load failed:", e);
                    loadedSuccessfully = false;

                    if (!loadedFromCache) {
                        var spinnerEl = document.getElementById("db-loading-spinner");
                        if (spinnerEl) spinnerEl.style.display = "none";
                        
                        var errorEl = document.getElementById("db-loader-error");
                        if (errorEl) {
                            errorEl.innerHTML = '<strong style="font-size: 14px; color: #F87171; display:block; margin-bottom:8px;">&#9888;&#65039; Database Load Failed</strong>' +
                                'Error reassembling database chunk elements: <code style="color: #FF8F8F; font-weight: bold; background: #2D3748; padding: 2px 6px; border-radius: 4px;">' + (e.message || "Network Error") + '</code><br/><br/>' +
                                'Ensure that your database segment files (<code>config_part_*.txt</code>) have been successfully uploaded to your Cloudflare R2 bucket: <code style="color: #FF8F8F;">https://pub-dc360536e4fb46baa3e3e8719d01793e.r2.dev/</code> and that public read access with CORS is correctly set up.';
                            errorEl.style.display = "block";
                        }
                        return; // halt boot sequence
                    }
                }
            } else {
                // Inline single file fallback
                try {
                    const embeddedB64 = "${base64Config}";
                    if (embeddedB64 && embeddedB64 !== "") {
                        setAndCleanDb(JSON.parse(decodeObfuscatedPayload(embeddedB64)));
                    }
                } catch (e) {
                    console.error("Single file DB decode exception:", e);
                }
                finishPortalInitialization();
            }
        }

        function handleDeepLinking() {
            try {
                // Decode query-based redirect (404.html trick)
                var l = window.location;
                if (l.search[1] === '/' ) {
                    var decoded = l.search.slice(1).split('&').map(function(s) { 
                        return s.replace(/~and~/g, '&'); 
                    }).join('?');
                    window.history.replaceState(null, null, l.pathname.slice(0, -1) + decoded + l.hash);
                }

                // Extract path from pathname or hash
                var path = l.pathname;
                if (l.hash && l.hash.indexOf('#/') === 0) {
                    path = l.hash.slice(1);
                } else if (l.hash && l.hash.indexOf('#') === 0 && l.hash.indexOf('#!') !== 0) {
                    path = l.hash.slice(1);
                }

                var segments = path.split('/').filter(function(s) {
                    return s && s !== 'index.html' && s !== 'student' && s !== 'student.html';
                });

                if (segments.length === 0) return false;

                var firstSegment = segments[0] ? segments[0].toLowerCase() : null;

                // 1. Core tabs check
                if (firstSegment === 'home') {
                    handleTabNavigation('home');
                    return true;
                }
                if (firstSegment === 'test' || firstSegment === 'tests') {
                    if (segments.length === 1) {
                        handleTabNavigation('tests');
                        return true;
                    }
                    segments.shift(); // remove "test" prefix and resolve nested categories
                } else if (firstSegment === 'pdf' || firstSegment === 'pdfs') {
                    if (segments.length === 1) {
                        handleTabNavigation('pdfs');
                        return true;
                    }
                    segments.shift(); // remove "pdf" prefix and resolve nested categories
                } else if (firstSegment === 'account' || firstSegment === 'acc' || firstSegment === 'my-account') {
                    handleTabNavigation('acc');
                    return true;
                }

                var catSlug = segments[0] ? segments[0].toLowerCase() : null;
                var subSlug = segments[1] ? segments[1].toLowerCase() : null;
                var topicSlug = segments[2] ? segments[2].toLowerCase() : null;

                if (!catSlug) return false;

                // Search in testCategories and pdfCategories
                var foundCat = null;
                var foundType = 'test';
                
                var allCats = ((DB.testCategories || []).map(function(c) { return {cat: c, type: 'test'}; }))
                    .concat((DB.pdfCategories || []).map(function(c) { return {cat: c, type: 'pdf'}; }));

                for (var i = 0; i < allCats.length; i++) {
                    var cNode = allCats[i];
                    if (toSlug(cNode.cat.name) === catSlug) {
                        foundCat = cNode.cat;
                        foundType = cNode.type;
                        break;
                    }
                }

                if (!foundCat) return false;

                // If only category matches
                if (!subSlug) {
                    handleTabNavigation(foundType === 'test' ? 'tests' : 'pdfs');
                    handleSelectCategoryNode(foundCat, foundType);
                    return true;
                }

                // Find matching subcategory
                var foundSub = null;
                var subCategoriesList = foundCat.subCategories || [];
                for (var j = 0; j < subCategoriesList.length; j++) {
                    var sNode = subCategoriesList[j];
                    if (toSlug(sNode.name) === subSlug) {
                        foundSub = sNode;
                        break;
                    }
                }

                if (!foundSub) {
                    handleTabNavigation(foundType === 'test' ? 'tests' : 'pdfs');
                    handleSelectCategoryNode(foundCat, foundType);
                    return true;
                }

                if (!topicSlug) {
                    handleTabNavigation(foundType === 'test' ? 'tests' : 'pdfs');
                    handleSelectCategoryNode(foundCat, foundType);
                    handleSelectSubcategoryNode(foundSub, foundType);
                    return true;
                }

                // Find match topic
                var foundTopic = null;
                var topicsList = foundSub.topics || [];
                for (var k = 0; k < topicsList.length; k++) {
                    var tNode = topicsList[k];
                    if (toSlug(tNode.name) === topicSlug) {
                        foundTopic = tNode;
                        break;
                    }
                }

                if (!foundTopic) {
                    handleTabNavigation(foundType === 'test' ? 'tests' : 'pdfs');
                    handleSelectCategoryNode(foundCat, foundType);
                    handleSelectSubcategoryNode(foundSub, foundType);
                    return true;
                }

                // Topic matched
                handleTabNavigation(foundType === 'test' ? 'tests' : 'pdfs');
                handleSelectCategoryNode(foundCat, foundType);
                handleSelectSubcategoryNode(foundSub, foundType);
                handleSelectTopicNode(foundTopic, foundType);
                return true;

            } catch (err) {
                console.error("Deep linking route parse error:", err);
            }
            return false;
        }

        // Run instantly as soon as parsed (since the script is at the bottom of the body, DOM is already ready)
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", startStudentPortal);
        } else {
            startStudentPortal();
        }

        function handleToggleThemeMode() {
            const isDark = document.body.classList.toggle("dark-mode");
            localStorage.setItem("_preemptive_theme_mode", isDark ? "dark" : "light");
            const sun = document.getElementById("themeSunIcon");
            const moon = document.getElementById("themeMoonIcon");
            if (isDark) {
                if (sun) sun.style.display = "block";
                if (moon) moon.style.display = "none";
            } else {
                if (sun) sun.style.display = "none";
                if (moon) moon.style.display = "block";
            }
        }
    </script>
</body>
</html>`;
}
