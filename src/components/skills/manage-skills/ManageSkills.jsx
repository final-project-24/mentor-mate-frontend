import classNames from "classnames"
import ClipLoader from "react-spinners/ClipLoader"
import { useEffect } from "react"
import { formatDistanceToNow } from "date-fns"
import { isMobile } from "react-device-detect"

// hooks
import useStateSelectors from "../../../hooks/useStateSelectors"
import useApiConnectors from "../../../hooks/useApiConnectors"
import {useAuthContext} from "../../../store/authentication-context/AuthenticationContext"

// components
import ButtonEdit from "../buttons/ButtonEdit"
import ButtonDelete from "../buttons/ButtonDelete"
import SkillForm from "../skill-form/SkillForm"
import PaginationControls from "../pagination-controls/PaginationControls"
import ButtonOpenForm from "../buttons/ButtonOpenForm"

// utils
import paginationParams from "../../../utils/paginationParams"

const ManageSkills = () => {
  // ! contexts
  const {user} = useAuthContext()
  const isMentor = user?.role === 'mentor'
  const {
    protoSkills,
    userSkills,
    showSkillForm,
    addForm,
    pagination,
    skillsLoading
  } = useStateSelectors()
  const {getProtoSkills, getUserSkills} = useApiConnectors()

  // ! classes
  const componentWrapper = classNames('w-full flex justify-center mb-[100px]', {
    'px-3 mt-[110px] md:mt-[150px]' : isMentor
  })

  const btnWrapperClass = classNames('', {
    'flex justify-center gap-6 mt-2 border-t-2 border-t-card pt-3': isMobile,
    'absolute right-3 bottom-3 flex gap-6': !isMobile
  })

  // ! get skills
  useEffect(() => {
    (async () => {
      if (user) {
        // get userSkills
        if (isMentor) {
          await getUserSkills({
            ...paginationParams
          }, true, false)
        // get protoSkills
        } else {
          await getProtoSkills({
            ...paginationParams
          }, true)
        }
      }
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  // ! functions
  const generateParaText = () => {
    if (addForm) {
      return 'Add Skill'
    } else if (showSkillForm) {
      return 'Edit Skill'
    } else {
      return 'Skills'
    }
  }

  // * define the array for the .map() method
  const skillsArray = isMentor ? userSkills : protoSkills

  return (
    <div className={componentWrapper}>
      <div className="relative w-full mb-[100px] md:w-[80%] xl:w-[50%] border-2 p-3 rounded-lg shadow-lg bg-card">
        <p className="text-center text-xl mb-3">
          {generateParaText()}
        </p>
        <>
          {!showSkillForm && !addForm && 
            <ButtonOpenForm />
          }
        </>
        <div>
          <>
            {!showSkillForm &&
              <div className="flex flex-col items-center gap-3">
                <PaginationControls state={pagination}/>
                <>
                  {skillsLoading &&
                    <div className="flex justify-center items-center min-h-[436px]">
                      <ClipLoader />
                    </div>
                  }
                </>
                <>
                  {!skillsLoading &&
                    <ul className="w-full relative flex flex-col gap-3 bg-card">
                      {skillsArray.map(s => (
                        <li
                          key={s._id}
                          className="relative p-3 rounded-md bg-stone-300"
                        >
                          <div className="mb-2">
                            <p>
                              <span className="font-bold">
                              Title:
                              </span>{' '}
                              <span className="font-bold text-green-800">
                                {isMentor
                                  ? s.protoSkillId.protoSkillTitle
                                  : s.protoSkillTitle
                                }
                              </span>
                            </p>
                            <>
                              {!isMentor &&
                                <>
                                  <span className="font-bold">Category:</span>{' '}
                                  <span>{s.skillCategoryId.skillCategoryTitle}</span>
                                </>
                              }
                            </>
                            <p>
                              <span className="font-bold">
                                Description:
                              </span>{' '}
                              <span className="italic">
                                {isMentor
                                  ? s.protoSkillId.protoSkillDescription
                                    ? s.protoSkillId.protoSkillDescription
                                    : 'n/a'
                                  : s.protoSkillDescription
                                    ? s.protoSkillDescription
                                    : 'n/a'
                                }
                              </span>
                            </p>
                            <>
                              {isMentor &&
                                <>
                                  <p>
                                    <span className="font-bold">
                                      Proficiency:
                                    </span>{' '}
                                    {s.proficiency[0].toUpperCase() + s.proficiency.slice(1)}
                                  </p>
                                  <p>
                                    <span className="font-bold">
                                      Notes:
                                    </span>{' '}
                                    <span className="italic">
                                      {s.notes
                                        ? s.notes
                                        : 'n/a'
                                      }
                                    </span>
                                  </p>
                                </>
                              }
                            </>
                          </div>
                          <div className="pt-2 border-t-2 border-t-card">
                            <p>
                              <span className="font-bold">
                                Created at:
                              </span>{' '}
                              {formatDistanceToNow(new Date(s.createdAt), {addSuffix: true})}
                            </p>
                            <p>
                              <span className="font-bold">
                                Last edited:
                              </span>{' '}
                              {formatDistanceToNow(new Date(s.updatedAt), {addSuffix: true})}
                            </p>
                          </div>
                          <div className={btnWrapperClass}>
                            <ButtonEdit skill={s} />
                            <ButtonDelete skillId={s._id} />
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
            {showSkillForm &&
              <SkillForm />
            }
          </>
        </div>
      </div>
    </div>
  )
}

export default ManageSkills
