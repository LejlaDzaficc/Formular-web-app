var data = {
  formulars:[
    {
      name:"formular1", 
      rows:[
        {
          label:"Label", 
          type:"TextBox", 
          radioButtonLabels:[], 
          restrictions:"Mandatory"
        },
        {
          label: "Label 2",
          type: "RadioButton",
          radioButtonLabels:["married", "single", "complicated", "in relationship"], 
          restrictions:"None"
        }
      ]
    },
    {
      name:"formular2", 
      rows:[
        {
          label:"Label neki", 
          type:"TextBox", 
          radioButtonLabels:[], 
          restrictions:"Mandatory"
        },
        {
          label: "Label 2",
          type: "CheckBox",
          radioButtonLabels:[], 
          restrictions: "None"
        }
      ]
    }
  ],
  versions: 
    [
      {
        version: "4",
        formularName: "formular1",
        versionData: 
          [
            "lejla", 1
          ]
      }
    ]
};

var radioButtonGroupID = 1;

function getFormulars()
{
  return data.formulars;
}


function getVersions()
{
  return data.versions;
}


function updateFormular(formular)
{
  var foundIndex =  data.formulars.findIndex(function(element){return element.name===formular.name;});
  data.formulars[foundIndex] = formular;
}


function updateVersion(version, formularName, array)
{
  var foundIndex = getVersions().findIndex(function(element){return (element.version === version) && (element.formularName===formularName);});
  getVersions()[foundIndex].versionData = array;
}


function insertFormular(formular)
{
  data.formulars.push(formular);
}


function insertVersion(versionDataObject)
{
  data.versions.push(versionDataObject);
}


function showFormularData(formular) 
{
  var formularDataElement = document.getElementById("formularData");
  formularDataElement.innerHTML = "";

  var rowDiv;
  for(i = 0; i < formular.rows.length; i++)
  {
    rowDiv = createRow(formular.rows[i], i);
    if(i === (formular.rows.length-1))
      setPlusButton(rowDiv);
    formularDataElement.appendChild(rowDiv);
    checkSelectedOptions(rowDiv.childNodes[3].childNodes[0]);
    fillRadioButtonLabels(formular.rows[i].radioButtonLabels, rowDiv.childNodes[3]);
  }
  formularDataElement.childNodes.forEach(function(element){
    element.childNodes[3].childNodes[0].onchange = function(){checkSelectedOptions(element.childNodes[3].childNodes[0])};
  });

  formularDataElement.style.display = "block";
  document.getElementById("saveButtonAdmin").style.display = "block";
}

function fillRadioButtonLabels(arrayRadioButton, parentDiv)
{
  if(arrayRadioButton.length>1)
   {
    parentDiv.childNodes[2].childNodes[arrayRadioButton.length-2].setAttribute("selected", true);
    setNumberOfRadioLabels(parentDiv, arrayRadioButton.length);
    fillRadioButtonInputs(arrayRadioButton, parentDiv.getElementsByTagName("input"));
   }
}

function fillRadioButtonInputs(arrayRadioButton, arrayInputs)
{
  var i;
  for(i=0; i<arrayRadioButton.length; i++)
  {
    arrayInputs[i].setAttribute("value", arrayRadioButton[i]);
  }
}

function checkSelectedOptions(selectType)
{
  var selectNumberRadioButtons;
  if(selectType.options[selectType.selectedIndex].text === "RadioButton")
  {
    selectNumberRadioButtons = document.createElement("select");
    for(i=2; i<=10; i++)
    {
      var option = document.createElement("option");
      option.value = i;
      option.innerText = i+"";
      if(i==2)
        option.setAttribute("selected", true);
      selectNumberRadioButtons.appendChild(option);
    }

    var ws = document.createTextNode("  ");
    selectType.parentElement.appendChild(ws);
    selectType.parentElement.appendChild(selectNumberRadioButtons);


    setNumberOfRadioLabels(selectType.parentElement, selectNumberRadioButtons.value);

    selectNumberRadioButtons.onchange = function(){checkSS(selectNumberRadioButtons)};
  }
  else
  {
    if(selectType.parentElement.childNodes.length > 1)
    {
      var i;
      for(i=selectType.parentElement.childNodes.length-1; i>0; i--)
        selectType.parentElement.removeChild(selectType.parentElement.childNodes[i]);
    } 
  }
}

function setNumberOfRadioLabels(parentDiv, selectedValue)
{
  var i;
  if(parentDiv.childNodes.length>3)
    for(i=parentDiv.childNodes.length-1; i>2; i--)
    {
      parentDiv.removeChild(parentDiv.childNodes[i]);
    }
  
  for(i=0; i<selectedValue; i++)
  {
    var newLine = document.createElement("br");
    var labelField = document.createElement("input");
    labelField.setAttribute("type", "text");
    labelField.setAttribute("value", " ");
    labelField.style.width = "140px";
    labelField.style.marginTop = "2px";
    parentDiv.appendChild(newLine);
    parentDiv.appendChild(labelField);
  }
}


function checkSS(selectNumberRadioButtons)
{
  setNumberOfRadioLabels(selectNumberRadioButtons.parentElement, selectNumberRadioButtons.value);
}

