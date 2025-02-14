const WEB_CONSTANTS = {
  GET: "GET",
  PUT: "PUT",
};

const CORS_ORIGIN = "https://dev-to-rater.xyz";

const CORS_OPTIONS = {
  origin: CORS_ORIGIN,
  methods: [WEB_CONSTANTS.GET, WEB_CONSTANTS.PUT],
};
