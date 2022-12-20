export const calculateOverallEntry = (preData) => {
  return preData.map((d) => {
    const overall =
      Object.entries(d)
        .filter((entry) => entry[0] !== 'city')
        .reduce((acc, value) => acc + value[1], 0) / 6;
    return [d.city, overall];
  });
};

export const data = [
  {
    city: '서울',
    p: 85,
    infra: 89,
    qol: 64,
    esi: 89,
    es: 69,
    ugl: 92,
  },
  {
    city: '인천',
    p: 61,
    infra: 67,
    qol: 43,
    esi: 68,
    es: 48,
    ugl: 89,
  },
  {
    city: '부산',
    p: 54,
    infra: 81,
    qol: 87,
    esi: 77,
    es: 49,
    ugl: 67,
  },
  {
    city: '대전',
    p: 45,
    infra: 54,
    qol: 50,
    esi: 64,
    es: 85,
    ugl: 98,
  },
  {
    city: '대구',
    p: 87,
    infra: 50,
    qol: 40,
    esi: 59,
    es: 41,
    ugl: 78,
  },
  {
    city: '광주',
    p: 45,
    infra: 77,
    qol: 64,
    esi: 49,
    es: 79,
    ugl: 83,
  },
  {
    city: '울산',
    p: 41,
    infra: 85,
    qol: 77,
    esi: 93,
    es: 79,
    ugl: 63,
  },
  {
    city: '세종',
    p: 40,
    infra: 57,
    qol: 44,
    esi: 73,
    es: 51,
    ugl: 51,
  },
  {
    city: '제주도',
    p: 41,
    infra: 89,
    qol: 68,
    esi: 76,
    es: 59,
    ugl: 53,
  },
  {
    city: '경기도',
    p: 55,
    infra: 46,
    qol: 58,
    esi: 61,
    es: 95,
    ugl: 77,
  },
  {
    city: '경상북도',
    p: 66,
    infra: 69,
    qol: 67,
    esi: 71,
    es: 42,
    ugl: 88,
  },
  {
    city: '경상남도',
    p: 47,
    infra: 51,
    qol: 59,
    esi: 55,
    es: 47,
    ugl: 95,
  },
  {
    city: '충청북도',
    p: 56,
    infra: 46,
    qol: 83,
    esi: 71,
    es: 42,
    ugl: 88,
  },
  {
    city: '충청남도',
    p: 99,
    infra: 66,
    qol: 88,
    esi: 79,
    es: 57,
    ugl: 42,
  },
  {
    city: '전라북도',
    p: 79,
    infra: 59,
    qol: 58,
    esi: 63,
    es: 56,
    ugl: 68,
  },
  {
    city: '전라남도',
    p: 78,
    infra: 87,
    qol: 68,
    esi: 58,
    es: 46,
    ugl: 74,
  },
  {
    city: '강원도',
    p: 61,
    infra: 66,
    qol: 86,
    esi: 81,
    es: 67,
    ugl: 46,
  },
]
  .map((d) => {
    d.overall = Math.round(
      Object.entries(d)
        .filter((entry) => entry[0] !== 'city')
        .reduce((acc, value) => acc + value[1], 0) / 6
    );
    return d;
  })
  .sort((a, b) => b.overall - a.overall);
