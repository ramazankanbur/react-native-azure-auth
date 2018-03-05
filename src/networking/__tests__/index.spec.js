import Client from '../'
import fetchMock from 'fetch-mock'

describe('client', () => {
    const tenant = 'samples.auth0.com'
    const baseUrl = `https://${tenant}`

    describe('constructor', () => {
        it('should accept only baseUrl', () => {
            const client = new Client({baseUrl})
            expect(client.baseUrl).toEqual(baseUrl)
        })

        it('should accept only tenant', () => {
            const client = new Client({baseUrl: tenant})
            expect(client.baseUrl).toEqual(baseUrl)
        })

        it('should accept only http baseUrl', () => {
            const client = new Client({baseUrl: 'http://insecure.com'})
            expect(client.baseUrl).toEqual('http://insecure.com')
        })

        it('should allow to specify a bearer token', () => {
            const token = 'a.bearer.token'
            const client = new Client({baseUrl, token})
            expect(client.bearer).toEqual('Bearer a.bearer.token')
        })

        it('should fail with no tenant', () => {
            expect(() => new Client()).toThrowErrorMatchingSnapshot()
        })
    })

    describe('requests', () => {
        const client = new Client({
            baseUrl,
            token: 'a.bearer.token'
        })

        beforeEach(fetchMock.restore)

        describe('POST json', () => {
            const body = {
                string: 'value',
                number: 10
            }
            const response = {
                body: {
                    key: 'value'
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            it('should build proper request with body', async () => {
                fetchMock.postOnce('https://samples.auth0.com/method', response)
                expect.assertions(1)
                await client.post('/method', body)
                expect(fetchMock.lastCall()).toMatchSnapshot()
            })

            it('should build proper request with no body', async () => {
                fetchMock.postOnce('https://samples.auth0.com/method', response)
                expect.assertions(1)
                await client.post('/method')
                expect(fetchMock.lastCall()).toMatchSnapshot()
            })

            it('should return json on success', async () => {
                fetchMock.postOnce('https://samples.auth0.com/method', response)
                expect.assertions(1)
                await expect(client.post('/method', body)).resolves.toMatchSnapshot()
            })

            it('should handle no response', async () => {
                fetchMock.postOnce('https://samples.auth0.com/method', {status: 201})
                expect.assertions(1)
                await expect(client.post('/method', body)).resolves.toMatchSnapshot()
            })

            it('should handle request error', async () => {
                fetchMock.postOnce('https://samples.auth0.com/method', {throws: new Error('pawned!')})
                expect.assertions(1)
                await expect(client.post('/method', body)).rejects.toMatchSnapshot()
            })
        })

        describe('PATCH json', () => {
            const body = {
                string: 'value',
                number: 10
            }
            const response = {
                body: {
                    key: 'value'
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            it('should build proper request with body', async () => {
                fetchMock.patchOnce('https://samples.auth0.com/method', response)
                expect.assertions(1)
                await client.patch('/method', body)
                expect(fetchMock.lastCall()).toMatchSnapshot()
            })

            it('should build proper request with no body', async () => {
                fetchMock.patchOnce('https://samples.auth0.com/method', response)
                expect.assertions(1)
                await client.patch('/method')
                expect(fetchMock.lastCall()).toMatchSnapshot()
            })

            it('should return json on success', async () => {
                fetchMock.patchOnce('https://samples.auth0.com/method', response)
                expect.assertions(1)
                await expect(client.patch('/method', body)).resolves.toMatchSnapshot()
            })

            it('should handle no response', async () => {
                fetchMock.patchOnce('https://samples.auth0.com/method', {status: 201})
                expect.assertions(1)
                await expect(client.patch('/method', body)).resolves.toMatchSnapshot()
            })

            it('should handle request error', async () => {
                fetchMock.patchOnce('https://samples.auth0.com/method', {throws: new Error('pawned!')})
                expect.assertions(1)
                await expect(client.patch('/method', body)).rejects.toMatchSnapshot()
            })
        })

        describe('GET json', () => {

            const query = {
                string: 'value',
                number: 10
            }
            const response = {
                body: {
                    key: 'value'
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            it('should build proper request with query', async () => {
                fetchMock.getOnce('https://samples.auth0.com/method?string=value&number=10', response)
                expect.assertions(1)
                await client.get('/method', query)
                expect(fetchMock.lastCall()).toMatchSnapshot()
            })

            it('should build proper request with no query', async () => {
                fetchMock.getOnce('https://samples.auth0.com/method', response)
                expect.assertions(1)
                await client.get('/method')
                expect(fetchMock.lastCall()).toMatchSnapshot()
            })

            it('should return json on success', async () => {
                fetchMock.getOnce('https://samples.auth0.com/method?string=value&number=10', response)
                expect.assertions(1)
                await expect(client.get('/method', query)).resolves.toMatchSnapshot()
            })

            it('should handle no response', async () => {
                fetchMock.getOnce('https://samples.auth0.com/method?string=value&number=10', {status: 201})
                expect.assertions(1)
                await expect(client.get('/method', query)).resolves.toMatchSnapshot()
            })

            it('should handle request error', async () => {
                fetchMock.getOnce('https://samples.auth0.com/method?string=value&number=10', {throws: new Error('pawned!')})
                expect.assertions(1)
                await expect(client.get('/method', query)).rejects.toMatchSnapshot()
            })
        })
    })

    describe('url', () => {
        const client = new Client({
            baseUrl,
            token: 'a.bearer.token'
        })

        it('should build url with no query', () => {
            expect(client.url('/authorize', null, true)).toMatchSnapshot()
        })

        it('should build url with query', () => {
            expect(client.url('/authorize', {client_id: 'A_CLIENT_ID'}, true)).toMatchSnapshot()
        })

    })
})