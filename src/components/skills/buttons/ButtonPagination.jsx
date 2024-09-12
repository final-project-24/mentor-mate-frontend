/* eslint-disable react/prop-types */
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux"

// reducer actions
import { set_page } from "../../../store/skills-store/slices/paginationSlice"

// hooks
import useApiConnectors from "../../../hooks/useApiConnectors"
import useStateSelectors from "../../../hooks/useStateSelectors"

const ButtonPagination = (props) => {
  const dispatch = useDispatch()
  const {getSkillCategories} = useApiConnectors()
  const {skillsLoading} = useStateSelectors()

  // define pages
  const page = props.state.page
  const totalPages = props.state.totalPages
  const nextPage = page + 1
  const previousPage = page - 1

  const btnClass = classNames('', {
    'opacity-20': skillsLoading
  })

  const handleClick = () => {
    if (props.prev) {
      if (page > 1) {
        dispatch(set_page(previousPage))
        getSkillCategories(previousPage)
      }
    } else {
      if (page < totalPages) {
        dispatch(set_page(nextPage))
        getSkillCategories(nextPage)
      }
    }
  }

  return (
    <button 
      className={btnClass}
      onClick={handleClick}
      disabled={skillsLoading}
    >
      {props.prev
        ? <FontAwesomeIcon icon={faCaretLeft} />
        : <FontAwesomeIcon icon={faCaretRight} />
      }
    </button>
  )
}

export default ButtonPagination
