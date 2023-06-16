// 현재 시간
const date = () => {
  // Timestamp
  const millisecondTime = Date.now(); // new Date().getTime()
  // Timestamp를 Date 객체로 변환
  const currentTime = new Date(millisecondTime);
  return currentTime;
};

exports.date = date;
