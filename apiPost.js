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
