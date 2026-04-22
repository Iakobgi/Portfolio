const header = document.getElementById("header");
const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menu-toggle");

const skillsList = document.getElementById("skills-list");

const heroName = document.getElementById("hero-name");
const heroTitle = document.getElementById("hero-title");
const heroSummary = document.getElementById("hero-summary");

const aboutSummary = document.getElementById("about-summary");
const aboutGoals = document.getElementById("about-goals");
const aboutInterests = document.getElementById("about-interests");

const linkedinLink = document.getElementById("linkedin-link");
const githubLink = document.getElementById("github-link");

const contactEmail = document.getElementById("contact-email");
const contactLinkedin = document.getElementById("contact-linkedin");
const contactLocation = document.getElementById("contact-location");

const footerText = document.getElementById("footer-text");
const footerEmail = document.getElementById("footer-email");
const footerLinkedin = document.getElementById("footer-linkedin");
const footerGithub = document.getElementById("footer-github");

const projectCard1Title = document.getElementById("project-card-1-title");
const projectCard1Desc = document.getElementById("project-card-1-desc");
const projectCard2Title = document.getElementById("project-card-2-title");
const projectCard2Desc = document.getElementById("project-card-2-desc");
const projectCard3Title = document.getElementById("project-card-3-title");
const projectCard3Desc = document.getElementById("project-card-3-desc");

const projectsTrack = document.getElementById("projects-track");
const projectsPrev = document.getElementById("projects-prev");
const projectsNext = document.getElementById("projects-next");

const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotWindow = document.getElementById("chatbot-window");
const chatbotClose = document.getElementById("chatbot-close");
const chatbotForm = document.getElementById("chatbot-form");
const chatbotInput = document.getElementById("chatbot-input");
const chatbotBody = document.getElementById("chatbot-body");

let portfolioData = null;

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        navbar.classList.toggle("active");
    });
}

document.querySelectorAll(".navbar a").forEach((link) => {
    link.addEventListener("click", () => {
        navbar.classList.remove("active");
    });
});

window.addEventListener("scroll", () => {
    revealOnScroll();

    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

window.addEventListener("load", revealOnScroll);

function revealOnScroll() {
    const elements = document.querySelectorAll(".reveal");

    elements.forEach((element) => {
        const top = element.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            element.classList.add("active");
        }
    });
}

async function loadData() {
    try {
        const response = await fetch("cv-data.json");
        portfolioData = await response.json();
        fillPage();
    } catch (error) {
        console.error("Error loading cv-data.json:", error);
    }
}

function fillPage() {
    if (!portfolioData) return;

    const { personal, apprenticeship, skills, interests, projects } = portfolioData;

    heroName.textContent = personal.name;
    heroTitle.textContent = personal.title;
    heroSummary.textContent = personal.summary;

    aboutSummary.textContent = personal.summary;
    aboutGoals.textContent = `${apprenticeship.status} ${apprenticeship.goals}`;
    aboutInterests.textContent = interests.join(", ") + ".";

    linkedinLink.href = personal.linkedin;
    githubLink.href = personal.github;

    contactEmail.href = `mailto:${personal.email}`;
    contactEmail.querySelector("span").textContent = personal.email;

    contactLinkedin.href = personal.linkedin;
    contactLinkedin.querySelector("span").textContent = "My LinkedIn";

    contactLocation.querySelector("span").textContent = personal.location;

    footerText.textContent = `© 2026 ${personal.name} - ${personal.title}`;
    footerEmail.href = `mailto:${personal.email}`;
    footerLinkedin.href = personal.linkedin;
    footerGithub.href = personal.github;

    skillsList.innerHTML = "";
    const allSkills = [...skills.technical, ...skills.learning];

    allSkills.forEach((skill) => {
        const item = document.createElement("div");
        item.className = "skill card";
        item.textContent = skill;
        skillsList.appendChild(item);
    });

    if (projects[0]) {
        projectCard1Title.textContent = projects[0].name;
        projectCard1Desc.textContent = projects[0].shortDescription;
    }

    if (projects[1]) {
        projectCard2Title.textContent = projects[1].name;
        projectCard2Desc.textContent = projects[1].shortDescription;
    }

    if (projects[2]) {
        projectCard3Title.textContent = projects[2].name;
        projectCard3Desc.textContent = projects[2].shortDescription;
    }
}

function getScrollAmount() {
    const card = projectsTrack.querySelector(".project-card");
    if (!card) return 300;
    return card.offsetWidth + 24;
}

projectsPrev.addEventListener("click", () => {
    projectsTrack.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth"
    });
});

