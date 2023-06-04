
function generateRegexFromInput(input: string): RegExp {
  const escapedInput = input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regexString = `^${escapedInput}$`;
  return new RegExp(regexString, 'i');
}
