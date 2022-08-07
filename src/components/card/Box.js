import { Card } from 'antd'
import { Link } from "react-router-dom";



const { Meta } = Card;

const Box = ({item}) => {
	return (
    <Link to={`/detail?name=${item.name}`}>
      
        <Card
            bordered={false}
            hoverable
            cover={<img alt="example" src={item?.sprites?.other?.home.front_default} />}
        >
            <Meta title={item.name} />
        </Card> 
      
    </Link>
	)
}

export default Box
