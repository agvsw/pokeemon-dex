export function getPokemon({ url }) {
    return new Promise((resolve, reject) => {
        fetch(url).then(res => res.json())
            .then(data => {
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
    });
}

export async function getAllPokemon(url, params) {
    return new Promise((resolve, reject) => {
        fetch(`${url}?limit=${params.limit}&offset=${params.offset}`).then(res => res.json())
            .then(data => {
                resolve(data)
            }).catch((err) => {
                reject(err)
        })
    });
}
