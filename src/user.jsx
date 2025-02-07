import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function User() {

    const params = useParams()
    const [user, setUser] = useState("")
    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([])
    const [display, setDisplay] = useState([])

    useEffect(() => {
        async function fetchAPI() {
            const req = await axios.get(`https://jsonplaceholder.typicode.com/users/${params.id}`)
            const res = req.data
            setUser(res)

            const req2 = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${params.id}`)
            const res2 = req2.data
            setPosts(res2)
            setDisplay(res2)

            const req3 = await axios.get("https://jsonplaceholder.typicode.com/comments")
            const res3 = req3.data
            const filterComments = res3.filter((e) => e.postId == params.id)
            console.log(filterComments) 
            setComments(filterComments)

        }

        fetchAPI()
    }, [])

    function handleComments() {
        setDisplay(comments)
    }

    return (
        <div>
            
            <button>Posts:</button>
            <button onClick={handleComments}>Comments:</button>
            <button>Albums:</button>
            
            <h3>{user.name}</h3>
            <h5>Email: {user.email}</h5>
            {/* <p>Address: {user.address.street}, {user.address.suite}. {user.address.city}, {user.address.zipcode}</p> */}
            

        {display.map((e, i) => (
            <div> 
                <h3>POSTS:</h3>
                <h6>{e.title ? e.title : e.name}</h6>
                <p>{e.body}</p>
            </div>
        ))}

       
        </div>

    )
}

export default User