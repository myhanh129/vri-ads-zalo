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
