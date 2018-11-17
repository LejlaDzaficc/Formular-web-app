// tabs
function openTab(evt, tabName) {
  hideAllTabContents();
  deactivateAllTabButtons();
  initializeTabContent(tabName);

  document.getElementById("formularData").style.display = "none";
  document.getElementById("formularVersionData").style.display = "none";
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

function hideAllTabContents() 
{
  var tabcontent;
  tabcontent = document.getElementsByClassName("content-wrapper");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }
}

function deactivateAllTabButtons()
{
  var tabButtons;
  tabButtons = document.getElementsByClassName("tabButtons");
  for (i = 0; i < tabButtons.length; i++) {
      tabButtons[i].className = "tabButtons";
  }
}

function initializeTabContent(tabName) 
{
  if(tabName === "Form")
    loadFormularNames();
  document.getElementById("version-box").value = "";
  document.getElementById("search-box").value = "";
}
//
function loadFormularNames()
{
  var selectFormular = document.getElementById("name-formulars");
  selectFormular.innerHTML = "";
  var formulars = getFormulars();
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


function searchFormulars()
{
  var formularName = document.getElementById('search-box').value;
  if(formularName === "")
    return;
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