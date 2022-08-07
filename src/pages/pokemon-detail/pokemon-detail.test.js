import {getPokemon} from "../../services/pokemon";
import {render, screen, waitFor} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import PokemonDetail from "./pokemon-detail";

jest.mock('../../services/pokemon')

global.matchMedia = global.matchMedia || function () {
    return {
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
    };
};

describe("pokemon detail component", () => {
    beforeEach(() => jest.clearAllMocks());
    it("should render pokemons when api response", async () => {
        getPokemon.mockResolvedValue({
            name: 'pokedex'
        })
        render(<PokemonDetail/>,{wrapper: BrowserRouter})
        await waitFor(() => {
            screen.getByText("pokedex")
        })
    })
})
