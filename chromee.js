// Initialize variables
let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

// Retrieve leads from local storage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  renderLeads();
}

// Event listener for tab button
tabBtn.addEventListener("click", saveTabUrl);

// Event listener for delete button
deleteBtn.addEventListener("dblclick", deleteLeads);

// Event listener for input button
inputBtn.addEventListener("click", saveCustomUrl);

// Function to render leads
function renderLeads() {
  let listItems = "";
  for (const lead of myLeads) {
    listItems += `
      <li>
        <a target='_blank' href='${lead}'>
          ${lead}
        </a>
      </li>
    `;
  }
  ulEl.innerHTML = listItems;
}

// Function to save the URL of the active tab
function saveTabUrl() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tabUrl = tabs[0].url;
    myLeads.push(tabUrl);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads();
  });
}

// Function to delete all leads
function deleteLeads() {
  localStorage.clear();
  myLeads = [];
  renderLeads();
}

// Function to save a custom URL
function saveCustomUrl() {
  const customUrl = inputEl.value;
  myLeads.push(customUrl);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  renderLeads();
}