function createRow(row, rowIndex)
{
  var rowDiv = document.createElement("div");
  rowDiv.style.cssFloat = "left";
  rowDiv.style.marginTop = "5px";

  var elementLabel = document.createElement("span");
  elementLabel.innerHTML = "Element " + (rowIndex+1) + " &nbsp; ";
  elementLabel.style.marginTop = "3px";
  elementLabel.style.cssFloat = "left";
  rowDiv.appendChild(elementLabel);

  var labelField = document.createElement("input");
  labelField.setAttribute("type", "text");
  labelField.setAttribute("value", row.label);
  labelField.style.cssFloat = "left";
  rowDiv.appendChild(labelField);

  var blankSpace1 = document.createElement("span");
  blankSpace1.innerHTML = " &nbsp; &nbsp;";
  blankSpace1.style.cssFloat = "left";
  rowDiv.appendChild(blankSpace1);
  
  var selectType = createSelectType(row);
  var selectDiv = document.createElement("div");
  selectDiv.style.cssFloat = "left";
  selectDiv.style.display = "inline-block";
  selectDiv.appendChild(selectType);
  rowDiv.appendChild(selectDiv);
 
  var blankSpace2 = document.createElement("span");
  blankSpace2.innerHTML = " &nbsp; &nbsp;";
  blankSpace2.style.cssFloat = "left";
  rowDiv.appendChild(blankSpace2);
  
  var selectRestrictions = createSelectRestrictions(row);
  selectRestrictions.style.cssFloat = "left";
  rowDiv.appendChild(selectRestrictions);

  rowDiv.style.clear = "both";

  return rowDiv;
}



function createSelectType(row) 
{
  var selectType = document.createElement("select");

  var option1Type = document.createElement("option");
  option1Type.value = "TextBox";
  option1Type.innerText = "TextBox";
  var option2Type = document.createElement("option");
  option2Type.value = "CheckBox";
  option2Type.innerText = "CheckBox";
  var option3Type = document.createElement("option");
  option3Type.value = "RadioButton";   
  option3Type.innerText = "RadioButton";
  var selectType = document.createElement("select");
  if(row.type==="TextBox")
    option1Type.setAttribute("selected", true);
  else if(row.type==="CheckBox")
    option2Type.setAttribute("selected", true);
  else
    option3Type.setAttribute("selected", true);

  selectType.appendChild(option1Type);
  selectType.appendChild(option2Type);
  selectType.appendChild(option3Type);

  return selectType;
}


function createSelectRestrictions(row)
{
  var selectRestrictions = document.createElement("select");

  var option1Restrictions = document.createElement("option");
  option1Restrictions.value = "Mandatory";
  option1Restrictions.innerText = "Mandatory";
  var option2Restrictions = document.createElement("option");
  option2Restrictions.value = "Numeric";
  option2Restrictions.innerText = "Numeric";
  var option3Restrictions = document.createElement("option");
  option3Restrictions.value = "None";
  option3Restrictions.innerText = "None";
  if(row.restrictions==="Mandatory")
    option1Restrictions.setAttribute("selected", true);
  else if(row.restrictions==="Numeric")
    option2Restrictions.setAttribute("selected", true);
  else
    option3Restrictions.setAttribute("selected", true);
  selectRestrictions.appendChild(option1Restrictions);
  selectRestrictions.appendChild(option2Restrictions);
  selectRestrictions.appendChild(option3Restrictions);

  return selectRestrictions;
}

function setPlusButton(parentDiv)
{
  var image = document.getElementsByTagName("template")[0];
  var addButton = image.content.cloneNode(true);
  parentDiv.appendChild(addButton);
}

function addRow()
{
  var formularDataElement = document.getElementById("formularData");
  var emptyRow = 
  {
    label: "",
    type: "TextBox",
    radioButtonLabels: [],
    restrictions: "None"
  };

  var rowDiv = createRow(emptyRow, formularDataElement.childNodes.length);
  movePlusButtonToLastRow(rowDiv);
  formularDataElement.appendChild(rowDiv); 
  rowDiv.childNodes[3].childNodes[0].onchange = function(){checkSelectedOptions(rowDiv.childNodes[3].childNodes[0])};
}

function movePlusButtonToLastRow(rowDiv)
{
  removeOldPlusButton();
  setPlusButton(rowDiv);
}
function removeOldPlusButton()
{
  var formularDataElement = document.getElementById("formularData");
  if(formularDataElement.childNodes.length>0)
    formularDataElement.lastChild.removeChild(formularDataElement.lastChild.lastChild);
}


function saveFormularAdmin()
{
  var formular = getFormularTemplateFromFields();
  if(formular === undefined)
    return;
  var foundFormular = getFormulars().find(function(element){return element.name===formular.name;});
 
  if(foundFormular !== undefined)
  {
    if (isFormularUpdated(foundFormular, formular))
    {
      if(confirm("Updating an existing formular will delete all its existing versions. Do you wish to save anyway?"))
      {
        deleteInvalidVersions(foundFormular.name);
        updateFormular(formular);
      }
    }
      // TODO: tell user that formular is saved
  }
  else
  {
    insertFormular(formular);
    
    // TODO: tell user that formular is saved
  }
  console.log(data);
}


