const TestPage = () => {
  const api_test =  async (e) => {
    const response =  await fetch('http://localhost:8080', {
      method : 'GET',
      headers : {
        "Content-Type": "application/json",
        "access" : localStorage.getItem("access")
      }
    })
  }
  return <div>
    <h1>테스트 페이지</h1>
  </div>
}

export default TestPage;