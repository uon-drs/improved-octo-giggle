"use client";

import { SchemaColumn, SelectOptions } from "@/components/schema/SchemaColumn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Column, ColumnsDict, Schema } from "../types";
import { createSchema } from "../actions";

const defaultColumn: Column = {
    name: "",
    type: "",
    checks: { checkType: "", value: "" },
  };

export default function CreateSchemaForm({dataTypes, checks}: {dataTypes: SelectOptions; checks: SelectOptions;}) {
    const [columns, setColumns] = useState<Column[]>([defaultColumn]);
  
    const [schemaName, setSchemaName] = useState<string>("");
  
    const handleAddColumn = () => {
      setColumns([...columns, defaultColumn]);
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
      const columnsDict: ColumnsDict = columns.reduce(
        (acc: ColumnsDict, column: Column, index: number) => {
          acc[`column${index + 1}`] = {
            title: column.name,
            dtype: column.type,
          };
          return acc;
        },
        {}
      );
  
      const schema = {
        schema_type: schemaName,
        columns: columnsDict,
      };
  
      let body: Schema = {
        name: schemaName,
        schema: JSON.stringify(schema),
      }
      createSchema(body);
    };
  
    return (
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
                dataTypes={dataTypes}
                checks={checks}
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
    );
  }