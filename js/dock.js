// Bolls.life Map & Data Structures
const API_BASE = "https://bolls.life";
const TRANSLATION_MAP = {
  kjv: "KJV",
  asv: "ASV",
  web: "WEB",
  ylt: "YLT",
  dra: "DRB",
  nkjv: "NKJV",
  niv: "NIV",
  niv2011: "NIV2011",
  esv: "ESV",
  nlt: "NLT",
  nasb: "NASB",
  rsv: "RSV",
  amp: "AMP",
  msg: "MSG",
  csb17: "CSB17",
  net: "NET",
  gnv: "GNV",
  lsv: "LSV",
  bsb: "BSB",
  mev: "MEV",
  cev: "CEVD",
  isv: "ISV",
  erv: "ERV",
  nlv: "NLV",
  gnt: "GNT",
  almeida: "ALM21",
  synodal: "SYNOD",
  cuv: "CUV",
};

const BIBLE_BOOKS = [
  ["Genesis", "Gen", 50],
  ["Exodus", "Exo", 40],
  ["Leviticus", "Lev", 27],
  ["Numbers", "Num", 36],
  ["Deuteronomy", "Deu", 34],
  ["Joshua", "Jos", 24],
  ["Judges", "Jdg", 21],
  ["Ruth", "Rut", 4],
  ["1 Samuel", "1Sa", 31],
  ["2 Samuel", "2Sa", 24],
  ["1 Kings", "1Ki", 22],
  ["2 Kings", "2Ki", 25],
  ["1 Chronicles", "1Ch", 29],
  ["2 Chronicles", "2Ch", 36],
  ["Ezra", "Ezr", 10],
  ["Nehemiah", "Neh", 13],
  ["Esther", "Est", 10],
  ["Job", "Job", 42],
  ["Psalms", "Psa", 150],
  ["Proverbs", "Pro", 31],
  ["Ecclesiastes", "Ecc", 12],
  ["Song of Solomon", "Son", 8],
  ["Isaiah", "Isa", 66],
  ["Jeremiah", "Jer", 52],
  ["Lamentations", "Lam", 5],
  ["Ezekiel", "Eze", 48],
  ["Daniel", "Dan", 12],
  ["Hosea", "Hos", 14],
  ["Joel", "Joe", 3],
  ["Amos", "Amo", 9],
  ["Obadiah", "Oba", 1],
  ["Jonah", "Jon", 4],
  ["Micah", "Mic", 7],
  ["Nahum", "Nah", 3],
  ["Habakkuk", "Hab", 3],
  ["Zephaniah", "Zep", 3],
  ["Haggai", "Hag", 2],
  ["Zechariah", "Zec", 14],
  ["Malachi", "Mal", 4],
  ["Matthew", "Mat", 28],
  ["Mark", "Mar", 16],
  ["Luke", "Luk", 24],
  ["John", "Joh", 21],
  ["Acts", "Act", 28],
  ["Romans", "Rom", 16],
  ["1 Corinthians", "1Co", 16],
  ["2 Corinthians", "2Co", 13],
  ["Galatians", "Gal", 6],
  ["Ephesians", "Eph", 6],
  ["Philippians", "Phi", 4],
  ["Colossians", "Col", 4],
  ["1 Thessalonians", "1Th", 5],
  ["2 Thessalonians", "2Th", 3],
  ["1 Timothy", "1Ti", 6],
  ["2 Timothy", "2Ti", 4],
  ["Titus", "Tit", 3],
  ["Philemon", "Phm", 1],
  ["Hebrews", "Heb", 13],
  ["James", "Jam", 5],
  ["1 Peter", "1Pe", 5],
  ["2 Peter", "2Pe", 3],
  ["1 John", "1Jo", 5],
  ["2 John", "2Jo", 1],
  ["3 John", "3Jo", 1],
  ["Jude", "Jud", 1],
  ["Revelation", "Rev", 22],
];

