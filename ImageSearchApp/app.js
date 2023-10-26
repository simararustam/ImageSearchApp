const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const buttonWrapper = document.querySelector(".button-wrapper");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const imageWrapper = document.querySelector(".image-wrapper");

runEventListener();
function runEventListener() {
  searchButton.addEventListener("click", search);
  clearButton.addEventListener("click", clear);
}

function search(e) {
  const value = searchInput.value.trim();
  fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
    method: "GET",
    headers: {
      Authorization: "Client-ID FC8PTF-dtEj5gKtvH0bbg7Se3KUhaStJZdzKw-vT_CI",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      Array.from(data.results).forEach((image) => {
        addImgToUI(image.urls.small);
      });
    })
    .catch((err) => console.log(err));

  e.preventDefault();
}

function clear(e) {
  searchInput.value = "";
  //   Array.from(imageWrapper.children).forEach((child) => {child.remove();});
  imageWrapper.innerHTML = "";
  
  e.preventDefault();
}

function addImgToUI(url) {
  const div = document.createElement("div");
  div.className = "card";

  const img = document.createElement("img");
  img.setAttribute("src", url);
  img.width = "400";
  img.height = "400";

  div.appendChild(img);
  imageWrapper.appendChild(div);
}
