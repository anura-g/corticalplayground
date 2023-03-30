fetch('https://www.boredapi.com/api/activity')
.then(aaa => aaa.json())
.then(data => console.log(data['activity']))
.catch(error => console.log('ERROR' + error)); 