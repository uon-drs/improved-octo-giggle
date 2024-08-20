import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SeclectOption {
  value: string;
  label: string;
}

type SelectOptions = SeclectOption[];

type CustomSelectProps = {
  label: string;
  placeholder?: string;
  options: SelectOptions;
};

type SchemaColumnProps = {
  dataTypes: SelectOptions;
  checks: SelectOptions;
  handleColumnNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SchemaColumn = ({
  dataTypes,
  checks,
  handleColumnNameChange,
}: SchemaColumnProps) => {
  return (
    <>
      <div className="flex max-w-xl flex-col gap-4 border border-blue-900 rounded-md p-4">
        <div className="flex flex-col gap-2 max-w-md">
          <h3 className="flex items-center">Column name</h3>
          <Input
            name="columnName"
            className="text-lg w-md"
            required
            onChange={handleColumnNameChange}
          />
        </div>
        <CustomSelect
          label="Data types"
          placeholder="Select Data types"
          options={dataTypes}
        />
        <div className="flex gap-8 max-w-md">
          <CustomSelect
            label="Checks"
            placeholder="Select checks"
            options={checks}
          />
          <div className="flex flex-col gap-2 max-w-md">
            <h3 className="flex items-center">Value</h3>
            <Input name="columnName" className="text-lg w-md" required />
          </div>
        </div>
      </div>
    </>
  );
};

const CustomSelect = ({ label, placeholder, options }: CustomSelectProps) => {
  return (
    <div className="flex flex-col gap-2 max-w-md ">
      <h3 className="flex items-center">{label}</h3>
      <Select>
        <SelectTrigger className="w-full rounded-md p-2 border border-blue-900">
          <SelectValue placeholder={placeholder || "Select an option"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="any">Any</SelectItem>
            {options.map((option, index) => (
              <SelectItem key={index} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
