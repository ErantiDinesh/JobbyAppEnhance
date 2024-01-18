import './index.css'

const FilterSalary = props => {
  const {salaryDetails, changeSalary} = props
  const {label, salaryRangeId} = salaryDetails

  const onchangedSalary = () => {
    changeSalary(salaryRangeId)
  }

  return (
    <li className="filterListSalary">
      <input
        type="radio"
        id={salaryRangeId}
        name="salaryRange"
        value={salaryRangeId}
        onChange={onchangedSalary}
      />
      <label htmlFor={salaryRangeId}> {label} </label>
    </li>
  )
}

export default FilterSalary
