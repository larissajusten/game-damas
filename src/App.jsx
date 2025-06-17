import { Provider } from "react-redux";
import "./App.scss";
import { store } from "./redux/store";
import { Routes } from "./routes.jsx";

export const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};
