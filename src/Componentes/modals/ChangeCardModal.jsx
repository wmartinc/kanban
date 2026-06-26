import { useState } from "react";
import { useModals } from "../../store/store";
import Button from "../ui/shared/Button";
import TextArea from "../ui/shared/TextArea";

const ChangeCardModal = ({ cardData }) => {
  const [selectedOption, setSelectedOption] = useState("dates");
  const [cardInformation, setCardInformation] = useState({
    isCompleted: false,
    description: "",
    ...cardData
  });

  const modifyStatusModal = useModals((state) => state.updateModalStatus);

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
    closeModal();
  };

  return (
    <div className="bg-elevated border border-zinc-800 absolute top-1/2 left-1/2 max-w-xl -translate-x-1/2 -translate-y-1/2 w-[90%] p-6 rounded-2xl shadow-xl shadow-black/30">
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
          className="text-zinc-100 text-lg font-display font-semibold capitalize cursor-pointer flex-1"
        >
          {cardInformation.title || "Unnamed card"}
        </label>
      </div>

      <div className="flex gap-2 mb-6">
        {["dates", "labels"].map((key) => {
          const isSelected = selectedOption === key;
          const labels = { dates: { label: "Dates", summary: "Set due date" }, labels: { label: "Labels", summary: "Add labels" } };
          return (
            <button
              key={key}
              onClick={() => setSelectedOption(key)}
              className={`flex-1 flex flex-col items-start p-3 rounded-xl text-left transition-all duration-200
                ${isSelected ? "bg-purple-500/10 border border-purple-500/30" : "bg-zinc-800/30 border border-zinc-800 hover:border-zinc-700"}`}
            >
              <span className="text-zinc-200 text-sm font-medium">{labels[key].label}</span>
              <span className="text-zinc-500 text-xs mt-0.5">{labels[key].summary}</span>
            </button>
          );
        })}
      </div>

      <div className="mb-6">
        <TextArea
          fieldName="description"
          size="w-full"
          changeEvent={handleDescriptionChange}
        />
      </div>

      <div className="flex justify-end items-center gap-3">
        <Button variant="ghost" event={closeModal}>Cancel</Button>
        <Button variant="primary" event={handleSaveChanges}>Save</Button>
      </div>
    </div>
  );
};

export default ChangeCardModal;
