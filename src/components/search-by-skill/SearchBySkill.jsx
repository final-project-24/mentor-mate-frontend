/* eslint-disable no-undef */
import { useEffect, useState } from "react"

// hooks
import useApiConnectors from "../../hooks/useApiConnectors"
import useStateSelectors from "../../hooks/useStateSelectors"
import { useBookingContext } from "../../store/booking-context/BookingContext"

// components
import ButtonSubmitForm from "../skills/buttons/ButtonSubmitForm"

// utils
import logIfNodeDev from "../../utils/logIfNodeDev"
// import isArray from "../../utils/isArray"
import findIdByState from "../../utils/findIdByState"

const SearchBySkill = () => {
  // ! local state variables
  const [category, setCategory] = useState('n/a')
  const [title, setTitle] = useState('n/a')
  const [proficiency, setProficiency] = useState('n/a')
  
  // ! contexts
  const {skillCategories, protoSkills, skillsLoading} = useStateSelectors()
  const {getSkillCategories, getProtoSkills, getUserSkills, getMentorsByUuid} = useApiConnectors()
  const {mentors, setMentors} = useBookingContext()

  // ! console logs for states
  useEffect(() => {logIfNodeDev('skillCategories (skillCategory context): ', skillCategories)}, [skillCategories])
  useEffect(() => {logIfNodeDev('protoSkills (protoSkills context): ', protoSkills)}, [protoSkills])
  useEffect(() => {logIfNodeDev('mentors (Booking context): ', mentors)}, [mentors])
  useEffect(() => {logIfNodeDev('category (local state): ', category)}, [category])
  useEffect(() => {logIfNodeDev('title: (local state): ', title)}, [title])
  useEffect(() => {logIfNodeDev('proficiency: (local state): ', proficiency)}, [proficiency])

  // ! get categories
  // get all categories when the component mounts
  useEffect(() => {
    (async () => {await getSkillCategories()})()
  }, [])

  // define categoryId (reused in handleOnSubmit)
  const categoryIdInit = findIdByState(category, skillCategories, 'skillCategoryTitle')

  // load protoSkills each time when the state of category changes to display only protoSkills relevant to selected category
  useEffect(() => {
    (async () => {
      if (category !== 'n/a') {
        await getProtoSkills({
          page: 1,
          limit: 50,
          categoryId: categoryIdInit
        }, false)
        setTitle('n/a')
      } else {
        if (category === 'n/a')
          await getProtoSkills({
            page: 1,
            limit: 50
          }, true)
      }
    })()
  }, [category])

  // ! search for mentors
  const handleOnSubmit = async (e) => {
    e.preventDefault()

    // get skills by filtering criteria
    let skills = []

    if (category === 'n/a' && title === 'n/a' && proficiency === 'n/a') {
      skills = await getUserSkills({
        page: 1,
        limit: 50,
      }, false, true)
    } else {
      skills = await getUserSkills({
        page: 1,
        limit: 50,
        skillTitle: title === 'n/a' ? null : title,
        skillCategoryTitle: category === 'n/a' ? null : category,
        proficiency: proficiency === 'n/a' ? null : proficiency
      }, false, false)
    }

    logIfNodeDev('skills', skills)

    if (skills) {
      let categoryId = null
      let protoSkillId = null

      const removeDuplicateUuids = (arr) => {
        const seen = new Set() // declare empty set

        return arr.map(s => ({mentorUuid: s.mentorUuid.uuid})).filter(item => {
          if (seen.has(item.mentorUuid)) { // check if set has specific item
            return false
          }

          seen.add(item.mentorUuid)
          return true
        })
      }

      const uniqueMentorUuids = removeDuplicateUuids(skills)
      logIfNodeDev('uniqueMentorsUuids: ', uniqueMentorUuids)

      if (title !== 'n/a') {
        protoSkillId = findIdByState(title, protoSkills, 'protoSkillTitle')
        console.log('protoSkillId: ', protoSkillId)
      }

      if (category !== 'n/a') {
        categoryId = categoryIdInit
        console.log('categoryId: ', categoryId)
      }

      const mentorData = {
        uuids: uniqueMentorUuids,
        categoryId: !categoryId ? null : categoryId, 
        protoSkillId: !protoSkillId ? null : protoSkillId,
        proficiency: proficiency === 'n/a' ? null: proficiency
      }

      console.log('mentorData: ', mentorData)

      await getMentorsByUuid(mentorData)
    } else {
      // set mentors state to empty array if skills variable is undefined
      setMentors([])
    }
  }

  return (
    <div className="pt-5 pb-20">
      <form
        className="w-full flex flex-col"
        onSubmit={handleOnSubmit}
      >
        <div className="flex flex-col md:grid grid-cols-2 md:gap-2 lg:justify-between">
          {/* CATEGORY */}
          <label 
            // htmlFor="dropdown1"
          >Search by Category:</label>
          <div className="mt-1 md:mt-0 mb-3 border-2 rounded-sm">
            <select
              // id="dropdown1"
              onChange={(e) => setCategory(e.target.value)}
              className="min-w-[200px] p-1 text-base w-full"
              disabled={skillsLoading}
            >
              <option>n/a</option>
              {skillCategories.map((c) => (
                <option key={c._id}>
                  {c.skillCategoryTitle}
                </option>
              ))}
            </select>
          </div>

          {/* TITLE */}
          <label 
            // htmlFor="dropdown2"
          >Search by Title:</label>
          <div className="mt-1 md:mt-0 mb-3 border-2 rounded-sm">
            <select
              // id="dropdown2"
              onChange={(e) => setTitle(e.target.value)}
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
          
          {/* PROFICIENCY */}
          <label 
            // htmlFor="dropdown3"
          >Search by Proficiency:</label>
          <div>
            <div className="mt-1 md:mt-0 mb-3 border-2 rounded-sm">
              <select
                // id="dropdown3"
                onChange={(e) => setProficiency(e.target.value.toLowerCase())}
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
          </div>
        </div>
        
        {/* BUTTON */}
        <div className="flex justify-center">
          <ButtonSubmitForm label={'Search for Mentor'}/>
        </div>
      </form>
    </div>
  )
}

export default SearchBySkill
