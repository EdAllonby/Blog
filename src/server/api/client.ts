import { GraphQLClient } from "graphql-request";
import { env } from "../../env/server.mjs";

export const request = async <TQuery>(
  query: string,
  variables?: Record<string, string>
) => {
  const headers = {
    Authorization: env.CMS_TOKEN ? `Bearer ${env.CMS_TOKEN}` : "",
  };

  const client = new GraphQLClient(env.CMS_SCHEMA_URL, {
    headers: headers,
  });
  return await client.request<TQuery>(query, variables);
};