// DOM Elements
const searchForm = document.getElementById("search-form");
const verseInput = document.getElementById("verse-input");
const bookSelect = document.getElementById("book-select");
const chapterSelect = document.getElementById("chapter-select");
const verseSelect = document.getElementById("verse-select");
const versionSelect = document.getElementById("version-select");
const fetchBtn = document.getElementById("fetch-btn");
const suggestions = document.getElementById("suggestions");

const keywordInput = document.getElementById("keyword-input");
const keywordSearchBtn = document.getElementById("keyword-search-btn");
const keywordResults = document.getElementById("keyword-results");

const previewCard = document.getElementById("preview-card");
const previewReference = document.getElementById("preview-reference");
const previewTranslation = document.getElementById("preview-translation");
const previewText = document.getElementById("preview-text");
const showBtn = document.getElementById("show-btn");
const hideBtn = document.getElementById("hide-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const statusMessage = document.getElementById("status-message");

const fontFamilySelect = document.getElementById("font-family");
const fontSizeSelect = document.getElementById("font-size");
const positionSelect = document.getElementById("position-select");
const animationSelect = document.getElementById("animation-select");
const opacitySlider = document.getElementById("opacity-slider");
const opacityVal = document.getElementById("opacity-val");

const cardWidthSlider = document.getElementById("card-width");
const valWidth = document.getElementById("val-width");
const marginBottomSlider = document.getElementById("margin-bottom");
const valBottom = document.getElementById("val-bottom");

const autoProjectCheckbox = document.getElementById("auto-project-checkbox");
const bgUpload = document.getElementById("bg-upload");
const clearBgBtn = document.getElementById("clear-bg-btn");

let currentVerseData = null;
let currentBook = "",
  currentChapter = 1,
  currentVerseNum = 1;

BIBLE_BOOKS.forEach(([fullName]) => {
  const opt = document.createElement("option");
  opt.value = fullName;
  opt.textContent = fullName;
  bookSelect.appendChild(opt);
});

verseInput.addEventListener("input", () => {
  const val = verseInput.value.toLowerCase().trim();
  suggestions.innerHTML = "";
  if (!val) {
    suggestions.classList.add("hidden");
    return;
  }

  const matches = BIBLE_BOOKS.filter(
    ([name, abbr]) =>
      name.toLowerCase().startsWith(val) || abbr.toLowerCase().startsWith(val),
  );

  if (matches.length > 0) {
    matches.forEach(([name]) => {
      const li = document.createElement("li");
      li.textContent = name;
      li.onclick = () => {
        verseInput.value = name + " ";
        suggestions.classList.add("hidden");
        verseInput.focus();
      };
      suggestions.appendChild(li);
    });
    suggestions.classList.remove("hidden");
  } else {
    suggestions.classList.add("hidden");
  }
});

document.querySelectorAll(".chip").forEach((chip) => {
  chip.addEventListener("click", (e) => {
    e.preventDefault();
    const book = chip.getAttribute("data-book");
    bookSelect.value = book;
    populateChapters(book);
    verseInput.value = `${book} 1:1`;
    handleFetch();
  });
});

bookSelect.addEventListener("change", () => {
  populateChapters(bookSelect.value);
});

chapterSelect.addEventListener("change", async () => {
  const bookName = bookSelect.value;
  const chapterNum = chapterSelect.value;
  if (!bookName || !chapterNum) return;

  const bookIndex = BIBLE_BOOKS.findIndex(([name]) => name === bookName);
  if (bookIndex === -1) return;
  const bookId = bookIndex + 1;
  const translationCode =
    TRANSLATION_MAP[versionSelect.value.toLowerCase()] || "KJV";

  statusMessage.textContent = "Loading chapter verses...";
  try {
    const res = await fetch(
      `${API_BASE}/get-chapter/${translationCode}/${bookId}/${chapterNum}/`,
    );
    if (res.ok) {
      const versesData = await res.json();
      if (Array.isArray(versesData) && versesData.length > 0) {
        populateVerses(versesData.length);
        statusMessage.textContent = "Ready";
        return;
      }
    }
  } catch (_) {}

  populateVerses(60);
  statusMessage.textContent = "Ready";
});

verseSelect.addEventListener("change", () => {
  if (bookSelect.value && chapterSelect.value && verseSelect.value) {
    const query = `${bookSelect.value} ${chapterSelect.value}:${verseSelect.value}`;
    verseInput.value = query;
    handleFetch();
  }
});

function populateChapters(bookName) {
  chapterSelect.innerHTML = '<option value="">Ch</option>';
  verseSelect.innerHTML = '<option value="">Vs</option>';
  verseSelect.disabled = true;

  const bookData = BIBLE_BOOKS.find(([name]) => name === bookName);
  if (!bookData) {
    chapterSelect.disabled = true;
    return;
  }

  chapterSelect.disabled = false;
  const maxChapters = bookData[2];
  for (let i = 1; i <= maxChapters; i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = i;
    chapterSelect.appendChild(opt);
  }
}

function populateVerses(count) {
  verseSelect.innerHTML = '<option value="">Vs</option>';
  verseSelect.disabled = false;
  for (let i = 1; i <= Math.max(count, 176); i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = i;
    verseSelect.appendChild(opt);
  }
}

function buildDisplayText(raw) {
  if (!raw) return "";
  return raw
    .replace(/<sup[^>]*>[\s\S]*?<\/sup>/gi, "")
    .replace(/<S>\d+<\/S>/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\n\d+\s*/g, " ")
    .replace(/\s+([.,;:!?])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function parseReference(str) {
  const m = str.trim().match(/^(.+?)\s+(\d+):(\d+)(?:-(\d+))?$/);
  if (!m) return null;
  return {
    book: m[1].trim(),
    chapter: parseInt(m[2], 10),
    verse: parseInt(m[3], 10),
    endVerse: m[4] ? parseInt(m[4], 10) : null,
  };
}

function handleFetch(isNavigation = false) {
  const query = verseInput.value.trim();
  if (query) {
    fetchVerse(query, versionSelect.value, isNavigation);
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
  handleFetch(false);
  return false;
});

fetchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  handleFetch(false);
});

keywordSearchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  performKeywordSearch();
});

keywordInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    performKeywordSearch();
  }
});

async function performKeywordSearch() {
  const query = keywordInput.value.trim();
  if (!query) return;

  statusMessage.textContent = `Searching for "${query}"...`;
  keywordResults.innerHTML = "";
  keywordResults.classList.add("hidden");

  const translationKey = versionSelect.value;
  const translationCode =
    TRANSLATION_MAP[translationKey.toLowerCase()] || "KJV";

  try {
    const url = `${API_BASE}/search/${translationCode}/${encodeURIComponent(query)}/`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Search failed");

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      statusMessage.textContent = `No results found for "${query}".`;
      return;
    }

    statusMessage.textContent = `Found ${data.length} results.`;
    keywordResults.classList.remove("hidden");

    data.slice(0, 30).forEach((item) => {
      const bookObj = BIBLE_BOOKS[item.book - 1];
      const bookName = bookObj ? bookObj[0] : "Unknown";
      const refStr = `${bookName} ${item.chapter}:${item.verse}`;
      const cleanSnippet = buildDisplayText(item.text);

      const li = document.createElement("li");
      li.style.padding = "8px";
      li.style.borderBottom = "1px solid var(--border-color)";
      li.style.cursor = "pointer";
      li.innerHTML = `<strong>${refStr}</strong>: ${cleanSnippet.substring(0, 70)}...`;

      li.onclick = () => {
        verseInput.value = refStr;
        keywordResults.classList.add("hidden");
        keywordInput.value = "";
        fetchVerse(refStr, translationKey, false);
      };

      keywordResults.appendChild(li);
    });
  } catch (err) {
    statusMessage.textContent = "Error executing keyword search.";
  }
}

