"""Build the public, text-selectable resume. Requires ReportLab."""
from pathlib import Path
from shutil import copy2

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "Maruthi_Yenumula_Resume.pdf"
BACKUP = ROOT / "tmp" / "pdfs" / "resume-before-deployment-review.pdf"
if OUTPUT.exists() and not BACKUP.exists():
    BACKUP.parent.mkdir(parents=True, exist_ok=True)
    copy2(OUTPUT, BACKUP)

INK = colors.HexColor("#17263b")
ACCENT = colors.HexColor("#176b80")
body = ParagraphStyle("Body", fontName="Helvetica", fontSize=10, leading=13.5, textColor=INK, spaceAfter=4)
small = ParagraphStyle("Small", parent=body, fontSize=9, leading=12, alignment=TA_CENTER)
name = ParagraphStyle("Name", parent=body, fontName="Helvetica-Bold", fontSize=23, leading=27, alignment=TA_CENTER, spaceAfter=3)
role = ParagraphStyle("Role", parent=small, fontName="Helvetica-Bold", fontSize=11, leading=15, textColor=ACCENT)
section = ParagraphStyle("Section", parent=body, fontName="Helvetica-Bold", fontSize=10, leading=14, textColor=ACCENT, spaceBefore=10, spaceAfter=5)
heading = ParagraphStyle("Heading", parent=body, fontName="Helvetica-Bold", spaceBefore=3, spaceAfter=3)
bullet = ParagraphStyle("Bullet", parent=body, leftIndent=10, firstLineIndent=-8, spaceAfter=3)
story = []

def p(text, style=body):
    story.append(Paragraph(text, style))

def b(text):
    p("- " + text, bullet)

def link(url, label):
    return f'<link href="{url}" color="#176b80">{label}</link>'

p("MARUTHI YENUMULA", name)
p("Java Full Stack Developer", role)
p("Hyderabad, India | +91 84979 87514 | " + link("mailto:maruthiy310@gmail.com", "maruthiy310@gmail.com"), small)
p(link("https://github.com/maruthi-user", "github.com/maruthi-user") + " | " + link("https://www.linkedin.com/in/maruthi-y-5512a4423", "linkedin.com/in/maruthi-y-5512a4423"), small)

p("PROFILE", section)
p("Java Full Stack Developer and MCA graduate (2025), building Spring Boot APIs and React applications at First Partner Consulting since February 2026. Own the HRMS Task Management module end to end and contribute React screens, approval workflows and API integration across the HRMS. Open to full-time Java full-stack roles.")

p("TECHNICAL SKILLS", section)
p("<b>Backend:</b> Java 17, Spring Boot, Spring Security / JWT, Spring Data JPA, Hibernate, REST APIs, Bean Validation, Flyway, Swagger / OpenAPI")
p("<b>Frontend:</b> React, JavaScript, Redux Toolkit / RTK Query, Tailwind CSS, Radix UI, Vite, HTML, CSS")
p("<b>Database, delivery &amp; testing:</b> PostgreSQL, SQL, Docker, GitHub Actions, CI/CD, JUnit, Postman, Git, Agile / Scrum")

p("EXPERIENCE", section)
p("Software Developer Intern / Trainee | First Partner Consulting", heading)
p("Hyderabad, India | Feb 2026 - Present")
b("Built the HRMS Task Management module's Spring Boot API and React interface, with Summary, List, Board, Calendar, Gantt and Workload views.")
b("Implemented server-side task workflow authorization by role, ownership and reporting relationship, mirrored by permitted actions in the interface.")
b("Built React screens and integrated Spring Boot APIs for Leave and Comp-off, Attendance, Employee Advances, Claims, Daily Status Reports and the HR dashboard.")
b("Implemented UI permissions for six roles, scoped My / Team / All views, pending-approval queues and live count badges.")
b("Created reusable tables with saved column layouts, filters, pagination and Excel export; handled JWT expiry, API errors and duplicate-click prevention.")

p("PERSONAL PROJECTS", section)
p("F2Home | Farmer-to-customer marketplace", heading)
p(link("https://github.com/maruthi-user/F2Home", "Source: github.com/maruthi-user/F2Home"))
b("Built farmer, customer and admin interfaces with React; implemented phone OTP login, JWT access/refresh tokens and OTP rate limiting with Spring Boot and Spring Security.")
b("Used PostgreSQL and Flyway for authentication and user data, with JUnit tests, OpenAPI documentation, Docker and GitHub Actions CI.")
p("<b>Current scope:</b> Authentication and users use the API; marketplace, cart and order data remain client-side in IndexedDB.")

p("Arogya Mitra | Telugu audio-first health app", heading)
p(link("https://arogya-mitra-lime.vercel.app/", "Live demo") + " | " + link("https://github.com/maruthi-user/arogya-mitra", "Source: github.com/maruthi-user/arogya-mitra"))
b("Built a Telugu/English interface with recorded prompts, voice search, large icons, provider search and booking screens using HTML, CSS, JavaScript and the Web Speech API.")
p("<b>Current scope:</b> Frontend prototype with sample providers and browser storage; no real appointments are made.")

p("EDUCATION", section)
p("<b>Master of Computer Applications</b> | Mohan Babu University, Tirupati | 2023 - 2025")
p("<b>B.Sc Computer Science</b> | Acharya Nagarjuna University, Guntur | 2020 - 2023")

doc = SimpleDocTemplate(str(OUTPUT), pagesize=A4, rightMargin=40, leftMargin=40, topMargin=30, bottomMargin=28, title="Maruthi Yenumula - Java Full Stack Developer", author="Maruthi Yenumula")
doc.build(story)
print(OUTPUT)
