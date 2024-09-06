/* eslint-disable react/prop-types */
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen } from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux"
import { isMobile } from "react-device-detect"

// reducer actions
import { set_show_skill_category_form, set_skill_category_description, set_skill_category_title } from "../../../store/skills-store/slices/skillCategoryFormSlice"
import { set_current_skill_category } from "../../../store/skills-store/slices/skillCategorySlice"

// hooks
import useStateSelectors from "../../../hooks/useStateSelectors"

const ButtonEditCategory = ({skillCategory}) => {
  const dispatch = useDispatch()
  const {categoriesDeleteLoading} = useStateSelectors()

  const btnClass = classNames('flex items-center', {
    'opacity-30' : categoriesDeleteLoading
  })

  const iconClass = classNames('text-lg', {
    'hover:scale-125 transition': !isMobile
  })

  const handleClick = () => {
    dispatch(set_current_skill_category(skillCategory))
    dispatch(set_show_skill_category_form(true))
    dispatch(set_skill_category_title(skillCategory.skillCategoryTitle))
    dispatch(set_skill_category_description(skillCategory.skillCategoryDescription))
  }

  return (
    <button
      className={btnClass}
      onClick={handleClick}
      disabled={categoriesDeleteLoading}
    >
      <FontAwesomeIcon 
        className={iconClass}
        icon={faPen} 
      />
    </button>
  )
}

export default ButtonEditCategory
