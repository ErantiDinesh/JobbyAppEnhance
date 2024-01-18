import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {IoMdSearch} from 'react-icons/io'
import Header from '../Header'
import FilterEmployment from '../FilterEmployment'
import FilterSalary from '../FilterSalary'
import JobItemDetails from '../JobItemDetails'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'Initial',
  success: 'Success',
  failure: 'Failure',
  loading: 'Loading',
}

class Jobs extends Component {
  state = {
    companieslist: null,
    apistatus: apiStatusConstants.initial,
    profiledata: null,
    apistatus1: apiStatusConstants.initial,
    searchInput: '',
    categories: [],
    salary: '',
  }

  componentDidMount() {
    this.getCompanyList()
    this.getProfileDetails()
  }

  checkboxClicked = id => {
    const {categories} = this.state
    if (categories.includes(id)) {
      const filtered = categories.filter(item => item !== id)
      this.setState({categories: filtered}, this.getCompanyList)
    } else {
      this.setState({categories: [...categories, id]}, this.getCompanyList)
    }
  }

  changeSalary = id => {
    this.setState({salary: id}, this.getCompanyList)
  }

  getsearchedInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getKey = event => {
    console.log(event.key)
    if (event.key === 'Enter') {
      this.getCompanyList()
    }
  }

  searchClicked = () => {
    this.getCompanyList()
  }

  retrypage = () => {
    this.getProfileDetails()
  }

  getCompanyList = async () => {
    const {searchInput, categories, salary} = this.state
    console.log(categories)
    const cat = categories.join(',')
    this.setState({apistatus: apiStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?search=${searchInput}&employment_type=${cat}&minimum_package=${salary}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.status === 200) {
      const data = await response.json()
      const updatedData = data.jobs.map(item => ({
        companyLogoUrl: item.company_logo_url,
        employmentType: item.employment_type,
        jobDescription: item.job_description,
        location: item.location,
        packagePerAnnum: item.package_per_annum,
        rating: item.rating,
        title: item.title,
        id: item.id,
      }))

      this.setState({
        companieslist: updatedData,
        apistatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apistatus: apiStatusConstants.failure})
    }
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response1 = await fetch(url, options)

    if (response1.status === 200) {
      const data1 = await response1.json()
      const updatedData1 = {
        profileImageUrl: data1.profile_details.profile_image_url,
        shortBio: data1.profile_details.short_bio,
        name: data1.profile_details.name,
      }

      this.setState({
        apistatus1: apiStatusConstants.success,
        profiledata: updatedData1,
      })
    } else {
      this.setState({apistatus1: apiStatusConstants.failure})
    }
  }

  viewSuccesView = () => {
    const {companieslist} = this.state
    const lengths = companieslist.length
    return (
      <div>
        {lengths > 0 ? (
          <div>
            <ul className="jobbyAppLists">
              {companieslist.map(item => (
                <JobItemDetails jobDetails={item} key={item.id} />
              ))}
            </ul>
          </div>
        ) : (
          <div className="NOlogoflex">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="NoJobsLogo"
            />
            <h1 className="noJobsStyle"> No Jobs Found </h1>
          </div>
        )}
      </div>
    )
  }

  viewFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failureLogoJobs"
        alt="failure view"
      />
      <h1> Oops! Something Went Wrong </h1>
      <p> We cannot seem to find the page you are looking for </p>

      <button type="button" onClick={this.retrypage}>
        Retry
      </button>
    </div>
  )

  viewLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  viewSuccesProfileView = () => {
    const {profiledata} = this.state
    const {profileImageUrl, shortBio, name} = profiledata
    return (
      <div>
        <img src={profileImageUrl} className="profileImage" alt="profile" />
        <h1 className="jobsHead1"> {name} </h1>
        <p className="jobsPara1"> {shortBio} </p>
      </div>
    )
  }

  renderProfileView = () => {
    const {apistatus1} = this.state
    switch (apistatus1) {
      case apiStatusConstants.success:
        return this.viewSuccesProfileView()
      case apiStatusConstants.failure:
        return this.viewFailureView()
      case apiStatusConstants.loading:
        return this.viewLoadingView()
      default:
        return null
    }
  }

  renderViews = () => {
    const {apistatus} = this.state
    switch (apistatus) {
      case apiStatusConstants.success:
        return this.viewSuccesView()
      case apiStatusConstants.failure:
        return this.viewFailureView()
      case apiStatusConstants.loading:
        return this.viewLoadingView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <div className="jobsContainer">
        <Header />
        <div className="jobBox">
          <div className="jobsbox1">
            <div className="jobsProfile">{this.renderProfileView()}</div>

            <hr className="horizontalLine" />

            <div className="FilterEmployment">
              <h1 className="typeEmpHead"> Type of Employment </h1>
              <ul className="lisiEmoply">
                {employmentTypesList.map(item => (
                  <FilterEmployment
                    employmentDetails={item}
                    key={item.employmentTypeId}
                    checkboxClicked={this.checkboxClicked}
                  />
                ))}
              </ul>
            </div>

            <hr className="horizontalLine" />

            <div className="FilterSalary">
              <h1 className="typeEmpHead"> Salary Range </h1>
              <ul className="lisiEmoply">
                {salaryRangesList.map(item => (
                  <FilterSalary
                    salaryDetails={item}
                    key={item.salaryRangeId}
                    changeSalary={this.changeSalary}
                  />
                ))}
              </ul>
            </div>
          </div>

          <div className="jobBox2">
            <div className="searchHeadBox">
              <input
                type="search"
                placeholder="search"
                value={searchInput}
                onChange={this.getsearchedInput}
                onKeyDown={this.getKey}
                className="searchInput"
              />
              <button
                type="button"
                aria-label="searchButton"
                className="buttonSearch"
                data-testid="searchButton"
                onClick={this.searchClicked}
              >
                <IoMdSearch className="searchImageLogo" />
              </button>
            </div>
            {this.renderViews()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
