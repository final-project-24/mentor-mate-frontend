// hooks
import classNames from "classnames"
import useStateSelectors from "../../../hooks/useStateSelectors"

// utils
import transformString from "../../../utils/transformString"

const RenderErrorArray = () => {
  const {errorsArray} = useStateSelectors()

  const errorsWrapper = classNames('mx-3 p-3 border-2 border-red-800 rounded-md bg-card', {
    'hidden': errorsArray.length === 0
  })

  return (
    <div className={errorsWrapper}>
      {errorsArray.map((e, i) => (
        <ul key={i}>
          <p>
            {transformString(e.path)}
          </p>
            <>
              {e.message.map((e, i) => (
                <li 
                  className="list-disc ml-7 text-red-600"
                  key={i}
                >
                  {e}
                </li>
              ))}
            </>
        </ul>
      ))}
    </div>
  )
}

export default RenderErrorArray
