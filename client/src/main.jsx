import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { BlogProvider } from './context/BlogContext.jsx';
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <BlogProvider>
      <App />
      <Toaster />
    </BlogProvider>
  </BrowserRouter>
);
