import { useSelector } from 'react-redux'

const useStateSelectors = () => {
  // skill category
  const skillCategory = useSelector(state => state.skillCategory)
  const skillCategories = useSelector(state => state.skillCategory.skillCategories)
  const currentSkillCategory = useSelector(state => state.skillCategory.currentSkillCategory)
  // skill category form
  const showSkillForm = useSelector(state => state.skillForm.showSkillForm)
  const addForm = useSelector(state => state.skillForm.addForm)
  const editForm = useSelector(state => state.skillForm.editForm)
  // proto skills
  const protoSkills = useSelector(state => state.protoSkill.protoSkills)
  // user skills
  const userSkills = useSelector(state => state.userSkill.userSkills)
  const currentUserSkill = useSelector(state => state.userSkill.currentUserSkill)
  // errors
  const errorsArray = useSelector(state => state.error.errorsArray)
  // pagination
  const pagination = useSelector(state => state.pagination)
  // loading
  const skillsLoading = useSelector(state => state.loading.skillsLoading)
  const categoriesDeleteLoading = useSelector(state => state.loading.categoriesDeleteLoading)

  return {
    // skill category
    skillCategory,
    skillCategories,
    currentSkillCategory,
    // skill form
    showSkillForm,
    addForm,
    editForm,
    // proto skills
    protoSkills,
    // user skills
    userSkills,
    currentUserSkill,
    // errors
    errorsArray,
    // pagination
    pagination,
    // loading
    skillsLoading,
    categoriesDeleteLoading
  } 
}

export default useStateSelectors
