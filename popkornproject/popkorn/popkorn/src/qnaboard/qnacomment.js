import React, { useState, useEffect } from 'react';
import { apiCall } from '../service/apiService';

function Qnacomment({ sno }) {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [visibleComments, setVisibleComments] = useState(5);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingContent, setEditingContent] = useState("");

    useEffect(() => {
        if (!sno) {
            console.error("Post ID is undefined or null.");
            return;
        }
        async function fetchComments() {
            const response = await apiCall(`/api/qna/replies/${sno}`, 'GET');
            if (response.status === 200) {
                setComments(response.data);
            } else {
                console.error("Failed to fetch comments.");
            }
        }
        fetchComments();
    }, [sno]);

    const handleAddComment = async () => {
        if (sessionStorage.getItem('loginCheck') === false) {
            alert("You must be logged in to Comment.");
            return;
        }

        if (!commentText.trim()) return;
        const postData = {
            root: sno,
            content: commentText,
            id: sessionStorage.getItem("loginID")
        };

        const response = await apiCall('/api/qna/reply', 'POST', postData);
        if (response.status === 200) {
            setComments([...comments, response.data]);
            setCommentText('');
            alert('Comment added successfully');
        } else {
            alert('Failed to add comment');
        }
    };

    const handleShowMoreComments = () => {
        setVisibleComments(prev => prev + 5);
    };

    const handleDeleteComment = async (commentSno) => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            const response = await apiCall(`/api/qna/${commentSno}`, "DELETE");
            if (response.status === 200) {
                alert('Comment deleted successfully');
                setComments(comments.filter(comment => comment.sno !== commentSno));
            } else {
                alert('Failed to delete comment');
            }
        }
    };

    const handleEditComment = (comment) => {
        setEditingCommentId(comment.sno);
        setEditingContent(comment.content);
    };

    const handleSaveComment = async (sno) => {
        const response = await apiCall(`/api/qna/reply/${sno}`, "PATCH", { content: editingContent });
        if (response.status === 200) {
            setComments(comments.map(comment => comment.sno === sno ? { ...comment, content: editingContent } : comment));
            setEditingCommentId(null);
            alert('Comment updated successfully');
        } else {
            alert('Failed to update comment');
        }
    };

    const preventcomment = () => {
        alert('You must be logged in to Comment.');
    }

    return (
        <div>
            <div className='commentflex'>
                {sessionStorage.getItem('loginID') ? (
                    <>
                        <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className='commentarea'
                            placeholder="Write your Comment"
                        />
                        <button onClick={handleAddComment} className='commentBtn'>Add Comment</button>
                    </>) : 
                    <>
                     <textarea
                            className='commentarea'
                            placeholder="You must be logged in to Comment."
                            readOnly
                        />
                        <button onClick={preventcomment} className='commentBtn'>Add Comment</button>
                    </>
                    }
            </div>

            <div>
                {comments.slice(0, visibleComments).map(comment => (
                    <div key={comment.sno} className='commentinfo'>
                        <div className='commentoptionbtn'>
                            <span>{comment.id}</span>{comment.id === sessionStorage.getItem('loginID') && (
                                <>
                                    {editingCommentId === comment.sno ? (
                                        <div>
                                            <button onClick={() => handleSaveComment(comment.sno)} className='commentMBtn'>Save</button>
                                            <span>&nbsp;|&nbsp;</span>
                                            <button onClick={() => handleDeleteComment(comment.sno)} className='commentDBtn'>Delete</button>
                                        </div>
                                    ) : (
                                        <div>
                                            <button onClick={() => handleEditComment(comment)} className='commentMBtn'>Modify</button>
                                            <span>&nbsp;|&nbsp;</span>
                                            <button onClick={() => handleDeleteComment(comment.sno)} className='commentDBtn'>Delete</button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        <p>{new Date(comment.commentcreated).toLocaleString()}</p>
                        {editingCommentId === comment.sno ? (
                            <textarea
                                value={editingContent}
                                onChange={e => setEditingContent(e.target.value)}
                                className='modifycomment'
                            />
                        ) : (
                            <p>{comment.content}</p>
                        )}

                    </div>
                ))}

                {visibleComments < comments.length && (
                    <button onClick={handleShowMoreComments} className='commentviewBtn'>Show More Comments</button>
                )}
            </div>
        </div>
    );
}

export default Qnacomment;
