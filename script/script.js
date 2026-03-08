const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const signInBtn = document.getElementById("sign-in-btn");

const tabSection = document.getElementById("tab-section");

const issueContainer = document.getElementById("issues-container");
const issueText = document.getElementById("issue-text");

const loadingSpinner = document.getElementById("loadingSpinner");

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
        
        // const img = document.createElement("img");
        // img.src = issue.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png";
        
        allCard.innerHTML = `
        <div class="card-body">
              <div class="flex justify-between items-center mb-4 ">
                <img src='${issue.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png"}' alt="">
                <span class="badge font-bold px-8 rounded-full ${issue.priority === "high" ? "border border-red-300 bg-red-100 text-red-500" : issue.priority === "medium" ? "border border-yellow-300 bg-yellow-100 text-yellow-600" : "border border-gray-300 bg-gray-100 text-gray-500"}">${issue.priority}</span>
              </div>
              <h2 class="card-title">${issue.title}</h2>
              <p class="line-clamp-2 text-[#64748B]">${issue.description}</p>
              
              <div class="flex gap-2">
                <div class="badge border border-red-300 bg-red-100 rounded-2xl font-bold text-[#EF4444]"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.25078 2.41967L9.77297 1.89795C9.82529 1.84562 9.8668 1.78351 9.89512 1.71514C9.92343 1.64678 9.93801 1.57351 9.93801 1.49951C9.93801 1.42551 9.92343 1.35224 9.89512 1.28388C9.8668 1.21551 9.82529 1.1534 9.77297 1.10107C9.72065 1.04875 9.65853 1.00724 9.59017 0.978927C9.5218 0.95061 9.44853 0.936035 9.37453 0.936035C9.30054 0.936035 9.22726 0.95061 9.1589 0.978927C9.09054 1.00724 9.02842 1.04875 8.9761 1.10107L8.40656 1.67295C7.69553 1.19357 6.85754 0.93747 6 0.93747C5.14247 0.93747 4.30447 1.19357 3.59344 1.67295L3.02297 1.10201C2.9173 0.996339 2.77398 0.936973 2.62453 0.936973C2.47509 0.936973 2.33177 0.996339 2.2261 1.10201C2.12042 1.20768 2.06106 1.35101 2.06106 1.50045C2.06106 1.64989 2.12042 1.79321 2.2261 1.89889L2.74922 2.41967C2.06386 3.20317 1.68654 4.20902 1.6875 5.24998V7.12498C1.6875 8.26873 2.14185 9.36563 2.9506 10.1744C3.75935 10.9831 4.85626 11.4375 6 11.4375C7.14375 11.4375 8.24065 10.9831 9.0494 10.1744C9.85815 9.36563 10.3125 8.26873 10.3125 7.12498V5.24998C10.3135 4.20902 9.93614 3.20317 9.25078 2.41967ZM9.1875 5.24998V5.43748H2.8125V5.24998C2.8125 4.4046 3.14833 3.59385 3.7461 2.99608C4.34387 2.3983 5.15462 2.06248 6 2.06248C6.84538 2.06248 7.65613 2.3983 8.25391 2.99608C8.85168 3.59385 9.1875 4.4046 9.1875 5.24998ZM6 10.3125C5.15489 10.3116 4.34464 9.97551 3.74706 9.37792C3.14947 8.78034 2.81337 7.97009 2.8125 7.12498V6.56248H9.1875V7.12498C9.18663 7.97009 8.85053 8.78034 8.25295 9.37792C7.65536 9.97551 6.84511 10.3116 6 10.3125ZM6.5625 4.12498C6.5625 3.97664 6.60649 3.83164 6.6889 3.7083C6.77131 3.58497 6.88844 3.48884 7.02549 3.43207C7.16253 3.3753 7.31333 3.36045 7.45882 3.38939C7.60431 3.41833 7.73794 3.48976 7.84283 3.59465C7.94772 3.69954 8.01915 3.83318 8.04809 3.97866C8.07703 4.12415 8.06218 4.27495 8.00541 4.41199C7.94865 4.54904 7.85252 4.66617 7.72918 4.74858C7.60584 4.83099 7.46084 4.87498 7.3125 4.87498C7.11359 4.87498 6.92282 4.79596 6.78217 4.65531C6.64152 4.51466 6.5625 4.32389 6.5625 4.12498ZM3.9375 4.12498C3.9375 3.97664 3.98149 3.83164 4.0639 3.7083C4.14631 3.58497 4.26344 3.48884 4.40049 3.43207C4.53753 3.3753 4.68833 3.36045 4.83382 3.38939C4.97931 3.41833 5.11294 3.48976 5.21783 3.59465C5.32272 3.69954 5.39415 3.83318 5.42309 3.97866C5.45203 4.12415 5.43718 4.27495 5.38041 4.41199C5.32365 4.54904 5.22752 4.66617 5.10418 4.74858C4.98084 4.83099 4.83584 4.87498 4.6875 4.87498C4.48859 4.87498 4.29782 4.79596 4.15717 4.65531C4.01652 4.51466 3.9375 4.32389 3.9375 4.12498Z" fill="#EF4444"/>
                    </svg>BUG
                  </div>
                <div class="badge border border-yellow-300 bg-yellow-100 rounded-2xl font-bold px-4 text-[#D97706]"><svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.0625 0C4.06123 0 3.08245 0.29691 2.24993 0.853185C1.4174 1.40946 0.768531 2.20011 0.385362 3.12516C0.00219351 4.05022 -0.0980609 5.06812 0.0972768 6.05014C0.292614 7.03217 0.774771 7.93423 1.48277 8.64223C2.19078 9.35023 3.09283 9.83239 4.07486 10.0277C5.05689 10.2231 6.07479 10.1228 6.99984 9.73964C7.92489 9.35647 8.71554 8.7076 9.27182 7.87507C9.82809 7.04255 10.125 6.06377 10.125 5.0625C10.1235 3.7203 9.58967 2.4335 8.64059 1.48442C7.69151 0.535336 6.4047 0.00148885 5.0625 0ZM7.13672 6.34125C7.3742 5.957 7.49998 5.51421 7.49998 5.0625C7.49998 4.61079 7.3742 4.168 7.13672 3.78375L8.21485 2.70563C8.72451 3.38569 9 4.21265 9 5.0625C9 5.91235 8.72451 6.73931 8.21485 7.41937L7.13672 6.34125ZM3.75 5.0625C3.75 4.80291 3.82698 4.54915 3.9712 4.33331C4.11542 4.11747 4.3204 3.94925 4.56023 3.84991C4.80006 3.75057 5.06396 3.72458 5.31856 3.77522C5.57316 3.82586 5.80702 3.95087 5.99058 4.13442C6.17414 4.31798 6.29914 4.55184 6.34978 4.80644C6.40043 5.06104 6.37443 5.32494 6.27509 5.56477C6.17575 5.8046 6.00753 6.00958 5.79169 6.1538C5.57585 6.29802 5.32209 6.375 5.0625 6.375C4.71441 6.375 4.38057 6.23672 4.13442 5.99058C3.88828 5.74444 3.75 5.4106 3.75 5.0625ZM7.41938 1.91016L6.34125 2.98828C5.957 2.7508 5.51421 2.62502 5.0625 2.62502C4.61079 2.62502 4.168 2.7508 3.78375 2.98828L2.70563 1.91016C3.38569 1.40049 4.21265 1.125 5.0625 1.125C5.91236 1.125 6.73931 1.40049 7.41938 1.91016ZM1.91016 2.70703L2.98828 3.78516C2.75081 4.16941 2.62502 4.61219 2.62502 5.06391C2.62502 5.51562 2.75081 5.95841 2.98828 6.34266L1.91016 7.42078C1.40049 6.74072 1.125 5.91376 1.125 5.06391C1.125 4.21405 1.40049 3.3871 1.91016 2.70703ZM2.70703 8.21625L3.78516 7.13812C4.16941 7.3756 4.6122 7.50139 5.06391 7.50139C5.51562 7.50139 5.95841 7.3756 6.34266 7.13812L7.42078 8.21625C6.74072 8.72592 5.91376 9.00141 5.06391 9.00141C4.21405 9.00141 3.3871 8.72592 2.70703 8.21625Z" fill="#D97706"/>
                  </svg>HELP WANTED
                </div>
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
loadIssues();
