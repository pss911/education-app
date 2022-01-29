import { createContext } from "react";
import Localbase from "localbase";

export const DbContext = createContext();

export const DbContextProvider = (props) => {
  const db = new Localbase("Study Ship");
  db.config.debug = false;

  return <DbContext.Provider value={db}>{props.children}</DbContext.Provider>;
};
