/* eslint-disable react/prop-types */
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"

// reducer actions
import { set_current_category, set_current_skill_item } from "../../../store/skills-store/slices/skillSlice"
import {
  set_category,
  set_skill,
  set_proficiency,
  set_notes
} from "../../../store/skills-store/slices/skillFormSlice"

// hooks
import { useAuthContext } from "../../../store/authentication-context/AuthenticationContext"
import useStateSelectors from "../../../hooks/useStateSelectors"
import useApiConnectors from "../../../hooks/useApiConnectors"

// components
import ButtonCloseForm from "../buttons/ButtonCloseForm"
import ButtonSubmitForm from "../buttons/ButtonSubmitForm"
import RenderErrorArray from "../render-error-array/RenderErrorArray"

// utils
import logIfNodeDev from "../../../utils/logIfNodeDev"
import findIdByState from "../../../utils/findIdByState"
import paginationParams from "../../../utils/paginationParams"

const SkillForm = () => {
  const dispatch = useDispatch()
  
  // ! contexts
  const {user} = useAuthContext()
  const isMentor = user?.role === 'mentor'
  const {
    skillForm,
    showSkillForm,
    addForm,
    skillCategories,
    protoSkills,
    currentSkillItem, 
    skillsLoading
  } = useStateSelectors()
  // * granular skillForm states-----------
  const category = skillForm.category
  const skill = skillForm.skill
  const proficiency = skillForm.proficiency
  const notes = skillForm.notes
  // * ------------------------------------
  const {
    getSkillCategories,
    getProtoSkills, 
    createProtoSkill,
    editProtoSkill, 
    // getUserSkills, 
    createUserSkill, 
    editUserSkill
  } = useApiConnectors()

  // ! logs
  useEffect(() => {console.log('currenSkillItem: ', currentSkillItem)})
  useEffect(() => {logIfNodeDev('category: ', category)}, [category])
  useEffect(() => {logIfNodeDev('skill: ', skill)}, [skill])
  useEffect(() => {logIfNodeDev('proficiency: ', proficiency)}, [proficiency])
  useEffect(() => {logIfNodeDev('notes: ', notes)}, [notes])

  // ! get protoSkills or skill categories
  useEffect(() => {
    (async () => {
      if (addForm) {
        if (isMentor) {
          await getProtoSkills({
            ...paginationParams
          }, true)
        } else {
          await getSkillCategories({
            ...paginationParams
          })
        }
      }
    })()
  }, [])

  // ! set currentSkillItem based on category (only for protoSkills)
  useEffect(() => {
    if (addForm) {
      const categoryId = findIdByState(category, skillCategories, 'skillCategoryTitle')

      if (categoryId) {
        dispatch(set_current_skill_item(skillCategories.find(c => c._id === categoryId)))
      }
    }
  }, [addForm, category])

  const protoSkillId = findIdByState(skill, protoSkills, 'protoSkillTitle')

  // ! add or edit skill
  const onSubmit = async (e) => {
    e.preventDefault()

    if (isMentor) {
      if (addForm) {
        if (!skill) return toast.error('Please select a skill')
        if (!proficiency) return toast.error('Please select proficiency')

        await createUserSkill({
          protoSkillId: protoSkillId,
          proficiency: proficiency.toLowerCase(),
          notes: notes
        })
      } else {
        await editUserSkill({
          proficiency: proficiency.toLowerCase(),
          notes: notes
        }, currentSkillItem._id)
      }
    } else {
      if (addForm) {
        if (!currentSkillItem?._id) return toast.error('Please select category')

        await createProtoSkill({
          skillCategoryId: currentSkillItem._id,
          protoSkillTitle: skill,
          protoSkillDescription: notes
        })
      } else {
        await editProtoSkill({
          skillCategoryId: currentSkillItem.skillCategoryId._id,
          protoSkillTitle: skill,
          protoSkillDescription: notes
        }, currentSkillItem._id)
      }
    }
  }

  // ! define skills array to work with
  const skillItemsArray = isMentor ? protoSkills : skillCategories

  return (
    <form 
      className="relative flex flex-col gap-8 px-2 pb-3 pt-12 rounded-md bg-stone-300"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-3">
        <>
          {/* // ! MENTOR & ADMIN */}
          {addForm &&
            <>
              <div className="flex flex-col gap-1">
                <label>
                  {isMentor
                    ? 'Skill:'
                    : 'Skill Category:'
                  }
                </label>
                <select
                  onChange={e => isMentor
                    ? dispatch(set_skill(e.target.value))
                    : dispatch(set_category(e.target.value))
                  }
                  className="min-w-[200px] p-1 text-base w-full"
                  disabled={skillsLoading}
                >
                  <option>n/a</option>
                  {skillItemsArray.map(i => (
                    <option key={i._id}>
                      {isMentor
                        ? i.protoSkillTitle
                        : i.skillCategoryTitle
                      }
                    </option>
                  ))}
                </select>
              </div>
            </>
          }
        </>
        <>
          {/* // ! MENTOR */}
          {isMentor &&
            <>
              <div className="flex flex-col gap-1">
                <label>{showSkillForm && !addForm
                  ? <span>Current proficiency ({proficiency[0].toUpperCase() + proficiency.slice(1)}):</span>
                  : 'Proficiency:'
                  }
                </label>
                
                <select
                  onChange={e => dispatch(set_proficiency(e.target.value))}
                  className="min-w-[200px] p-1 text-base w-full"
                  disabled={skillsLoading}
                >
                  <option>n/a</option>
                  {/* ! TODO: hardcoded values because we accept only those 3 proficiency levels */}
                  {['Beginner', 'Intermediate', 'Advanced'].map((p, i) => (
                    <option key={i}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </>
          }
          {/* // ! ADMIN */}
          {!isMentor &&
            <div className="flex flex-col gap-1">
              <label>Skill title:</label>
              <input
                type="text"
                className="pl-2 pr-1 py-1 rounded-sm"
                onChange={e => dispatch(set_skill(e.target.value))}
                value={skill}
              />
            </div>
          }
          {/* // ! MENTOR & ADMIN */}
          <div className="flex flex-col gap-1 mt-2">
            <label>
              {isMentor
                ? 'Notes:'
                : 'Skill description:'
              }
            </label>
            <textarea
              className="w-full min-h-[150px] p-2 rounded-sm"
              onChange={e => dispatch(set_notes(e.target.value))}
              value={notes}
              placeholder='This field is optional'
            />
          </div>
        </>
      </div>
      <ButtonCloseForm />
      <RenderErrorArray />
      <div className="flex justify-center">
        <ButtonSubmitForm />
      </div>
    </form>
  )
}

export default SkillForm
