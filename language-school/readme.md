### Technical Specification for Foreign Language School Educational Platform

#### Project Description
Development of a web platform for teaching a foreign language to students. The platform should provide access to language lessons, including the ability to participate in online classes via Zoom (using Zoom links), view lesson recordings from YouTube, communicate with teachers and other students in a chat, and track their progress.

#### Functional Requirements
1. **Homepage:**
   - Welcome message and brief description of the platform.
   - List of available courses and the ability to navigate to them.

2. **Course Page:**
   - Course description, list of lessons, and materials for self-study.
   - Ability to access online classes via Zoom by clicking on Zoom links.

3. **YouTube Video Playback:**
   - Viewing lesson recordings embedded from YouTube, access to video lessons for self-study.

4. **In-Lesson Chat:**
   - Chat for communicating with teachers and other students during lessons.

5. **Progress Tracking:** 
   - Tracking learning progress for each student.
   - Ability to view completed lessons and assignments.

6. **Admin Panel:**
   - Ability to add, edit, and delete courses, lessons, and materials.
   - Monitoring student activity and chat communication.

#### Technical Requirements
- **Frontend:** HTML, CSS (using a framework such as React), JavaScript.
- **Backend:** Node.js with Express framework for creating RESTful API.
- **Database:** MongoDB for storing information about courses, lessons, students, and their progress.
- **Authentication:** Use JWT for user and administrator authentication.
- **Video Streaming:** Embed YouTube videos using the YouTube API.
- **Chat:** Use WebSocket or other technology to implement in-lesson chat.
- **Progress Bar:** Implement progress tracking using the database.

#### Expected Outcome
Fully functional educational platform for learning a foreign language, meeting all requirements and ready for use by real users.
