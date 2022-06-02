import React, { useEffect, useState } from "react";
import Axios from 'axios';

const BlogpostCommentsContainer = (props) => {
    const postID = props.currentPost.id;

    const [mainCommentsFormVisibility, setmainCommentsFormVisibility] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [text, setText] = useState("");

    const date = new Date();
    const commentTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} | ${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
    console.log(typeof commentTime)


    const [comments, setComments]= useState([]);
    const [currentPostComments, setCurrentPostComments] = useState([]);

    const [commentsAnswers, setCommentsAnswers] = useState([]);
    const [currentCommentsAnswers, setCurrentCommentsAnswers] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3000/comments").
        then(res => {
            setComments(res.data)

            const currentComments = res.data.filter(comment => {
                return comment.postID === postID
            });
        
            setCurrentPostComments(currentComments);
            //console.log(currentPostComments);

        }).
        catch(err => {
            console.log("Nie udało się pobrać komentarzy")
        })
    }, []);

    console.log(comments);

    const nameChange = (nameValue) => {
        setName(nameValue);
    };

    const emailChange = (emailValue) => {
        setEmail(emailValue);
    };

    const textChange = (textValue) => {
        setText(textValue);
    };

    const sendComment = (e) => {
        e.preventDefault();
        console.log(postID, name, email, text)

        Axios.post("http://localhost:3000/comments", {postID, name, email, text, commentTime, isCommentAnswerOn: false}).
        then(res => {
            console.log("Wysłane dane", res.data);
            Axios.get("http://localhost:3000/comments").
            then(res => {
                setComments(res.data)
    
                const currentComments = res.data.filter(comment => {
                    return comment.postID === postID
                });
            
                setCurrentPostComments(currentComments);
                console.log(currentPostComments);

                setName("");
                setEmail("");
                setText("");
    
            }).
            catch(err => {
                console.log("Nie udało się pobrać komentarzy")
            })
        }).
        catch(err => {
            console.log("Nie udało się wysłać komentarza");
        })
    }


    const showSendAnswerForm = (id) => {
        const currentComments = currentPostComments.map(el => {
            if (el.id === id) {
                return {...el, isCommentAnswerOn: true}
            } else {
                return {...el, isCommentAnswerOn: false}
            }
            return {...el};
        })

        setmainCommentsFormVisibility(false);
        setCurrentPostComments(currentComments);
        console.log(currentComments)
    }

    const showCommentButton = () => {
        const currentComments = currentPostComments.map(el => {
            return {...el, isCommentAnswerOn: false}
        })
        setmainCommentsFormVisibility(true);
        setCurrentPostComments(currentComments);
    }

    const sendCommentsAnswer = (parentCommentID) => {
        console.log(parentCommentID);

        Axios.post("http://localhost:3000/answers", {parentCommentID, name, email, text, commentTime}).
        then(res => {
            console.log("Wysłana odpowiedź do komentarza :", res.data)

            setCommentsAnswers(res.data);

        }).
        catch(err => {
            console.log("Nie udało się wysłać odpowiedzi na komentarz", err);
        })
    }

    console.log(commentsAnswers);

    return(
        <div className="blogpost-comments-container">
            <div className="blogpost-comments-form-container">
            <div className="blogpost-comments-form-title">
                    <h1>Zostaw komentarz</h1>
                    {mainCommentsFormVisibility === false ? <button onClick={showCommentButton}>Zostaw komentarz</button> : ""}
                </div>
                {mainCommentsFormVisibility === true ? <div className="blogpost-comments-form-wrapper">
                    <form>
                        <input type="text" name="name" value={name} onChange={(e) => nameChange(e.target.value)} placeholder="Imię"/>
                        <input type="text" name="email" value={email} onChange={(e) => emailChange(e.target.value)} placeholder="Email" />
                        <textarea name="text" value={text} onChange={(e) => textChange(e.target.value)} placeholder="Twój komentarz" />
                        <button onClick={sendComment}>Wyślij</button>
                    </form>
                </div> : ""}
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
                                    <button onClick={(e) => showSendAnswerForm(comment.id)}>Odpowiedz</button>
                                </div>
                            </div>

                            {comment.isCommentAnswerOn === true ? <div className="blogpost-comments-form-container">
                                <div className="blogpost-comments-form-title">
                                    <h1>Zostaw komentarz</h1>
                                </div>
                                <div className="blogpost-comments-form-wrapper">
                                    <form>
                                        <input type="text" name="name" value={name} onChange={(e) => nameChange(e.target.value)} placeholder="Imię"/>
                                        <input type="text" name="email" value={email} onChange={(e) => emailChange(e.target.value)} placeholder="Email" />
                                        <textarea name="text" value={text} onChange={(e) => textChange(e.target.value)} placeholder="Twój komentarz" />
                                    </form>
                                    <button onClick={() => sendCommentsAnswer(comment.id)}>Wyślij</button>
                                </div>
                            </div> : ""}
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default BlogpostCommentsContainer;