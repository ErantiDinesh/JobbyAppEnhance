import './index.css'

const Skills = props => {
  const {skillDetails} = props
  const {imageUrl, name} = skillDetails
  return (
    <li className="skillsListItem">
      <img src={imageUrl} className="skillsImageLogo" alt={name} />
      <p> {name} </p>
    </li>
  )
}

export default Skills
