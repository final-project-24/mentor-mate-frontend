import { useDispatch } from "react-redux"
import { set_skill_category_description, set_skill_category_title } from "../../../store/skills-store/slices/skillCategoryFormSlice"

// hooks
import useStateSelectors from "../../../hooks/useStateSelectors"
import useApiConnectors from "../../../hooks/useApiConnectors"

// components
import ButtonCloseForm from "../buttons/ButtonCloseForm"
import ButtonSubmitForm from "../buttons/ButtonSubmitForm"
import RenderErrorArray from "../render-error-array/RenderErrorArray"
import { set_errors_array } from "../../../store/skills-store/slices/errorsSlice"

const SkillCategoryForm = () => {
  const dispatch = useDispatch()
  const {skillCategoryForm, addForm} = useStateSelectors()
  const {createSkillCategory, editSkillCategory} = useApiConnectors()

  const inputClass = 'max-w-full p-2 rounded-md'

  const onSubmit = (e) => {
    e.preventDefault()
    addForm
      ? createSkillCategory()
      : editSkillCategory()
    dispatch(set_errors_array([]))
  }

  return (
    <form 
      className="relative flex flex-col gap-8 px-2 pb-3 pt-12 rounded-md bg-stone-300"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-3">
        <input
          type="text"
          className={inputClass}
          onChange={e => dispatch(set_skill_category_title(e.target.value))}
          value={skillCategoryForm.skillCategoryTitle}
          placeholder="Skill Category Title"
        />
        <input
          type="text"
          className={inputClass}
          onChange={e => dispatch(set_skill_category_description(e.target.value))}
          value={skillCategoryForm.skillCategoryDescription}
          placeholder="Skill Category Description"
        />
      </div>
      <ButtonCloseForm />
      <RenderErrorArray />
      <div className="flex justify-center">
        <ButtonSubmitForm />
      </div>
    </form>
  )
}

export default SkillCategoryForm
