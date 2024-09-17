/* eslint-disable react/prop-types */
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux"
import { isMobile } from "react-device-detect"

// reducer actions
import { set_add_form, set_show_skill_form } from "../../../store/skills-store/slices/skillFormSlice"
import { set_errors_array } from "../../../store/skills-store/slices/errorsSlice"
import { set_current_skill_item } from "../../../store/skills-store/slices/skillSlice"

// hooks
import useStateSelectors from "../../../hooks/useStateSelectors"

const ButtonCloseForm = () => {
  const dispatch = useDispatch()
  const {currentSkillItem, addForm} = useStateSelectors()

  const iconClass = classNames('text-lg' , {
    'hover:scale-125 transition': !isMobile
  })

  const handleClick = () => {
    dispatch(set_show_skill_form(false))
    dispatch(set_errors_array([]))
    if (addForm) dispatch(set_add_form(false))
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
