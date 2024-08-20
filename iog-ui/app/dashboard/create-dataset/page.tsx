import React from "react";
import CreateSchemaForm from "@/components/schema/CreateSchemaForm";
import { getChecksList, getDataTypeList } from "@/api/schema";

const SchemaForm = async () => {
  const dataTypes = await getDataTypeList();
  const checks = await getChecksList();

  return <CreateSchemaForm dataTypes={dataTypes} checks={checks} />;
};

export default SchemaForm;
