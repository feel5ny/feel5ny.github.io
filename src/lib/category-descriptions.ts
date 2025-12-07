// 대카테고리별 설명 정의
// 카테고리 이름(원본)을 키로 사용
export const categoryDescriptions: Record<string, string> = {
  // 예시:
  // 'HTTP': 'HTTP 프로토콜에 대한 포스트들입니다.',
  // 'Communication': '커뮤니케이션에 관한 포스트들입니다.',
    "00_Clean_Code": '클린 코드의 원칙과 리팩토링 방향성을 다룬 글을 모았습니다. 더 나은 코드를 작성하기 위한 지침과 실천 방법을 정리합니다.',
    "01_Web": '프론트엔드 관련 다양한 주제를 다룬 글을 모았습니다. 네트워크, 브라우저, 웹 개발을 위한 코드 지식과 함께 사용자 경험 및 모션 디자인에 관한 이야기를 담았습니다.',
    "02_!Web": '프론트엔드 이외의 주제를 다룬 글을 모았습니다.',
    "03_DevOps": '프론트엔드 개발자는 웹 개발에만 집중하지 않고, 소프트웨어 개발 전체 과정을 이해하며 문제를 찾아내야 합니다. DevOps의 목표는 효율적이고 안정적인 서비스를 제공하는 것으로, 그 과정에서 해결했던 경험들과 필요한 지식들을 모아두었습니다.',
    "04_AARRR": '제품의 현재 상황을 AARRR 지표를 통해 이해한다면, 더 나은 서비스 개발을 위한 의사결정을 내릴 수 있습니다. 이를 위해 관련된 글을 정리해두었습니다.',
    "Personal 🙆": '개인 회고와 프로젝트 회고 글을 모아두었습니다.',
};

export function getCategoryDescription(categoryName: string): string | undefined {
  return categoryDescriptions[categoryName];
}

