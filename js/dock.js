// Bible Books Data Array with Bolls API IDs
const BIBLE_BOOKS = [
  { id: 1, name: "Genesis", aliases: ["gen", "ge", "gn"] },
  { id: 2, name: "Exodus", aliases: ["exod", "ex", "ex0"] },
  { id: 3, name: "Leviticus", aliases: ["lev", "le", "lv"] },
  { id: 4, name: "Numbers", aliases: ["num", "nu", "nm", "nb"] },
  { id: 5, name: "Deuteronomy", aliases: ["deut", "de", "dt"] },
  { id: 6, name: "Joshua", aliases: ["josh", "jos", "jsh"] },
  { id: 7, name: "Judges", aliases: ["judg", "jdg", "jg", "jdgs"] },
  { id: 8, name: "Ruth", aliases: ["rut", "rth"] },
  { id: 9, name: "1 Samuel", aliases: ["1sam", "1sa", "1s", "1 samuel"] },
  { id: 10, name: "2 Samuel", aliases: ["2sam", "2sa", "2s", "2 samuel"] },
  { id: 11, name: "1 Kings", aliases: ["1kgs", "1ki", "1k", "1 kings"] },
  { id: 12, name: "2 Kings", aliases: ["2kgs", "2ki", "2k", "2 kings"] },
  { id: 13, name: "1 Chronicles", aliases: ["1chr", "1ch", "1 chron"] },
  { id: 14, name: "2 Chronicles", aliases: ["2chr", "2ch", "2 chron"] },
  { id: 15, name: "Ezra", aliases: ["ezr", "ez"] },
  { id: 16, name: "Nehemiah", aliases: ["neh", "ne"] },
  { id: 17, name: "Esther", aliases: ["esth", "es"] },
  { id: 18, name: "Job", aliases: ["jb"] },
  { id: 19, name: "Psalms", aliases: ["psalm", "psa", "ps", "pss"] },
  { id: 20, name: "Proverbs", aliases: ["prov", "pro", "pr", "prv"] },
  { id: 21, name: "Ecclesiastes", aliases: ["eccl", "ecc", "ec"] },
  { id: 22, name: "Song of Solomon", aliases: ["song", "sos", "so"] },
  { id: 23, name: "Isaiah", aliases: ["isa", "is"] },
  { id: 24, name: "Jeremiah", aliases: ["jer", "je", "jr"] },
  { id: 25, name: "Lamentations", aliases: ["lam", "la"] },
  { id: 26, name: "Ezekiel", aliases: ["ezek", "eze", "ezk"] },
  { id: 27, name: "Daniel", aliases: ["dan", "da", "dn"] },
  { id: 28, name: "Hosea", aliases: ["hos", "ho"] },
  { id: 29, name: "Joel", aliases: ["joe", "jl"] },
  { id: 30, name: "Amos", aliases: ["amo", "am"] },
  { id: 31, name: "Obadiah", aliases: ["obad", "oba", "ob"] },
  { id: 32, name: "Jonah", aliases: ["jon", "jnh"] },
  { id: 33, name: "Micah", aliases: ["mic", "mc"] },
  { id: 34, name: "Nahum", aliases: ["nah", "na"] },
  { id: 35, name: "Habakkuk", aliases: ["hab", "hb"] },
  { id: 36, name: "Zephaniah", aliases: ["zeph", "zep", "zp"] },
  { id: 37, name: "Haggai", aliases: ["hag", "hg"] },
  { id: 38, name: "Zechariah", aliases: ["zech", "zec", "zc"] },
  { id: 39, name: "Malachi", aliases: ["mal", "ml"] },
  { id: 40, name: "Matthew", aliases: ["matt", "mat", "mt"] },
  { id: 41, name: "Mark", aliases: ["mrk", "mar", "mk"] },
  { id: 42, name: "Luke", aliases: ["luk", "lk"] },
  { id: 43, name: "John", aliases: ["jhn", "joh", "jn"] },
  { id: 44, name: "Acts", aliases: ["act", "ac"] },
  { id: 45, name: "Romans", aliases: ["rom", "ro", "rm"] },
  { id: 46, name: "1 Corinthians", aliases: ["1cor", "1co", "1 cor"] },
  { id: 47, name: "2 Corinthians", aliases: ["2cor", "2co", "2 cor"] },
  { id: 48, name: "Galatians", aliases: ["gal", "ga"] },
  { id: 49, name: "Ephesians", aliases: ["eph", "ep"] },
  { id: 50, name: "Philippians", aliases: ["phil", "php", "pp"] },
  { id: 51, name: "Colossians", aliases: ["col", "cl"] },
  { id: 52, name: "1 Thessalonians", aliases: ["1thess", "1th", "1 ts"] },
  { id: 53, name: "2 Thessalonians", aliases: ["2thess", "2th", "2 ts"] },
  { id: 54, name: "1 Timothy", aliases: ["1tim", "1ti", "1 t"] },
  { id: 55, name: "2 Timothy", aliases: ["2tim", "2ti", "2 t"] },
  { id: 56, name: "Titus", aliases: ["tit", "ti"] },
  { id: 57, name: "Philemon", aliases: ["phlm", "phm", "pm"] },
  { id: 58, name: "Hebrews", aliases: ["heb", "he"] },
  { id: 59, name: "James", aliases: ["jas", "jm"] },
  { id: 60, name: "1 Peter", aliases: ["1pet", "1pe", "1p"] },
  { id: 61, name: "2 Peter", aliases: ["2pet", "2pe", "2p"] },
  { id: 62, name: "1 John", aliases: ["1jhn", "1jn", "1j"] },
  { id: 63, name: "2 John", aliases: ["2jhn", "2jn", "2j"] },
  { id: 64, name: "3 John", aliases: ["3jhn", "3jn", "3j"] },
  { id: 65, name: "Jude", aliases: ["jud", "jd"] },
  { id: 66, name: "Revelation", aliases: ["rev", "re", "rv"] }
];

