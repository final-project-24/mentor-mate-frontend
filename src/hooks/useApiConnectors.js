import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

// reducer actions
import { 
  set_skill_categories,
  set_current_skill_category,
  // add_skill_category,
  update_skill_category,
  delete_skill_category
} from '../store/skills-store/slices/skillCategorySlice'
import { 
  set_show_skill_category_form,
  set_add_form,
  set_skill_category_title,
  set_skill_category_description
} from '../store/skills-store/slices/skillCategoryFormSlice'
import { 
  set_errors_array
} from '../store/skills-store/slices/errorsSlice'
import { 
  set_page, 
  set_total_pages
} from '../store/skills-store/slices/paginationSlice'
import { 
  set_categories_loading, 
  set_category_delete_loading 
} from '../store/skills-store/slices/loadingSlice'

// hooks
import useStateSelectors from './useStateSelectors'

// utils
import logIfNodeDev from '../utils/logIfNodeDev'
import isArray from '../utils/isArray'

const useApiConnectors = () => {
  const dispatch = useDispatch()
  const {
    currentSkillCategory, 
    skillCategoryForm
  } = useStateSelectors()

  // ! GENERATE OPTIONAL FIELDS IF VALUE IS PROVIDED IN THE FORM
  const generateSkillCategoryDescription = () => {
    if (skillCategoryForm.skillCategoryDescription.length > 0) {
      return {
        skillCategoryDescription: skillCategoryForm.skillCategoryDescription
      }
    }
  }

  // ! GET SKILL CATEGORY
  const getSkillCategories = async (page = 1, limit = 3) => {
    dispatch(set_categories_loading(true))

    setTimeout(async () => {
      try {
        const res = await axios({
          method: 'get',
          url: '/skill-category/get-skill-categories',
          params: {
            page,
            limit
          }
        })
  
        logIfNodeDev('getSkillCategories res: ', res)
        // res.data.categories
  
        if (res.status === 200) {
          dispatch(set_skill_categories(res.data.categories))
          dispatch(set_page(res.data.page))
          dispatch(set_total_pages(res.data.totalPages))
        }
      } catch (error) {
        logIfNodeDev('getSkillCategories error: ', error)

        const err = error.response.data.error
        if (!isArray(err)) {
          toast.error(err)
        } else {
          dispatch(set_errors_array(err))
        }
      } finally {
        dispatch(set_categories_loading(false))
      }
    }, 2000)
  }

  // ! CREATE SKILL CATEGORY
  const createSkillCategory = async () => {
    dispatch(set_categories_loading(true))

    setTimeout(async () => {
      try {
        const res = await axios({
          method: 'post',
          url: '/skill-category/create-skill-category',
          data: {
            skillCategoryTitle: skillCategoryForm.skillCategoryTitle,
            ...generateSkillCategoryDescription()
          }
        })

        logIfNodeDev('createSkillCategory res: ', res)

        if (res.status === 201) {
          // dispatch(add_skill_category(res.data.category))
          dispatch(set_skill_category_title(''))
          dispatch(set_skill_category_description(''))
          dispatch(set_add_form(false))
          dispatch(set_show_skill_category_form(false))
          toast.success('Category added!')
          getSkillCategories()
        }
      } catch (error) {
        logIfNodeDev('createSkillCategory err: ', error)

        const err = error.response.data.error
        if (!isArray(err)) {
          toast.error(err)
        } else {
          console.log('err in else: ', err)
          dispatch(set_errors_array(err))
        }
      } finally {
        dispatch(set_categories_loading(false))
      }
    }, 2000)
  }

  // ! EDIT SKILL CATEGORY
  const editSkillCategory = async () => {
    dispatch(set_categories_loading(true))

    setTimeout(async () => {
      try {
        const res = await axios({
          method: 'patch',
          url: `/skill-category/edit-skill-category/${currentSkillCategory._id}`,
          data: {
            skillCategoryTitle: skillCategoryForm.skillCategoryTitle,
            ...generateSkillCategoryDescription()
          }
        })
  
        logIfNodeDev('editSkillCategory res: ', res)
        // res.data.updatedCategory
  
        if (res.status === 200) {
          dispatch(update_skill_category(res.data.updatedCategory))
          dispatch(set_current_skill_category(null))
          dispatch(set_show_skill_category_form(false))
          toast.success('Category updated!')
        }
  
      } catch (error) {
        logIfNodeDev('editSkillCategory error: ', error)

        const err = error.response.data.error
        if (!isArray(err)) {
          toast.error(err)
        } else {
          dispatch(set_errors_array(err))
        }
      } finally {
        dispatch(set_categories_loading(false))
      }
    }, 2000)
  }

  // ! DELETE SKILL CATEGORY
  const deleteSkillCategory = async (skillCategoryId) => {
    dispatch(set_category_delete_loading(true))

    setTimeout(async () => {
      try {
        const res = await axios({
          method: 'delete',
          url: `/skill-category/delete-skill-category/${skillCategoryId}`,
        })
  
        logIfNodeDev('deleteSkillCategory res: ', res)
  
        if (res.status === 200) {
          dispatch(delete_skill_category(skillCategoryId))
          toast.success('Category deleted!')
          getSkillCategories()
        }
  
      } catch (error) {
        logIfNodeDev('deleteSkillCategory error: ', error)

        const err = error.response.data.error
        if (!isArray(err)) {
          toast.error(err)
        } else {
          dispatch(set_errors_array(err))
        }
      } finally {
        dispatch(set_category_delete_loading(false))
      }
    }, 2000)
  }

  return {
    getSkillCategories,
    createSkillCategory,
    editSkillCategory,
    deleteSkillCategory
  }
}

export default useApiConnectors
