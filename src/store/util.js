export const addSenderProperty = ((texts, sender) => {
  const editedTexts = texts.map(text => {
    return {...text, sender};
  });
  return editedTexts;
});

