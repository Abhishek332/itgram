import { PROD_KEYS } from "./prod.js";
import { DEV_KEYS } from "./dev.js";

const Keys = () => {
  if (process.env.NODE_ENV === "production") return PROD_KEYS;
  else return DEV_KEYS;
};

export default Keys;
