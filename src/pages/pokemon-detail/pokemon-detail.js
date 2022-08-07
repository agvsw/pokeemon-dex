import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Skeleton, Tabs, List, Progress } from 'antd';
import { POKEMON } from '../../api';
import { getPokemon } from '../../services/pokemon';

const { TabPane } = Tabs;

const PokemonDetail = () => {

  const[pokemon, setPokemon] = useState(null)
  const[loading, setLoading] = useState(false)
  const[about, setAbout] = useState([]);
  const[species, setSpecies] = useState([]);
  const[stats, setStats] = useState([]);
  const[move, setMove] = useState([]);

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const name = params.get('name');
    getDataPokemon(name);
  }, [])

  // get data pokemon by name
  const getDataPokemon = async (name) => {
    setLoading(true)
    let _pokemon = await getPokemon({url: `${POKEMON}/${name}`})
    setPokemon(_pokemon);

    // assign description about pokemon
    setAbout([
      {
        title : 'Name',
        description : _pokemon.name
      },
      {
        title : 'Height',
        description : _pokemon.height
      },
      {
        title : 'Weight',
        description : _pokemon.weight
      }
    ]);

    // assign species data
    setSpecies([
      {
        title : 'Species Name',
        description : _pokemon.species?.name
      }
    ]);

    // assign stats data
    _pokemon.stats?.forEach((st, i) => {
      setStats((old) => [...old, {
        title: st.stat.name,
        value: st.base_stat
      }]);
    });

    // assign move data
    _pokemon.moves?.forEach((mv) => {
      setMove((old) => [...old, {
        title: mv.move.name
      }])
    })
    setLoading(false);
  }

  return (
    <Skeleton loading={loading} active >
      <Row>
        <Col span={8}>
          <Card
          style={{width: 400}}
          bordered={false}
          hoverable
          cover={<img alt="example" src={pokemon && pokemon.sprites ? pokemon.sprites.other.home.front_default : null} />}
          >
          </Card>
        </Col>
        <Col span={10}>
          <Tabs tabPosition='left'>
            <TabPane tab="About" key="1">
              <List
                itemLayout="horizontal"
                dataSource={about}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.title}
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
            </TabPane>
            <TabPane tab="Species" key="2">
              <List
                itemLayout="horizontal"
                dataSource={species}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.title}
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
            </TabPane>

            <TabPane tab="stats" key="stats">
              <List
                style={{overflow: 'auto', height: '350px'}}
                itemLayout="horizontal"
                dataSource={stats}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.title}
                      description={<Progress format={() => {return item.value}} percent={item.value} />}
                    />
                  </List.Item>
                )}
              />
            </TabPane>

            <TabPane tab="move" key="move">
              <List
                style={{overflow: 'auto', height: '350px'}}
                itemLayout="horizontal"
                dataSource={move}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.title}
                    />
                  </List.Item>
                )}
              />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </Skeleton>
  )
}

export default PokemonDetail;
