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

function getFormulars() {
  return data.formulars;
}



function searchFormulars()
{
  var formularName = document.getElementById('search-box').value;
    var foundFormular = getFormulars().find(function(element){return element.name===formularName;});
    if(foundFormular!==undefined)
    {
      showFormularData(foundFormular);
    }
    else
    {
      var formularDataElement = document.getElementById("formularData");
      formularDataElement.innerHTML = "";
      addRow();
      document.getElementById("saveButtonAdmin").style.display = "block";
      formularDataElement.style.display = "block"; 
    }
}


function showFormularData(formular) 
{
  var formularDataElement = document.getElementById("formularData");
  formularDataElement.innerHTML = "";

  for(i = 0; i < formular.rows.length; i++)
  {
    var rowDiv = createRow(formular.rows[i], i);
    //var rowDiv =  document.createElement("div");

    /*var elementField = document.createTextNode("Element " + (i+1));
    rowDiv.appendChild(elementField);
    rowDiv.innerHTML += " &nbsp; ";

    var labelField = document.createElement("input");
    labelField.setAttribute("type", "text");
    labelField.setAttribute("value", formular.rows[i].label);
    rowDiv.appendChild(labelField);
    rowDiv.innerHTML += " &nbsp; ";

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
    if(formular.rows[i].type==="TextBox")
      option1Type.setAttribute("selected", true);
    else if(formular.rows[i].type==="CheckBox")
      option2Type.setAttribute("selected", true);
    else
      option3Type.setAttribute("selected", true);
    selectType.appendChild(option1Type);
    selectType.appendChild(option2Type);
    selectType.appendChild(option3Type);
    rowDiv.appendChild(selectType);
    rowDiv.innerHTML += " &nbsp; ";
   
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
    if(formular.rows[i].restrictions==="Mandatory")
      option1Restrictions.setAttribute("selected", true);
    else if(formular.rows[i].restrictions==="Numeric")
      option2Restrictions.setAttribute("selected", true);
    else
      option3Restrictions.setAttribute("selected", true);
    selectRestrictions.appendChild(option1Restrictions);
    selectRestrictions.appendChild(option2Restrictions);
    selectRestrictions.appendChild(option3Restrictions);
    rowDiv.appendChild(selectRestrictions);*/

    if(i === (formular.rows.length-1))
      showImagePlus(rowDiv);
    formularDataElement.appendChild(rowDiv);
  }

  formularDataElement.style.display = "block";
  document.getElementById("saveButtonAdmin").style.display = "block";
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

  var selectType = createSelectType(row);
  rowDiv.appendChild(selectType);
  rowDiv.innerHTML += " &nbsp; ";
  
  var selectRestrictions = createSelectRestrictions(row);
  rowDiv.appendChild(selectRestrictions);


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

function showImagePlus(parentDiv)
{
  var image = document.getElementsByTagName("template")[0];
  var addButton = image.content.cloneNode(true);
  parentDiv.appendChild(addButton);
}

function addRow()
{
  var formularDataElement = document.getElementById("formularData");

  //var rowDiv =  document.createElement("div");
  var emptyRow = 
  {
    label: "",
    type: "TextBox",
    radioButtonLabels: [],
    restrictions: "None"

  }
  var rowDiv = createRow(emptyRow, formularDataElement.childNodes.length);

    /*var elementField = document.createTextNode("Element " + (formularDataElement.childNodes.length+1));
    rowDiv.appendChild(elementField);
    rowDiv.innerHTML += " &nbsp; ";

    var labelField = document.createElement("input");
    labelField.setAttribute("type", "text");
    labelField.setAttribute("value", "");
    rowDiv.appendChild(labelField);
    rowDiv.innerHTML += " &nbsp; ";

    var option1Type = document.createElement("option");
    option1Type.value = "TextBox";
    option1Type.innerText = "TextBox";
    option1Type.setAttribute("selected", true);
    var option2Type = document.createElement("option");
    option2Type.value = "CheckBox";
    option2Type.innerText = "CheckBox";
    var option3Type = document.createElement("option");
    option3Type.value = "RadioButton";   
    option3Type.innerText = "RadioButton";
    var selectType = document.createElement("select");
    selectType.appendChild(option1Type);
    selectType.appendChild(option2Type);
    selectType.appendChild(option3Type);
    rowDiv.appendChild(selectType);
    rowDiv.innerHTML += " &nbsp; ";
   
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
    option3Restrictions.setAttribute("selected", true);
    selectRestrictions.appendChild(option1Restrictions);
    selectRestrictions.appendChild(option2Restrictions);
    selectRestrictions.appendChild(option3Restrictions);
    rowDiv.appendChild(selectRestrictions);*/

    if(formularDataElement.childNodes.length>0)
      formularDataElement.lastChild.removeChild(formularDataElement.lastChild.lastChild);
    showImagePlus(rowDiv);
    formularDataElement.appendChild(rowDiv);
  
}


function saveFormularAdmin()
{
  var formular = getFormularRowsFromFields();
  var foundFormular = data.formulars.find(function(element){return element.name===formular.name;});
  var foundIndex =  data.formulars.findIndex(function(element){return element.name===formular.name;});
  if(foundFormular !== undefined)
  {
    if (invalidateFormularVersions(foundFormular, formular))
      data.formulars[foundIndex] = formular;
      // TODO: tell user that formular is saved
  }
  else
  {
    data.formulars.push(formular);
    // TODO: tell user that formular is saved
  }
  console.log(data);
}


function getFormularRowsFromFields() 
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

function invalidateFormularVersions(foundFormular, formular)
{
  if(foundFormular.rows.length === formular.rows.length)
  {
    for(i=0; i<foundFormular.rows.length; i++)
    { //fale radiobuttoni
      if((foundFormular.rows[i].label !== formular.rows[i].label) ||
        (foundFormular.rows[i].type !== formular.rows[i].type) ||
        (foundFormular.rows[i].restrictions !== formular.rows[i].restrictions))
        {
          return deleteInvalidVersions(foundFormular.name);
        }     
    }
  }
  else
  {
    return deleteInvalidVersions(foundFormular.name);
  }
  return true;
}

function deleteInvalidVersions(formularName)
{
  if(confirm("Updating an existing formular will delete all its existing versions. Do you wish to save anyway?"))
    {
      data.versions = data.versions.map(function(element){return element.formularName !== formularName;});
      return true;
    }
  else
    return false;

}


function saveFormularForm()
{
  var array = [];
  var version = document.getElementById("version-box").value;
  var formularName = document.getElementById('name-formulars').options[document.getElementById('name-formulars').selectedIndex].text;
  var foundVersion = data.versions.find(function(element){return (element.version === version) && (element.formularName===formularName);});
  var foundIndex = data.versions.findIndex(function(element){return (element.version === version) && (element.formularName===formularName);});
  var foundFormular = data.formulars.find(function(element){return element.name === formularName;});
  var formularDataElement = document.getElementById("formularVersionData");
  var rowsArray = formularDataElement.childNodes;
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

  if(foundVersion !== undefined)
  {
    data.versions[foundIndex].versionData = array;
  }
  else
  {
    data.versions.push(
      {
        version: version,
        formularName: formularName,
        versionData: array
      }
    );
  }
  console.log(data.versions);
}







function loadFormular(formularName, version)
{
  var foundVersion = data.versions.find(function(element){return (element.version === version) && (element.formularName===formularName);});
  var foundIndex = data.versions.findIndex(function(element){return (element.version === version) && (element.formularName===formularName);});
  if(foundVersion !== undefined)
  {
    showFormularVersion(formularName, data.versions[foundIndex]);
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
    var rowDiv =  document.createElement("div");

    if(foundFormular.rows[i].restrictions === "Mandatory")
      var elementField = document.createTextNode(foundFormular.rows[i].label + "*:");
    else
      var elementField = document.createTextNode(foundFormular.rows[i].label + ":");
    rowDiv.appendChild(elementField);
    rowDiv.innerHTML += " &nbsp; ";

    if(foundFormular.rows[i].type === "TextBox")
    {
      var labelField = document.createElement("input");
      labelField.setAttribute("type", "text");
      labelField.setAttribute("value", "");
    }
    else if(foundFormular.rows[i].type === "CheckBox")
    {
      var labelField = document.createElement("input");
      labelField.setAttribute("type", "checkbox");
      labelField.checked = false;
    }
    else
    {
      //za radiobutton
    }
    
    //rowDiv.innerHTML += " &nbsp; ";

    if(versionDataObject !== -1)
    {
      if((versionDataObject.versionData[i] == true) || (versionDataObject.versionData[i] == false))
        labelField.checked = versionDataObject.versionData[i];
      else
        labelField.setAttribute("value", versionDataObject.versionData[i]);
      
    }
    rowDiv.appendChild(labelField);
    formularDataElement.appendChild(rowDiv);
  }
  document.getElementById("saveButtonForm").style.display = "block";
  formularDataElement.style.display = "block";
}

