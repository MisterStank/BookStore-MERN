import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { BsArrowLeft } from 'react-icons/bs';

const BackButton = ({ destination = '/' }) => {
  return (
    <Button
      type="primary"
      style={{ backgroundColor: '#38bdf8' }}
    >
      <Link to={destination} style={{ color: 'white' , flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
       <BsArrowLeft /> Back
      </Link>
    </Button>
  );
};

export default BackButton;