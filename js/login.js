const emailElement = document.querySelector("#form__email");
const passwordElement = document.querySelector("#form__password");

const notificationContainer = document.querySelector(".notification__container");
const btnLogin = document.querySelector(".btn__sign--in");

// Regex
const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/; // should contain at least one digit, one lower case, one upper case, 8 character

let emailValue = "";
let passwordValue = "";

let listError = [];

// Function
const validationInput = function (type) {
  switch (type) {
    case "email":
      if (emailValue === "") {
        return `Chưa nhập email kìa bạn ơi`;
      }
      if (!regEmail.test(emailValue)) {
        return `Email không đúng định dạng mất rồi`;
      }
      return `Ok`;
    case "password":
      if (passwordValue === "") {
        return `Chưa nhập mật khẩu kìa bạn ơi`;
      }
      if (!regPassword.test(passwordValue)) {
        return `Mật khẩu phải có ít nhất 8 kí tự bao gồm: kí tự in hoa, kí tự thường và chữ số`;
      }
      return `Ok`;
    default:
      break;
  }
};

const handleRenderListError = function (listError) {
  let html = "";
  listError.forEach(
    (error) =>
      (html += `
        <p class="form__notice--text">${error}</p>
      `)
  );
  return html;
};

const handleLoginAccount = function () {
  const objAccount = {
    email: emailValue,
    password: passwordValue,
  };

  // Check login

  // No account in local
  if (!localStorage.getItem("account")) return false;

  const isLoginSuccess = JSON.parse(localStorage.getItem("account")).some(
    (item) => item.email === objAccount.email && item.password === objAccount.password
  );

  if (isLoginSuccess) return true;
  return false;
};

// Event listener
emailElement.addEventListener("input", function (e) {
  emailValue = e.target.value;
});

passwordElement.addEventListener("input", function (e) {
  passwordValue = e.target.value;
});

btnLogin.addEventListener("click", function (e) {
  //   Check validation
  if (validationInput("email") !== "Ok") listError.push(validationInput("email"));
  if (validationInput("password") !== "Ok") listError.push(validationInput("password"));

  // Error validation
  if (listError.length !== 0) {
    notificationContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div class="form__notice active form__notice--error">
      <p class="form__notice--title">Hông bé ơi. Hông cho đăng nhập đâu 🤦‍♀️</p>
      <div class="form__notice--container">
            <button class="button__notice">
                <i class="fa-solid fa-circle-exclamation icon__notice"></i>
            </button>
            <div class="form__notice--content">
                ${handleRenderListError(listError)}
            </div>
        </div>
      </div>
    `
    );
    const iconNoticeList = document.querySelectorAll(".icon__notice");
    iconNoticeList[iconNoticeList.length - 1].style.color = "#fc562d";
    listError = [];
  } else {
    const result = handleLoginAccount();

    // Success
    if (result) {
      notificationContainer.insertAdjacentHTML(
        "beforeend",
        `
        <div class="form__notice active form__notice--success">
          <div class="form__notice--container">
              <button class="button__notice">
                  <i class="fa-solid fa-circle-exclamation icon__notice"></i>
              </button>
              <div class="form__notice--content">
                  <p class="form__notice--title">Đăng nhập thành công 🎉</p>             
                  <p class="form__notice--text">Lưu ý: Tài khoản này chỉ có hiệu lực ở máy của bạn</p>
              </div>
          </div>
        </div>
        `
      );
      const iconNoticeList = document.querySelectorAll(".icon__notice");
      iconNoticeList[iconNoticeList.length - 1].style.color = "#6bbb5c";
      listError = [];

      emailElement.value = "";
      passwordElement.value = "";
      emailElement.focus();
    }
    // Fail
    else {
      notificationContainer.insertAdjacentHTML(
        "beforeend",
        `
        <div class="form__notice active form__notice--error">
        <p class="form__notice--title">Hông bé ơi. Hông cho đăng nhập đâu 🤦‍♀️</p>
        <div class="form__notice--container">
              <button class="button__notice">
                  <i class="fa-solid fa-circle-exclamation icon__notice"></i>
              </button>
              <div class="form__notice--content">
                <p class="form__notice--text">Thông tin tài khoản không chính xác</p>
              </div>
          </div>
        </div>
      `
      );
      const iconNoticeList = document.querySelectorAll(".icon__notice");
      iconNoticeList[iconNoticeList.length - 1].style.color = "#fc562d";
      listError = [];
    }
  }

  const formNoticeList = [...document.querySelectorAll(".form__notice")];
  formNoticeList.forEach((formNotice) => {
    setTimeout(() => {
      formNotice.classList.remove("active");
      setTimeout(() => {
        formNotice.remove();
        // Login success go to the home page
        if (handleLoginAccount()) window.location.href = "./index.html";
      }, 1000);
    }, 3000);
  });
});
