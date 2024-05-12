const formData = {
  email: "",
  title: "",
  text: "",
  checkbox: false,
};

let clicks = 0;

// Последовательность действий:
// 1) Происходит submit любой из форм
// 2) Все данные из 4х полей со страницы переходят в свойства объекта formData
// 3) Запускается функция validateFormData с этим объектом, возвращает true/false
// 4) Если на предыдущем этапе true, то запускается функция checkFormData с этим объектом

const emailData = document
  .querySelector("#submit1")
  .addEventListener("click", formEmailData);
const otherData = document
  .querySelector("#submit2")
  .addEventListener("click", formOtherData);

function formEmailData(event) {
  event.preventDefault();
  formData.email = document.getElementById("email").value || "";

  clicks++;
  validate(clicks);
}

function formOtherData(event) {
  event.preventDefault();
  formData.title = document.getElementById("title").value || "";
  formData.text = document.getElementById("text").value || "";
  formData.checkbox = document.getElementById("checkbox").checked || false;

  clicks++;
  validate(clicks);
}

function validate(clicks) {
  if (clicks >= 2) {
    if (validateFormData(formData)) {
      checkFormData(formData);
    }
  }
}

function validateFormData(data) {
  const condition =
    data.email && data.title && data.text && data.checkbox === true
      ? true
      : false;
  // Если каждое из свойств объекта data правдиво...
  if (condition) {
    return true;
  } else {
    console.log("Please, complete all fields");
    return false;
  }
}

function checkFormData(data) {
  const { email } = data;
  const emails = ["example@gmail.com", "example@ex.com", "admin@gmail.com"];

  const condition = emails.filter((e) => e === email).length > 0;
  // Если email совпадает хотя бы с одним из массива
  if (condition) {
    console.log("This email is already exist");
  } else {
    console.log("Posting data...");
  }
}
