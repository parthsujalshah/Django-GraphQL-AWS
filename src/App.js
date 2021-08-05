import './App.css';
import 'antd/dist/antd.css';
import LoggedOutMenu from "./containers/LoggedOutMenu";

function App() {
  return (
    <div style={{alignItems: "center", justifyContent: "center", display: "flex", flex: 1}}>
      <LoggedOutMenu />
    </div>
  );
}

export default App;
