if (searchParam) {
      var words = '(' +
            searchParam.split(/\ /).join(' |').split(/\(/).join('\\(').split(/\)/).join('\\)') + '|' +
            searchParam.split(/\ /).join('|').split(/\(/).join('\\(').split(/\)/).join('\\)') +
          ')',
          exp = new RegExp(words, 'gi');
      if (words.length) {
        input = input.replace(exp, "<span class=\"highlight\">$1</span>");
      }
    }
    
    
    .dropdown-menu .highlight {
  color: #FF0000;
  font-weight: bold;
  font-size: 105%;
}
