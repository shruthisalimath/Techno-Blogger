async function editCommentFormHandler(event) {
    event.preventDefault();
  
    const feedback = document.querySelector('input[name="comment-body"]').value.trim();
    
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    if(feedback)
    {
    const response = await fetch(`/api/comments/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        feedback
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
    }
    else
    {
      alert("Please enter feedback");
    }
  }
  
  document.querySelector('.edit-comment-form').addEventListener('submit', editCommentFormHandler);