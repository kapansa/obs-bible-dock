const channel = new BroadcastChannel('obs_bible_overlay');

const searchForm = document.getElementById('search-form');
const verseInput = document.getElementById('verse-input');
const versionSelect = document.getElementById('version-select');
const previewCard = document.getElementById('preview-card');
const previewReference = document.getElementById('preview-reference');
const previewTranslation = document.getElementById('preview-translation');
const previewText = document.getElementById('preview-text');
const showBtn = document.getElementById('show-btn');
const hideBtn = document.getElementById('hide-btn');
const statusMessage = document.getElementById('status-message');

let currentVerseData = null;

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = verseInput.value.trim();
  const translation = versionSelect.value;

  if (!query) return;

  statusMessage.textContent = 'Fetching verse...';
  
  try {
    const response = await fetch(`https://bible-api.com/${encodeURIComponent(query)}?translation=${translation}`);
    
    if (!response.ok) {
      throw new Error('Verse not found');
    }

    const data = await response.json();
    
    currentVerseData = {
      reference: data.reference,
      text: data.text.trim(),
      translation: translation.toUpperCase()
    };

    previewReference.textContent = currentVerseData.reference;
    previewTranslation.textContent = `(${currentVerseData.translation})`;
    previewText.textContent = `"${currentVerseData.text}"`;
    
    previewCard.classList.remove('hidden');
    statusMessage.textContent = 'Verse ready to project.';
  } catch (err) {
    statusMessage.textContent = 'Error: Could not find verse. Please check spelling.';
    previewCard.classList.add('hidden');
  }
});

showBtn.addEventListener('click', () => {
  if (!currentVerseData) return;
  
  channel.postMessage({
    action: 'SHOW',
    data: currentVerseData
  });
  
  statusMessage.textContent = 'Projected to stream!';
});

hideBtn.addEventListener('click', () => {
  channel.postMessage({
    action: 'HIDE'
  });
  
  statusMessage.textContent = 'Cleared from stream.';
});