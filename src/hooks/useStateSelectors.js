import { useSelector } from 'react-redux'

const useStateSelectors = () => {
  // skill category
  const skillCategory = useSelector(state => state.skillCategory)
  const skillCategories = useSelector(state => state.skillCategory.skillCategories)
  const currentSkillCategory = useSelector(state => state.skillCategory.currentSkillCategory)
  // skill category form
  const skillCategoryForm = useSelector(state => state.skillCategoryForm)
  const showSkillCategoryForm = useSelector(state => state.skillCategoryForm.showSkillCategoryForm)
  const addForm = useSelector(state => state.skillCategoryForm.addForm)
  // proto skills
  const protoSkills = useSelector(state => state.protoSkill.protoSkills)
  // user skills
  const userSkills = useSelector(state => state.userSkill.userSkills)
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
    // skill category form
    skillCategoryForm,
    showSkillCategoryForm,
    addForm,
    // proto skills
    protoSkills,
    // user skills
    userSkills,
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
