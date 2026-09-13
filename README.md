# 📖 Minimalist OBS Bible Verse Dock & Overlay Pro

A modern, fast, and feature-rich open-source OBS Studio plugin for presenting Bible verses live on stream. Built using **pure HTML, CSS, and Vanilla JavaScript** with zero heavy dependencies or complex setup required. 

Features auto-scaling text, dynamic book/chapter/verse dropdowns, instant quick-lookup chips, custom lower-third typography, background image support, and full offline caching.

![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)
![OBS Studio](https://img.shields.io/badge/OBS%20Studio-Compatible-blue.svg)

---

## ✨ Features

- **⚡ Quick Lookup Chips**: Single-click access to the 10 most preached books (*John, Romans, Psalms, Matthew, Genesis, Proverbs, Isaiah, Hebrews, Acts, Revelation*).
- **🔍 Smart Search & Dynamic Dropdowns**: Auto-suggest book search with cascading Book ➔ Chapter ➔ Verse dropdown selectors.
- **🔄 Stepper Navigation**: Seamless **Next Verse** and **Prev Verse** controls to step through chapters continuously during sermons.
- **📐 Auto-Scaling Font Engine**: Intelligent font size adjustment guarantees long scriptures fit cleanly while keeping short verses prominent.
- **🌐 50+ Bible Translations**: Full support for KJV, NKJV, NIV, ESV, NLT, NASB, AMP, MSG, CSB, WEB, ASV, BBE, and more.
- **🎨 Deep Visual Customization**:
  - **9 Typography Options**: Open Sans, Atkinson Hyperlegible (Low Vision accessibility), EB Garamond, Cinzel, Playfair Display, Lora, Cormorant Garamond, Crimson Text, and Inter.
  - **Flexible Screen Positioning**: Top, Center, or Bottom (Lower-Third).
  - **Dynamic Opacity Slider**: Full background opacity control from 0% (transparent) to 100% (solid).
  - **Custom Background Image**: Upload any custom picture or graphic behind the verse container.
  - **Smooth Animations**: Fade, Slide Up, or Instant display transitions.
- **💾 Auto-Save & Offline Mode**: Settings and fetched verses are stored locally in browser memory (`localStorage`). Verses display instantly without requiring internet once cached.

---

## 📂 Project Structure

```text
obs-bible-dock/
├── dock.html        # Custom Dock UI & Settings Controller for OBS
├── overlay.html     # Stream Browser Source overlay UI
├── css/
│   ├── dock.css     # Dock control panel styles
│   └── overlay.css  # Stream overlay typography & layout styles
└── js/
    ├── dock.js      # App state, lookup engine, and setting controls
    └── overlay.js   # Real-time event receiver & auto-scaling engine

```

---

## 🚀 Setup & Installation Guide

No downloads or local file installations are required. Copy the URLs below directly into OBS Studio.

### 1. Add the Overlay Source

1. Open **OBS Studio**.
2. Under **Sources**, click **+** and select **Browser**.
3. Name it `Bible Overlay`.
4. Uncheck **Local File**.
5. Set **URL** to:

```text
https://kapansa.github.io/obs-bible-dock/overlay.html
```

6. Set **Width**: `1920` and **Height**: `1080` (or match your canvas resolution).
7. Click **OK**.

### 2. Add the Control Dock Panel

1. In OBS Studio, go to the top bar menu: **Docks** > **Custom Browser Docks...**
2. Set **Dock Name**: `Bible Controller`.
3. Set **URL** to:

```text
https://kapansa.github.io/obs-bible-dock/dock.html
```

4. Click **Apply**.
5. Drag and position the newly created dock panel anywhere within your OBS workspace.

---

## 📖 Usage Guide

1. **Quick Select**: Click any of the Quick Book chips at the top of the dock panel.
2. **Manual Lookup**: Type any scripture reference into the search field (e.g. `Romans 8:28` or `John 3:16`) and hit **Enter** or click **Fetch**.
3. **Dropdown Navigation**: Select a book from the dropdown list to automatically populate the chapter and verse numbers.
4. **Projecting Live**: Click **Project to Stream** to reveal the scripture graphic on stream.
5. **Stepping Verses**: Click **Next Verse →** or **← Prev Verse** to sequentially step through consecutive verses.
6. **Clearing Screen**: Click **Clear Screen** to hide the overlay graphic.
7. **Customizing Display**: Open the **⚙️ Overlay Customization & Settings** panel inside the dock to tweak fonts, position, animations, and opacity in real-time.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for details.