// DOM Elements
const searchForm = document.getElementById('search-form');
const verseInput = document.getElementById('verse-input');
const bookSelect = document.getElementById('book-select');
const chapterSelect = document.getElementById('chapter-select');
const verseSelect = document.getElementById('verse-select');
const versionSelect = document.getElementById('version-select');
const suggestions = document.getElementById('suggestions');

const previewCard = document.getElementById('preview-card');
const previewReference = document.getElementById('preview-reference');
const previewTranslation = document.getElementById('preview-translation');
const previewText = document.getElementById('preview-text');
const showBtn = document.getElementById('show-btn');
const hideBtn = document.getElementById('hide-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const statusMessage = document.getElementById('status-message');

// Settings Elements
const fontFamilySelect = document.getElementById('font-family');
const fontSizeSelect = document.getElementById('font-size');
const positionSelect = document.getElementById('position-select');
const animationSelect = document.getElementById('animation-select');
const opacitySlider = document.getElementById('opacity-slider');
const opacityVal = document.getElementById('opacity-val');
const bgUpload = document.getElementById('bg-upload');
const clearBgBtn = document.getElementById('clear-bg-btn');

let currentVerseData = null;
let currentBook = "", currentChapter = 1, currentVerseNum = 1;

// Initialize Books Dropdown
BIBLE_BOOKS.forEach(book => {
  const opt = document.createElement('option');
  opt.value = book.name;
  opt.textContent = book.name;
  bookSelect.appendChild(opt);
});

// Auto-suggest implementation
verseInput.addEventListener('input', () => {
  const val = verseInput.value.toLowerCase().trim();
  suggestions.innerHTML = '';
  if (!val) { suggestions.classList.add('hidden'); return; }

  const matches = BIBLE_BOOKS.filter(b => 
    b.name.toLowerCase().startsWith(val) || 
    b.aliases.some(a => a.startsWith(val))
  );

  if (matches.length > 0) {
    matches.forEach(match => {
      const li = document.createElement('li');
      li.textContent = match.name;
      li.onclick = () => {
        verseInput.value = match.name + ' ';
        suggestions.classList.add('hidden');
        verseInput.focus();
      };
      suggestions.appendChild(li);
    });
    suggestions.classList.remove('hidden');
  } else {
    suggestions.classList.add('hidden');
  }
});

// Quick Chips Handler
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const book = chip.getAttribute('data-book');
    bookSelect.value = book;
    populateChapters(book);
    verseInput.value = `${book} 1:1`;
    fetchVerse(`${book} 1:1`, versionSelect.value);
  });
});

