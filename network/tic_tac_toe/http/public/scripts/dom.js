export const ELEMENTS = {
  FORM:'form',
  INPUT: 'input',
  LABEL: 'label',
  BUTTON: 'button',
  SECTION:'section',
  DIV:'div',
  HEADER:'header',
  MAIN:'main',
  H3:'h3'
}

export const createFragment = ([tag, attrs, ...content]) => {
  const element = document.createElement(tag);
  
  for (const [key, value] of Object.entries(attrs)) {
    element.setAttribute(key, value);
  }

  if (!Array.isArray(content[0])) {
    element.textContent = content.toString();
    return element;
  }

  const children = content.map(createFragment);
  element.append(...children);
  return element;
}