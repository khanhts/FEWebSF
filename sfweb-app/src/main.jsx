import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './services/router/router.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { AuthProvider } from './services/auth/AuthProvider.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router}>
        </RouterProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>,
)
