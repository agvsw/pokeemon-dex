import {getAllPokemon, getPokemon} from "../../services/pokemon";
import {render, screen, waitFor} from "@testing-library/react";
import PokemonList from "./pokemon-list";
import {BrowserRouter} from "react-router-dom";

jest.mock('../../services/pokemon')

global.matchMedia = global.matchMedia || function () {
    return {
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
    };
};

describe("pokemon list component", () => {
    beforeEach(() => jest.clearAllMocks());
    it("should render pokemons when api response", async () => {
        getPokemon.mockResolvedValue({
            name: 'bulbasaur'
        })
        getAllPokemon.mockResolvedValue({
            "results": [
                {
                    "name": "bulbasaur",
                    "url": "https://pokeapi.co/api/v2/pokemon/1/"
                }
            ]
        })
        render(<PokemonList/>,{wrapper: BrowserRouter})
        await waitFor(() => {
            screen.getByText("bulbasaur")
        })
    })

    it("should render pokemons when api failed", async () => {
        getAllPokemon.mockRejectedValue('error load data')
        render(<PokemonList/>,{wrapper: BrowserRouter})
        await waitFor(() => {
            screen.getByText("Data not found")
        })
    })
})