async function fetchVerse(reference, translationKey, isNavigation = false) {
  statusMessage.textContent = `Fetching ${reference}...`;
  const cacheKey = `verse_cache_${reference}_${translationKey}`.toLowerCase();

  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    const parsedCache = JSON.parse(cached);
    renderVerse(parsedCache);
    statusMessage.textContent = "Loaded from offline cache.";
    if (isNavigation && autoProjectCheckbox.checked) {
      dispatch({ action: "SHOW", data: parsedCache });
      statusMessage.textContent = "Navigated & projected live!";
    }
    return;
  }

  const parsed = parseReference(reference);
  if (!parsed) {
    statusMessage.textContent =
      'Invalid format. Try "John 3:16" or "John 3:16-18".';
    previewCard.classList.add("hidden");
    return;
  }

  const { book, chapter, verse, endVerse } = parsed;

  const bookIndex = BIBLE_BOOKS.findIndex(
    ([name, abbr]) =>
      name.toLowerCase() === book.toLowerCase() ||
      abbr.toLowerCase() === book.toLowerCase(),
  );

  if (bookIndex === -1) {
    statusMessage.textContent = `Book "${book}" not found.`;
    previewCard.classList.add("hidden");
    return;
  }

  const bookId = bookIndex + 1;
  const translationCode =
    TRANSLATION_MAP[translationKey.toLowerCase()] || "KJV";

  try {
    // First fetch the full chapter list to validate maximum verse bounds and avoid 404 errors
    const chapterRes = await fetch(
      `${API_BASE}/get-chapter/${translationCode}/${bookId}/${chapter}/`,
    );
    if (!chapterRes.ok) throw new Error("Chapter not found");
    const chapterVerses = await chapterRes.json();

    if (!Array.isArray(chapterVerses) || verse > chapterVerses.length) {
      statusMessage.textContent = `Error: ${book} ${chapter} only has ${chapterVerses.length} verses.`;
      previewCard.classList.add("hidden");
      return;
    }

    let verses = [];
    const targetEnd = endVerse
      ? Math.min(endVerse, chapterVerses.length)
      : verse;

    for (let v = verse; v <= targetEnd; v++) {
      const match = chapterVerses.find((item) => item.verse === v);
      if (match) {
        verses.push(match);
      } else {
        const url = `${API_BASE}/get-verse/${translationCode}/${bookId}/${chapter}/${v}/`;
        const res = await fetch(url);
        if (res.ok) verses.push(await res.json());
      }
    }

    if (verses.length === 0) throw new Error("Verse not found");

    const combinedText = verses.map((v) => buildDisplayText(v.text)).join(" ");
    const bookName = BIBLE_BOOKS[bookIndex][0];
    const verseRef =
      endVerse && endVerse > verse
        ? `${chapter}:${verse}-${targetEnd}`
        : `${chapter}:${verse}`;
    const displayRef = `${bookName} ${verseRef}`;

    const formatted = {
      reference: displayRef,
      text: combinedText,
      translation: translationCode,
    };

    localStorage.setItem(cacheKey, JSON.stringify(formatted));
    renderVerse(formatted);
    statusMessage.textContent = "Verse ready.";

    if (isNavigation && autoProjectCheckbox.checked) {
      dispatch({ action: "SHOW", data: formatted });
      statusMessage.textContent = "Navigated & projected live!";
    }
  } catch (err) {
    statusMessage.textContent = `Error: Could not find "${reference}" in ${translationCode}.`;
    previewCard.classList.add("hidden");
  }
}

function renderVerse(data) {
  currentVerseData = data;
  previewReference.textContent = data.reference;
  previewTranslation.textContent = `(${data.translation})`;
  previewText.textContent = `"${data.text}"`;
  previewCard.classList.remove("hidden");

  parseStepper(data.reference);
}

function parseStepper(ref) {
  const match = ref.match(/(.+)\s+(\d+):(\d+)/);
  if (match) {
    currentBook = match[1];
    currentChapter = parseInt(match[2]);
    currentVerseNum = parseInt(match[3]);
  }
}

nextBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!currentBook) return;
  currentVerseNum++;
  const query = `${currentBook} ${currentChapter}:${currentVerseNum}`;
  verseInput.value = query;
  fetchVerse(query, versionSelect.value, true);
});

prevBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!currentBook || currentVerseNum <= 1) return;
  currentVerseNum--;
  const query = `${currentBook} ${currentChapter}:${currentVerseNum}`;
  verseInput.value = query;
  fetchVerse(query, versionSelect.value, true);
});

showBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!currentVerseData) return;
  dispatch({ action: "SHOW", data: currentVerseData });
  statusMessage.textContent = "Projected to stream!";
});

hideBtn.addEventListener("click", (e) => {
  e.preventDefault();
  dispatch({ action: "HIDE" });
  statusMessage.textContent = "Cleared from stream.";
});

function dispatch(payload) {
  payload.timestamp = Date.now();
  localStorage.setItem("obs_bible_event", JSON.stringify(payload));
}

function saveAndSyncSettings() {
  valWidth.textContent = cardWidthSlider.value;
  valBottom.textContent = marginBottomSlider.value;
  opacityVal.textContent = `${opacitySlider.value}%`;

  const settings = {
    fontFamily: fontFamilySelect.value,
    fontSize: fontSizeSelect.value,
    position: positionSelect.value,
    animation: animationSelect.value,
    opacity: opacitySlider.value,
    cardWidth: cardWidthSlider.value,
    marginBottom: marginBottomSlider.value,
    autoProject: autoProjectCheckbox.checked,
    bgImage: localStorage.getItem("obs_bible_bg_img") || "",
  };

  localStorage.setItem("obs_bible_settings", JSON.stringify(settings));
  dispatch({ action: "UPDATE_SETTINGS", settings });
}

[
  fontFamilySelect,
  fontSizeSelect,
  positionSelect,
  animationSelect,
  opacitySlider,
  cardWidthSlider,
  marginBottomSlider,
  autoProjectCheckbox,
].forEach((el) => {
  el.addEventListener("change", saveAndSyncSettings);
  el.addEventListener("input", saveAndSyncSettings);
});

window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("obs_bible_settings");
  if (saved) {
    try {
      const s = JSON.parse(saved);
      if (s.fontFamily) fontFamilySelect.value = s.fontFamily;
      if (s.fontSize) fontSizeSelect.value = s.fontSize;
      if (s.position) positionSelect.value = s.position;
      if (s.animation) animationSelect.value = s.animation;
      if (s.opacity !== undefined) {
        opacitySlider.value = s.opacity;
        opacityVal.textContent = `${s.opacity}%`;
      }
      if (s.cardWidth !== undefined) {
        cardWidthSlider.value = s.cardWidth;
        valWidth.textContent = s.cardWidth;
      }
      if (s.marginBottom !== undefined) {
        marginBottomSlider.value = s.marginBottom;
        valBottom.textContent = s.marginBottom;
      }
      if (s.autoProject !== undefined) {
        autoProjectCheckbox.checked = s.autoProject;
      }
    } catch (_) {}
  }
});

bgUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (evt) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const MAX_SIZE = 1280;

      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_SIZE) {
          height *= MAX_SIZE / width;
          width = MAX_SIZE;
        }
      } else {
        if (height > MAX_SIZE) {
          width *= MAX_SIZE / height;
          height = MAX_SIZE;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.85);

      try {
        localStorage.setItem("obs_bible_bg_img", compressedDataUrl);
        saveAndSyncSettings();
        statusMessage.textContent = "Background image updated!";
      } catch (err) {
        statusMessage.textContent = "Image file too large for browser storage.";
      }
    };
    img.src = evt.target.result;
  };
  reader.readAsDataURL(file);
});

clearBgBtn.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("obs_bible_bg_img");
  bgUpload.value = "";
  saveAndSyncSettings();
  statusMessage.textContent = "Background image removed.";
});
