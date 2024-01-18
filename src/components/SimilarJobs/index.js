import './index.css'
import {Link} from 'react-router-dom'
import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {TiLocation} from 'react-icons/ti'

const SimilarJobs = props => {
  const {similarItemDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = similarItemDetails

  return (
    <Link to={`/jobs/${id}`} className='similarItemsLink'>
      <li className='similarItemBox'>
        <div className='similarBox1'>
          <img
            src={companyLogoUrl}
            className='companyLogoUrlSimilarItems'
            alt='similar job company logo'
          />
          <div className='inner7'>
            <h1 className='headSimilarItemTitle'> {title} </h1>
            <div className='ratingFlex'>
              <BsFillStarFill className='starSimilarLogo' />
              <p> {rating} </p>
            </div>
          </div>
        </div>

        <div className='descriptionItemSimilarbox'>
          <h1 className='headSimilarItemTitle'> Description </h1>
          <p> {jobDescription} </p>
        </div>

        <div className='locationAndTypeSimilarBox'>
          <div className='locationDivBox'>
            <TiLocation className='similarLocotionLogo' />
            <p> {location} </p>
          </div>

          <div className='locationDivBox'>
            <BsFillBriefcaseFill className='similarLocotionLogo' />
            <p> {employmentType} </p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default SimilarJobs
