import classNames from "classnames"
import ClipLoader from "react-spinners/ClipLoader"
import { useEffect, useState } from "react"
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

const ManageSkills = () => {
  // ! local state
  const [isMentor, setIsMentor] = useState(false)

  // ! contexts
  const {user} = useAuthContext()
  const {
    protoSkills,
    userSkills,
    showSkillForm,
    addForm,
    editForm,
    pagination,
    skillsLoading
  } = useStateSelectors()
  const {getProtoSkills, getUserSkills} = useApiConnectors()

  // ! classes
  const pSpanClass = 'font-bold'
  const btnWrapperClass = classNames('', {
    'flex justify-center gap-6 mt-2 border-t-2 border-t-card pt-3': isMobile,
    'absolute right-3 bottom-3 flex gap-6': !isMobile
  })

  // ! get skills
  useEffect(() => {
    (async () => {
      if (user) {
        // get protoSkills
        if (user.role === 'admin') {
          setIsMentor(false)
          await getProtoSkills({
            page: 1,
            limit: 50
          }, true)
        }

        // get userSkills
        if (user.role === 'mentor') {
          setIsMentor(true)
          await getUserSkills({
            page: 1,
            limit: 50
          }, true, false)
        }
      }
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  // define the array for the .map() method
  const skillsArray = isMentor ? userSkills : protoSkills

  const generateParaText = () => {
    if (addForm) {
      return 'Add Skill'
    } else if (showSkillForm) {
      return 'Edit Skill'
    } else {
      return 'Skills'
    }
  }

  return (
    <div className="w-full flex justify-center px-2 mt-[100px] md:mt-[150px] mb-[100px]">
      <div className="relative w-full md:w-[80%] xl:w-[50%] border-2 p-3 rounded-lg shadow-lg bg-card">
        <p className="text-center text-xl mb-3">
          {generateParaText()}
        </p>
        <>
          {!addForm && !editForm &&
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
                      {skillsArray.map((s) => (
                        <li
                          key={s._id}
                          className="relative p-3 rounded-md bg-stone-300"
                        >
                          <div className="mb-2">
                            <p>
                              <span className={pSpanClass}>
                              Title:
                              </span>{' '}
                              {isMentor
                                ? s.protoSkillId.protoSkillTitle
                                : 'TODO: proto skill title from protoSkills'
                              }
                            </p>
                            <p>
                              <span className={pSpanClass}>
                                Description:
                              </span>{' '}
                              {isMentor
                                ? s.protoSkillId.protoSkillDescription
                                  ? <span className="italic">{s.protoSkillId.protoSkillDescription}</span>
                                  : <span className="italic">n/a</span>
                                : 'TODO: proto skill description from protoSkills'
                              }
                            </p>
                            {isMentor &&
                              <>
                                <p>
                                  <span className={pSpanClass}>
                                    Proficiency:
                                  </span>{' '}
                                  {s.proficiency}
                                </p>
                                <p>
                                  <span className={pSpanClass}>
                                    Notes:
                                  </span>{' '}
                                  {s.notes
                                    ? <span className="italic">{s.notes}</span>
                                    : <span className="italic">n/a</span>
                                  }
                                </p>
                              </>
                            }
                          </div>
                          <div className="pt-2 border-t-2 border-t-card">
                            <p>
                              <span className={pSpanClass}>
                                Created at:
                              </span>{' '}
                              {formatDistanceToNow(new Date(s.createdAt), {addSuffix: true})}
                            </p>
                            <p>
                              <span className={pSpanClass}>
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
