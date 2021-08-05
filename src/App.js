import './App.css';
import 'antd/dist/antd.css';
import LoggedInMenu from "./containers/LoggedInMenu";

function App() {
  return (
    <div style={{alignItems: "center", justifyContent: "center", display: "flex", flex: 1}}>
      <LoggedInMenu />
    </div>
  );
}

export default App;
