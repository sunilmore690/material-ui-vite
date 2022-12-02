export const API_ENDPOINT = "http://localhost:9440/api";
export const PARSE_FILE_ENDPOINT =
  "http://localhost:1337/parse/files/inspacco-parse-server/";
function updateOptions(options) {
  return {
    headers: {
      apiKey: "inspacco-parse-server-api-key",
    },
  };
}

export default function fetcher(url, options) {
  return fetch(url, updateOptions(options));
}
