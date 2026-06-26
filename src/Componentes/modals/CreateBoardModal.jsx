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
  const [isNewCreated, setIsNewCreated] = useState(false)
  const [boardInformation, setBoardInformation] = useState({
    boardName: "",
    description: ""
  })

  const [isInformationCorrect, setIsInformationCorrect] = useState({
    boardName: true,
    description: true
  })

  const [descriptionField, setDescriptionField] = useState(false)
  const modifyStatusModal = useModals((state) => state.updateModalStatus);

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

    checkFieldInformation("boardName", isTitleValid)
    checkFieldInformation("description", isDescriptionValid)

    if (!isTitleValid || !isDescriptionValid) return;
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
      <div className="bg-elevated border border-zinc-800 absolute top-1/2 left-1/2 max-w-md -translate-x-1/2 -translate-y-1/2 w-[90%] p-6 rounded-2xl shadow-xl shadow-black/30">
        <h2 className="text-lg font-display font-semibold text-zinc-100 mb-5">New board</h2>
        <div>
          <Input nameField={"boardName"} changeEvent={addInformation}>What's the board name?</Input>
          {
            !isInformationCorrect.boardName && <div className="text-rose-400 text-xs mt-1 ml-1">
              Enter a valid value
            </div>
          }
        </div>
        <div className="flex gap-2.5 items-center mt-4">
          <input className="checkbox" onClick={addDescription} type="checkbox" id="add-description" />
          <label className="text-zinc-500 text-sm cursor-pointer select-none" htmlFor="add-description">Add description</label>
        </div>
        {
          descriptionField && <div className="mt-4">
            <TextArea fieldName={"description"} changeEvent={addInformation} />
            {
              !isInformationCorrect.description && <div className="text-rose-400 text-xs mt-1 ml-1">
                Enter a valid value
              </div>
            }
          </div>
        }

        <div className="flex justify-end items-center gap-3 mt-6">
          <Button variant="ghost" event={closeModal}>Cancel</Button>
          <Button variant="primary" event={createBoard}>Create Board</Button>
        </div>
      </div>
      {
        isNewCreated && <AlertDialog variant={"advise"} title={"Done!"} description={"Board created successfully."} />
      }
    </div>
  )
}

export default CreateBoardModal;