export const useFetch = () => {
    const f = (methode: string) => (url: string, body: any) => fetch(url, {
        body: body ? JSON.stringify(body) : null,
        method: methode,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiJjbGdtOWV6dXQwMDAwYnczaW16YXd4YW9sIiwibmFtZSI6ImFkbWluIiwiZW1haWwiOiJlbWFpbEBnbWFpbC5jb20ifSwiaWF0IjoxNjgxOTA1MTE5LCJleHAiOjE2ODI1MDk5MTl9.IFuGNPpVQdQAT-gBt4jrvHLai2a5pSxeyICe6ruP46E'
        },

    })

    return {
        get: f('GET'),
        post: f('POST')
    }
}