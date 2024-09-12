import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

// env
import { NODE_ENV } from '../utils/config'

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
import { set_proto_skills } from '../store/skills-store/slices/protoSkillSlice'
import {
  set_user_skills
} from '../store/skills-store/slices/userSkillsSlice'
import { 
  set_errors_array
} from '../store/skills-store/slices/errorsSlice'
import { 
  set_page, 
  set_total_pages
} from '../store/skills-store/slices/paginationSlice'
import { 
  set_skills_loading, 
  set_category_delete_loading
} from '../store/skills-store/slices/loadingSlice'

// hooks
import useStateSelectors from './useStateSelectors'
import { useBookingContext } from '../store/booking-context/BookingContext'

// utils
import logIfNodeDev from '../utils/logIfNodeDev'
import isArray from '../utils/isArray'

const useApiConnectors = () => {
  const dispatch = useDispatch()
  const {
    currentSkillCategory, 
    skillCategoryForm
  } = useStateSelectors()
  const {setMentors} = useBookingContext() // TODO: maybe better to set mentors locally and restrict the hook to use reducer actions only

  // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // ! HELPERS
  // * adds specific params to params object in the axios call
  // used by createSkillCategory and editSkillCategory
  const generateSkillCategoryDescription = () => {
    if (skillCategoryForm.skillCategoryDescription.length > 0) {
      return {
        skillCategoryDescription: skillCategoryForm.skillCategoryDescription
      }
    }
  }

  // * excludes empty params from the params object in the axios call
  // used by filtering getters with options object in function call
  // getProtoSkills getUserSkills
  const constructParams = (params) => {
    const filteredParams = {}

    Object.keys(params).forEach(key => {
      // first condition should be sufficient, the rest is a failsafe
      if (params[key] !== 'n/a' && params[key] !== null && params[key] !== undefined) {
        filteredParams[key] = params[key]
      }
    })

    return filteredParams
  }

  // * exclude array errors from toaster
  const returnError = (error) => {
    if (!isArray(error)) {
      toast.error(error)
    } else {
      dispatch(set_errors_array(error))
    }
  }

  // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // ! GET SKILL CATEGORY
  const getSkillCategories = async ({
    page = 1, 
    limit = 50
  } = {}) => { //TODO: adjust pagination
    dispatch(set_skills_loading(true))

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
  
        logIfNodeDev('getSkillCategories API response: ', res)
        // res.data.categories
        console.log('getSkillCategories res: ', res)
  
        if (res.status === 200) {
          dispatch(set_skill_categories(res.data.categories))
          dispatch(set_page(res.data.page))
          dispatch(set_total_pages(res.data.totalPages))
        }
      } catch (error) {
        logIfNodeDev('getSkillCategories API error: ', error)

        const err = error.response.data.error
        returnError(err)
      } finally {
        dispatch(set_skills_loading(false))
      }
    }, NODE_ENV === 'dev' ? 0 : 0)
  }

  // ! CREATE SKILL CATEGORY
  const createSkillCategory = async () => {
    dispatch(set_skills_loading(true))

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

        logIfNodeDev('createSkillCategory API response: ', res)

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
        logIfNodeDev('createSkillCategory API error: ', error)

        const err = error.response.data.error
        returnError(err)
      } finally {
        dispatch(set_skills_loading(false))
      }
    }, NODE_ENV === 'dev' ? 0 : 0)
  }

  // ! EDIT SKILL CATEGORY
  const editSkillCategory = async () => {
    dispatch(set_skills_loading(true))

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
  
        logIfNodeDev('editSkillCategory API response: ', res)
  
        if (res.status === 200) {
          dispatch(update_skill_category(res.data.updatedCategory))
          dispatch(set_current_skill_category(null))
          dispatch(set_show_skill_category_form(false))
          toast.success('Category updated!')
        }
  
      } catch (error) {
        logIfNodeDev('editSkillCategory API error: ', error)

        const err = error.response.data.error
        returnError(err)
      } finally {
        dispatch(set_skills_loading(false))
      }
    }, NODE_ENV === 'dev' ? 0 : 0)
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
  
        logIfNodeDev('deleteSkillCategory API response: ', res)
  
        if (res.status === 200) {
          dispatch(delete_skill_category(skillCategoryId))
          toast.success('Category deleted!')
          getSkillCategories()
        }
  
      } catch (error) {
        logIfNodeDev('deleteSkillCategory API error: ', error)

        const err = error.response.data.error
        returnError(err)
      } finally {
        dispatch(set_category_delete_loading(false))
      }
    }, NODE_ENV === 'dev' ? 0 : 0)
  }
  // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // ! GET PROTO SKILLS
  const getProtoSkills = async (
  // options object 
  {
    page, 
    limit,
    categoryId
  } = {}, 
    allSkills // BOOLEAN: returns all skills if filtering criteria yield no results, must be used even if there are no filtering criteria
  ) => {
    // call constructParams
    const filteredParams = constructParams({
      page,
      limit,
      categoryId
    })

    dispatch(set_skills_loading(true))

    setTimeout(async () => {
      try {
        const res = await axios({
          method: 'get',
          url: '/proto-skill/get-proto-skills',
          params: {
            allSkills,
            ...filteredParams
          }
        })
  
        logIfNodeDev('getProtoSkills API response: ', res)
  
        if (res.status === 200) {
          dispatch(set_proto_skills(res.data.skills))
        }
      } catch (error) {
        logIfNodeDev('getProtoSkills API error: ', error)

        const err = error.response.data.error
        returnError(err)
      } finally {
        dispatch(set_skills_loading(false))
      }
    }, NODE_ENV === 'dev' ? 0 : 0)
  }

  // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // ! GET USER SKILLS

  const getUserSkills = async (
  // options object
  {
    page,
    limit,
    skillTitle,
    skillCategoryTitle,
    proficiency
  } = {}
  // function arguments
  , isMentor, // BOOLEAN: returns all mentor skills by user ID from the cookie
  allSkills // BOOLEAN: returns all skills if filtering criteria yield no results, must be used even if there are no filtering criteria
  ) => {
    dispatch(set_skills_loading(true)) // set loading state

    // call constructParams
    const filteredParams = constructParams({
      page,
      limit,
      skillTitle,
      skillCategoryTitle,
      proficiency
    })

    console.log('FILTERED PARAMS IN getUserSkills: ', filteredParams)

      try {
        const res = await axios({
          method: 'get',
          url: '/user-skill/get-user-skills',
          params: {
            isMentor,
            allSkills,
            ...filteredParams
          }
        })

        logIfNodeDev('getUserSkills API response: ', res)

        if (res.status === 200) {
          dispatch(set_user_skills(res.data.skills)) // update context
          return res.data.skills // return results directly when assigned to a variable in a component
        }
      } catch (error) {
        logIfNodeDev('getUserSkills API error: ', error)

        const err = error.response.data.error
        returnError(err)
      } finally {
        dispatch(set_skills_loading(false))
      }
  }

  // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // ! GET MENTORS BY UUID

  const getMentorsByUuid = async (mentorData) => {
    console.log('mentorData in getMentorsByUuid: ', mentorData)

    dispatch(set_skills_loading(true)) // set loading state

    const filteredData = constructParams(mentorData)
    console.log('processedData in getMentorsByUuid', filteredData)

    try {
      const res = await axios({
        method: 'post',
        url: '/search/mentor/by-uuid',
        data: filteredData
      })

      logIfNodeDev('getMentorsByUuid API response: ', res)

      if (res.status === 200) {
        setMentors(res.data)
      }
    } catch (error) {
      logIfNodeDev('getMentorsByUuid API error: ', error)

      const err = error.response.data.error
      returnError(err)
    } finally {
      dispatch(set_skills_loading(false))
    }
  }

  return {
    // skill categories
    getSkillCategories,
    createSkillCategory,
    editSkillCategory,
    deleteSkillCategory,
    // proto skills
    getProtoSkills,
    // user skills
    getUserSkills,
    // mentors
    getMentorsByUuid
  }
}

export default useApiConnectors
