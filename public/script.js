
// Kích hoạt reCAPTCHA
window.onload = function () {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible', // Hoặc 'normal' nếu muốn hiển thị reCAPTCHA
        'callback': function (response) {
            console.log("reCAPTCHA xác thực thành công");
        }
    });
};

let confirmationResult = null;

// Gửi OTP
function sendOTP() {
    let phoneNumber = document.getElementById("phoneNumber").value;
    let appVerifier = window.recaptchaVerifier;

    auth.signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function (result) {
            confirmationResult = result;
            document.getElementById("otpSection").style.display = "block";
            document.getElementById("message").innerText = "Mã OTP đã gửi!";
        })
        .catch(function (error) {
            document.getElementById("message").innerText = "Lỗi: " + error.message;
        });
}

// Xác nhận OTP
function verifyOTP() {
    let otpCode = document.getElementById("otpCode").value;

    if (!confirmationResult) {
        document.getElementById("message").innerText = "Vui lòng yêu cầu mã OTP trước.";
        return;
    }

    confirmationResult.confirm(otpCode)
        .then(function (result) {
            document.getElementById("message").innerText = "Xác thực thành công!";
            window.location.href = "thankyou.html"; // Chuyển hướng đến trang cảm ơn
        })
        .catch(function (error) {
            document.getElementById("message").innerText = "Mã OTP sai!";
        });
}

// Từ chối OTP
function rejectOTP() {
    window.location.href = "index.html"; // Quay về trang gốc
}

// Tự động điền số điện thoại từ URL
document.addEventListener("DOMContentLoaded", function () {
    let phone = new URLSearchParams(window.location.search).get("phone");
    if (phone) {
        let phoneInput = document.querySelector("input[name='phone']");
        if (phoneInput) {
            phoneInput.value = phone;
        }
        fetch("https://script.google.com/macros/s/1H9vQlwpKf9PuIACi2yBV-o32Y62SZMyrDzkCp7meaNKJcijSE5X_UAXT/exec?phone=" + phone);
    }
});

// Ẩn/hiện nội dung
function toggleContent(event) {
    var contentBox = event.nextElementSibling;
    contentBox.style.display = (contentBox.style.display === "none" || contentBox.style.display === "") ? "block" : "none";
}

document.addEventListener("DOMContentLoaded", function () {
    let slides = document.querySelectorAll(".slide");
    let currentIndex = 0;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.opacity = i === index ? "1" : "0"; // Dùng opacity thay vì display
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length; // Lặp vô hạn
        showSlide(currentIndex);
    }

    showSlide(currentIndex); // Hiển thị ảnh đầu tiên
    setInterval(nextSlide, 3000); // Chạy mỗi 3 giây
});


// Ẩn/hiện nội dung "xem thêm"
function toggleText() {
    var fullText = document.getElementById("fullText");
    var button = document.getElementById("toggleButton");

    if (fullText.style.display === "none") {
        fullText.style.display = "inline";
        button.textContent = "Thu gọn";
    } else {
        fullText.style.display = "none";
        button.textContent = "Xem thêm";
    }
}
