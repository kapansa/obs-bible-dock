// Bible Books Data Array
const BIBLE_BOOKS = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", 
  "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", 
  "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", 
  "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi",
  "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", 
  "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", 
  "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"
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
  opt.value = book;
  opt.textContent = book;
  bookSelect.appendChild(opt);
});

// Auto-suggest implementation
verseInput.addEventListener('input', () => {
  const val = verseInput.value.toLowerCase().trim();
  suggestions.innerHTML = '';
  if (!val) { suggestions.classList.add('hidden'); return; }

  const matches = BIBLE_BOOKS.filter(b => b.toLowerCase().startsWith(val));
  if (matches.length > 0) {
    matches.forEach(match => {
      const li = document.createElement('li');
      li.textContent = match;
      li.onclick = () => {
        verseInput.value = match + ' ';
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
  populateVerses(150); // Generates verse numbers
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
  for (let i = 1; i <= 150; i++) { // Max chapters safety fallback
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

// Fetch Verse Logic (with Offline Cache)
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = verseInput.value.trim();
  if (query) fetchVerse(query, versionSelect.value);
});

async function fetchVerse(query, translation) {
  statusMessage.textContent = 'Fetching verse...';
  const cacheKey = `verse_cache_${query}_${translation}`.toLowerCase();
  
  // Check localStorage Cache for Offline Mode
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    renderVerse(JSON.parse(cached));
    statusMessage.textContent = 'Loaded from offline cache.';
    return;
  }

  try {
    const res = await fetch(`https://bible-api.com/${encodeURIComponent(query)}?translation=${translation}`);
    if (!res.ok) throw new Error('Verse not found');
    const data = await res.json();
    
    const formatted = {
      reference: data.reference,
      text: data.text.trim(),
      translation: translation.toUpperCase(),
      verses: data.verses || []
    };

    // Save to Cache
    localStorage.setItem(cacheKey, JSON.stringify(formatted));
    renderVerse(formatted);
    statusMessage.textContent = 'Verse ready.';
  } catch (err) {
    statusMessage.textContent = 'Error: Could not find verse.';
  }
}

function renderVerse(data) {
  currentVerseData = data;
  previewReference.textContent = data.reference;
  previewTranslation.textContent = `(${data.translation})`;
  previewText.textContent = `"${data.text}"`;
  previewCard.classList.remove('hidden');

  // Parse Reference for Next/Prev Steppers
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

// Broadcast Settings & State
function dispatch(payload) {
  payload.timestamp = Date.now();
  localStorage.setItem('obs_bible_event', JSON.stringify(payload));
}

// Sync Settings
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

// Image Upload Handler (With Auto-Compression to prevent localStorage quota errors)
bgUpload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    const img = new Image();
    img.onload = function() {
      // Resize large images to max 1280px width/height
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

      // Convert to compressed JPEG data URL
      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);

      try {
        localStorage.setItem('obs_bible_bg_img', compressedDataUrl);
        saveAndSyncSettings();
        statusMessage.textContent = 'Background image updated!';
      } catch (err) {
        statusMessage.textContent = 'Image size too large for browser memory.';
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