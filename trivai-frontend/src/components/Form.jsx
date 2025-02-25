function Form() {
  return (
    <form action="/api/models/Score" method="POST">
      <input type="text" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;