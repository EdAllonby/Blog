import "server-only";

import { GraphQLClient, type Variables } from "graphql-request";

import { env } from "@/env";

const client = new GraphQLClient(env.CMS_SCHEMA_URL, {
  headers: env.CMS_TOKEN
    ? { Authorization: `Bearer ${env.CMS_TOKEN}` }
    : undefined,
});

export function request<TQuery>(query: string): Promise<TQuery>;
export function request<TQuery, TVariables extends Variables>(
  query: string,
  variables: TVariables,
): Promise<TQuery>;
export async function request<TQuery, TVariables extends Variables>(
  query: string,
  variables?: TVariables,
) {
  if (!variables) {
    const response = await client.rawRequest<TQuery>(query);
    return response.data;
  }

  const response = await client.rawRequest<TQuery, TVariables>(
    query,
    variables,
  );
  return response.data;
}