projectsNext.addEventListener("click", () => {
    projectsTrack.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth"
    });
});

chatbotToggle.addEventListener("click", () => {
    chatbotWindow.classList.toggle("active");
});

chatbotClose.addEventListener("click", () => {
    chatbotWindow.classList.remove("active");
});

function addMessage(text, type) {
    const message = document.createElement("div");
    message.className = type === "user" ? "user-message" : "bot-message";
    message.innerHTML = `<p>${text}</p>`;
    chatbotBody.appendChild(message);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

function getBotReply(question) {
    if (!portfolioData) {
        return "My profile data is still loading. Please try again in a second.";
    }

    const text = question.toLowerCase();
    const { personal, apprenticeship, skills, education, experience, projects, languages, interests } = portfolioData;

    if (text.includes("name") || text.includes("who are you")) {
        return `${personal.name} is a ${personal.title}.`;
    }

    if (text.includes("about") || text.includes("summary") || text.includes("profile")) {
        return personal.summary;
    }

    if (text.includes("email") || text.includes("contact") || text.includes("reach")) {
        return `You can contact ${personal.name} at <a href="mailto:${personal.email}">${personal.email}</a>.`;
    }

    if (text.includes("linkedin")) {
        return `Here is the LinkedIn profile: <a href="${personal.linkedin}" target="_blank">${personal.linkedin}</a>`;
    }

    if (text.includes("github")) {
        return `Here is the GitHub profile: <a href="${personal.github}" target="_blank">${personal.github}</a>`;
    }

    if (text.includes("location") || text.includes("where") || text.includes("based")) {
        return `${personal.name} is based in ${personal.location}.`;
    }

    if (text.includes("apprenticeship") || text.includes("alternance") || text.includes("looking for")) {
        return `${apprenticeship.status} ${apprenticeship.goals}`;
    }

    if (text.includes("availability") || text.includes("available")) {
        return apprenticeship.availability;
    }

    if (text.includes("skill") || text.includes("technologies") || text.includes("tech stack")) {
        return `Technical skills: ${skills.technical.join(", ")}. Currently learning: ${skills.learning.join(", ")}.`;
    }

    if (text.includes("soft")) {
        return `Soft skills: ${skills.soft.join(", ")}.`;
    }

    if (text.includes("education") || text.includes("school") || text.includes("study") || text.includes("training")) {
        const item = education[0];
        return `${item.degree} at ${item.school} (${item.year}). ${item.details}`;
    }

    if (text.includes("experience") || text.includes("work")) {
        const item = experience[0];
        return `${item.role} at ${item.company} (${item.year}). ${item.details}`;
    }

    if (text.includes("project") || text.includes("built")) {
        return `Projects include: ${projects.map((project) => project.name).join(", ")}.`;
    }

    if (text.includes("chrome") || text.includes("extension") || text.includes("tracker") || text.includes("cookie")) {
        const item = projects.find((project) =>
            project.name.toLowerCase().includes("extension")
        );
        return `${item.name}: ${item.description}`;
    }

    if (text.includes("portfolio")) {
        const item = projects.find((project) =>
            project.name.toLowerCase().includes("portfolio")
        );
        return `${item.name}: ${item.description}`;
    }

    if (text.includes("todo") || text.includes("to-do")) {
        const item = projects.find((project) =>
            project.name.toLowerCase().includes("to-do") ||
            project.name.toLowerCase().includes("todo")
        );
        return `${item.name}: ${item.description}`;
    }

    if (text.includes("language")) {
        return `Languages: ${languages.join(", ")}.`;
    }

    if (text.includes("hobbies") || text.includes("interests")) {
        return `Interests: ${interests.join(", ")}.`;
    }

    if (text.includes("cv") || text.includes("resume")) {
        return `You can download the CV at the top of the page, or <a href="cv.pdf" download>click here</a>.`;
    }

    if (text.includes("hire") || text.includes("why")) {
        return `${personal.name} is motivated, curious, and currently looking for an apprenticeship where he can grow and contribute to real projects.`;
    }

    return "I do not have that exact information yet. Try asking about skills, education, projects, experience, apprenticeship, contact, GitHub, LinkedIn, or location.";
}

chatbotForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const question = chatbotInput.value.trim();
    if (question === "") return;

    addMessage(question, "user");

    setTimeout(() => {
        addMessage(getBotReply(question), "bot");
    }, 250);

    chatbotInput.value = "";
});

loadData();