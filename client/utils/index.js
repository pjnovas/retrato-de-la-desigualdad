const map = {
  "\u00E1": "a",
  "\u00E9": "e",
  "\u00ED": "i",
  "\u00F3": "o",
  "\u00FA": "u"
};

const removeAccents =
  str => str.toLowerCase().replace(/[\u00E1\u00E9\u00ED\u00F3\u00FA]/g,
    c => map[c.replace("\\","")]);

const convertTitleToPath = title => {
  return removeAccents(title).replace(/ /g, "-");
};

const convertPathToTitle = path => {
  return path.toLowerCase().replace(/-/g, " ");
};

export default {
  convertTitleToPath,
  convertPathToTitle,
  removeAccents
};
