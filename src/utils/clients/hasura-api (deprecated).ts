// eslint-disable-next-line no-new-func
const importDynamic = new Function('modulePath', 'return import(modulePath)')

const fetch = async (...args: unknown[]) => {
    const module = await importDynamic('node-fetch')
    return module.default(...args)
}

interface HasuraFetchPropsType {
    query: string
    variables?: Record<string, unknown>
}

type HasuraRes<T> = {
    data: T
    errors?: Array<unknown>
}
/**
 * HASURA GraphQL gateway
 */
export default class HasuraAPI {
    static async send<T>({
        query,
        variables,
    }: HasuraFetchPropsType): Promise<T> {
        try {
            const response = await fetch(process.env.HASURA_ENDPOINT || '/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
                },
                body: JSON.stringify({
                    query: query,
                    variables: variables,
                }),
            })

            const data = (await response.json()) as HasuraRes<T>

            if (data?.errors) {
                throw Error(JSON.stringify(data?.errors))
            }

            if (!data.data)
                throw Error(
                    'Expecting "data" or "errors" properties in responce were not provided.',
                )

            return data.data
        } catch (e) {
            console.error(e)
            throw e
        }
    }
}
