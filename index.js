const $form = document.querySelector("form");
const $input = document.querySelector("input");
let input1 = document.getElementById("input1");
let input2 = document.getElementById("input2");
let input3 = document.getElementById("input3");
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
    content: "assistant는 라이트노벨 안내원입니다.",
  },
];

data.push(
  {
    role: "user",
    content: "다음의 조건에 맞는 비슷한 라이트노벨을 추천해 줘.",
    // content: "게임 원신에 대해 알려줘.",
  },
  {
    role: "assistant",
    content:
      // "게임 원신은 원래 미호요 였으나, 최근 호요버스로 사명을 개명했습니다.",
      "당신이 말해준 조건에 맞는 라이트 노벨은 다음과 같습니다.",
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

// input에 입력된 질문 받아오는 함수 -> 질문글 표시.
$input.addEventListener("input", (e) => {
  question = e.target.value;
});

// 사용자의 질문을 객체를 만들어서 push
const sendQuestion = (questions) => {
  if (questions) {
    questions.forEach((question) => {
      data.push({
        role: "user",
        content: question,
      });
      questionData.push({
        role: "user",
        content: question,
      });
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

// 사람에 의해 지정된 답변. (no post request to api)
// json 으로 분리
let humanAnsDict;

axios
  .get("./humanAnsDict.json")
  .then(function (res) {
    humanAnsDict = res.data;
  })
  .catch(function (err) {
    console.log(err);
  });

// humanAnsDict 에 매치되는게 아닐 시,
// openAI 측 api로 요청보내는 함수
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
      // an order of openAI's priority answer option, small #no. means top rated.
      printAnswer(result.data.choices[0].message.content);
    } catch (err) {
      console.log("apiPost 에서 문제 발생. 확인해주세요.", err);
    }
  }
};

// submit - this one works as a submit (전송) button to interact with JS.
$form.addEventListener("submit", (e) => {
  e.preventDefault();

  // let combinedQuestion = `${input1.value} ${input2.value} ${input3.value}`;
  let questionsArray = [input1.value, input2.value, input3.value];
  input1.value = null;
  input2.value = null;
  input3.value = null;

  // $input.value = null;
  // sendQuestion(question);
  sendQuestion(questionsArray);
  // sendQuestion(combinedQuestion);
  apiPost();
  printQuestion();
});
