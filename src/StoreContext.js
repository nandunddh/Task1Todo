import { createContext } from "react";

const StoreContext = createContext({ store: {}, manageStore: () => {} });

export default StoreContext;
