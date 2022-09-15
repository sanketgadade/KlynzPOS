import logo from "../logo.svg";
import "../App.css";
import Register from "./Register";
import SignIn from "./SignIn";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Routes() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Register} />
        {/* <Route path="/signin" component={SignIn} /> */}
      </div>
    </Router>
  );
}

export default Routes;
