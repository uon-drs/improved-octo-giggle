"use server";

import { SelectOptions } from "@/components/schema/SchemaColumn";
import { apiBaseUrl } from "@/lib/constants";
import { ApiError } from "@/lib/errors";
import { capitalise } from "@/lib/utils";

export async function getChecks(): Promise<SelectOptions> {
    const response = await fetch(`${apiBaseUrl}/checks`, {
        method: "GET"
    });

    if (!response.ok) {
        const errorMessage: string = await response.text();
        throw new ApiError(errorMessage, response.status);
    }

    const checks: string[] = await response.json()

    return checks.map((check: string) => ({value: check, label: check}));
}

export async function getDataTypes() {
    const response = await fetch(`${apiBaseUrl}/datatypes`, {
        method: "GET"
    });

    if (!response.ok) {
        const errorMessage: string = await response.text();
        throw new ApiError(errorMessage, response.status);
    }

    const dataTypes: string[] = await response.json()

    return dataTypes.map((dt: string) => ({value: dt, label: capitalise(dt)}));
}
