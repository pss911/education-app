import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import {
  HomePage,
  CreateQuizPage,
  CreateQuizOriginalPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  VerifyAccountPage,
} from "./pages";

// Routing
import PrivateRoute from "./routes/PrivateRoute";
import { ToastContextProvider } from "./contexts/toastContext";
import { DbContextProvider } from "./contexts/dbContext";

function App() {
  return (
    <ToastContextProvider>
      <DbContextProvider>
        <Router className="App">
          <Switch>
            <PrivateRoute exact path="/home" component={HomePage} />
            <PrivateRoute
              exact
              path="/create"
              component={CreateQuizOriginalPage}
            />
            <PrivateRoute
              exact
              path="/drafts/:draftId"
              component={CreateQuizPage}
            />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route
              exact
              path="/forgotpassword"
              component={ForgotPasswordPage}
            />
            <Route
              exact
              path="/verify/:verifyToken"
              component={VerifyAccountPage}
            />
            <Route
              exact
              path="/resetpassword/:resetToken"
              component={ResetPasswordPage}
            />
          </Switch>
        </Router>
      </DbContextProvider>
    </ToastContextProvider>
  );
}

export default App;
