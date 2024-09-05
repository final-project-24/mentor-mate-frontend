/* eslint-disable react/prop-types */
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux"
import { isMobile } from "react-device-detect"

// reducer actions
import { set_current_skill_category } from "../../../store/skills-store/slices/skillCategorySlice"

// hooks
import useStateSelectors from "../../../hooks/useStateSelectors"

const ButtonConfirmRejectCategory = (props) => {
  const dispatch = useDispatch()
  const {categoriesDeleteLoading} = useStateSelectors()
  const confirm = props.confirm === 'true'

  const btnClass = classNames('flex items-center', {
    'opacity-30': categoriesDeleteLoading
  })

  const iconClass = classNames('text-xl', {
    'text-green-600': confirm,
    'text-red-600': !confirm,
    'text-lg hover:scale-125 transition': !isMobile
  })

  const handleClick = () => {
    dispatch(set_current_skill_category(
      confirm
        ? props.skillCategory
        : null
    ))
  }

  return (
    <button
      className={btnClass}
      onClick={handleClick}
      disabled={categoriesDeleteLoading}
    >
      <FontAwesomeIcon
        className={iconClass}
        icon={confirm 
          ? faCircleCheck
          : faCircleXmark
        }
      />
    </button>
  )
}

export default ButtonConfirmRejectCategory
