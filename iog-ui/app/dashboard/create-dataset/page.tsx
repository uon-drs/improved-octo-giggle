import { getChecks, getDataTypes } from "./actions";
import CreateSchemaForm from "./components/CreateSchemaForm";

export default async function CreateSchema() {
  const dataTypes = await getDataTypes();
  const checks = await getChecks();

  return (
    <div className="flex w-full flex-col px-4 py-2 md:col-span-4 gap-4">
      <h1 className="text-2xl flex md:text-3xl font-semibold text-left">
        Create Schema
      </h1>

      <CreateSchemaForm dataTypes={dataTypes} checks={checks} />
    </div>
  );
}
