const channel = new BroadcastChannel('obs_bible_overlay');

const verseContainer = document.getElementById('verse-container');
const verseText = document.getElementById('verse-text');
const verseReference = document.getElementById('verse-reference');

channel.onmessage = (event) => {
  const { action, data } = event.data;

  if (action === 'SHOW') {
    verseText.textContent = `"${data.text}"`;
    verseReference.textContent = `${data.reference} (${data.translation})`;

    verseContainer.classList.remove('hidden');
    verseContainer.classList.add('visible');
  } else if (action === 'HIDE') {
    verseContainer.classList.remove('visible');
    verseContainer.classList.add('hidden');
  }
};