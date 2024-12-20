// 금액에 따른 메시지 그룹
const messagesByPrice = {
    5: [
      "당신의 선택이 옳은 결과를 가져올 것입니다!",
      "기회는 준비된 사람에게 찾아옵니다. 오늘도 준비를 소홀히 하지 마세요.",
      "작은 변화가 큰 성과를 가져올 수 있는 하루입니다.",
      "긍정적인 태도가 행운을 불러옵니다. 미소를 잃지 마세요!",
      "오늘은 새로운 시작에 최적의 날입니다. 첫발을 내딛어 보세요.",
      "좋은 소식이 당신을 기다리고 있으니 기대감을 가져보세요!",
      "열정이 당신을 성공으로 이끌 것입니다.",
      "어려움이 다가오더라도 끝까지 포기하지 마세요. 보상이 따릅니다.",
      "다른 사람의 의견을 경청하면 귀중한 교훈을 얻을 수 있습니다.",
      "작은 친절이 큰 행운을 가져올 것입니다.",
      "오늘 당신이 하는 선택이 미래의 큰 변화를 가져올 것입니다.",
      "모든 일에는 적절한 시기가 있습니다. 오늘은 인내심을 발휘할 날입니다.",
      "행복은 가까이에 있습니다. 주변의 소소한 즐거움을 놓치지 마세요!",
      "팀워크가 중요합니다. 주변 사람들과 협력하는 하루를 만들어 보세요.",
      "예상치 못한 좋은 일이 당신을 찾아올 것입니다!",
      "당신의 노력은 결코 헛되지 않습니다. 조금만 더 힘내세요.",
      "오늘은 새로운 기술을 배워보기에 적합한 날입니다.",
      "자신을 믿는 것이 모든 성공의 시작입니다. 자신감을 가지세요!",
      "사소한 일에도 최선을 다하면 큰 성취로 이어질 것입니다.",
      "평소 놓쳤던 기회를 다시 잡아보세요.",
      "오늘은 당신의 날입니다. 자신을 믿으세요!",
      "작은 목표라도 꾸준히 하면 큰 성과를 이룹니다.",
      "아침의 시작이 하루의 기운을 결정합니다.",
      "깊은 숨을 들이마시고 차분히 시작하세요.",
      "감사한 마음이 긍정적인 하루를 만듭니다.",
      "어제의 실수는 오늘의 교훈이 됩니다.",
      "목표는 분명히, 행동은 신중히 하세요.",
      "오늘도 당신은 성장하고 있습니다.",
      "스스로를 응원하는 마음이 중요합니다.",
      "모든 시작은 작지만, 결과는 위대할 수 있습니다.",
      "작은 일에도 최선을 다하세요.",
      "행복은 노력 속에서 만들어집니다.",
      "긍정적인 마음가짐이 변화를 이끕니다.",
      "오늘도 당신의 열정은 빛날 것입니다.",
      "시간을 효율적으로 관리하는 하루를 보내세요.",
      "쉬는 것도 생산적인 하루를 위한 준비입니다.",
      "새로운 아이디어를 환영하는 자세를 가지세요.",
      "오늘도 최선을 다하고 나를 칭찬해 보세요.",
      "목표를 떠올리며 하루를 설계하세요.",
      "자신의 가치를 믿고 행동하세요.",
    ],
    10: [
      "공부 계획을 세우고 우선순위를 정하세요.",
      "25분 공부, 5분 휴식의 '포모도로 기법'을 활용해 보세요.",
      "핸드폰은 최대한 멀리 두고 집중하세요.",
      "공부에 필요한 모든 준비물을 미리 챙겨두세요.",
      "매일 같은 시간에 공부하는 습관을 만들어 보세요.",
      "어려운 과목부터 시작해서 집중력을 활용하세요.",
      "학습 목표를 구체적으로 설정하고 기록하세요.",
      "공부한 내용을 소리 내어 설명하며 복습하세요.",
      "이해가 어려운 내용은 그림이나 도표로 정리해 보세요.",
      "공부 환경을 깨끗하고 정돈된 상태로 유지하세요.",
      "친구들과 스터디 그룹을 만들어 서로 도움을 주고받으세요.",
      "단기 목표를 이루면 자신에게 작은 보상을 주세요.",
      "이해한 내용을 스스로 퀴즈 형태로 만들어 보세요.",
      "최대한 같은 장소에서 공부해 익숙한 환경을 만드세요.",
      "물이나 간단한 간식을 곁에 두어 에너지를 유지하세요.",
      "매일 복습 시간을 정해 학습 내용을 정리하세요.",
      "짧은 시간 집중할 수 있는 '딥 워크'를 시도해 보세요.",
      "공부 시간과 휴식 시간을 명확히 구분하세요.",
      "성취감을 높이기 위해 공부한 양을 체크리스트로 기록하세요.",
      "가장 생산적인 시간대를 찾아 공부에 활용하세요.",
      "배운 내용을 손으로 직접 써보며 정리하세요.",
      "다른 사람에게 설명한다고 생각하며 공부해 보세요.",
      "중요한 부분은 색깔 있는 펜이나 형광펜으로 표시하세요.",
      "실수한 문제를 따로 정리한 '오답 노트'를 만들어 보세요.",
      "너무 오래 앉아 있지 말고 스트레칭으로 몸을 풀어주세요.",
      "이해가 잘 안 되는 부분은 인터넷 강의나 참고서를 활용하세요.",
      "자기 전에 하루 공부 내용을 복습하는 시간을 가지세요.",
      "마감 시간을 정해두고 집중력을 높이세요.",
      "책상에 공부와 관련 없는 물건은 치워두세요.",
      "학습에 필요한 배경지식을 미리 공부해 두세요.",
      "수면을 충분히 취해 머리를 맑게 유지하세요.",
      "음악이 집중에 도움이 된다면 무반주 음악을 들어보세요.",
      "실수를 두려워하지 말고 과감하게 문제를 풀어보세요.",
      "필요하다면 목표를 더 세분화해 작은 성공을 만들어 보세요.",
      "친구나 선생님에게 질문을 주저하지 말고 배우세요.",
      "체계적인 시간 관리를 위해 공부 타이머를 사용하세요.",
      "같은 주제를 여러 번 반복해 학습하며 익숙해지세요.",
      "과목별로 정해진 시간에 맞춰 교차 학습을 시도해 보세요.",
      "잠시 답답할 땐 산책하며 머리를 식히세요.",
      "책이나 노트를 정리하며 핵심 내용을 요약해 보세요."
    ],
    15: [
      "아침을 긍정적인 마음으로 시작하세요.",
      "작은 일이라도 꾸준히 실천하는 습관을 가지세요.",
      "목표를 구체적으로 설정하고 실천 계획을 세우세요.",
      "다른 사람의 이야기를 경청하며 존중하세요.",
      "감사한 일을 하루에 세 가지씩 기록하세요.",
      "스트레스 상황에서도 냉정을 유지하려 노력하세요.",
      "소중한 사람들에게 자주 감사와 사랑을 표현하세요.",
      "경제적 여유를 위해 소득의 일부를 저축하세요.",
      "운동과 균형 잡힌 식사를 통해 건강을 유지하세요.",
      "책을 읽거나 새로운 것을 배우는 시간을 만드세요.",
      "일과 삶의 균형을 맞추는 데 집중하세요.",
      "실패를 두려워하지 말고 경험으로 받아들이세요.",
      "작은 성취에도 자신을 칭찬하며 동기를 부여하세요.",
      "삶의 방향성을 잃지 않도록 정기적으로 목표를 점검하세요.",
      "문제를 피하기보다는 차근차근 해결하려 노력하세요.",
      "여유가 생기면 여행을 통해 새로운 경험을 쌓으세요.",
      "소비를 줄이고 필요한 것에만 돈을 쓰세요.",
      "자기만의 휴식 방법을 찾아 스트레스를 관리하세요.",
      "불필요한 걱정보다 현재의 행동에 집중하세요.",
      "도움이 필요할 땐 주저 말고 주변 사람들에게 요청하세요.",
      "중요한 결정을 내릴 땐 충분히 고민하고 신중하게 행동하세요.",
      "좋은 관계는 신뢰와 소통에서 시작됩니다.",
      "시간은 소중한 자원입니다. 효율적으로 사용하세요.",
      "어려운 시기를 겪을 땐 스스로를 다독이며 버티세요.",
      "사람들에게 친절하고 따뜻하게 대하세요.",
      "과거를 후회하기보다는 미래를 계획하세요.",
      "매일 조금씩이라도 자신을 발전시킬 방법을 찾아보세요.",
      "자신의 장점과 단점을 정확히 이해하세요.",
      "자신의 감정을 억누르지 말고 건강하게 표현하세요.",
      "다양한 관점을 받아들이는 열린 마음을 가지세요.",
      "혼자 있는 시간을 통해 스스로를 돌아보세요.",
      "어려운 상황에서도 유머 감각을 잃지 마세요.",
      "실수는 누구나 합니다. 스스로를 너무 자책하지 마세요.",
      "시간을 투자해 자신만의 기술이나 취미를 개발하세요.",
      "환경이나 상황을 탓하기보다는 스스로 변화를 만들어 보세요.",
      "작은 기쁨을 찾아 하루를 풍요롭게 만드세요.",
      "관계에서 생기는 갈등은 열린 대화로 풀어보세요.",
      "자신의 건강과 행복을 우선순위로 두세요.",
      "모든 일에 완벽을 추구하기보다는 적당한 균형을 찾으세요.",
      "매 순간을 소중히 여기며 현재를 즐기세요."
    ],
  };

  export default messagesByPrice;