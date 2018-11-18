function loadFormularNames()
{
  var transaction = db.transaction("formulars", "readonly");
  var objectStore = transaction.objectStore("formulars");
  var request = objectStore.getAll();
  request.onsuccess = function(event) {
    var formulars = event.target.result;
    showAllFormularNames(formulars); // call function from front-end to draw
  }
}

function loadFormularVersion(formularName, versionDataObject)
{
  var transaction = db.transaction("formulars", "readonly");
  var objectStore = transaction.objectStore("formulars");
  var request = objectStore.get(formularName);
  request.onsuccess = function(event)
  {
    var foundFormular = event.target.result;
    showFormularVersionContent(foundFormular, versionDataObject); // call function from front-end to draw
  }
}

function loadFormular(formularName, version)
{
  var transaction = db.transaction("versions", "readonly");
  var objectStore = transaction.objectStore("versions");
  var request = objectStore.get([formularName, version]);
  request.onsuccess = function(event)
  {
    var foundVersion = event.target.result;
    loadFormularVersion(formularName, foundVersion); // call function from front-end to draw
  }
}

function deleteInvalidVersions(formularName, transaction)
{
  var objectStore = transaction.objectStore("versions");
  var request = objectStore.openCursor();
  request.onsuccess = function (event)
  {
    var cursor = event.target.result;
    if (cursor)
    {
      if (cursor.key[0] === formularName)
        cursor.delete();
      cursor.continue();
    }
  }
}

function saveFormularForm()
{
  var version = document.getElementById("version-box").value;
  var formularName = document.getElementById('name-formulars').options[document.getElementById('name-formulars').selectedIndex].text;
  
  if(version === "")
  {
    alert("No version chosen!");
    return;
  }

  var transaction = db.transaction(["formulars", "versions"], "readwrite");
  var objectStoreTemplate = transaction.objectStore("formulars");
  var requestGetTemplate = objectStoreTemplate.get(formularName);
  requestGetTemplate.onsuccess = function (event)
  {
    var foundFormular = event.target.result;
    var array = getFormularContentIfValid(foundFormular);
    if(array=== undefined)
      return;  

    var objectStoreVersions = transaction.objectStore("versions");
    var requestGetVersion = objectStoreVersions.get([formularName, version]);
    requestGetVersion.onsuccess = function (event)
    {
      var foundVersion = event.target.result;
      createOrUpdateFormularVersion(foundVersion, version, formularName, array, transaction);
    }
  }
}

function createOrUpdateFormularVersion(foundVersion, version, formularName, array, transaction)
{
  if(foundVersion !== undefined)
    updateVersion(foundVersion, array, transaction);
  else
  {
    insertVersion({
      version: version,
      formularName: formularName,
      versionData: array
    }, transaction);
  }
}

function updateVersion(foundVersion, array, transaction)
{
  foundVersion.versionData = array;
  var objectStore = transaction.objectStore("versions");

  var request = objectStore.put(foundVersion);
  request.onsuccess = function (event)
  {
    alert("Formular template '" + foundVersion.formularName + "' has been successfully updated under version '" + foundVersion.version + "'!");
  }
}

function insertVersion(versionDataObject, transaction)
{
  var objectStore = transaction.objectStore("versions");

  var request = objectStore.add(versionDataObject);
  request.onsuccess = function (event)
  {
    alert("Formular template '" + versionDataObject.formularName + "' has been successfully saved under version '" + versionDataObject.version + "'!");
  }
}
