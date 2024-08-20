import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface SeclectOption {
  value: string;
  label: string;
}

type SelectOptions = SeclectOption[];

type CustomSelectProps = {
  columnIndex: number;
  label: string;
  placeholder?: string;
  options: SelectOptions;
  handleSelectChange: (value: string | "") => void;
};

type Checks = {
  checkType: string;
  value: string;
};

type Column = {
  name: string;
  type: string;
  checks: Checks[];
};

type SchemaColumnProps = {
  index: number;
  dataTypes: string[];
  checks: string[];
  columns: Column[];
  setColumns: (columns: Column[]) => void;
};

export const SchemaColumn = ({
  index,
  dataTypes,
  checks,
  columns,
  setColumns,
}: SchemaColumnProps) => {
  const handleColumnNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColumns = columns.map((column, i) => {
      if (i === index) {
        return { ...column, name: e.target.value };
      }
      return column;
    });
    setColumns(newColumns);
  };

  const handleDataTypeSelectChange = (value: string) => {
    const newColumns = columns.map((column, i) => {
      if (i === index) {
        return { ...column, type: value };
      }
      return column;
    });
    setColumns(newColumns);
  };

  const handleCheckSelectChange = (value: string, checkIndex: number) => {
    const newColumns = columns.map((column, i) => {
      if (i === index) {
        return {
          ...column,
          checks: column.checks.map((check, j) => {
            if (j === checkIndex) {
              return { ...check, checkType: value };
            }
            return check;
          }),
        };
      }
      return column;
    });
    setColumns(newColumns);
  };

  const handleCheckInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    checkIndex: number
  ) => {
    const newColumns = columns.map((column, i) => {
      if (i === index) {
        return {
          ...column,
          checks: column.checks.map((check, j) => {
            if (j === 0) {
              return { ...check, value: e.target.value };
            }
            return check;
          }),
        };
      }
      return column;
    });
    setColumns(newColumns);
  };

  return (
    <>
      <div className="flex max-w-xl flex-col gap-4 border border-blue-900 rounded-md p-4">
        <div className="flex flex-col gap-2 w-full">
          <h3 className="flex items-center">Column name</h3>
          <Input
            name="columnName"
            className="text-lg w-md"
            required
            onChange={handleColumnNameChange}
          />
        </div>
        <CustomSelect
          columnIndex={index}
          label="Data types"
          placeholder="Select Data types"
          options={dataTypes?.map((type) => ({ value: type, label: type }))}
          handleSelectChange={handleDataTypeSelectChange}
        />
        <div className="flex gap-8">
          <CustomSelect
            columnIndex={index}
            label="Checks"
            placeholder="Select checks"
            options={checks?.map((check) => ({ value: check, label: check }))}
            handleSelectChange={(value) => handleCheckSelectChange(value, 0)}
          />
          <div className="flex flex-col gap-2 max-w-md">
            <h3 className="flex items-center">Value</h3>
            <Input
              name="columnName"
              className="text-lg w-md"
              onChange={(e) => handleCheckInputChange(e, 0)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const CustomSelect = ({
  label,
  placeholder,
  options,
  handleSelectChange,
}: CustomSelectProps) => {
  const [selectedValue, setSelectedValue] = useState<string>("any");

  return (
    <div className="flex flex-grow flex-col gap-2 w-full">
      <h3 className="flex items-center">{label}</h3>
      <Select
        value={selectedValue}
        onValueChange={(value) => {
          setSelectedValue(value);
          handleSelectChange(value);
        }}
      >
        <SelectTrigger className="w-full rounded-md p-2 border border-blue-900">
          <SelectValue placeholder={placeholder || "Select an option"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="any">Any</SelectItem>
            {options?.map((option, index) => (
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
