export function getCookie(name: string) {
  // Divide a string de cookies em um array
  const cookies = document.cookie.split(";");

  // Itera sobre o array de cookies
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];

    // Remove espaços em branco do início
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }

    // Verifica se este é o cookie que procuramos
    if (cookie.indexOf(name + "=") === 0) {
      // Retorna o valor do cookie (decodificado)
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }

  // Retorna null se não encontrar
  return null;
}
