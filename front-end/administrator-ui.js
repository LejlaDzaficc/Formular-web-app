function showFormularTemplate(foundFormular)
{
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

  var rowDiv;
  for(i = 0; i < formular.rows.length; i++)
  {
    rowDiv = createRow(formular.rows[i], i);
    if(i === (formular.rows.length-1))
      setPlusButton(rowDiv);
    formularDataElement.appendChild(rowDiv);
    showOrHideExtraOptionsOfRadioButtons(rowDiv.childNodes[3].childNodes[0]);
    disableInvalidRestrictions(rowDiv.childNodes[5], rowDiv.childNodes[3].childNodes[0]);
    showDataOfRadioButtons(formular.rows[i].radioButtonLabels, rowDiv.childNodes[3]);
  }
  formularDataElement.childNodes.forEach(function(element){
    element.childNodes[3].childNodes[0].onchange = function(){
      showOrHideExtraOptionsOfRadioButtons(element.childNodes[3].childNodes[0]);
      disableInvalidRestrictions(element.childNodes[5], element.childNodes[3].childNodes[0]);
    };
  });

  formularDataElement.style.display = "block";
  document.getElementById("saveButtonAdmin").style.display = "block";
}

function setPlusButton(parentDiv)
{
  var image = document.getElementsByTagName("template")[0];
  var addButton = image.content.cloneNode(true);
  parentDiv.appendChild(addButton);
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
  rowDiv.childNodes[3].childNodes[0].onchange = function(){
    showOrHideExtraOptionsOfRadioButtons(rowDiv.childNodes[3].childNodes[0]);
    disableInvalidRestrictions(rowDiv.childNodes[5], rowDiv.childNodes[3].childNodes[0]);
  };
}

function showOrHideExtraOptionsOfRadioButtons(selectType)
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

    showRadioButtonInputs(selectType.parentElement, selectNumberRadioButtons.value);
    selectNumberRadioButtons.onchange = function()
    {
      showRadioButtonInputs(selectNumberRadioButtons.parentElement, selectNumberRadioButtons.value);
    };
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

function disableInvalidRestrictions(selectRestrictions, selectType)
{
  if((selectType.value === "CheckBox") || (selectType.value === "RadioButton"))
  {
    selectRestrictions.options[0].disabled = false;
    selectRestrictions.options[1].disabled = true;
    selectRestrictions.options[2].disabled = false; 
  }
  else
  {
    selectRestrictions.options[0].disabled = false;
    selectRestrictions.options[1].disabled = false;
    selectRestrictions.options[2].disabled = false; 
  }
}

function showDataOfRadioButtons(arrayRadioButton, parentDiv)
{
  if(arrayRadioButton.length>1)
   {
    parentDiv.childNodes[2].childNodes[arrayRadioButton.length-2].setAttribute("selected", true);
    showRadioButtonInputs(parentDiv, arrayRadioButton.length);
    fillRadioButtonInputs(arrayRadioButton, parentDiv.getElementsByTagName("input"));
   }
}

function showRadioButtonInputs(parentDiv, selectedValue)
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

function fillRadioButtonInputs(arrayRadioButton, arrayInputs)
{
  var i;
  for(i=0; i<arrayRadioButton.length; i++)
  {
    arrayInputs[i].setAttribute("value", arrayRadioButton[i]);
  }
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

function getFormularTemplateFromFields() 
{
  var formular = {
    name: document.getElementById('search-box').value,
    rows:[]
   }

  if(formular.name === "")
  {
    alert("Formular name needed!");
    return undefined;
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
      for(j=0; j<arrayInputs.length; j++)
      {
        arrayInputs[j].className = "";
        if(arrayInputs[j].value === " " || arrayInputs[j].value === "")
          { 
            arrayInputs[j].className = "missing-input";
            alert("Radio button labels can't be empty!");
            return undefined;
          }
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
      alert("You need to input something in 'Element " + (i+1) + "' field!");
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