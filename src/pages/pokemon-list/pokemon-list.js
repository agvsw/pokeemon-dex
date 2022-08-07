import { Row, Col, Skeleton} from 'antd';
import Box from "../../components/card";
import SearchForm from '../../components/form-search/form';
import { Pagination } from 'antd';
import React, { useState, useEffect } from 'react';
import { getPokemon, getAllPokemon } from '../../services/pokemon';
import { POKEMON } from '../../api';

const styleForm = {
  width: 300,
}

const PokemonList = () => {

  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
  });

  const [pokemonData, setPokemonData] = useState([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    fetchData(pagination)
  }, [])

  // search by name function
  const search = async (value) => {
    if(value){
      setLoading(true)
      let pokemonRecord = await getPokemon({url: `${POKEMON}/${value}`}).catch((err) => {
        setPokemonData([])
        setCount(0)
        setLoading(false)
      })
      if(pokemonRecord){
        setPokemonData([pokemonRecord])
        setCount(1)
        setLoading(false)
      }

    }else{
      fetchData();
    }
  }

  // get all data pokemon
  const fetchData = async (params = {}) => {
    setLoading(true)
    let response = await getAllPokemon(POKEMON, params).catch((err) => {
      setLoading(false)
    });
    if (response){
      setCount(response.count)
      await loadPokemon(response.results);
    }
  }

  // load detail pokemon
  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(data && data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon).catch((err) => {console.log(err)})
      return pokemonRecord
    })).catch((err) => {console.log(err)})
    setPokemonData(_pokemonData);
    setLoading(false)
  }

  // pagination change
  const onChangePage = (page, pageSize) => {
    let pagination = {
      offset: pageSize * (page-1),
      limit: pageSize
    }
    setPagination(pagination)
    fetchData(pagination)
  }

  return (
    <div>
      <div className='form-search' style={styleForm}>
        <SearchForm onSearch={search}/>
      </div>
      <Skeleton loading={loading} active style={{marginTop: 20}}>
        <Row gutter={[16,16]} style={{marginTop: 20}}>
            {
                pokemonData && pokemonData.length ? pokemonData.map((row, i) => {
                  return <Col lg={4} xs={6} sm={12} key={i}>
                    <Box item={row} />
                  </Col> 
                }) : <Skeleton loading={loading} active>
                        <div className="pfp-content-slim" style={{ margin: '20px 0', textAlign:'center', fontSize:'20px' }}>
                          Data not found
                        </div>
                      </Skeleton>
            }
            <Col lg={24}>
                  <Pagination 
                    {...pagination} 
                    total={count} 
                    onChange={onChangePage}
                    style={{ float:'right' }}/>
                </Col>
          </Row>
      </Skeleton>
    </div>
  );
}

export default PokemonList;
