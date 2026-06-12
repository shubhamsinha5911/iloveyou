const screens = Array.from(document.querySelectorAll('.screen'));
const musicToggle = document.getElementById('musicToggle');
const particleLayer = document.getElementById('particleLayer');
const starfield = document.getElementById('starfield');
const blurOverlay = document.getElementById('blurOverlay');

const envelopeButton = document.getElementById('envelopeButton');
const paperIntro = document.getElementById('paperIntro');
const openLetterButton = document.getElementById('openLetterButton');
const apologyText = document.getElementById('apologyText');
const continueFromApology = document.getElementById('continueFromApology');
const loadingMessage = document.getElementById('loadingMessage');
const loadingHeading = document.getElementById('loadingHeading');
const questionHeading = document.getElementById('questionHeading');
const okayButton = document.getElementById('okayButton');
const lovePromptWrap = document.getElementById('lovePromptWrap');
const yesLoveButton = document.getElementById('yesLoveButton');
const noLoveButton = document.getElementById('noLoveButton');
const pesterZone = document.getElementById('pesterZone');
const permanentNoButton = document.getElementById('permanentNoButton');
const celebrationScreen = document.getElementById('screen-celebration');
const storyScreen = document.getElementById('screen-story');
const scrapbookScreen = document.getElementById('screen-scrapbook');
const storyContinueButton = document.getElementById('storyContinueButton');
const storyToSurpriseButton = document.getElementById('storyToSurpriseButton');
const finalHeartButton = document.getElementById('finalHeartButton');
const letterText = document.getElementById('letterText');
const alwaysButton = document.getElementById('alwaysButton');
const hugMessage = document.getElementById('hugMessage');
const memoryGalleries = {
  photoshoot: document.getElementById('photoshootGallery'),
  hugs: document.getElementById('hugGallery'),
  date: document.getElementById('dateGallery'),
  cute: document.getElementById('cuteGallery'),
  beauty: document.getElementById('beautyGallery'),
  collage: document.getElementById('collageGrid'),
};

const apologyLines = [
  'I am sorry for the moments I made you feel hurt, unheard, or less than the love you deserve.',
  'I should have handled things better, spoken more carefully, and loved you with more patience.',
  'I know my mistakes have weight, and I am not trying to minimize any of them.',
  'I am trying to be better because you matter to me more than pride, excuses, or winning an argument.',
  'I am not perfect. I make mistakes. Sometimes I mess up. But one thing I never mess up is loving you.',
];

const loadingMessages = [
  'Loading memories...',
  'Loading hugs...',
  'Loading kisses...',
  'Loading the prettiest girl...',
  'Success! ❤️',
];

const letterCopy = [
  'No matter how many misunderstandings come our way, I will always choose you.',
  'Thank you for being my favorite person, my comfort, and my home.',
  'So...',
  'Will you stay and keep making memories with me?',
];

const noTextCycle = [
  'Are you sure?',
  'Really?',
  'Think again 😭',
  "That's illegal 😤",
  'Suspicious answer 🤨',
];

