# 환영합니다!
- 당신은 한 대형 도서관의 문학소녀 견습생에게 이것저것 물어보며 자신의 취향에 맞는 라이트노벨 또는 아니메를 찾아보는 것 입니다.
- This web app uses chatgpt to assist you finding a favourite light novel to anime contents based on your input values. Please contact me via email if you need any inquiry regarding this project in English.
## Miscellaneous
- To run this repository, run live server extension in vscode.
(Ctrl + Shift + P and 'live server: open with live server')
- 질문자의 이전 질문을 기반으로 원하는 라노벨의 취향을 분석하고 있습니다. 화면에서는 추가 질문 시, 이전 내용이 사라지고 있으나 이전 질문 내용을 고려해서 답변하게 됩니다.
## limitation
- 2021년 3분기 까지의 내용에 의거해서 답변이 가능합니다.
- 경우에 따라서는 출판되지 않은 팬픽, 또는 현지 소설을 한글로 번역하는 과정에서 일부 제목의 오역이 있을 수 있습니다.
- client side Vanilla JS 로만 구현이 되어, (예: API key) 보안이 취약합니다. 향후 실사용이 필요하다면, AWS API Gateway 및 백엔드의 프록시 서버를 통해 노출되는 API 키를 숨길 필요가 있습니다.

## Preview
https://mireu-san.github.io/projectLightNovel/

## 폴더 구조
- index.html:
웹 페이지의 기본 레이아웃과 UI 요소를 포함합니다.
DOM 요소들과 연결되어 있고 사용자 입력을 받을 수 있는 폼이 존재합니다.

- main.js:
애플리케이션의 진입점입니다.
다른 JavaScript 파일들을 import하고, 사용자 입력을 처리하고, API와의 통신을 담당합니다.
질문과 답변을 저장하고, 화면에 표시하는 역할을 수행합니다.

- api.js:
API와의 통신을 위한 코드가 포함되어 있습니다.
axios를 사용하여 API에 POST 요청을 보내고, 결과를 받아옵니다.

- dom.js:
DOM 요소들과 관련된 코드가 포함되어 있습니다.
HTML의 DOM 요소들을 변수로 가져오고, 다른 파일에서 사용할 수 있도록 export합니다.

- questionnaire.js:
질문지와 관련된 코드가 포함되어 있습니다.
입력값의 유효성 검사와 이벤트 처리를 담당합니다.

- ui.js:
사용자 인터페이스(UI)와 관련된 코드가 포함되어 있습니다.
화면에 질문과 답변을 출력하고, 로딩 효과를 보여주는 함수들이 정의되어 있습니다.

- style.css:
웹 페이지의 스타일과 레이아웃을 정의한 CSS 파일입니다.