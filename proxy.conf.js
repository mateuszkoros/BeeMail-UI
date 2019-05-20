const PROXY_CONFIG = [
  {
    context: [
      "/addresses",
      "/get",
      "/send",
      "/delete"
    ],
    target: "https://localhost:1944",
    secure: false
  }
];

module.exports = PROXY_CONFIG;
