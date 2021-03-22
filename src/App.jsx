import { Provider } from 'react-redux'
import { Routes } from './routes.jsx'
import { store } from './redux/store'
import './App.scss'

export const App = () => (
  <Provider store={store}>
    <Routes/>
  </Provider>
)
