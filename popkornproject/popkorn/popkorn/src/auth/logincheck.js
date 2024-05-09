
export const emcheck = { value: false };
export const pwcheck = { value: false };

export const emCheck = (emailinput) => {
  const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|kr|jp|net|ru|edu|cz|de)$/i

  if (emailinput.replace(emailRegEx, '').length > 0) {
    return false;
  } else {
    return true;
  }
};

export function pwCheck(pwinput) {
  const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/
  if (passwordRegEx.test(pwinput))
    return true;
  else
    return false;
}

export function resetChecks() {
  emcheck.value = false;
  pwcheck.value = false;
}

export function areChecksValid() {
  return emcheck.value && pwcheck.value;
}

export default 
  emCheck;

