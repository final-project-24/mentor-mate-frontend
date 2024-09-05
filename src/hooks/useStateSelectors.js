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
  // loading
  const categoriesLoading = useSelector(state => state.loading.categoriesLoading)
  const categoriesDeleteLoading = useSelector(state => state.loading.categoriesDeleteLoading)

  return {
    skillCategory,
    skillCategories,
    currentSkillCategory,
    skillCategoryForm,
    showSkillCategoryForm,
    addForm,
    categoriesLoading,
    categoriesDeleteLoading
  } 
}

export default useStateSelectors
