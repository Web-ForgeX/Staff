import { X, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ListInputProps {
  label: string;
  items: string[];
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
}

const handleListChange = (
  index: number,
  value: string,
  list: string[],
  setList: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const newList = [...list];
  newList[index] = value;
  setList(newList);
};

const addListItem = (
  list: string[],
  setList: React.Dispatch<React.SetStateAction<string[]>>
) => {
  setList([...list, ""]);
};

const removeListItem = (
  index: number,
  list: string[],
  setList: React.Dispatch<React.SetStateAction<string[]>>
) => {
  if (list.length > 1) {
    const newList = list.filter((_, i) => i !== index);
    setList(newList);
  }
};

const ListInput: React.FC<ListInputProps> = ({ label, items, setItems }) => {
  return (
    <div className="space-y-4">
      <label className="text-sm font-medium">{label}</label>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={item}
              onChange={(e) => handleListChange(index, e.target.value, items, setItems)}
              placeholder={`Enter a ${label.toLowerCase().slice(0, label.length - 1)}...`}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => removeListItem(index, items, setItems)}
              disabled={items.length === 1}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          onClick={() => addListItem(items, setItems)}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add {label}
        </Button>
      </div>
    </div>
  );
};

export default ListInput;
