import { createRoot } from 'react-dom/client'
import './assets/styles/main.scss'
import { Provider } from 'react-redux'
import {RouterProvider} from "react-router-dom";
import router from './router/Router.jsx'
import {store} from './store/store.js'
import './Translation/i18n.js';

createRoot(document.getElementById('root')).render(
  <Provider  store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
