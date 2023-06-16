 const htmlElement = document.querySelector('html');
 
const excludedLanguages = [
  'ae',
  'ar',
  'arc',
  'bcc',
  'bqi',
  'ckb',
  'dv',
  'fa',
  'glk',
  'he',
  'ku',
  'mzn',
  'nqo',
  'ro',
  'pnb',
  'ps',
  'sd',
  'ug',
  'ur',
  'yi'
];

 if (!excludedLanguages.includes(htmlElement.lang)) { 
  htmlElement.style.paddingLeft = null;
}
