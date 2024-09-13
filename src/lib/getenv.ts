interface API {
  API_KEY: string;
  API_URL: string;
  MODEL: string;
}

const envVariables: API = {
  API_KEY: process.env.API_KEY || "",
  API_URL: process.env.API_URL || "",
  MODEL: process.env.MODEL || "",
};

export { envVariables };