// Dropdown Cascading Logic
bookSelect.addEventListener('change', () => {
  populateChapters(bookSelect.value);
});

chapterSelect.addEventListener('change', () => {
  populateVerses(150);
});

verseSelect.addEventListener('change', () => {
  const query = `${bookSelect.value} ${chapterSelect.value}:${verseSelect.value}`;
  verseInput.value = query;
  fetchVerse(query, versionSelect.value);
});

function populateChapters(book) {
  chapterSelect.innerHTML = '<option value="">Ch</option>';
  verseSelect.innerHTML = '<option value="">Vs</option>';
  verseSelect.disabled = true;

  if (!book) { chapterSelect.disabled = true; return; }

  chapterSelect.disabled = false;
  for (let i = 1; i <= 150; i++) {
    const opt = document.createElement('option');
    opt.value = i; opt.textContent = i;
    chapterSelect.appendChild(opt);
  }
}

function populateVerses(count) {
  verseSelect.innerHTML = '<option value="">Vs</option>';
  verseSelect.disabled = false;
  for (let i = 1; i <= count; i++) {
    const opt = document.createElement('option');
    opt.value = i; opt.textContent = i;
    verseSelect.appendChild(opt);
  }
}

// Reference Parser: converts "John 3:16" -> { bookId: 43, bookName: "John", chapter: 3, verse: 16 }
function parseReference(query) {
  const regex = /^([1-3]?\s*[A-Za-z]+(?:\s+[A-Za-z]+)?)\s+(\d+)[:.](\d+)/;
  const match = query.trim().match(regex);

  if (!match) return null;

  const rawBook = match[1].toLowerCase().replace(/\s+/g, ' ').trim();
  const chapter = parseInt(match[2], 10);
  const verse = parseInt(match[3], 10);

  const foundBook = BIBLE_BOOKS.find(b => 
    b.name.toLowerCase() === rawBook || 
    b.aliases.includes(rawBook)
  );

  if (!foundBook) return null;

  return {
    bookId: foundBook.id,
    bookName: foundBook.name,
    chapter,
    verse
  };
}

// Fetch Verse Logic (Multi-API with Offline Cache)
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = verseInput.value.trim();
  if (query) fetchVerse(query, versionSelect.value);
});

