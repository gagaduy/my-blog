document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("myAudio");
  const button = document.getElementById("playButton");

  button.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().catch(error => {
        console.log("Không thể phát nhạc:", error);
      });
    } else {
      audio.pause();
    }
  });

  // Avatar slider
  const avatars = ["images/avatar1.jpg", "images/avatar2.jpg", "images/avatar3.jpg"];
  let currentIndex = 1;

  const left = document.getElementById("leftAvatar");
  const main = document.getElementById("mainAvatar");
  const right = document.getElementById("rightAvatar");

  function updateAvatars() {
    const total = avatars.length;
    const leftIndex = (currentIndex - 1 + total) % total;
    const rightIndex = (currentIndex + 1) % total;

    left.src = avatars[leftIndex];
    main.src = avatars[currentIndex];
    right.src = avatars[rightIndex];
  }

  left.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + avatars.length) % avatars.length;
    updateAvatars();
  });

  right.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % avatars.length;
    updateAvatars();
  });

  updateAvatars(); // Khởi tạo lần đầu
});


let blogs = [];

// load JSON như trước
window.addEventListener('DOMContentLoaded', () => {
  fetch('data/blogs.json')
    .then(res => res.json())
    .then(data => { blogs = data; })
    .catch(err => console.error('Lỗi tải dữ liệu blog:', err));
});

function openPopup() {
  const popup = document.getElementById('popup');
  popup.classList.add('show');
  // chặn body scroll khi popup mở
  document.body.classList.add('modal-open');
  document.body.style.overflow = 'hidden';
}

function closePopup() {
  const popup = document.getElementById('popup');
  popup.classList.remove('show');
  // cho phép body scroll lại
  document.body.classList.remove('modal-open');
  document.body.style.overflow = '';
}

// show post by index
function showPost(index) {
  if (!blogs[index]) return;
  const popupTitle = document.getElementById('popupTitle');
  const popupContent = document.getElementById('popupContent');

  popupTitle.innerText = blogs[index].title;
  popupContent.innerHTML = blogs[index].content.join('');

  openPopup();
}

// close khi click overlay ngoài popup-content
document.getElementById('popup').addEventListener('click', function(e) {
  // nếu click đúng phần overlay (không phải bên trong popup-content)
  if (e.target === this) closePopup();
});

// nếu bạn có close button trong popup nội bộ, cho nó gọi closePopup()
// <span class="close-btn" onclick="closePopup()">×</span>

fetch('./data/blogs.json')
