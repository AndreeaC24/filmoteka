 const htmlElement = document.querySelector('html');
 const langValue = htmlElement.getAttribute('lang');
 const excludedLanguages = ['ae', 'ar', 'arc', 'bcc', 'bqi', 'ckb', 'dv', 'fa', 'glk', 'he', 'ku', 'mzn', 'nqo', 'pnb', 'ps', 'ro', 'sd', 'ug', 'ur', 'yi'];

if (!excludedLanguages.includes(langValue)) {
 htmlElement.style.removeProperty('padding-left');
}
