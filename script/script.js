const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const signInBtn = document.getElementById("sign-in-btn");

const tabSection = document.getElementById("tab-section");

const issueContainer = document.getElementById("issues-container");
const issueText = document.getElementById("issue-text");

const loadingSpinner = document.getElementById("loadingSpinner");

const issueModal = document.getElementById("issueModal");

// modal elements
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalAssignee = document.getElementById("modalAssignee");
const modalPriority = document.getElementById("modalPriority");
const modalStatus = document.getElementById("modalStatus");
const modalDate = document.getElementById("modalDate");
const modalAssigneeOpen = document.getElementById("modalAssigneeOpen");
let allIssues = [];

// Go to Main Page
if (signInBtn) {
    signInBtn.addEventListener("click", () => {
        if (inputUsername.value === "admin" && inputPassword.value === "admin123") {
            window.location.assign("/main.html");
        } else {
            alert("Wrong Username or Password!");
        }
    });
}

// Loading Category Wise Button


// Select Tab 
async function selectTab(btn) {
    const buttons = document.querySelectorAll("#tab-section button");
    buttons.forEach((btn) => {
      btn.classList.remove("btn-primary");
      btn.classList.add("btn-outline");
    });

    const selectedBtn = document.getElementById(btn);
    selectedBtn.classList.add("btn-primary");
    selectedBtn.classList.remove("btn-outline");

    issueContainer.innerHTML = "";

    let selectedIssues;

    if(btn === "open"){
        selectedIssues = allIssues.filter(issue => issue.status === "open");
    }
    else if(btn === "closed"){
        selectedIssues = allIssues.filter(issue => issue.status === "closed");
    }
    else{
        selectedIssues = allIssues;
    }

    displayIssues(selectedIssues);

}

function showLoading() {
    loadingSpinner.classList.remove("hidden");
    issueContainer.innerHTML = "";
}

function hideLoading() {
    loadingSpinner.classList.add("hidden");
}

async function loadIssues(){

    showLoading();
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json();
    hideLoading();
    allIssues = data.data;
    displayIssues(data.data);
}


