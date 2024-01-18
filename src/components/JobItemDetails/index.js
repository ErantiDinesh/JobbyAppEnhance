import './index.css'
import {Link} from 'react-router-dom'
import {BsFillStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {HiLocationMarker} from 'react-icons/hi'

const JobItemDetails = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <Link to={`jobs/${id}`} className="linkJobItem">
      <li className="jobItemContainer">
        <div className="jobItemBox1">
          <img
            src={companyLogoUrl}
            className="companyLogo7"
            alt="website logo"
          />
          <div>
            <h1 className="titleHeaderComp7"> {title} </h1>
            <div className="inn7">
              <BsFillStarFill className="starImageLogo" />
              <p> {rating} </p>
            </div>
          </div>
        </div>

        <div className="jobItemBox2">
          <div className="locationAndType">
            <div className="locationInn">
              <HiLocationMarker className="locationLogo" />
              <p> {location} </p>
            </div>

            <div className="locationInn">
              <BsBriefcaseFill className="locationLogo" />
              <p> {employmentType} </p>
            </div>
          </div>

          <div className="pacakgePara7">
            <p> {packagePerAnnum} </p>
          </div>
        </div>

        <hr />
        <h1 className="des7"> Description </h1>
        <p> {jobDescription} </p>
      </li>
    </Link>
  )
}

export default JobItemDetails
