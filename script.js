// ==============================
// JOB DATA
// ==============================

const jobs = [

    {
        id: 1,
        title: "Frontend Developer",
        company: "TechNova",
        location: "Delhi",
        type: "Full-time",
        experience: "Entry Level",
        salary: 65000,
        salaryText: "$65K - $85K",
        logo: "T",
        tags: ["HTML", "CSS", "JavaScript"],
        description:
            "We are looking for a passionate Frontend Developer to build modern and responsive web applications."
    },

    {
        id: 2,
        title: "Data Analyst",
        company: "DataWorks",
        location: "Bangalore",
        type: "Full-time",
        experience: "Mid Level",
        salary: 75000,
        salaryText: "$75K - $95K",
        logo: "D",
        tags: ["Python", "SQL", "Excel"],
        description:
            "Join our analytics team and work with large datasets to generate meaningful business insights."
    },

    {
        id: 3,
        title: "UI/UX Designer",
        company: "CreativeHub",
        location: "Mumbai",
        type: "Remote",
        experience: "Entry Level",
        salary: 60000,
        salaryText: "$60K - $80K",
        logo: "C",
        tags: ["Figma", "UI Design", "UX"],
        description:
            "Design beautiful and intuitive interfaces for web and mobile applications."
    },

    {
        id: 4,
        title: "Backend Developer",
        company: "CloudTech",
        location: "Hyderabad",
        type: "Full-time",
        experience: "Senior Level",
        salary: 100000,
        salaryText: "$100K - $130K",
        logo: "C",
        tags: ["Node.js", "MongoDB", "API"],
        description:
            "Build scalable backend systems and APIs for our growing technology platform."
    },

    {
        id: 5,
        title: "Marketing Intern",
        company: "GrowthLabs",
        location: "Delhi",
        type: "Internship",
        experience: "Entry Level",
        salary: 30000,
        salaryText: "$30K - $40K",
        logo: "G",
        tags: ["Marketing", "SEO", "Social Media"],
        description:
            "Learn digital marketing while working with an experienced growth team."
    },

    {
        id: 6,
        title: "React Developer",
        company: "WebSolutions",
        location: "Pune",
        type: "Remote",
        experience: "Mid Level",
        salary: 90000,
        salaryText: "$90K - $115K",
        logo: "W",
        tags: ["React", "JavaScript", "Git"],
        description:
            "Develop fast and scalable React applications while collaborating with our engineering team."
    },

    {
        id: 7,
        title: "Python Developer",
        company: "CodeCraft",
        location: "Gurgaon",
        type: "Part-time",
        experience: "Mid Level",
        salary: 70000,
        salaryText: "$70K - $90K",
        logo: "C",
        tags: ["Python", "Django", "SQL"],
        description:
            "Work on Python-based applications and backend services for our clients."
    },

    {
        id: 8,
        title: "Machine Learning Intern",
        company: "AI Labs",
        location: "Bangalore",
        type: "Internship",
        experience: "Entry Level",
        salary: 50000,
        salaryText: "$50K - $65K",
        logo: "A",
        tags: ["Python", "Machine Learning", "Pandas"],
        description:
            "Assist our machine learning team in building and testing predictive models."
    }

];


// ==============================
// SELECT ELEMENTS
// ==============================

const jobList = document.getElementById("jobList");

const jobCount = document.getElementById("jobCount");

const searchInput = document.getElementById("searchInput");

const locationInput = document.getElementById("locationInput");

const searchBtn = document.getElementById("searchBtn");

const clearFilters = document.getElementById("clearFilters");

const salaryFilter = document.getElementById("salaryFilter");

const sortJobs = document.getElementById("sortJobs");

const modal = document.getElementById("jobModal");

const modalContent = document.getElementById("modalContent");

const closeModal = document.getElementById("closeModal");


// ==============================
// SAVED JOBS
// ==============================

let savedJobs =
    JSON.parse(localStorage.getItem("savedJobs")) || [];


// ==============================
// DISPLAY JOBS
// ==============================

function displayJobs(jobArray) {

    jobList.innerHTML = "";

    jobCount.textContent = jobArray.length;


    if (jobArray.length === 0) {

        jobList.innerHTML = `
            <div class="no-results">

                <h3>No jobs found 😕</h3>

                <p>
                    Try changing your search or filters.
                </p>

            </div>
        `;

        return;
    }


    jobArray.forEach(job => {

        const isSaved =
            savedJobs.includes(job.id);


        const jobCard = document.createElement("article");

        jobCard.className = "job-card";


        jobCard.innerHTML = `

            <button
                class="save-btn ${isSaved ? "saved" : ""}"
                onclick="toggleSave(${job.id})"
            >
                ${isSaved ? "♥" : "♡"}
            </button>


            <div class="job-top">

                <div class="company-logo">
                    ${job.logo}
                </div>


                <div class="job-info">

                    <h3>
                        ${job.title}
                    </h3>

                    <p class="company">
                        ${job.company}
                    </p>

                </div>

            </div>


            <div class="job-details">

                <span>
                    📍 ${job.location}
                </span>

                <span>
                    💼 ${job.type}
                </span>

                <span>
                    🎯 ${job.experience}
                </span>

            </div>


            <div class="tags">

                ${job.tags
                    .map(tag =>
                        `<span class="tag">${tag}</span>`
                    )
                    .join("")
                }

            </div>


            <div class="job-bottom">

                <span class="salary">
                    ${job.salaryText}
                </span>

                <button
                    class="view-btn"
                    onclick="viewJob(${job.id})"
                >
                    View Details
                </button>

            </div>
        `;


        jobList.appendChild(jobCard);

    });

}


