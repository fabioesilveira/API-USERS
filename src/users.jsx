import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Users() {

    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")
    const [city, setCity] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchAPI() {
            const req = await axios.get("https://jsonplaceholder.typicode.com/users")
            const res = req.data
            console.log(res)
            setUsers(res)
            const cities = res.map((e) => e.address.city)
            setCity(cities)
        }

        fetchAPI();
    }, [])

    function handleChange(event) {
        const value = event.target.value
        setSearch(value)
    }

    function handleClick() {
        const filterSearch = users.filter((e) => e.name.toLowerCase().includes(search))
        setUsers(filterSearch)
    }

    function handleSelectedCity(city) {
        const filterCity = users.filter((e) => e.address.city === city)
        setUsers(filterCity)
    }

    function handleNavigate(id) {
        navigate(`/user/${id}`)
    }

    return (
        <>
            <div className="div-header">
                <div className="elements-header">

                    <input className="input-header" type="text" value={search} onChange={handleChange} />

                    <button className="btn-input" onClick={handleClick}>SEARCH</button>


                    <div class="dropdown">
                        <button
                            class="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            City
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {city.map((e) => (
                                <li><a onClick={() => handleSelectedCity(e)} class="dropdown-item" href="#">{e}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>

            <div className="container mt-4">
                <h1 className="mb-4">User Table</h1>
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>City</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((e) => (
                            <tr key={e.id} onClick={() => handleNavigate(e.id)}>
                                <td>{e.name}</td>
                                <td>{e.email}</td>
                                <td>{e.address.city}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </>
    )
}

export default Users;