import classNames from "classnames"
import { useDispatch } from "react-redux"
import { isMobile } from "react-device-detect"

// reducer actions
import { set_add_form, set_notes, set_proficiency, set_show_skill_form, set_skill } from "../../../store/skills-store/slices/skillFormSlice"
import { set_errors_array } from "../../../store/skills-store/slices/errorsSlice"
import { set_current_skill_item } from "../../../store/skills-store/slices/skillSlice"

const ButtonOpenForm = () => {
  const dispatch = useDispatch()

  const btnClass = classNames('absolute top-0 right-0 p-2 m-3 rounded-md bg-accent text-primary transition', {
    'hover:bg-[#2ecc71]': !isMobile
  })

  const handleClick = () => {
    setTimeout(() => {
      dispatch(set_current_skill_item(null))
    }, 200) // TODO: without this delay the state variable is cleared too late
    dispatch(set_errors_array([]))
    dispatch(set_show_skill_form(true))
    dispatch(set_add_form(true))
    dispatch(set_skill(''))
    dispatch(set_proficiency(''))
    dispatch(set_notes(''))
  }

  return (
    <button 
      className={btnClass} 
      onClick={handleClick}
    >
      Add
    </button>
  )
}

export default ButtonOpenForm
