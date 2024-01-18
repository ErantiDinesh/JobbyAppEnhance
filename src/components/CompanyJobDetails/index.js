import {Component} from 'react'
import {BsBriefcaseFill, BsFillStarFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import {TiLocation} from 'react-icons/ti'
import {FaRegShareSquare} from 'react-icons/fa'

import Cookies from 'js-cookie'
import Skills from '../Skills'
import SimilarJobs from '../SimilarJobs'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'Initial',
  success: 'Success',
  failure: 'Failure',
  loading: 'Loading',
}

class CompanyJobDetails extends Component {
  state = {companyItemDetailList: null, apistatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getEachCompanyDetails()
  }

  onRetryClicked = () => {
    this.getEachCompanyDetails()
  }

  getEachCompanyDetails = async () => {
    this.setState({apistatus: apiStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    console.log('Hello')
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.status === 200) {
      const data = await response.json()

      const updatedData = {
        companyLogoUrl: data.job_details.company_logo_url,
        id: data.job_details.id,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        skills: data.job_details.skills.map(item => ({
          imageUrl: item.image_url,
          name: item.name,
        })),
        similarJobs: data.similar_jobs.map(item => ({
          companyLogoUrl: item.company_logo_url,
          employmentType: item.employment_type,
          jobDescription: item.job_description,
          location: item.location,
          id: item.id,
          rating: item.rating,
          title: item.title,
        })),
      }
      console.log(updatedData)
      this.setState({
        companyItemDetailList: updatedData,
        apistatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apistatus: apiStatusConstants.failure})
    }
  }

  renderFailureCompanyItemView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1> Oops!Something Went Wrong </h1>
      <p> We cannot seem to find the page you are looking for </p>
      <button type="button" onClick={this.onRetryClicked}>
        {' '}
        Retry{' '}
      </button>
    </>
  )

  renderLoadingCompanyItemView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessCompanyItemView = () => {
    const {companyItemDetailList} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      lifeAtCompany,
      skills,
      similarJobs,
    } = companyItemDetailList
    return (
      <div className="mainCompanyContainer">
        <div className="innerCompany1">
          <div className="oneOneCom">
            <img
              src={companyLogoUrl}
              className="comImageLogo"
              alt="job details company logo"
            />
            <div className="oneCom">
              <h1> {title} </h1>
              <div className="twoCom">
                <BsFillStarFill className="starLogoStyle" />
                <p> {rating} </p>
              </div>
            </div>
          </div>

          <div className="twotwoCom">
            <div className="locationItem">
              <div className="locationCom">
                <TiLocation className="locImageLogoCom" />
                <p> {location} </p>
              </div>
              <div className="locationCom">
                <BsBriefcaseFill className="locImageLogoCom" />
                <p> {employmentType} </p>
              </div>
            </div>
            <p className="pacakgeCom"> {packagePerAnnum} </p>
          </div>

          <hr />

          <div className="descriptionBox">
            <div className="descrip1">
              <h1 className="headdes1"> Description </h1>
              <a
                href={companyWebsiteUrl}
                target="_blank"
                rel="noreferrer"
                className="VistPara1"
              >
                Visit
                <FaRegShareSquare className="imager7" />
              </a>
            </div>
            <p className="jobDes1"> {jobDescription} </p>
          </div>

          <div className="skillsBox">
            <h1 className="skillsHead1"> Skills </h1>
            <ul className="SkillItemsLogosANdNames">
              {skills.map(item => (
                <Skills skillDetails={item} key={item.name} />
              ))}
            </ul>
          </div>

          <div className="CompanyLifeBox">
            <h1 className="skillsHead1"> Life at Company </h1>
            <div className="companyBoxLife1">
              <p className="comParaLife1"> {lifeAtCompany.description} </p>
              <img
                src={lifeAtCompany.imageUrl}
                className="companyLifeImage1"
                alt="Website logo"
              />
            </div>
          </div>
        </div>
        <h1 className="skillsHead1"> Similar Jobs </h1>

        <div className="similarJobsBox">
          <ul className="similarItemsflex">
            {similarJobs.map(item => (
              <SimilarJobs similarItemDetails={item} key={item.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderJobDetailedViews = () => {
    const {apistatus} = this.state
    switch (apistatus) {
      case apiStatusConstants.success:
        return this.renderSuccessCompanyItemView()
      case apiStatusConstants.failure:
        return this.renderFailureCompanyItemView()
      case apiStatusConstants.loading:
        return this.renderLoadingCompanyItemView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderJobDetailedViews()}
      </div>
    )
  }
}

export default CompanyJobDetails
