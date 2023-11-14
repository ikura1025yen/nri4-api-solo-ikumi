window.addEventListener("load", () => {
  fetch("http://localhost:3000/stores")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      res.forEach((store) => {
        const tbody = document.createElement("tbody");

        const tdId = document.createElement("td");
        tdId.innerText = store.id;
        tbody.appendChild(tdId);

        const tdName = document.createElement("td");
        tdName.innerText = store.store_name;
        tbody.appendChild(tdName);

        const tdRegion = document.createElement("td");
        tdRegion.innerText = store.region;
        tbody.appendChild(tdRegion);

        const tdPhoto = document.createElement("td");
        const photo = document.createElement("img");
        photo.height = 50;
        photo.src = store.photo_path;
        tdPhoto.appendChild(photo);
        tbody.appendChild(tdPhoto);

        const tdDate = document.createElement("td");
        tdDate.innerText = store.date;
        tbody.appendChild(tdDate);

        const tdComment = document.createElement("td");
        tdComment.innerText = store.comment;
        tbody.appendChild(tdComment);

        const table = document.getElementById("store-table");
        table.appendChild(tbody);
      });
    });
});

const registerStore = function registerStore() {
  const inputId = document.getElementById("id");
  const inputName = document.getElementById("store_name");
  const inputPlace = document.getElementById("place");
  const inputPhoto = document.getElementById("photo_path");
  const inputDate = document.getElementById("date");
  const inputComment = document.getElementById("comment");

  fetch("http://localhost:3000/stores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: inputId.value,
      store_name: inputName.value,
      region: inputPlace.value,
      photo_path: inputPhoto.value,
      date: inputDate.value,
      comment: inputComment.value,
    }),
  }).then((res) => {
    return res.json();
  });
};

function editStore() {
  const inputId = document.getElementById("id");
  const editId = parseInt(inputId.value);
  const inputName = document.getElementById("store_name");
  const inputPlace = document.getElementById("place");
  const inputPhoto = document.getElementById("photo_path");
  const inputDate = document.getElementById("date");
  const inputComment = document.getElementById("comment");
  console.log(editId);
  fetch(`http://localhost:3000/stores/${editId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      store_name: inputName.value,
      region: inputPlace.value,
      photo_path: inputPhoto.value,
      date: inputDate.value,
      comment: inputComment.value,
    }),
  }).then((res) => {
    return res.json();
  });
}

function deleteStore() {
  const inputId = document.getElementById("id");
  const deleteId = parseInt(inputId.value);
  fetch(`http://localhost:3000/stores/${deleteId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return res.json();
  });
}

module.exports = { registerStore, editStore, deleteStore };
