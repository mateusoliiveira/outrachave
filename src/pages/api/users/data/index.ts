import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import { ApiServer } from '../../../../_services'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { token }: any = await getToken({ req })
    if (req.method == 'GET') {
        try {
            const { data } = await ApiServer.get(`/users/data`, {
                headers: { Authorization: 'Bearer ' + token }
            })
            const newData = {
                ...data[0],
                offers: JSON.parse(data['offers'])
            }
            res.status(200).json(newData)
        } catch (error: any) {
            res.status(error.response.status).json(error.response.data)
        }
    }
}
