/* eslint-disable react/prop-types */
import classNames from "classnames"
import { useDispatch } from "react-redux"
import { isMobile } from "react-device-detect"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen } from "@fortawesome/free-solid-svg-icons"

// reducer actions
import { set_current_skill_item } from "../../../store/skills-store/slices/skillSlice"
import {
  set_show_skill_form, 
  set_skill,
  set_proficiency,
  set_notes
} from "../../../store/skills-store/slices/skillFormSlice"

// hooks
import useStateSelectors from "../../../hooks/useStateSelectors"
import { useAuthContext } from "../../../store/authentication-context/AuthenticationContext"

const ButtonEdit = ({skill}) => {
  const dispatch = useDispatch()
  const {user} = useAuthContext()
  const isMentor = user.role === 'mentor'
  const {skillsLoading} = useStateSelectors()

  // ! classes
  const btnClass = classNames('flex items-center', {
    'opacity-30' : skillsLoading
  })

  const iconClass = classNames('text-lg', {
    'hover:scale-125 transition': !isMobile
  })

  const handleClick = () => {
    dispatch(set_current_skill_item(skill))
    dispatch(set_show_skill_form(true))

    if (isMentor) {
      dispatch(set_proficiency(skill.proficiency))
      dispatch(set_notes(skill.notes))
    } else {
      dispatch(set_skill(skill.protoSkillTitle))
      dispatch(set_notes(skill.protoSkillDescription))
    }
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