async function fetchVerse(query, translation) {
  statusMessage.textContent = 'Fetching verse...';
  const cacheKey = `verse_cache_${query}_${translation}`.toLowerCase();

  // Check Local Cache
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    renderVerse(JSON.parse(cached));
    statusMessage.textContent = 'Loaded from offline cache.';
    return;
  }

  const parsed = parseReference(query);

  try {
    // 1. Primary: Try Bolls.life API using numeric book IDs
    if (parsed) {
      const bollsUrl = `[https://bolls.life/get-verse/$](https://bolls.life/get-verse/$){translation.toUpperCase()}/${parsed.bookId}/${parsed.chapter}/${parsed.verse}/`;
      const res = await fetch(bollsUrl);

      if (res.ok) {
        const data = await res.json();
        const cleanText = data.text ? data.text.replace(/<[^>]*>/g, '').trim() : '';

        if (cleanText) {
          const formatted = {
            reference: `${parsed.bookName} ${parsed.chapter}:${parsed.verse}`,
            text: cleanText,
            translation: translation.toUpperCase()
          };

          localStorage.setItem(cacheKey, JSON.stringify(formatted));
          renderVerse(formatted);
          statusMessage.textContent = 'Verse ready.';
          return;
        }
      }
    }

    // 2. Fallback: Try Bible-API.com
    const fallbackUrl = `[https://bible-api.com/$](https://bible-api.com/$){encodeURIComponent(query)}?translation=${translation.toLowerCase()}`;
    const fallbackRes = await fetch(fallbackUrl);

    if (fallbackRes.ok) {
      const data = await fallbackRes.json();
      const formatted = {
        reference: data.reference,
        text: data.text.trim(),
        translation: translation.toUpperCase()
      };

      localStorage.setItem(cacheKey, JSON.stringify(formatted));
      renderVerse(formatted);
      statusMessage.textContent = 'Verse ready.';
      return;
    }

    throw new Error('Verse not found in available translations.');

  } catch (err) {
    statusMessage.textContent = `Error: Could not find verse. Try standard format (e.g. John 3:16).`;
    previewCard.classList.add('hidden');
  }
}

function renderVerse(data) {
  currentVerseData = data;
  previewReference.textContent = data.reference;
  previewTranslation.textContent = `(${data.translation})`;
  previewText.textContent = `"${data.text}"`;
  previewCard.classList.remove('hidden');

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

// Stepper Navigation
nextBtn.addEventListener('click', () => {
  if (!currentBook) return;
  currentVerseNum++;
  const query = `${currentBook} ${currentChapter}:${currentVerseNum}`;
  verseInput.value = query;
  fetchVerse(query, versionSelect.value);
});

prevBtn.addEventListener('click', () => {
  if (!currentBook || currentVerseNum <= 1) return;
  currentVerseNum--;
  const query = `${currentBook} ${currentChapter}:${currentVerseNum}`;
  verseInput.value = query;
  fetchVerse(query, versionSelect.value);
});

// Broadcast Event Dispatcher
showBtn.addEventListener('click', () => {
  if (!currentVerseData) return;
  dispatch({ action: 'SHOW', data: currentVerseData });
  statusMessage.textContent = 'Projected to stream!';
});

hideBtn.addEventListener('click', () => {
  dispatch({ action: 'HIDE' });
  statusMessage.textContent = 'Cleared from stream.';
});

function dispatch(payload) {
  payload.timestamp = Date.now();
  localStorage.setItem('obs_bible_event', JSON.stringify(payload));
}

// Settings Sync
function saveAndSyncSettings() {
  const settings = {
    fontFamily: fontFamilySelect.value,
    fontSize: fontSizeSelect.value,
    position: positionSelect.value,
    animation: animationSelect.value,
    opacity: opacitySlider.value,
    bgImage: localStorage.getItem('obs_bible_bg_img') || ''
  };

  opacityVal.textContent = `${opacitySlider.value}%`;
  localStorage.setItem('obs_bible_settings', JSON.stringify(settings));
  dispatch({ action: 'UPDATE_SETTINGS', settings });
}

[fontFamilySelect, fontSizeSelect, positionSelect, animationSelect, opacitySlider].forEach(el => {
  el.addEventListener('change', saveAndSyncSettings);
  el.addEventListener('input', saveAndSyncSettings);
});

// Compressed Image Upload Handler
bgUpload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
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

      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);

      try {
        localStorage.setItem('obs_bible_bg_img', compressedDataUrl);
        saveAndSyncSettings();
        statusMessage.textContent = 'Background image updated!';
      } catch (err) {
        statusMessage.textContent = 'Image file too large for browser storage.';
      }
    };
    img.src = evt.target.result;
  };
  reader.readAsDataURL(file);
});

clearBgBtn.addEventListener('click', () => {
  localStorage.removeItem('obs_bible_bg_img');
  bgUpload.value = '';
  saveAndSyncSettings();
  statusMessage.textContent = 'Background image removed.';
});