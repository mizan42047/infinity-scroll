import './style.scss'
const posts = document.querySelector('#posts');
const button = document.querySelector('#load-more');
const getPosts = async () => {
  posts.innerHTML = "<p style='color:red;text-align:center;'> Loading.... </p>";
  
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  posts.innerHTML = data.length > 0 ? '' : 'No posts';
  let perPage = 12;
  const earlyLoaded = data.slice(0, perPage);
  var loadPosts = [...earlyLoaded];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadPosts = loadPosts.length < data.length && [...loadPosts, ...data.slice(loadPosts.length, loadPosts.length + perPage)]
        showPosts(loadPosts);
      }
    })
  })

  observer.observe(button);
}

getPosts();

function showPosts(loadPosts) {
  loadPosts && loadPosts.forEach(post => {
    let template=`
      <div class="post post-${post.id}">
        <div class="post-header">
          <h3 class="post__title"> ${post.title} </h3>
          <p class="post__body">
            ${post.body}
          </p>
        </div>
      </div>
    `;
    posts.insertAdjacentHTML('beforeend', template);
  })
}