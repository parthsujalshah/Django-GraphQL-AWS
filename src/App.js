import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import Register from "./pages/Register";

function App() {
  return (
    <div style={{alignItems: "center", justifyContent: "center", display: "flex", flex: 1}}>
      <Register />
    </div>
  );
}

export default App;
