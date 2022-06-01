import React, { useEffect, useState } from "react";
import Axios from 'axios';

const BlogpostCommentsContainer = (props) => {
    const postID = props.currentPost.id;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [text, setText] = useState("");

    const date = new Date();
    const commentTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} | ${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
    console.log(typeof commentTime)


    const [comments, setComments]= useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3000/comments").
        then(res => {
            setComments(res.data)
        }).
        catch(err => {
            console.log("Nie udało się pobrać komentarzy")
        })
    }, []);

    console.log(comments);

    const currentPostComments = comments.filter(comment => {
        return comment.postID === postID
    });

    console.log(currentPostComments);

    const sendComment = (e) => {
        e.preventDefault();
        console.log(postID, name, email, text)

        Axios.post("http://localhost:3000/comments", {postID, name, email, text, commentTime}).
        then(res => {
            console.log(`Wysłane dane: ${res}`);
        }).
        catch(err => {
            console.log("Nie udało się wysłać komentarza");
        })
    }

    return(
        <div className="blogpost-comments-container">
            <div className="blogpost-comments-form-container">
                <div className="blogpost-comments-form-title">
                    <h1>Zostaw komentarz</h1>
                </div>
                <div className="blogpost-comments-form-wrapper">
                    <form>
                        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Imię"/>
                        <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                        <textarea name="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Twój komentarz" />
                        <button onClick={sendComment}>Wyślij</button>
                    </form>
                </div>
            </div>

            <div className="blogpost-comments-wrapper">
            {
                currentPostComments.map(comment => {
                    return(
                        <div className="blogpost-comment-wrapper" key={comment.id}>
                            <div className="blogpost-comment-name-and-text-wrapper">
                                <div className="blogpost-comment-name">
                                    <p>{comment.name}</p>
                                </div>
                                <div className="blogpost-comment-text">
                                    <p>{comment.text}</p>
                                </div>
                            </div>

                            <div className="blogpost-comment-date-and-button-wrapper">
                                <div className="blogpost-comment-date">
                                    <p>{comment.commentTime}</p>
                                </div>
                                <div className="blogpost-comment-button">
                                    <button>Odpowiedz</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default BlogpostCommentsContainer;