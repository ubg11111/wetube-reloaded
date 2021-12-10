const videoContainer = document.getElementById("videoContainer");
const textarea = document.querySelector('textarea');
const form = document.getElementById("commentForm");
const deleteBtns = document.querySelector(".deleteBtn");


const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = `${text}`;
  const deleteBtn = document.createElement("span");
  deleteBtn.className = "deleteBtn"
  deleteBtn.innerText = "❌ "
  // append 뒤쪽에 생성 , prepend는 앞쪽에 생성
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(deleteBtn);
  videoComments.prepend(newComment);
  deleteBtn.addEventListener("click", handleDeleteBtn);
};


const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

const handleDeleteBtn = async (event) => {
  const videoId = videoContainer.dataset.id;
  const li = event.srcElement.parentNode;
  const {
    dataset: { id },
  } = li;
  const response = await fetch(`/api/comments/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ videoId }),
  });
  if (response.status === 200) {
    li.remove();
  }
};

if (form) {
  form.addEventListener("click", handleSubmit, false);
}

if (deleteBtns) {
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", handleDeleteComment);
  });
}