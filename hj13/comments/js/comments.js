'use strict';

function showComments(list) {
  const commentsContainer = document.querySelector('.comments');
  const comm = list.map(newComment);
  comm.forEach(el => {
    commentsContainer.appendChild(el);
  });
  //const comments = list.map(createComment).join('');
  //commentsContainer.innerHTML += comments;
}

function createComment(comment) {
  return `<div class="comment-wrap">
    <div class="photo" title="${comment.author.name}">
      <div class="avatar" style="background-image: url('${comment.author.pic}')"></div>
    </div>
    <div class="comment-block">
      <p class="comment-text">
        ${comment.text.split('\n').join('<br>')}
      </p>
      <div class="bottom-comment">
        <div class="comment-date">${new Date(comment.date).toLocaleString('ru-Ru')}</div>
        <ul class="comment-actions">
          <li class="complain">Пожаловаться</li>
          <li class="reply">Ответить</li>
        </ul>
      </div>
    </div>
  </div>`
}

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);


function newComment(comment) {
  const commentWrap = document.createElement(`div`);
  commentWrap.classList.add(`comment-wrap`);
  
  const photo = document.createElement(`div`)
  photo.className = `photo`;
  photo.setAttribute(`title`, comment.author.name);
  const avatar = document.createElement(`div`);
  avatar.className = `avatar`;
  avatar.style.backgroundImage = `url('${comment.author.pic}')`;
  photo.appendChild(avatar);
  
  const commentBlock = document.createElement(`div`);
  commentBlock.className = `comment-block`;
  const commentText = document.createElement(`p`);
  commentText.style.whiteSpace = `pre`;
  commentText.className = `comment-text`;
  commentText.textContent = comment.text;
  
  const bottomComment = document.createElement(`div`);
  bottomComment.className = `bottom-comment`;
  const commentDate = document.createElement(`div`);
  commentDate.className = `comment-date`;
  commentDate.textContent = new Date(comment.date).toLocaleString('ru-Ru');
  
  const commentActions = document.createElement(`ul`);
  commentActions.className = `comment-actions`;
  const complain = document.createElement(`li`);
  complain.className = `complain`;
  complain.textContent = `Пожаловаться`;
  const reply = document.createElement(`li`);
  reply.className = `reply`;
  reply.textContent = `Ответить`;
  
  commentActions.appendChild(complain);
  commentActions.appendChild(reply);
  
  bottomComment.appendChild(commentDate);
  bottomComment.appendChild(commentActions);
  
  commentBlock.appendChild(commentText);
  commentBlock.appendChild(bottomComment);
  
  commentWrap.appendChild(photo);
  commentWrap.appendChild(commentBlock);
  
  return commentWrap;
}