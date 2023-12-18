import LogFo from "../components/LogFo";  
import { useNavigate } from "react-router-dom"; 

const Home = ({ authenticated, onAuthenticated }) => {
  const navigate = useNavigate();
  return (
    <>
      {!authenticated ? (
        <LogFo
          authenticated={authenticated}
          onAuthenticated={onAuthenticated}
        />
      ) : (
        navigate("/courses")
      )}
    </>
  );
};

export default Home;