const gallerySets = {
  photoshoot: {
    title: 'The day my gallery became my favorite place.',
    captions: ['The day these memories were created ❤️', 'I still look at these photos more than I should.', 'This was the day I realized how lucky I am.'],
    files: ['photoshoot1.jpg', 'photoshoot2.jpg', 'photoshoot3.jpg'],
    layout: 'polaroid',
  },
  hugs: {
    title: 'My favorite place.',
    captions: [
      'Everything felt okay here.',
      'My safe place.',
      "If comfort had a picture, it'd be one of these.",
      'I wish I could pause moments like this forever.',
    ],
    files: ['hug1.jpg', 'hug2.jpg', 'hug3.jpg'],
    layout: 'cozy',
  },
  date: {
    title: "The date I'll never forget.",
    captions: ['I was excited the entire day.', "I tried to act cool. It didn't work.", 'One of my favorite days ever.', '10/10 would fall for you again.'],
    files: ['date1.jpg', 'date2.jpg', 'date3.jpg'],
    layout: 'timeline',
  },
  cute: {
    title: 'Little moments. Big memories.',
    captions: ['We were adorable here.', 'This picture always makes me smile.', 'No thoughts. Just us.', 'My favorite kind of chaos.'],
    files: ['cute1.jpg', 'cute2.jpg', 'cute3.jpg'],
    layout: 'scrapbook',
  },
  beauty: {
    title: 'The prettiest girl I know.',
    captions: ['My favorite view.', 'How are you this beautiful?', 'I could stare at this smile forever.', 'Still takes my breath away.', 'The reason my standards got ruined.'],
    files: ['beauty1.jpg', 'beauty2.jpg', 'beauty3.jpg'],
    layout: 'cinema',
  },
  collage: {
    title: 'Our favorite memories collage ❤️',
    captions: [],
    files: ['photoshoot1.jpg', 'photoshoot2.jpg', 'hug1.jpg', 'hug2.jpg', 'date1.jpg', 'date2.jpg', 'cute1.jpg', 'cute2.jpg', 'beauty1.jpg', 'beauty2.jpg'],
    layout: 'collage',
  },
};

const noButtonState = {
  attempts: 0,
  permanent: false,
};

let currentSectionIndex = 0;
let musicContext = null;
let musicGain = null;
let musicTimer = null;
let musicOn = false;
let chordIndex = 0;
let floatingHeartsTimer = null;
let apologyTimer = null;
let loadingTimer = null;
let typewriterTimer = null;
let starTimer = null;

function allSections() {
  return [
    document.getElementById('screen-envelope'),
    document.getElementById('screen-apology'),
    document.getElementById('screen-loading'),
    document.getElementById('screen-question'),
    celebrationScreen,
    storyScreen,
    scrapbookScreen,
    document.getElementById('screen-surprise'),
    document.getElementById('screen-letter'),
  ];
}

function showScreen(index, scroll = true) {
  const sectionList = allSections();
  sectionList.forEach((section, sectionIndex) => {
    section.classList.toggle('active', sectionIndex === index);
  });
  currentSectionIndex = index;
  if (scroll) {
    window.setTimeout(() => sectionList[index].scrollIntoView({ behavior: 'smooth', block: 'start' }), 40);
  }
}

function appendParticles(type, count = 12) {
  for (let index = 0; index < count; index += 1) {
    const element = document.createElement('span');
    element.className = type;
    const left = Math.random() * 100;
    const size = type === 'confetti' ? 8 + Math.random() * 10 : 12 + Math.random() * 14;
    element.style.left = `${left}%`;
    element.style.fontSize = `${size}px`;
    element.style.animationDuration = type === 'confetti' ? `${1.2 + Math.random() * 1.2}s` : `${5 + Math.random() * 4}s`;

    if (type === 'confetti') {
      const colors = ['#f16f9a', '#a98df7', '#ffd76f', '#ffffff', '#ff9cc8'];
      element.style.background = colors[index % colors.length];
      element.style.top = `${Math.random() * 20}%`;
      element.style.transform = `rotate(${Math.random() * 360}deg)`;
      element.textContent = '';
    } else if (type === 'spark') {
      element.textContent = '✦';
      element.style.top = `${Math.random() * 100}%`;
    } else {
      element.textContent = '❤';
    }

    particleLayer.appendChild(element);
    window.setTimeout(() => element.remove(), type === 'confetti' ? 2200 : 9000);
  }
}

function startFloatingHeartsForever() {
  if (floatingHeartsTimer) {
    return;
  }

  floatingHeartsTimer = window.setInterval(() => appendParticles('heart', 2), 1200);
}

function buildTypewriter(textElement, lines, onComplete) {
  if (typewriterTimer) {
    window.clearInterval(typewriterTimer);
    typewriterTimer = null;
  }

  textElement.replaceChildren();
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  textElement.appendChild(cursor);

  const text = lines.join(' ');
  const chars = text.split('');
  let index = 0;

  typewriterTimer = window.setInterval(() => {
    if (index >= chars.length) {
      window.clearInterval(typewriterTimer);
      typewriterTimer = null;
      if (onComplete) {
        window.setTimeout(onComplete, 500);
      }
      return;
    }

    cursor.before(document.createTextNode(chars[index]));
    index += 1;
  }, 26);
}

