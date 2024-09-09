/* eslint-disable react/prop-types */
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux"
import { isMobile } from "react-device-detect"

// reducer actions
import { set_add_form, set_show_skill_category_form, set_skill_category_description, set_skill_category_title } from "../../../store/skills-store/slices/skillCategoryFormSlice"
import { set_current_skill_category } from "../../../store/skills-store/slices/skillCategorySlice"
import { set_errors_array } from "../../../store/skills-store/slices/errorsSlice"

const ButtonCloseForm = () => {
  const dispatch = useDispatch()

  const iconClass = classNames('text-lg' , {
    'hover:scale-125 transition': !isMobile
  })

  const handleClick = () => {
    dispatch(set_current_skill_category(null))
    dispatch(set_show_skill_category_form(false))
    dispatch(set_skill_category_title(''))
    dispatch(set_skill_category_description(''))
    dispatch(set_errors_array([]))
    dispatch(set_add_form(false))
  }

  return (
    <button
      className={`absolute right-3 top-4`}
      type="button"
      onClick={handleClick}
    >
      <FontAwesomeIcon
        className={iconClass}
        icon={faXmark}
      />
    </button>
  )
}

export default ButtonCloseForm
