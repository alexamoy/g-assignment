export const sortByTime = (texts => {
  const sortedTexts = texts.sort((a, b) => a.time - b.time);
  return sortedTexts;
});
