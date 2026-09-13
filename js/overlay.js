const wrapper = document.getElementById('overlay-wrapper');
const verseContainer = document.getElementById('verse-container');
const verseText = document.getElementById('verse-text');
const verseReference = document.getElementById('verse-reference');

function handleVerseEvent(eventData) {
  if (!eventData) return;

  if (eventData.action === 'SHOW' && eventData.data) {
    verseText.innerHTML = `<span class="quote-mark">“</span>${eventData.data.text}<span class="quote-mark">”</span>`;
    
    verseReference.innerHTML = `
      <div class="ref-title">
        <span>${eventData.data.reference}</span>
      </div>
      <span class="translation-badge">${eventData.data.translation}</span>
    `;

    const len = eventData.data.text.length;
    verseContainer.classList.remove('scale-down-sm', 'scale-down-xs');
    if (len > 400) {
      verseContainer.classList.add('scale-down-xs');
    } else if (len > 250) {
      verseContainer.classList.add('scale-down-sm');
    }

    verseContainer.classList.remove('hidden');
    verseContainer.classList.add('visible');
  } else if (eventData.action === 'HIDE') {
    verseContainer.classList.remove('visible');
    verseContainer.classList.add('hidden');
  } else if (eventData.action === 'UPDATE_SETTINGS' && eventData.settings) {
    applySettings(eventData.settings);
  }
}

function applySettings(s) {
  if (!s) return;

  if (s.fontFamily) verseContainer.style.fontFamily = `'${s.fontFamily}', sans-serif`;

  if (s.fontSize) {
    verseContainer.classList.remove('size-small', 'size-medium', 'size-large', 'size-xlarge');
    verseContainer.classList.add(`size-${s.fontSize}`);
  }

  if (s.position) {
    wrapper.classList.remove('position-bottom', 'position-center', 'position-top');
    wrapper.classList.add(`position-${s.position}`);
  }

  if (s.animation) {
    verseContainer.classList.remove('anim-fade', 'anim-slide', 'anim-none');
    verseContainer.classList.add(`anim-${s.animation}`);
  }

  const opacityVal = s.opacity !== undefined ? s.opacity / 100 : 0.92;
  if (s.bgImage && s.bgImage.startsWith('data:image')) {
    verseContainer.style.backgroundImage = `linear-gradient(rgba(10, 10, 14, ${opacityVal}), rgba(10, 10, 14, ${opacityVal})), url("${s.bgImage}")`;
    verseContainer.style.backgroundSize = 'cover';
    verseContainer.style.backgroundPosition = 'center';
  } else {
    verseContainer.style.backgroundImage = 'none';
    verseContainer.style.backgroundColor = `rgba(10, 10, 14, ${opacityVal})`;
  }
}

window.addEventListener('storage', (e) => {
  if (e.key === 'obs_bible_event' && e.newValue) {
    handleVerseEvent(JSON.parse(e.newValue));
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const settings = localStorage.getItem('obs_bible_settings');
  if (settings) applySettings(JSON.parse(settings));

  const savedEvent = localStorage.getItem('obs_bible_event');
  if (savedEvent) handleVerseEvent(JSON.parse(savedEvent));
});