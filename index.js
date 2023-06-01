const $form = document.querySelector("form");
const $input = document.querySelector("input");
const $chatList = document.querySelector("ul");

// openAI API
// This is temporary key. Document strongly not recommend to leave it like here.
let url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

// 사용자의 질문
// This one works as receiver and display it as confirmed. #2
let question;

// https://community.openai.com/t/the-system-role-how-it-influences-the-chat-behavior/87353
// 질문과 답변 저장
let data = [
  {
    role: "system",
    content:
      "assistant는 안내원입니다. 대화의 마지막 끝부분 마다 '냥' 을 붙이세요.",
  },
];

data.push(
  {
    role: "user",
    content: "게임 원신에 대해 알려줘.",
  },
  {
    role: "assistant",
    content:
      "게임 원신은 원래 미호요 였으나, 최근 호요버스로 사명을 개명했습니다.",
  }
);

// fetch(url, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(data2),
//   redirect: "follow",
// })
//   .then((res) => res.json())
//   .then((res) => {
//     console.log(res);
//     console.log(res.choices[0].message.content);
//   });

// 화면에 뿌려줄 데이터, 질문들
let questionData = [];

// input에 입력된 질문 받아오는 함수
$input.addEventListener("input", (e) => {
  question = e.target.value;
});

// 사용자의 질문을 객체를 만들어서 push
const sendQuestion = (question) => {
  if (question) {
    data.push({
      role: "system",
      content: question,
    });
    questionData.push({
      role: "user",
      content: question,
    });
  }
};

// 화면에 질문 그려주는 함수
const printQuestion = async () => {
  if (question) {
    let li = document.createElement("li");
    li.classList.add("question");
    questionData.map((el) => {
      li.innerText = el.content;
    });
    $chatList.appendChild(li);
    questionData = [];
    question = false;
  }
};

// 화면에 답변 그려주는 함수
const printAnswer = async (answer) => {
  let li = document.createElement("li");
  li.classList.add("answer");
  li.innerText = answer;
  $chatList.appendChild(li);
};

// 사람에 의해 지정된 답변. (인공지능 무시, 요청 없음.)
// json 으로 분리하기.
const humanAnsDict = {
  벤티: "벤티는 원신의 바르바토스 입니다.",
};

// api 요청보내는 함수
const apiPost = async () => {
  const reservedAnswer = humanAnsDict[question];

  if (reservedAnswer) {
    printAnswer(reservedAnswer);
  } else {
    const result = await axios({
      method: "post",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });
    try {
      console.log("apiPost에서 result.data :", result.data);
      printAnswer(result.data.choices[0].message.content);
    } catch (err) {
      console.log("apiPost 에서 문제 발생. 확인해주세요.", err);
    }
  }
};

// submit - this one works as a submit (전송) button to interact with JS.
$form.addEventListener("submit", (e) => {
  e.preventDefault();
  $input.value = null;
  sendQuestion(question);
  apiPost();
  printQuestion();
});
