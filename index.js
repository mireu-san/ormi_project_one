const $form = document.querySelector("form");
// const $input = document.querySelector("input");
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
    content:
      "assistant는 라이트노벨 안내원입니다. 라이트노벨에 한정되지 않고, 모든 서브컬쳐류 작품, 미디어를 알려줄 수 있지만, 실사 드라마 영화는 제외합니다. 주어지는 질문은 크게 3가지이며 다음과 같습니다. 첫째. 좋아하는 장르 둘째. 최근에 읽은 라이트 노벨 또는 만화 제목. 셋째. 이야기의 분위기는 어떤 편이 좋은지?",
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

// 화면에 뿌려줄 데이터, 질문들
let questionData = [];

// input에 입력된 질문 받아오는 함수 -> 질문글 표시.
// $input.addEventListener("input", (e) => {
//   question = e.target.value;
// });

input1.addEventListener("input", (e) => {
  question = `${input1.value} ${input2.value} ${input3.value}`;
});

input2.addEventListener("input", (e) => {
  question = `${input1.value} ${input2.value} ${input3.value}`;
});

input3.addEventListener("input", (e) => {
  question = `${input1.value} ${input2.value} ${input3.value}`;
});

const sendQuestion = (question) => {
  if (question) {
    data.push({
      role: "user",
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
  // chatgpt 답변 frontend 쪽에 표시
  let li = document.createElement("li");
  li.classList.add("answer");
  li.innerText = answer;
  $chatList.appendChild(li);

  // 클립보트로 복사 버튼
  let copyButton = document.createElement("button");
  // style 을 위한 클래스 부여
  copyButton.classList.add("copyButton");
  copyButton.innerText = "이 답변 내용을 복사합니다.";
  copyButton.addEventListener("click", () => {
    // 클립보드에 진짜로 해당 답변을 복사
    navigator.clipboard
      .writeText(answer)
      .then(() => {
        console.log(
          "printAnswer -> copyButton, navigator : 클립보드 복사 성공"
        );
      })
      .catch((err) => {
        console.log("뭔가 잘못되었습니다. printAnswer -> copyButton", err);
      });
  });
  $chatList.appendChild(copyButton);
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

  let combinedQuestion = `${input1.value} ${input2.value} ${input3.value}`;
  input1.value = null;
  input2.value = null;
  input3.value = null;
  // $input.value = null;
  // sendQuestion(question);
  // sendQuestion(questionsArray);
  sendQuestion(combinedQuestion);
  apiPost();
  printQuestion();
});
