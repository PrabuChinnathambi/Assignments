import logo from './logo.svg';
import './App.css';
import VideoUploader from './components/VideoUploadPage/VideoUploader';
import LoginPage from './components/LoginPage/LoginPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import TableData from './components/TablePage/TableData';
import Home from './components/Home/Home';
// import Navbar from './components/Navbar/Navbar';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/home" component={Home} />
          <Route path="/tableData" component={TableData} />
          <Route path="/fileUpload" component={VideoUploader} />
          {/* <Route path="/navbar" component={Navbar} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
