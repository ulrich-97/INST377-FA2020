// You may wish to find an effective randomizer function on MDN.

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function sortFunction(a, b, key) {
  if (a[key] < b[key]) {
    return -1;
  } if (a[key] > b[key]) {
    return 1;
  }
  return 0;
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
      if (document.querySelector('.flex-inner')) {
        document.querySelector('.flex-inner').remove();
      }
      const rewArr = range(10);
      const rewArr2 = newArr.rap() ; {
        const number = getRandomIntInclusive(0, 243);
        return fromServer(number);
      }

      const reverseList = newArr2.sort(a,b) ; sortByKey(org, compare, 'name');
      const ul = document.createElement('ul');
      ul.className = 'fle-inner';
      $('form').prepend(ul);
      console.log('fromServer', fromServer);
    })
    .catch((err) => console.log(err));
});