import classNames from "classnames"
import { useDispatch } from "react-redux"
import { isMobile } from "react-device-detect"

// reducer actions
import { set_add_form, set_show_skill_form } from "../../../store/skills-store/slices/skillFormSlice"

const ButtonOpenForm = () => {
  const dispatch = useDispatch()

  const btnClass = classNames('absolute top-0 right-0 p-2 m-3 rounded-md bg-accent text-primary transition', {
    'hover:bg-[#2ecc71]': !isMobile
  })

  const handleClick = () => {
    dispatch(set_show_skill_form(true))
    dispatch(set_add_form(true))
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
