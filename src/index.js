import "./styles.css";

if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

function initializeCode() {
  makePage();
}

function makePage() {
  const breeds = ["Husky", "Borzoi", "Beagle", "Doberman", "Malamute"];
  const wiki_page = document.getElementById("app");
  for (let i = 0; i < breeds.length; i++) {
    const new_entry = document.createElement("div");
    new_entry.className = "wiki-item";

    let new_header = document.createElement("h1");
    new_header.className = "wiki-header";
    new_header.append(breeds[i]);

    const new_content = document.createElement("div");
    new_content.className = "wiki-content";

    let new_text = document.createElement("p");
    new_text.className = "wiki-text";
    fetch("https://en.wikipedia.org/api/rest_v1/page/summary/" + breeds[i])
      .then((response) => response.json())
      .then((data) => {
        new_text.innerHTML = data.extract;
      });

    const new_image = document.createElement("div");
    new_image.className = "img-container";

    let image_content = document.createElement("img");
    image_content.className = "wiki-img";
    fetch(
      "https://dog.ceo/api/breed/" + breeds[i].toLowerCase() + "/images/random"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        image_content.src = data.message;
      });

    new_image.appendChild(image_content);

    new_content.appendChild(new_image);
    new_content.appendChild(new_text);
    new_entry.appendChild(new_header);
    new_entry.appendChild(new_content);
    wiki_page.appendChild(new_entry);
  }
}

//function loadJson() {
//let url = "https://dog.ceo/api/breed/hound/images/random";
//let response = fetch(url);

//let dog_img = response.json();
//console.log(dog_img.message);
//return dog_img.message;
//}
