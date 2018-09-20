function loadPeople() {
    var url = "https://swapi.co/api/people/";
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(e) {
        if (req.readyState == XMLHttpRequest.DONE && req.status == 200) {
            var results = JSON.parse(req.response).results;
            for (var i = 0; i < 10; i++) {
                showPeople(i+1, results[i]);
            }
        }
    };
    req.open('GET', url, true);
    req.send();
}

function showPeople(id, data) {
    var p1 = document.querySelector("#img").cloneNode(true);
    var p2 = document.querySelector("#people").cloneNode(true);
    
    p1.id = 'peopleimg-' + id;
    p2.id = 'people-' + id;
    
    p1.querySelector("#pic").style = "background-image: url(https://starwars-visualguide.com/assets/img/characters/"+id+".jpg);"+
    "background-size: cover;";
    
    p2.querySelector("#name").textContent = data.name;
    p2.querySelector("#alt").textContent = data.height;
    p2.querySelector("#peso").textContent = data.mass;
    p2.querySelector("#nasc").textContent = data.birth_year;
    
    p1.style = "display: visible;";
    p2.style = "display: visible;";
    
    p1.addEventListener('click', loadDestaque);
    p2.addEventListener('click', loadDestaque);
    
    document.querySelector("#card-people").appendChild(p1);
    document.querySelector("#card-people").appendChild(p2);
}

function loadDestaque(e) {
    var id = e.target;
    if (id.classList.contains('item')) {
        id = id.id;
    } else {
        id = id.parentElement.id;
    }
    id = id.split('-')[1];
    
    var url = "https://swapi.co/api/people/" + id + "/";
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(e) {
        if (req.readyState == XMLHttpRequest.DONE && req.status == 200) {
            var data = JSON.parse(req.response);
            var destaque = document.querySelector("#destaque");
            
            destaque.querySelector("#pic").style = "background-image: url(https://starwars-visualguide.com/assets/img/characters/"+id+".jpg);"+
    "background-size: cover;";
    
            destaque.querySelector("#name").textContent = data.name;
            destaque.querySelector("#alt").textContent = data.height;
            destaque.querySelector("#peso").textContent = data.mass;
            destaque.querySelector("#nasc").textContent = data.birth_year;
        }
    };
    req.open('GET', url, true);
    req.send();
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

loadPeople();