function getFormularTemplateFromFields() 
{
  var formular = {
    name: document.getElementById('search-box').value,
    rows:[]
   }
  
  var formularDataElement = document.getElementById("formularData");
  var rowsArray = formularDataElement.childNodes;
  for(i=0; i<rowsArray.length; i++)
  {
    var arrayInputs, tempArray = [];
    var labelName = rowsArray[i].childNodes[1].value;
    var typeSelect = rowsArray[i].childNodes[3].childNodes[0];
    var typeName = typeSelect.options[typeSelect.selectedIndex].text;
    if(typeName === "RadioButton")
    {
      var j;
      arrayInputs = rowsArray[i].childNodes[3].getElementsByTagName("input");
      console.log(arrayInputs);
      for(j=0; j<arrayInputs.length; j++)
      {
        tempArray.push(arrayInputs[j].value);
      }
    }
    var restrictionsSelect =  rowsArray[i].childNodes[5];
    var restrictionsName = restrictionsSelect.options[restrictionsSelect.selectedIndex].text;

    var label = rowsArray[i].childNodes[1];
    label.className = "";
    if(labelName === "")
    {
      label.className = "missing-input";
      alert("You need input something in 'Element " + (i+1) + "' field!");
      return undefined;
    }
     
    formular.rows.push(
      {
        label: labelName,
        type: typeName,
        radioButtonLabels: tempArray,
        restrictions: restrictionsName
      }
    );
  }
  return formular;
}

function isFormularUpdated(foundFormular, formular)
{
  if(foundFormular.rows.length === formular.rows.length)
    for(i=0; i<foundFormular.rows.length; i++)
    { //fale radiobuttoni
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

function deleteInvalidVersions(formularName)
{
  // TODO obrati paznju sa bazom
  data.versions = data.versions.map(function(element){return element.formularName !== formularName;});
}

function saveFormularForm()
{
  var version = document.getElementById("version-box").value;
  var formularName = document.getElementById('name-formulars').options[document.getElementById('name-formulars').selectedIndex].text;
  var foundVersion = getVersions().find(function(element){return (element.version === version) && (element.formularName===formularName);});
  var array = getFormularContentFromFields(formularName);

  if(array=== undefined)
    return;

    console.log(array)
  if(version === "")
  {
    alert("No version chosen!");
    return;
  }
  if(foundVersion !== undefined)
  {
    updateVersion(version, formularName, array);
  }
  else
  {
    
    insertVersion({
      version: version,
      formularName: formularName,
      versionData: array
    });
    
  }
}

function getFormularContentFromFields(formularName)
{
  var array = [];
  var formularDataElement = document.getElementById("formularVersionData");
  var rowsArray = formularDataElement.childNodes;
  var foundFormular = getFormulars().find(function(element){return element.name === formularName;});

  for(i=0; i<rowsArray.length; i++)
  {
    console.log(rowsArray[i].childNodes)
    var field;
    if(foundFormular.rows[i].type === "TextBox")
      field = rowsArray[i].childNodes[2].value;
    else if(foundFormular.rows[i].type === "CheckBox")
      field = rowsArray[i].childNodes[2].checked;
    else
    {
      var arrayInputs = rowsArray[i].childNodes[2].getElementsByTagName("input");
      var j;
      for(j=0; j<arrayInputs.length; j++)
        if(arrayInputs[j].checked == true)
          field = j;
          
    }
    array[i]= field;    
  }

  return array;
}


function loadFormular(formularName, version)
{
  var foundVersion = getVersions().find(function(element){return (element.version === version) && (element.formularName===formularName);});
  var foundIndex = getVersions().findIndex(function(element){return (element.version === version) && (element.formularName===formularName);});
  if(foundVersion !== undefined)
  {
    showFormularVersion(formularName, getVersions()[foundIndex]);
  }
  else
  {
    showFormularVersion(formularName, -1);
  }
}

function showFormularVersion(formularName, versionDataObject)
{
  var formularDataElement = document.getElementById("formularVersionData");
  var foundFormular = data.formulars.find(function(element){return element.name === formularName;});
  formularDataElement.innerHTML = "";
  var i;
  for(i=0; i<foundFormular.rows.length; i++)
  {
    if(versionDataObject === -1)
      var rowDiv = createVersionRow(foundFormular.rows[i], undefined);
    else
      var rowDiv = createVersionRow(foundFormular.rows[i], versionDataObject.versionData[i]);
    formularDataElement.appendChild(rowDiv);
  }
  document.getElementById("saveButtonForm").style.display = "block";
  formularDataElement.style.display = "block";
}

function createVersionRow(foundRow, versionData)
{
  var rowDiv =  document.createElement("div");

  var elementField = createElementField(foundRow);
  elementField.style.cssFloat = "left";
  rowDiv.appendChild(elementField);

  var blankSpace = document.createElement("span");
  blankSpace.innerHTML = " &nbsp; ";
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