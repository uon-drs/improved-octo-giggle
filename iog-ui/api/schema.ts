"use server";
import request from "@/lib/api/request";

const fetchKeys = {
  dataTypes: () => "datatypes/",
  checks: () => "checks/",
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