function rotateLoadingMessages() {
  let index = 0;
  loadingMessage.textContent = loadingMessages[index];
  loadingHeading.textContent = loadingMessages[index];

  loadingTimer = window.setInterval(() => {
    index += 1;
    if (index >= loadingMessages.length) {
      window.clearInterval(loadingTimer);
      loadingTimer = null;
      showScreen(3);
      return;
    }
    loadingMessage.textContent = loadingMessages[index];
    loadingHeading.textContent = loadingMessages[index];
  }, 1050);
}

function revealPaper() {
  envelopeButton.classList.add('open');
  window.setTimeout(() => {
    paperIntro.classList.remove('hidden');
    appendParticles('spark', 10);
  }, 650);
}

function startApology() {
  showScreen(1);
  buildTypewriter(apologyText, apologyLines, () => {
    continueFromApology.classList.remove('hidden');
  });
}

function buildGallery(container, key) {
  const config = gallerySets[key];
  if (!config) {
    return;
  }

  container.innerHTML = '';
  const classMap = {
    polaroid: 'polaroid',
    cozy: 'timeline-photo',
    timeline: 'timeline-photo',
    scrapbook: 'scrap-item',
    cinema: 'cinema-item',
    collage: 'collage-item',
  };

  config.files.forEach((filename, index) => {
    const card = document.createElement('figure');
    card.className = classMap[config.layout] || 'polaroid';
    card.style.setProperty('--tilt', `${-3 + (index * 2)}deg`);
    card.dataset.filename = filename;

    const img = document.createElement('img');
    img.alt = filename.replace('.jpg', '').replace(/\d/g, '').trim() || 'romantic photo';
    img.src = `images/${filename}`;

    const caption = document.createElement('figcaption');
    caption.className = 'caption';
    caption.textContent = config.captions[index] || `Replace ${filename} with your own photo.`;

    img.onerror = () => {
      card.classList.add('placeholder');
      card.innerHTML = '';
      const fallback = document.createElement('div');
      fallback.className = 'placeholder-card';
      fallback.innerHTML = `<span>${filename}</span><small>Drop your photo in /images</small>`;
      card.appendChild(fallback);
    };

    img.onload = () => {
      card.dataset.loaded = 'true';
    };

    card.appendChild(img);
    card.appendChild(caption);
    container.appendChild(card);

    card.addEventListener('click', () => {
      if (card.dataset.loaded !== 'true') {
        return;
      }
      openLightbox(filename, config.captions[index] || config.title);
    });
  });
}

function buildCollage(container) {
  const keys = [
    ['photoshoot1.jpg', 'photoshoot'], ['photoshoot2.jpg', 'photoshoot'], ['hug1.jpg', 'hugs'], ['hug2.jpg', 'hugs'],
    ['date1.jpg', 'date'], ['date2.jpg', 'date'], ['cute1.jpg', 'cute'], ['cute2.jpg', 'cute'],
    ['beauty1.jpg', 'beauty'], ['beauty2.jpg', 'beauty'],
  ];

  container.innerHTML = '';
  keys.forEach(([filename, group], index) => {
    const card = document.createElement('figure');
    card.className = 'collage-item';
    card.style.setProperty('--tilt', `${-4 + (index % 5)}deg`);
    card.dataset.filename = filename;

    const img = document.createElement('img');
    img.alt = `${group} photo ${index + 1}`;
    img.src = `images/${filename}`;

    const caption = document.createElement('figcaption');
    caption.className = 'caption';
    caption.textContent = `${group} memory`;

    img.onerror = () => {
      card.classList.add('placeholder');
      card.innerHTML = '';
      const fallback = document.createElement('div');
      fallback.className = 'placeholder-card';
      fallback.innerHTML = `<span>${filename}</span><small>Replace me in /images</small>`;
      card.appendChild(fallback);
    };

    img.onload = () => {
      card.dataset.loaded = 'true';
    };

    card.appendChild(img);
    card.appendChild(caption);
    container.appendChild(card);

    card.addEventListener('click', () => {
      if (card.dataset.loaded !== 'true') {
        return;
      }
      openLightbox(filename, `${group} memory`);
    });
  });
}

