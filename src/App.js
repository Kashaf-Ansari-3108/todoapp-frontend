import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './config/router';
import { AlertProvider } from './context/AlertContext';
import AlertPopup from './component/AlertPopup';

function App() {
  
  return (
    <AlertProvider>
    <div className="App">
      <header className="App-header">
      <AlertPopup/>
      <RouterProvider router={router} />
    </header>
    </div>
    </AlertProvider>
  );
}

export default App;
