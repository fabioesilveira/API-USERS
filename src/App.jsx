import { Route, Routes } from "react-router-dom";
import Users from "./users";
import User from "./user";


function App() {
  return(
    <Routes>
      <Route path="/" element={<Users />}/>
      <Route path="/user/:id" element={<User />}/>
    </Routes>
  )
}

export default App;
