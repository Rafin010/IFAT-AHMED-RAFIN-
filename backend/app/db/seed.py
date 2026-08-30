import asyncio
import json
from app.db.session import SessionLocal
from app.models.models import User, Profile, Project, Skill, Certificate, Experience, Service
from app.core.security import get_password_hash

async def seed_data():
    async with SessionLocal() as session:
        # Create Admin User
        admin_email = "admin@example.com"
        password = "admin"
        hashed_password = get_password_hash(password)
        
        user = User(email=admin_email, hashed_password=hashed_password)
        session.add(user)
        
        # Create Profile
        profile = Profile(
            name="Ifat Ahmed Rafin",
            headline="Full-Stack Architect | AI Builder",
            bio="Engineering intelligent web applications, robust databases, and scalable server architectures. Specializing in modern JS frameworks and Python ecosystems.",
            email="iarafin010@gmail.com",
            github="https://github.com/Rafin010/",
            linkedin="https://www.linkedin.com/in/ifat-ahmed-rafin-056741360/",
            instagram="https://www.instagram.com/ia_rafin/",
            available_for_hire=True
        )
        session.add(profile)
        
        # Create Projects
        projects = [
            Project(
                title="CINE-STREAM",
                slug="cine-stream",
                short_description="CineStreams is a modern online streaming platform where users can explore and watch a wide collection of movies.",
                category="app",
                is_featured=True,
                technologies=["Node.js", "React"],
                live_url="https://cinestreamss.netlify.app/",
                display_order=1
            ),
            Project(
                title="SportyXi",
                slug="sportyxi",
                short_description="International sports streaming architecture with LL-HLS & AV1 integration for ultra-low latency broadcasting.",
                category="app",
                is_featured=True,
                technologies=["Python", "FastAPI", "MySQL"],
                live_url="https://sportyxi.com",
                display_order=2
            ),
            Project(
                title="FreeStore",
                slug="freestore",
                short_description="High-speed media extraction ecosystem. Fully optimized for deep technical SEO and massive scaling.",
                category="app",
                is_featured=True,
                technologies=["Django", "PostgreSQL"],
                live_url="https://freedownloader.top",
                display_order=3
            ),
            Project(
                title="Facebook Videos Downloader",
                slug="facebook-videos-downloader",
                short_description="Advanced Facebook media downloader with seamless integration.",
                category="app",
                technologies=["Python"],
                live_url="https://f.freedownloader.top",
                display_order=4
            ),
            Project(
                title="YouTube Videos Downloader",
                slug="youtube-videos-downloader",
                short_description="Advanced YouTube media downloader with seamless integration.",
                category="app",
                technologies=["Python"],
                live_url="https://y.freedownloader.top",
                display_order=5
            ),
            Project(
                title="Instagram Videos Downloader",
                slug="instagram-videos-downloader",
                short_description="Advanced Instagram media downloader with seamless integration.",
                category="app",
                technologies=["Python"],
                live_url="https://i.freedownloader.top",
                display_order=6
            ),
            Project(
                title="TikTok Videos Downloader",
                slug="tiktok-videos-downloader",
                short_description="Advanced TikTok media downloader with seamless integration.",
                category="app",
                technologies=["Python"],
                live_url="https://t.freedownloader.top",
                display_order=7
            )
        ]
        session.add_all(projects)

        # Create Certificates
        certificates = [
            Certificate(title="Advanced Python Programming", issuer="Kaggle", display_order=1),
            Certificate(title="AI Agents Intensive Course with Google", issuer="Google", display_order=2),
            Certificate(title="Code Forker Certification with Kaggle", issuer="Kaggle", display_order=3),
            Certificate(title="Vampire Certification", issuer="Kaggle", display_order=4),
            Certificate(title="Kaggle Community Member", issuer="Kaggle", display_order=5),
            Certificate(title="Python Coder Certificate With Kaggle", issuer="Kaggle", display_order=6),
            Certificate(title="Advanced Content Creation With AI", issuer="Unknown", display_order=7),
            Certificate(title="Advanced Creative Design Mastery", issuer="Unknown", display_order=8)
        ]
        session.add_all(certificates)

        # Create Skills
        skills = [
            Skill(name="React.js", category="Frontend", display_order=1),
            Skill(name="Next.js", category="Frontend", display_order=2),
            Skill(name="Tailwind CSS", category="Frontend", display_order=3),
            Skill(name="Python", category="Backend", display_order=4),
            Skill(name="FastAPI", category="Backend", display_order=5),
            Skill(name="Django", category="Backend", display_order=6),
            Skill(name="PostgreSQL", category="Database", display_order=7),
            Skill(name="Docker", category="DevOps", display_order=8)
        ]
        session.add_all(skills)

        await session.commit()
        print("Data seeded successfully!")

if __name__ == "__main__":
    asyncio.run(seed_data())
