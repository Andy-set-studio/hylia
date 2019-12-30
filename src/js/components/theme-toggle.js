// For syntax highlighting only
const html = String.raw;

class ThemeToggle extends HTMLElement {
  constructor() {
    super();

    this.STORAGE_KEY = 'user-color-scheme';
    this.COLOR_MODE_KEY = '--color-mode';
  }

  connectedCallback() {
    this.render();
  }

  getCSSCustomProp(propKey) {
    let response = getComputedStyle(document.documentElement).getPropertyValue(propKey);

    // Tidy up the string if there’s something to work with
    if (response.length) {
      response = response.replace(/\'|"/g, '').trim();
    }

    // Return the string response by default
    return response;
  }

  applySetting(passedSetting) {
    let currentSetting = passedSetting || localStorage.getItem(this.STORAGE_KEY);

    if (currentSetting) {
      document.documentElement.setAttribute('data-user-color-scheme', currentSetting);
      this.setStatus(currentSetting);
      this.setButtonIcon(currentSetting);
    } else {
      this.setStatus(this.getCSSCustomProp(this.COLOR_MODE_KEY));
			this.setButtonIcon(this.getCSSCustomProp(this.COLOR_MODE_KEY));
		}
  }

  toggleSetting() {
    let currentSetting = localStorage.getItem(this.STORAGE_KEY);

    switch (currentSetting) {
      case null:
        currentSetting =
          this.getCSSCustomProp(this.COLOR_MODE_KEY) === 'dark' ? 'light' : 'dark';
        break;
      case 'light':
        currentSetting = 'dark';
        break;
      case 'dark':
        currentSetting = 'light';
        break;
    }

    localStorage.setItem(this.STORAGE_KEY, currentSetting);

    return currentSetting;
  }

  setStatus(currentSetting) {
    this.modeStatusElement.innerText = `Color mode is now "${currentSetting}"`;
  }

  setButtonIcon(currentSetting) {
  	const iconClass = currentSetting === 'dark' ? 'light' : 'dark';
  	this.modeToggleIcon.classList.add(`icon--${iconClass}`);
  	this.modeToggleIcon.innerHTML = `${
  		currentSetting === 'dark' ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill-rule="evenodd" clip-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" viewBox="0 0 333 333"><path d="M167 8l34 41 45-19 9 52 49 6-18 49 39 30-41 34 20 45-52 9-6 49-50-18-29 39-34-41-45 20-10-52-48-6 18-50-40-29 41-34-19-45 52-10 6-48 49 18 30-40zm0 70c49 0 88 40 88 89s-39 88-88 88-89-39-89-88 40-89 89-89zm0-21c60 0 109 49 109 110 0 60-49 109-109 109-61 0-110-49-110-109 0-61 49-110 110-110z" viewBox="0 0 317 317"/></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill-rule="evenodd" clip-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" viewBox="0 0 317 317"><path d="M167 0c-48 15-82 59-82 112 0 65 52 117 117 117 55 0 101-38 114-89 11 94-63 177-158 177C71 317 0 246 0 158 0 67 76-5 167 0z"/></svg>'}`;
	}

  render() {
    this.innerHTML = html`
      <div class="[ theme-toggle ]">
        <div role="status" class="[ visually-hidden ][ js-mode-status ]"></div>
        <button class="[ button button--transparent ] [ font-base text-base ] [ js-mode-toggle ]">
          <span class="[ icon ] [ js-mode-icon ]"></span>
				</button>
      </div>
    `;

    this.afterRender();
  }

  afterRender() {
    this.modeToggleButton = document.querySelector('.js-mode-toggle');
    this.modeStatusElement = document.querySelector('.js-mode-status');
		this.modeToggleIcon = document.querySelector('.js-mode-icon');

    this.modeToggleButton.addEventListener('click', evt => {
      evt.preventDefault();

      this.applySetting(this.toggleSetting());
    });

    this.applySetting();
  }
}

if ('customElements' in window) {
  customElements.define('theme-toggle', ThemeToggle);
}

export default ThemeToggle;
