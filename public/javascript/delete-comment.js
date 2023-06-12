async function deleteCommentFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    console.log("ID IS :" + id);
    const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        alert("Comment deleted successfully");
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }


}

document.querySelector('.delete-comment-btn').addEventListener('click', deleteCommentFormHandler);