import {getAllPokemon, getPokemon} from "./pokemon";

jest.mock('./pokemon')



describe("pokemon service", () => {
    beforeEach(() => jest.clearAllMocks());
    const data = {
        "count": 1154,
        "next": "https://pokeapi.co/api/v2/pokemon?offset=2&limit=2",
        "previous": null,
        "results": [
            {
                "name": "bulbasaur",
                "url": "https://pokeapi.co/api/v2/pokemon/1/"
            },
            {
                "name": "ivysaur",
                "url": "https://pokeapi.co/api/v2/pokemon/2/"
            }
        ]
    }

    const detailData = {
        name: 'pokedex'
    }

    it("success test get All pokemon", async () => {
        getAllPokemon.mockResolvedValue(data)
        const listPokemon = await getAllPokemon('', {limit: 2, offset: 0})
        expect(listPokemon).toEqual(data);
    })

    it("failed test get All pokemon", async () => {
        const message = 'failed';
        getAllPokemon.mockRejectedValue(message)
        const handle = (err) => {
            expect(err).toEqual(message);
        }
        await getAllPokemon('', {limit: 2, offset: 0}).catch(handle)
    })

    it("success test get pokemon by nmae", async () => {
        getPokemon.mockResolvedValue(detailData)
        const listPokemon = await getPokemon('')
        expect(listPokemon).toEqual(detailData);
    })

    it("failed test get pokemon", async () => {
        const message = 'failed';
        getPokemon.mockRejectedValue(message)
        const handle = (err) => {
            expect(err).toEqual(message);
        }
        await getPokemon('').catch(handle)
    })
})
