import { useState } from "react";
import { useModals } from "../../store/store";
import Button from "../ui/shared/Button";
import Input from "../ui/shared/Input";
import TextArea from "../ui/shared/TextArea";
import { createNewBoard } from "../../controllers/boards.controller";
import { checkDescriptionBoard, checkTitleBoard } from "../../../utilities/format";
import AlertDialog from "../ui/shared/AlertDialog";
const BOARDS_ENDPOINT = import.meta.env.VITE_BOARDS_ENDPOINT

const CreateBoardModal = () => {
  // States 
  const [isNewCreated, setIsNewCreated] = useState(false)
  const [isEntryValid, setEntryValid] = useState(true)
  const [boardInformation, setBoardInformation] = useState({
    boardName: "",
    description: ""
  })

  const [isInformationCorrect, setIsInformationCorrect] = useState({
    boardName: true,
    description: true
  })

  const [descriptionField, setDescriptionField] = useState(false)
  // Global Status Modifiers 
  const modifyStatusModal = useModals((state) => state.updateModalStatus);

  // Functions
  const closeModal = () => {
    modifyStatusModal(false)
  }

  const addDescription = (ev) => {
    const isActive = ev?.target.checked;
    setDescriptionField(isActive);
  }

  const addInformation = (ev) => {
    if (!ev.target) return;
    const nameField = ev?.target.name;
    const contentField = ev?.target.value

    setBoardInformation({
      ...boardInformation,
      [nameField]: contentField
    })
  }


  const createBoard = async () => {
    const isTitleValid = checkTitleBoard(boardInformation.boardName)
    const isDescriptionValid = checkDescriptionBoard(boardInformation.description)

    console.log(isTitleValid, isDescriptionValid)
    checkFieldInformation("boardName", isTitleValid)
    checkFieldInformation("description", isDescriptionValid)

    if (!isTitleValid || !isDescriptionValid) return setEntryValid(false);
    const isBoardCreated = await createNewBoard(BOARDS_ENDPOINT, boardInformation)
    setIsNewCreated(isBoardCreated);
    closeModal()
    setTimeout(() => {
      setIsNewCreated(false)
    }, 3000);
  }

  const checkFieldInformation = (fieldName, value) => {
    setIsInformationCorrect(info => ({ ...info, [fieldName]: value }))
  }
  return (
    <div>
      <div className="bg-neutral-950 absolute top-1/2 left-1/2 max-w-96 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[40%] p-5 rounded-lg">
        <div>
          <Input nameField={"boardName"} changeEvent={addInformation}>What's the board name?</Input>
          {
            !isInformationCorrect.boardName && <div className="text-rose-700 text-sm ml-2 " >
              Enter a valid value.
            </div>
          }
        </div>
        <div className="flex gap-2 items-center mt-4">
          <input className="checkbox" onClick={addDescription} type="checkbox" id="add-description" />
          <label className="text-white/50" htmlFor="add-description">Add description.</label>
        </div>
        {
          descriptionField && <div className="mt-4">
            <TextArea fieldName={"description"} changeEvent={addInformation} />
            {
              !isInformationCorrect.description && <div className="text-rose-700 text-sm ml-2 " >
                Enter a valid value.
              </div>
            }
          </div>
        }

        <div className="flex justify-around items-center p-5 gap-4">
          <Button variant="ghost" event={closeModal}>Cancel</Button>
          <Button variant="ghost" event={createBoard}>Create Board</Button>
        </div>
      </div>
      {
        isNewCreated && <AlertDialog variant={"advise"} title={"Done!"} description={"Board created successfully."} />
      }
    </div>
  )
}

export default CreateBoardModal;