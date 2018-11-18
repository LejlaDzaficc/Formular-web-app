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
