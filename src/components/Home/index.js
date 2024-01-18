import {Link} from 'react-router-dom'

import './index.css'
import Header from '../Header'

const Home = () => (
  <div>
    <Header />
    <div className="HomeContainer">
      <h1 className="Homehead1">Find The Job That Fits Your Life </h1>
      <p className="Homepara1">
        Millions of people are searching for jobs, salary information, company
        reviews. Find th job that fits your ability and potential.
      </p>
      <Link to="/jobs">
        <button className="buttonFindJobs" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
