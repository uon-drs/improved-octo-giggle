"use client";
import { createSchema } from "@/api/schema";
import { SchemaColumn } from "@/components/schema/SchemaColumn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type Checks = {
  checkType: string;
  value: string;
};

type Column = {
  name: string;
  type: string;
  checks: Checks[];
};

interface ColumnsDict {
  [key: string]: {
    title: string;
    dtype: string;
    checks?: {
      [key: string]: string;
    };
  };
}

const defaultColumn: Column = {
  name: "",
  type: "",
  checks: [{ checkType: "", value: "" }],
};

interface CreateSchemaFormProps {
  dataTypes: string[];
  checks: string[];
}

const CreateSchemaForm: React.FC<CreateSchemaFormProps> = ({
  dataTypes,
  checks,
}) => {
  const handleSubmit = async (schema: any) => {
    const response = await createSchema(schema);
    console.log(response);
  };

  const [columns, setColumns] = useState<Column[]>([defaultColumn]);

  const [schemaName, setSchemaName] = useState<string>("");

  const handleAddColumn = () => {
    setColumns([...columns, defaultColumn]);
  };

  const handleSchemaNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSchemaName(e.target.value);
  };

  const handleCreateSchema = () => {
    const columnsDict: ColumnsDict = columns.reduce(
      (acc: ColumnsDict, column: Column, index: number) => {
        acc[`column${index + 1}`] = {
          title: column.name,
          dtype: column.type,
          checks: column.checks.reduce(
            (acc: { [key: string]: string }, check: Checks, index: number) => {
              acc[check.checkType] = check.value;
              return acc;
            },
            {}
          ),
        };
        return acc;
      },
      {}
    );

    const schema = {
      schema_type: schemaName,
      columns: columnsDict,
    };

    handleSubmit(schema);
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
              index={index}
              dataTypes={dataTypes}
              checks={checks}
              columns={columns}
              setColumns={setColumns}
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
};

export default CreateSchemaForm;
