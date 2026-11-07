
// =====================================
// LOAD PORTFOLIO DATA FROM JSON
// =====================================

document.addEventListener("DOMContentLoaded", loadPortfolio);

let portfolioData = null;


async function loadPortfolio() {

    try {

        const response = await fetch("data.json");

        if (!response.ok) {
            throw new Error("Unable to load data.json");
        }

        portfolioData = await response.json();

        // Display website
        document.getElementById("portfolioContent").hidden = false;

        // Render all sections
        renderPersonalDetails();
        renderAbout();
        renderSkills();
        renderProjects();
        renderEducation();
        renderCertifications();
        renderContact();
        renderSocialLinks();
        renderFooter();

        // Initialize form
        initializeContactForm();

    }

    catch (error) {

        console.error("Portfolio loading error:", error);

        document.getElementById("errorMessage").hidden = false;

    }

}


// =====================================
// PERSONAL DETAILS
// =====================================

function renderPersonalDetails() {

    const personal = portfolioData.personal;

    document.title = personal.name + " | Portfolio";

    document.getElementById("brandName").textContent =
        personal.name.split(" ")[0] + ".";

    document.getElementById("studentName").textContent =
        personal.name;

    document.getElementById("studentRole").textContent =
        personal.role;

    document.getElementById("studentIntro").textContent =
        personal.introduction;

    document.getElementById("careerGoal").textContent =
        "Career Goal: " + personal.careerGoal;

    document.getElementById("profileImage").src =
        personal.profileImage;

    document.getElementById("aboutImage").src =
        personal.profileImage;

    document.getElementById("resumeButton").href =
        personal.resume;

}


// =====================================
// ABOUT SECTION
// =====================================

function renderAbout() {

    const about = portfolioData.about;
    const personal = portfolioData.personal;

    document.getElementById("aboutTitle").textContent =
        about.title;

    document.getElementById("aboutDescription").textContent =
        about.description;

    document.getElementById("personalDetails").innerHTML = `
        <p><strong>Name:</strong> ${escapeHTML(personal.name)}</p>
        <p><strong>Course:</strong> ${escapeHTML(portfolioData.education[0].course)}</p>
        <p><strong>Email:</strong> ${escapeHTML(personal.email)}</p>
        <p><strong>Phone:</strong> ${escapeHTML(personal.phone)}</p>
    `;

}


// =====================================
// SKILLS SECTION
// =====================================

function renderSkills() {

    const container = document.getElementById("skillsContainer");

    container.innerHTML = "";

    portfolioData.skills.forEach(skill => {

        const skillCard = document.createElement("div");

        skillCard.className = "col-sm-6 col-lg-4";

        const safeLevel = Math.max(0, Math.min(100, Number(skill.level) || 0));

        skillCard.innerHTML = `
            <div class="skill-card">

                <div class="skill-icon">
                    <i class="${escapeHTML(skill.icon)}"></i>
                </div>

                <h5>${escapeHTML(skill.name)}</h5>

                <div class="progress">
                    <div class="progress-bar"
                        style="width: ${safeLevel}%">
                    </div>
                </div>

                <small class="text-white-50 mt-2 d-block">
                    ${safeLevel}% 
                </small>

            </div>
        `;

        container.appendChild(skillCard);

    });

}


// =====================================
// PROJECTS SECTION
// =====================================

function renderProjects() {

    const container = document.getElementById("projectsContainer");

    container.innerHTML = "";

    portfolioData.projects.forEach(project => {

        const projectCard = document.createElement("div");

        projectCard.className = "col-md-6 col-lg-4";

        const technologies = project.technologies.map(tech => {

            return `
                <span class="tech-badge">
                    ${escapeHTML(tech)}
                </span>
            `;

        }).join("");

        projectCard.innerHTML = `

            <div class="project-card">

                <img src="${escapeHTML(project.image)}"
                    class="project-image"
                    alt="${escapeHTML(project.name)}"
                    loading="lazy">

                <div class="project-content">

                    <h4>${escapeHTML(project.name)}</h4>

                    <p>${escapeHTML(project.description)}</p>

                    <div>${technologies}</div>

                    <a href="${safeURL(project.link)}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="project-link">

                        View Project
                        <i class="bi bi-arrow-up-right"></i>

                    </a>

                </div>

            </div>

        `;

        container.appendChild(projectCard);

    });

}


// =====================================
// EDUCATION SECTION
// =====================================

