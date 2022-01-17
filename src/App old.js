function App() {
  const title = "My Title";
  const body = "Main Text";
  const comments = [
    { id: 1, text: "Comment 1" },
    { id: 2, text: "Comment 2" },
    { id: 3, text: "Comment 3" },
    { id: 4, text: "Comment 4" },
  ];

  const showComments = true;

  return (
    <div>
      <h1> {title} </h1>
      <p> {body} </p>
      {Math.floor(Math.random() * 100)}
      

      {showComments && (
        <div>
          <h3>List Length: {comments.length}</h3>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>{comment.text}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
