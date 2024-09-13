/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"

// hooks
import useStateSelectors from "../../../hooks/useStateSelectors"
import useApiConnectors from "../../../hooks/useApiConnectors"

// components
import ButtonCloseForm from "../buttons/ButtonCloseForm"
import ButtonSubmitForm from "../buttons/ButtonSubmitForm"
import RenderErrorArray from "../render-error-array/RenderErrorArray"

// utils
import logIfNodeDev from "../../../utils/logIfNodeDev"
import findIdByState from "../../../utils/findIdByState"

const SkillForm = () => {
  // ! local state variables
  const [skill, setSkill] = useState('n/a')
  const [proficiency, setProficiency] = useState('n/a')
  const [notes, setNotes] = useState('')

  // ! contexts
  const {
    addForm, 
    editForm, 
    protoSkills, 
    userSkills, 
    currentUserSkill, 
    skillsLoading
  } = useStateSelectors()
  const {getProtoSkills, getUserSkills, createUserSkill, editUserSkill} = useApiConnectors()

  // ! console logs for states
  useEffect(() => {logIfNodeDev('skill: ', skill)}, [skill])
  useEffect(() => {logIfNodeDev('proficiency: ', proficiency)}, [proficiency])
  useEffect(() => {logIfNodeDev('notes: ', notes)}, [notes])

  // ! get protoSkills
  // get all protoSkills when component mounts
  useEffect(() => {
    (async () => {
      if (addForm) {
        await getProtoSkills({
          page: 1,
          limit: 50
        }, true)
      }

      if (editForm) {
        await getUserSkills({
          page: 1,
          limit: 50
        }, true, false)
      }
    })()
  }, [])

  const protoSkillId = findIdByState(skill, protoSkills, 'protoSkillTitle')
  const userSkillId = findIdByState(skill, userSkills, 'userSkillTitle')

  // ! add or edit skill
  const onSubmit = async (e) => {
    e.preventDefault()

    if (addForm) {
      await createUserSkill({
        protoSkillId: protoSkillId,
        proficiency: proficiency.toLowerCase(),
        notes: notes
      })
    }

    if (editForm) {
      await editUserSkill({
        userSkillId: userSkillId,
        proficiency: proficiency.toLowerCase(),
      }, currentUserSkill._id)
    }
  }

  return (
    <form 
      className="relative flex flex-col gap-8 px-2 pb-3 pt-12 rounded-md bg-stone-300"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-3">
        <div>
          <>
            {addForm &&
              <>
                <label htmlFor="">Skill: </label>
                <div className="mt-1 mb-3 border-2 rounded-sm">
                  <select
                    // id="dropdown2"
                    onChange={(e) => setSkill(e.target.value)}
                    className="min-w-[200px] p-1 text-base w-full"
                    disabled={skillsLoading}
                  >
                    <option>n/a</option>
                    {protoSkills.map((s) => (
                      <option key={s._id}>
                        {s.protoSkillTitle}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            }
          </>
          <label htmlFor="">Proficiency: </label>
          <div className="mt-1 mb-3 border-2 rounded-sm">
            <select
              onChange={(e) => setProficiency(e.target.value)}
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
          <div>
            <label>Notes: </label>
            <textarea 
              onChange={(e) => setNotes(e.target.value)}
              className="w-full min-h-[150px] mt-1 p-2 rounded-sm"
              placeholder="This field is optional"
            />
          </div>
        </div>
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
