// All image that shown on Image gallery section
const imageUrls = [
  {
    src: "assets/images/pexels-polina-tankilevitch-8599653.jpg",
    alt: "image from pexels by polina tankilevitch",
  },
  {
    src: "assets/images/pexels-alexy-almond-3756523.jpg",
    alt: "image from pexels by alexy almond",
  },
  {
    src: "assets/images/pexels-enginakyurt-1437267.jpg",
    alt: "image from pexels by enginakyurt",
  },
  {
    src: "assets/images/pexels-enginakyurt-1438672.jpg",
    alt: "image from pexels by enginakyurt",
  },
  {
    src: "assets/images/pexels-pixabay-262978.jpg",
    alt: "image from pexels by pixabay",
  },
  {
    src: "assets/images/pexels-sabel-blanco-662810-1835743.jpg",
    alt: "image from pexel by sabel-blanco",
  },
];

const body = document.getElementsByTagName("body")[0];
const imageGallery = document.getElementById("image-gallery");

// Dialog functionality
const imageDialog = document.getElementById("image-dialog");
const imagePlaceholder = document.getElementById("dialog-img-placeholder");

const closeDialog = document.getElementById("close-dialog");

/**
 * Handling close dialog, used on close button or overlay of the dialog
 */
const handleCloseDialog = () => {
  imageDialog.close();
  body.classList.remove("overflow-hidden");
  imagePlaceholder.src = "";
  imagePlaceholder.alt = "";
};

// Implement handleCloseDialog to close dialog button and dialog overlay
closeDialog.onclick = () => handleCloseDialog();
imageDialog.onclick = (e) => {
  if (e.target != imageDialog) return;
  handleCloseDialog();
};

/**
 * Handle clicking function to show dialog
 * @param src source of image
 * @param alt alternate text for image
 *
 */
const handleClickImage = (src, alt) => {
  imagePlaceholder.src = src;
  imagePlaceholder.alt = alt;
  imageDialog.show();
  body.classList.add("overflow-hidden");
};

// Dyanmically add image based on imageUrls
imageUrls.forEach((val, idx) => {
  const child = document.createElement("img");
  child.classList =
    "aspect-square w-full object-cover cursor-pointer hover:-translate-y-2 hover:shadow-md translate-all duration-200 ease-in-out";
  child.src = val.src;
  child.alt = val.alt;
  child.onclick = () => handleClickImage(val.src, val.alt);
  imageGallery.appendChild(child);
});

// Handle dark mode
const darkModeButton = document.getElementById("dark-mode-toggle");
const darkModeButtonImage = document.querySelector("#dark-mode-toggle > span");
const mainContent = document.documentElement;

const THEME_DARK = "dark";
const THEME_LIGHT = "light";
const THEME_STORAGE_KEY = "theme";

/**
 *  Handle to applying color theme
 *
 * @param currentTheme current color theme, value is light or dark
 */
const handleAppyTheme = (theme) => {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  if (theme == THEME_DARK) {
    darkModeButtonImage.classList.add("-translate-x-8");
    mainContent.classList.add("dark");
  } else {
    darkModeButtonImage.classList.remove("-translate-x-8");
    mainContent.classList.remove("dark");
  }
};

/**
 * handle to check current color theme and swtich to opposite theme based on
 * local storage or prefers-color-scheme (is there's no theme on local storage)
 */
const handleToggleTheme = () => {
  const localStorageTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const currentTheme =
    localStorageTheme ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? THEME_DARK
      : THEME_LIGHT);

  handleAppyTheme(currentTheme == THEME_DARK ? THEME_LIGHT : THEME_DARK);
};

// Assign handleToggleTheme to button
darkModeButton.onclick = () => {
  handleToggleTheme();
};
/**
 * handle to check initial color theme by checking on local storage or based on prefers-color-scheme
 */
const setInitialColorTheme = () => {
  const localStorageTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const currentTheme =
    localStorageTheme ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? THEME_DARK
      : THEME_LIGHT);
  handleAppyTheme(currentTheme);
};

setInitialColorTheme();
