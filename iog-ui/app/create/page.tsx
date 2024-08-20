"use client";

import { SchemaColumn } from "@/components/schema/SchemaColumn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const dummyDataTypes = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "date", label: "Date" },
  { value: "boolean", label: "Boolean" },
  { value: "enum", label: "Enum" },
];

type Column = {
  name: string;
  type: string;
  check: string;
};

export default function CreateSchema() {
  const [columns, setColumns] = useState<Column[]>([
    { name: "", type: "", check: "" },
  ]);

  const [schemaName, setSchemaName] = useState<string>("");

  const handleAddColumn = () => {
    setColumns([...columns, { name: "", type: "", check: "" }]);
  };

  const handleSchemaNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSchemaName(e.target.value);
  };

  const handleColumnNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newColumns = columns.map((column, i) => {
      if (i === index) {
        return { ...column, name: e.target.value };
      }
      return column;
    });
    setColumns(newColumns);
  };

  const handleCreateSchema = () => {
    const schema = {
      name: schemaName,
      columns: columns.map((column) => ({
        name: column.name,
        type: column.type,
        check: column.check,
      })),
    };

    console.log(JSON.stringify(schema, null, 2));
  };

  return (
    <div className="flex w-full flex-col px-4 py-2 md:col-span-4 gap-4">
      <h1 className="text-2xl flex md:text-3xl font-semibold text-left">
        Create Schema
      </h1>

      <div className="flex flex-col gap-4 max-w-xl border border-blue-400 rounded-lg p-4">
        <div className="flex flex-col gap-2 max-w-lg">
          <h3 className="flex items-center">Name</h3>
          <Input
            name="name"
            className="text-lg"
            required
            onChange={handleSchemaNameChange}
          />
        </div>

        <div className="flex flex-col gap-4">
          {columns.map((column, index) => (
            <SchemaColumn
              key={index}
              dataTypes={dummyDataTypes}
              checks={dummyDataTypes}
              handleColumnNameChange={(e) => handleColumnNameChange(e, index)}
            />
          ))}
        </div>

        <div className="flex  gap-4">
          <Button className="w-40 self-end" onClick={handleAddColumn}>
            Add column
          </Button>
          <Button className="w-40 self-end" onClick={handleCreateSchema}>
            Create Schema
          </Button>
        </div>
      </div>
    </div>
  );
}
