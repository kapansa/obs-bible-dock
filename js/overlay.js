const wrapper = document.getElementById('overlay-wrapper');
const verseContainer = document.getElementById('verse-container');
const verseText = document.getElementById('verse-text');
const verseReference = document.getElementById('verse-reference');

function handleVerseEvent(eventData) {
  if (!eventData) return;

  if (eventData.action === 'SHOW' && eventData.data) {
    verseText.textContent = `"${eventData.data.text}"`;
    verseReference.textContent = `${eventData.data.reference} (${eventData.data.translation})`;

    // Adjusted auto-scaling character limits for the wider 80vw layout
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

  // Font Family
  if (s.fontFamily) verseContainer.style.fontFamily = `'${s.fontFamily}', sans-serif`;

  // Base Font Size
  if (s.fontSize) {
    verseContainer.classList.remove('size-small', 'size-medium', 'size-large', 'size-xlarge');
    verseContainer.classList.add(`size-${s.fontSize}`);
  }

  // Screen Position
  if (s.position) {
    wrapper.classList.remove('position-bottom', 'position-center', 'position-top');
    wrapper.classList.add(`position-${s.position}`);
  }

  // Animation Style
  if (s.animation) {
    verseContainer.classList.remove('anim-fade', 'anim-slide', 'anim-none');
    verseContainer.classList.add(`anim-${s.animation}`);
  }

  // Opacity & Background Image
  const opacityVal = s.opacity !== undefined ? s.opacity / 100 : 0.85;
  if (s.bgImage) {
    verseContainer.style.backgroundImage = `linear-gradient(rgba(15, 15, 20, ${opacityVal}), rgba(15, 15, 20, ${opacityVal})), url(${s.bgImage})`;
  } else {
    verseContainer.style.backgroundImage = 'none';
    verseContainer.style.backgroundColor = `rgba(15, 15, 20, ${opacityVal})`;
  }
}

// Storage Listener for live updates
window.addEventListener('storage', (e) => {
  if (e.key === 'obs_bible_event' && e.newValue) {
    handleVerseEvent(JSON.parse(e.newValue));
  }
});

// Load Initial Settings & Cache on Startup
window.addEventListener('DOMContentLoaded', () => {
  const settings = localStorage.getItem('obs_bible_settings');
  if (settings) applySettings(JSON.parse(settings));

  const savedEvent = localStorage.getItem('obs_bible_event');
  if (savedEvent) handleVerseEvent(JSON.parse(savedEvent));
});