function renderEducation() {

    const container = document.getElementById("educationContainer");

    container.innerHTML = "";

    portfolioData.education.forEach(item => {

        const educationCard = document.createElement("div");

        educationCard.className = "education-card";

        educationCard.innerHTML = `

            <h4>
                <i class="bi bi-mortarboard-fill text-primary"></i>
                ${escapeHTML(item.course)}
            </h4>

            <p>
                <strong>College:</strong>
                ${escapeHTML(item.college)}
            </p>

            <p>
                <strong>Semester:</strong>
                ${escapeHTML(item.semester)}
            </p>

            <p>
                <strong>Academic Year:</strong>
                ${escapeHTML(item.year)}
            </p>

            <p>
                <strong>Details:</strong>
                ${escapeHTML(item.details)}
            </p>

        `;

        container.appendChild(educationCard);

    });

}


// =====================================
// CERTIFICATIONS SECTION
// =====================================

function renderCertifications() {

    const container =
        document.getElementById("certificationsContainer");

    container.innerHTML = "";

    portfolioData.certifications.forEach(certificate => {

        const card = document.createElement("div");

        card.className = "col-md-6 col-lg-4";

        card.innerHTML = `

            <div class="certificate-card">

                <i class="bi bi-award-fill"></i>

                <h5>${escapeHTML(certificate.name)}</h5>

                <p>
                    ${escapeHTML(certificate.provider)}
                </p>

                <p>
                    ${escapeHTML(certificate.year)}
                </p>

                <a href="${safeURL(certificate.link)}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="project-link">

                    View Certificate
                    <i class="bi bi-arrow-up-right"></i>

                </a>

            </div>

        `;

        container.appendChild(card);

    });

}


// =====================================
// SOCIAL MEDIA LINKS
// =====================================

function renderSocialLinks() {

    const socials = portfolioData.socials;

    const socialHTML = socials.map(item => {

        return `
            <a href="${safeURL(item.link)}"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="${escapeHTML(item.name)}">

                <i class="${escapeHTML(item.icon)}"></i>

            </a>
        `;

    }).join("");

    document.getElementById("heroSocials").innerHTML =
        socialHTML;

    document.getElementById("footerSocials").innerHTML =
        socialHTML;

}


// =====================================
// CONTACT DETAILS
// =====================================

function renderContact() {

    const personal = portfolioData.personal;

    document.getElementById("contactDetails").innerHTML = `

        <div class="contact-info">

            <i class="bi bi-envelope-fill"></i>

            <p>${escapeHTML(personal.email)}</p>

        </div>

        <div class="contact-info">

            <i class="bi bi-telephone-fill"></i>

            <p>${escapeHTML(personal.phone)}</p>

        </div>

        <div class="contact-info">

            <i class="bi bi-geo-alt-fill"></i>

            <p>${escapeHTML(personal.location)}</p>

        </div>

    `;

}


// =====================================
// FOOTER
// =====================================

function renderFooter() {

    const name = portfolioData.personal.name;

    document.getElementById("footerName").textContent = name;

    document.getElementById("copyright").textContent =
        `© ${new Date().getFullYear()} ${name}. All Rights Reserved.`;

}


// =====================================
// CONTACT FORM VALIDATION
// =====================================

function initializeContactForm() {

    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("contactName").value.trim();

        const email = document.getElementById("contactEmail").value.trim();

        const subject = document.getElementById("contactSubject").value.trim();

        const message = document.getElementById("contactMessage").value.trim();

        const formMessage = document.getElementById("formMessage");

        // Check empty fields
        if (!name || !email || !subject || !message) {

            showFormMessage(
                "Please fill in all fields.",
                "danger"
            );

            return;

        }

        // Validate email
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            showFormMessage(
                "Please enter a valid email address.",
                "danger"
            );

            return;

        }

        // Basic length checks
        if (name.length > 100 ||
            subject.length > 150 ||
            message.length > 2000) {

            showFormMessage(
                "Please shorten your input.",
                "danger"
            );

            return;

        }

        // Demo submission
        showFormMessage(
            "Your details are valid! Connect this form to a backend or email service to send your message.",
            "success"
        );

        form.reset();

    });

}


// =====================================
// FORM MESSAGE
// =====================================

function showFormMessage(message, type) {

    const formMessage = document.getElementById("formMessage");

    formMessage.className = "mt-3 text-" + type;

    formMessage.textContent = message;

}


// =====================================
// HTML ESCAPING
// =====================================

function escapeHTML(value) {

    return String(value ?? "").replace(/[&<>"']/g, function(char) {

        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[char];

    });

}


// =====================================
// SAFE URL VALIDATION
// =====================================

function safeURL(value) {

    try {

        const url = new URL(value, window.location.href);

        if (url.protocol === "https:" ||
            url.protocol === "http:") {

            return url.href;

        }

    } catch (error) {

        console.warn("Invalid URL:", value);

    }

    return "#";

}
