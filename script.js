const defaultState = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  blur: 0,
  sepia: 0,
  grayscale: 0,
};

const controls = {
  brightness: document.getElementById('brightness'),
  contrast: document.getElementById('contrast'),
  saturation: document.getElementById('saturation'),
  blur: document.getElementById('blur'),
  sepia: document.getElementById('sepia'),
  grayscale: document.getElementById('grayscale'),
};

const values = {
  brightness: document.getElementById('brightnessValue'),
  contrast: document.getElementById('contrastValue'),
  saturation: document.getElementById('saturationValue'),
  blur: document.getElementById('blurValue'),
  sepia: document.getElementById('sepiaValue'),
  grayscale: document.getElementById('grayscaleValue'),
};

const previewImage = document.getElementById('previewImage');
const fallbackMessage = document.getElementById('fallbackMessage');
const imageUpload = document.getElementById('imageUpload');
const resetBtn = document.getElementById('resetBtn');

function applyFilterState() {
  const state = Object.fromEntries(
    Object.entries(controls).map(([name, input]) => [name, Number(input.value)])
  );

  previewImage.style.filter = `brightness(${state.brightness}%) contrast(${state.contrast}%) saturate(${state.saturation}%) blur(${state.blur}px) sepia(${state.sepia}%) grayscale(${state.grayscale}%)`;

  values.brightness.textContent = `${state.brightness}%`;
  values.contrast.textContent = `${state.contrast}%`;
  values.saturation.textContent = `${state.saturation}%`;
  values.blur.textContent = `${state.blur}px`;
  values.sepia.textContent = `${state.sepia}%`;
  values.grayscale.textContent = `${state.grayscale}%`;
}

function setAllControls(state) {
  Object.entries(state).forEach(([name, value]) => {
    if (controls[name]) {
      controls[name].value = value;
    }
  });
  applyFilterState();
}

function handleUpload(event) {
  const [file] = event.target.files;

  if (!file) {
    return;
  }

  const objectUrl = URL.createObjectURL(file);
  previewImage.src = objectUrl;
  previewImage.classList.remove('hidden');
  fallbackMessage.classList.add('hidden');
}

Object.entries(controls).forEach(([name, input]) => {
  input.addEventListener('input', applyFilterState);
  input.addEventListener('change', applyFilterState);
  if (name in defaultState) {
    input.value = defaultState[name];
  }
});

imageUpload.addEventListener('change', handleUpload);
resetBtn.addEventListener('click', () => {
  setAllControls(defaultState);
  imageUpload.value = '';
  previewImage.classList.add('hidden');
  previewImage.removeAttribute('src');
  fallbackMessage.classList.remove('hidden');
});

previewImage.classList.add('hidden');
applyFilterState();

const scenicImage = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900">
    <defs>
      <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="#3b82f6"/>
        <stop offset="60%" stop-color="#a78bfa"/>
        <stop offset="100%" stop-color="#f59e0b"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="900" fill="url(#sky)"/>
    <circle cx="950" cy="170" r="110" fill="#fef3c7" opacity="0.9"/>
    <path d="M0 600 L200 480 L390 620 L560 440 L780 650 L940 520 L1200 690 L1200 900 L0 900 Z" fill="#14532d"/>
    <path d="M0 700 L250 560 L500 705 L760 540 L1200 760 L1200 900 L0 900 Z" fill="#166534"/>
    <path d="M180 380 L250 240 L330 380 Z" fill="#f8fafc" opacity="0.85"/>
    <path d="M380 430 L480 260 L570 430 Z" fill="#e2e8f0" opacity="0.8"/>
    <path d="M680 390 L780 200 L900 390 Z" fill="#f8fafc" opacity="0.82"/>
    <path d="M0 760 C160 720 260 710 360 760 S600 820 760 760 S1020 700 1200 760 V900 H0 Z" fill="#0f172a" opacity="0.65"/>
  </svg>
`);

previewImage.src = scenicImage;
previewImage.classList.remove('hidden');
fallbackMessage.classList.add('hidden');
// SRW PHOTO EDITOR FILTERS

function applyFilter(filter) {
  const canvas = document.getElementById("canvas");
    if (!canvas) return;

      const ctx = canvas.getContext("2d");

        ctx.filter = filter;
          const image = new Image();
            image.src = canvas.toDataURL();

              image.onload = function () {
                  ctx.clearRect(0, 0, canvas.width, canvas.height);
                      ctx.filter = filter;
                          ctx.drawImage(image, 0, 0);
                              ctx.filter = "none";
                                };
                                }

                                function resetFilter() {
                                  const canvas = document.getElementById("canvas");
                                    if (!canvas) return;
                                      location.reload();
        
 let currentFilter = "none";

function applyFilter(filter) {
    currentFilter = filter;
    
        const canvas = document.getElementById("canvas");
            if (!canvas) return;
            
                const ctx = canvas.getContext("2d");
                    const image = new Image();
                    
                        image.onload = function () {
                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                                        ctx.filter = currentFilter;
                                                ctx.drawImage(image, 0, 0);
                                                        ctx.filter = "none";
                                                            };
                                                            
                                                                image.src = canvas.toDataURL();
             
                                                              function deleteRecording() {
                                                                  if (confirm("Delete this recording?")) {
                                                                      if (window.recordedAudioURL) {
                                                                            URL.revokeObjectURL(window.recordedAudioURL);
                                                                                  window.recordedAudioURL = null;
                                                                                      }

                                                                                          const audio = document.getElementById("audioPlayback");
                                                                                              if (audio) {
                                                                                                    audio.pause();
                                                                                                          audio.removeAttribute("src");
                                                                                                                audio.load();
                                                                                                                    }

                                                                                                                        window.recordedChunks = [];
                                                                                                                            alert("Recording deleted");
                                                                                                                              }
                                                                                                                              }
                                                              }}                                   }