/* eslint-disable react/prop-types */
// components
import ButtonPagination from "../buttons/ButtonPagination"

const PaginationControls = ({state}) => {
  return (
    <div>
      <ButtonPagination prev={true} state={state} />{' '}
      {state.page} / {state.totalPages}{' '}
      <ButtonPagination state={state} />
    </div>
  )
}

export default PaginationControls