function displayIssues(issues){
     issueContainer.innerHTML = "";
    issues.forEach((issue)=>{
        const allCard = document.createElement("div");
        allCard.className = `card bg-white shadow-lg rounded-lg cursor-pointer ${issue.status === "open" ? "border-t-3 border-green-500" : "border-t-3 border-purple-500"}`;
        
             //label badges
        const labelBadges = issue.labels.map(label => {
            if(label === "bug") {
                return `<span class="badge border border-red-300 bg-red-100 rounded-2xl font-bold px-2 text-red-500 text-[12px]"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.25078 2.41967L9.77297 1.89795C9.82529 1.84562 9.8668 1.78351 9.89512 1.71514C9.92343 1.64678 9.93801 1.57351 9.93801 1.49951C9.93801 1.42551 9.92343 1.35224 9.89512 1.28388C9.8668 1.21551 9.82529 1.1534 9.77297 1.10107C9.72065 1.04875 9.65853 1.00724 9.59017 0.978927C9.5218 0.95061 9.44853 0.936035 9.37453 0.936035C9.30054 0.936035 9.22726 0.95061 9.1589 0.978927C9.09054 1.00724 9.02842 1.04875 8.9761 1.10107L8.40656 1.67295C7.69553 1.19357 6.85754 0.93747 6 0.93747C5.14247 0.93747 4.30447 1.19357 3.59344 1.67295L3.02297 1.10201C2.9173 0.996339 2.77398 0.936973 2.62453 0.936973C2.47509 0.936973 2.33177 0.996339 2.2261 1.10201C2.12042 1.20768 2.06106 1.35101 2.06106 1.50045C2.06106 1.64989 2.12042 1.79321 2.2261 1.89889L2.74922 2.41967C2.06386 3.20317 1.68654 4.20902 1.6875 5.24998V7.12498C1.6875 8.26873 2.14185 9.36563 2.9506 10.1744C3.75935 10.9831 4.85626 11.4375 6 11.4375C7.14375 11.4375 8.24065 10.9831 9.0494 10.1744C9.85815 9.36563 10.3125 8.26873 10.3125 7.12498V5.24998C10.3135 4.20902 9.93614 3.20317 9.25078 2.41967ZM9.1875 5.24998V5.43748H2.8125V5.24998C2.8125 4.4046 3.14833 3.59385 3.7461 2.99608C4.34387 2.3983 5.15462 2.06248 6 2.06248C6.84538 2.06248 7.65613 2.3983 8.25391 2.99608C8.85168 3.59385 9.1875 4.4046 9.1875 5.24998ZM6 10.3125C5.15489 10.3116 4.34464 9.97551 3.74706 9.37792C3.14947 8.78034 2.81337 7.97009 2.8125 7.12498V6.56248H9.1875V7.12498C9.18663 7.97009 8.85053 8.78034 8.25295 9.37792C7.65536 9.97551 6.84511 10.3116 6 10.3125ZM6.5625 4.12498C6.5625 3.97664 6.60649 3.83164 6.6889 3.7083C6.77131 3.58497 6.88844 3.48884 7.02549 3.43207C7.16253 3.3753 7.31333 3.36045 7.45882 3.38939C7.60431 3.41833 7.73794 3.48976 7.84283 3.59465C7.94772 3.69954 8.01915 3.83318 8.04809 3.97866C8.07703 4.12415 8.06218 4.27495 8.00541 4.41199C7.94865 4.54904 7.85252 4.66617 7.72918 4.74858C7.60584 4.83099 7.46084 4.87498 7.3125 4.87498C7.11359 4.87498 6.92282 4.79596 6.78217 4.65531C6.64152 4.51466 6.5625 4.32389 6.5625 4.12498ZM3.9375 4.12498C3.9375 3.97664 3.98149 3.83164 4.0639 3.7083C4.14631 3.58497 4.26344 3.48884 4.40049 3.43207C4.53753 3.3753 4.68833 3.36045 4.83382 3.38939C4.97931 3.41833 5.11294 3.48976 5.21783 3.59465C5.32272 3.69954 5.39415 3.83318 5.42309 3.97866C5.45203 4.12415 5.43718 4.27495 5.38041 4.41199C5.32365 4.54904 5.22752 4.66617 5.10418 4.74858C4.98084 4.83099 4.83584 4.87498 4.6875 4.87498C4.48859 4.87498 4.29782 4.79596 4.15717 4.65531C4.01652 4.51466 3.9375 4.32389 3.9375 4.12498Z" fill="#EF4444"/>
                </svg>${label.toUpperCase()}</span>`;
            }else if(label === "help wanted"){
                return `<span class="badge border border-yellow-300 bg-yellow-100 rounded-2xl font-bold px-2 text-yellow-600 text-[12px]"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.25078 2.41967L9.77297 1.89795C9.82529 1.84562 9.8668 1.78351 9.89512 1.71514C9.92343 1.64678 9.93801 1.57351 9.93801 1.49951C9.93801 1.42551 9.92343 1.35224 9.89512 1.28388C9.8668 1.21551 9.82529 1.1534 9.77297 1.10107C9.72065 1.04875 9.65853 1.00724 9.59017 0.978927C9.5218 0.95061 9.44853 0.936035 9.37453 0.936035C9.30054 0.936035 9.22726 0.95061 9.1589 0.978927C9.09054 1.00724 9.02842 1.04875 8.9761 1.10107L8.40656 1.67295C7.69553 1.19357 6.85754 0.93747 6 0.93747C5.14247 0.93747 4.30447 1.19357 3.59344 1.67295L3.02297 1.10201C2.9173 0.996339 2.77398 0.936973 2.62453 0.936973C2.47509 0.936973 2.33177 0.996339 2.2261 1.10201C2.12042 1.20768 2.06106 1.35101 2.06106 1.50045C2.06106 1.64989 2.12042 1.79321 2.2261 1.89889L2.74922 2.41967C2.06386 3.20317 1.68654 4.20902 1.6875 5.24998V7.12498C1.6875 8.26873 2.14185 9.36563 2.9506 10.1744C3.75935 10.9831 4.85626 11.4375 6 11.4375C7.14375 11.4375 8.24065 10.9831 9.0494 10.1744C9.85815 9.36563 10.3125 8.26873 10.3125 7.12498V5.24998C10.3135 4.20902 9.93614 3.20317 9.25078 2.41967ZM9.1875 5.24998V5.43748H2.8125V5.24998C2.8125 4.4046 3.14833 3.59385 3.7461 2.99608C4.34387 2.3983 5.15462 2.06248 6 2.06248C6.84538 2.06248 7.65613 2.3983 8.25391 2.99608C8.85168 3.59385 9.1875 4.4046 9.1875 5.24998ZM6 10.3125C5.15489 10.3116 4.34464 9.97551 3.74706 9.37792C3.14947 8.78034 2.81337 7.97009 2.8125 7.12498V6.56248H9.1875V7.12498C9.18663 7.97009 8.85053 8.78034 8.25295 9.37792C7.65536 9.97551 6.84511 10.3116 6 10.3125ZM6.5625 4.12498C6.5625 3.97664 6.60649 3.83164 6.6889 3.7083C6.77131 3.58497 6.88844 3.48884 7.02549 3.43207C7.16253 3.3753 7.31333 3.36045 7.45882 3.38939C7.60431 3.41833 7.73794 3.48976 7.84283 3.59465C7.94772 3.69954 8.01915 3.83318 8.04809 3.97866C8.07703 4.12415 8.06218 4.27495 8.00541 4.41199C7.94865 4.54904 7.85252 4.66617 7.72918 4.74858C7.60584 4.83099 7.46084 4.87498 7.3125 4.87498C7.11359 4.87498 6.92282 4.79596 6.78217 4.65531C6.64152 4.51466 6.5625 4.32389 6.5625 4.12498ZM3.9375 4.12498C3.9375 3.97664 3.98149 3.83164 4.0639 3.7083C4.14631 3.58497 4.26344 3.48884 4.40049 3.43207C4.53753 3.3753 4.68833 3.36045 4.83382 3.38939C4.97931 3.41833 5.11294 3.48976 5.21783 3.59465C5.32272 3.69954 5.39415 3.83318 5.42309 3.97866C5.45203 4.12415 5.43718 4.27495 5.38041 4.41199C5.32365 4.54904 5.22752 4.66617 5.10418 4.74858C4.98084 4.83099 4.83584 4.87498 4.6875 4.87498C4.48859 4.87498 4.29782 4.79596 4.15717 4.65531C4.01652 4.51466 3.9375 4.32389 3.9375 4.12498Z" fill="#EF4444"/>
                </svg>${label.toUpperCase()}</span>`
            }else if(label === "enhancement") {
                return `<span class="badge border border-green-300 bg-green-100 rounded-2xl font-bold px-2 text-green-500 text-[12px]"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_70_193)"><path d="M9.32813 5.87391L6.99 5.01188L6.1261 2.67188C6.06003 2.49271 5.94063 2.3381 5.78398 2.2289C5.62733 2.1197 5.44096 2.06116 5.25 2.06116C5.05904 2.06116 4.87268 2.1197 4.71603 2.2289C4.55937 2.3381 4.43997 2.49271 4.37391 2.67188L3.51188 5.01188L1.17188 5.87391C0.99271 5.93997 0.838106 6.05937 0.728905 6.21602C0.619704 6.37268 0.561157 6.55904 0.561157 6.75C0.561157 6.94096 0.619704 7.12732 0.728905 7.28398C0.838106 7.44063 0.99271 7.56003 1.17188 7.62609L3.51 8.48812L4.37391 10.8281C4.43997 11.0073 4.55937 11.1619 4.71603 11.2711C4.87268 11.3803 5.05904 11.4388 5.25 11.4388C5.44096 11.4388 5.62733 11.3803 5.78398 11.2711C5.94063 11.1619 6.06003 11.0073 6.1261 10.8281L6.98813 8.49L9.32813 7.62609C9.50729 7.56003 9.6619 7.44063 9.7711 7.28398C9.8803 7.12732 9.93885 6.94096 9.93885 6.75C9.93885 6.55904 9.8803 6.37268 9.7711 6.21602C9.6619 6.05937 9.50729 5.93997 9.32813 5.87391ZM6.35719 7.52203C6.28084 7.55017 6.2115 7.59454 6.15396 7.65208C6.09642 7.70962 6.05205 7.77896 6.02391 7.85531L5.25 9.95062L4.47797 7.85531C4.44983 7.77896 4.40546 7.70962 4.34792 7.65208C4.29038 7.59454 4.22104 7.55017 4.14469 7.52203L2.04938 6.75L4.14469 5.97797C4.22104 5.94983 4.29038 5.90546 4.34792 5.84792C4.40546 5.79038 4.44983 5.72104 4.47797 5.64469L5.25 3.54938L6.02203 5.64469C6.05017 5.72104 6.09454 5.79038 6.15208 5.84792C6.20962 5.90546 6.27896 5.94983 6.35531 5.97797L8.45063 6.75L6.35719 7.52203ZM6.5625 1.875C6.5625 1.72582 6.62177 1.58274 6.72725 1.47725C6.83274 1.37176 6.97582 1.3125 7.125 1.3125H7.6875V0.75C7.6875 0.600816 7.74677 0.457742 7.85225 0.352252C7.95774 0.246763 8.10082 0.1875 8.25 0.1875C8.39919 0.1875 8.54226 0.246763 8.64775 0.352252C8.75324 0.457742 8.8125 0.600816 8.8125 0.75V1.3125H9.375C9.52419 1.3125 9.66726 1.37176 9.77275 1.47725C9.87824 1.58274 9.9375 1.72582 9.9375 1.875C9.9375 2.02418 9.87824 2.16726 9.77275 2.27275C9.66726 2.37824 9.52419 2.4375 9.375 2.4375H8.8125V3C8.8125 3.14918 8.75324 3.29226 8.64775 3.39775C8.54226 3.50324 8.39919 3.5625 8.25 3.5625C8.10082 3.5625 7.95774 3.50324 7.85225 3.39775C7.74677 3.29226 7.6875 3.14918 7.6875 3V2.4375H7.125C6.97582 2.4375 6.83274 2.37824 6.72725 2.27275C6.62177 2.16726 6.5625 2.02418 6.5625 1.875ZM11.8125 4.125C11.8125 4.27418 11.7532 4.41726 11.6477 4.52275C11.5423 4.62824 11.3992 4.6875 11.25 4.6875H11.0625V4.875C11.0625 5.02418 11.0032 5.16726 10.8977 5.27275C10.7923 5.37824 10.6492 5.4375 10.5 5.4375C10.3508 5.4375 10.2077 5.37824 10.1023 5.27275C9.99677 5.16726 9.9375 5.02418 9.9375 4.875V4.6875H9.75C9.60082 4.6875 9.45774 4.62824 9.35225 4.52275C9.24677 4.41726 9.1875 4.27418 9.1875 4.125C9.1875 3.97582 9.24677 3.83274 9.35225 3.72725C9.45774 3.62176 9.60082 3.5625 9.75 3.5625H9.9375V3.375C9.9375 3.22582 9.99677 3.08274 10.1023 2.97725C10.2077 2.87176 10.3508 2.8125 10.5 2.8125C10.6492 2.8125 10.7923 2.87176 10.8977 2.97725C11.0032 3.08274 11.0625 3.22582 11.0625 3.375V3.5625H11.25C11.3992 3.5625 11.5423 3.62176 11.6477 3.72725C11.7532 3.83274 11.8125 3.97582 11.8125 4.125Z" fill="#00A96E"/>
                    </g><defs><clipPath id="clip0_70_193"><rect width="12" height="12" fill="white"/></clipPath></defs></svg>${label.toUpperCase()}</span>`;
            }else {
                return `<span class="badge border border-gray-300 bg-gray-100 rounded-2xl font-bold px-2 text-[12px] text-gray-700 ">${label.toUpperCase()}</span>`;
            }
        }).join(" ");
        
        allCard.innerHTML = `
        <div class="card-body ">
              <div class="flex justify-between items-center mb-4">
                <img src='${issue.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png"}' alt="">
                <span class="badge font-bold px-8 rounded-full ${issue.priority === "high" ? "border border-red-300 bg-red-100 text-red-500" : issue.priority === "medium" ? "border border-yellow-300 bg-yellow-100 text-yellow-600" : "border border-gray-300 bg-gray-100 text-gray-500"}">${issue.priority.toUpperCase()}</span>
              </div>
              <h2 onclick="openModal(${issue.id})" class="card-title">${issue.title}</h2>
              <p class="line-clamp-2 text-[#64748B]">${issue.description}</p>
                <div class="flex gap-2 mt-2">
                    ${labelBadges}
                </div>
            </div>
            <hr class="border-gray-300">
            <div class = "m-[16px] text-[#64748B]">
              <p class="mb-2">${issue.assignee !== "" ? issue.assignee : "Unassigned"}</p>
              <p>${new Date(issue.createdAt).toLocaleDateString("en-US")}</p>
            </div>
          </div>
            `;
            issueContainer.appendChild(allCard)
        issueText.innerText = `${issues.length} Issues`
    })
}

