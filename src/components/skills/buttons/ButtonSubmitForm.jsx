// hooks
import classNames from "classnames"
import useStateSelectors from "../../../hooks/useStateSelectors"
import { isMobile } from "react-device-detect"

/* eslint-disable react/prop-types */
const ButtonSubmitForm = (props) => {
  const {skillsLoading, addForm} = useStateSelectors()

  const btnClass = classNames('min-w-[150px] max-w-[200px] bg-accent text-primary p-2.5 rounded-md transition', {
    'opacity-30': skillsLoading,
    'hover:bg-[#2ecc71]': !isMobile
  })

  const renderLabel = (props, addForm) => {
    if (!props.label) {
      if (addForm) {
        return 'Add category'
      }
        
      return 'Update category'
    } 
      
    return props.label
  }

  return (
    <button
      className={btnClass}
      type="submit"
      disabled={skillsLoading}
    >
      {renderLabel(props, addForm)}
    </button>
  )
}

export default ButtonSubmitForm
