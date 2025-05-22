const express = require('express')
const app = express()
const cors = require('cors')
const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ3ODk0OTQyLCJpYXQiOjE3NDc4OTQ2NDIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImI3ZDk4M2M4LTIyNTAtNDlkMy1iMzEwLTVjZjA5ODRjN2VmOCIsInN1YiI6IjIyMDAwMzE0NzBjc2VoQGdtYWlsLmNvbSJ9LCJlbWFpbCI6IjIyMDAwMzE0NzBjc2VoQGdtYWlsLmNvbSIsIm5hbWUiOiJrcmlzaG5hcGF0bmFtIG11bmkgc2FpIGNoYXJpdGgiLCJyb2xsTm8iOiIyMjAwMDMxNDcwIiwiYWNjZXNzQ29kZSI6ImJlVEpqSiIsImNsaWVudElEIjoiYjdkOTgzYzgtMjI1MC00OWQzLWIzMTAtNWNmMDk4NGM3ZWY4IiwiY2xpZW50U2VjcmV0IjoieXd3enJVYUZ2bUpncm14YSJ9.MfzUyckyySmJT9F4EV550mOVzzxaPREF3O1at8PFmOY"
const port = 9876;
app.use(express.json())
app.use(cors())

const calAvg = (numbers) => {
  if (!numbers || numbers.length === 0) {
    return 0;
  }
  const sum = numbers.reduce((acc, current) => acc + current, 0);
  return sum / numbers.length;
};

app.get("/numbers/:id", async (req, res) => {
  const id = req.params.id;
  let numberList;
  let storedNumbers;
  let avg;

  const fetchNumbers = async (url) => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data)
    return data.numbers;
  };

  if (id === "p") {
    numberList = await fetchNumbers('http://20.244.56.144/evaluation-service/primes');
  } else if (id === "e") {
    numberList = await fetchNumbers('http://20.244.56.144/evaluation-service/even');
  } else if (id === "f") {
    numberList = await fetchNumbers('http://20.244.56.144/evaluation-service/fibo');
  } else {
    numberList = await fetchNumbers('http://20.244.56.144/evaluation-service/rand');
  }

  storedNumbers = numberList;
  avg = calAvg(storedNumbers);
  prevState = []
  res.json({
    windowPrevState: prevState,
    windowCurrState: numberList,
    numbers: storedNumbers,
    avg: avg
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
