const JIKAN_URI = "https://api.jikan.moe/v4";
const OPM_ID = 30276;
const OPM_SAITAMA_ID = 73935;
const OPM_GENOS_ID = 73979;
const OPM_GAROU_ID = 112889;

const themeSwitcher = document.querySelector("#theme-switcher sl-switch");
const sun = document.querySelector("#sun");
const moon = document.querySelector("#moon");

themeSwitcher.addEventListener("sl-change", () => {
  if (themeSwitcher.checked) {
    document.documentElement.classList.add("sl-theme-dark");
    sun.style.opacity = 0;
    moon.style.opacity = 1;
  } else {
    document.documentElement.classList.remove("sl-theme-dark");
    moon.style.opacity = 0;
    sun.style.opacity = 1;
  }
});

async function jikanGetCharacterById(id) {
  try {
    const data = await fetch(JIKAN_URI + `/characters/${id}`);
    const json = await data.json();
    return json;
  } catch (e) {
    console.error(e);
  }
}

async function jikanGetCharacterFullById(id) {
  try {
    const data = await fetch(JIKAN_URI + `/characters/${id}/full`);
    const json = await data.json();
    return json;
  } catch (e) {
    console.error(e);
  }
}

async function jikanGetCharacterPicsById(id) {
  try {
    const data = await fetch(JIKAN_URI + `/characters/${id}/pictures`);
    const json = await data.json();
    return json;
  } catch (e) {
    console.error(e);
  }
}

async function jikanGetEpisodeById(episodeNumber) {
  try {
    const data = await fetch(
      JIKAN_URI + `/anime/${OPM_ID}/episodes/${episodeNumber}`
    );
    const json = await data.json();
    return json;
  } catch (e) {
    console.error(e);
  }
}

async function createDialogContent(id) {
  const data = await jikanGetCharacterFullById(id);
  const char = data.data;
  const div = document.createElement("div");

  const strong = document.createElement("strong");
  strong.innerText = `${char.name_kanji}\n\n`;

  const content = document.createElement("div");
  content.innerText = char.about;

  div.append(strong);
  const nicknameDiv = document.createElement("div");
  char.nicknames.forEach((n) => {
    const span = document.createElement("span");
    span.innerText = n;
    nicknameDiv.append(span);
  });
  div.append(nicknameDiv);
  div.append(content);

  const picsData = await jikanGetCharacterPicsById(id);
  const pics = picsData.data;

  const container = document.createElement("div");
  container.classList.add("gallery-container");

  pics.forEach((item) => {
    const imgEl = document.createElement("img");
    imgEl.src = item.jpg.image_url;
    container.append(imgEl);
  });

  div.append(container);
  return div;
}

function createChar(char) {
  const div = document.createElement("div");
  //   Create dialog
  const slDialog = document.createElement("sl-dialog");
  slDialog.label = char.name;
  const slButton = document.createElement("sl-button");
  slButton.innerText = "Close";
  slButton.slot = "footer";
  slButton.variant = "primary";
  slButton.addEventListener("click", () => slDialog.hide());

  const spinnerDiv = document.createElement("div");
  spinnerDiv.classList.add("loading-overlay");
  const spinner = document.createElement("sl-spinner");
  spinnerDiv.append(spinner);
  spinnerDiv.id = "spinner";
  spinnerDiv.style.opacity = 0;

  slDialog.addEventListener("sl-show", async (e) => {
    if (e.target.children.length === 2) {
      spinnerDiv.style.opacity = 1;
      //   await new Promise(r => setTimeout(r, 2000));
      e.target.append(await createDialogContent(char.mal_id));
      spinnerDiv.style.opacity = 0;
    }
  });

  slDialog.append(spinnerDiv);
  slDialog.append(slButton);
  div.append(slDialog);

  //   Create card
  const slCard = document.createElement("sl-card");

  const img = document.createElement("img");
  img.slot = "image";
  img.src = char.images.jpg.image_url;
  img.alt = char.name;

  const strong = document.createElement("strong");
  strong.innerText = `\n${char.name}`;

  const small = document.createElement("small");
  small.innerText = `\n${char.name_kanji}\n\n`;

  const slCardBaseContent = document.createElement("div");
  slCardBaseContent.innerText = char.about.substring(
    0,
    char.about.indexOf("\n\n")
  );

  const footer = document.createElement("div");
  footer.slot = "footer";
  const footerSlButton = document.createElement("sl-button");
  footerSlButton.variant = "primary";
  footerSlButton.pill = true;
  footerSlButton.innerText = "More info";
  footerSlButton.addEventListener("click", () => slDialog.show());
  footer.append(footerSlButton);

  slCard.append(img);
  slCard.append(strong);
  slCard.append(small);
  slCard.append(slCardBaseContent);
  slCard.append(footer);

  div.append(slCard);

  return div;
}

