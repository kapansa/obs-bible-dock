# Minimalist OBS Bible Verse Dock & Overlay

A lightweight, modern, and open-source custom Dock and Overlay system for displaying Bible verses live on OBS Studio. Built purely using **HTML, CSS, and Vanilla JavaScript** with zero dependencies or complex build steps.

![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)
![OBS Studio](https://img.shields.io/badge/OBS%20Studio-Compatible-blue.svg)

---

## ✨ Features

- **OBS Custom Dock Panel**: Control scripture display directly inside the OBS interface.
- **Minimalist Design**: Clean, modern lower-third display with custom glassmorphism styling.
- **Instant Search**: Fetch verses fast using standard scripture queries (e.g., `John 3:16`, `Psalm 23:1-4`).
- **Multiple Translations**: Supports KJV, WEB, BBE, and more via free public API.
- **Live Preview**: Inspect the scripture text inside the dock before projecting it live.
- **Real-Time Synchronization**: Uses browser `BroadcastChannel` API for instant communication between Dock and Overlay.

---

## 📂 Project Structure

```text
obs-bible-dock/
├── dock.html        # Custom Dock interface for OBS
├── overlay.html     # Stream Browser Source overlay
├── css/
│   ├── dock.css     # Dock styling
│   └── overlay.css  # Overlay design & animation
└── js/
    ├── dock.js      # Logic for fetching & projecting verses
    └── overlay.js   # Receiver logic for rendering verses

```

---

## 🚀 Setup & Installation Guide

### 1. Add the Overlay to OBS (Browser Source)

1. Open **OBS Studio**.
2. In your active Scene, click **+** under **Sources** and select **Browser**.
3. Name it `Bible Overlay`.
4. Check **Local File**.
5. Click **Browse** and select `overlay.html` from your local project folder.
6. Set **Width**: `1920` and **Height**: `1080` (or match your canvas resolution).
7. Click **OK**.

### 2. Add the Control Panel Dock to OBS

1. In OBS Studio, go to the top menu bar: **Docks** > **Custom Browser Docks...**
2. Under **Dock Name**, type: `Bible Controller`.
3. Under **URL**, enter the absolute file path to `dock.html`:
* **Windows**: `file:///C:/path/to/obs-bible-dock/dock.html`
* **macOS / Linux**: `file:///Users/username/path/to/obs-bible-dock/dock.html`


4. Click **Apply**.
5. Drag and place the new Dock anywhere inside your OBS UI dock layout!

---

## 📖 How to Use

1. Enter a scripture reference in the search input (e.g., `Genesis 1:1` or `Romans 8:28`).
2. Select your desired translation from the dropdown menu.
3. Click **Fetch** to preview the verse text inside the dock.
4. Click **Project to Stream** to display the text on your live stream.
5. Click **Clear Screen** to hide the overlay when finished.

---

## ⚙️ Customization

* **Styling**: Modify `css/overlay.css` to change accent colors, typography, or background opacity.
* **Positioning**: Adjust `align-items` or `padding` in `css/overlay.css` to re-position the overlay on screen.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for details.