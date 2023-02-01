import React from "react";
import "../styles/App.css";
import Loader from "./Loader";

const LoadingStatus = {
  NOT_STARTED: "NOT_STARTED",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
};

const App = () => {
  const BASE_URL = "https://content.newtonschool.co/v1/pr/main/users";
  const [userId, setUserId] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [userData, setUserData] = React.useState({
    id: "",
    email: "",
    name: "",
    phone: "",
    webiste: "",
  });

  setTimeout(() => {
    setIsLoading(false)
  },2000)

  const handleOnClick = async () => {
    if(userId > 1 && userId < 10) {
      setIsLoading(true)
        try{
          const response = await fetch(`${BASE_URL}/${userId}`);
          const data = await response.json();
          setUserData({name : data.name , id : data.id , email : data.email , phone : data.phone , website : data.website})
        }catch(err){
          console.log(err)
        }
       
      };
    }

  const onChangeHandler = (event) => {
    setUserId(event.target.value);
  };

  return (
    <div id="main">
      <label htmlFor="number">Enter an id for the user between 1 to 100</label>
      <input
        type="number"
        value={userId}
        onChange={onChangeHandler}
        id="input"
        min={1}
        max={10}
      />
      <button id="btn" onClick={handleOnClick}>
        Get User
      </button>
        {isLoading ? <Loader/> : 
      <div id="data">
        <h1>Click on the button to get the user</h1>
        <h4 id="id">{userData.id}</h4>
        <h4 id="email">{userData.email}</h4>
        <h4 id="name">{userData.name}</h4>
        <h4 id="phone">{userData.phone}</h4>
        <h4 id="website">{userData.website}</h4>
      </div>
      }
    </div>
  );
}

export default App;
