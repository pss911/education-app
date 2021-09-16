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

function App() {
  return (
    <Router className="App">
      <Switch>
        <PrivateRoute exact path="/home" component={HomePage} />
        <PrivateRoute exact path="/create" component={CreateQuizOriginalPage} />
        <PrivateRoute
          exact
          path="/drafts/:draftId"
          component={CreateQuizPage}
        />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/forgotpassword" component={ForgotPasswordPage} />
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
  );
}

export default App;
