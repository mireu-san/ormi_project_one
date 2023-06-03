const form = document.getElementById("questionnaire");
const inputs = form.querySelectorAll("input");
const submitBtn = document.getElementById("submitBtn");
const buttonMessage = document.getElementById("buttonMessage");

const checkInputs = () => {
  let isValid = true;
  inputs.forEach((input) => {
    if (input.value.trim() === "") isValid = false;
  });
  submitBtn.disabled = !isValid;
  buttonMessage.textContent = isValid
    ? ""
    : "모든 칸의 내용을 채워 주셔야 합니다!";
};

inputs.forEach((input) => {
  input.addEventListener("input", checkInputs);
});

form.addEventListener("submit", (e) => {
  checkInputs();
  if (submitBtn.disabled) {
    e.preventDefault();
  }
});
