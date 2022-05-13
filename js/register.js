const nameElement = document.querySelector("#form__name");
const emailElement = document.querySelector("#form__email");
const mobilePhoneElement = document.querySelector("#form__mobile--number");
const passwordElement = document.querySelector("#form__password");

const notificationContainer = document.querySelector(".notification__container");
const btnRegister = document.querySelector(".btn__sign--up");

// Regex
// const regName = /^[a-zA-Z ]+$/;
const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
const regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/; // should contain at least one digit, one lower case, one upper case, 8 character

let nameValue = "";
let emailValue = "";
let mobilePhoneValue = "";
let passwordValue = "";

let listError = [];

// Function
const validationInput = function (type) {
  switch (type) {
    case "name":
      if (nameValue === "") {
        return `Chưa nhập họ và tên kìa bạn ơi`;
      }
      return `Ok`;

    case "email":
      if (emailValue === "") {
        return `Chưa nhập email kìa bạn ơi`;
      }
      if (!regEmail.test(emailValue)) {
        return `Email không đúng định dạng mất rồi`;
      }
      return `Ok`;

    case "phone":
      if (mobilePhoneValue === "") {
        return `Chưa nhập số điện thoại kìa bạn ơi`;
      }
      if (!regPhoneNumber.test(mobilePhoneValue)) {
        return `Số điện thoại này pha ke rồi`;
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

const handleRegisterAccount = function () {
  const objAccount = {
    name: nameValue,
    email: emailValue,
    phone: mobilePhoneValue,
    password: passwordValue,
  };

  // Local has not account (Fisrt time create account)
  if (!localStorage.getItem("account")) {
    localStorage.setItem("account", JSON.stringify([objAccount]));
    return true;
  } else {
    const isDuplicated = JSON.parse(localStorage.getItem("account")).some((item) => item.email === objAccount.email);

    if (isDuplicated) {
      // Has duplicated email => Notice error
      return false;
    } else {
      // Not duplicated => Register success
      localStorage.setItem("account", JSON.stringify([...JSON.parse(localStorage.getItem("account")), objAccount]));
      return true;
    }
  }
};

// Event listener input
nameElement.addEventListener("input", function (e) {
  nameValue = e.target.value;
});

emailElement.addEventListener("input", function (e) {
  emailValue = e.target.value;
});

mobilePhoneElement.addEventListener("input", function (e) {
  mobilePhoneValue = e.target.value;
});

passwordElement.addEventListener("input", function (e) {
  passwordValue = e.target.value;
});

btnRegister.addEventListener("click", function (e) {
  //   Check validation
  if (validationInput("name") !== "Ok") listError.push(validationInput("name"));
  if (validationInput("email") !== "Ok") listError.push(validationInput("email"));
  if (validationInput("phone") !== "Ok") listError.push(validationInput("phone"));
  if (validationInput("password") !== "Ok") listError.push(validationInput("password"));

  // Error validation
  if (listError.length !== 0) {
    notificationContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div class="form__notice active form__notice--error">
      <p class="form__notice--title">Hông bé ơi. Hông cho đăng ký đâu 🤦‍♀️</p>
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
    const result = handleRegisterAccount();

    if (result) {
      // No duplicate email (Success)
      notificationContainer.insertAdjacentHTML(
        "beforeend",
        `
        <div class="form__notice active form__notice--success">
          <div class="form__notice--container">
              <button class="button__notice">
                  <i class="fa-solid fa-circle-exclamation icon__notice"></i>
              </button>
              <div class="form__notice--content">
                  <p class="form__notice--title">Chúc mừng bạn đã có tài khoản 🎉</p>             
                  <p class="form__notice--text">Lưu ý: Tài khoản này chỉ có hiệu lực ở máy của bạn</p>
              </div>
          </div>
        </div>
        `
      );
      const iconNoticeList = document.querySelectorAll(".icon__notice");
      iconNoticeList[iconNoticeList.length - 1].style.color = "#6bbb5c";
      listError = [];

      nameElement.value = "";
      emailElement.value = "";
      mobilePhoneElement.value = "";
      passwordElement.value = "";
      nameElement.focus();
    } else {
      // Duplicate email (Error)
      notificationContainer.insertAdjacentHTML(
        "beforeend",
        `
        <div class="form__notice active form__notice--error">
        <p class="form__notice--title">Hông bé ơi. Hông cho đăng ký đâu 🤦‍♀️</p>
        <div class="form__notice--container">
              <button class="button__notice">
                  <i class="fa-solid fa-circle-exclamation icon__notice"></i>
              </button>
              <div class="form__notice--content">
                <p class="form__notice--text">Emai này đã được sử dụng</p>
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
      }, 1000);
    }, 3000);
  });
});
