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
    //console.log(typeof commentTime)


    const [comments, setComments]= useState([]);
    const [currentPostComments, setCurrentPostComments] = useState([]);

    const [commentsAnswers, setCommentsAnswers] = useState([]);
    //const [currentCommentsAnswers, setCurrentCommentsAnswers] = useState([]);

    //console.log(typeof commentTime)


    useEffect(() => {
        Axios.get("http://localhost:3000/comments").
        then(res => {
            const currentComments = res.data.filter(comment => {
                return comment.postID === postID
            });        
            setCurrentPostComments(currentComments);
            console.log(currentPostComments);
        }).
        catch(err => {
            console.log("Nie udało się pobrać komentarzy")
        })
    }, []);

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
        console.log(currentPostComments)
        console.log(postID, name, email, text)
        let comment = {
            postID, 
            name, 
            email, 
            text, 
            commentTime, 
            isCommentAnswerOn: false,
            commentAnswers: []
        }

        Axios.post("http://localhost:3000/comments", comment).
        then(res => {
            console.log("Wysłane dane", res.data);
            Axios.get("http://localhost:3000/comments").
            then(res => {    
                const currentComments = res.data.filter(comment => {
                    return comment.postID === postID
                });           
                setCurrentPostComments(currentComments);
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
        console.log(currentPostComments);
        let mainComment = currentPostComments.filter(mainComment => {
            return mainComment.id === parentCommentID;
        })
        let commentAnswer = {
            parentCommentID,
            postID, 
            name, 
            email, 
            text, 
            commentTime, 
            isCommentAnswerOn: false,
        }
        mainComment[0].commentAnswers.push(commentAnswer);
            let commentsData = {
            postID: currentPostComments[0].postID,
            name: currentPostComments[0].name, 
            email: currentPostComments[0].email,
            text: currentPostComments[0].text,
            commentTime: currentPostComments[0].commentTime, 
            isCommentAnswerOn: false
        }
              
        Axios.put(`http://localhost:3000/comments/${parentCommentID}`, {...commentsData, commentAnswers: mainComment[0].commentAnswers}).
        then(res => {
            console.log("Wysłana odpowiedź do komentarza :", res.data)
            Axios.get("http://localhost:3000/comments").
            then(res => {    
                const currentComments = res.data.filter(comment => {
                    return comment.postID === postID
                });           
                setCurrentPostComments(currentComments);
                setName("");
                setEmail("");
                setText("");    
            }).
            catch(err => {
                console.log("Nie udało się pobrać komentarzy")
            })        
        }).
        catch(err => {
            console.log("Nie udało się wysłać odpowiedzi na komentarz", err);
        })

    }

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

                            <div className="blogpost-comments-answer-container" style={{paddingLeft: "25px"}}>
                                {
                                    comment.commentAnswers.map(answer => {
                                        return(
                                        <div className="blogpost-comments-answer-wrapper" key={answer.id} style={{display: answer.parentCommentID === comment.id ? "block" : "none"}}>
                                            <div className="blogpost-comment-name-and-text-wrapper">
                                                <div className="blogpost-comment-name">
                                                    <p>{answer.name} {answer.parentCommentID} {comment.id}</p>
                                                </div>
                                                <div className="blogpost-comment-text">
                                                    <p>{answer.text}</p>
                                                </div>
                                            </div>
                
                                            <div className="blogpost-comment-date-wrapper">
                                                <div className="blogpost-comment-date">
                                                    <p>{answer.commentTime}</p>
                                                </div>
                                            </div>
                                        </div>
                                        )
                                    })
                                }
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