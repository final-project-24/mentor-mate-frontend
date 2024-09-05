import ClipLoader from "react-spinners/ClipLoader"
import { useEffect } from "react"
import { formatDistanceToNow } from "date-fns"
import { isMobile } from "react-device-detect"

// hooks
import useStateSelectors from "../../../hooks/useStateSelectors"
import useApiConnectors from "../../../hooks/useApiConnectors"
import {useAuthContext} from "../../../store/authentication-context/AuthenticationContext"

// components
import ButtonConfirmRejectCategory from "../buttons/ButtonConfirmRejectCategory"
import classNames from "classnames"
import ButtonEditCategory from "../buttons/ButtonEditCategory"
import SkillCategoryForm from "../skill-category-form/SkillCategoryForm"
import PaginationControls from "../pagination-controls/PaginationControls"
import ButtonDeleteCategory from "../buttons/ButtonDeleteCategory"
import ButtonOpenForm from "../buttons/ButtonOpenForm"

const SkillCategory = () => {
  const {user} = useAuthContext()
  const {
    skillCategory,
    skillCategories, 
    currentSkillCategory,
    showSkillCategoryForm,
    addForm,
    categoriesLoading
  } = useStateSelectors()
  const {getSkillCategories} = useApiConnectors()

  useEffect(() => {
    if (user)
      getSkillCategories()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const pSpanClass = 'font-bold'

  const btnWrapperClass = classNames('', {
    'flex justify-center gap-6 mt-2 border-t-2 border-t-card pt-3': isMobile,
    'absolute right-3 bottom-3 flex gap-6': !isMobile
  })

  const generateParaText = () => {
    if (addForm) {
      return 'Add Category'
    } else if (showSkillCategoryForm) {
      return 'Edit Category'
    } else if (!currentSkillCategory) {
      return 'Select Category'
    } else if (currentSkillCategory && !showSkillCategoryForm) {
      return 'Category'
    }
  }

  return (
    <div className="relative w-full md:w-[80%] xl:w-[50%] border-2 mt-10 p-3 rounded-lg shadow-lg bg-card">
      <p className="text-center text-xl mb-3">
        {generateParaText()}
      </p>
      <>
        {!currentSkillCategory &&
          <ButtonOpenForm />
        }
      </>
      <div>
        <>
          {!currentSkillCategory && !showSkillCategoryForm &&
            <div className="flex flex-col items-center gap-3">
              <PaginationControls state={skillCategory}/>
              <>
                {categoriesLoading &&
                  <div className="flex justify-center items-center min-h-[436px]">
                    {/* TODO: migrate ClipLoader to a separate component and style it */}
                    <ClipLoader />
                  </div>
                }
              </>
              <>
                {!categoriesLoading &&
                  <ul className="w-full relative flex flex-col gap-3 bg-card">
                    {skillCategories.map((c, i) => (
                      <li
                        key={i}
                        className="relative p-3 rounded-md bg-stone-300"
                      >
                        <div className="mb-2">
                          <p>
                            <span className={pSpanClass}>
                            Title:
                            </span>{' '}
                            {c.skillCategoryTitle}
                          </p>
                          <p>
                            <span className={pSpanClass}>
                              Description:
                            </span>{' '}
                            {c.skillCategoryDescription
                              ? <span className="italic">{c.skillCategoryDescription}</span>
                              : <span className="italic">n/a</span>
                            }
                          </p>
                        </div>
                        <div className="pt-2 border-t-2 border-t-card">
                          <p>
                            <span className={pSpanClass}>
                              Created at:
                            </span>{' '}
                            {formatDistanceToNow(new Date(c.createdAt), {addSuffix: true})}
                          </p>
                          <p>
                            <span className={pSpanClass}>
                              Last edited:
                            </span>{' '}
                            {formatDistanceToNow(new Date(c.updatedAt), {addSuffix: true})}
                          </p>
                        </div>
                        <div className={btnWrapperClass}>
                          <ButtonConfirmRejectCategory confirm={'true'} skillCategory={c} />
                          <ButtonEditCategory skillCategory={c} />
                          <ButtonDeleteCategory skillCategory={c} />
                        </div>
                      </li>
                    ))}
                  </ul>
                }
              </>
            </div>
          }
        </>
        <>
          {currentSkillCategory && !showSkillCategoryForm &&
            <p className="flex justify-between items-center rounded-md p-3 text-lg bg-stone-300">
              {currentSkillCategory.skillCategoryTitle}
              <ButtonConfirmRejectCategory />
            </p>
          }
        </>
        <>
          {showSkillCategoryForm &&
            <SkillCategoryForm />
          }
        </>
      </div>
    </div>
  )
}

export default SkillCategory
