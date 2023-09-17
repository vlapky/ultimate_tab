const HTTP_START = "http://";
const HTTPS_START = "https://";

export const formatUrl = (text: string) => {
  if (text.startsWith(HTTP_START) || text.startsWith(HTTPS_START)) {
    return text;
  }

  return HTTP_START + text;
};
