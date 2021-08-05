import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import Login from "./pages/Login";

function App() {
  return (
    <div style={{alignItems: "center", justifyContent: "center", display: "flex", flex: 1}}>
      <Login />
    </div>
  );
}

export default App;
