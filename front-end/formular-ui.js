// show dropdown menu with all names of existing formulars
function showAllFormularNames(formulars)
{
  var selectFormular = document.getElementById("name-formulars");
  selectFormular.innerHTML = "";
  for(i=0; i<formulars.length; i++)
  {
    var option = document.createElement("option");
    option.value = formulars[i].name;
    option.innerText = formulars[i].name;
    if(i == 0)
      option.setAttribute("selected", true);
    selectFormular.appendChild(option);
  }
}

// function called when formular version loaded from database
function showFormularVersionContent(foundFormular, versionDataObject)
{
  var formularDataElement = document.getElementById("formularVersionData");
  formularDataElement.innerHTML = "";
  var i;
  for(i=0; i<foundFormular.rows.length; i++)
  {
    if(versionDataObject === undefined)
      var rowDiv = createVersionRow(foundFormular.rows[i], undefined);
    else
      var rowDiv = createVersionRow(foundFormular.rows[i], versionDataObject.versionData[i]);
    formularDataElement.appendChild(rowDiv);
  }
  document.getElementById("saveButtonForm").style.display = "block";
  formularDataElement.style.display = "block";
}

function hideFormularContent()
{
  var formularDataElement = document.getElementById("formularVersionData");
  document.getElementById("saveButtonForm").style.display = "none";
  formularDataElement.style.display = "none";
}

function createVersionRow(foundRow, versionData)
{
  var rowDiv =  document.createElement("div");

  var elementField = createElementField(foundRow);
  elementField.style.cssFloat = "left";
  rowDiv.appendChild(elementField);

  var blankSpace = document.createElement("span");
  blankSpace.innerHTML = " &nbsp; &nbsp; &nbsp;";
  blankSpace.style.cssFloat = "left";
  rowDiv.appendChild(blankSpace);

  var labelField = createLabelField(foundRow);
  labelField.style.cssFloat = "left";
  if(versionData !== undefined)
    fillLabelFieldWithData(labelField, versionData);
  rowDiv.appendChild(labelField);

  rowDiv.style.clear = "both";

  return rowDiv;
}

function createElementField(foundRow)
{
  var elementField = document.createElement("span");
  if(foundRow.restrictions === "Mandatory")
    elementField.innerHTML = foundRow.label + "*:";
  else
    elementField.innerHTML = foundRow.label + ":";
  return elementField;
}

function createLabelField(foundRow)
{
  var labelField;
  if(foundRow.type === "TextBox")
  {
    labelField = document.createElement("input");
    labelField.setAttribute("type", "text");
    labelField.setAttribute("value", "");
  }
  else if(foundRow.type === "CheckBox")
  {
    labelField = document.createElement("input");
    labelField.setAttribute("type", "checkbox");
    labelField.checked = false;
  }
  else
  {
    radioButtonGroupID++;
    var i;
    labelField = document.createElement("div");
    labelField.style.display = "inline-block";
    for(i=0; i<foundRow.radioButtonLabels.length; i++)
    {
      var radioButton = document.createElement("input");
      radioButton.setAttribute("type", "radio");
      radioButton.setAttribute("value", "");
      radioButton.name = radioButtonGroupID;
      labelField.appendChild(radioButton);
      labelField.innerHTML += foundRow.radioButtonLabels[i] + "</br>";
    }
  }
  return labelField;
}

function fillLabelFieldWithData(labelField, value)
{
  if(typeof value == "boolean")
    labelField.checked = value;
  else if(typeof value == "string")
    labelField.setAttribute("value", value); 
  else
  {
    var arrayInputs = labelField.getElementsByTagName("input");
    arrayInputs[value].checked = true;    
  } 
}

function getFormularContentIfValid(foundFormular)
{
  var array = [];
  var formularDataElement = document.getElementById("formularVersionData");
  var rowsArray = formularDataElement.childNodes;
  
  for(i=0; i<rowsArray.length; i++)
  {
    var field;
    if(foundFormular.rows[i].type === "TextBox")
      field = rowsArray[i].childNodes[2].value;
    else if(foundFormular.rows[i].type === "CheckBox")
      field = rowsArray[i].childNodes[2].checked;
    else
    {
      field = undefined;
      var arrayInputs = rowsArray[i].childNodes[2].getElementsByTagName("input");
      var j;
      for(j=0; j<arrayInputs.length; j++)
        if(arrayInputs[j].checked == true)
          field = j;          
    }
    array[i]= field;   
    
    rowsArray[i].childNodes[2].className = "";
    if((field === "") && (foundFormular.rows[i].restrictions === "Mandatory"))
    {
      rowsArray[i].childNodes[2].className = "missing-input";
      alert("This field can't be empty!");
      return undefined;
    }

    if((foundFormular.rows[i].restrictions === "Numeric") && (isNaN(field)))
    {
      rowsArray[i].childNodes[2].className = "missing-input";
      alert("This field must be numeric!");
      return undefined;
    }

    if((field === undefined) && (foundFormular.rows[i].type === "RadioButton") && 
       (foundFormular.rows[i].restrictions === "Mandatory"))
       {
        rowsArray[i].childNodes[2].className = "missing-input";
        alert("You must choose one option!");
        return undefined;
       }
    
    if((field === false) && (foundFormular.rows[i].type === "CheckBox") &&
       (foundFormular.rows[i].restrictions === "Mandatory"))
    {
      rowsArray[i].childNodes[2].className = "missing-checkbox";
      alert("This field must be checked!");
      return undefined;
    }
  }
  return array;
}