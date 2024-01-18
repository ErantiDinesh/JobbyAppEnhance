import './index.css'

const FilterEmployment = props => {
  const {employmentDetails, checkboxClicked} = props
  const {label, employmentTypeId} = employmentDetails

  const oncheckBoxClicked = () => {
    checkboxClicked(employmentTypeId)
  }
  return (
    <li className="listItemsEmploy">
      <input
        type="checkbox"
        id={employmentTypeId}
        onChange={oncheckBoxClicked}
      />
      <label htmlFor={employmentTypeId} className="emplab7">
        {label}
      </label>
    </li>
  )
}

export default FilterEmployment
