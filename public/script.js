// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCXeHaUP9pM3cMwQoa48r_E8eJl84nw8VA",
    authDomain: "vinhomes-royal-island.firebaseapp.com",
    projectId: "vinhomes-royal-island",
    storageBucket: "vinhomes-royal-island.firebasestorage.app",
    messagingSenderId: "600333799617",
    appId: "1:600333799617:web:8eeb0d1e306a382f1d4440",
    measurementId: "G-FY15SSGDGG"
  };
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Kích hoạt reCAPTCHA
window.onload = function () {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'normal',
        'callback': function (response) {
            console.log("reCAPTCHA verified");
        }
    });
};

let confirmationResult;

// Gửi OTP
function sendOTP() {
    let phoneNumber = document.getElementById("phoneNumber").value;
    let appVerifier = window.recaptchaVerifier;

    auth.signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function (result) {
            confirmationResult = result;
            document.querySelector(".otp-section").style.display = "block";
            document.getElementById("message").innerText = "Mã OTP đã gửi!";
        })
        .catch(function (error) {
            document.getElementById("message").innerText = "Lỗi: " + error.message;
        });
}

// Xác nhận OTP
function verifyOTP() {
    let otpCode = document.getElementById("otpCode").value;

    confirmationResult.confirm(otpCode)
        .then(function (result) {
            document.getElementById("message").innerText = "Xác thực thành công!";
            console.log(result.user);
        })
        .catch(function (error) {
            document.getElementById("message").innerText = "Mã OTP sai!";
        });
}
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    'size': 'invisible', // Hoặc 'normal' nếu muốn hiển thị reCAPTCHA
    'callback': function(response) {
        console.log("reCAPTCHA xác thực thành công");
    }
});

function toggleContent(element) {
    var contentBox = element.nextElementSibling; // Lấy phần tử tiếp theo (nội dung)

    // Kiểm tra trạng thái hiển thị và thay đổi
    if (contentBox.style.display === "none" || contentBox.style.display === "") {
        contentBox.style.display = "block"; // Hiện nội dung
    } else {
        contentBox.style.display = "none"; // Ẩn nội dung
    }
}

// Hàm tự động đổi ảnh mỗi 3 giây
function startSlideshow(slideshow) {
    let slides = slideshow.querySelectorAll(".slide");
    let index = 0;

    setInterval(() => {
        slides[index].classList.remove("active");
        index = (index + 1) % slides.length;
        slides[index].classList.add("active");
    }, 3000);
}

// Khi trang tải xong, kích hoạt slideshow cho từng phần
document.addEventListener("DOMContentLoaded", () => {
    let slideshows = document.querySelectorAll(".slideshow");
    slideshows.forEach(startSlideshow);
});
function toggleText() {
    var fullText = document.getElementById("fullText");
    var button = document.getElementById("toggleButton");

    if (fullText.style.display === "none") {
        fullText.style.display = "inline"; // Hiện nội dung đầy đủ
        button.textContent = "thu gọn"; // Đổi chữ thành "thu gọn"
    } else {
        fullText.style.display = "none"; // Ẩn nội dung mở rộng
        button.textContent = "xem thêm"; // Đổi lại thành "xem thêm"
    }
}

//JavaScript để tự động điền số điện thoại vào form
  function getQueryParam(param) {
      let urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
  }

  document.addEventListener("DOMContentLoaded", function () {
      let phone = getQueryParam("phone");
      if (phone) {
          let phoneInput = document.querySelector("input[name='phone']"); // Chỉnh sửa nếu cần
          if (phoneInput) {
              phoneInput.value = phone;
          }
      }
  });


  function doGet(e) {
    var sheet = SpreadsheetApp.openById("1ghswD-V6P0lkD-ydWvT4kgQtu933EzbmWY7PNE6rY2k").getSheetByName("Sheet1");
    var phone = e.parameter.phone;
  
    if (phone) {
      sheet.appendRow([new Date(), phone]);
    }
  
    return ContentService.createTextOutput("Success");
  }

  document.addEventListener("DOMContentLoaded", function () {
      let phone = getQueryParam("phone");
      if (phone) {
          fetch("https://script.google.com/macros/s/1H9vQlwpKf9PuIACi2yBV-o32Y62SZMyrDzkCp7meaNKJcijSE5X_UAXT/exec?phone=" + phone);
      }
  });