async function renderChars() {
  const favChars = document.querySelector("#fav-chars");
  try {
    const [data1, data2, data3] = await Promise.all([
      jikanGetCharacterById(OPM_GENOS_ID),
      jikanGetCharacterById(OPM_SAITAMA_ID),
      jikanGetCharacterById(OPM_GAROU_ID),
    ]);
    [data1.data, data2.data, data3.data].forEach((char) => {
      const div = createChar(char);
      favChars.append(div);
    });
  } catch (e) {
    console.error(e);
  }
}

function createEp(ep) {
  const div = document.createElement("div");
  //   Create dialog
  const slDialog = document.createElement("sl-dialog");
  slDialog.label = ep.title;
  const slButton = document.createElement("sl-button");
  slButton.innerText = "Close";
  slButton.slot = "footer";
  slButton.variant = "primary";
  slButton.addEventListener("click", () => slDialog.hide());

  const iframe = document.createElement("iframe");
  if (ep.mal_id === 1) {
    iframe.src =
      "https://www.youtube.com/embed/iLF4NjTNr1o?si=OqXc9CsedTMb-he_";
  } else if (ep.mal_id === 11) {
    iframe.src =
      "https://www.youtube.com/embed/gNnRx0Fhu74?si=5ETW10nn5Q9Ywv9P";
  } else {
    iframe.src =
      "https://www.youtube.com/embed/ErXfj3sbIfU?si=Tb_ApzbRKsq9Nid5";
  }

  iframe.width = "560";
  iframe.height = "315";
  iframe.title = "YouTube video player";
  iframe.frameborder = "0";
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.referrerpolicy = "strict-origin-when-cross-origin";
  iframe.allowfullscreen = true;

  slDialog.append(slButton);
  slDialog.append(iframe);
  div.append(slDialog);

  //   Create card
  const slCard = document.createElement("sl-card");

  const img = document.createElement("img");
  img.slot = "image";
  img.src = `/public/img/thumb-${ep.mal_id}.webp`;
  img.alt = ep.title;

  const strong = document.createElement("strong");
  strong.innerText = `\n${ep.title}`;

  const small = document.createElement("small");
  small.innerText = `\n${ep.title_japanese}\n\n`;

  const slCardBaseContent = document.createElement("div");
  slCardBaseContent.innerText = ep.synopsis;

  const footer = document.createElement("div");
  footer.slot = "footer";
  const footerSlButton = document.createElement("sl-button");
  footerSlButton.variant = "primary";
  footerSlButton.pill = true;
  footerSlButton.innerText = "More info";
  footerSlButton.addEventListener("click", () => slDialog.show());
  footer.append(footerSlButton);

  slCard.append(img);
  slCard.append(strong);
  slCard.append(small);
  slCard.append(slCardBaseContent);
  slCard.append(footer);

  div.append(slCard);

  return div;
}

async function renderEps() {
  const favEps = document.querySelector("#fav-eps");
  try {
    const [data1, data2, data3] = await Promise.all([
      jikanGetEpisodeById(1),
      jikanGetEpisodeById(11),
      jikanGetEpisodeById(12),
    ]);
    [data1.data, data2.data, data3.data].forEach((ep) => {
      const div = createEp(ep);
      favEps.append(div);
    });
  } catch (e) {
    console.error(e);
  }
}

const formBtn = document.getElementById("send-btn");
const form = document.getElementById("contact-form");

formBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const errorName = document.getElementById("error-name");
  const errorEmail = document.getElementById("error-email");
  const errorMessage = document.getElementById("error-message");

  let isValid = true;

  if (nameInput.value.trim() === "") {
    errorName.open = true;
    isValid = false;
  } else {
    errorName.open = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value.trim())) {
    errorEmail.open = true;
    isValid = false;
  } else {
    errorEmail.open = false;
  }

  if (messageInput.value.trim() === "") {
    errorMessage.open = true;
    isValid = false;
  } else {
    errorMessage.open = false;
  }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

formBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const errorName = document.getElementById("error-name");
  const errorEmail = document.getElementById("error-email");
  const errorMessage = document.getElementById("error-message");

  const validateInput = (input, errorElement, validationFn, errorMessage) => {
    if (!validationFn(input.value)) {
      input.classList.add("error");
      errorElement.textContent = errorMessage;
      errorElement.style.display = "block";
      return false;
    }
    input.classList.remove("error");
    errorElement.style.display = "none";
    return true;
  };

  const isValidName = (name) => name.trim().length > 1;
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidMessage = (message) => message.trim().length > 10;

  const nameValid = validateInput(
    nameInput,
    errorName,
    isValidName,
    "Name must be at least 2 characters long"
  );

  const emailValid = validateInput(
    emailInput,
    errorEmail,
    isValidEmail,
    "Please enter a valid email address"
  );

  const messageValid = validateInput(
    messageInput,
    errorMessage,
    isValidMessage,
    "Message must be at least 10 characters long"
  );

  if (nameValid && emailValid && messageValid) {
    Swal.fire({
      title: "Message Sent!",
      text: "Thank you for your message. We will get back to you soon.",
      icon: "success",
      confirmButtonText: "Cool",
    });
    form.reset();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const lazyImages = document.querySelectorAll("img");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => imageObserver.observe(img));
});

renderChars();
renderEps();
