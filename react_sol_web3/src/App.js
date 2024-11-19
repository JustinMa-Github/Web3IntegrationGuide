import logo from './logo.svg';
import './App.css';
import useWeb3 from './contract/useWeb3'; 

function App() {
  const { isConnected, publicKey, connection, connect, disconnect } = useWeb3();
  console.log('context:', {isConnected, publicKey, connection, connect});

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={connect}>Connect</button>
        <button onClick={disconnect}>Disconnect</button>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
