/* eslint-disable react/prop-types */
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen } from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux"
import { isMobile } from "react-device-detect"

// reducer actions
import { set_show_skill_form } from "../../../store/skills-store/slices/skillFormSlice"

// hooks
import useStateSelectors from "../../../hooks/useStateSelectors"
import { set_edit_form } from "../../../store/skills-store/slices/skillFormSlice"
import { set_current_user_skill } from "../../../store/skills-store/slices/userSkillsSlice"

const ButtonEdit = ({skill}) => {
  const dispatch = useDispatch()
  const {skillsLoading} = useStateSelectors()

  const btnClass = classNames('flex items-center', {
    'opacity-30' : skillsLoading
  })

  const iconClass = classNames('text-lg', {
    'hover:scale-125 transition': !isMobile
  })

  const handleClick = () => {
    dispatch(set_current_user_skill(skill))
    dispatch(set_show_skill_form(true))
    dispatch(set_edit_form(true))
  }

  return (
    <button
      className={btnClass}
      onClick={handleClick}
      disabled={skillsLoading}
    >
      <FontAwesomeIcon 
        className={iconClass}
        icon={faPen}
      />
    </button>
  )
}

export default ButtonEdit
