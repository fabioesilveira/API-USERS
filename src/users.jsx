import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Users() {
    const [users, setUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [city, setCity] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchAPI() {
            const req = await axios.get("https://jsonplaceholder.typicode.com/users");
            const res = req.data;

            setUsers(res);
            setAllUsers(res);

            const cities = res.map((e) => e.address.city);
            setCity(cities);
        }

        fetchAPI();
    }, []);

    function handleChange(event) {
        const value = event.target.value
        setSearch(value)

        if (value.trim() === "") {
            setUsers(allUsers)
        }
    }

    function handleClick() {
        const filterSearch = allUsers.filter((e) =>
            e.name.toLowerCase().includes(search.toLowerCase())
        );
        setUsers(filterSearch);
    }

    function handleSelectedCity(selectedCity) {
        const filterCity = allUsers.filter((e) => e.address.city === selectedCity);
        setUsers(filterCity);
    }

    function handleNavigate(id) {
        navigate(`/user/${id}`);
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h1-home">User Table</h1>

                <div className="elements-header">
                    <input
                        className="input-header"
                        type="text"
                        value={search}
                        onChange={handleChange}
                    />

                    <button className="btn-input" onClick={handleClick}>
                        SEARCH
                    </button>

                    <div className="dropdown">
                        <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                        >
                            City
                        </button>

                        <ul className="dropdown-menu">
                            {city.map((e) => (
                                <li key={e}>
                                    <a
                                        onClick={() => handleSelectedCity(e)}
                                        className="dropdown-item"
                                        href="#"
                                    >
                                        {e}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

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
    );
}

export default Users;