async function openModal(issueId){
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`)
    const data = await res.json();
    const issueDetail = data.data;
    modalTitle.innerText = issueDetail.title;
    modalDescription.innerText = issueDetail.description;
    modalAssignee.innerText = issueDetail.assignee !== "" ? issueDetail.assignee : "Unassigned";
    modalPriority.innerText = issueDetail.priority.toUpperCase();
    modalPriority.className = `badge font-bold px-2 rounded-full ${issueDetail.priority === "high" ? "border border-red-300 bg-[#EF4444] text-white text-[14px]" : issueDetail.priority === "medium" ? "border border-yellow-300 bg-yellow-100 text-yellow-600 text-[14px] px-2" : "border border-gray-300 bg-gray-100 text-gray-500 text-[14px] px-2"}`;
    modalStatus.innerText = issueDetail.status.toUpperCase();
    modalStatus.className = `badge border ${issueDetail.status === "open" ? "border-green-400 bg-[#00A96E] text-white" : "border-purple-400 bg-purple-500 text-white"} rounded-full px-3 font-semibold`;
    modalDate.innerText = new Date(issueDetail.createdAt).toLocaleDateString("en-US");
    modalAssigneeOpen.innerText = issueDetail.assignee !== "" ? issueDetail.assignee : "Unassigned";
    issueModal.showModal();
}

loadIssues();

document.getElementById("btn-search").addEventListener("click", ()=>{
    const searchValue = document.getElementById("input-search").value.trim().toLowerCase();

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
    .then(res => res.json())
    .then(data => {
        const searchResults = data.data;
        const filteredIssues = searchResults.filter(issue => issue.title.toLowerCase().includes(searchValue));
        displayIssues(filteredIssues);
    });

});
