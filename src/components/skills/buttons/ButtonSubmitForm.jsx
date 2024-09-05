// hooks
import classNames from "classnames"
import useStateSelectors from "../../../hooks/useStateSelectors"
import { isMobile } from "react-device-detect"

/* eslint-disable react/prop-types */
const ButtonSubmitForm = () => {
  const {categoriesLoading, addForm} = useStateSelectors()

  const btnClass = classNames('min-w-[150px] max-w-[200px] bg-accent text-primary p-2.5 rounded-md transition', {
    'opacity-30': categoriesLoading,
    'hover:bg-[#2ecc71]': !isMobile
  })

  return (
    <button
      className={btnClass}
      type="submit"
      disabled={categoriesLoading}
    >
      {addForm
        ? 'Add category'
        : 'Update category'
      }
    </button>
  )
}

export default ButtonSubmitForm
