function searchFormulars()
{
  var formularName = document.getElementById('search-box').value;
  if(formularName === "")
    return;

  var transaction = db.transaction("formulars", "readonly");
  var objectStore = transaction.objectStore("formulars");
  var request = objectStore.get(formularName);
  request.onsuccess = function(event)
  {
    var foundFormular = event.target.result;
    showFormularTemplate(foundFormular); // call function from front-end to draw
  }
}

function saveFormularAdmin()
{
  var formular = getFormularTemplateFromFields();
  if(formular === undefined)
    return;
  var transaction = db.transaction(["formulars", "versions"], "readwrite");
  var objectStore = transaction.objectStore("formulars");
  var request = objectStore.get(formular.name);
  request.onsuccess = function(event)
  {
    var foundFormular = event.target.result;
    createOrUpdateFormularTemplate(foundFormular, formular, transaction);
  }
}

function createOrUpdateFormularTemplate(foundFormular, formular, transaction)
{
  if(foundFormular !== undefined)
  {
    if (isFormularUpdated(foundFormular, formular))
    {
      if(confirm("Updating an existing formular will delete all its existing versions. Do you wish to save anyway?"))
      {
        deleteInvalidVersions(foundFormular.name, transaction);
        updateFormular(formular, transaction);
      }
    }
  }
  else
    insertFormular(formular, transaction);
}

function updateFormular(formular, transaction)
{
  var objectStore = transaction.objectStore("formulars");

  var request = objectStore.put(formular);
  request.onsuccess = function (event)
  {
    alert("Formular template '" + formular.name + "' has been successfully updated!");
  }
}

function insertFormular(formular, transaction)
{
  var objectStore = transaction.objectStore("formulars");

  var request = objectStore.add(formular);
  request.onsuccess = function (event)
  {
    alert("Formular template '" + formular.name + "' has been successfully saved!");
  }
}

function isFormularUpdated(foundFormular, formular)
{
  if(foundFormular.rows.length === formular.rows.length)
    for(i=0; i<foundFormular.rows.length; i++)
    { 
      if((foundFormular.rows[i].label !== formular.rows[i].label) ||
        (foundFormular.rows[i].type !== formular.rows[i].type) ||
        (foundFormular.rows[i].restrictions !== formular.rows[i].restrictions))
            return true;
      if(foundFormular.rows[i].radioButtonLabels.length!= formular.rows[i].radioButtonLabels.length)
        return true;
      else
      {
        var j;
        for(j=0; j<formular.rows[i].radioButtonLabels.length; j++)
          if(formular.rows[i].radioButtonLabels[j]!= foundFormular.rows[i].radioButtonLabels[j])
           return true;
      }
    }
  else
    return true;
  return false;
}