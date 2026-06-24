import { useState } from "react";
import { useModals } from "../../store/store";
import Button from "../ui/shared/Button";
import TextArea from "../ui/shared/TextArea";
import { Check } from "lucide-react";

const ChangeCardModal = ({ cardData }) => {
  // States
  const [selectedOption, setSelectedOption] = useState("dates");
  const [cardInformation, setCardInformation] = useState({
    isCompleted: false,
    description: "",
    ...cardData
  });

  // Global Status Modifiers
  const modifyStatusModal = useModals((state) => state.updateModalStatus);

  // Functions
  const closeModal = () => {
    modifyStatusModal(false);
  };

  const handleCheckboxChange = () => {
    setCardInformation({
      ...cardInformation,
      isCompleted: !cardInformation.isCompleted
    });
  };

  const handleDescriptionChange = (ev) => {
    setCardInformation({
      ...cardInformation,
      description: ev.target.value
    });
  };

  const handleSaveChanges = () => {
    // Aquí irá la lógica para guardar cambios
    console.log("Guardando cambios:", cardInformation);
    closeModal();
  };

  const renderOptionButton = (optionKey, optionLabel, summary) => {
    const isSelected = selectedOption === optionKey;
    return (
      <Button
        key={optionKey}
        variant="ghost"
        event={() => setSelectedOption(optionKey)}
        className={`flex-1 flex-col items-start justify-start h-auto ${isSelected
          ? "bg-sky-500/30 border border-sky-500/50"
          : ""
          }`}
      >
        <span className="text-white text-sm font-semibold">{optionLabel}</span>
        <span className="text-white/40 text-xs">{summary}</span>
      </Button>
    );
  };

  return (
    <div>
      <div className="bg-neutral-950 absolute top-1/2 left-1/2 max-w-2xl -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[50%] p-6 rounded-lg border border-white/25">
        {/* Header with checkbox and card name */}
        <div className="flex items-center gap-3 mb-6">
          <input
            type="checkbox"
            className="checkbox"
            checked={cardInformation.isCompleted}
            onChange={handleCheckboxChange}
            id="card-complete"
          />
          <label
            htmlFor="card-complete"
            className="text-white text-lg font-semibold capitalize cursor-pointer flex-1"
          >
            {cardInformation.title || "Unnamed card"}
          </label>
        </div>

        {/* Options ribbon */}
        <div className="flex gap-2 mb-6">
          {renderOptionButton("dates", "Dates", "Set due date")}
          {renderOptionButton("labels", "Labels", "Add labels")}
        </div>

        {/* Description field */}
        <div className="mb-6 w-full">
          <div className="flex gap-2 items-center mb-3 w-full">
            <TextArea
              fieldName="description"
              size="w-full"
              changeEvent={handleDescriptionChange}
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end items-center gap-3">
          <Button variant="secondary" event={closeModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            event={handleSaveChanges}
            className="flex items-center gap-2"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChangeCardModal;
