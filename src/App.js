import './App.css'
import {Route, Switch} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Jobs from './components/Jobs'
import CompanyJobDetails from './components/CompanyJobDetails'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <div>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={CompanyJobDetails} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App
