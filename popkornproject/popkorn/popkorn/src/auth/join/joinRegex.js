
export function charRegex(pwinput) {
    const characterRegex = /^.{8,16}$/;
    if (characterRegex.test(pwinput))
    return true;
  else
    return false;
}

export function specialRegex(pwinput) {
    const specialCharacterRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?]/;
  if (specialCharacterRegex.test(pwinput))
    return true;
  else
    return false;
}

export function letterRegex(pwinput) {
    const letterRegex = /[a-z]/;
  if (letterRegex.test(pwinput))
    return true;
  else
    return false;
}

export function numRegex(pwinput) {
    const numberRegex = /[0-9]/;
  if (numberRegex.test(pwinput))
    return true;
  else
    return false;
}