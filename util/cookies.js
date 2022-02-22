import Cookies from 'js-cookie';

export function getParsedCookie(key) {
  const cookieValue = Cookies.get(key); // Type is string | undefined

  // Narrowing
  if (!cookieValue) {
    return undefined;
  }

  try {
    return JSON.parse(Cookies.get(key)); // Type is string
  } catch (err) {
    return undefined;
  }
}

// type LikedAnimal = { id: string, stars: number };
// type LikedAnimals = LikedAnimal[];

export function setParsedCookie(key, value) {
  Cookies.set(key, JSON.stringify(value));
}

export function deleteCookie(key) {
  Cookies.remove(key);
}

export function stringifyCookieValue(value) {
  return JSON.stringify(value);
}
