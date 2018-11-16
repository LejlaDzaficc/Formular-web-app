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
          type: "CheckBox",
          radioButtonLabels:[], 
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
            "lejla", true
          ]
      }
    ]
};

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
    console.log(rowDiv.childNodes);
    if(i === (formular.rows.length-1))
      setPlusButton(rowDiv);
    formularDataElement.appendChild(rowDiv);
    
   
  }
  formularDataElement.childNodes.forEach(function(element){
    element.childNodes[3].onchange = function(){checkSelectedOptions(element.childNodes[3])};
  });

  formularDataElement.style.display = "block";
  document.getElementById("saveButtonAdmin").style.display = "block";
}

function checkSelectedOptions(selectType)
{
  console.log("usloooo");
  if(selectType.options[selectType.selectedIndex].text === "RadioButton")
  {
    console.log("ok, radio je");
    var selectNumberRadioButtons = document.createElement("select");
    for(i=2; i<=10; i++)
    {
      var option = document.createElement("option");
      option.value = i;
      option.innerText = i+"";
      if(i==2)
        option.setAttribute("selected", true);
      selectNumberRadioButtons.appendChild(option);
    }
    selectType.parentElement.insertBefore(selectNumberRadioButtons, selectType.parentElement.childNodes[4]);
    var ws = document.createTextNode("  ");
    selectType.parentElement.insertBefore(ws, selectType.parentElement.childNodes[4]);

   /* var labelField1 = document.createElement("input");
    labelField1.setAttribute("type", "text");
    labelField1.setAttribute("value", "");
    selectType.parentElement.appendChild(labelField1);
    console.log(selectType.parentElement.childNodes);
    */

  }
  else
  {
    if(selectType.parentElement.childNodes[5].options[0].value == "2")
    {
      selectType.parentElement.removeChild(selectType.parentElement.childNodes[4]);
      selectType.parentElement.removeChild(selectType.parentElement.childNodes[4]);
    }
      
  }

}

function createRow(row, rowIndex)
{
  var rowDiv = document.createElement("div");

  var elementLabel = document.createTextNode("Element " + (rowIndex+1));
  rowDiv.appendChild(elementLabel);
  rowDiv.innerHTML += " &nbsp; ";

  var labelField = document.createElement("input");
  labelField.setAttribute("type", "text");
  labelField.setAttribute("value", row.label);
  rowDiv.appendChild(labelField);
  rowDiv.innerHTML += " &nbsp; ";

  var selectType = createSelectType(row, rowIndex);
  //console.log(selectType);
  //selectType.onchange = function(){checkSelectedOptions(this)};
  //selectType.onchange = console.log("za konzolu zadnje");
  rowDiv.appendChild(selectType);
  rowDiv.innerHTML += " &nbsp; ";
  
  var selectRestrictions = createSelectRestrictions(row);
  rowDiv.appendChild(selectRestrictions);

  return rowDiv;
}



function createSelectType(row, index) 
{
  var selectType = document.createElement("select");
  selectType.id = "id"+ index;

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
  {
    option3Type.setAttribute("selected", true);

  }
   
  //selectType.setAttribute("onchange", checkSelectedOptions(selectType));
  //selectType.onchange = function(){checkSelectedOptions(selectType, index)};
  //selectType.addEventListener("change", checkSelectedOptions(selectType));
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
  rowDiv.childNodes[3].onchange = function(){checkSelectedOptions(rowDiv.childNodes[3])};

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
    var labelName = rowsArray[i].childNodes[1].value;
    var typeSelect = rowsArray[i].childNodes[3];
    var typeName = typeSelect.options[typeSelect.selectedIndex].text;
    var restrictionsSelect =  rowsArray[i].childNodes[5];
    var restrictionsName = restrictionsSelect.options[restrictionsSelect.selectedIndex].text;
    formular.rows.push(
      {
        label: labelName,
        type: typeName,
        radioButtonLabels:[],
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

  if(version === "")
    return; //TODO ispisat da treba verzija
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
    var field;
    if(foundFormular.rows[i].type === "TextBox")
      field = rowsArray[i].childNodes[1].value;
    else if(foundFormular.rows[i].type === "CheckBox")
      field = rowsArray[i].childNodes[1].checked;
    else
    {
      //za radiobutton
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
  for(i=0; i<foundFormular.rows.length; i++)
  {
    var rowDiv = createVersionRow(foundFormular, versionDataObject);
    formularDataElement.appendChild(rowDiv);
  }
  document.getElementById("saveButtonForm").style.display = "block";
  formularDataElement.style.display = "block";
}

function createVersionRow(foundFormular, versionDataObject)
{
  var rowDiv =  document.createElement("div");

  var elementField = createElementField(foundFormular.rows[i]);
  rowDiv.appendChild(elementField);
  rowDiv.innerHTML += " &nbsp; ";

  var labelField = createLabelField(foundFormular);
  if(versionDataObject !== -1)
    fillLabelFieldWithData(labelField, versionDataObject.versionData[i]);
  rowDiv.appendChild(labelField);

  return rowDiv;
}

function createElementField(formular)
{
  var elementField;
  if(formular.restrictions === "Mandatory")
    elementField = document.createTextNode(formular.label + "*:");
  else
    elementField = document.createTextNode(formular.label + ":");
  return elementField;
}

function createLabelField(foundFormular)
{
  var labelField;
  if(foundFormular.rows[i].type === "TextBox")
  {
    labelField = document.createElement("input");
    labelField.setAttribute("type", "text");
    labelField.setAttribute("value", "");
  }
  else if(foundFormular.rows[i].type === "CheckBox")
  {
    labelField = document.createElement("input");
    labelField.setAttribute("type", "checkbox");
    labelField.checked = false;
  }
  else
  {
    //za radiobutton
  }
  return labelField;
}

function fillLabelFieldWithData(labelField, value)
{
  if(typeof value == "boolean")
    labelField.checked = value;
  else
    labelField.setAttribute("value", value);  
}