function openLightbox(filename, caption) {
  blurOverlay.classList.remove('hidden');
  blurOverlay.classList.add('visible');
  blurOverlay.innerHTML = '';

  const frame = document.createElement('div');
  frame.className = 'lightbox-frame';
  const close = document.createElement('button');
  close.className = 'lightbox-close';
  close.type = 'button';
  close.textContent = 'Close';
  close.addEventListener('click', closeLightbox);
  const img = document.createElement('img');
  img.src = `images/${filename}`;
  img.alt = caption;
  const label = document.createElement('p');
  label.textContent = caption;
  img.onerror = () => {
    frame.innerHTML = '';
    const fallback = document.createElement('div');
    fallback.className = 'lightbox-fallback';
    fallback.innerHTML = `<strong>${caption}</strong><span>This photo is missing from /images.</span>`;
    frame.appendChild(fallback);
    frame.appendChild(close);
  };
  frame.appendChild(close);
  frame.appendChild(img);
  frame.appendChild(label);
  blurOverlay.appendChild(frame);

  blurOverlay.addEventListener('click', closeLightbox, { once: true });
}

function closeLightbox() {
  blurOverlay.classList.add('hidden');
  blurOverlay.classList.remove('visible');
  blurOverlay.innerHTML = '';
}

function runNoChaos(button) {
  noButtonState.attempts += 1;
  const x = 10 + Math.random() * 70;
  const y = 20 + Math.random() * 55;
  button.classList.add('absolute');
  button.style.left = `${x}%`;
  button.style.top = `${y}%`;
  button.style.transform = `translate(-50%, -50%) rotate(${(Math.random() * 40) - 20}deg) scale(${0.92 + Math.random() * 0.45})`;
  button.textContent = noTextCycle[noButtonState.attempts % noTextCycle.length];

  if (noButtonState.attempts > 6 && !noButtonState.permanent) {
    noButtonState.permanent = true;
    setTimeout(() => {
      pesterZone.classList.remove('hidden');
      permanentNoButton.classList.remove('hidden');
      button.classList.add('hidden');
    }, 250);
  }
}

function revealCelebration() {
  showScreen(4);
  appendParticles('confetti', 120);
  appendParticles('heart', 70);
  appendParticles('spark', 50);
  startMusic();
  buildTypewriter(letterText, letterCopy.slice(0, 2), () => {
    buildTypewriter(letterText, ['And honestly...', "I'd choose you again.", 'And again.', 'And again.', 'And again.', 'No matter how annoying you are 😤❤️'], () => {
      window.setTimeout(() => {
        showScreen(5);
      }, 600);
    });
  });
}

function startStoryJourney() {
  showScreen(5);
  buildGallery(memoryGalleries.photoshoot, 'photoshoot');
  buildGallery(memoryGalleries.hugs, 'hugs');
  buildGallery(memoryGalleries.date, 'date');
  buildGallery(memoryGalleries.cute, 'cute');
  buildGallery(memoryGalleries.beauty, 'beauty');
  buildCollage(memoryGalleries.collage);
}

function showSurprise() {
  showScreen(7);
  appendParticles('heart', 30);
  appendParticles('spark', 20);
}

function startFinalLetter() {
  showScreen(8);
  buildTypewriter(letterText, [
    'I love the way you exist in my life.',
    'I love the little things, the big things, and even the chaotic things because they all somehow lead back to you.',
    'So...',
    'Will you stay and keep making memories with me?',
  ]);
}

function startStarryEnding() {
  bodyStarMode(true);
  startFloatingHeartsForever();
  buildTypewriter(letterText, ['I love you.', 'I always will. ❤️']);
}

