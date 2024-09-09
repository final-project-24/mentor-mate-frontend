/* eslint-disable react/prop-types */
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { isMobile } from "react-device-detect"

// hooks
import useApiConnectors from "../../../hooks/useApiConnectors"
import useStateSelectors from "../../../hooks/useStateSelectors"

const ButtonDeleteCategory = ({skillCategory}) => {
  const {
    // getSkillCategories, 
    deleteSkillCategory
  } = useApiConnectors()
  const {categoriesDeleteLoading} = useStateSelectors()

  const iconClass = classNames('text-lg', {
    'hover:scale-125 transition': !isMobile
  })

  const btnClass = classNames('flex items-center', {
    'opacity-30': categoriesDeleteLoading
  })
  
  const handleClick = async () => {
    await deleteSkillCategory(skillCategory._id)
    // getSkillCategories()
  }

  return (
    <button
      className={btnClass}
      onClick={handleClick}
      disabled={categoriesDeleteLoading}
    >
      <FontAwesomeIcon 
        className={iconClass}
        icon={faTrash} 
      />
    </button>
  )
}

export default ButtonDeleteCategory
