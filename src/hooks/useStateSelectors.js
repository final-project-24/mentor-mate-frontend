import { useSelector } from 'react-redux'

const useStateSelectors = () => {
  // * skill item
  const currentSkillItem = useSelector(state => state.skill.currentSkillItem)
  // * skill category
  // const skillCategory = useSelector(state => state.skillCategory)
  const skillCategories = useSelector(state => state.skillCategory.skillCategories)
  // * proto skills
  const protoSkills = useSelector(state => state.protoSkill.protoSkills)
  // * user skills
  const userSkills = useSelector(state => state.userSkill.userSkills)
  // const currentUserSkill = useSelector(state => state.userSkill.currentUserSkill)
  // * skill category form
  const skillForm = useSelector(state => state.skillForm)
  const showSkillForm = useSelector(state => state.skillForm.showSkillForm)
  const addForm = useSelector(state => state.skillForm.addForm)
  // const editForm = useSelector(state => state.skillForm.editForm)
  // * errors
  const errorsArray = useSelector(state => state.error.errorsArray)
  // * pagination
  const pagination = useSelector(state => state.pagination)
  // * loading
  const skillsLoading = useSelector(state => state.loading.skillsLoading)
  const categoriesDeleteLoading = useSelector(state => state.loading.categoriesDeleteLoading)

  return {
    // * skill
    currentSkillItem,
    // * skill category
    // skillCategory,
    skillCategories,
    // currentSkillCategory,
    // * proto skills
    protoSkills,
    // * user skills
    userSkills,
    // currentUserSkill,
    // * skill form
    skillForm,
    showSkillForm,
    addForm,
    // editForm,
    // * errors
    errorsArray,
    // * pagination
    pagination,
    // * loading
    skillsLoading,
    categoriesDeleteLoading
  } 
}

export default useStateSelectors
