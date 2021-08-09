import React from "react";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import { AuthProvider } from "./context/auth";
import Signup from "./pages/Signup/Signup";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <ProtectedRoute
              exact
              path="/login"
              component={Login}
            ></ProtectedRoute>
            <ProtectedRoute
              exact
              path="/register"
              component={Signup}
            ></ProtectedRoute>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