// ==============================
// FILTER JOBS
// ==============================

function filterJobs() {

    const searchTerm =
        searchInput.value.toLowerCase().trim();


    const locationTerm =
        locationInput.value.toLowerCase().trim();


    const selectedTypes =
        [...document.querySelectorAll(".jobType:checked")]
            .map(input => input.value);


    const selectedExperience =
        document.querySelector(
            'input[name="experience"]:checked'
        );


    const minimumSalary =
        Number(salaryFilter.value);


    let filteredJobs = jobs.filter(job => {

        const matchesSearch =
            job.title.toLowerCase().includes(searchTerm) ||
            job.company.toLowerCase().includes(searchTerm) ||
            job.tags.some(tag =>
                tag.toLowerCase().includes(searchTerm)
            );


        const matchesLocation =
            job.location.toLowerCase()
                .includes(locationTerm);


        const matchesType =
            selectedTypes.length === 0 ||
            selectedTypes.includes(job.type);


        const matchesExperience =
            !selectedExperience ||
            job.experience === selectedExperience.value;


        const matchesSalary =
            job.salary >= minimumSalary;


        return (
            matchesSearch &&
            matchesLocation &&
            matchesType &&
            matchesExperience &&
            matchesSalary
        );

    });


    // Sorting

    if (sortJobs.value === "salaryHigh") {

        filteredJobs.sort(
            (a, b) => b.salary - a.salary
        );

    }

    if (sortJobs.value === "salaryLow") {

        filteredJobs.sort(
            (a, b) => a.salary - b.salary
        );

    }


    displayJobs(filteredJobs);

}


// ==============================
// SAVE / UNSAVE JOB
// ==============================

function toggleSave(jobId) {

    if (savedJobs.includes(jobId)) {

        savedJobs =
            savedJobs.filter(id => id !== jobId);

    } else {

        savedJobs.push(jobId);

    }


    localStorage.setItem(
        "savedJobs",
        JSON.stringify(savedJobs)
    );


    filterJobs();
}


// ==============================
// VIEW JOB DETAILS
// ==============================

function viewJob(jobId) {

    const job =
        jobs.find(job => job.id === jobId);


    modalContent.innerHTML = `

        <div class="company-logo">
            ${job.logo}
        </div>

        <h2>
            ${job.title}
        </h2>

        <p class="modal-company">
            ${job.company} · ${job.location}
        </p>


        <div class="job-details">

            <span>💼 ${job.type}</span>

            <span>🎯 ${job.experience}</span>

            <span>💰 ${job.salaryText}</span>

        </div>


        <h3>
            Job Description
        </h3>

        <p>
            ${job.description}
        </p>


        <h3>
            Skills
        </h3>

        <div class="tags">

            ${job.tags
                .map(tag =>
                    `<span class="tag">${tag}</span>`
                )
                .join("")
            }

        </div>


        <br>


        <button
            class="apply-btn"
            onclick="applyJob('${job.title}')"
        >
            Apply Now
        </button>

    `;


    modal.classList.add("active");

}


// ==============================
// APPLY BUTTON
// ==============================

function applyJob(jobTitle) {

    alert(
        `Application started for ${jobTitle}! 🚀`
    );

}


// ==============================
// CLOSE MODAL
// ==============================

closeModal.addEventListener(
    "click",
    () => {
        modal.classList.remove("active");
    }
);


modal.addEventListener(
    "click",
    event => {

        if (event.target === modal) {

            modal.classList.remove("active");

        }

    }
);


// ==============================
// SEARCH BUTTON
// ==============================

searchBtn.addEventListener(
    "click",
    filterJobs
);


// ==============================
// REAL-TIME SEARCH
// ==============================

searchInput.addEventListener(
    "input",
    filterJobs
);

locationInput.addEventListener(
    "input",
    filterJobs
);


// ==============================
// FILTER EVENTS
// ==============================

document
    .querySelectorAll(".jobType")
    .forEach(input => {

        input.addEventListener(
            "change",
            filterJobs
        );

    });


document
    .querySelectorAll('input[name="experience"]')
    .forEach(input => {

        input.addEventListener(
            "change",
            filterJobs
        );

    });


salaryFilter.addEventListener(
    "change",
    filterJobs
);


sortJobs.addEventListener(
    "change",
    filterJobs
);


// ==============================
// CLEAR FILTERS
// ==============================

clearFilters.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        locationInput.value = "";

        document
            .querySelectorAll(".jobType")
            .forEach(input => {
                input.checked = false;
            });


        document
            .querySelectorAll(
                'input[name="experience"]'
            )
            .forEach(input => {
                input.checked = false;
            });


        salaryFilter.value = "0";

        sortJobs.value = "default";

        displayJobs(jobs);

    }
);


// ==============================
// INITIAL LOAD
// ==============================

displayJobs(jobs);