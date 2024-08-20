"use server";

import request from "@/lib/api/request";

const fetchKeys = {
  dataTypes: () => "datatypes/",
  checks: () => "checks/",
  createSchema: () => "createschema/", // TODO: Add the correct endpoint
};

export async function getDataTypeList(): Promise<string[]> {
  try {
    return await request<string>(fetchKeys.dataTypes());
  } catch (error) {
    console.warn("Failed to fetch data.");
    return [];
  }
}


export async function getChecksList(): Promise<string[]> {
  try {
    return await request<string>(fetchKeys.checks());
  } catch (error) {
    console.warn("Failed to fetch data.");
    return [];
  }
}

export async function createSchema(
  schema: any,
): Promise<{ success: boolean; errorMessage?: string }> {
  try {
    await request(fetchKeys.createSchema(), {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        schema,
      }),
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, errorMessage: error.message };
  }
}
