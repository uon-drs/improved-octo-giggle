import { SchemaColumn } from "@/components/schema/SchemaColumn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

      <div className="flex flex-col gap-4 max-w-xl border border-blue-400 rounded-lg p-4">
        <div className="flex flex-col gap-2 max-w-lg">
          <h3 className="flex items-center">Name</h3>
          <Input name="name" className="text-lg" required />
        </div>
        <SchemaColumn dataTypes={dummyDataTypes} checks={dummyDataTypes} />

        <Button className="w-40 self-end">Create Schema</Button>
      </div>
    </div>
  );
}
