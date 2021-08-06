import './App.css';
import 'antd/dist/antd.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import CreateUpdatePost from "./pages/CreateUpdatePost";
import ReadPost from "./pages/ReadPost";
import LoggedInMenu from "./containers/LoggedInMenu";
import LoggedOutMenu from "./containers/LoggedOutMenu";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {

  return (
    <div>
      <BrowserRouter>
        {
          !localStorage.getItem('authToken')
            ?
            <LoggedInMenu />
            :
            <LoggedOutMenu />
        }
        <div style={{ alignItems: "center", justifyContent: "center", display: "flex", flex: 1 }}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/register" exact component={Register} />
            <Route path="/create-post" exact component={() => <CreateUpdatePost createMode={"yes"} />} />
            <Route exact path="/update-post/:postId" component={CreateUpdatePost} />
            <Route exact path="/read-post/:postId" component={ReadPost} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
