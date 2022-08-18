const CertType: Record<string, string> = {
  '1010': '身份证',
  '1070': '港澳证件',
  '1160': '台湾证件',
  '1052': '外籍护照',
};

export const getCertType = (value: string) => {
  if (Object.keys(CertType).includes(value)) {
    return CertType[value] + ':';
  } else {
    return '';
  }
};
