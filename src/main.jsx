import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './api/store.js'
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from './components/Toast/ToastContext.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
  <StrictMode>
    <ToastProvider position="top-right">
    <App />
    </ToastProvider>
  </StrictMode>
  </BrowserRouter>
  </Provider>
)
