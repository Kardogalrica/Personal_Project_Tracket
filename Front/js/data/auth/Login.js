export function ListeningToken() {
    if (document.cookie.split(';').some((item) => item.trim().startsWith('Token='))) {
  console.log('O cookie existe!');
} else {
  window.location.href = 'Login.html'
}
}

export function getCookie(name) {
  let cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}