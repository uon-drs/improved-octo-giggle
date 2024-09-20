import CreateSchemaForm from "./components/CreateSchemaForm";

const dummyDataTypes = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "date", label: "Date" },
  { value: "boolean", label: "Boolean" },
  { value: "enum", label: "Enum" },
];

export default function CreateSchema() {

  return (
    <div className="flex w-full flex-col px-4 py-2 md:col-span-4 gap-4">
      <h1 className="text-2xl flex md:text-3xl font-semibold text-left">
        Create Schema
      </h1>

      <CreateSchemaForm dataTypes={dummyDataTypes} checks={dummyDataTypes} />
    </div>
  );
}
