import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function User() {
    const params = useParams();

    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [display, setDisplay] = useState([]);
    const [activeTab, setActiveTab] = useState("posts");

    useEffect(() => {
        async function fetchAPI() {
            const req = await axios.get(
                `https://jsonplaceholder.typicode.com/users/${params.id}`
            );
            const res = req.data;
            setUser(res);

            const req2 = await axios.get(
                `https://jsonplaceholder.typicode.com/posts?userId=${params.id}`
            );
            const res2 = req2.data;
            setPosts(res2);
            setDisplay(res2);

            const req3 = await axios.get(
                "https://jsonplaceholder.typicode.com/comments"
            );
            const res3 = req3.data;

            const filterComments = res3.filter((e) => e.postId == params.id);
            setComments(filterComments);
        }

        fetchAPI();
    }, [params.id]);

    function handlePosts() {
        setDisplay(posts);
        setActiveTab("posts");
    }

    function handleComments() {
        setDisplay(comments);
        setActiveTab("comments");
    }

    return (
        <div className="user-page">
            <div className="user-container">
                <div className="user-card">
                    <div className="user-tabs">
                        <button
                            className={activeTab === "posts" ? "tab-btn active" : "tab-btn"}
                            onClick={handlePosts}
                        >
                            Posts
                        </button>

                        <button
                            className={activeTab === "comments" ? "tab-btn active" : "tab-btn"}
                            onClick={handleComments}
                        >
                            Comments
                        </button>

                        <button className="tab-btn disabled">Albums</button>
                    </div>

                    <div className="user-header">
                        <h1>{user.name}</h1>
                        <p>Email: {user.email}</p>
                    </div>
                </div>

                <h2 className="section-title">
                    {activeTab === "posts" ? "Posts" : "Comments"}
                </h2>

                <div className="content-list">
                    {display.map((e) => (
                        <div className="content-card" key={e.id}>
                            <h4>{e.title ? e.title : e.name}</h4>
                            <p>{e.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default User;