function bodyStarMode(active) {
  document.body.classList.toggle('starry-sky', active);
  starfield.classList.toggle('hidden', !active);
  if (active && !starTimer) {
    starfield.innerHTML = '';
    for (let index = 0; index < 120; index += 1) {
      const star = document.createElement('span');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 2}s`;
      starfield.appendChild(star);
    }
    starTimer = true;
  }
}

function initMusic() {
  if (musicContext) {
    return musicContext;
  }

  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtor) {
    return null;
  }

  musicContext = new AudioCtor();
  musicGain = musicContext.createGain();
  musicGain.gain.value = 0.0001;
  musicGain.connect(musicContext.destination);
  return musicContext;
}

function playNote(frequency, startDelay, duration, volume) {
  if (!musicContext || !musicGain) {
    return;
  }

  const oscillator = musicContext.createOscillator();
  const gainNode = musicContext.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;
  oscillator.connect(gainNode);
  gainNode.connect(musicGain);

  const now = musicContext.currentTime + startDelay;
  gainNode.gain.setValueAtTime(0.0001, now);
  gainNode.gain.exponentialRampToValueAtTime(volume, now + 0.08);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  oscillator.start(now);
  oscillator.stop(now + duration + 0.05);
}

function scheduleMusicBar() {
  const progression = [
    [261.63, 329.63, 392.00],
    [246.94, 311.13, 369.99],
    [220.00, 293.66, 349.23],
    [233.08, 293.66, 392.00],
  ];
  const chord = progression[chordIndex % progression.length];
  chordIndex += 1;
  playNote(chord[0], 0, 1.6, 0.016);
  playNote(chord[1], 0.16, 1.4, 0.011);
  playNote(chord[2], 0.32, 1.24, 0.009);
}

async function startMusic() {
  const context = initMusic();
  if (!context) {
    return;
  }

  await context.resume();
  musicOn = true;
  musicToggle.textContent = 'Music on';
  musicToggle.setAttribute('aria-pressed', 'true');
  musicGain.gain.setTargetAtTime(0.03, context.currentTime, 0.12);

  if (!musicTimer) {
    scheduleMusicBar();
    musicTimer = window.setInterval(scheduleMusicBar, 1700);
  }
}

function stopMusic() {
  musicOn = false;
  musicToggle.textContent = 'Music off';
  musicToggle.setAttribute('aria-pressed', 'false');
  if (musicGain && musicContext) {
    musicGain.gain.setTargetAtTime(0.0001, musicContext.currentTime, 0.08);
  }
  if (musicTimer) {
    window.clearInterval(musicTimer);
    musicTimer = null;
  }
}

function toggleMusic() {
  if (musicOn) {
    stopMusic();
  } else {
    startMusic();
  }
}

function jumpNoButton(button) {
  const marginX = 10;
  const marginY = 14;
  const x = marginX + Math.random() * (100 - marginX * 2);
  const y = marginY + Math.random() * (100 - marginY * 2);
  button.style.position = 'absolute';
  button.style.left = `${x}%`;
  button.style.top = `${y}%`;
  button.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg) scale(${0.8 + Math.random() * 0.5})`;
}

function setupNoButton(button) {
  const texts = noTextCycle;
  button.addEventListener('mouseenter', () => {
    runNoChaos(button);
    button.textContent = texts[(noButtonState.attempts - 1) % texts.length];
  });
  button.addEventListener('mousemove', () => {
    runNoChaos(button);
  });
}

function initGalleryClickGlow() {
  document.querySelectorAll('.polaroid, .timeline-photo, .scrap-item, .cinema-item, .collage-item').forEach((card) => {
    card.addEventListener('click', () => {
      appendParticles('spark', 8);
      if (card.closest('#hugGallery')) {
        const messages = [
          'Everything felt okay here.',
          'My safe place.',
          "If comfort had a picture, it'd be one of these.",
          'I wish I could pause moments like this forever.',
        ];
        hugMessage.textContent = messages[Math.floor(Math.random() * messages.length)];
      }
      openLightboxFromCard(card);
    });
  });
}

function openLightboxFromCard(card) {
  const img = card.querySelector('img');
  const caption = card.querySelector('.caption')?.textContent || 'A memory';
  if (!img || !img.getAttribute('src')) {
    return;
  }
  blurOverlay.classList.remove('hidden');
  blurOverlay.classList.add('visible');
  blurOverlay.innerHTML = '';
  const frame = document.createElement('div');
  frame.className = 'lightbox-frame';
  const image = document.createElement('img');
  image.src = img.src;
  image.alt = img.alt;
  const label = document.createElement('p');
  label.textContent = caption;
  frame.appendChild(image);
  frame.appendChild(label);
  blurOverlay.appendChild(frame);
}

function closeLightbox() {
  blurOverlay.classList.add('hidden');
  blurOverlay.classList.remove('visible');
  blurOverlay.innerHTML = '';
}

function revealFinalLetterSequence() {
  showScreen(8);
  startStarryEnding();
}

envelopeButton.addEventListener('click', revealPaper);
openLetterButton.addEventListener('click', () => {
  showScreen(1);
  startApology();
});
continueFromApology.addEventListener('click', () => {
  showScreen(2);
  rotateLoadingMessages();
});
okayButton.addEventListener('click', () => {
  showScreen(3);
  setTimeout(() => {
    lovePromptWrap.classList.remove('hidden');
  }, 400);
});
yesLoveButton.addEventListener('click', () => {
  showScreen(4);
  appendParticles('heart', 90);
  appendParticles('confetti', 120);
  startMusic();
  setTimeout(() => {
    showScreen(5);
    startStoryJourney();
  }, 4200);
});

noLoveButton.addEventListener('mouseenter', () => {
  if (noButtonState.permanent) {
    return;
  }
  jumpNoButton(noLoveButton);
  const message = noTextCycle[noButtonState.attempts % noTextCycle.length];
  noLoveButton.textContent = message;
  noButtonState.attempts += 1;
  if (noButtonState.attempts > 5) {
    pesterZone.classList.remove('hidden');
    permanentNoButton.classList.remove('hidden');
    noLoveButton.classList.add('hidden');
    noLoveButton.textContent = 'Fine. You seem determined.';
  }
});

noLoveButton.addEventListener('mousemove', () => {
  if (!noButtonState.permanent) {
    jumpNoButton(noLoveButton);
  }
});

permanentNoButton.addEventListener('mouseenter', () => {
  jumpNoButton(permanentNoButton);
});
permanentNoButton.addEventListener('mousemove', () => {
  jumpNoButton(permanentNoButton);
});

storyContinueButton.addEventListener('click', () => {
  showScreen(6);
});
storyToSurpriseButton.addEventListener('click', () => {
  showScreen(7);
});
finalHeartButton.addEventListener('click', () => {
  appendParticles('heart', 40);
  appendParticles('confetti', 80);
  setTimeout(() => showScreen(8), 700);
});
alwaysButton.addEventListener('click', () => {
  document.body.classList.add('starry-sky');
  blurOverlay.classList.add('hidden');
  blurOverlay.classList.remove('visible');
  starfield.classList.remove('hidden');
  starfield.innerHTML = '';
  for (let index = 0; index < 120; index += 1) {
    const star = document.createElement('span');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    starfield.appendChild(star);
  }
  appendParticles('heart', 30);
  showScreen(8);
  buildTypewriter(letterText, [
    'I love you.',
    'I always will. ❤️',
    'Not just on the easy days, but on the messy ones too.',
    'Not just when everything feels perfect, but when life feels complicated and loud.',
    'You are my favorite person to love, my favorite place to return to, and my favorite future to imagine.',
    'Thank you for being you. Thank you for letting me be close to your heart.',
  ]);
});

musicToggle.addEventListener('click', toggleMusic);
blurOverlay.addEventListener('click', closeLightbox);

[
  ['photoshoot', memoryGalleries.photoshoot],
  ['hugs', memoryGalleries.hugs],
  ['date', memoryGalleries.date],
  ['cute', memoryGalleries.cute],
  ['beauty', memoryGalleries.beauty],
].forEach(([key, container]) => buildGallery(container, key));
buildCollage(memoryGalleries.collage);
initGalleryClickGlow();
setupNoButton(noLoveButton);
showScreen(0, false);
