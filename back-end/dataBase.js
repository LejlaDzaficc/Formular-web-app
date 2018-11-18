var db;

//window.indexedDB.deleteDatabase("MyTestDatabase"); /*delete db for testing purposes*/
var request = window.indexedDB.open("MyTestDatabase");

request.onerror = function(event) {
  alert("Why didn't you allow my web app to use IndexedDB?!");
};

request.onsuccess = function(event) {
  db = event.target.result;
  console.log("Database opened");

  db.onerror = function(event) {
    alert("Database error: " + event.target.error);
  }

  /*fill db for testing purposes*/
  //fillDatabaseWithSomeData(db);
}

request.onupgradeneeded = function(event) {
  db = event.target.result;
  console.log("Database created");

  db.createObjectStore("formulars", {keyPath: "name"});
  db.createObjectStore("versions", {keyPath: ["formularName", "version"]});

}


function fillDatabaseWithSomeData(db) {
  fillDatabaseWithFormulars(db);
  fillDatabaseWithVersions(db);
}




function fillDatabaseWithFormulars(db) {
  var transaction = db.transaction('formulars', 'readwrite');

  transaction.oncomplete = function(event) {
    console.log("Templates loaded");
  }
  transaction.onerror = function(event) {
    alert("Transaction error " + event.target.error);
  }

  var objectStore = transaction.objectStore('formulars');
  data.formulars.forEach(function(formular) {
    var request = objectStore.add(formular);
    request.onsuccess = function(event) {
      console.log("Formular '" + formular.name + "' added to database");
    }
  })
}

function fillDatabaseWithVersions(db) {
  var transaction = db.transaction('versions', 'readwrite');

  transaction.oncomplete = function(event) {
    console.log("Versions loaded");
  }
  transaction.onerror = function(event) {
    alert("Transaction error");
  }

  var objectStore = transaction.objectStore('versions');
  data.versions.forEach(function(version) {
    var request = objectStore.add(version);
    request.onsuccess = function(event) {
      console.log("Version '" + version.version + "' for formular '" 
      + version.formularName + "' added to database");
    }
  })
}